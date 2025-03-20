<script setup lang="ts">
import { computed, useSlots, watch, ref, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

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

watch(() => isShownModal.value, preventOverlayFromScrolling);

function preventOverlayFromScrolling(newValue: boolean) {
  // focus wrapper to be able to close modal on esc
  setTimeout(() => wrapperRef.value?.focus(), 0);

  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    const element = document.getElementById(`${elementId}`);

    if (element) {
      element.style.overflow = "hidden";
    }

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
  headerLeftAttrs,
  headerLeftFallbackAttrs,
  descriptionAttrs,
  bodyAttrs,
  footerLeftAttrs,
  footerAttrs,
  footerRightAttrs,
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
      ref="wrapperRef"
      tabindex="0"
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

            <div v-if="closeOnCross" v-bind="closeIconAttrs">
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
                  @click="onClickCloseModal"
                />
              </slot>
            </div>
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
