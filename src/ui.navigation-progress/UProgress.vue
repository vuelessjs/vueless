<script lang="ts" setup>
import { computed } from "vue";

import { getDefault } from "../utils/ui.ts";
import useAttrs from "./useAttrs.ts";

import defaultConfig from "./config.ts";
import { UProgress, VARIANT } from "./constants.ts";

import StepperProgress from "./StepperProgress.vue";
import UHeader from "../ui.text-header/UHeader.vue";

import type { UProgressProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UProgressProps>(), {
  value: 0,
  max: getDefault<UProgressProps>(defaultConfig, UProgress).max as number,
  size: getDefault<UProgressProps>(defaultConfig, UProgress).size,
  color: getDefault<UProgressProps>(defaultConfig, UProgress).color,
  variant: getDefault<UProgressProps>(defaultConfig, UProgress).variant,
  indicator: getDefault<UProgressProps>(defaultConfig, UProgress).indicator,
  dataTest: "",
});

const { progressAttrs, wrapperAttrs, indicatorAttrs, stepAttrs, stepperAttrs } = useAttrs(props);

const isSteps = computed(() => Array.isArray(props.max));

const realMax = computed(() => {
  if (Array.isArray(props.max)) {
    return props.max.length - 1;
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

function isActiveStep(index: number) {
  return index === props.value;
}
</script>

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

    <div v-if="isSteps" v-bind="stepAttrs">
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
          <UHeader v-if="isVariant.stepper" :label="String(step)" :size="size" />
          <template v-else>{{ step }}</template>
        </slot>
      </template>
    </div>

    <StepperProgress
      v-if="isVariant.stepper"
      v-bind="stepperAttrs"
      :color="color"
      :value="value"
      :data-test="dataTest"
      :progress-percent="progressPercent"
    />
  </div>
</template>
