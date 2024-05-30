<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import UIService from "../service.ui";

import { UGroups } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UGroups", inheritAttrs: false });

const props = defineProps({
  /**
   * The distance between nested elements.
   * @values none, xs, sm, md, lg, xl
   */
  gap: {
    type: String,
    default: UIService.get(defaultConfig, UGroups).default.gap,
  },

  /**
   * Nested items align (flex align-items).
   * @values start, end, center, stretch, baseline
   */
  align: {
    type: String,
    default: UIService.get(defaultConfig, UGroups).default.align,
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
