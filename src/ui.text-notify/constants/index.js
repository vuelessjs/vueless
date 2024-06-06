/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const UNotify = "UNotify";

export const LOCAL_STORAGE_ID = "vueless:notify";

export const NOTIFY_TYPE = {
  success: "success",
  warning: "warning",
  error: "error",
};

export const POSITION = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
  center: "center",
};

export const DURATION = {
  short: 4000,
  medium: 8000,
  long: 12000,
};

export const DELAY_BETWEEN_CLONES = 1000;
