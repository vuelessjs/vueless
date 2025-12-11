import { vuelessConfig } from "../utils/ui";
import { getRandomId, isSSR } from "../utils/helper";
import { LOCAL_STORAGE_ID, NotificationDuration, NotificationType } from "./constants";

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

  const shouldSkip = ignoreDuplicates && (!description || activeNotifications.has(notificationKey));

  if (shouldSkip) return;

  if (ignoreDuplicates) activeNotifications.add(notificationKey);

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

export function notifyInfo({
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
    type: NotificationType.Info,
    duration: duration || globalNotifyDuration?.medium || NotificationDuration.Medium,
    notifyId,
  });
}

export function clearNotifications(notifyId?: string): void {
  window.dispatchEvent(new CustomEvent("notifyClearAll", { detail: { notifyId } }));
}

function getNotifyStorageKey(notifyId?: string) {
  return `${LOCAL_STORAGE_ID}__${notifyId || "default"}`;
}

export function setDelayedNotify(settings: NotifyConfig): void {
  if (isSSR) return;
  const key = getNotifyStorageKey(settings.notifyId);

  localStorage.setItem(key, JSON.stringify(settings));
}

export function getDelayedNotify(notifyId?: string): void {
  if (isSSR) return;
  const key = getNotifyStorageKey(notifyId);
  const notifyData: NotifyConfig | null = JSON.parse(localStorage.getItem(key) || "null");

  clearNotifications(notifyData?.notifyId);

  if (notifyData) {
    notify(notifyData);
    localStorage.removeItem(key);
  }
}
