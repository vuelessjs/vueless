<template>
  <UCheckbox
    :model-value="isChecked"
    :label="selected.label"
    :description="selected.description"
    :name="name"
    :size="size"
    :color="color"
    :placement="placement"
    v-bind="checkboxAttrs"
    @click.self="onClickCheckbox"
  />
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";

import UIService from "../service.ui";
import UCheckbox from "../ui.form-checkbox";

import defaultConfig from "./configs/default.config";
import { UCheckboxMultiState } from "./constants";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UCheckboxMultiState", inheritAttrs: false });

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
    default: UIService.get(defaultConfig, UCheckboxMultiState).default.size,
  },

  /**
   * Checkbox color.
   * @values brand, grayscale, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UCheckboxMultiState).default.color,
  },

  /**
   * Label placement.
   * @values left, right
   */
  placement: {
    type: String,
    default: UIService.get(defaultConfig, UCheckboxMultiState).default.placement,
  },

  /**
   * Make checkbox disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UCheckboxMultiState).default.disabled,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
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

const { checkboxAttrs } = useAttrs(props, { selected });

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
