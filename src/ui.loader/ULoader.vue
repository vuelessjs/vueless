<script lang="ts" setup>
import { getDefault } from "../utils/ui.ts";

import { ULoader, ELLIPSES_AMOUNT } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { ULoaderProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ULoaderProps>(), {
  loading: getDefault<ULoaderProps>(defaultConfig, ULoader).loading,
  color: getDefault<ULoaderProps>(defaultConfig, ULoader).color,
  size: getDefault<ULoaderProps>(defaultConfig, ULoader).size,
});

const { loaderAttrs, ellipseAttrs, config } = useAttrs(props);
</script>

<template>
  <Transition v-bind="config?.transition">
    <div v-if="loading" v-bind="loaderAttrs">
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
