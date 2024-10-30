<template>
  <ULabel
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    :align="labelAlign"
    centred
    v-bind="labelAttrs"
    :data-test="dataTest"
  >
    <UButton
      variant="thirdary"
      size="sm"
      filled
      square
      round
      :disabled="isRemoveButtonDisabled || disabled"
      v-bind="removeButtonAttrs"
      :data-test="`${dataTest}-remove`"
      @click="onClickRemove"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.removeIcon"
        :color="isRemoveButtonDisabled ? 'gray' : 'grayscale'"
        v-bind="removeIconAttrs"
      />
    </UButton>

    <div v-bind="numberAttrs">
      <div v-bind="valueAttrs" v-text="count" />
    </div>

    <UButton
      variant="thirdary"
      size="sm"
      filled
      square
      round
      :disabled="isAddButtonDisabled || disabled"
      v-bind="addButtonAttrs"
      :data-test="`${dataTest}-add`"
      @click="onClickAdd"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.addIcon"
        :color="isAddButtonDisabled ? 'gray' : 'grayscale'"
        v-bind="addIconAttrs"
      />
    </UButton>
  </ULabel>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/utilUI.ts";

import defaultConfig from "./config.js";
import { UInputNumber } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Input value.
   */
  modelValue: {
    type: Number,
    required: true,
  },

  /**
   * Input step.
   */
  step: {
    type: Number,
    default: getDefault(defaultConfig, UInputNumber).step,
  },

  /**
   * Input min value.
   */
  min: {
    type: Number,
    default: getDefault(defaultConfig, UInputNumber).min,
  },

  /**
   * Input max value.
   */
  max: {
    type: Number,
    default: getDefault(defaultConfig, UInputNumber).max,
  },

  /**
   * Input label below number.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values top, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UInputNumber).labelAlign,
  },

  /**
   * Input description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UInputNumber).size,
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputNumber).disabled,
  },

  /**
   * Component config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when the input value changes.
   * @property {number} modelValue
   */
  "update:modelValue",
]);

const {
  config,
  valueAttrs,
  labelAttrs,
  removeButtonAttrs,
  removeIconAttrs,
  addButtonAttrs,
  addIconAttrs,
  numberAttrs,
} = useAttrs(props);

const count = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isAddButtonDisabled = computed(() => count.value >= props.max);
const isRemoveButtonDisabled = computed(() => count.value <= props.min);

function onClickRemove() {
  const newCount = count.value - props.step;

  count.value = newCount >= props.min ? newCount : count.value;
}

function onClickAdd() {
  const newCount = count.value + props.step;

  count.value = newCount <= props.max ? newCount : count.value;
}
</script>
