<script setup lang="ts">
import { computed, useSlots, watch, ref, useId } from "vue";

import { getDefault } from "../utils/ui.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import defaultConfig from "./config.ts";
import { UModal } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { UModalProps } from "./types.ts";

defineOptions({ inheritAttrs: false });
const slots = useSlots();

const wrapperRef = ref(null);

const props = withDefaults(defineProps<UModalProps>(), {
  size: getDefault<UModalProps>(defaultConfig, UModal).size,
  closeOnCross: getDefault<UModalProps>(defaultConfig, UModal).closeOnCross,
  closeOnOverlay: getDefault<UModalProps>(defaultConfig, UModal).closeOnOverlay,
  closeOnEsc: getDefault<UModalProps>(defaultConfig, UModal).closeOnEsc,
  inner: getDefault<UModalProps>(defaultConfig, UModal).inner,
  noDivider: getDefault<UModalProps>(defaultConfig, UModal).noDivider,
  mobileStickBottom: getDefault<UModalProps>(defaultConfig, UModal).mobileStickBottom,
  dataTest: "",
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
  return Object.keys(props.backTo || {}).length > 0;
});

const isExistHeader = computed(() => {
  return (
    props.title ||
    hasSlotContent(slots["header-left"]) ||
    hasSlotContent(slots["before-title"]) ||
    hasSlotContent(slots["after-title"]) ||
    hasSlotContent(slots["header-right"])
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
                    :to="backTo"
                    :label="backLabel"
                    v-bind="backLinkAttrs"
                    @click="onClickBackLink"
                  >
                    <template #left>
                      <UIcon
                        internal
                        size="xs"
                        color="gray"
                        :name="config.defaults.backIcon"
                        v-bind="backLinkIconAttrs"
                      />
                    </template>
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

            <div v-if="closeOnCross" v-bind="closeIconAttrs">
              <!--
                @slot Use it to add something instead of the close button.
                @binding {string} icon-name
              -->
              <slot name="close-button" :icon-name="config.defaults.closeIcon">
                <UIcon
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
