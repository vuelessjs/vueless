<script setup lang="ts">
import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, LABEL_ALIGN } from "./constants.ts";

import type { Props, Config } from "./types.ts";

import USkeleton from "../ui.skeleton/USkeleton.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const { getDataTest, inputAttrs, labelAttrs, wrapperAttrs } = useUI<Config>(
  defaultConfig,
  computed(() => props),
);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <USkeleton
      v-if="props.labelAlign !== LABEL_ALIGN.topInside"
      :color="color"
      :variant="variant"
      v-bind="labelAttrs"
    />
    <USkeleton :color="color" :variant="variant" v-bind="inputAttrs">
      <slot />
    </USkeleton>
  </div>
</template>
