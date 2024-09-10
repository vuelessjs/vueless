<template>
  <UInput
    :id="id"
    ref="moneyInputRef"
    v-model="formattedValue"
    :size="size"
    :label="localLabel"
    :label-align="labelAlign"
    :placeholder="placeholder"
    :description="description"
    :error="error"
    :disabled="disabled"
    inputmode="decimal"
    :data-test="`${dataTest}-base-currency`"
    :left-icon="leftIcon"
    :right-icon="rightIcon"
    v-bind="inputAttrs"
    @keyup="onKeyup"
    @blur="onBlur"
    @input="onInput"
  >
    <template #left>
      <!-- @slot Use it to add something left. -->
      <slot name="left" />
    </template>

    <template #left-icon>
      <!-- @slot Use it to add icon before the text. -->
      <slot name="left-icon" />
    </template>

    <template #right-icon>
      <!-- @slot Use it to add icon after the text. -->
      <slot name="right-icon" />
    </template>

    <template #right>
      <!-- @slot Use it to add something right. -->
      <slot name="right" />
    </template>
  </UInput>
</template>

<script setup>
import { computed, ref, watch, onMounted, nextTick } from "vue";

import { getRandomId, getDefault } from "../utils/utilUI.js";

import UInput from "../ui.form-input/UInput.vue";
import { SYMBOL_MINUS } from "../ui.text-money/constants";

import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import useFormatCurrency from "./composables/useFormatCurrency";
import { UInputMoney } from "./constants.js";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UInputMoney", inheritAttrs: false });

const props = defineProps({
  /**
   * Input value.
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },
  /**
   * Input label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set label placement related from the default slot.
   * @values top, topInside, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, UInputMoney).labelAlign,
  },

  /**
   * Currency symbol.
   */
  symbol: {
    type: String,
    default: getDefault(defaultConfig, UInputMoney).symbol,
  },

  /**
   * Input placeholder.
   */
  placeholder: {
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
   * Input size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UInputMoney).size,
  },

  /**
   * Left side icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Number of signs after the comma.
   */
  decimalScale: {
    type: Number,
    default: getDefault(defaultConfig, UInputMoney).decimalScale,
  },

  /**
   * A symbol used to separate the integer part from the fractional part of a number.
   */
  decimalSeparator: {
    type: String,
    default: getDefault(defaultConfig, UInputMoney).decimalSeparator,
  },

  /**
   *  A symbol used to separate the thousand parts of a number.
   */
  thousandsSeparator: {
    type: String,
    default: getDefault(defaultConfig, UInputMoney).thousandsSeparator,
  },

  /**
   * Allow only positive values.
   */
  positiveOnly: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputMoney).positiveOnly,
  },

  /**
   * Show prefix in the raw value number.
   */
  rawValuePrefix: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputMoney).rawValuePrefix,
  },

  /**
   * Show minus sign.
   */
  minus: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputMoney).minus,
  },

  /**
   * Set input read-only.
   */
  readonly: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputMoney).readonly,
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UInputMoney).disabled,
  },

  /**
   * Unique element id.
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

const emit = defineEmits(["update:modelValue", "keyup", "blur", "input"]);

const moneyInputRef = ref(null);

const { inputAttrs } = useAttrs(props);

const { formattedValue, rawValue, setValue } = useFormatCurrency(`#${props.id}`, () => ({
  decimalScale: props.decimalScale,
  decimalSeparator: props.decimalSeparator,
  thousandsSeparator: props.thousandsSeparator,
  positiveOnly: props.positiveOnly,
  rawValuePrefix: props.rawValuePrefix,
  prefix: props.minus ? SYMBOL_MINUS : "",
}));

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const localLabel = computed(() => {
  const comma = props.symbol && props.label ? "," : "";
  const symbol = props.label ? props.symbol : "";

  return `${props.label}${comma} ${symbol}`.trim();
});

const input = computed(() => {
  return moneyInputRef.value.inputRef;
});

watch(
  () => props.modelValue,
  () => String(localValue.value) !== String(rawValue.value) && setValue(localValue.value),
);

defineExpose({ input, rawValue, formattedValue });

onMounted(() => {
  setValue(localValue.value);
});

function onKeyup(event) {
  localValue.value = rawValue.value || "";

  nextTick(() => emit("keyup", event));
}

function onBlur() {
  nextTick(() => emit("blur"));
}

function onInput(value) {
  nextTick(() => emit("input", value));
}
</script>
