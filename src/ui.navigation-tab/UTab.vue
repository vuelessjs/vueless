<script setup lang="ts">
import { computed, inject, toValue } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { UTab } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, UTabSize, Config } from "./types.ts";
import type { SetUTabsSelectedItem } from "../ui.navigation-tabs/types.ts";

defineOptions({ inheritAttrs: false });

const setUTabsSelectedItem = inject<SetUTabsSelectedItem | null>("setUTabsSelectedItem", null);
const getUTabsSelectedItem = inject("getUTabsSelectedItem", null);
const getUTabsSize = inject("getUTabsSize", null);

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UTab),
});

const selected = computed(() => {
  return toValue(getUTabsSelectedItem) === props.value && !props.disabled;
});

const size = computed(() => {
  return toValue(getUTabsSize) || getDefaults<UTabSize, Config>(defaultConfig, UTab).size;
});

async function onClickSetValue() {
  if (!props.disabled && setUTabsSelectedItem) {
    setUTabsSelectedItem(props.value ?? "");
  }
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  size: size.value,
  /* component state, not a props */
  selected: selected.value,
}));

const { tabAttrs } = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div v-bind="tabAttrs" :data-test="dataTest" @click="onClickSetValue">
    <!-- @slot Use it to add something instead of the label. -->
    <slot>
      {{ label }}
    </slot>
  </div>
</template>
