<script setup lang="ts">
import { computed } from "vue";
import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

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
    <!-- @slot Use it to add custom content inside the skeleton. -->
    <slot />
  </div>
</template>
