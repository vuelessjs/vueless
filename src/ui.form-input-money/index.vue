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
    :data-cy="`${dataCy}-base-currency`"
    v-bind="inputAttrs"
    @keyup="onKeyup"
    @blur="onBlur"
    @input="onInput"
  >
    <template #left>
      <!-- @slot Use it to add something left. -->
      <slot name="left" />
    </template>

    <template #right>
      <!-- @slot Use it to add something right. -->
      <slot name="right" />
    </template>

    <template #right-icon>
      <!-- @slot Use it to add right icon. -->
      <slot name="right-icon" />
    </template>
  </UInput>
</template>

<script setup>
import { computed, ref, watch, onMounted, nextTick } from "vue";

import UIService, { getRandomId } from "../service.ui";

import UInput from "../ui.form-input";
import { SYMBOL_MINUS } from "../ui.text-money/constants";

import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";
import useFormatCurrency from "./composables/useFormatCurrency";
import { UInputMoney } from "./constants";

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
    default: UIService.get(defaultConfig, UInputMoney).default.labelAlign,
  },

  /**
   * Currency symbol.
   */
  symbol: {
    type: String,
    default: UIService.get(defaultConfig, UInputMoney).default.symbol,
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
    default: UIService.get(defaultConfig, UInputMoney).default.size,
  },

  /**
   * Number of signs after the comma.
   */
  decimalScale: {
    type: Number,
    default: UIService.get(defaultConfig, UInputMoney).default.decimalScale,
  },

  /**
   * A symbol used to separate the integer part from the fractional part of a number.
   */
  decimalSeparator: {
    type: String,
    default: UIService.get(defaultConfig, UInputMoney).default.decimalSeparator,
  },

  /**
   *  A symbol used to separate the thousand parts of a number.
   */
  thousandsSeparator: {
    type: String,
    default: UIService.get(defaultConfig, UInputMoney).default.thousandsSeparator,
  },

  /**
   * Allow only positive values.
   */
  positiveOnly: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputMoney).default.positiveOnly,
  },

  /**
   * Show prefix in the raw value number.
   */
  rawValuePrefix: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputMoney).default.rawValuePrefix,
  },

  /**
   * Show minus sign.
   */
  minus: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputMoney).default.minus,
  },

  /**
   * Set input read-only.
   */
  readonly: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputMoney).default.readonly,
  },

  /**
   * Disable the input.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UInputMoney).default.disabled,
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
   * Data-cy attribute for automated testing.
   */
  dataCy: {
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
  return moneyInputRef.value.input;
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
