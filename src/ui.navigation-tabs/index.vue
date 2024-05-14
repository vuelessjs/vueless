<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <slot>
      <UTab
        v-for="(item, index) in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        :size="size"
        :data-cy="`${dataCy}-item-${index}`"
        v-bind="tabAttrs"
      />
    </slot>
  </div>
</template>

<script setup>
import { computed, provide } from "vue";

import UTab from "../ui.navigation-tab";
import UIService from "../service.ui";

import { UTabs } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

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
    default: UIService.get(defaultConfig, UTabs).default.size,
  },

  /**
   * Add the bottom line along the entire length.
   */
  underlined: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTabs).default.underlined,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide("setUTabsSelectedItem", (value) => (selectedItem.value = value));
provide("getUTabsSelectedItem", () => selectedItem.value);
provide("getUTabsSize", () => props.size);

const { wrapperAttrs, tabAttrs } = useAttrs(props);
</script>
