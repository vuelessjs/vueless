<template>
  <ULabel
    :for="id"
    :label="label"
    :error="error"
    :size="checkboxSize"
    :align="labelAlign"
    :disabled="disabled"
    :description="description"
    v-bind="labelAttrs"
    :data-test="`${dataTest}-label`"
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
      :data-test="dataTest"
      @change="onChange"
    />

    <label v-if="isChecked" v-bind="iconWrapperAttrs" :for="id">
      <UIcon
        internal
        :name="partial ? config.defaults.partiallyCheckedIcon : config.defaults.checkedIcon"
        :size="iconSize"
        color="white"
        v-bind="checkedIconAttrs"
      />
    </label>

    <template #footer>
      <slot name="footer" />
    </template>
  </ULabel>
</template>

<script setup>
import { inject, ref, onMounted, computed, watchEffect, toValue } from "vue";
import { isEqual } from "lodash-es";

import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";

import { getRandomId, getDefault } from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UCheckbox } from "./constants";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UCheckbox", inheritAttrs: false });

const getCheckboxGroupName = inject("getCheckboxGroupName", null);
const getCheckboxGroupCheckedItems = inject("getCheckboxGroupCheckedItems", null);
const setCheckboxGroupCheckedItems = inject("setCheckboxGroupCheckedItems", null);
const getCheckboxGroupColor = inject("getCheckboxGroupColor", null);
const getCheckboxSize = inject("getCheckboxSize", null);

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
   * Error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UCheckbox).labelAlign,
  },

  /**
   * Checkbox color.
   * @values brand, grayscale, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UCheckbox).color,
  },

  /**
   * Checkbox size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UCheckbox).size,
  },

  /**
   * Make checkbox disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UCheckbox).disabled,
  },

  /**
   * Make checkbox partially checked (change the checked tick to a minus).
   */
  partial: {
    type: Boolean,
    default: getDefault(defaultConfig, UCheckbox).partial,
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
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when checkbox is toggled.
   * @property {Boolean} newModelValue
   */
  "update:modelValue",

  /**
   * Triggers when checkbox is toggled.
   * @property {Boolean} newModelValue
   */
  "input",
]);

const checkboxName = ref("");
const checkboxSize = ref(props.size);
const checkboxColor = ref(props.color);

const { config, checkboxAttrs, iconWrapperAttrs, labelAttrs, checkedIconAttrs } = useAttrs(props, {
  checkboxColor,
  checkboxSize,
});

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

const isBinary = computed(() => !Array.isArray(props.modelValue));
const isCheckboxInGroup = computed(() => Boolean(toValue(getCheckboxGroupName)));

const isChecked = computed(() => {
  return isBinary.value && !isCheckboxInGroup.value
    ? isEqual(props.modelValue, props.trueValue)
    : currentValue.value.findIndex((item) => isEqual(item, checkboxValue.value)) !== -1;
});

const checkboxValue = computed(() => {
  return props.value === "" ? "on" : props.value;
});

const currentValue = computed(() => {
  return isCheckboxInGroup.value ? toValue(getCheckboxGroupCheckedItems) : props.modelValue;
});

onMounted(() => {
  checkboxName.value = isCheckboxInGroup.value ? toValue(getCheckboxGroupName) : props.name;
});

watchEffect(() => (checkboxColor.value = toValue(getCheckboxGroupColor) || props.color));
watchEffect(() => (checkboxSize.value = toValue(getCheckboxSize) || props.size));

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
