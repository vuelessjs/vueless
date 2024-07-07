<template>
  <svg width="100%" height="100%" viewBox="0 0 40 40" v-bind="stepperSvgAttrs">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" v-bind="stepperGradientAttrs">
        <stop offset="0%" :stop-color="setStepperColor" />
        <stop offset="100%" :stop-color="setStepperColor" />
      </linearGradient>
    </defs>

    <circle
      cx="20"
      cy="20"
      r="15.91549430918954"
      fill="transparent"
      stroke-width="4"
      v-bind="stepperRingAttrs"
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
      <text y="45%" transform="translate(0, 2)">
        <tspan x="50%" text-anchor="middle">{{ value }}</tspan>
      </text>
    </g>
  </svg>
</template>

<script setup>
import colors from "tailwindcss/colors";

import { GRAY_COLORS } from "../../preset.tailwind/constants";

import { useAttrs } from "../composables/attrs.composable";

const props = defineProps({
  progressPercent: {
    type: String,
    required: true,
  },

  value: {
    type: Number,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  max: {
    type: Number,
    default: null,
  },

  config: {
    type: Object,
    default: () => ({}),
  },

  dataCy: {
    type: String,
    default: "",
  },
});

const { stepperRingAttrs, stepperCountAttrs, stepperGradientAttrs, stepperSvgAttrs } =
  useAttrs(props);

function setStepperColor() {
  return colors[props.color]
    ? colors[props.color][500]
    : GRAY_COLORS.includes(props.color)
      ? colors[props.color][900]
      : colors.zinc[900];
}
</script>
