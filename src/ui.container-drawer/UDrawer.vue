<script setup lang="ts">
import { computed, useSlots, watch, useId, useTemplateRef, nextTick, ref } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { hasSlotContent } from "../utils/helper";

import UHeader from "../ui.text-header/UHeader.vue";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: false,
});

const emit = defineEmits([
  /**
   * Triggers when the drawer is toggled.
   * @property {Boolean} value
   */
  "update:modelValue",

  /**
   * Triggers when the drawer is closed.
   */
  "close",
]);

const elementId = props.id || useId();

const slots = useSlots();

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const drawerRef = useTemplateRef<HTMLDivElement>("drawer");

const isDragging = ref(false);
const dragStartPosition = ref({ x: 0, y: 0 });
const dragCurrentPosition = ref({ x: 0, y: 0 });
const minDragDistance = 10;

const isShownDrawer = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isExistHeader = computed(() => {
  return (
    props.title ||
    hasSlotContent(slots["before-title"]) ||
    hasSlotContent(slots["title"]) ||
    hasSlotContent(slots["after-title"]) ||
    hasSlotContent(slots["actions"])
  );
});

const isExistFooter = computed(() => {
  return hasSlotContent(slots["footer-left"]) || hasSlotContent(slots["footer-right"]);
});

const dragThreshold = computed(() => {
  if (!drawerRef.value) return 0;

  const rect = drawerRef.value.getBoundingClientRect();

  const dragThresholdMap = {
    top: rect.height / 2,
    bottom: rect.height / 2,
    left: rect.width / 2,
    right: rect.width / 2,
  };

  return dragThresholdMap[props.position] || 0;
});

const dragDistance = computed(() => {
  if (!isDragging.value) return 0;

  const deltaX = dragCurrentPosition.value.x - dragStartPosition.value.x;
  const deltaY = dragCurrentPosition.value.y - dragStartPosition.value.y;

  const totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (totalDistance < minDragDistance) return 0;

  const dragDistanceMap = {
    top: Math.min(0, deltaY),
    bottom: Math.max(0, deltaY),
    left: Math.min(0, deltaX),
    right: Math.max(0, deltaX),
  };

  return dragDistanceMap[props.position] || 0;
});

const shouldCloseDrawer = computed(() => {
  return Math.abs(dragDistance.value) > dragThreshold.value;
});

const dragTransform = computed(() => {
  if (!isDragging.value) return "";

  const distance = dragDistance.value;

  const dragTransformMap = {
    top: `translateY(${distance}px)`,
    bottom: `translateY(${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(${distance}px)`,
  };

  return dragTransformMap[props.position] || "";
});

function getFocusableElements() {
  if (!wrapperRef.value) return [];

  return Array.from(
    wrapperRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  );
}

function trapFocus(e: KeyboardEvent) {
  if (e.key !== "Tab") return;

  const focusableElements = getFocusableElements();

  if (!focusableElements.length) return;

  const firstElement = focusableElements.at(0) as HTMLElement;
  const lastElement = focusableElements.at(-1) as HTMLElement;

  // Shift+Tab - if focused on first element, move to last
  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault();
    lastElement.focus();

    return;
  }

  // Tab - if focused on last element, move to first
  if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault();
    firstElement.focus();
  }
}

watch(isShownDrawer, (newValue) => {
  onChangeShownDrawer(newValue);

  if (!newValue) emit("close");
});

function onChangeShownDrawer(newValue: boolean) {
  toggleEventListeners();

  if (newValue) {
    nextTick(() => wrapperRef.value?.focus());
  }
}

function toggleEventListeners() {
  if (isShownDrawer.value) {
    document.addEventListener("keydown", trapFocus);
    document.addEventListener("keydown", onKeydownEsc);
  } else {
    document.removeEventListener("keydown", trapFocus);
    document.removeEventListener("keydown", onKeydownEsc);
  }
}

function onClickOutside() {
  props.closeOnOverlay && closeDrawer();
}

function onKeydownEsc(e: KeyboardEvent) {
  if (e.key !== "Escape" || !props.closeOnEsc) return;

  closeDrawer();
}

function closeDrawer() {
  isShownDrawer.value = false;

  emit("close");
}

