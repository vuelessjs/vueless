<script setup lang="ts">
import { computed, useId, useTemplateRef, toRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { useKnob } from "./useKnob";

import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: 0,
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the knob value is changed.
   * @property {number} modelValue
   */
  "update:modelValue",

  /**
   * Triggers when the knob value changes (on drag end or keyboard input).
   * @property {number} value
   */
  "change",
]);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const svgRef = useTemplateRef<SVGSVGElement>("svg");

const elementId = props.id || useId();

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function onUpdate(value: number) {
  internalValue.value = value;
}

function onChange(value: number) {
  emit("change", value);
}

const {
  normalizedValue,
  valuePercent,
  startAngleDeg,
  handleDragStart,
  handleWheel,
  handleKeydown,
  getCirclePathData,
  getHandlePosition,
} = useKnob({
  modelValue: toRef(() => props.modelValue),
  min: props.min,
  max: props.max,
  step: props.step,
  arcRange: props.arcRange,
  disabled: toRef(() => props.disabled),
  onUpdate,
  onChange,
});

const radius = 40;
const strokeWidth = 8;
const normalizedRadius = radius - strokeWidth / 2;
const circumference = 2 * Math.PI * normalizedRadius;

const trackDashArray = computed(() => {
  const arcLength = (props.arcRange / 360) * circumference;

  return `${arcLength} ${circumference}`;
});

const progressDashArray = computed(() => {
  return getCirclePathData(normalizedRadius, valuePercent.value);
});

const trackRotation = computed(() => {
  return startAngleDeg.value;
});

const handlePos = computed(() => {
  return getHandlePosition(normalizedRadius, strokeWidth);
});

const sizeVariant = computed(() => {
  if (props.size <= 80) return "sm";
  if (props.size <= 120) return "md";
  if (props.size <= 160) return "lg";

  return "xl";
});

function onMouseDown(event: MouseEvent) {
  if (wrapperRef.value) {
    handleDragStart(event, wrapperRef.value);
  }
}

function onTouchStart(event: TouchEvent) {
  if (wrapperRef.value) {
    handleDragStart(event, wrapperRef.value);
  }
}

defineExpose({
  /**
   * A reference to the wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
  /**
   * A reference to the SVG element for direct DOM manipulation.
   * @property {SVGSVGElement}
   */
  svgRef,
});

const mutatedProps = computed(() => ({
  disabled: Boolean(props.disabled),
  size: sizeVariant.value,
}));

const {
  getDataTest,
  wrapperAttrs,
  svgAttrs,
  trackCircleAttrs,
  progressCircleAttrs,
  handleAttrs,
  valueTextAttrs,
  knobLabelAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    :for="elementId"
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :align="labelAlign"
    centred
    v-bind="knobLabelAttrs"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div
      ref="wrapper"
      :style="{ width: `${size}px`, height: `${size}px` }"
      :role="'slider'"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="normalizedValue"
      :aria-label="label || 'Knob control'"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      v-bind="wrapperAttrs"
      :data-test="getDataTest()"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @wheel="handleWheel"
      @keydown="handleKeydown"
    >
      <svg
        ref="svg"
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
        v-bind="svgAttrs"
        :data-test="getDataTest('svg')"
      >
        <circle
          cx="50"
          cy="50"
          :r="normalizedRadius"
          fill="transparent"
          :stroke-width="strokeWidth"
          :stroke-dasharray="trackDashArray"
          :transform="`rotate(${trackRotation} 50 50)`"
          v-bind="trackCircleAttrs"
          :data-test="getDataTest('track')"
        />

        <circle
          cx="50"
          cy="50"
          :r="normalizedRadius"
          fill="transparent"
          :stroke-width="strokeWidth"
          :stroke-dasharray="progressDashArray"
          :transform="`rotate(${trackRotation} 50 50)`"
          stroke-linecap="round"
          v-bind="progressCircleAttrs"
          :data-test="getDataTest('progress')"
        />

        <circle
          :cx="handlePos.cx"
          :cy="handlePos.cy"
          :r="strokeWidth / 2 + 1"
          v-bind="handleAttrs"
          :data-test="getDataTest('handle')"
        />
      </svg>

      <div v-if="showValue" v-bind="valueTextAttrs" :data-test="getDataTest('value')">
        <!--
          @slot Use this to add custom content instead of the value display.
          @binding {number} value
          @binding {number} min
          @binding {number} max
        -->
        <slot name="value" :value="normalizedValue" :min="min" :max="max">
          {{ normalizedValue }}
        </slot>
      </div>
    </div>
  </ULabel>
</template>
