<script setup lang="ts">
import { computed } from "vue";
import { merge } from "lodash-es";

import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import UButton from "../ui.button/UButton.vue";
import UModal from "../ui.container-modal/UModal.vue";

import defaultConfig from "./config.ts";
import { UModalConfirm } from "./constants.ts";
import useAttrs from "./useAttrs.ts";
import { useLocale } from "../composables/useLocale.ts";

import type { UModalConfirmProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UModalConfirmProps>(), {
  ...getDefaults<UModalConfirmProps>(defaultConfig, UModalConfirm),
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

const { footerLeftFallbackAttrs, confirmModalAttrs, confirmButtonAttrs, cancelButtonAttrs } =
  useAttrs(props);

const isShownModal = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const i18nGlobal = tm(UModalConfirm);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props?.config?.i18n));

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
    v-bind="confirmModalAttrs"
    :data-test="dataTest"
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
