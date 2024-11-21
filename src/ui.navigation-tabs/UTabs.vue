<script lang="ts" setup>
import { computed, provide } from "vue";

import UTab from "../ui.navigation-tab/UTab.vue";
import { getDefault } from "../utils/ui.ts";

import { UTabs } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UTabsProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UTabsProps>(), {
  size: getDefault<UTabsProps>(defaultConfig, UTabs).size,
  underlined: getDefault<UTabsProps>(defaultConfig, UTabs).underlined,
  dataTest: "",
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

const { tabsAttrs, itemAttrs } = useAttrs(props);
</script>

<template>
  <div :data-test="dataTest" v-bind="tabsAttrs">
    <!-- @slot Use it to add the UTab component. -->
    <slot>
      <UTab
        v-for="(item, index) in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        :size="size"
        :data-test="`${dataTest}-item-${index}`"
        v-bind="itemAttrs"
      />
    </slot>
  </div>
</template>
