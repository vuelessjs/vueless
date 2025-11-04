<script setup lang="ts">
import { computed, useSlots, useTemplateRef, ref, watch, onMounted, onBeforeUnmount } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import UDivider from "../ui.container-divider/UDivider.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const emit = defineEmits([
  /**
   * Triggers when panel sizes change.
   * @property {number[]} modelValue
   */
  "update:modelValue",

  /**
   * Triggers when resize starts.
   */
  "resize-start",

  /**
   * Triggers when resize ends.
   * @property {number[]} sizes
   */
  "resize-end",
]);

const slots = useSlots();
const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const panelSlots = computed(() => {
  return Object.keys(slots).filter((name) => name.startsWith("panel-"));
});

const panelCount = computed(() => panelSlots.value.length);

const isDragging = ref(false);
const activeGutterIndex = ref<number | null>(null);
const dragStartPosition = ref(0);
const dragCurrentPosition = ref(0);
const containerSize = ref(0);
const panelSizes = ref<number[]>([]);

const isHorizontal = computed(() => props.orientation === "horizontal");

function parseSize(size: number | string, containerSize: number): number {
  if (typeof size === "string") {
    if (size.endsWith("%")) {
      return (parseFloat(size) / 100) * containerSize;
    }

    if (size.endsWith("px")) {
      return parseFloat(size);
    }

    return parseFloat(size);
  }

  return size;
}

function initializeSizes() {
  if (props.stateKey) {
    const storage = props.stateStorage === "local" ? localStorage : sessionStorage;
    const stored = storage.getItem(props.stateKey);

    if (stored) {
      const parsedSizes = JSON.parse(stored);

      if (Array.isArray(parsedSizes) && parsedSizes.length === panelCount.value) {
        panelSizes.value = parsedSizes;

        return;
      }
    }
  }

  if (props.modelValue && props.modelValue.length === panelCount.value) {
    panelSizes.value = [...props.modelValue];
  } else {
    const equalSize = 100 / panelCount.value;

    panelSizes.value = Array(panelCount.value).fill(equalSize);
  }
}

function updateContainerSize() {
  if (!wrapperRef.value) return;

  const rect = wrapperRef.value.getBoundingClientRect();

  containerSize.value = isHorizontal.value ? rect.width : rect.height;
}

function getMinSize(index: number): number {
  if (!props.minSizes) return 0;

  const minSize = Array.isArray(props.minSizes) ? props.minSizes[index] : props.minSizes;

  if (minSize === undefined) return 0;

  return parseSize(minSize, containerSize.value);
}

function getMaxSize(index: number): number {
  if (!props.maxSizes) return containerSize.value;

  const maxSize = Array.isArray(props.maxSizes) ? props.maxSizes[index] : props.maxSizes;

  if (maxSize === undefined) return containerSize.value;

  return parseSize(maxSize, containerSize.value);
}

function clampSize(size: number, index: number): number {
  const minSize = getMinSize(index);
  const maxSize = getMaxSize(index);

  return Math.max(minSize, Math.min(maxSize, size));
}

function onPointerDown(event: PointerEvent, gutterIndex: number) {
  if (props.disabled) return;

  event.preventDefault();

  isDragging.value = true;
  activeGutterIndex.value = gutterIndex;

  const clientPos = isHorizontal.value ? event.clientX : event.clientY;

  dragStartPosition.value = clientPos;
  dragCurrentPosition.value = clientPos;

  updateContainerSize();

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.body.style.cursor = isHorizontal.value ? "col-resize" : "row-resize";
  document.body.style.userSelect = "none";

  emit("resize-start");
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value || activeGutterIndex.value === null) return;

  event.preventDefault();

  const clientPos = isHorizontal.value ? event.clientX : event.clientY;

  dragCurrentPosition.value = clientPos;

  const delta = dragCurrentPosition.value - dragStartPosition.value;
  const deltaPercent = (delta / containerSize.value) * 100;

  const leftIndex = activeGutterIndex.value;
  const rightIndex = activeGutterIndex.value + 1;

  const newLeftSize = panelSizes.value[leftIndex] + deltaPercent;
  const newRightSize = panelSizes.value[rightIndex] - deltaPercent;

  const leftSizePx = (newLeftSize / 100) * containerSize.value;
  const rightSizePx = (newRightSize / 100) * containerSize.value;

  const clampedLeftPx = clampSize(leftSizePx, leftIndex);
  const clampedRightPx = clampSize(rightSizePx, rightIndex);

  const clampedLeftPercent = (clampedLeftPx / containerSize.value) * 100;
  const clampedRightPercent = (clampedRightPx / containerSize.value) * 100;

  const totalClamped = clampedLeftPercent + clampedRightPercent;
  const originalTotal = panelSizes.value[leftIndex] + panelSizes.value[rightIndex];

  if (Math.abs(totalClamped - originalTotal) < 0.1) {
    const newSizes = [...panelSizes.value];

    newSizes[leftIndex] = clampedLeftPercent;
    newSizes[rightIndex] = clampedRightPercent;

    panelSizes.value = newSizes;
    dragStartPosition.value = dragCurrentPosition.value;

    emit("update:modelValue", newSizes);
  }
}

