<template>
  <ULabel
    :size="labelSize"
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    centred
    v-bind="toggleLabelAttrs"
    :data-test="dataTest"
  >
    <div v-bind="itemsAttrs">
      <!-- @slot Use it to add UToggleItem directly. -->
      <slot>
        <UToggleItem
          v-for="(item, index) in options"
          :key="item.value"
          :name="name"
          :model-value="item.value"
          :value="item.value"
          :disabled="disabled"
          :label="item.label"
          :data-test="`${dataTest}-item-${index}`"
          v-bind="itemAttrs"
        />
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, provide, readonly } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import UToggleItem from "../ui.button-toggle-item/UToggleItem.vue";
import { getDefault } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { UToggle, TYPE_RADIO, TYPE_CHECKBOX } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Selected value.
   */
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },

  /**
   * Toggle item options.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Toggle variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UToggle).variant,
  },

  /**
   * Toggle size.
   * @values 2xs, xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UToggle).size,
  },

  /**
   * Label placement.
   * @values top, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UToggle).labelAlign,
  },

  /**
   * Toggle label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Toggle description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Toggle name.
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * Allow selecting a few options and return them as an array.
   */
  multiple: {
    type: Boolean,
    default: getDefault(defaultConfig, UToggle).multiple,
  },

  /**
   * Separate toggle items.
   */
  separated: {
    type: Boolean,
    default: getDefault(defaultConfig, UToggle).separated,
  },

  /**
   * Make toggle disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UToggle).disabled,
  },

  /**
   * Make the toggle fill the width with its container.
   */
  block: {
    type: Boolean,
    default: getDefault(defaultConfig, UToggle).block,
  },

  /**
   * Set button corners rounded.
   */
  round: {
    type: Boolean,
    default: getDefault(defaultConfig, UToggle).round,
  },

  /**
   * Set the same paddings for the button.
   */
  square: {
    type: Boolean,
    default: getDefault(defaultConfig, UToggle).square,
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
   * Triggers when toggle item is selected.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const { toggleLabelAttrs, itemsAttrs, itemAttrs } = useAttrs(props);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const labelSize = computed(() => {
  const sizes = {
    "2xs": "sm",
    xs: "sm",
    sm: "md",
    md: "md",
    lg: "lg",
    xl: "lg",
  };

  return sizes[props.size];
});

const type = computed(() => {
  return props.multiple ? TYPE_CHECKBOX : TYPE_RADIO;
});

function updateSelectedValue(value, checked) {
  if (type.value === TYPE_RADIO) {
    selectedValue.value = value;

    return;
  }

  if (checked) {
    const items = selectedValue.value || [];

    items.push(value);
    selectedValue.value = items;
  } else {
    selectedValue.value = selectedValue.value.filter((item) => String(item) !== String(value));
  }
}

provide("getToggleName", () => props.name);
provide("getToggleType", () => type.value);
provide("getToggleSize", () => props.size);
provide("getToggleRound", () => props.round);
provide("getToggleBlock", () => props.block);
provide("getToggleSquare", () => props.square);
provide("getToggleVariant", () => props.variant);
provide("getToggleDisabled", () => props.disabled);
provide("getToggleSeparated", () => props.separated);

provide("toggleSelectedValue", {
  selectedValue: readonly(selectedValue),
  updateSelectedValue,
});
</script>
