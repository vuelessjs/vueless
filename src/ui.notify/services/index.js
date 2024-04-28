import { globalComponentConfig, getRandomId } from "../../service.ui";

import { NOTIFY_TYPE } from "../constants";

const delayBetweenClones = 1000;

let lastMessageTime = undefined;
let lastMessage = undefined;

const defaultDuration = {
  short: 4000,
  medium: 8000,
  long: 12000,
};

const notifyClearAllEvent = new Event("notifyClearAll");

export function notify(settings) {
  const { type, label, text, duration, delayDuplicates } = settings;
  const currentNotifyDuration =
    duration || globalComponentConfig.UNotify?.duration?.short || defaultDuration.short;
  const isSameMessage = lastMessage === text && new Date() - lastMessageTime < delayBetweenClones;

  if ((isSameMessage || !text) && delayDuplicates) {
    return;
  }

  lastMessageTime = new Date();
  lastMessage = text;

  const detail = {
    type,
    id: getRandomId(),
    label: label || "",
    text: text || "",
    duration: currentNotifyDuration,
  };

  const notifyStart = new CustomEvent("notifyStart", { detail });
  const notifyEnd = new CustomEvent("notifyEnd", { detail });

  window.dispatchEvent(notifyStart);

  setTimeout(() => window.dispatchEvent(notifyEnd), currentNotifyDuration);
}

export function notifySuccess(text, duration = globalComponentConfig.UNotify?.duration?.short) {
  notify({
    type: NOTIFY_TYPE.success,
    text,
    duration,
  });
}

export function notifyWarning(text, duration = globalComponentConfig.UNotify?.duration?.medium) {
  notify({
    type: NOTIFY_TYPE.warning,
    text,
    duration,
  });
}

export function notifyError(text, duration = globalComponentConfig.UNotify?.duration?.long) {
  notify({
    type: NOTIFY_TYPE.error,
    text,
    duration,
  });
}

export function clearAllNotifications() {
  window.dispatchEvent(notifyClearAllEvent);
}

export function setDelayedNotify(settings) {
  localStorage.setItem("notify", JSON.stringify(settings));
}

export function getDelayedNotify() {
  const notifyData = JSON.parse(localStorage.getItem("notify"));

  clearAllNotifications();

  if (notifyData) {
    notify(notifyData);

    localStorage.removeItem("notify");
  }
}
