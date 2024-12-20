/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const COMPONENT_NAME = "ULabel";

export const PLACEMENT = {
  topInside: "topInside",
  topWithDesc: "topWithDesc",
  top: "top",
  left: "left",
  right: "right",
};
