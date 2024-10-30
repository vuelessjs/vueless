<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import { getDefault } from "../utils/utilUI.ts";

import { UCol } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * The distance between nested elements.
   * @values none, 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl
   */
  gap: {
    type: String,
    default: getDefault(defaultConfig, UCol).gap,
  },

  /**
   * Items horizontal align (align-items).
   * @values start, end, center, stretch, baseline
   */
  align: {
    type: String,
    default: getDefault(defaultConfig, UCol).align,
  },

  /**
   * Items horizontal align for multi-row flex containers (align-content).
   * @values start, end, center, around, evenly, between, normal, stretch, baseline
   */
  content: {
    type: String,
    default: getDefault(defaultConfig, UCol).content,
  },

  /**
   * Items vertical align (justify-content).
   * @values start, end, center, around, evenly, between
   */
  justify: {
    type: String,
    default: getDefault(defaultConfig, UCol).justify,
  },

  /**
   * Reverse nested items order.
   */
  reverse: {
    type: Boolean,
    default: getDefault(defaultConfig, UCol).reverse,
  },

  /**
   * Allow items to wrap (flex flex-wrap).
   */
  wrap: {
    type: Boolean,
    default: getDefault(defaultConfig, UCol).wrap,
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

const { wrapperAttrs } = useAttrs(props);
</script>
