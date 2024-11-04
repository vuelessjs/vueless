<template>
  <Transition v-bind="config.transition">
    <div v-if="showLoader" v-bind="overlayAttrs">
      <!-- @slot Use it to add something instead of the default loader. -->
      <slot>
        <ULoader
          :loading="showLoader"
          size="lg"
          :color="color === 'white' ? 'grayscale' : 'white'"
          v-bind="nestedLoaderAttrs"
        />
      </slot>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { getDefault } from "../utils/ui.ts";

import ULoader from "../ui.loader/ULoader.vue";

import { ULoaderOverlay } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import { useLoaderOverlay } from "./useLoaderOverlay.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Loader state (shown / hidden).
   */
  loading: {
    type: Boolean,
    default: getDefault(defaultConfig, ULoaderOverlay).loading,
  },

  /**
   * Loader color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, ULoaderOverlay).color,
  },
});

const { overlayAttrs, nestedLoaderAttrs, config } = useAttrs(props);
const { isLoading, loaderOverlayOn, loaderOverlayOff } = useLoaderOverlay();

onMounted(() => {
  window.addEventListener("loaderOverlayOn", loaderOverlayOn);
  window.addEventListener("loaderOverlayOff", loaderOverlayOff);
});

onUnmounted(() => {
  window.removeEventListener("loaderOverlayOn", loaderOverlayOn);
  window.removeEventListener("loaderOverlayOff", loaderOverlayOff);
});

const showLoader = computed(() => {
  return props.loading === undefined ? isLoading.value : props.loading;
});
</script>
