<template>
  <div v-bind="dotAttrs" :data-test="dataTest" />
</template>

<script setup>
import { getDefault } from "../utils/utilsUI";

import { UDot } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDot", inheritAttrs: false });

const props = defineProps({
  /**
   * Dot color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UDot).color,
  },

  /**
   * Dot size.
   * @values xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UDot).size,
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

const { dotAttrs } = useAttrs(props);
</script>
