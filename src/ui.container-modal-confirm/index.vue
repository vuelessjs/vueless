<template>
  <UModal
    v-model="isShownModal"
    :title="title"
    :width="width"
    :data-cy="dataCy"
    :color="color"
    no-divider
    mobile-bottom-align
    class="mono-confirm-modal"
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
      <div class="flex space-x-4">
        <UButton
          class="w-full"
          :disabled="disableAcceptButton"
          :text="actionButtonText"
          :color="color"
          :data-cy="`${dataCy}-accept`"
          @click="emitConfirmAction"
        />

        <UButton
          v-if="shownCancelButton"
          class="w-full"
          :color="color"
          variant="secondary"
          :text="i18n.cancel"
          :data-cy="`${dataCy}-close`"
          @click="onCloseModal"
        />
      </div>
    </template>
  </UModal>
</template>

<script>
import UButton from "vueless/ui.button";
import UModal from "vueless/ui.container-modal";
import I18nServiceDefault from "vueless/service.i18n";

export default {
  name: "UModalConfirm",

  components: {
    UButton,
    UModal,
  },

  props: {
    /**
     * Show cancel button.
     */
    shownCancelButton: {
      type: Boolean,
      default: true,
    },

    /**
     * Set the disabled accept-button.
     */
    disableAcceptButton: {
      type: Boolean,
      default: false,
    },

    /**
     * Set action button text.
     */
    actionButtonText: {
      type: String,
      default: "",
    },

    /**
     * Set width for modal.
     * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
     */
    width: {
      type: String,
      default: "sm",
    },

    /**
     * Set modal's title.
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Change modal state (hidden / shown).
     */
    modelValue: {
      type: Boolean,
      default: false,
    },

    /**
     * The color of the button and modal title.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia
     */
    color: {
      type: String,
      default: "",
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "actionConfirmed", "close"],

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  computed: {
    isShownModal: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    i18n() {
      return { cancel: this.getTranslation("cancel") };
    },
  },

  methods: {
    closeModal() {
      this.isShownModal = false;
    },

    onCloseModal() {
      this.$emit("close");
      this.closeModal();
    },

    emitConfirmAction() {
      this.$emit("actionConfirmed");
      this.closeModal();
    },
  },
};
</script>

<i18n>
en:
  cancel: "Cancel"
ru:
  cancel: "Отмена"
ua:
  cancel: "Відміна"
</i18n>
