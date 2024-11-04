<template>
  <UModal
    :id="id"
    v-model="isShownModal"
    :size="size"
    :title="title"
    :description="description"
    :inner="inner"
    :close-on-esc="closeOnEsc"
    :close-on-cross="closeOnCross"
    :close-on-overlay="closeOnOverlay"
    :mobile-stick-bottom="mobileStickBottom"
    no-divider
    mobile-bottom-align
    :data-test="dataTest"
    v-bind="confirmModalAttrs"
  >
    <template #header-left>
      <!-- @slot Use it to add something to the left side of the header. -->
      <slot name="header-left" />
    </template>

    <template #before-title>
      <!-- @slot Use it to add something before the header title. -->
      <slot name="before-title" />
    </template>

    <template #after-title>
      <!-- @slot Use it to add something after the header title. -->
      <slot name="after-title" />
    </template>

    <template #header-right>
      <!-- @slot Use it to add something to the right side of the header. -->
      <slot name="header-right" />
    </template>

    <template #close-button="{ iconName }">
      <!--
        @slot Use it to add something instead of the close button.
        @binding {string} icon-name
      -->
      <slot name="close-button" :icon-name="iconName" />
    </template>

    <!-- @slot Use it to add something into the modal body. -->
    <slot />

    <template #footer-left>
      <!-- @slot Use it to add something to the left side of the footer. -->
      <slot v-if="hasSlotContent($slots['footer-left'])" name="footer-left" />

      <div v-else v-bind="footerLeftFallbackAttrs">
        <UButton
          :label="confirmLabel || currentLocale.confirm"
          :color="confirmColor"
          :disabled="confirmDisabled"
          v-bind="confirmButtonAttrs"
          :data-test="`${dataTest}-confirm`"
          @click="emitConfirmAction"
        />

        <UButton
          v-if="!cancelHidden"
          :label="currentLocale.cancel"
          variant="secondary"
          color="gray"
          v-bind="cancelButtonAttrs"
          :data-test="`${dataTest}-close`"
          @click="onCloseModal"
        />
      </div>
    </template>

    <template #footer-right>
      <!-- @slot Use it to add something to the right side of the footer. -->
      <slot name="footer-right" />
    </template>
  </UModal>
</template>

<script setup>
import { computed } from "vue";
import { merge } from "lodash-es";

import { getDefault } from "../utils/ui.ts";

import UButton from "../ui.button/UButton.vue";
import UModal from "../ui.container-modal/UModal.vue";

import defaultConfig from "./config.js";
import { UModalConfirm } from "./constants.js";
import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.ts";

defineOptions({ inheritAttrs: false });

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
   * Confirm button label.
   */
  confirmLabel: {
    type: String,
    default: "",
  },

  /**
   * Confirm button color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  confirmColor: {
    type: String,
    default: getDefault(defaultConfig, UModalConfirm).confirmColor,
  },

  /**
   * Set the disabled accept-button.
   */
  confirmDisabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).confirmDisabled,
  },

  /**
   * Hide cancel button.
   */
  cancelHidden: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).cancelHidden,
  },

  /**
   * Modal size (width).
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UModalConfirm).size,
  },

  /**
   * Allow closing modal by clicking on close cross.
   */
  closeOnCross: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).closeOnCross,
  },

  /**
   * Allow closing modal by clicking on overlay.
   */
  closeOnOverlay: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).closeOnOverlay,
  },

  /**
   * Allow closing modal by pressing escape (esc) on the keyboard.
   */
  closeOnEsc: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).closeOnEsc,
  },

  /**
   * Add extra top margin for modal inside another modal.
   */
  inner: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).inner,
  },

  /**
   * Attach small modal to the bottom of the screen (mobile version only).
   */
  mobileStickBottom: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).mobileStickBottom,
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
   * Data-test attribute for automated testing.
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
   * Triggers when the action is confirmed.
   */
  "confirm",

  /**
   * Triggers when the action is declined or modal is closed.
   */
  "close",
]);

const { tm } = useLocale();

const {
  hasSlotContent,
  footerLeftFallbackAttrs,
  confirmModalAttrs,
  confirmButtonAttrs,
  cancelButtonAttrs,
} = useAttrs(props);

const isShownModal = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const i18nGlobal = tm(UModalConfirm);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

function closeModal() {
  isShownModal.value = false;
}

function onCloseModal() {
  emit("close");
  closeModal();
}

function emitConfirmAction() {
  emit("confirm");
  closeModal();
}
</script>
