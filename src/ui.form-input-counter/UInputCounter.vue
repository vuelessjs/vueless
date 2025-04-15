<script setup lang="ts">
import { ref, computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UInputNumber from "../ui.form-input-number/UInputNumber.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

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

const count = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isAddButtonDisabled = computed(() => count.value >= props.max);
const isRemoveButtonDisabled = computed(() => count.value <= props.min);

const addIntervalId = ref<number | null>(null);
const removeIntervalId = ref<number | null>(null);
const addIterationCount = ref(0);
const removeIterationCount = ref(0);

function clearIntervals() {
  if (addIntervalId.value !== null) {
    clearInterval(addIntervalId.value);
    addIntervalId.value = null;
    addIterationCount.value = 0;
  }

  if (removeIntervalId.value !== null) {
    clearInterval(removeIntervalId.value);
    removeIntervalId.value = null;
    removeIterationCount.value = 0;
  }
}

function onClickRemove() {
  const current = Number(count.value) || 0;
  const newCount = current - props.step;

  count.value = newCount >= props.min ? newCount : props.min;
}

function onClickAdd() {
  const current = Number(count.value) || 0;
  const newCount = current + props.step;

  count.value = newCount <= props.max ? newCount : props.max;
}

function startAddTimer() {
  onClickAdd();
  addIterationCount.value++;

  addIntervalId.value = window.setInterval(() => {
    onClickAdd();
    addIterationCount.value++;

    if (addIterationCount.value === 4) {
      clearInterval(addIntervalId.value!);
      addIntervalId.value = window.setInterval(() => {
        onClickAdd();
      }, 50);
    }
  }, 150);
}

function startRemoveTimer() {
  onClickRemove();
  removeIterationCount.value++;

  removeIntervalId.value = window.setInterval(() => {
    onClickRemove();
    removeIterationCount.value++;

    if (removeIterationCount.value === 4) {
      clearInterval(removeIntervalId.value!);
      removeIntervalId.value = window.setInterval(() => {
        onClickRemove();
      }, 50);
    }
  }, 150);
}

function onAddMouseDown() {
  if (!isAddButtonDisabled.value && !props.disabled) {
    startAddTimer();
  }
}

function onAddMouseUp() {
  clearIntervals();
}

function onAddMouseLeave() {
  clearIntervals();
}

function onRemoveMouseDown() {
  if (!isRemoveButtonDisabled.value && !props.disabled) {
    startRemoveTimer();
  }
}

function onRemoveMouseUp() {
  clearIntervals();
}

function onRemoveMouseLeave() {
  clearIntervals();
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  counterInputAttrs,
  removeButtonAttrs,
  removeIconAttrs,
  addButtonAttrs,
  addIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs">
    <UButton
      variant="ghost"
      size="xs"
      square
      color="neutral"
      :disabled="isRemoveButtonDisabled || disabled"
      v-bind="removeButtonAttrs"
      :data-test="getDataTest('remove')"
      @click.prevent
      @mousedown="onRemoveMouseDown"
      @mouseup="onRemoveMouseUp"
      @mouseleave="onRemoveMouseLeave"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.removeIcon"
        :color="isRemoveButtonDisabled ? 'neutral' : 'grayscale'"
        v-bind="removeIconAttrs"
      />
    </UButton>

    <UInputNumber
      v-model="count"
      :size="size"
      :disabled="disabled"
      :readonly="!editable"
      v-bind="counterInputAttrs"
    />

    <!-- <div v-bind="numberAttrs">
    <div v-bind="valueAttrs" v-text="count" />
  </div> -->

    <UButton
      variant="ghost"
      size="xs"
      square
      color="neutral"
      :disabled="isAddButtonDisabled || disabled"
      v-bind="addButtonAttrs"
      :data-test="getDataTest('add')"
      @click.prevent
      @mousedown="onAddMouseDown"
      @mouseup="onAddMouseUp"
      @mouseleave="onAddMouseLeave"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.addIcon"
        :color="isAddButtonDisabled ? 'neutral' : 'grayscale'"
        v-bind="addIconAttrs"
      />
    </UButton>
  </div>
</template>
