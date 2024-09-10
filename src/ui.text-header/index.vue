<template>
  <component :is="tag" v-bind="headerAttrs" :data-test="dataTest">
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup>
import { getDefault } from "../utils/utilsUI";

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
   * Header color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UHeader).color,
  },

  /**
   * Allows changing HTML tag.
   */
  tag: {
    type: String,
    default: getDefault(defaultConfig, UHeader).tag,
  },

  /**
   * Removes text line height (disable for multiline headers).
   */
  line: {
    type: Boolean,
    default: getDefault(defaultConfig, UHeader).line,
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
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const { headerAttrs } = useAttrs(props);
</script>
