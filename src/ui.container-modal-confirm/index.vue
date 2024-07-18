<template>
  <UModal
    v-model="isShownModal"
    :width="width"
    :title="title"
    no-divider
    mobile-bottom-align
    :data-cy="dataCy"
    v-bind="modalAttrs"
  >
    <template #header-left-before>
      <slot name="header-left-before" />
    </template>

    <template #header-left>
      <slot name="header-left" />
    </template>

    <template #header-left-after>
      <slot name="header-left-after" />
    </template>

    <template #header-right>
      <slot name="header-right" />
    </template>

    <template #default>
      <slot />
    </template>

    <template #footer-left>
      <slot v-if="hasSlotContent($slots['footer-left'])" name="footer-left" />

      <div v-else v-bind="footerLeftFallbackAttrs">
        <UButton
          :label="confirmLabel"
          :color="color"
          :disabled="confirmDisabled"
          :data-cy="`${dataCy}-accept`"
          v-bind="confirmButtonAttrs"
          @click="emitConfirmAction"
        />

        <UButton
          v-if="cancelButton"
          :label="currentLocale.cancel"
          variant="thirdary"
          filled
          :data-cy="`${dataCy}-close`"
          v-bind="cancelButtonAttrs"
          @click="onCloseModal"
        />
      </div>
    </template>

    <template #footer-right>
      <slot name="footer-right" />
    </template>
  </UModal>
</template>

<script setup>
import { computed } from "vue";
import { merge } from "lodash-es";

import UIService from "../service.ui";

import UButton from "../ui.button";
import UModal from "../ui.container-modal";

import defaultConfig from "./configs/default.config";
import { UModalConfirm } from "./constants/index";
import useAttrs from "./composable/attrs.composable";
import { useLocale } from "../composable.locale";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UModalConfirm", inheritAttrs: false });

const props = defineProps({
  /**
   * Change modal state (hidden / shown).
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * Set modal's title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Set confirm button label.
   */
  confirmLabel: {
    type: String,
    default: "",
  },

  /**
   * Set the disabled accept-button.
   */
  confirmDisabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UModalConfirm).default.confirmDisabled,
  },

  /**
   * Show cancel button.
   */
  cancelButton: {
    type: Boolean,
    default: UIService.get(defaultConfig, UModalConfirm).default.cancelButton,
  },

  /**
   * Buttons and modal title color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UModalConfirm).default.color,
  },

  /**
   * Set width for modal.
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   */
  width: {
    type: String,
    default: UIService.get(defaultConfig, UModalConfirm).default.width,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
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
   * Triggers when the modal is closed.
   */
  "close",
]);

const { tm } = useLocale();

const {
  hasSlotContent,
  footerLeftFallbackAttrs,
  modalAttrs,
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
