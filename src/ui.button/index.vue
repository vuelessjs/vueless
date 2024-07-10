<template>
  <component
    :is="tag"
    :id="id"
    ref="buttonRef"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="buttonAttrs"
  >
    <template v-if="loading">
      <!-- Label is needed to prevent changing button height -->
      <div v-bind="textAttrs" tabindex="-1" class="invisible w-0" v-text="label" />
      <ULoader :size="loaderSize" :color="componentColor" v-bind="loaderAttrs" />
    </template>

    <template v-else>
      <!-- @slot Use it to add icon before text. -->
      <div v-if="hasSlotContent($slots['icon-left']) || iconLeft" v-bind="leftIconSlotAttrs">
        <slot name="icon-left">
          <UIcon v-if="iconLeft" :name="iconLeft" :size="iconSize" :color="componentColor" />
        </slot>
      </div>

      <!-- @slot Use it to add something before text. -->
      <slot name="left" />

      <!-- @slot Use it to add something instead of text. -->
      <slot />
      <div v-if="label" v-bind="textAttrs" tabindex="-1" v-text="label" />

      <!-- @slot Use it to add something after text. -->
      <slot name="right" />

      <!-- @slot Use it to add icon after text. -->
      <div v-if="hasSlotContent($slots['icon-right']) || iconRight" v-bind="rightIconSlotAttrs">
        <slot name="icon-right" :size="iconSize">
          <UIcon v-if="iconRight" :name="iconRight" :size="iconSize" :color="componentColor" />
        </slot>
      </div>
    </template>
  </component>
</template>

<script setup>
import { computed, ref } from "vue";

import UIService, { getRandomId } from "../service.ui";
import ULoader from "../ui.loader";
import UIcon from "../ui.image-icon";

import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";
import { UButton } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UButton", inheritAttrs: false });

const props = defineProps({
  /**
   * Button variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UButton).default.variant,
  },

  /**
   * Button color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UButton).default.color,
  },

  /**
   * Button size.
   * @values 2xs, xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UButton).default.size,
  },

  /**
   * Left side icon name.
   */
  iconLeft: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  iconRight: {
    type: String,
    default: "",
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
    default: UIService.get(defaultConfig, UButton).default.tag,
  },

  /**
   * Fill the background for thirdary variant.
   */
  filled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UButton).default.filled,
  },

  /**
   * Disable the button.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UButton).default.disabled,
  },

  /**
   * Make the Button fill the width with its container.
   */
  block: {
    type: Boolean,
    default: UIService.get(defaultConfig, UButton).default.block,
  },

  /**
   * Set button corners rounded.
   */
  pill: {
    type: Boolean,
    default: UIService.get(defaultConfig, UButton).default.pill,
  },

  /**
   * Set the same paddings for the button.
   */
  square: {
    type: Boolean,
    default: UIService.get(defaultConfig, UButton).default.square,
  },

  /**
   * Enable loader.
   */
  loading: {
    type: Boolean,
    default: UIService.get(defaultConfig, UButton).default.loading,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const {
  buttonAttrs,
  loaderAttrs,
  textAttrs,
  leftIconSlotAttrs,
  rightIconSlotAttrs,
  hasSlotContent,
} = useAttrs(props);

const buttonRef = ref(null);

defineExpose({ buttonRef });

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
    md: "md",
    lg: "lg",
    xl: "xl",
  };

  return sizes[props.size];
});

const componentColor = computed(() => {
  return props.variant === "primary" ? "white" : props.color;
});
</script>
