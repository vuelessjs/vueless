<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs" @click="onClickSetValue">
    <!-- @slot Use it to add something instead of label. -->
    <slot>
      {{ label }}
    </slot>
  </div>
</template>

<script setup>
import { computed, inject, toValue } from "vue";

import { getDefault } from "../service.ui";

import { UTab } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UTab", inheritAttrs: false });

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
    type: String,
    default: "",
  },

  /**
   * Make tab disabled.
   * @ignore
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

const { wrapperAttrs } = useAttrs(props, { selected, size });

async function onClickSetValue() {
  if (!props.disabled && setUTabsSelectedItem) {
    setUTabsSelectedItem(props.value);
  }
}
</script>
