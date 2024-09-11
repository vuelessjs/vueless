<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
    <UButton
      variant="thirdary"
      size="sm"
      filled
      square
      round
      :disabled="isRemoveButtonDisabled"
      v-bind="removeButtonAttrs"
      @click="onClickRemove"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.removeIcon"
        :color="isRemoveButtonDisabled ? 'gray' : 'grayscale'"
        :data-test="`${dataTest}-remove`"
        v-bind="removeIconAttrs"
      />
    </UButton>

    <div v-bind="numberAttrs">
      <div v-bind="valueAttrs" v-text="count" />
      <div v-bind="textAttrs" v-text="label" />
    </div>

    <UButton
      variant="thirdary"
      size="sm"
      filled
      square
      round
      :disabled="isAddButtonDisabled"
      v-bind="addButtonAttrs"
      @click="onClickAdd"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.addIcon"
        :color="isAddButtonDisabled ? 'gray' : 'grayscale'"
        :data-test="`${dataTest}-add`"
        v-bind="addIconAttrs"
      />
    </UButton>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import { getDefault } from "../utils/utilUI.js";

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
    default: 1,
  },

  /**
   * Input min value.
   */
  min: {
    type: Number,
    default: 1,
  },

  /**
   * Input max value.
   */
  max: {
    type: Number,
    default: 999,
  },

  /**
   * Input label below number.
   */
  label: {
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
   * Component ui config object.
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
  textAttrs,
  removeButtonAttrs,
  removeIconAttrs,
  addButtonAttrs,
  addIconAttrs,
  wrapperAttrs,
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
