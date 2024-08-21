<template>
  <component :is="tag" v-bind="wrapperAttrs" :data-cy="dataCy">
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup>
import { getDefault } from "../service.ui";

import { UHeader } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UHeader", inheritAttrs: false });

const props = defineProps({
  /**
   * Header label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Header size.
   * @values xs, sm, md, lg, xl, 2xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UHeader).size,
  },

  /**
   * Header weight.
   * @values regular, medium, bold
   */
  weight: {
    type: String,
    default: getDefault(defaultConfig, UHeader).weight,
  },

  /**
   * Header color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UHeader).color,
  },

  /**
   * Allows changing button html tag.
   */
  tag: {
    type: String,
    default: getDefault(defaultConfig, UHeader).tag,
  },

  /**
   * Return default line height to the component (it may be useful for multiline headers).
   */
  multiline: {
    type: Boolean,
    default: getDefault(defaultConfig, UHeader).multiline,
  },

  /**
   * Show the underline.
   */
  underlined: {
    type: Boolean,
    default: getDefault(defaultConfig, UHeader).underlined,
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

const { wrapperAttrs } = useAttrs(props);
</script>
