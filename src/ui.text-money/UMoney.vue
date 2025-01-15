<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import UNumber from "../ui.text-number/UNumber.vue";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const currencySymbolPosition = computed(() => {
  return {
    left: props.symbolAlign === "left",
    right: props.symbolAlign === "right",
  };
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { moneyAttrs, symbolAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="moneyAttrs">
    <UNumber
      :value="value"
      :size="size"
      :color="color"
      :sign="sign"
      :min-fraction-digits="minFractionDigits"
      :max-fraction-digits="maxFractionDigits"
      :decimal-separator="decimalSeparator"
      :thousands-separator="thousandsSeparator"
      :data-test="dataTest"
    >
      <template #left>
        <template v-if="hasSlotContent($slots['left']) || symbol">
          <span v-if="currencySymbolPosition.left && symbol" v-bind="symbolAttrs" v-text="symbol" />
          <!-- @slot Use it to add something before money amount. -->
          <slot name="left" />
        </template>

        <template v-else>
          <slot name="left" />
        </template>
      </template>

      <template #right>
        <template v-if="hasSlotContent($slots['right']) || symbol">
          <span
            v-if="currencySymbolPosition.right && symbol"
            v-bind="symbolAttrs"
            v-text="symbol"
          />
          <!-- @slot Use it to add something after money amount. -->
          <slot name="right" />
        </template>

        <template v-else>
          <slot name="right" />
        </template>
      </template>
    </UNumber>
  </div>
</template>
