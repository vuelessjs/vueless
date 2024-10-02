<template>
  <transition v-bind="config.overlayTransition">
    <div v-if="isShownModal" v-bind="overlayAttrs" />
  </transition>

  <transition v-bind="config.wrapperTransition">
    <div
      v-if="isShownModal"
      :id="elementId"
      ref="wrapperRef"
      tabindex="0"
      v-bind="wrapperAttrs"
      :data-test="dataTest"
      @keydown.self.esc="onKeydownEsc"
    >
      <div v-bind="innerWrapperAttrs" @click.self="onClickOutside">
        <div v-bind="modalAttrs">
          <div v-if="isExistHeader" v-bind="headerAttrs">
            <div v-bind="headerLeftAttrs">
              <!-- @slot Use it to add something to the left side of the header. -->
              <slot name="header-left">
                <!-- @slot Use it to add something before the header title. -->
                <slot name="before-title" />

                <div v-bind="headerLeftFallbackAttrs">
                  <ULink
                    v-if="isShownArrowButton"
                    size="sm"
                    color="gray"
                    :to="backRoute"
                    v-bind="backLinkAttrs"
                    @click="onClickBackLink"
                  >
                    <UIcon
                      internal
                      size="xs"
                      color="gray"
                      :name="config.defaults.backIcon"
                      v-bind="backLinkIconAttrs"
                    />
                    {{ backRoute.title }}
                  </ULink>

                  <UHeader :label="title" size="sm" v-bind="titleAttrs" />
                  <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
                </div>

                <!-- @slot Use it to add something after the header title. -->
                <slot name="after-title" />
              </slot>
            </div>

            <div v-bind="headerRightAttrs">
              <!-- @slot Use it to add something to the right side of the header. -->
              <slot name="header-right" />
            </div>

            <div v-bind="closeIconAttrs">
              <!--
                @slot Use it to add something instead of the close button.
                @binding {string} icon-name
              -->
              <slot name="close-button" :icon-name="config.defaults.closeIcon">
                <UIcon
                  v-if="closeOnCross"
                  internal
                  interactive
                  size="sm"
                  :name="config.defaults.closeIcon"
                  v-bind="closeIconAttrs"
                  :data-test="`${dataTest}-close`"
                  @click="onClickCloseModal"
                />
              </slot>
            </div>
          </div>

          <div v-bind="bodyAttrs">
            <!-- @slot Use it to add something into the modal body. -->
            <slot />
          </div>

          <UDivider v-if="!isExistFooter || !noDivider" no-border v-bind="dividerSpacingAttrs" />

          <template v-if="isExistFooter">
            <UDivider v-if="!noDivider" variant="dark" padding="none" v-bind="dividerAttrs" />

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
  </transition>
</template>

<script setup>
import { computed, useSlots, watch, ref, useId } from "vue";

import { getDefault } from "../utils/utilUI.js";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import defaultConfig from "./config.js";
import { UModal } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });
const slots = useSlots();

const wrapperRef = ref(null);

const props = defineProps({
  /**
   * Set modal state (hidden / shown).
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * Modal title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Modal description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Modal size (width).
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UModal).size,
  },

  /**
   * Back link route.
   */
  backRoute: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Allow closing modal by clicking on close cross.
   */
  closeOnCross: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).closeOnCross,
  },

  /**
   * Allow closing modal by clicking on overlay.
   */
  closeOnOverlay: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).closeOnOverlay,
  },

  /**
   * Allow closing modal by pressing escape (esc) on the keyboard.
   */
  closeOnEsc: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).closeOnEsc,
  },

  /**
   * Add extra top margin for modal inside another modal.
   */
  inner: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).inner,
  },

  /**
   * Hide divider between content end footer.
   */
  noDivider: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).noDivider,
  },

  /**
   * Attach small modal to the bottom of the screen (mobile version only).
   */
  mobileStickBottom: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).mobileStickBottom,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Component config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Set data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when the modal is toggled.
   * @property {Boolean} value
   */
  "update:modelValue",

  /**
   * Triggers when back link in modal is clicked.
   */
  "back",
]);

const elementId = props.id || useId();

const {
  config,
  modalAttrs,
  titleAttrs,
  backLinkAttrs,
  backLinkIconAttrs,
  closeIconAttrs,
  dividerAttrs,
  dividerSpacingAttrs,
  overlayAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  headerAttrs,
  headerLeftAttrs,
  headerLeftFallbackAttrs,
  descriptionAttrs,
  headerRightAttrs,
  bodyAttrs,
  footerLeftAttrs,
  footerAttrs,
  footerRightAttrs,
  hasSlotContent,
} = useAttrs(props);

const isShownModal = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isShownArrowButton = computed(() => {
  return !!Object.keys(props.backRoute).length;
});

const isExistHeader = computed(() => {
  return (
    hasSlotContent(slots["header-left"]) ||
    hasSlotContent(slots["header-left-before"]) ||
    hasSlotContent(slots["header-left-after"]) ||
    hasSlotContent(slots["header-right"]) ||
    props.title
  );
});

const isExistFooter = computed(() => {
  return hasSlotContent(slots["footer-left"]) || hasSlotContent(slots["footer-right"]);
});

watch(() => isShownModal.value, preventOverlayFromScrolling);

function preventOverlayFromScrolling(newValue) {
  // focus wrapper to be able to close modal on esc
  setTimeout(() => wrapperRef.value?.focus(), 0);

  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    document.getElementById(`${elementId}`).style.overflow = "hidden";
    document.body.style.overflow = "auto";
  }
}

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
</script>
