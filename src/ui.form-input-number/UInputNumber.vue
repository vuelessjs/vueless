<script setup lang="ts">
import { computed } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { UInputNumber } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { UInputNumberProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UInputNumberProps>(), {
  step: getDefault<UInputNumberProps>(defaultConfig, UInputNumber).step,
  min: getDefault<UInputNumberProps>(defaultConfig, UInputNumber).min,
  max: getDefault<UInputNumberProps>(defaultConfig, UInputNumber).max,
  labelAlign: getDefault<UInputNumberProps>(defaultConfig, UInputNumber).labelAlign,
  size: getDefault<UInputNumberProps>(defaultConfig, UInputNumber).size,
  disabled: getDefault<UInputNumberProps>(defaultConfig, UInputNumber).disabled,
  dataTest: "",
  config: () => ({}),
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
        :name="config.defaults?.removeIcon"
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
        :name="config.defaults?.addIcon"
        :color="isAddButtonDisabled ? 'gray' : 'grayscale'"
        v-bind="addIconAttrs"
      />
    </UButton>
  </ULabel>
</template>
