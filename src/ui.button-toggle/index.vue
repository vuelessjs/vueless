<template>
  <ULabel
    :size="labelSize"
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="labelAttrs"
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
          :data-cy="`${dataCy}-item-${index}`"
          v-bind="itemAttrs"
        />
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, provide, readonly } from "vue";

import ULabel from "../ui.form-label";
import UToggleItem from "../ui.button-toggle-item";
import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UToggle, TYPE_RADIO, TYPE_CHECKBOX } from "./constants";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UToggle", inheritAttrs: false });

const props = defineProps({
  /**
   * Selected value.
   */
  modelValue: {
    type: [String, Number, Array],
    default: () => (!this.multiple ? "" : []),
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
    default: UIService.get(defaultConfig, UToggle).default.variant,
  },

  /**
   * Toggle size.
   * @values 2xs, xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UToggle).default.size,
  },

  /**
   * Label placement.
   * @values top, topInside, topWithDesc, bottom, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, UToggle).default.labelAlign,
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
    default: UIService.get(defaultConfig, UToggle).default.multiple,
  },

  /**
   * Separate toggle items.
   */
  separated: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggle).default.separated,
  },

  /**
   * Make toggle disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggle).default.disabled,
  },

  /**
   * Make the toggle fill the width with its container.
   */
  block: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggle).default.block,
  },

  /**
   * Set button corners rounded.
   */
  pill: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggle).default.pill,
  },

  /**
   * Set the same paddings for the button.
   */
  square: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggle).default.square,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
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

const { labelAttrs, itemsAttrs, itemAttrs } = useAttrs(props);

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

provide("toggleType", readonly(type));
provide("togglePill", () => props.pill);
provide("toggleName", () => props.name);
provide("toggleSize", () => props.size);
provide("toggleBlock", () => props.block);
provide("toggleSquare", () => props.square);
provide("toggleVariant", () => props.variant);
provide("toggleDisabled", () => props.disabled);
provide("toggleSeparated", () => props.separated);

provide("toggleSelectedValue", {
  selectedValue: readonly(selectedValue),
  updateSelectedValue,
});
</script>
