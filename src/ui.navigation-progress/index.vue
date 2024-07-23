<template>
  <div v-bind="wrapperAttrs">
    <template v-if="isVariant.progress">
      <div v-if="indicator" v-bind="indicatorAttrs" :style="{ width: progressPercent }">
        <!--
          @slot Use it to add something instead of the progress indicator.
          @binding {number} percent
          @binding {number} value
          @binding {number} max
        -->
        <slot name="indicator" :percent="progressPercent" :value="value" :max="realMax">
          {{ progressPercent }}
        </slot>
      </div>

      <progress v-bind="progressAttrs" :max="realMax" :value="value" />
    </template>

    <div v-if="isSteps" v-bind="stepAttrs(!value && config.firstStep)">
      <template v-for="(step, index) in max" :key="index">
        <!--
          @slot Use it to add something instead of the progress step label.
          @binding {string} name
          @binding {number} step
          @binding {number} value
          @binding {number} max
        -->
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

    <StepperProgress
      v-if="isVariant.stepper"
      v-bind="stepperAttrs"
      :color="color"
      :max="realMax"
      :value="value"
      :data-cy="dataCy"
      :progress-percent="progressPercent"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIService from "../service.ui";
import useAttrs from "./composables/attrs.composable";

import defaultConfig from "./configs/default.config";
import { UProgress, VARIANT } from "./constants";

import StepperProgress from "./components/StepperProgress.vue";

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
   * Progress variant.
   * @values stepper, progress
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UProgress).default.variant,
  },

  /**
   * Progress indicator visibility.
   */
  indicator: {
    type: Boolean,
    default: UIService.get(defaultConfig, UProgress).default.indicator,
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

const { progressAttrs, wrapperAttrs, indicatorAttrs, stepAttrs, stepperAttrs, config } =
  useAttrs(props);

const isSteps = computed(() => Array.isArray(props.max));

const realMax = computed(() => {
  if (isSteps.value) {
    return props.max.length;
  }

  return Number(props.max);
});

const isVariant = computed(() => ({
  stepper: props.variant === VARIANT.stepper,
  progress: props.variant === VARIANT.progress,
}));

const progressPercent = computed(() => {
  const maxPercent = 100;
  const currentPercent = (props.value / realMax.value) * maxPercent;

  if (isVariant.value.progress) {
    return `${currentPercent}%`;
  }

  return `${currentPercent} ${maxPercent}`;
});

function isActiveStep(index) {
  return index + 1 == props.value;
}
</script>
