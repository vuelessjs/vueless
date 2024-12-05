<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UInput from "../ui.form-input/UInput.vue";

import defaultConfig from "./config.ts";
import useFormatCurrency from "./useFormatCurrency.ts";
import { UInputMoney } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UInputMoney),
});

const emit = defineEmits(["update:modelValue", "keyup", "blur", "input"]);

const moneyInputRef = ref<{ inputRef: HTMLInputElement } | null>(null);

const elementId = props.id || useId();

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

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { moneyInputAttrs } = useUI<Config>(defaultConfig);
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
