<template>
  <div v-bind="loaderAttrs">
    <div v-for="ellipse in ellipsesAmount" :key="ellipse" v-bind="ellipseAttrs(ellipseClasses)" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import UIService from "../service.ui";

import { ULoader } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULoader", inheritAttrs: false });

const props = defineProps({
  /**
   * The size of the button.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, ULoader).default.size,
  },

  /**
   * Loader color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, ULoader).default.color,
  },
});

const ellipsesAmount = ref(4);

const { loaderAttrs, ellipseAttrs } = useAttrs(props);

const ellipseClasses = computed(() => [
  "vueless-internal-loader-ellipse",
  `vueless-internal-loader-ellipse-${props.size}`,
]);
</script>

<style scoped lang="postcss">
.vueless-internal-loader-ellipse {
  &:nth-child(1) {
    @apply animate-[lds-ellipsis1_0.6s_infinite];
  }

  &:nth-child(4) {
    @apply animate-[lds-ellipsis3_0.6s_infinite];
  }

  &-sm {
    &:nth-child(2) {
      @apply animate-[lds-ellipsis2-sm_0.6s_infinite];
    }

    &:nth-child(3) {
      @apply animate-[lds-ellipsis2-sm_0.6s_infinite];
    }
  }

  &-md {
    &:nth-child(2) {
      @apply animate-[lds-ellipsis2-md_0.6s_infinite];
    }

    &:nth-child(3) {
      @apply animate-[lds-ellipsis2-md_0.6s_infinite];
    }
  }

  &-lg {
    &:nth-child(2) {
      @apply animate-[lds-ellipsis2-lg_0.6s_infinite];
    }

    &:nth-child(3) {
      @apply animate-[lds-ellipsis2-lg_0.6s_infinite];
    }
  }
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2-sm {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(12px, 0);
  }
}

@keyframes lds-ellipsis2-md {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(18px, 0);
  }
}

@keyframes lds-ellipsis2-lg {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
