/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const COMPONENT_NAME = "ULoaderProgress";

export const MAXIMUM = 99;
export const SPEED = 150;
