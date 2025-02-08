<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const mutatedProps = computed(() => ({
  label: Boolean(props.label),
}));

const { getDataTest, wrapperAttrs, dividerAttrs, labelAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-bind="dividerAttrs" />
    <span v-if="label" v-bind="labelAttrs" v-text="label" />
  </div>
</template>
