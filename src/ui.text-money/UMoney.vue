<template>
  <div v-bind="moneyAttrs">
    <div v-if="hasSlotContent($slots['left'])" v-bind="slotLeftAttrs">
      <!-- @slot Use it to add something before money amount. -->
      <slot name="left" />
    </div>

    <div :data-test="dataTest" v-bind="sumAttrs">
      <span
        v-if="currencySymbolPosition.left"
        v-bind="symbolAttrs"
        v-text="symbol + currencySpace"
      />

      <span v-if="value" v-bind="mathSignAttrs" v-text="mathSign" />

      <span v-bind="integerAttrs" v-text="preparedMoney.integer" />

      <span
        v-if="maxFractionDigits > 0"
        v-bind="pennyAttrs"
        v-text="preparedMoney.decimalSeparator + preparedMoney.penny"
      />

      <span
        v-if="currencySymbolPosition.right"
        v-bind="symbolAttrs"
        v-text="currencySpace + symbol"
      />
    </div>

    <div v-if="hasSlotContent($slots['right'])" v-bind="slotRightAttrs">
      <!-- @slot Use it to add something after money amount. -->
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { getDefault } from "../utils/utilUI.ts";

import { UMoney } from "./constants.js";
import defaultConfig from "./config.js";
import { useAttrs } from "./useAttrs.js";
import { separatedMoney, MONEY_SIGN_TYPE } from "./utilMoney.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Money value.
   */
  value: {
    type: Number,
    default: 0,
  },

  /**
   * Money size.
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UMoney).size,
  },

  /**
   * Money color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UMoney).color,
  },

  /**
   * Money currency symbol.
   */
  symbol: {
    type: String,
    default: "",
  },

  /**
   * Money currency symbol align.
   * @values right, left
   */
  symbolAlign: {
    type: String,
    default: getDefault(defaultConfig, UMoney).symbolAlign,
  },

  /**
   * Add space between currency symbol and sum.
   */
  symbolDivided: {
    type: Boolean,
    default: getDefault(defaultConfig, UMoney).symbolDivided,
  },

  /**
   * Money sign.
   * @values default, positive, negative
   */
  sign: {
    type: String,
    default: getDefault(defaultConfig, UMoney).sign,
  },

  /**
   * Minimal number of signs after the decimal separator (fractional part of a number).
   */
  minFractionDigits: {
    type: Number,
    default: getDefault(defaultConfig, UMoney).minFractionDigits,
  },

  /**
   * Maximal number of signs after the decimal separator (fractional part of a number).
   */
  maxFractionDigits: {
    type: Number,
    default: getDefault(defaultConfig, UMoney).maxFractionDigits,
  },

  /**
   * A symbol used to separate the integer part from the fractional part of a number.
   */
  decimalSeparator: {
    type: String,
    default: getDefault(defaultConfig, UMoney).decimalSeparator,
  },

  /**
   *  A symbol used to separate the thousand parts of a number.
   */
  thousandsSeparator: {
    type: String,
    default: getDefault(defaultConfig, UMoney).thousandsSeparator,
  },

  /**
   * Money align.
   * @values right, left
   */
  align: {
    type: String,
    default: getDefault(defaultConfig, UMoney).align,
  },

  /**
   * Make money planned (add brackets).
   */
  planned: {
    type: Boolean,
    default: getDefault(defaultConfig, UMoney).planned,
  },

  /**
   * Component config object.
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

const {
  moneyAttrs,
  sumAttrs,
  mathSignAttrs,
  integerAttrs,
  pennyAttrs,
  slotLeftAttrs,
  symbolAttrs,
  slotRightAttrs,
  hasSlotContent,
} = useAttrs(props);

const currencySymbolPosition = computed(() => {
  return {
    left: props.symbolAlign === "left",
    right: props.symbolAlign === "right",
  };
});

const currencySpace = computed(() => {
  return props.symbolDivided ? " " : "";
});

const mathSign = computed(() => {
  let type = "";

  if (props.sign === MONEY_SIGN_TYPE.positive) type = "+";
  if (props.sign === MONEY_SIGN_TYPE.negative) type = "–";

  return type;
});

const preparedMoney = computed(() => {
  return separatedMoney(
    Math.abs(props.value),
    props.minFractionDigits,
    props.maxFractionDigits,
    props.decimalSeparator,
    props.thousandsSeparator,
  );
});
</script>
