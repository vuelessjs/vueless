<script setup lang="ts">
import { computed, watch, onMounted, nextTick, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UInput from "../ui.form-input/UInput.vue";

import defaultConfig from "./config.ts";
import useFormatNumber from "./useFormatNumber.ts";
import { COMPONENT_NAME, RAW_DECIMAL_MARK } from "./constants.ts";

import type { Props, Config } from "./types.ts";
import { getRawValue } from "./utilFormat.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  label: "",
  placeholder: "",
});

const emit = defineEmits([
  /**
   * Triggers when the input value changes.
   * @property {number} modelValue
   */
  "update:modelValue",

  /**
   * Triggers when a key is released while the input is focused.
   * @property {KeyboardEvent} event
   */
  "keyup",

  /**
   * Triggers when the input loses focus.
   */
  "blur",

  /**
   * Triggers when the input value changes.
   * @property {number} modelValue
   */
  "input",
]);

const numberInputRef = useTemplateRef<InstanceType<typeof UInput>>("numberInput");

const elementId = props.id || useId();

const { formattedValue, rawValue, setValue } = useFormatNumber(elementId, () => ({
  minFractionDigits: props.minFractionDigits,
  maxFractionDigits: props.maxFractionDigits,
  decimalSeparator: props.decimalSeparator,
  thousandsSeparator: props.thousandsSeparator,
  positiveOnly: props.positiveOnly,
  prefix: props.prefix,
}));

const localValue = computed({
  get: () => props.modelValue ?? "",
  set: (value) => emit("update:modelValue", value),
});

const localLabel = computed(() => {
  const comma = props.currency && props.label ? "," : "";
  const currency = props.label ? props.currency : "";

  return `${props.label}${comma} ${currency}`.trim();
});

const input = computed(() => {
  return numberInputRef.value?.inputRef || null;
});

const stringLocalValue = computed(() => {
  if (Object.is(localValue.value, -0)) return "-0";

  const currentRawValue = getRawValue(String(localValue.value), props);
  const fraction = String(currentRawValue).split(RAW_DECIMAL_MARK).at(1) || "";

  return props.valueType === "number" && !Number.isNaN(parseFloat(String(localValue.value)))
    ? parseFloat(String(localValue.value)).toFixed(fraction.length)
    : String(localValue.value);
});

watch(
  () => props.modelValue,
  () => {
    if (stringLocalValue.value !== String(rawValue.value)) {
      setValue(stringLocalValue.value);
    }
  },
);

onMounted(() => {
  if (localValue.value) {
    setValue(stringLocalValue.value);
  }
});

function onKeyup(event: KeyboardEvent) {
  const numberValue = !Number.isNaN(parseFloat(rawValue.value)) ? parseFloat(rawValue.value) : "";

  localValue.value = props.valueType === "number" ? numberValue : rawValue.value || "";

  nextTick(() => emit("keyup", event));
}

function onBlur() {
  nextTick(() => emit("blur"));
}

function onInput(value: InputEvent) {
  nextTick(() => emit("input", value));
}

defineExpose({
  /**
   * Reference to the underlying input element inside UInput.
   * @property {InstanceType<typeof UInput>}
   */
  input,

  /**
   * The raw, unformatted value of the input.
   * @property {String | Number}
   */
  rawValue,

  /**
   * The formatted value displayed in the input.
   * @property {String}
   */
  formattedValue,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, numberInputAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <UInput
    :id="elementId"
    ref="numberInput"
    :model-value="formattedValue"
    :size="size"
    :label="localLabel"
    :label-align="labelAlign"
    :placeholder="placeholder"
    :description="description"
    :readonly="readonly"
    :error="error"
    :disabled="disabled"
    inputmode="decimal"
    :left-icon="leftIcon"
    :right-icon="rightIcon"
    v-bind="numberInputAttrs"
    :data-test="getDataTest('base-currency')"
    @keyup="onKeyup"
    @blur="onBlur"
    @input="onInput"
  >
    <template #left>
      <!--
        @slot Use it to add something left.
        @binding {string} icon-name
      -->
      <slot name="left" :icon-name="leftIcon" />
    </template>

    <template #right>
      <!--
        @slot Use it to add something right.
        @binding {string} icon-name
      -->
      <slot name="right" :icon-name="rightIcon" />
    </template>
  </UInput>
</template>
