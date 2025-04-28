<script setup lang="ts">
import { ref, computed, useTemplateRef, watch } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UInputNumber from "../ui.form-input-number/UInputNumber.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";
import type { Ref } from "vue";
import type UInput from "../ui.form-input/UInput.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const emit = defineEmits([
  /**
   * Triggers when the input value changes.
   * @property {number} modelValue
   */
  "update:modelValue",
]);

const inputComponentRef = useTemplateRef<InstanceType<typeof UInput>>("inputComponent");

const addIntervalId = ref<number | null>(null);
const subtractIntervalId = ref<number | null>(null);
const addIterationCount = ref(0);
const subtractIterationCount = ref(0);

const count = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isAddButtonDisabled = computed(() => {
  return Number(count.value) >= props.max;
});

const isSubtractButtonDisabled = computed(() => {
  return Number(count.value) <= props.min;
});

watch([count, () => props.readonly], () => setTimeout(setInputSize, 0), { immediate: true });

function clearIntervals() {
  if (addIntervalId.value) {
    clearInterval(addIntervalId.value);
    addIntervalId.value = null;
    addIterationCount.value = 0;
  }

  if (subtractIntervalId.value) {
    clearInterval(subtractIntervalId.value);
    subtractIntervalId.value = null;
    subtractIterationCount.value = 0;
  }
}

function onClickSubtract() {
  const current = Number(count.value) || 0;
  const newCount = current - props.step;

  count.value = newCount >= props.min ? newCount : props.min;
}

function onClickAdd() {
  const current = Number(count.value) || 0;
  const newCount = current + props.step;

  count.value = newCount <= props.max ? newCount : props.max;
}

function startTimer(
  actionFn: () => void,
  iterationCount: Ref<number>,
  intervalId: Ref<number | null>,
) {
  actionFn();
  iterationCount.value++;

  intervalId.value = window.setInterval(() => {
    actionFn();
    iterationCount.value++;

    if (intervalId.value && iterationCount.value === 4) {
      clearInterval(intervalId.value);
      intervalId.value = window.setInterval(() => {
        actionFn();
      }, 50);
    }
  }, 150);
}

function onAddMouseDown() {
  if (!isAddButtonDisabled.value && !props.disabled) {
    startTimer(onClickAdd, addIterationCount, addIntervalId);
  }
}

function onSubtractMouseDown() {
  if (!isSubtractButtonDisabled.value && !props.disabled) {
    startTimer(onClickSubtract, subtractIterationCount, subtractIntervalId);
  }
}

function onMouseUp() {
  clearIntervals();
}

function onMouseLeave() {
  clearIntervals();
}

function onBlur() {
  if (Number(count.value) > props.max) count.value = props.max;
  if (Number(count.value) < props.min) count.value = props.min;
}

function onInput() {
  setInputSize();
}

function setInputSize() {
  if (inputComponentRef.value && !props.readonly) {
    inputComponentRef.value.input.size = inputComponentRef?.value?.input?.value.length || 1;
  }
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  counterTextAttrs,
  counterInputAttrs,
  subtractButtonAttrs,
  subtractIconAttrs,
  addButtonAttrs,
  addIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs">
    <UButton
      round
      square
      :size="size"
      variant="outlined"
      :disabled="isSubtractButtonDisabled || disabled"
      v-bind="subtractButtonAttrs"
      :data-test="getDataTest('subtract')"
      @click.prevent
      @mousedown="onSubtractMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <UIcon
        internal
        size="xs"
        :name="config.defaults.subtractIcon"
        :disabled="isSubtractButtonDisabled || disabled"
        v-bind="subtractIconAttrs"
      />
    </UButton>

    <div v-if="readonly" v-bind="counterTextAttrs" v-text="count" />

    <UInputNumber
      v-else
      ref="inputComponent"
      v-model="count"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
      v-bind="counterInputAttrs"
      @blur="onBlur"
      @input="onInput"
    />

    <UButton
      round
      square
      variant="outlined"
      :disabled="isAddButtonDisabled || disabled"
      v-bind="addButtonAttrs"
      :data-test="getDataTest('add')"
      @click.prevent
      @mousedown="onAddMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <UIcon
        internal
        size="xs"
        :name="config.defaults.addIcon"
        :disabled="isAddButtonDisabled || disabled"
        v-bind="addIconAttrs"
      />
    </UButton>
  </div>
</template>
