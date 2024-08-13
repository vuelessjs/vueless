<template>
  <div v-bind="wrapperAttrs" :data-cy="dataCy">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import UIService from "../service.ui";

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
    default: UIService.get(defaultConfig, URow).default.gap,
  },

  /**
   * Nested items vertical align (flex align-items).
   * @values start, end, center, stretch, baseline
   */
  align: {
    type: String,
    default: UIService.get(defaultConfig, URow).default.align,
  },

  /**
   * Nested items horizontally align (flex justify-content).
   * @values start, end, center, around, evenly, between
   */
  justify: {
    type: String,
    default: UIService.get(defaultConfig, URow).default.justify,
  },

  /**
   * Reverse nested items order.
   */
  reverse: {
    type: Boolean,
    default: UIService.get(defaultConfig, URow).default.reverse,
  },

  /**
   * Allow items to wrap (flex flex-wrap).
   */
  wrap: {
    type: Boolean,
    default: UIService.get(defaultConfig, URow).default.wrap,
  },

  /**
   * Disables mobile adaptivity.
   */
  noMobile: {
    type: Boolean,
    default: UIService.get(defaultConfig, URow).default.noMobile,
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
