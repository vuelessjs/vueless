import { getRandomId, vuelessConfig } from "../utils/ui.ts";
import { DELAY_BETWEEN_CLONES, DURATION, LOCAL_STORAGE_ID, NOTIFY_TYPE } from "./constants.js";

const globalNotifyDuration = vuelessConfig.component?.UNotify?.duration;
const notifyClearAllEvent = new Event("notifyClearAll");

let lastMessageTime = undefined;
let lastMessage = undefined;

export function notify({ type, label, description, duration, ignoreDuplicates } = {}) {
  const notifyDuration = duration || globalNotifyDuration?.short || DURATION.short;

  const isSameMessage =
    lastMessage === description && new Date() - lastMessageTime < DELAY_BETWEEN_CLONES;

  if ((isSameMessage || !description) && ignoreDuplicates) {
    return;
  }

  lastMessageTime = new Date();
  lastMessage = description;

  const eventDetail = {
    type,
    id: getRandomId(),
    label: label || "",
    description: description || "",
    duration: notifyDuration,
  };

  const notifyStart = new CustomEvent("notifyStart", { detail: eventDetail });
  const notifyEnd = new CustomEvent("notifyEnd", { detail: eventDetail });

  window.dispatchEvent(notifyStart);

  setTimeout(() => window.dispatchEvent(notifyEnd), notifyDuration);
}

export function notifySuccess({ label, description, duration, ignoreDuplicates } = {}) {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NOTIFY_TYPE.success,
    duration: duration || globalNotifyDuration?.short || DURATION.short,
  });
}

export function notifyWarning({ label, description, duration, ignoreDuplicates } = {}) {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NOTIFY_TYPE.warning,
    duration: duration || globalNotifyDuration?.medium || DURATION.medium,
  });
}

export function notifyError({ label, description, duration, ignoreDuplicates } = {}) {
  notify({
    label,
    description,
    ignoreDuplicates,
    type: NOTIFY_TYPE.error,
    duration: duration || globalNotifyDuration?.long || DURATION.long,
  });
}

export function clearNotifications() {
  window.dispatchEvent(notifyClearAllEvent);
}

export function setDelayedNotify(settings) {
  localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(settings));
}

export function getDelayedNotify() {
  const notifyData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID));

  clearNotifications();

  if (notifyData) {
    notify(notifyData);
    localStorage.removeItem(LOCAL_STORAGE_ID);
  }
}
