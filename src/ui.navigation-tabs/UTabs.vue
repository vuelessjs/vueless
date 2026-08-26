<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UTab from "../ui.navigation-tab/UTab.vue";
import UButton from "../ui.button/UButton.vue";

import { COMPONENT_NAME, SCROLL_OFFSET, DRAG_THRESHOLD, DRAG_CLICK_SUPPRESS_MS } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  options: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the selected tab changes.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const scrollContainerRef = useTemplateRef<HTMLDivElement | null>("scroll-container");
const showLeftArrow = ref(false);
const showRightArrow = ref(false);
const isDragging = ref(false);
const preventTabClick = ref(false);

let isPointerDown = false;
let dragAxis: "x" | "y" | null = null;
let startX = 0;
let startY = 0;
let startScrollLeft = 0;
let suppressClickTimer: ReturnType<typeof setTimeout> | null = null;

function checkScroll() {
  if (!scrollContainerRef.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.value;

  showLeftArrow.value = scrollLeft > 0;
  showRightArrow.value = scrollLeft < scrollWidth - clientWidth;
}

function scrollPrev() {
  if (!scrollContainerRef.value) return;

  scrollContainerRef.value.scrollBy({ left: -SCROLL_OFFSET, behavior: "smooth" });
}

function scrollNext() {
  if (!scrollContainerRef.value) return;

  scrollContainerRef.value.scrollBy({ left: SCROLL_OFFSET, behavior: "smooth" });
}

function isScrollableOverflow() {
  if (!scrollContainerRef.value) return false;

  return scrollContainerRef.value.scrollWidth > scrollContainerRef.value.clientWidth;
}

function clearSuppressClickTimer() {
  if (!suppressClickTimer) return;

  clearTimeout(suppressClickTimer);
  suppressClickTimer = null;
}

function stopDragListeners() {
  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
  document.removeEventListener("pointercancel", onPointerUp);
}

function resetDragState() {
  isPointerDown = false;
  dragAxis = null;
  isDragging.value = false;
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

function suppressTabClick() {
  preventTabClick.value = true;
  clearSuppressClickTimer();

  suppressClickTimer = setTimeout(() => {
    preventTabClick.value = false;
    suppressClickTimer = null;
  }, DRAG_CLICK_SUPPRESS_MS);
}

function onPointerDown(event: PointerEvent) {
  if (!props.scrollable || event.button > 0 || !isScrollableOverflow()) return;

  isPointerDown = true;
  dragAxis = null;
  startX = event.clientX;
  startY = event.clientY;
  startScrollLeft = scrollContainerRef.value?.scrollLeft ?? 0;

  document.addEventListener("pointermove", onPointerMove, { passive: false });
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);
}

function onPointerMove(event: PointerEvent) {
  if (!isPointerDown || !scrollContainerRef.value) return;

  if (event.pointerType === "mouse" && event.buttons === 0) {
    onPointerUp();

    return;
  }

  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;

  if (!dragAxis) {
    if (Math.abs(deltaX) < DRAG_THRESHOLD && Math.abs(deltaY) < DRAG_THRESHOLD) return;

    dragAxis = Math.abs(deltaX) >= Math.abs(deltaY) ? "x" : "y";

    if (dragAxis === "y") {
      stopDragListeners();
      resetDragState();

      return;
    }

    isDragging.value = true;
    document.body.style.cursor = "move";
    document.body.style.userSelect = "none";
  }

  if (dragAxis !== "x") return;

  event.preventDefault();
  scrollContainerRef.value.scrollLeft = startScrollLeft - deltaX;
}

function onPointerUp() {
  const wasDragging = isDragging.value;

  stopDragListeners();
  resetDragState();

  if (wasDragging) {
    suppressTabClick();
  }
}

function onClickCapture(event: MouseEvent) {
  if (!preventTabClick.value) return;

  event.preventDefault();
  event.stopPropagation();
  preventTabClick.value = false;
  clearSuppressClickTimer();
}

function getHorizontalWheelDelta(event: WheelEvent) {
  if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
    return event.deltaX;
  }

  return event.shiftKey ? event.deltaY : 0;
}

