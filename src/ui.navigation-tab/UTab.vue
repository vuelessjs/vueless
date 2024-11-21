<script lang="ts" setup>
import { computed, inject, toValue } from "vue";

import { getDefault } from "../utils/ui.ts";

import { UTab } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UTabProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const setUTabsSelectedItem = inject("setUTabsSelectedItem", null);
const getUTabsSelectedItem = inject("getUTabsSelectedItem", null);
const getUTabsSize = inject("getUTabsSize", null);

const props = withDefaults(defineProps<UTabProps>(), {
  disabled: getDefault<UTabProps>(defaultConfig, UTab).disabled,
  dataTest: "",
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

<template>
  <div v-bind="tabAttrs" :data-test="dataTest" @click="onClickSetValue">
    <!-- @slot Use it to add something instead of the label. -->
    <slot>
      {{ label }}
    </slot>
  </div>
</template>
