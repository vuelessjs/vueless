<template>
  <ULabel
    :for="id"
    :size="size"
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="labelAttrs"
  >
    <input
      :id="id"
      type="checkbox"
      :value="checkboxValue"
      :true-value="trueValue"
      :false-value="falseValue"
      :name="checkboxName"
      :checked="isChecked"
      :disabled="disabled"
      v-bind="checkboxAttrs"
      @change="onChange"
    />

    <label v-if="isChecked" v-bind="iconWrapperCellAttrs" :for="id">
      <UIcon
        internal
        :name="partial ? config.partialIconName : config.selectedIconName"
        :size="iconSize"
        color="white"
        v-bind="iconAttrs"
      />
    </label>

    <template #footer>
      <slot name="footer" />
    </template>
  </ULabel>
</template>

<script setup>
import { inject, ref, onMounted, computed } from "vue";
import { isEqual } from "lodash-es";

import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";

import UIService, { getRandomId } from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UCheckbox } from "./constants";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UCheckbox", inheritAttrs: false });

const checkboxGroupName = inject("checkboxGroupName", null);
const checkboxGroupCheckedItems = inject("checkboxGroupCheckedItems", null);
const setCheckboxGroupCheckedItems = inject("setCheckboxGroupCheckedItems", null);

const props = defineProps({
  /**
   * Checkbox value.
   */
  modelValue: {
    type: [Boolean, String, Number, Array, Object],
    default: false,
  },

  /**
   * Native value attribute.
   */
  value: {
    type: [Boolean, String, Number, Array, Object],
    default: "",
  },

  /**
   * Own value for checkbox checked state.
   */
  trueValue: {
    type: [Boolean, String, Number, Array, Object],
    default: true,
  },

  /**
   * Own value for checkbox unchecked state.
   */
  falseValue: {
    type: [Boolean, String, Number, Array, Object],
    default: false,
  },

  /**
   * Checkbox name.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Checkbox label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Checkbox label description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc, bottom, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, UCheckbox).default.labelAlign,
  },

  /**
   * Checkbox color.
   * @values brand, grayscale, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UCheckbox).default.color,
  },

  /**
   * Checkbox size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UCheckbox).default.size,
  },

  /**
   * Make checkbox disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UCheckbox).default.disabled,
  },

  /**
   * Make checkbox partially checked (change the checked tick to a minus).
   */
  partial: {
    type: Boolean,
    default: UIService.get(defaultConfig, UCheckbox).default.partial,
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

const emit = defineEmits(["update:modelValue", "input"]);

const checkboxName = ref("");

const { config, checkboxAttrs, iconWrapperCellAttrs, labelAttrs, iconAttrs } = useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const isBinary = computed(() => !Array.isArray(props.modelValue));
const isCheckboxInGroup = computed(() => Boolean(checkboxGroupName));

const isChecked = computed(() => {
  return isBinary.value && !isCheckboxInGroup.value
    ? isEqual(props.modelValue, props.trueValue)
    : currentValue.value.findIndex((item) => isEqual(item, checkboxValue.value)) !== -1;
});

const checkboxValue = computed(() => {
  return props.value === "" ? "on" : props.value;
});

const currentValue = computed(() => {
  return isCheckboxInGroup.value ? checkboxGroupCheckedItems.value : props.modelValue;
});

onMounted(() => {
  checkboxName.value = isCheckboxInGroup.value ? checkboxGroupName : props.name;
});

function onChange() {
  let newModelValue;

  if (isBinary.value) {
    newModelValue = isChecked.value ? props.falseValue : props.trueValue;
  }

  if (!isBinary.value || isCheckboxInGroup.value) {
    newModelValue = !isChecked.value
      ? [...currentValue.value, checkboxValue.value]
      : currentValue.value.filter((item) => !isEqual(checkboxValue.value, item));
  }

  if (isCheckboxInGroup.value && setCheckboxGroupCheckedItems) {
    setCheckboxGroupCheckedItems(newModelValue);
  }

  emit("update:modelValue", newModelValue);
  emit("input", newModelValue);
}
</script>
