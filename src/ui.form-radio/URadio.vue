<template>
  <ULabel
    :for="elementId"
    :label="label"
    :error="error"
    :size="radioSize"
    :align="labelAlign"
    :disabled="disabled"
    :description="description"
    v-bind="radioLabelAttrs"
    :data-test="`${dataTest}-label`"
  >
    <input
      :id="elementId"
      type="radio"
      :value="radioValue"
      :name="radioName"
      :checked="checked || isChecked"
      :disabled="disabled"
      v-bind="radioAttrs"
      :data-test="dataTest"
      @change="onChange"
    />

    <template #footer>
      <slot name="footer" />
    </template>
  </ULabel>
</template>

<script setup>
import { computed, inject, onMounted, ref, watchEffect, toValue, useId } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import { URadio } from "./constants.js";

defineOptions({ inheritAttrs: false });

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
    default: getDefault(defaultConfig, URadio).labelAlign,
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
    default: getDefault(defaultConfig, URadio).size,
  },

  /**
   * Radio color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, URadio).color,
  },

  /**
   * Set radio disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, URadio).disabled,
  },

  /**
   * Set radio checked.
   */
  checked: {
    type: Boolean,
    default: getDefault(defaultConfig, URadio).checked,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
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

const elementId = props.id || useId();

const { radioAttrs, radioLabelAttrs } = useAttrs(props, { radioColor, radioSize });

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
