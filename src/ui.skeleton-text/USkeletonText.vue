<script setup lang="ts">
import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

import USkeleton from "../ui.skeleton/USkeleton.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const { getDataTest, wrapperAttrs, headerAttrs, textAttrs, headerWrapperAttrs, textWrapperAttrs } =
  useUI<Config>(
    defaultConfig,
    computed(() => props),
  );
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-bind="headerWrapperAttrs">
      <USkeleton v-for="line in headerLines" :key="line" :variant="variant" v-bind="headerAttrs" />
    </div>
    <div v-bind="textWrapperAttrs">
      <USkeleton v-for="line in textLines" :key="line" :variant="variant" v-bind="textAttrs" />
    </div>
  </div>
</template>
