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
        <URadio
          v-for="(option, index) in options"
          :key="option.value"
          :model-value="selectedItem"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :disabled="disabled"
          v-bind="groupRadioAttrs"
          :data-test="`${dataTest}-item-${index}`"
        />
      </slot>
    </div>
  </ULabel>
</template>

<script setup>
import { computed, provide } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import URadio from "../ui.form-radio/URadio.vue";
import { getDefault } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { URadioGroup } from "./constants.js";
import useAttrs from "./useAttrs.js";

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
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, URadioGroup).size,
  },

  /**
   * Radio group color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, URadioGroup).color,
  },

  /**
   * Unique radio group name (sets for each radio).
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, URadioGroup).disabled,
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
    default: "radio",
  },
});

const emit = defineEmits([
  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const { groupLabelAttrs, listAttrs, groupRadioAttrs } = useAttrs(props);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide("setRadioGroupSelectedItem", (value) => (selectedItem.value = value));
provide("getRadioGroupSelectedItem", () => selectedItem.value);
provide("getRadioGroupName", () => props.name);
provide("getRadioGroupColor", () => props.color);
provide("getRadioGroupSize", () => props.size);
</script>
