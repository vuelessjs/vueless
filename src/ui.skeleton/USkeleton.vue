<script setup lang="ts">
import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const { getDataTest, bodyAttrs } = useUI<Config>(
  defaultConfig,
  computed(() => props),
);
</script>

<template>
  <div :data-test="getDataTest()" v-bind="bodyAttrs">
    <slot />
  </div>
</template>
