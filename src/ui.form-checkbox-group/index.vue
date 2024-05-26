<template>
  <ULabel
    :for="id"
    :label="label"
    :error="error"
    align="topWithDesc"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="labelAttrs"
  >
    {{ option }}
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
          :data-cy="`${dataCy}-item-${index}`"
          v-bind="checkboxAttrs"
        />
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import { provide, ref, watch } from "vue";
import { isEqual } from "lodash-es";

import UIService, { getRandomId } from "../service.ui";

import ULabel from "../ui.form-label";
import UCheckbox from "../ui.form-checkbox";

import { UCheckboxGroup } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UCheckboxGroup", inheritAttrs: false });

const props = defineProps({
  /**
   * Checkbox group label.
   */
  label: {
    type: String,
    default: "",
  },

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
   * Error description.
   */
  error: {
    type: String,
    default: "",
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
    default: UIService.get(defaultConfig, UCheckboxGroup).default.disabled,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
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

const emit = defineEmits(["update:modelValue"]);

const checkedItems = ref([]);

const { labelAttrs, checkboxAttrs, listAttrs } = useAttrs(props);

provide("setCheckboxGroupCheckedItems", (value) => (checkedItems.value = value));
provide("checkboxGroupCheckedItems", checkedItems);
provide("checkboxGroupName", props.name);

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
