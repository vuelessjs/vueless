<script setup lang="ts">
import { computed, useSlots, watch, useId, nextTick, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";
import UButton from "../ui.button/UButton.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: false,
  backTo: "",
  backLabel: "",
});

const emit = defineEmits([
  /**
   * Triggers when the modal is toggled.
   * @property {Boolean} value
   */
  "update:modelValue",

  /**
   * Triggers when a back link is clicked.
   */
  "back",

  /**
   * Triggers when the modal is closed.
   */
  "close",
]);

const elementId = props.id || useId();

const slots = useSlots();

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const isShownModal = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isShownArrowButton = computed(() => {
  return Object.keys(props.backTo || {}).length > 0;
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

watch(
  () => isShownModal.value,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", trapFocus);
      document.addEventListener("keydown", onKeydownEsc);

      // Focus first focusable element after a short delay to ensure modal is rendered
      nextTick(() => {
        const focusableElements = getFocusableElements();

        if (focusableElements.length) {
          (focusableElements.at(0) as HTMLElement).focus();
        } else {
          wrapperRef.value?.focus();
        }
      });
    } else {
      const element = document.getElementById(`${elementId}`);

      if (element) {
        element.style.overflow = "hidden";
      }

      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", trapFocus);
      document.removeEventListener("keydown", onKeydownEsc);
    }
  },
);

function onClickBackLink() {
  emit("back");
}

function onClickOutside() {
  props.closeOnOverlay && closeModal();
}

function onKeydownEsc(e: KeyboardEvent) {
  if (e.key !== "Escape" || !props.closeOnEsc) return;

  closeModal();
}

function onClickCloseModal() {
  props.closeOnCross && closeModal();
}

function closeModal() {
  isShownModal.value = false;

  emit("close");
}

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
  modalAttrs,
  titleAttrs,
  backLinkWrapperAttrs,
  backLinkAttrs,
  backLinkIconAttrs,
  closeIconAttrs,
  overlayAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  headerAttrs,
  descriptionAttrs,
  bodyAttrs,
  footerLeftAttrs,
  footerAttrs,
  footerRightAttrs,
  closeButtonAttrs,
  beforeTitleAttrs,
  titleFallbackAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <Transition v-bind="config.overlayTransition">
    <div v-if="isShownModal" v-bind="overlayAttrs" />
  </Transition>

  <Transition v-bind="config.wrapperTransition">
    <div
      v-if="isShownModal"
      :id="elementId"
      ref="wrapper"
      tabindex="0"
      v-bind="wrapperAttrs"
      :data-test="getDataTest()"
      @keydown.self.esc="onKeydownEsc"
    >
      <div v-bind="innerWrapperAttrs" @click.self="onClickOutside">
        <div v-bind="modalAttrs">
          <div v-if="isExistHeader" v-bind="headerAttrs">
            <div v-bind="beforeTitleAttrs">
              <!-- @slot Use it to add something before the header title. -->
              <slot name="before-title" />
              <!-- @slot Use it to add something to the left side of the header. -->
              <slot name="title">
                <div v-bind="titleFallbackAttrs">
                  <div v-if="isShownArrowButton" v-bind="backLinkWrapperAttrs">
                    <UIcon
                      internal
                      size="2xs"
                      color="neutral"
                      :name="config.defaults.backIcon"
                      v-bind="backLinkIconAttrs"
                    />

                    <ULink
                      size="sm"
                      color="neutral"
                      :to="backTo"
                      :label="backLabel"
                      v-bind="backLinkAttrs"
                      @click="onClickBackLink"
                    />
                  </div>

                  <UHeader :label="title" size="sm" v-bind="titleAttrs" />
                  <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
                </div>
              </slot>
              <!-- @slot Use it to add something after the header title. -->
              <slot name="after-title" />
            </div>

            <UButton
              v-if="closeOnCross"
              size="2xs"
              square
              color="grayscale"
              variant="ghost"
              v-bind="closeButtonAttrs"
              @click="onClickCloseModal"
            >
              <!--
                @slot Use it to add something instead of the close button.
                @binding {string} icon-name
                @binding {function} close
              -->
              <slot name="actions" :icon-name="config.defaults.closeIcon" :close="closeModal">
                <UIcon
                  internal
                  interactive
                  size="sm"
                  color="grayscale"
                  :name="config.defaults.closeIcon"
                  v-bind="closeIconAttrs"
                  :data-test="getDataTest('close')"
                />
              </slot>
            </UButton>
          </div>

          <div v-bind="bodyAttrs">
            <!-- @slot Use it to add something into the modal body. -->
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
      </div>
    </div>
  </Transition>
</template>
