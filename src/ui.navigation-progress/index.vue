<template>
  <div v-bind="wrapperAttrs">
    <div v-if="indicator" v-bind="indicatorAttrs" :style="{ width: progressPercent }">
      <slot name="indicator" :percent="progressPercent" :value="value" :max="realMax">
        {{ progressPercent }}
      </slot>
    </div>

    <progress v-bind="progressAttrs" :max="realMax" :value="value" />

    <div v-if="isSteps" v-bind="stepAttrs(!value && config.firstStep)">
      <template v-for="(step, index) in max" :key="index">
        <slot
          v-if="isActiveStep(index)"
          :name="`step-${index}`"
          :step="step"
          :value="value"
          :max="max"
        >
          {{ step }}
        </slot>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIService from "../service.ui";
import { useAttrs } from "./composables/attrs.composable";

import defaultConfig from "./configs/default.config";
import { UProgress } from "./constants";

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
    type: [Number, Array],
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

  /**
   * Progress indicator visibility.
   */
  indicator: {
    type: Boolean,
    default: UIService.get(defaultConfig, UProgress).default.indicator,
  },
});

const { progressAttrs, wrapperAttrs, indicatorAttrs, stepAttrs, config } = useAttrs(props);

const isSteps = computed(() => Array.isArray(props.max));

const realMax = computed(() => {
  if (isSteps.value) {
    return props.max.length;
  }

  return Number(props.max);
});

const progressPercent = computed(() => `${(props.value / realMax.value) * 100}%`);

function isActiveStep(index) {
  return index + 1 == props.value;
}
</script>
