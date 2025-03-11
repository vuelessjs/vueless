<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

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

const { wrapperAttrs } = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div v-bind="wrapperAttrs">Boilerplate</div>
</template>
