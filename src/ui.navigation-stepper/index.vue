<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <UHeader :label="title" size="xs" v-bind="titleAttrs" />

    <div v-bind="stepperAttrs">
      <svg width="100%" height="100%" viewBox="0 0 40 40" v-bind="svgAttrs">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" v-bind="gradientAttrs">
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
          v-bind="ringAttrs"
        ></circle>

        <circle
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          stroke="url(#gradient)"
          stroke-width="4"
          :stroke-dasharray="fillPercentage"
          stroke-dashoffset="0"
        ></circle>
        <g v-bind="countAttrs">
          <text y="45%" transform="translate(0, 2)">
            <tspan x="50%" text-anchor="middle">{{ step }}</tspan>
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import colors from "tailwindcss/colors";

import UHeader from "../ui.text-header";
import UIService from "../service.ui";
import { grayColors } from "../preset.tailwind";

import { UStepper } from "./constants/index";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UStepper", inheritAttrs: false });

const props = defineProps({
  /**
   * Set component title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Set step number.
   */
  step: {
    type: Number,
    default: UIService.get(defaultConfig, UStepper).default.step,
  },

  /**
   * Icon color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UStepper).default.color,
  },

  /**
   * Set total number of steps.
   */
  totalSteps: {
    type: Number,
    default: null,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const { wrapperAttrs, titleAttrs, stepperAttrs, ringAttrs, countAttrs, gradientAttrs, svgAttrs } =
  useAttrs(props);

const setStepperColor = computed(() => {
  return colors[props.color]
    ? colors[props.color][500]
    : grayColors.includes(props.color)
      ? colors[props.color][900]
      : colors.zinc[900];
});

const fillPercentage = computed(() => {
  const maxCountPercent = 100;
  const activePercent = (props.step / props.totalSteps) * maxCountPercent;

  return `${activePercent} ${maxCountPercent}`;
});
</script>
