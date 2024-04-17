/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const UDropdownButton = "UDropdownButton";

export const BUTTON_VARIANT = {
  primary: "primary",
};

export const LIST_POSITION = {
  bottom: "bottom",
  right: "right",
};
