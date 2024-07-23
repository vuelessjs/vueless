<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs" @click="onClickSetValue">
    <!-- @slot Use it to add something instead of label. -->
    <slot>
      {{ label }}
    </slot>
  </div>
</template>

<script setup>
import { computed, inject, toValue } from "vue";

import UIService from "../service.ui";

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
    default: UIService.get(defaultConfig, UTab).default.disabled,
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

const selected = computed(() => {
  return toValue(getUTabsSelectedItem) === props.value && !props.disabled;
});

const size = computed(() => {
  return toValue(getUTabsSize) || UIService.get(defaultConfig, UTab).default.size;
});

const { wrapperAttrs } = useAttrs(props, { selected, size });

async function onClickSetValue() {
  if (!props.disabled && setUTabsSelectedItem) {
    setUTabsSelectedItem(props.value);
  }
}
</script>
