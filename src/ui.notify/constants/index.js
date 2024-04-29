/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const UNotify = "UNotify";

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
