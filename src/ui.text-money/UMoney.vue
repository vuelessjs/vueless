<script setup lang="ts">
import { computed } from "vue";

import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import { UMoney } from "./constants.ts";
import defaultConfig from "./config.ts";
import { useAttrs } from "./useAttrs.ts";
import { separatedMoney, MONEY_SIGN_TYPE } from "./utilMoney.ts";

import type { UMoneyProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UMoneyProps>(), {
  ...getDefaults<UMoneyProps, Config>(defaultConfig, UMoney),
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
    Math.abs(props.value || 0),
    props.minFractionDigits,
    props.maxFractionDigits,
    props.decimalSeparator,
    props.thousandsSeparator,
  );
});
</script>

<template>
  <div v-bind="moneyAttrs">
    <div v-if="hasSlotContent($slots['left'])" v-bind="slotLeftAttrs">
      <!-- @slot Use it to add something before money amount. -->
      <slot name="left" />
    </div>

    <div v-bind="sumAttrs" :data-test="dataTest">
      <span
        v-if="currencySymbolPosition.left && symbol"
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
        v-if="currencySymbolPosition.right && symbol"
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
