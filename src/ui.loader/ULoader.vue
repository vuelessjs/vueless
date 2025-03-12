<script setup lang="ts">
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { COMPONENT_NAME, ELLIPSES_AMOUNT } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, config, loaderAttrs, ellipseAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <Transition v-bind="config.loaderTransition">
    <div v-if="loading" v-bind="loaderAttrs" :data-test="getDataTest()">
      <!-- @slot Use it to add something instead of the default loader. -->
      <slot>
        <div v-for="ellipse in ELLIPSES_AMOUNT" :key="ellipse" v-bind="ellipseAttrs" />
      </slot>
    </div>
  </Transition>
</template>

<style scoped lang="postcss">
.vueless-loader-ellipse:nth-child(1) {
  animation: ellipse-1 0.6s infinite;
}

.vueless-loader-ellipse:nth-child(4) {
  animation: ellipse-3 0.6s infinite;
}

.vueless-loader-ellipse-sm {
  &:nth-child(2) {
    animation: ellipse-2-sm 0.6s infinite;
  }

  &:nth-child(3) {
    animation: ellipse-2-sm 0.6s infinite;
  }
}

.vueless-loader-ellipse-md {
  &:nth-child(2) {
    animation: ellipse-2-md 0.6s infinite;
  }

  &:nth-child(3) {
    animation: ellipse-2-md 0.6s infinite;
  }
}

.vueless-loader-ellipse-lg {
  &:nth-child(2) {
    animation: ellipse-2-lg 0.6s infinite;
  }

  &:nth-child(3) {
    animation: ellipse-2-lg 0.6s infinite;
  }
}

@keyframes ellipse-1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes ellipse-3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes ellipse-2-sm {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(12px, 0);
  }
}

@keyframes ellipse-2-md {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(18px, 0);
  }
}

@keyframes ellipse-2-lg {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
