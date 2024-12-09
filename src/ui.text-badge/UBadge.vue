<script setup lang="ts">
import { useTemplateRef, computed, useSlots } from "vue";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import { UBadge } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, IconSize, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UBadge),
  label: "",
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

const slots = useSlots();

const wrapperRef = useTemplateRef<HTMLElement>("wrapper");

const iconSize = computed(() => {
  const sizes = {
    sm: "3xs",
    md: "2xs",
    lg: "xs",
  };

  return sizes[props.size] as IconSize;
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

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  tabindex: Boolean(~Number(props.tabindex)),
  leftIcon: Boolean(props.leftIcon) || hasSlotContent(slots["left"]),
  rightIcon: Boolean(props.rightIcon) || hasSlotContent(slots["right"]),
}));

const { badgeAttrs, bodyAttrs, leftIconAttrs, centerIconAttrs, rightIconAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div
    ref="wrapper"
    v-bind="badgeAttrs"
    :data-test="dataTest"
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
