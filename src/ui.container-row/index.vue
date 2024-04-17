<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import UIService from "../service.ui";

import { URow } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "URow", inheritAttrs: false });

const props = defineProps({
  /**
   * Disables mobile adaptivity.
   */
  noMobile: {
    type: Boolean,
    default: UIService.get(defaultConfig, URow).default.noMobile,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const { wrapperAttrs } = useAttrs(props);
</script>
