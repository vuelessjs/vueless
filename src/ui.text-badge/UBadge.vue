<script setup lang="ts">
import { useTemplateRef, computed, useSlots } from "vue";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
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

const { getDataTest, badgeAttrs, bodyAttrs, leftIconAttrs, centerIconAttrs, rightIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div
    ref="wrapper"
    v-bind="badgeAttrs"
    :data-test="getDataTest()"
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
      -->
      <slot name="left" :icon-name="leftIcon">
        <UIcon v-if="leftIcon" internal :name="leftIcon" color="inherit" v-bind="leftIconAttrs" />
      </slot>

      <!--
        @slot Use it to add something instead of the label.
        @binding {string} label
        @binding {string} icon-name
      -->
      <slot name="default" :label="label" :icon-name="icon">
        <UIcon v-if="icon" internal :name="icon" color="inherit" v-bind="centerIconAttrs" />
        <template v-else>
          {{ label }}
        </template>
      </slot>

      <!--
        @slot Use it to add icon after the text.
        @binding {string} icon-name
      -->
      <slot name="right" :icon-name="rightIcon">
        <UIcon
          v-if="rightIcon"
          :name="rightIcon"
          color="inherit"
          internal
          v-bind="rightIconAttrs"
        />
      </slot>
    </div>
  </div>
</template>
