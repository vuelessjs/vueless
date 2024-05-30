<template>
  <progress v-bind="progressAttrs" :max="max" :value="value" />
</template>

<script setup>
import UIService from "../service.ui";

import { UProgress } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UProgress", inheritAttrs: false });

const props = defineProps({
  /**
   * Progress value (current step).
   */
  value: {
    type: Number,
    required: true,
    default: 0,
  },

  /**
   * Progress max amount of steps.
   */
  max: {
    type: Number,
    default: 100,
  },

  /**
   * Progress size.
   * @values 2xs, xs, sm, md, lg, xl, 2xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UProgress).default.size,
  },

  /**
   * Progress color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UProgress).default.color,
  },
});

const { progressAttrs } = useAttrs(props);
</script>
