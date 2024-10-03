<template>
  <ULabel
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :disabled="disabled"
    align="topWithDesc"
    v-bind="groupLabelAttrs"
    :data-test="dataTest"
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
          v-bind="groupCheckboxAttrs"
          :data-test="`${dataTest}-item-${index}`"
        />
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import { provide, ref, watch } from "vue";
import { isEqual } from "lodash-es";

import { getDefault } from "../utils/utilUI.js";

import ULabel from "../ui.form-label/ULabel.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import { UCheckboxGroup } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

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
   * @property {object} value
   */
  "update:modelValue",
]);

const checkedItems = ref([]);

const { groupLabelAttrs, groupCheckboxAttrs, listAttrs } = useAttrs(props);

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
