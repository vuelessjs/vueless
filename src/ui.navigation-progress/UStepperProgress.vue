<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { StepperProgressProps, Config } from "./types.ts";

defineOptions({ internal: true });

const props = withDefaults(defineProps<StepperProgressProps>(), {
  dataTest: "",
});

const stepperColor = computed(() => {
  return `var(--vl-${props.color})`;
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { stepperCircleAttrs, stepperCountAttrs, stepperGradientAttrs, stepperSvgAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <svg viewBox="0 0 40 40" v-bind="stepperSvgAttrs">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" v-bind="stepperGradientAttrs">
        <stop offset="0%" :stop-color="stepperColor" />
        <stop offset="100%" :stop-color="stepperColor" />
      </linearGradient>
    </defs>

    <circle
      cx="20"
      cy="20"
      r="15.91549430918954"
      fill="transparent"
      stroke-width="4"
      v-bind="stepperCircleAttrs"
    />

    <circle
      cx="20"
      cy="20"
      r="15.91549430918954"
      fill="transparent"
      stroke="url(#gradient)"
      stroke-width="4"
      :stroke-dasharray="progressPercent"
      stroke-dashoffset="0"
    />
    <g v-bind="stepperCountAttrs">
      <text y="45%">
        <tspan x="50%" text-anchor="middle">{{ value }}</tspan>
      </text>
    </g>
  </svg>
</template>
