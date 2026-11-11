<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";
import { separatedNumber, formatNumber, getMathSign } from "./utilNumber";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  currency: "",
});

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const numericValue = computed(() => {
  if (typeof props.value === "string") {
    return Number.parseFloat(props.value);
  }

  return props.value;
});

const mathSign = computed(() => getMathSign(numericValue.value, props.sign));

const preparedNumber = computed(() => {
  return separatedNumber(
    Math.abs(numericValue.value || 0),
    props.minFractionDigits,
    props.maxFractionDigits,
    props.decimalSeparator,
    props.thousandsSeparator,
  );
});

const formattedNumber = computed(() => formatNumber(props.value, props));

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  wrapperAttrs,
  numberAttrs,
  currencyAttrs,
  mathSignAttrs,
  integerAttrs,
  fractionAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs">
    <!-- @slot Use it to add something before the number. -->
    <slot name="left" />

    <template v-if="raw">{{ formattedNumber }}</template>

    <div v-else v-bind="numberAttrs" :data-test="getDataTest()">
      <span v-if="currencyAlign === 'left' && currency" v-bind="currencyAttrs" v-text="currency" />

      <span v-if="value && mathSign" v-bind="mathSignAttrs" v-text="mathSign" />

      <span v-bind="integerAttrs" v-text="preparedNumber.integer" />

      <span
        v-if="maxFractionDigits > 0"
        v-bind="fractionAttrs"
        v-text="preparedNumber.decimalSeparator + preparedNumber.fraction"
      />

      <span v-if="currencyAlign === 'right' && currency" v-bind="currencyAttrs" v-text="currency" />
    </div>

    <!-- @slot Use it to add something after the number. -->
    <slot name="right" />
  </div>
</template>
