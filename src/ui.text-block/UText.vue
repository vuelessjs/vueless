<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <div v-if="!hasSlotContent($slots['default'])" v-bind="htmlAttrs" v-html="html" />
    <slot />
  </div>
</template>

<script setup>
import { getDefault } from "../utils/utilUI.js";

import { UText } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * НTML markdown or plain text.
   */
  html: {
    type: String,
    default: undefined,
  },

  /**
   * Text size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UText).size,
  },

  /**
   * Text align.
   * @values left, center, right
   */
  align: {
    type: String,
    default: getDefault(defaultConfig, UText).align,
  },

  /**
   * Remove line height (useful for 1-line text).
   */
  line: {
    type: Boolean,
    default: getDefault(defaultConfig, UText).line,
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

const { wrapperAttrs, htmlAttrs, hasSlotContent } = useAttrs(props);
</script>
