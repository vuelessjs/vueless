<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import UNumber from "../ui.text-number/UNumber.vue";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const moneyRef = useTemplateRef<InstanceType<typeof UNumber>>("money");

const number = computed(() => {
  return moneyRef.value?.wrapperRef || null;
});

const currencySymbolPosition = computed(() => {
  return {
    left: props.symbolAlign === "left",
    right: props.symbolAlign === "right",
  };
});

defineExpose({
  /**
   * A reference to the UNumber instance for direct DOM manipulation.
   * @property {InstanceType<typeof UNumber>}
   */
  number,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, moneyAttrs, symbolAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <UNumber
    ref="money"
    :value="value"
    :size="size"
    :color="color"
    :sign="sign"
    :align="align"
    :min-fraction-digits="minFractionDigits"
    :max-fraction-digits="maxFractionDigits"
    :decimal-separator="decimalSeparator"
    :thousands-separator="thousandsSeparator"
    v-bind="moneyAttrs"
    :data-test="getDataTest()"
  >
    <template #left>
      <!-- @slot Use it to add something before money amount. -->
      <slot name="left" />

      <span v-if="currencySymbolPosition.left && symbol" v-bind="symbolAttrs" v-text="symbol" />
    </template>

    <template #right>
      <span v-if="currencySymbolPosition.right && symbol" v-bind="symbolAttrs" v-text="symbol" />

      <!-- @slot Use it to add something after money amount. -->
      <slot name="right" />
    </template>
  </UNumber>
</template>