function onWheel(event: WheelEvent) {
  if (!props.scrollable || !scrollContainerRef.value || !isScrollableOverflow()) return;

  const deltaX = getHorizontalWheelDelta(event);

  if (!deltaX) return;

  event.preventDefault();
  scrollContainerRef.value.scrollLeft += deltaX;
}

onMounted(() => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.addEventListener("scroll", checkScroll, { passive: true });
    scrollContainerRef.value.addEventListener("wheel", onWheel, { passive: false });

    checkScroll();
  }
});

onUnmounted(() => {
  stopDragListeners();
  resetDragState();
  clearSuppressClickTimer();

  if (scrollContainerRef.value) {
    scrollContainerRef.value.removeEventListener("scroll", checkScroll);
    scrollContainerRef.value.removeEventListener("wheel", onWheel);
  }
});

provide("getUTabsSize", () => props.size);
provide("getUTabsBlock", () => props.block);
provide("getUTabsSquare", () => props.square);
provide("getUTabsScrollable", () => props.scrollable);
provide("getUTabsSelectedItem", () => selectedItem.value);
provide("setUTabsSelectedItem", (value: string) => (selectedItem.value = value));
provide("getUTabsPreventTabClick", () => preventTabClick.value);

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  tabsAttrs,
  dragAttrs,
  tabAttrs,
  prevAttrs,
  nextAttrs,
  nextButtonAttrs,
  prevButtonAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs">
    <div v-if="scrollable && showLeftArrow" v-bind="prevAttrs" @click="scrollPrev">
      <!--
        @slot Use it to add something instead of the "prev" button.
        @binding {string} icon-name
      -->
      <slot name="prev" :icon-name="config.defaults.prevIcon">
        <UButton :icon="config.defaults.prevIcon" v-bind="prevButtonAttrs" />
      </slot>
    </div>

    <div
      ref="scroll-container"
      v-bind="tabsAttrs"
      :class="isDragging && dragAttrs.class"
      :data-test="getDataTest()"
      @scroll="checkScroll"
      @pointerdown="onPointerDown"
      @click.capture="onClickCapture"
    >
      <!-- @slot Use it to add the UTab component. -->
      <slot>
        <UTab
          v-for="(item, index) in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          v-bind="tabAttrs"
          :data-test="getDataTest(`item-${index}`)"
        >
          <template #left="{ iconName, active }">
            <!--
              @slot Use it to add something before the tab label.
              @binding {object} item
              @binding {number} index
              @binding {boolean} active
              @binding {string} icon-name
            -->
            <slot name="left" :item="item" :index="index" :active="active" :icon-name="iconName" />
          </template>

          <template #label="{ label, iconName, active }">
            <!--
              @slot Use it to add something instead of the tab label.
              @binding {object} item
              @binding {number} index
              @binding {string} label
              @binding {boolean} active
              @binding {string} icon-name
            -->
            <slot
              name="label"
              :item="item"
              :index="index"
              :label="label"
              :active="active"
              :icon-name="iconName"
            >
              {{ label }}
            </slot>
          </template>

          <template #right="{ iconName, active }">
            <!--
              @slot Use it to add something after the tab label.
              @binding {object} item
              @binding {number} index
              @binding {boolean} active
              @binding {string} icon-name
            -->
            <slot name="right" :item="item" :index="index" :active="active" :icon-name="iconName" />
          </template>
        </UTab>
      </slot>
    </div>

    <div v-if="scrollable && showRightArrow" v-bind="nextAttrs" @click="scrollNext">
      <!--
        @slot Use it to add something instead of the "next" button.
        @binding {string} icon-name
      -->
      <slot name="next" :icon-name="config.defaults.nextIcon">
        <UButton :icon="config.defaults.nextIcon" v-bind="nextButtonAttrs" />
      </slot>
    </div>
  </div>
</template>