function onPointerUp() {
  if (!isDragging.value) return;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";

  isDragging.value = false;

  if (props.stateKey) {
    const storage = props.stateStorage === "local" ? localStorage : sessionStorage;

    storage.setItem(props.stateKey, JSON.stringify(panelSizes.value));
  }

  emit("resize-end", panelSizes.value);

  activeGutterIndex.value = null;
}

function onKeyDown(event: KeyboardEvent, gutterIndex: number) {
  if (props.disabled) return;

  const stepValue = event.shiftKey ? props.step : 1;
  let delta = 0;

  if (isHorizontal.value) {
    if (event.key === "ArrowLeft") delta = -stepValue;
    if (event.key === "ArrowRight") delta = stepValue;
  } else {
    if (event.key === "ArrowUp") delta = -stepValue;
    if (event.key === "ArrowDown") delta = stepValue;
  }

  if (delta === 0) return;

  event.preventDefault();

  updateContainerSize();

  const leftIndex = gutterIndex;
  const rightIndex = gutterIndex + 1;

  const newLeftSize = panelSizes.value[leftIndex] + delta;
  const newRightSize = panelSizes.value[rightIndex] - delta;

  const leftSizePx = (newLeftSize / 100) * containerSize.value;
  const rightSizePx = (newRightSize / 100) * containerSize.value;

  const clampedLeftPx = clampSize(leftSizePx, leftIndex);
  const clampedRightPx = clampSize(rightSizePx, rightIndex);

  const clampedLeftPercent = (clampedLeftPx / containerSize.value) * 100;
  const clampedRightPercent = (clampedRightPx / containerSize.value) * 100;

  const newSizes = [...panelSizes.value];

  newSizes[leftIndex] = clampedLeftPercent;
  newSizes[rightIndex] = clampedRightPercent;

  panelSizes.value = newSizes;

  emit("update:modelValue", newSizes);

  if (props.stateKey) {
    const storage = props.stateStorage === "local" ? localStorage : sessionStorage;

    storage.setItem(props.stateKey, JSON.stringify(newSizes));
  }
}

function onDoubleClick(gutterIndex: number) {
  if (props.disabled) return;

  const leftIndex = gutterIndex;
  const rightIndex = gutterIndex + 1;

  const totalSize = panelSizes.value[leftIndex] + panelSizes.value[rightIndex];
  const equalSize = totalSize / 2;

  const newSizes = [...panelSizes.value];

  newSizes[leftIndex] = equalSize;
  newSizes[rightIndex] = equalSize;

  panelSizes.value = newSizes;

  emit("update:modelValue", newSizes);

  if (props.stateKey) {
    const storage = props.stateStorage === "local" ? localStorage : sessionStorage;

    storage.setItem(props.stateKey, JSON.stringify(newSizes));
  }
}

function getPanelStyle(index: number) {
  const size = panelSizes.value[index] || 0;

  return {
    flexBasis: `${size}%`,
    flexGrow: 0,
    flexShrink: 0,
  };
}

function getGutterAriaValue(gutterIndex: number) {
  return Math.round(panelSizes.value[gutterIndex] || 0);
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue.length === panelCount.value && !isDragging.value) {
      panelSizes.value = [...newValue];
    }
  },
);

onMounted(() => {
  initializeSizes();
  updateContainerSize();

  window.addEventListener("resize", updateContainerSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateContainerSize);
  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
});

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

const gutterStyle = computed(() => ({
  "--gutter-size": `${props.gutterSize}px`,
}));

const { getDataTest, wrapperAttrs, panelAttrs, gutterAttrs, dividerAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()">
    <template v-for="(slotName, index) in panelSlots" :key="slotName">
      <div
        v-bind="panelAttrs"
        :style="getPanelStyle(index)"
        :data-test="getDataTest(`panel-${index + 1}`)"
      >
        <!--
          @slot Use it to add panel content.
          @binding {number} index
          @binding {number} size
        -->
        <slot :name="slotName" :index="index" :size="panelSizes[index]" />
      </div>

      <div
        v-if="index < panelSlots.length - 1"
        role="separator"
        tabindex="0"
        :aria-orientation="orientation"
        :aria-valuenow="getGutterAriaValue(index)"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-label="`Resize panels ${index + 1} and ${index + 2}`"
        :style="gutterStyle"
        v-bind="gutterAttrs"
        :data-test="getDataTest(`gutter-${index + 1}`)"
        @pointerdown="onPointerDown($event, index)"
        @keydown="onKeyDown($event, index)"
        @dblclick="onDoubleClick(index)"
      >
        <UDivider
          :vertical="orientation === 'horizontal'"
          :color="gutterColor"
          size="sm"
          v-bind="dividerAttrs"
        >
          <!-- @slot Use it to add custom handle inside the divider. -->
          <slot name="handle" :is-dragging="isDragging" :index="index" />
        </UDivider>
      </div>
    </template>
  </div>
</template>
