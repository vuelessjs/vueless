<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import UButton from "../ui.button/UButton.vue";
import UModal from "../ui.container-modal/UModal.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";
import { useLocale } from "../composables/useLocale.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: false,
  confirmLabel: "",
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

const { tm, locale } = useLocale();

const confirmModalRef = useTemplateRef<InstanceType<typeof UModal>>("confirmModal");

const modal = computed(() => {
  return confirmModalRef.value?.wrapperRef || null;
});

const isShownModal = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const i18nGlobal = ref(tm(COMPONENT_NAME));

watch(locale, () => {
  i18nGlobal.value = tm(COMPONENT_NAME);
});

const currentLocale = computed(() =>
  merge({}, defaultConfig.i18n, i18nGlobal.value, props?.config?.i18n),
);

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

defineExpose({
  /**
   * A reference to the UModal's wrapper element for direct DOM manipulation.
   * @property {InstanceType<typeof UModal>}
   */
  modal,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  footerLeftFallbackAttrs,
  confirmModalAttrs,
  confirmButtonAttrs,
  cancelButtonAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <UModal
    :id="id"
    ref="confirmModal"
    v-model="isShownModal"
    :size="size"
    :title="title"
    :description="description"
    :inner="inner"
    :variant="variant"
    :close-on-esc="closeOnEsc"
    :close-on-cross="closeOnCross"
    :close-on-overlay="closeOnOverlay"
    :divided="divided"
    mobile-bottom-align
    v-bind="confirmModalAttrs"
    :data-test="getDataTest()"
    @close="onCloseModal"
  >
    <template #before-title>
      <!-- @slot Use it to add something before the header title. -->
      <slot name="before-title" />
    </template>

    <template #title>
      <!-- @slot Use it to add something to the left side of the header. -->
      <slot name="title" />
    </template>

    <template #after-title>
      <!-- @slot Use it to add something after the header title. -->
      <slot name="after-title" />
    </template>

    <template #actions="{ iconName, close }">
      <!--
        @slot Use it to add something instead of the close button.
        @binding {string} icon-name
        @binding {function} close
      -->
      <slot name="actions" :icon-name="iconName" :close="close" />
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
          :data-test="getDataTest('confirm')"
          @click="emitConfirmAction"
        />

        <UButton
          v-if="!cancelHidden"
          :label="currentLocale.cancel"
          variant="subtle"
          color="neutral"
          v-bind="cancelButtonAttrs"
          :data-test="getDataTest('close')"
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
