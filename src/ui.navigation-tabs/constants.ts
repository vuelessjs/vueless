/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const COMPONENT_NAME = "UTabs";

export const SCROLL_OFFSET = 200;
export const DRAG_THRESHOLD = 5;
export const DRAG_CLICK_SUPPRESS_MS = 300;
