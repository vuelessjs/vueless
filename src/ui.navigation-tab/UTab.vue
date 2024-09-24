<template>
  <div v-bind="tabAttrs" :data-test="dataTest" @click="onClickSetValue">
    <!-- @slot Use it to add something instead of the label. -->
    <slot>
      {{ label }}
    </slot>
  </div>
</template>

<script setup>
import { computed, inject, toValue } from "vue";

import { getDefault } from "../utils/utilUI.js";

import { UTab } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const setUTabsSelectedItem = inject("setUTabsSelectedItem", null);
const getUTabsSelectedItem = inject("getUTabsSelectedItem", null);
const getUTabsSize = inject("getUTabsSize", null);

const props = defineProps({
  /**
   * Tab label.
   * @ignore
   */
  label: {
    type: String,
    required: true,
  },

  /**
   * Tab value.
   */
  value: {
    type: [String, Number],
    default: "",
  },

  /**
   * Make tab disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UTab).disabled,
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

const selected = computed(() => {
  return toValue(getUTabsSelectedItem) === props.value && !props.disabled;
});

const size = computed(() => {
  return toValue(getUTabsSize) || getDefault(defaultConfig, UTab).size;
});

const { tabAttrs } = useAttrs(props, { selected, size });

async function onClickSetValue() {
  if (!props.disabled && setUTabsSelectedItem) {
    setUTabsSelectedItem(props.value);
  }
}
</script>
