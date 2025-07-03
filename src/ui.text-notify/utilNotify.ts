import { vuelessConfig } from "../utils/ui.ts";
import { getRandomId, isSSR } from "../utils/helper.ts";
import { LOCAL_STORAGE_ID, NotificationDuration, NotificationType } from "./constants.ts";

interface NotifyConfig {
  type?: NotificationType;
  label?: string;
  description?: string;
  duration?: number;
  ignoreDuplicates?: boolean;
  notifyId?: string;
}

interface NotifyEventDetail {
  type: NotificationType;
  id: string;
  label: string;
  description: string;
  duration: number;
  notifyId?: string;
}

interface VuelessNotifyConfig {
  duration?: {
    short?: number;
    medium?: number;
    long?: number;
  };
}

const globalNotifyDuration = (vuelessConfig.components?.UNotify as VuelessNotifyConfig)?.duration;

const activeNotifications = new Set<string>();

function getNotificationKey(description: string, notifyId?: string) {
  return `${notifyId || "default"}::${description}`;
}

export function notify({
  type,
  label = "",
  description = "",
  duration,
  ignoreDuplicates,
  notifyId,
}: NotifyConfig = {}): void {
  const notifyDuration: number =
    duration || globalNotifyDuration?.short || NotificationDuration.Short;

  const notificationKey = getNotificationKey(description, notifyId);

  if (ignoreDuplicates) {
    if (!description) return;

    if (activeNotifications.has(notificationKey)) {
      return;
    }

    activeNotifications.add(notificationKey);
  }

  const eventDetail: NotifyEventDetail = {
    type: type as NotificationType,
    id: getRandomId(),
    label,
    description,
    duration: notifyDuration,
    notifyId,
  };

  const notifyStart: CustomEvent<NotifyEventDetail> = new CustomEvent("notifyStart", {
    detail: eventDetail,
  });
  const notifyEnd: CustomEvent<NotifyEventDetail> = new CustomEvent("notifyEnd", {
    detail: eventDetail,
  });

  window.dispatchEvent(notifyStart);

  setTimeout(() => {
    window.dispatchEvent(notifyEnd);

    if (ignoreDuplicates && description) {
      activeNotifications.delete(notificationKey);
    }
  }, notifyDuration);
}

export function notifySuccess({
  label,
  description,
  duration,
  ignoreDuplicates,
  notifyId,
}: Omit<NotifyConfig, "type"> = {}): void {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NotificationType.Success,
    duration: duration || globalNotifyDuration?.short || NotificationDuration.Short,
    notifyId,
  });
}

export function notifyWarning({
  label,
  description,
  duration,
  ignoreDuplicates,
  notifyId,
}: Omit<NotifyConfig, "type"> = {}): void {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NotificationType.Warning,
    duration: duration || globalNotifyDuration?.medium || NotificationDuration.Medium,
    notifyId,
  });
}

export function notifyError({
  label,
  description,
  duration,
  ignoreDuplicates,
  notifyId,
}: Omit<NotifyConfig, "type"> = {}): void {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NotificationType.Error,
    duration: duration || globalNotifyDuration?.long || NotificationDuration.Long,
    notifyId,
  });
}

export function clearNotifications(notifyId?: string): void {
  window.dispatchEvent(new CustomEvent("notifyClearAll", { detail: { notifyId } }));
}

export function setDelayedNotify(settings: NotifyConfig): void {
  if (isSSR) return;

  localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(settings));
}

export function getDelayedNotify(): void {
  if (isSSR) return;

  const notifyData: NotifyConfig | null = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ID) || "null",
  );

  clearNotifications(notifyData?.notifyId);

  if (notifyData) {
    notify(notifyData);
    localStorage.removeItem(LOCAL_STORAGE_ID);
  }
}
