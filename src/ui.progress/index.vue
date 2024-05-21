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
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  size: {
    type: String,
    default: UIService.get(defaultConfig, UProgress).default.size,
  },
  color: {
    type: String,
    default: UIService.get(defaultConfig, UProgress).default.color,
  },
});

const { progressAttrs } = useAttrs(props);
</script>
