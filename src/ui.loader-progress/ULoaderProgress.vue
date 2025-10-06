<script setup lang="ts">
import { computed, watch, ref, useTemplateRef, onBeforeMount, onBeforeUnmount } from "vue";

import useUI from "../composables/useUI";
import { useRequestQueue } from "../composables/useRequestQueue";
import { getDefaults } from "../utils/ui";
import { getRequestWithoutQuery } from "../utils/requestQueue";

import { clamp, queue } from "./utilLoaderProgress";

import { COMPONENT_NAME, MAXIMUM, SPEED } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  resources: () => "",
});

const error = ref(false);
const show = ref(false);
const progress = ref(0);
const opacity = ref(1);
const status = ref<number | null>(null);

const progressRef = useTemplateRef<HTMLDivElement>("progress-bar");

const { requestQueue, addToRequestQueue, removeFromRequestQueue } = useRequestQueue();

const isLoading = computed(() => {
  return typeof status.value === "number";
});

const barStyle = computed(() => {
  return {
    width: `${progress.value}%`,
    opacity: `${opacity.value}`,
  };
});

const resourceSubscriptions = computed(() => {
  if (Array.isArray(props.resources)) {
    return props.resources.map(getRequestWithoutQuery);
  }

  return [getRequestWithoutQuery(props.resources)];
});

const isActiveRequests = computed(() => {
  const isAnyRequestActive = props.resources === "any" && requestQueue.value.length;
  const isSubscribedRequestsActive = resourceSubscriptions.value.some((resource) =>
    requestQueue.value.includes(resource),
  );

  return isAnyRequestActive || isSubscribedRequestsActive;
});

watch(() => requestQueue, onChangeRequestsQueue, { immediate: true, deep: true });

watch(
  () => props.loading,
  () => (props.loading ? start() : stop()),
);

function onChangeRequestsQueue() {
  if (props.loading !== undefined) return;

  if (isActiveRequests.value && !isLoading.value) {
    start();
  } else if (!isActiveRequests.value && isLoading.value && show.value) {
    stop();
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
  // TODO: Use requestAnimationFrame for animations instead of setTimeout for better performance and smoothness.
  setTimeout(() => {
    if (!isLoading.value) {
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
  let currentProgress = 0;

  if (isLoading.value) {
    currentProgress = amount < progress.value ? clamp(amount, 0, 100) : clamp(amount, 0.8, 100);
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

function stop() {
  set(100);
}

function onLoaderProgressOn(event: CustomEvent<{ request: string }>) {
  addToRequestQueue(event.detail.request);
}

function onLoaderProgressOff(event: CustomEvent<{ request: string }>) {
  removeFromRequestQueue(event.detail.request);
}

onBeforeMount(() => {
  if (!window.__VuelessLoaderProgressInstanceCount) {
    window.addEventListener("loaderProgressOn", onLoaderProgressOn as EventListener);
    window.addEventListener("loaderProgressOff", onLoaderProgressOff as EventListener);
  }

  window.__VuelessLoaderProgressInstanceCount = window.__VuelessLoaderProgressInstanceCount ?? 0;
  window.__VuelessLoaderProgressInstanceCount += 1;
});

onBeforeUnmount(() => {
  if (window.__VuelessLoaderProgressInstanceCount === undefined) {
    return;
  }

  window.__VuelessLoaderProgressInstanceCount -= 1;

  if (!window.__VuelessLoaderProgressInstanceCount) {
    delete window.__VuelessLoaderProgressInstanceCount;

    window.removeEventListener("loaderProgressOn", onLoaderProgressOn as EventListener);
    window.removeEventListener("loaderProgressOff", onLoaderProgressOff as EventListener);
  }
});

defineExpose({
  /**
   * Start loading animation.
   * @property {Function}
   */
  start,

  /**
   * Stop loading animation.
   * @property {Function}
   */
  stop,

  /**
   * Loading state.
   * @property {Boolean}
   */
  isLoading,

  /**
   * A reference to the loader progress element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  progressRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, progressAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div
      v-if="show"
      ref="progress-bar"
      v-bind="progressAttrs"
      :data-test="getDataTest()"
      :style="barStyle"
    />
  </Transition>
</template>
