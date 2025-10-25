/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const COMPONENT_NAME = "UNotify";
export const LOCAL_STORAGE_ID = "vueless:notify";

export enum NotificationType {
  Success = "success",
  Warning = "warning",
  Error = "error",
  Info = "info",
}

export enum NotificationPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
  Center = "center",
}

export enum NotificationDuration {
  Short = 4000,
  Medium = 8000,
  Long = 12000,
}
