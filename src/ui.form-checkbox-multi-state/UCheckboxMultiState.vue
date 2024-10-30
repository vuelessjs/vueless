<template>
  <UCheckbox
    :model-value="isChecked"
    :label="selected.label"
    :description="selected.description"
    :name="name"
    :size="size"
    :color="color"
    :placement="placement"
    v-bind="multiStateCheckboxAttrs"
    @input="onClickCheckbox"
  />
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";

import { getDefault } from "../utils/utilUI.ts";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import defaultConfig from "./config.js";
import { UCheckboxMultiState } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Checkbox value.
   */
  modelValue: {
    type: [Boolean, String, Number],
    default: "",
  },

  /**
   * Checkbox state options.
   */
  options: {
    type: Array,
    default: () => [{ value: "", icon: "", label: "", description: "" }],
  },

  /**
   * Checkbox name.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Checkbox size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UCheckboxMultiState).size,
  },

  /**
   * Checkbox color.
   * @values brand, grayscale, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UCheckboxMultiState).color,
  },

  /**
   * Label placement.
   * @values left, right
   */
  placement: {
    type: String,
    default: getDefault(defaultConfig, UCheckboxMultiState).placement,
  },

  /**
   * Make checkbox disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UCheckboxMultiState).disabled,
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
   * Triggers when checkbox value changes.
   * @property {number} value
   */
  "update:modelValue",
]);

const index = ref(0);
const isChecked = ref(false);

const selected = computed(() => props.options[index.value]);

const { multiStateCheckboxAttrs } = useAttrs(props, { selected });

watchEffect(setIndex);

function setIndex() {
  const optionIndex = props.options.findIndex((item) => item.value === props.modelValue);

  index.value = ~optionIndex ? optionIndex : index.value;

  setChecked();
}

function setChecked() {
  setTimeout(() => (isChecked.value = !!props.options[index.value].icon), 0);
}

function onClickCheckbox() {
  index.value++;
  index.value = index.value < props.options.length ? index.value : 0;

  emit("update:modelValue", selected.value.value);
}
</script>
