<template>
  <div v-bind="moneyAttrs">
    <div v-if="hasSlotContent($slots['left'])" v-bind="slotLeftAttrs">
      <!-- @slot Use it to add something before money amount. -->
      <slot name="left" />
    </div>

    <div :data-cy="dataCy" v-bind="sumAttrs">
      <span v-if="currencySymbolPosition.left" v-bind="symbolAttrs">
        {{ symbol + currencySpace }}
      </span>

      <span v-if="sum">{{ typeSymbol }}</span>

      <span>{{ preparedMoney.integer }}</span>

      <span v-if="!integer" v-bind="pennyAttrs">
        {{ preparedMoney.delimiter }}{{ preparedMoney.penny }}
      </span>

      <span v-if="currencySymbolPosition.right" v-bind="symbolAttrs">
        {{ currencySpace + symbol }}
      </span>
    </div>

    <div v-if="hasSlotContent($slots['right'])" v-bind="slotRightAttrs">
      <!-- @slot Use it to add something after money amount. -->
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIService from "../service.ui";

import { UMoney } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";
import { separatedMoney, MONEY_SIGN_TYPE } from "./services/money.services";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UMoney", inheritAttrs: false });

const props = defineProps({
  /**
   * Set sum.
   */
  sum: {
    type: Number,
    default: 0,
  },

  /**
   * Set currency symbol.
   */
  symbol: {
    type: String,
    default: "",
  },

  /**
   * Make sum planned (add brackets).
   */
  planned: {
    type: Boolean,
    default: UIService.get(defaultConfig, UMoney).default.planned,
  },

  /**
   * Make sum integer.
   */
  integer: {
    type: Boolean,
    default: UIService.get(defaultConfig, UMoney).default.integer,
  },

  /**
   * Set sign for sum.
   * @values default, positive, negative
   */
  sign: {
    type: String,
    default: UIService.get(defaultConfig, UMoney).default.sign,
  },

  /**
   * Set align for currency symbol.
   * @values right, left
   */
  symbolAlign: {
    type: String,
    default: UIService.get(defaultConfig, UMoney).default.symbolAlign,
  },

  /**
   * Set text size of sum.
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UMoney).default.size,
  },

  /**
   * Set weight.
   * @values regular, medium, bold
   */
  weight: {
    type: String,
    default: UIService.get(defaultConfig, UMoney).default.weight,
  },

  /**
   * The color of the text money.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UMoney).default.color,
  },

  /**
   * Set the numeral decimal scale after the comma.
   */
  decimalScale: {
    type: Number,
    default: UIService.get(defaultConfig, UMoney).default.decimalScale,
  },

  /**
   * Set the delimiter between integer and float (penny) parts.
   */
  delimiter: {
    type: String,
    default: UIService.get(defaultConfig, UMoney).default.delimiter,
  },

  /**
   * Set align for money block.
   * @values right, left
   */
  align: {
    type: String,
    default: UIService.get(defaultConfig, UMoney).default.align,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  divided: {
    type: Boolean,
    default: UIService.get(defaultConfig, UMoney).default.divided,
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const {
  sumAttrs,
  pennyAttrs,
  moneyAttrs,
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
  return props.divided ? " " : "";
});

const typeSymbol = computed(() => {
  let type = "";

  if (props.sign === MONEY_SIGN_TYPE.positive) type = "+";
  if (props.sign === MONEY_SIGN_TYPE.negative) type = "–";

  return type;
});

const preparedMoney = computed(() => {
  return separatedMoney(Math.abs(props.sum), props.decimalScale, props.delimiter);
});
</script>
