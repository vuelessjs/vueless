<template>
  <ULabel
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :disabled="disabled"
    align="topWithDesc"
    :data-cy="dataCy"
    v-bind="labelAttrs"
  >
    <div v-bind="listAttrs">
      <slot>
        <URadio
          v-for="(option, index) in options"
          :key="option.value"
          :model-value="modelValue"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :disabled="disabled"
          :data-cy="`${dataCy}-item-${index}`"
          v-bind="radioAttrs"
        />
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, provide } from "vue";

import ULabel from "../ui.form-label";
import URadio from "../ui.form-radio";
import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import { URadioGroup } from "./constants";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "URadioGroup", inheritAttrs: false });

const props = defineProps({
  /**
   * Radio group selected value.
   */
  modelValue: {
    type: [Boolean, String, Number, Array, Object],
    default: "",
  },

  /**
   * Radio group options.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Radio group label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Radio group description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Radio group error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Radio size.
   * @values xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, URadioGroup).default.size,
  },

  /**
   * Radio group color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, URadioGroup).default.color,
  },

  /**
   * Radio group name (sets for each radio).
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, URadioGroup).default.disabled,
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
    default: "radio",
  },
});

const emit = defineEmits(["update:modelValue"]);

const { labelAttrs, listAttrs, radioAttrs } = useAttrs(props);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide("setRadioGroupSelectedItem", (value) => (selectedItem.value = value));
provide("getRadioGroupName", () => props.name);
provide("getRadioGroupColor", () => props.color);
provide("getRadioGroupSize", () => props.size);
</script>
