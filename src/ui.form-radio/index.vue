<template>
  <ULabel
    :for="id"
    :label="label"
    :size="radioSize"
    :align="labelAlign"
    :error="error"
    :description="description"
    :disabled="disabled"
    v-bind="labelAttrs"
    :data-cy="`${dataCy}-label`"
  >
    <input
      :id="id"
      type="radio"
      :disabled="disabled"
      :name="radioName"
      :value="radioValue"
      :checked="checked || isChecked"
      v-bind="radioAttrs"
      :data-cy="dataCy"
      @change="onChange"
    />

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </ULabel>
</template>

<script setup>
import { computed, inject, onMounted, ref, watchEffect, toValue } from "vue";

import ULabel from "../ui.form-label";
import UIService, { getRandomId } from "../service.ui";

import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";
import { URadio } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "URadio", inheritAttrs: false });

const setRadioGroupSelectedItem = inject("setRadioGroupSelectedItem", null);
const getRadioGroupName = inject("getRadioGroupName", null);
const getRadioGroupColor = inject("getRadioGroupColor", null);
const getRadioGroupSize = inject("getRadioGroupSize", null);
const getRadioGroupSelectedItem = inject("getRadioGroupSelectedItem", null);

const props = defineProps({
  /**
   * Native value attribute.
   */
  modelValue: {
    type: [Boolean, String, Number, Array, Object],
    default: null,
  },

  /**
   * Native value attribute.
   */
  value: {
    type: [Boolean, String, Number, Array, Object],
    default: "",
  },

  /**
   * Radio label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Label placement.
   * @values left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, URadio).default.labelAlign,
  },

  /**
   * Radio description.
   */
  description: {
    type: [String, Object],
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
   * Radio name.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Radio size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, URadio).default.size,
  },

  /**
   * Radio color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, URadio).default.color,
  },

  /**
   * Set radio disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, URadio).default.disabled,
  },

  /**
   * Set radio checked.
   */
  checked: {
    type: Boolean,
    default: UIService.get(defaultConfig, URadio).default.checked,
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

const emit = defineEmits([
  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const localValue = ref("");
const radioName = ref(null);
const radioColor = ref(toValue(getRadioGroupColor) || props.color);
const radioSize = ref(toValue(getRadioGroupSize) || props.size);

const isChecked = computed(() => {
  const currentValue = props.modelValue ?? localValue.value;

  if (typeof currentValue !== "object") {
    return currentValue === props.value;
  }

  return JSON.stringify(currentValue) === JSON.stringify(props.value);
});

const { radioAttrs, labelAttrs } = useAttrs(props, { radioColor, radioSize });

const radioValue = computed(() => {
  return props.value === "" ? "on" : props.value;
});

onMounted(() => {
  radioName.value = props.name || toValue(getRadioGroupName);
});

watchEffect(() => (radioColor.value = toValue(getRadioGroupColor) || props.color));
watchEffect(() => (radioSize.value = toValue(getRadioGroupSize) || props.size));
watchEffect(() => {
  localValue.value = toValue(getRadioGroupSelectedItem) || null;
  emit("update:modelValue", props.value);
});

function onChange(event) {
  setRadioGroupSelectedItem && setRadioGroupSelectedItem(props.value);

  emit("update:modelValue", event.target.value);
}
</script>
