<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

/**
 * Declaring component props.
 */
withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  /* Add default values for props below */
});

/**
 * Add component logic here.
 */

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* Add mutated props or non-props component state below */
}));

const { getDataTest, wrapperAttrs } = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">Boilerplate</div>
</template>
