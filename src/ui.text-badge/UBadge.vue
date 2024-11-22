<script setup lang="ts">
import { useTemplateRef, computed } from "vue";

import { getDefault } from "../utils/ui.ts";
import UIcon from "../ui.image-icon/UIcon.vue";

import { UBadge } from "./constants.ts";
import useAttrs from "./useAttrs.ts";
import defaultConfig from "./config.ts";

import type { UBadgeProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UBadgeProps>(), {
  variant: getDefault<UBadgeProps>(defaultConfig, UBadge).variant,
  bordered: getDefault<UBadgeProps>(defaultConfig, UBadge).bordered,
  size: getDefault<UBadgeProps>(defaultConfig, UBadge).size,
  color: getDefault<UBadgeProps>(defaultConfig, UBadge).color,
  round: getDefault<UBadgeProps>(defaultConfig, UBadge).round,
  tabindex: getDefault<UBadgeProps>(defaultConfig, UBadge).tabindex,
  dataTest: "",
});

const emit = defineEmits([
  /**
   * Triggers when the badge is focused.
   */
  "focus",

  /**
   * Triggers when the badge is pressed.
   */
  "keydown",

  /**
   * Triggers when the badge loses focus.
   */
  "blur",

  /**
   * Triggers when the badge is clicked.
   */
  "click",
]);

const { badgeAttrs, bodyAttrs, leftIconAttrs, centerIconAttrs, rightIconAttrs } = useAttrs(props);

const wrapperRef = useTemplateRef<HTMLElement>("wrapper");

const iconSize = computed(() => {
  const sizes = {
    sm: "3xs",
    md: "2xs",
    lg: "xs",
  };

  return sizes[props.size];
});

const iconColor = computed(() => {
  return props.variant === "primary" ? "white" : props.color;
});

function onFocus() {
  emit("focus");
}

function onBlur(event: FocusEvent) {
  emit("blur", event);
}

function onKeydown(event: KeyboardEvent) {
  emit("keydown", event);
}

function onClick(event: MouseEvent) {
  emit("click", event);
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  wrapperRef,
});
</script>

<template>
  <div
    ref="wrapper"
    :data-test="dataTest"
    v-bind="badgeAttrs"
    :tabindex="tabindex"
    @blur="onBlur"
    @focus="onFocus"
    @keydown="onKeydown"
    @click="onClick"
  >
    <div v-bind="bodyAttrs">
      <!--
          @slot Use it to add icon before the text.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {string} icon-color
        -->
      <slot name="left" :icon-name="leftIcon" :icon-size="iconSize" :icon-color="iconColor">
        <UIcon
          v-if="leftIcon"
          internal
          :name="leftIcon"
          :size="iconSize"
          :color="iconColor"
          v-bind="leftIconAttrs"
        />
      </slot>

      <!--
        @slot Use it to add something instead of the label.
        @binding {string} label
        @binding {string} icon-name
        @binding {string} icon-size
        @binding {string} icon-color
      -->
      <slot
        name="default"
        :label="label"
        :icon-name="icon"
        :icon-size="iconSize"
        :icon-color="iconColor"
      >
        <UIcon
          v-if="icon"
          internal
          :name="icon"
          :size="iconSize"
          :color="iconColor"
          v-bind="centerIconAttrs"
        />
        <template v-else>
          {{ label }}
        </template>
      </slot>

      <!--
          @slot Use it to add icon after the text.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {string} icon-color
        -->
      <slot name="right" :icon-name="rightIcon" :icon-size="iconSize" :icon-color="iconColor">
        <UIcon
          v-if="rightIcon"
          :name="rightIcon"
          :size="iconSize"
          :color="iconColor"
          internal
          v-bind="rightIconAttrs"
        />
      </slot>
    </div>
  </div>
</template>
