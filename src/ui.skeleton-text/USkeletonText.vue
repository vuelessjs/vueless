<script setup lang="ts">
import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

import USkeleton from "../ui.skeleton/USkeleton.vue";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, wrapperAttrs, headerAttrs, textAttrs, headerWrapperAttrs, textWrapperAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-if="headerLines" v-bind="headerWrapperAttrs">
      <USkeleton v-for="line in headerLines" :key="line" v-bind="headerAttrs" />
    </div>
    <div v-if="textLines" v-bind="textWrapperAttrs">
      <USkeleton v-for="line in textLines" :key="line" v-bind="textAttrs" />
    </div>
  </div>
</template>
