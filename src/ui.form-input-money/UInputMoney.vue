<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UInput from "../ui.form-input/UInput.vue";

import defaultConfig from "./config.ts";
import useFormatCurrency from "./useFormatCurrency.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  label: "",
  placeholder: "",
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
      setValue(String(localValue.value));
    }
  },
);

onMounted(() => {
  if (localValue.value) {
    setValue(String(localValue.value));
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
const { getDataTest, moneyInputAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <UInput
    :id="elementId"
    ref="moneyInputRef"
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
    v-bind="moneyInputAttrs"
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
      <slot name="right" :icon-name="leftIcon" />
    </template>
  </UInput>

  {{ modelValue }}
</template>
