<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import { getDefault } from "../utils/utilsUI";

import { URow } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "URow", inheritAttrs: false });

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
   * Nested items vertical align (flex align-items).
   * @values start, end, center, stretch, baseline
   */
  align: {
    type: String,
    default: getDefault(defaultConfig, URow).align,
  },

  /**
   * Nested items horizontally align (flex justify-content).
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
