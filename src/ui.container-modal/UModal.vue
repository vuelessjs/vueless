<script setup lang="ts">
import { computed, useSlots, watch, ref, useId, nextTick } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";
import UDivider from "../ui.container-divider/UDivider.vue";
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
]);

const elementId = props.id || useId();

const slots = useSlots();

const wrapperRef = ref<HTMLElement | null>(null);

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
    }
  },
);

function onClickBackLink() {
  emit("back");
}

function onClickOutside() {
  props.closeOnOverlay && closeModal();
}

function onKeydownEsc() {
  props.closeOnEsc && closeModal();
}

function onClickCloseModal() {
  props.closeOnCross && closeModal();
}

function closeModal() {
  isShownModal.value = false;
}

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
  modalDividerAttrs,
  overlayAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  headerAttrs,
  headerLeftAttrs,
  headerLeftFallbackAttrs,
  descriptionAttrs,
  bodyAttrs,
  footerLeftAttrs,
  footerAttrs,
  footerRightAttrs,
  closeButtonAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div>
    <Transition v-bind="config.overlayTransition">
      <div v-if="isShownModal" v-bind="overlayAttrs" />
    </Transition>

    <Transition v-bind="config.wrapperTransition">
      <div
        v-if="isShownModal"
        :id="elementId"
        ref="wrapperRef"
        tabindex="0"
        role="dialog"
        aria-modal="true"
        v-bind="wrapperAttrs"
        :data-test="getDataTest()"
        @keydown.self.esc="onKeydownEsc"
      >
        <div v-bind="innerWrapperAttrs" @click.self="onClickOutside">
          <div v-bind="modalAttrs">
            <div v-if="isExistHeader" v-bind="headerAttrs">
              <div v-bind="headerLeftAttrs">
                <!-- @slot Use it to add something before the header title. -->
                <slot name="before-title" />
                <!-- @slot Use it to add something to the left side of the header. -->
                <slot name="title">
                  <div v-bind="headerLeftFallbackAttrs">
                    <div v-if="isShownArrowButton" v-bind="backLinkWrapperAttrs">
                      <UIcon
                        internal
                        size="2xs"
                        color="gray"
                        :name="config.defaults.backIcon"
                        v-bind="backLinkIconAttrs"
                      />

                      <ULink
                        size="sm"
                        color="gray"
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
                variant="thirdary"
                size="2xs"
                square
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

            <UDivider
              v-if="divider || !isExistFooter"
              :border="divider && isExistFooter"
              variant="dark"
              padding="before"
              v-bind="modalDividerAttrs"
            />

            <template v-if="isExistFooter">
              <div v-bind="footerAttrs">
                <div v-if="hasSlotContent($slots['footer-left'])" v-bind="footerLeftAttrs">
                  <!-- @slot Use it to add something to the left side of the footer. -->
                  <slot name="footer-left" />
                </div>

                <div v-if="hasSlotContent($slots['footer-right'])" v-bind="footerRightAttrs">
                  <!-- @slot Use it to add something to the right side of the footer. -->
                  <slot name="footer-right" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
