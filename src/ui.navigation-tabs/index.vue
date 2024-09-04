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

<script setup>
import { computed, provide } from "vue";

import UTab from "../ui.navigation-tab";
import { getDefault } from "../service.ui";

import { UTabs } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UTabs", inheritAttrs: false });

const props = defineProps({
  /**
   * Selected tab value.
   */
  modelValue: {
    type: String,
    default: "",
  },

  /**
   * Tab options.
   */
  options: {
    type: Array,
    default: () => [
      {
        label: "",
        value: "",
        disabled: false,
      },
    ],
  },

  /**
   * Tabs size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UTabs).size,
  },

  /**
   * Add the bottom line along the entire length.
   */
  underlined: {
    type: Boolean,
    default: getDefault(defaultConfig, UTabs).underlined,
  },

  /**
   * Component ui config object.
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

provide("setUTabsSelectedItem", (value) => (selectedItem.value = value));
provide("getUTabsSelectedItem", () => selectedItem.value);
provide("getUTabsSize", () => props.size);

const { tabsAttrs, itemAttrs } = useAttrs(props);
</script>
