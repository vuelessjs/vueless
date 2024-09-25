<template>
  <Transition v-bind="config.transition">
    <div v-if="loading" v-bind="loaderAttrs">
      <!-- @slot Use it to add something instead of the default loader. -->
      <slot>
        <div v-for="ellipse in ELLIPSES_AMOUNT" :key="ellipse" v-bind="ellipseAttrs" />
      </slot>
    </div>
  </Transition>
</template>

<script setup>
import { getDefault } from "../utils/utilUI.js";

import { ULoader, ELLIPSES_AMOUNT } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Set loader on.
   */
  loading: {
    type: Boolean,
    default: getDefault(defaultConfig, ULoader).loading,
  },

  /**
   * Loader color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, ULoader).color,
  },

  /**
   * Loader size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, ULoader).size,
  },
});

const { loaderAttrs, ellipseAttrs, config } = useAttrs(props);
</script>

<style scoped lang="postcss">
.vueless-loader-ellipse {
  &:nth-child(1) {
    animation: ellipse-1 0.6s infinite;
  }

  &:nth-child(4) {
    animation: ellipse-3 0.6s infinite;
  }

  &-sm {
    &:nth-child(2) {
      animation: ellipse-2-sm 0.6s infinite;
    }

    &:nth-child(3) {
      animation: ellipse-2-sm 0.6s infinite;
    }
  }

  &-md {
    &:nth-child(2) {
      animation: ellipse-2-md 0.6s infinite;
    }

    &:nth-child(3) {
      animation: ellipse-2-md 0.6s infinite;
    }
  }

  &-lg {
    &:nth-child(2) {
      animation: ellipse-2-lg 0.6s infinite;
    }

    &:nth-child(3) {
      animation: ellipse-2-lg 0.6s infinite;
    }
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