function onDragStart(e: MouseEvent | TouchEvent) {
  e.preventDefault();

  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

  dragStartPosition.value = { x: clientX, y: clientY };
  dragCurrentPosition.value = { x: clientX, y: clientY };

  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener("touchmove", onDragMove, { passive: false });
  document.addEventListener("touchend", onDragEnd);
}

function onDragMove(e: MouseEvent | TouchEvent) {
  e.preventDefault();

  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

  dragCurrentPosition.value = { x: clientX, y: clientY };

  const deltaX = clientX - dragStartPosition.value.x;
  const deltaY = clientY - dragStartPosition.value.y;
  const totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (totalDistance >= minDragDistance) {
    isDragging.value = true;
  }
}

function onDragEnd() {
  document.removeEventListener("mousemove", onDragMove);
  document.removeEventListener("mouseup", onDragEnd);
  document.removeEventListener("touchmove", onDragMove);
  document.removeEventListener("touchend", onDragEnd);

  if (isDragging.value && shouldCloseDrawer.value) {
    closeDrawer();
  }

  isDragging.value = false;
  dragStartPosition.value = { x: 0, y: 0 };
  dragCurrentPosition.value = { x: 0, y: 0 };
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

const wrapperTransition = computed(() => {
  const transitionMap = {
    top: config.value.wrapperTransitionTop,
    bottom: config.value.wrapperTransitionBottom,
    left: config.value.wrapperTransitionLeft,
    right: config.value.wrapperTransitionRight,
  };

  return transitionMap[props.position];
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */

const {
  getDataTest,
  config,
  handleAttrs,
  handleWrapperAttrs,
  drawerAttrs,
  drawerWrapperAttrs,
  titleAttrs,
  overlayAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  headerAttrs,
  descriptionAttrs,
  bodyAttrs,
  footerLeftAttrs,
  footerAttrs,
  footerRightAttrs,
  beforeTitleAttrs,
  titleFallbackAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <Transition v-bind="config.overlayTransition">
    <div v-if="isShownDrawer" v-bind="overlayAttrs" />
  </Transition>

  <Transition v-bind="wrapperTransition">
    <div
      v-if="isShownDrawer"
      :id="elementId"
      ref="wrapper"
      tabindex="0"
      v-bind="wrapperAttrs"
      :data-test="getDataTest()"
      @keydown.self.esc="onKeydownEsc"
    >
      <div v-bind="innerWrapperAttrs" @click.self="onClickOutside">
        <div
          ref="drawer"
          :style="{ transform: dragTransform }"
          v-bind="drawerWrapperAttrs"
          @mousedown="onDragStart"
          @touchstart="onDragStart"
        >
          <div v-bind="drawerAttrs">
            <div v-if="isExistHeader" v-bind="headerAttrs">
              <div v-bind="beforeTitleAttrs">
                <!-- @slot Use it to add something before the header title. -->
                <slot name="before-title" />
                <!--
                  @slot Use it to add something to the left side of the header.
                  @binding {string} title
                -->
                <slot name="title" :title="title">
                  <div v-bind="titleFallbackAttrs">
                    <UHeader :label="title" size="sm" v-bind="titleAttrs" />
                    <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
                  </div>
                </slot>
                <!-- @slot Use it to add something after the header title. -->
                <slot name="after-title" />
              </div>

              <!--
                @slot Use it to add something instead of the close button.
                @binding {function} close
              -->
              <slot name="actions" :close="closeDrawer" />
            </div>

            <div v-bind="bodyAttrs">
              <!-- @slot Use it to add something into the drawer body. -->
              <slot />
            </div>

            <div v-if="isExistFooter" v-bind="footerAttrs">
              <div v-if="hasSlotContent($slots['footer-left'])" v-bind="footerLeftAttrs">
                <!-- @slot Use it to add something to the left side of the footer. -->
                <slot name="footer-left" />
              </div>

              <div v-if="hasSlotContent($slots['footer-right'])" v-bind="footerRightAttrs">
                <!-- @slot Use it to add something to the right side of the footer. -->
                <slot name="footer-right" />
              </div>
            </div>
          </div>

          <div v-if="handle" v-bind="handleWrapperAttrs">
            <!-- @slot Use it to add something instead of the default handle. -->
            <slot name="handle">
              <div v-bind="handleAttrs" />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
