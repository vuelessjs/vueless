import { vuelessConfig } from "../utils/ui.ts";
import { getRandomId } from "../utils/helper.ts";
import { DELAY_BETWEEN_CLONES, DURATION, LOCAL_STORAGE_ID, NOTIFY_TYPE } from "./constants.ts";

interface NotifyConfig {
  type?: (typeof NOTIFY_TYPE)[keyof typeof NOTIFY_TYPE];
  label?: string;
  description?: string;
  duration?: number;
  ignoreDuplicates?: boolean;
}

interface NotifyEventDetail {
  type: (typeof NOTIFY_TYPE)[keyof typeof NOTIFY_TYPE];
  id: string;
  label: string;
  description: string;
  duration: number;
}

interface VuelessNotifyConfig {
  duration?: {
    short?: number;
    medium?: number;
    long?: number;
  };
}

const globalNotifyDuration = (vuelessConfig.component?.UNotify as VuelessNotifyConfig)?.duration;
const notifyClearAllEvent: Event = new Event("notifyClearAll");

let lastMessageTime: Date | undefined = undefined;
let lastMessage: string | undefined = undefined;

export function notify({
  type,
  label = "",
  description = "",
  duration,
  ignoreDuplicates,
}: NotifyConfig = {}): void {
  const notifyDuration: number = duration || globalNotifyDuration?.short || DURATION.short;

  const isSameMessage = Boolean(
    lastMessage === description &&
      lastMessageTime &&
      new Date().getTime() - lastMessageTime.getTime() < DELAY_BETWEEN_CLONES,
  );

  if ((isSameMessage || !description) && ignoreDuplicates) {
    return;
  }

  lastMessageTime = new Date();
  lastMessage = description;

  const eventDetail: NotifyEventDetail = {
    type: type as (typeof NOTIFY_TYPE)[keyof typeof NOTIFY_TYPE],
    id: getRandomId(),
    label,
    description,
    duration: notifyDuration,
  };

  const notifyStart: CustomEvent<NotifyEventDetail> = new CustomEvent("notifyStart", {
    detail: eventDetail,
  });
  const notifyEnd: CustomEvent<NotifyEventDetail> = new CustomEvent("notifyEnd", {
    detail: eventDetail,
  });

  window.dispatchEvent(notifyStart);

  setTimeout(() => window.dispatchEvent(notifyEnd), notifyDuration);
}

export function notifySuccess({
  label,
  description,
  duration,
  ignoreDuplicates,
}: Omit<NotifyConfig, "type"> = {}): void {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NOTIFY_TYPE.success,
    duration: duration || globalNotifyDuration?.short || DURATION.short,
  });
}

export function notifyWarning({
  label,
  description,
  duration,
  ignoreDuplicates,
}: Omit<NotifyConfig, "type"> = {}): void {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NOTIFY_TYPE.warning,
    duration: duration || globalNotifyDuration?.medium || DURATION.medium,
  });
}

export function notifyError({
  label,
  description,
  duration,
  ignoreDuplicates,
}: Omit<NotifyConfig, "type"> = {}): void {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NOTIFY_TYPE.error,
    duration: duration || globalNotifyDuration?.long || DURATION.long,
  });
}

export function clearNotifications(): void {
  window.dispatchEvent(notifyClearAllEvent);
}

export function setDelayedNotify(settings: NotifyConfig): void {
  localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(settings));
}

export function getDelayedNotify(): void {
  const notifyData: NotifyConfig | null = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ID) || "null",
  );

  clearNotifications();

  if (notifyData) {
    notify(notifyData);
    localStorage.removeItem(LOCAL_STORAGE_ID);
  }
}
