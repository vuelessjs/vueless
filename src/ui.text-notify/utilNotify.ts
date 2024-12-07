import { vuelessConfig } from "../utils/ui.ts";
import { getRandomId } from "../utils/helper.ts";
import {
  LOCAL_STORAGE_ID,
  DELAY_BETWEEN_CLONES,
  NotificationDuration,
  NotificationType,
} from "./constants.ts";

interface NotifyConfig {
  type?: NotificationType;
  label?: string;
  description?: string;
  duration?: number;
  ignoreDuplicates?: boolean;
}

interface NotifyEventDetail {
  type: NotificationType;
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
  const notifyDuration: number =
    duration || globalNotifyDuration?.short || NotificationDuration.Short;

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
    type: type as NotificationType,
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
    type: NotificationType.Success,
    duration: duration || globalNotifyDuration?.short || NotificationDuration.Short,
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
    type: NotificationType.Warning,
    duration: duration || globalNotifyDuration?.medium || NotificationDuration.Medium,
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
    type: NotificationType.Error,
    duration: duration || globalNotifyDuration?.long || NotificationDuration.Long,
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
