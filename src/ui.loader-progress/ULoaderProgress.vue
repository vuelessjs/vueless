<script setup lang="ts">
import { computed, onBeforeUnmount, watch, ref, onMounted, onUnmounted } from "vue";

import { getDefaults } from "../utils/ui.ts";
import { clamp, queue, getRequestWithoutQuery } from "./utilLoaderProgress.ts";
import { useLoaderProgress } from "./useLoaderProgress.ts";
import useAttrs from "./useAttrs.ts";

import { ULoaderProgress, MAXIMUM, SPEED, INFINITY_LOADING } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { ULoaderProgressProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ULoaderProgressProps>(), {
  ...getDefaults<ULoaderProgressProps>(defaultConfig, ULoaderProgress),
});

const error = ref(false);
const show = ref(false);
const progress = ref(0);
const opacity = ref(1);
const status = ref<number | null>(null);

const {
  requestQueue,
  removeRequestUrl,
  isLoading,
  loaderProgressOff,
  loaderProgressOn,
  addRequestUrl,
} = useLoaderProgress();

const { stripeAttrs } = useAttrs(props);

const isStarted = computed(() => {
  return typeof status.value === "number";
});

const barStyle = computed(() => {
  return {
    width: `${progress.value}%`,
    opacity: `${opacity.value}`,
  };
});

const resourceNamesArray = computed(() => {
  if (!props.resources) {
    return [];
  }

  if (Array.isArray(props.resources)) {
    return props.resources.map((resource) => getRequestWithoutQuery(resource));
  }

  if (typeof props.resources === "function") {
    const resourceResult = props.resources();

    return resourceResult.map((resource) => getRequestWithoutQuery(resource));
  }

  return [getRequestWithoutQuery(props.resources)];
});

watch(() => requestQueue.value.length, onChangeRequestsQueue);

onMounted(() => {
  window.addEventListener("loaderProgressOn", setLoaderOnHandler as EventListener);
  window.addEventListener("loaderProgressOff", setLoaderOffHandler as EventListener);

  if (props.resources) {
    onChangeRequestsQueue();
  }
});

onBeforeUnmount(() => {
  removeRequestUrl(resourceNamesArray.value);
});

onUnmounted(() => {
  window.removeEventListener("loaderProgressOn", setLoaderOnHandler as EventListener);
  window.removeEventListener("loaderProgressOff", setLoaderOffHandler as EventListener);
});

watch(
  () => props.loading,
  () => {
    if (props.loading) {
      addRequestUrl(INFINITY_LOADING);
      isLoading.value = true;
    } else {
      removeRequestUrl(INFINITY_LOADING);
    }
  },
  { immediate: true },
);

function setLoaderOnHandler(event: CustomEvent<{ resource: string }>) {
  loaderProgressOn(event.detail.resource);
}

function setLoaderOffHandler(event: CustomEvent<{ resource: string }>) {
  loaderProgressOff(event.detail.resource);
}

function onChangeRequestsQueue() {
  const isActiveRequests =
    requestQueue.value.includes(INFINITY_LOADING) ||
    resourceNamesArray.value.some((resource) => {
      return requestQueue.value.includes(resource);
    });

  if (isActiveRequests && !isStarted.value && isLoading.value) {
    start();
  } else if (!isActiveRequests && isStarted.value && show.value) {
    done();
  }
}

function beforeEnter() {
  opacity.value = 0;
  progress.value = 0;
}

function enter(el: Element, done: () => void) {
  opacity.value = 1;
  done();
}

function afterEnter() {
  runStart();
}

function work() {
  setTimeout(() => {
    if (!isStarted.value) {
      return;
    }

    increase();
    work();
  }, 100);
}

function runStart() {
  status.value = progress.value === 100 ? null : progress.value;

  work();
}

function start() {
  if (show.value) {
    runStart();
  } else {
    show.value = true;
  }
}

function set(amount: number) {
  let currentProgress;

  if (isStarted.value) {
    currentProgress = amount < progress.value ? clamp(amount, 0, 100) : clamp(amount, 0.8, 100);
  } else {
    currentProgress = 0;
  }

  status.value = currentProgress === 100 ? null : currentProgress;

  queue((next) => {
    progress.value = currentProgress;

    if (currentProgress === 100) {
      setTimeout(() => {
        opacity.value = 0;
        setTimeout(() => {
          show.value = false;
          error.value = false;
          next();
        }, SPEED);
      }, SPEED);
    } else {
      setTimeout(next, SPEED);
    }
  });
}

function increase(amount?: number) {
  const currentProgress = progress.value;

  if (currentProgress < 100 && typeof amount !== "number") {
    if (currentProgress >= 0 && currentProgress < 25) {
      amount = 4;
    } else if (currentProgress >= 25 && currentProgress < 50) {
      amount = 3;
    } else if (currentProgress >= 50 && currentProgress < 75) {
      amount = 2;
    } else if (currentProgress >= 75 && currentProgress < 90) {
      amount = 1;
    } else if (currentProgress >= 90 && currentProgress < 95) {
      amount = 0.5;
    } else {
      amount = 0.05;
    }
  }

  set(clamp(currentProgress + (amount || 0), 0, MAXIMUM));
}

function done() {
  set(100);
}
</script>

<template>
  <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div v-if="show" v-bind="stripeAttrs" :style="barStyle" />
  </Transition>
</template>
