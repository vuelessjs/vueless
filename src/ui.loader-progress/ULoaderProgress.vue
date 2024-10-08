<template>
  <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div v-if="show" v-bind="stripeAttrs" :style="barStyle" />
  </Transition>
</template>

<script setup>
import { computed, onBeforeUnmount, watch, ref, onMounted, onUnmounted } from "vue";

import { getDefault } from "../utils/utilUI.js";
import { isMobileApp } from "../utils/utilPlatform.js";
import { clamp, queue, getRequestWithoutQuery } from "./utilLoaderProgress.js";
import { useLoaderProgress } from "./useLoaderProgress.js";

import { ULoaderProgress, MAXIMUM, SPEED } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Loader stripe color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, ULoaderProgress).color,
  },

  /**
   * API resource names (endpoint URIs).
   */
  resources: {
    type: [String, Array],
    default: "",
  },
});

const error = ref(false);
const show = ref(false);
const progress = ref(0);
const opacity = ref(1);
const status = ref(null);

const { requestQueue, removeRequestUrl, isLoading, loaderProgressOff, loaderProgressOn } =
  useLoaderProgress();
const { stripeAttrs } = useAttrs(props, { error, isMobileApp });

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
  return Array.isArray(props.resources)
    ? props.resources.map(getRequestWithoutQuery)
    : [getRequestWithoutQuery(props.resources)];
});

watch(() => requestQueue.value.length, onChangeRequestsQueue);
watch(isLoading, onChangeLoadingState);

onMounted(() => {
  window.addEventListener("loaderProgressOn", setLoaderOnHandler);
  window.addEventListener("loaderProgressOff", setLoaderOffHandler);

  if (props.resources) {
    onChangeRequestsQueue();
  }
});

onBeforeUnmount(() => {
  removeRequestUrl(resourceNamesArray.value);
});

onUnmounted(() => {
  window.removeEventListener("loaderProgressOn", setLoaderOnHandler);
  window.removeEventListener("loaderProgressOff", setLoaderOffHandler);
});

function setLoaderOnHandler(event) {
  loaderProgressOn(event.detail.resource);
}

function setLoaderOffHandler(event) {
  loaderProgressOff(event.detail.resource);
}

function onChangeLoadingState() {
  if (!props.resources && isStarted.value && show.value && !isLoading.value) {
    done();
  }
}

function onChangeRequestsQueue() {
  let isActiveRequests = false;

  if (props.resources) {
    resourceNamesArray.value.forEach((resource) => {
      if (!isActiveRequests) {
        const activeRequest = requestQueue.value.find((request) => request === resource);

        isActiveRequests = Boolean(activeRequest);
      }
    });

    if (isActiveRequests && !isStarted.value) {
      start();
    } else if (!isActiveRequests && isStarted.value && show.value) {
      done();
    }
  } else {
    resourceNamesArray.value.forEach((resource) => {
      const activeRequest = requestQueue.value.find((request) => request === resource);

      isActiveRequests = !activeRequest;
    });

    if (isLoading.value && isActiveRequests && !isStarted.value) {
      start();
    }
  }
}

function beforeEnter() {
  opacity.value = 0;
  progress.value = 0;
}

function enter(el, done) {
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

function set(amount) {
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

function increase(amount) {
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

  set(clamp(currentProgress + amount, 0, MAXIMUM));
}

function done() {
  set(100);
}
</script>
