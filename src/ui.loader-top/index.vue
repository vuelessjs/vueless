<template>
  <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div v-if="show" v-bind="progressAttrs" :style="barStyle" />
  </Transition>
</template>

<script setup>
import { computed, onBeforeUnmount, watch, ref, onMounted, onUnmounted } from "vue";

import UIService, { isMobileApp } from "../service.ui";
import { clamp, queue } from "./services/loaderTop.service";
import { useLoaderTop } from "./composables/useLoaderTop";

import { ULoaderTop, MAXIMUM, SPEED } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULoaderTop", inheritAttrs: false });

const props = defineProps({
  /**
   * The name of API resource (endpoint URI).
   */
  resourceNames: {
    type: [String, Array],
    default: "",
  },

  /**
   * The color of the loader stripe.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, ULoaderTop).default.color,
  },
});

const error = ref(false);
const show = ref(false);
const progress = ref(0);
const opacity = ref(1);
const status = ref(null);

const {
  loaderRequestQueue,
  isLoading,
  componentLoaderRequestQueue,
  setComponentRequestQueue,
  removeComponentRequestQueue,
  loaderTopOff,
  loaderTopOn,
} = useLoaderTop();
const { progressAttrs } = useAttrs(props, { error, isMobileApp });

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
  return Array.isArray(props.resourceNames) ? [...props.resourceNames] : [props.resourceNames];
});

watch(loaderRequestQueue, onChangeRequestsQueue, { deep: true });
watch(isLoading, onChangeLoadingState, { deep: true });

if (props.resourceNames) {
  setComponentRequestQueue(resourceNamesArray.value);
}

onMounted(() => {
  window.addEventListener("loaderTopOn", setLoaderOnHandler);
  window.addEventListener("loaderTopOff", setLoaderOffHandler);
});

onBeforeUnmount(() => {
  if (props.resourceNames) {
    removeComponentRequestQueue();
  }
});

onUnmounted(() => {
  window.removeEventListener("loaderTopOn", setLoaderOnHandler);
  window.removeEventListener("loaderTopOff", setLoaderOffHandler);
});

function setLoaderOnHandler(event) {
  loaderTopOn(event.detail.resource);
}

function setLoaderOffHandler(event) {
  loaderTopOff(event.detail.resource);
}

function requestWithoutQuery(request) {
  const [requestWithoutQuery] = request.split("?");

  return requestWithoutQuery;
}

function onChangeLoadingState() {
  if (!props.resourceNames && isStarted.value && show.value && !isLoading.value) {
    done();
  }
}

function onChangeRequestsQueue() {
  let isActiveRequests = false;

  if (props.resourceNames) {
    resourceNamesArray.value.forEach((item) => {
      if (!isActiveRequests) {
        const activeRequest = loaderRequestQueue.value.find(
          (request) => requestWithoutQuery(request) === item,
        );

        isActiveRequests = !!activeRequest;
      }
    });

    if (isActiveRequests && !isStarted.value) {
      start();
    } else if (!isActiveRequests && isStarted.value && show.value) {
      done();
    }
  } else {
    loaderRequestQueue.value.forEach((item) => {
      const activeRequest = componentLoaderRequestQueue.value.find(
        (request) => request === requestWithoutQuery(item),
      );

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
      amount = Math.random() * 3 + 3;
    } else if (currentProgress >= 25 && currentProgress < 50) {
      amount = Math.random() * 3;
    } else if (currentProgress >= 50 && currentProgress < 85) {
      amount = Math.random() * 2;
    } else if (currentProgress >= 85 && currentProgress < 99) {
      amount = 0.5;
    } else {
      amount = 0;
    }
  }

  set(clamp(currentProgress + amount, 0, MAXIMUM));
}

function done() {
  set(100);
}
</script>
