<template>
  <transition name="loader">
    <div v-if="showLoader" class="app-loader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";

import useLoaderRendering from "./composables/useLoaderRendering";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULoaderRendering" });

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const { isRenderingPage } = useLoaderRendering();

const showLoader = computed(() => {
  return props.loading || isRenderingPage.value;
});
</script>

<style lang="postcss" scoped>
.app-loader {
  @apply flex justify-center items-center;
  @apply fixed left-0 top-0 z-[9999] h-screen w-screen;
  @apply bg-gray-800;
  @apply transition-all duration-300;

  .lds-ripple {
    @apply relative h-40 w-40;
    @apply ml-auto mr-auto;

    div {
      @apply absolute opacity-100;
      @apply rounded-full border-4 border-solid border-white;
      animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

      &:nth-child(2) {
        animation-delay: -0.5s;
      }
    }
  }

  @keyframes lds-ripple {
    0% {
      @apply left-20 top-20 h-0 w-0 opacity-100;
    }

    100% {
      @apply left-0 top-0 h-40 w-40 opacity-0;
    }
  }
}

.loader-enter-from .loader-container-loader,
.loader-leave-active .loader-container-loader {
  @apply scale-110 transform;
}
</style>
