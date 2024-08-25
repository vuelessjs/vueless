<template>
  <ULabel
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :disabled="disabled"
    align="topWithDesc"
    :data-test="dataTest"
    v-bind="labelAttrs"
  >
    <div v-bind="listAttrs">
      <slot>
        <UCheckbox
          v-for="(option, index) in options"
          :key="option.value"
          :model-value="modelValue"
          :value="option.value"
          :true-value="option.trueValue"
          :false-value="option.falseValue"
          :label="option.label"
          :description="option.description"
          :disabled="disabled"
          :data-test="`${dataTest}-item-${index}`"
          v-bind="checkboxAttrs"
        />
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import { provide, ref, watch } from "vue";
import { isEqual } from "lodash-es";

import { getDefault } from "../service.ui";

import ULabel from "../ui.form-label";
import UCheckbox from "../ui.form-checkbox";

import { UCheckboxGroup } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UCheckboxGroup", inheritAttrs: false });

const props = defineProps({
  /**
   * Checkbox group value.
   */
  modelValue: {
    type: Array,
    default: () => [],
  },

  /**
   * Checkbox group options.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Checkbox group label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Checkbox group description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Checkbox group error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Checkbox group size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UCheckboxGroup).size,
  },

  /**
   * Checkbox group color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UCheckboxGroup).color,
  },

  /**
   * Name for each checkbox.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Make checkbox disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UCheckboxGroup).disabled,
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
   * Triggers when checkbox value changes.
   * @property {object} value
   */
  "update:modelValue",
]);

const checkedItems = ref([]);

const { labelAttrs, checkboxAttrs, listAttrs } = useAttrs(props);

provide("setCheckboxGroupCheckedItems", (value) => (checkedItems.value = value));
provide("getCheckboxGroupCheckedItems", () => checkedItems.value);
provide("getCheckboxGroupName", () => props.name);
provide("getCheckboxGroupColor", () => props.color);
provide("getCheckboxSize", () => props.size);

watch(() => checkedItems.value.length, onChangeCheckedItems);
watch(() => props.modelValue.length, onModelValueChange, { immediate: true });

function onModelValueChange(newValue, oldValue) {
  if (!isEqual(newValue, oldValue)) {
    checkedItems.value = props.modelValue;
  }
}

function onChangeCheckedItems() {
  emit("update:modelValue", checkedItems.value);
}
</script>
