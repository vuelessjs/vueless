<template>
  <div v-bind="wrapperAttrs" :data-cy="dataCy">
    <!-- @slot Use it to add something. -->
    <div v-if="!hasSlotContent($slots['default'])" v-html="html" />
    <slot />
  </div>
</template>

<script setup>
import UIService from "../service.ui";

import { UText } from "./constatns";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UText" });

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
   * @values xs, sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UText).default.size,
  },

  /**
   * Text align.
   * @values left, center, right
   */
  align: {
    type: String,
    default: UIService.get(defaultConfig, UText).default.align,
  },

  /**
   * Remove line height.
   */
  line: {
    type: Boolean,
    default: UIService.get(defaultConfig, UText).default.line,
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

const { wrapperAttrs, hasSlotContent } = useAttrs(props);
</script>
