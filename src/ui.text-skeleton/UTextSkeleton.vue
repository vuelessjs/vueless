<script setup lang="ts">
import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

import USkeleton from "../ui.skeleton/USkeleton.vue";
import UCol from "../ui.container-col/UCol.vue";
// import URow from "../ui.container-row/URow.vue";

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
  <UCol v-bind="wrapperAttrs" :data-test="getDataTest()">
    <UCol gap="xs" v-bind="headerWrapperAttrs">
      <USkeleton v-for="line in header" :key="line" :variant="variant" v-bind="headerAttrs" />
    </UCol>
    <UCol gap="xs" v-bind="textWrapperAttrs">
      <USkeleton v-for="line in text" :key="line" :variant="variant" v-bind="textAttrs" />
    </UCol>
  </UCol>
</template>
