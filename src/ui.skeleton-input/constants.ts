/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const COMPONENT_NAME = "USkeletonInput";

export const LABEL_ALIGN = {
  topInside: "topInside",
  top: "top",
  left: "left",
  right: "right",
} as const;
