/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const COMPONENT_NAME = "USelect";

export const DIRECTION = {
  top: "top",
  bottom: "bottom",
};

export const KEYS = {
  enter: "Enter",
};

export const MULTIPLE_VARIANTS = {
  list: "list",
  inline: "inline",
  tags: "tags",
};
