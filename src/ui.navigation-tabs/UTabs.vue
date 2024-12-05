<script setup lang="ts">
import { computed, provide } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UTab from "../ui.navigation-tab/UTab.vue";

import { UTabs } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UTabs),
  options: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the selected tab changes.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide("setUTabsSelectedItem", (value: string) => (selectedItem.value = value));
provide("getUTabsSelectedItem", () => selectedItem.value);
provide("getUTabsSize", () => props.size);

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { tabsAttrs, itemAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="tabsAttrs" :data-test="dataTest">
    <!-- @slot Use it to add the UTab component. -->
    <slot>
      <UTab
        v-for="(item, index) in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        :size="size"
        v-bind="itemAttrs"
        :data-test="`${dataTest}-item-${index}`"
      />
    </slot>
  </div>
</template>
