<template>
  <transition v-bind="config.overlayTransition">
    <div v-if="isShownModal" v-bind="overlayAttrs" />
  </transition>

  <transition v-bind="config.wrapperTransition">
    <div
      v-if="isShownModal"
      :id="id"
      ref="wrapperRef"
      tabindex="0"
      :data-test="dataTest"
      v-bind="wrapperAttrs"
      @keydown.self.esc="onKeydownEsc"
    >
      <div v-bind="innerWrapperAttrs" @click.self="onClickOutside">
        <div v-bind="modalAttrs">
          <div v-if="isExistHeader" v-bind="headerAttrs">
            <div v-bind="headerLeftAttrs">
              <!-- @slot Use it to add something to the header left before. -->
              <slot name="header-left-before" />

              <!-- @slot Use it to add something to the header left. -->
              <slot name="header-left">
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
                      :name="config.defaults.backLinkIcon"
                      v-bind="backLinkIconAttrs"
                    />
                    {{ backRoute.title }}
                  </ULink>

                  <UHeader :label="title" v-bind="titleAttrs" />
                  <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
                </div>
              </slot>

              <!-- @slot Use it to add something to the header left after. -->
              <slot name="header-left-after" />
            </div>

            <div v-bind="headerRightAttrs">
              <!-- @slot Use it to add something to the header right. -->
              <slot name="header-right">
                <slot name="header-right" />
              </slot>
            </div>

            <div v-bind="closeIconAttrs">
              <!--
                @slot Use it to add something instead of the close button.
                @binding {string} icon-name
              -->
              <slot name="close-button" :icon-name="config.defaults.closeIcon">
                <UIcon
                  v-if="closeButton"
                  internal
                  interactive
                  :name="config.defaults.closeIcon"
                  :data-test="`${dataTest}-close`"
                  v-bind="closeIconAttrs"
                  @click="onClickCloseModal"
                />
              </slot>
            </div>
          </div>

          <div v-bind="bodyAttrs">
            <!-- @slot Use it to add something to the modal body. -->
            <slot />
          </div>

          <UDivider v-if="!isExistFooter || !noDivider" no-border v-bind="dividerSpacingAttrs" />

          <template v-if="isExistFooter">
            <UDivider
              v-if="!noDivider"
              variant="dark"
              no-bottom-padding
              no-top-padding
              v-bind="dividerAttrs"
            />

            <div v-bind="footerAttrs">
              <div v-if="hasSlotContent($slots['footer-left'])" v-bind="footerLeftAttrs">
                <!-- @slot Use it to add something to the footer left. -->
                <slot name="footer-left" />
              </div>

              <div v-if="hasSlotContent($slots['footer-right'])" v-bind="footerRightAttrs">
                <!-- @slot Use it to add something to the footer right. -->
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
import { computed, useSlots, watch, ref } from "vue";

import { getRandomId, getDefault } from "../service.ui";

import ULink from "../ui.button-link";
import UIcon from "../ui.image-icon";
import UHeader from "../ui.text-header";
import UDivider from "../ui.container-divider";

import defaultConfig from "./configs/default.config";
import { UModal } from "./constants/index";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UModal", inheritAttrs: false });
const slots = useSlots();

const wrapperRef = ref(null);

const props = defineProps({
  /**
   * Change modal state (hidden / shown).
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * Set modal title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Sets modal description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Set back link route.
   */
  backRoute: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Set width for modal.
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   */
  width: {
    type: String,
    default: getDefault(defaultConfig, UModal).width,
  },

  /**
   * Allow closing modal by clicking on overlay.
   */
  clickToClose: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).clickToClose,
  },

  /**
   * Allow closing modal by clicking on close icon.
   */
  closeButton: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).closeButton,
  },

  /**
   * Allow closing modal by pressing escape (esc) key.
   */
  escToClose: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).escToClose,
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
   * Reverse left and right footer blocks (mobile version only).
   */
  mobileFooterReverse: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).mobileFooterReverse,
  },

  /**
   * Attach small modal to the bottom of the screen (mobile version only).
   */
  mobileBottomAlign: {
    type: Boolean,
    default: getDefault(defaultConfig, UModal).mobileBottomAlign,
  },

  /**
   * Set component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
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
    document.getElementById(`${props.id}`).style.overflow = "hidden";
    document.body.style.overflow = "auto";
  }
}

function onClickBackLink() {
  emit("back");
}

function onClickOutside() {
  props.clickToClose && closeModal();
}

function onKeydownEsc() {
  props.escToClose && closeModal();
}

function onClickCloseModal() {
  props.closeButton && closeModal();
}

function closeModal() {
  isShownModal.value = false;
}
</script>
