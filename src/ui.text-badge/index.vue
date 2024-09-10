<template>
  <div
    ref="wrapperRef"
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

<script setup>
import { ref, computed } from "vue";

import { getDefault } from "../utils/utilsUI";
import UIcon from "../ui.image-icon";

import { UBadge } from "./constants";
import useAttrs from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UBadge", inheritAttrs: false });

const props = defineProps({
  /**
   *  Badge label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Badge variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UBadge).variant,
  },

  /**
   * Add border to the `thirdary` variant.
   */
  bordered: {
    type: Boolean,
    default: getDefault(defaultConfig, UBadge).bordered,
  },

  /**
   * Badge size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UBadge).size,
  },

  /**
   * Badge color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UBadge).color,
  },

  /**
   * Icon name (appears instead of label).
   */
  icon: {
    type: String,
    default: "",
  },

  /**
   * Left side icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Set badge corners rounded.
   */
  round: {
    type: Boolean,
    default: getDefault(defaultConfig, UBadge).round,
  },

  /**
   * Controls the keyboard “Tab” focus order of elements.
   */
  tabindex: {
    type: [String, Number],
    default: getDefault(defaultConfig, UBadge).tabindex,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
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

const wrapperRef = ref(null);

defineExpose({ wrapperRef });

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

function onBlur(event) {
  emit("blur", event);
}

function onKeydown(event) {
  emit("keydown", event);
}

function onClick(event) {
  emit("click", event);
}
</script>
