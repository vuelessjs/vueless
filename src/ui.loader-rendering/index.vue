<template>
  <Transition v-bind="config.transition">
    <div v-if="showLoader" v-bind="wrapperAttrs">
      <ULoader size="lg" :color="color === 'white' ? 'grayscale' : 'white'" />
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import UIService from "../service.ui";

import ULoader from "../ui.loader";

import { ULoaderRendering } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";
import { useLoaderRendering } from "./composables/useLoaderRendering";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULoaderRendering", inheritAttrs: false });

const props = defineProps({
  /**
   * Set loader on.
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * Loader color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, ULoaderRendering).default.color,
  },
});

const { wrapperAttrs, config } = useAttrs(props);
const { isRenderingPage, setRenderingStarted, setRenderingFinished } = useLoaderRendering();

onMounted(() => {
  window.addEventListener("setRenderingStarted", setRenderingStarted);
  window.addEventListener("setRenderingFinished", setRenderingFinished);
});

onUnmounted(() => {
  window.removeEventListener("setRenderingStarted", setRenderingStarted);
  window.removeEventListener("setRenderingFinished", setRenderingFinished);
});

const showLoader = computed(() => {
  return props.loading || isRenderingPage.value;
});
</script>
