<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import ULoader from "../ui.loader/ULoader.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";
import { useLoaderOverlay } from "./useLoaderOverlay.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const overlayRef = useTemplateRef<HTMLDivElement>("overlay");

const { loaderOverlayOn, loaderOverlayOff, isLoading } = useLoaderOverlay();

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

defineExpose({
  /**
   * A reference to the loader overlay element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  overlayRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, config, overlayAttrs, nestedLoaderAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <Transition v-bind="config.overlayTransition">
    <div v-if="showLoader" ref="overlay" v-bind="overlayAttrs" :data-test="getDataTest()">
      <!-- @slot Use it to add something instead of the default loader. -->
      <slot>
        <ULoader :loading="showLoader" size="lg" :color="color" v-bind="nestedLoaderAttrs" />
      </slot>
    </div>
  </Transition>
</template>
