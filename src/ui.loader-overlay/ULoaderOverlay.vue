<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from "vue";

import { getDefault } from "../utils/ui.ts";
import { useDarkMode } from "../composables/useDarkMode.ts";

import ULoader from "../ui.loader/ULoader.vue";

import { ULoaderOverlay } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import { useLoaderOverlay } from "./useLoaderOverlay.ts";

import type { ULoaderOverlayProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ULoaderOverlayProps>(), {
  loading: getDefault<ULoaderOverlayProps>(defaultConfig, ULoaderOverlay).loading,
  color: getDefault<ULoaderOverlayProps>(defaultConfig, ULoaderOverlay).color,
});

const { overlayAttrs, nestedLoaderAttrs, config } = useAttrs(props);
const loaderOverlay = useLoaderOverlay();
const { isDarkMode } = useDarkMode();

const loaderColor = computed(() => {
  if (props.color === "white") return "black";
  if (props.color === "black") return "white";

  return isDarkMode.value ? "white" : "black";
});

onMounted(() => {
  if (loaderOverlay) {
    window.addEventListener("loaderOverlayOn", loaderOverlay.loaderOverlayOn);
    window.addEventListener("loaderOverlayOff", loaderOverlay.loaderOverlayOff);
  }
});

onUnmounted(() => {
  if (loaderOverlay) {
    window.removeEventListener("loaderOverlayOn", loaderOverlay.loaderOverlayOn);
    window.removeEventListener("loaderOverlayOff", loaderOverlay.loaderOverlayOff);
  }
});

const showLoader = computed(() => {
  return props.loading === undefined ? (loaderOverlay?.isLoading.value ?? false) : props.loading;
});
</script>

<template>
  <Transition v-bind="config?.transition">
    <div v-if="showLoader" v-bind="overlayAttrs">
      <!-- @slot Use it to add something instead of the default loader. -->
      <slot>
        <ULoader :loading="showLoader" size="lg" :color="loaderColor" v-bind="nestedLoaderAttrs" />
      </slot>
    </div>
  </Transition>
</template>
