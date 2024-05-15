<template>
  <Transition name="loader" v-bind="{ ...config.transition, ...wrapperAttrs }">
    <div v-if="showLoader" v-bind="loaderAttrs">
      <div v-bind="rippleAttrs">
        <div v-bind="rippleElementAttrs" class="ripple-element" />
        <div v-bind="rippleElementAttrs" class="ripple-element" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";

import { useAttrs } from "./composables/attrs.composable";
import { useLoaderRendering } from "./composables/useLoaderRendering";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULoaderRendering", inheritAttrs: false });

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const { wrapperAttrs, loaderAttrs, rippleAttrs, rippleElementAttrs, config } = useAttrs(props);
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

<style lang="postcss" scoped>
.ripple-element {
  animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

  &:nth-child(2) {
    animation-delay: -0.5s;
  }
}

@keyframes ripple {
  0% {
    left: 5rem;
    top: 5rem;
    height: 0px;
    width: 0px;
    opacity: 1;
  }

  100% {
    left: 0px;
    top: 0px;
    height: 10rem;
    width: 10rem;
    opacity: 0;
  }
}
</style>
