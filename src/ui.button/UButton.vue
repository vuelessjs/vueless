<template>
  <component
    :is="tag"
    :id="elementId"
    ref="buttonRef"
    :disabled="disabled"
    v-bind="buttonAttrs"
    :style="buttonStyle"
    :tabindex="!loading ? tabindex : -1"
    :data-test="dataTest"
  >
    <template v-if="loading">
      <!-- Label is needed to prevent changing button height -->
      <div tabindex="-1" class="invisible w-0" v-text="label" />
      <ULoader :loading="loading" :size="loaderSize" :color="iconColor" v-bind="loaderAttrs" />
    </template>

    <template v-else>
      <!--
        @slot Use it to add something before the label.
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
        @slot Use it to add something after the label.
        @binding {string} icon-name
        @binding {string} icon-size
        @binding {string} icon-color
      -->
      <slot name="right" :icon-name="rightIcon" :icon-size="iconSize" :icon-color="iconColor">
        <UIcon
          v-if="rightIcon"
          internal
          :name="rightIcon"
          :size="iconSize"
          :color="iconColor"
          v-bind="rightIconAttrs"
        />
      </slot>
    </template>
  </component>
</template>

<script setup>
import { computed, ref, watchEffect, useId, watch } from "vue";

import { getDefault } from "../utils/utilUI.js";
import ULoader from "../ui.loader/ULoader.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import { UButton } from "./constants.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Button variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UButton).variant,
  },

  /**
   * Button color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UButton).color,
  },

  /**
   * Button size.
   * @values 2xs, xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UButton).size,
  },

  /**
   * Button label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Allows changing button html tag.
   */
  tag: {
    type: String,
    default: getDefault(defaultConfig, UButton).tag,
  },

  /**
   * Icon name (appears instead of label).
   */
  icon: {
    type: String,
    default: "",
  },

  /**
   * Left icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Controls the keyboard “Tab” focus order of elements.
   */
  tabindex: {
    type: [String, Number],
    default: getDefault(defaultConfig, UButton).tabindex,
  },

  /**
   * Fill the background for thirdary variant.
   */
  filled: {
    type: Boolean,
    default: getDefault(defaultConfig, UButton).filled,
  },

  /**
   * Disable the button.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UButton).disabled,
  },

  /**
   * Make the Button fill the width with its container.
   */
  block: {
    type: Boolean,
    default: getDefault(defaultConfig, UButton).block,
  },

  /**
   * Set button corners rounded.
   */
  round: {
    type: Boolean,
    default: getDefault(defaultConfig, UButton).round,
  },

  /**
   * Set the same paddings for the button.
   */
  square: {
    type: Boolean,
    default: getDefault(defaultConfig, UButton).square,
  },

  /**
   * Enable loader.
   */
  loading: {
    type: Boolean,
    default: getDefault(defaultConfig, UButton).loading,
  },

  /**
   * Remove button ring on focus.
   */
  noRing: {
    type: Boolean,
    default: getDefault(defaultConfig, UButton).noRing,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Component config object.
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

const elementId = props.id || useId();

const { buttonAttrs, loaderAttrs, leftIconAttrs, rightIconAttrs, centerIconAttrs } =
  useAttrs(props);

const buttonRef = ref(null);
const buttonStyle = ref(null);
const buttonWidth = ref(0);

const loaderSize = computed(() => {
  const sizes = {
    "2xs": "sm",
    xs: "sm",
    sm: "md",
    md: "md",
    lg: "lg",
    xl: "lg",
  };

  return sizes[props.size];
});

const iconSize = computed(() => {
  const sizes = {
    "2xs": "2xs",
    xs: "xs",
    sm: "sm",
    md: "sm",
    lg: "md",
    xl: "md",
  };

  return sizes[props.size];
});

const iconColor = computed(() => {
  return props.variant === "primary" ? "white" : props.color;
});

watch(
  () => props.loading,
  (newValue) => {
    if (newValue && buttonRef.value) {
      buttonWidth.value = buttonRef.value.offsetWidth;
    }

    buttonStyle.value = {
      width: newValue ? `${buttonWidth.value}px` : "auto",
    };
  },
  { immediate: true },
);

watchEffect(() => {
  props.loading && buttonRef.value.blur();
});

defineExpose({
  /**
   * A reference to the button element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  buttonRef,
});
</script>
