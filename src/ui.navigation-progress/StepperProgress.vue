<script setup lang="ts">
import colors from "tailwindcss/colors.js";
import { computed } from "vue";

import { GRAY_COLORS } from "../constants.js";

import useAttrs from "./useAttrs.ts";

import type { StepperProgressProps } from "./types.ts";

const props = withDefaults(defineProps<StepperProgressProps>(), {
  dataTest: "",
});

const { stepperCircleAttrs, stepperCountAttrs, stepperGradientAttrs, stepperSvgAttrs } =
  useAttrs(props);

const stepperColor = computed(() => {
  return colors[props.color]
    ? colors[props.color][500]
    : GRAY_COLORS.includes(props.color)
      ? colors[props.color][900]
      : colors.zinc[900];
});
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
