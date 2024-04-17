<template>
  <ULabel
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    align="topWithDesc"
    :data-cy="dataCy"
    v-bind="labelAttrs"
  >
    <div v-bind="listAttrs">
      <slot />
    </div>
  </ULabel>
</template>

<script setup>
import { computed, provide } from "vue";

import ULabel from "../ui.form-label";
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
    type: [String, Number],
    default: "",
  },

  /**
   * Radio group label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Input description.
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
   * Radio size.
   * @values sm, md, lg
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

const { listAttrs, labelAttrs } = useAttrs(props);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide("setRadioGroupSelectedItem", (value) => (selectedItem.value = value));
provide("getRadioGroupName", () => props.name);
provide("getRadioGroupColor", () => props.color);
provide("getRadioGroupSize", () => props.size);
</script>
