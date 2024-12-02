<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, useId } from "vue";

import { getDefault } from "../utils/ui.ts";

import UInput from "../ui.form-input/UInput.vue";

import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import useFormatCurrency from "./useFormatCurrency.ts";
import { UInputMoney } from "./constants.ts";

import type { UInputMoneyProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UInputMoneyProps>(), {
  labelAlign: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).labelAlign,
  symbol: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).symbol,
  size: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).size,
  minFractionDigits: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).minFractionDigits,
  maxFractionDigits: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).maxFractionDigits,
  decimalSeparator: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).decimalSeparator,
  thousandsSeparator: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).thousandsSeparator,
  positiveOnly: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).positiveOnly,
  prefix: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).prefix,
  readonly: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).readonly,
  disabled: getDefault<UInputMoneyProps>(defaultConfig, UInputMoney).disabled,
  modelValue: "",
  dataTest: "",
});

const emit = defineEmits(["update:modelValue", "keyup", "blur", "input"]);

const moneyInputRef = ref<{ inputRef: HTMLInputElement } | null>(null);

const elementId = props.id || useId();

const { moneyInputAttrs } = useAttrs(props);

const { formattedValue, rawValue, setValue } = useFormatCurrency(elementId, () => ({
  minFractionDigits: props.minFractionDigits,
  maxFractionDigits: props.maxFractionDigits,
  decimalSeparator: props.decimalSeparator,
  thousandsSeparator: props.thousandsSeparator,
  positiveOnly: props.positiveOnly,
  prefix: props.prefix,
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
  return moneyInputRef.value?.inputRef || null;
});

watch(
  () => props.modelValue,
  () => {
    if (String(localValue.value) !== String(rawValue.value)) {
      setValue(localValue.value);
    }
  },
);

onMounted(() => {
  if (localValue.value) {
    setValue(localValue.value);
  }
});

function onKeyup(event: KeyboardEvent) {
  localValue.value = rawValue.value || "";

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
   * @property {HTMLInputElement}
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
</script>

<template>
  <UInput
    :id="elementId"
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
    :left-icon="leftIcon"
    :right-icon="rightIcon"
    v-bind="moneyInputAttrs"
    :data-test="`${dataTest}-base-currency`"
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
