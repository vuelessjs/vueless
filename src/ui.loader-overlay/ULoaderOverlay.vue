<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";

import { getDefaults } from "../utils/ui.ts";
import { useDarkMode } from "../composables/useDarkMode.ts";

import ULoader from "../ui.loader/ULoader.vue";

import { ULoaderOverlay } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import { useLoaderOverlay } from "./useLoaderOverlay.ts";

import type { ULoaderOverlayProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ULoaderOverlayProps>(), {
  ...getDefaults<ULoaderOverlayProps, Config>(defaultConfig, ULoaderOverlay),
});

const { overlayAttrs, nestedLoaderAttrs, config } = useAttrs(props);
const { loaderOverlayOn, loaderOverlayOff, isLoading } = useLoaderOverlay();
const { isDarkMode } = useDarkMode();

const loaderColor = computed(() => {
  if (props.color === "white") return "black";
  if (props.color === "black") return "white";

  return isDarkMode.value ? "white" : "black";
});

onMounted(() => {
  window.addEventListener("loaderOverlayOn", loaderOverlayOn);
  window.addEventListener("loaderOverlayOff", loaderOverlayOff);
});

onUnmounted(() => {
  window.removeEventListener("loaderOverlayOn", loaderOverlayOn);
  window.removeEventListener("loaderOverlayOff", loaderOverlayOff);
});

const showLoader = computed(() => {
  return props.loading === undefined ? (isLoading.value ?? false) : props.loading;
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
