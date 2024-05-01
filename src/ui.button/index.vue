<template>
  <button
    :id="id"
    ref="buttonRef"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="buttonAttrs"
    @click="onClick"
  >
    <!-- @slot Use it to add something before text. -->
    <slot v-if="!loading" name="left" />

    <!-- @slot Use it to add something instead of text. -->
    <slot v-if="!loading">
      <div v-if="label" v-bind="textAttrs" v-text="label" />
    </slot>

    <ULoader v-if="loading" :size="size" color="white" />

    <!-- @slot Use it to add something after text. -->
    <slot v-if="!loading" name="right" />
  </button>
</template>

<script setup>
import { ref } from "vue";

import UIService, { getRandomId } from "../service.ui";
import ULoader from "../ui.loader";

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
   * Fill the background for thirdary variant.
   */
  filled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UButton).default.filled,
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
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UButton).default.size,
  },

  /**
   * Button label.
   */
  label: {
    type: String,
    default: "",
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

const emit = defineEmits(["click"]);

const { textAttrs, buttonAttrs } = useAttrs(props);

const buttonRef = ref(null);

defineExpose({ buttonRef });

function onClick(event) {
  if (props.disabled) return;

  emit("click", event);

  // TODO: Maybe this should be removed (need to test)
  //document.getElementById(props.id).blur();
}
</script>
