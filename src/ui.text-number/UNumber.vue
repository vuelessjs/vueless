<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";
import { separatedNumber, MATH_SIGN_TYPE, MATH_SIGN } from "./utilNumber.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const mathSign = computed(() => {
  let type = "";

  if (props.sign === MATH_SIGN_TYPE.unsigned) type = "";
  if (props.sign === MATH_SIGN_TYPE.positive) type = MATH_SIGN.PLUS;
  if (props.sign === MATH_SIGN_TYPE.negative) type = MATH_SIGN.MINUS;
  if (props.sign === MATH_SIGN_TYPE.auto && props.value < 0) type = MATH_SIGN.MINUS;

  return type;
});

const preparedNumber = computed(() => {
  return separatedNumber(
    Math.abs(props.value || 0),
    props.minFractionDigits,
    props.maxFractionDigits,
    props.decimalSeparator,
    props.thousandsSeparator,
  );
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  numberAttrs,
  sumAttrs,
  mathSignAttrs,
  integerAttrs,
  decimalAttrs,
  slotLeftAttrs,
  slotRightAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="numberAttrs">
    <div v-if="hasSlotContent($slots['left'])" v-bind="slotLeftAttrs">
      <!-- @slot Use it to add something before the number. -->
      <slot name="left" />
    </div>

    <div v-bind="sumAttrs" :data-test="dataTest">
      <span v-if="value" v-bind="mathSignAttrs" v-text="mathSign" />

      <span v-bind="integerAttrs" v-text="preparedNumber.integer" />

      <span
        v-if="maxFractionDigits > 0"
        v-bind="decimalAttrs"
        v-text="preparedNumber.decimalSeparator + preparedNumber.decimal"
      />
    </div>

    <div v-if="hasSlotContent($slots['right'])" v-bind="slotRightAttrs">
      <!-- @slot Use it to add something after the number. -->
      <slot name="right" />
    </div>
  </div>
</template>
