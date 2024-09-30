<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import { getDefault } from "../utils/utilUI.js";

import { URow } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * The distance between nested elements.
   * @values none, 2xs, xs, sm, md, lg, xl, 2xl
   */
  gap: {
    type: String,
    default: getDefault(defaultConfig, URow).gap,
  },

  /**
   * Items vertical align (align-items).
   * @values start, end, center, stretch, baseline
   */
  align: {
    type: String,
    default: getDefault(defaultConfig, URow).align,
  },

  /**
   * Items vertical align for multi-row flex containers (align-content).
   * @values start, end, center, around, evenly, between, normal, stretch, baseline
   */
  content: {
    type: String,
    default: getDefault(defaultConfig, URow).content,
  },

  /**
   * Items horizontally align (justify-content).
   * @values start, end, center, around, evenly, between
   */
  justify: {
    type: String,
    default: getDefault(defaultConfig, URow).justify,
  },

  /**
   * Reverse nested items order.
   */
  reverse: {
    type: Boolean,
    default: getDefault(defaultConfig, URow).reverse,
  },

  /**
   * Allow items to wrap (flex flex-wrap).
   */
  wrap: {
    type: Boolean,
    default: getDefault(defaultConfig, URow).wrap,
  },

  /**
   * Disables mobile adaptivity.
   */
  noMobile: {
    type: Boolean,
    default: getDefault(defaultConfig, URow).noMobile,
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

const { wrapperAttrs } = useAttrs(props);
</script>
