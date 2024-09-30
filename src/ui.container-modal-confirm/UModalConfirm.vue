<template>
  <UModal
    v-model="isShownModal"
    :width="width"
    :title="title"
    no-divider
    mobile-bottom-align
    :data-test="dataTest"
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
          :label="confirmLabel || currentLocale.confirm"
          :color="confirmColor"
          :disabled="confirmDisabled"
          :data-test="`${dataTest}-accept`"
          v-bind="confirmButtonAttrs"
          @click="emitConfirmAction"
        />

        <UButton
          v-if="cancelButton"
          :label="currentLocale.cancel"
          variant="thirdary"
          color="gray"
          filled
          :data-test="`${dataTest}-close`"
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

import { getDefault } from "../utils/utilUI.js";

import UButton from "../ui.button/UButton.vue";
import UModal from "../ui.container-modal/UModal.vue";

import defaultConfig from "./config.js";
import { UModalConfirm } from "./constants.js";
import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Change modal state (shown / hidden).
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
   * Show cancel button.
   */
  cancelButton: {
    type: Boolean,
    default: getDefault(defaultConfig, UModalConfirm).cancelButton,
  },

  /**
   * Modal width.
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   */
  width: {
    type: String,
    default: getDefault(defaultConfig, UModalConfirm).width,
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
