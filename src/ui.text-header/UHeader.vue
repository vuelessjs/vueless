<template>
  <component :is="tag" v-bind="headerAttrs" :data-test="dataTest">
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup>
import { getDefault } from "../utils/ui.ts";

import { UHeader } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

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

const { headerAttrs } = useAttrs(props);
</script>
