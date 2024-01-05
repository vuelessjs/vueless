<template>
  <t-modal
    ref="pageModal"
    v-model="isShownModal"
    :classes="modalClasses"
    :class="[ourModalClasses, modalWidthClass]"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    :disable-body-scroll="disableBodyScroll"
    :data-cy="dataCy"
    hide-close-button
    @closed="onCloseModal"
  >
    <div class="mono-modal">
      <div class="mono-modal-header">
        <div class="mono-modal-header-left-wrapper">
          <!-- @slot Use it to add something to the header left before. -->
          <slot name="header-left-before" />

          <!-- @slot Use it to add something to the header left. -->
          <slot name="header-left">
            <ArrowLink
              v-if="isShownArrowButton"
              :back-route="backRoute"
              :data-cy="`${dataCy}-back`"
              @click="onClickBack"
            />

            <div>
              <UHeader size="md" :color="color" :text="title" />
              <div v-if="description" class="mono-modal-header-subtitle">
                {{ description }}
              </div>
            </div>
          </slot>

          <!-- @slot Use it to add something to the header left after. -->
          <slot name="header-left-after" />
        </div>

        <!-- @slot Use it to add something to the header right. -->
        <slot name="header-right">
          <UIcon
            v-if="showCloseIcon"
            name="close"
            class="icon"
            :data-cy="`${dataCy}-close`"
            @click="onCloseModal"
          />
        </slot>
      </div>

      <div class="mono-modal-body">
        <!-- @slot Use it to add something to the modal body. -->
        <slot />
      </div>
    </div>

    <UDivider v-if="!noDivider" no-border />

    <template v-if="isExistFooter" #footer>
      <UDivider v-if="!noDivider" variant="dark" no-bottom-padding no-top-padding />

      <div class="mono-modal-footer" :class="reverseFooterClass">
        <div v-if="isExistSlot('footer-left')" class="mono-modal-footer-left">
          <!-- @slot Use it to add something to the footer left. -->
          <slot name="footer-left" />
        </div>

        <div v-if="isExistSlot('footer-right')" class="mono-modal-footer-right">
          <!-- @slot Use it to add something to the footer right. -->
          <slot name="footer-right" />
        </div>
      </div>
    </template>
  </t-modal>
</template>

<script>
import { mapGetters } from "vuex";

import ArrowLink from "./components/ArrowLink.vue";
import TModal from "vueless/library.vue-tailwind-3/t-modal";
import UIcon from "vueless/ui.image-icon";
import UHeader from "vueless/ui.text-header";
import UDivider from "vueless/ui.container-divider";

export default {
  name: "UModal",

  components: {
    ArrowLink,
    TModal,
    UIcon,
    UHeader,
    UDivider,
  },

  props: {
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
     * Sets page description.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * Set back route params (name, title, params).
     */
    backRoute: {
      type: Object,
      default: () => ({}),
    },

    /**
     * Make active click for close.
     */
    clickToClose: {
      type: Boolean,
      default: true,
    },

    /**
     * Make close icon active.
     */
    showCloseIcon: {
      type: Boolean,
      default: true,
    },

    /**
     * Make active ESC for close.
     */
    escToClose: {
      type: Boolean,
      default: true,
    },

    /**
     * Change modal state (hidden / shown).
     */
    modelValue: {
      type: Boolean,
      default: false,
    },

    /**
     * The color of the title.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia
     */
    color: {
      type: String,
      default: "",
    },

    /**
     * Add extra top margin for modal inside modal.
     */
    inner: {
      type: Boolean,
      default: false,
    },

    /**
     * Removes divider between end of content end footer.
     */
    noDivider: {
      type: Boolean,
      default: false,
    },

    /**
     * Reverse left and right footer blocks (in a mobile version only).
     */
    mobileFooterReverse: {
      type: Boolean,
      default: false,
    },

    /**
     * Attach small modal to the bottom of the screen (nice for confirm modal).
     */
    mobileBottomAlign: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["clickBack", "update:modelValue"],

  computed: {
    ...mapGetters("breakpoint", ["isMobileDevice"]),

    disableBodyScroll() {
      return !this.isMobileDevice;
    },

    ourModalClasses() {
      const inner = this.inner ? "mono-modal-inner" : "";

      return [inner];
    },

    modalWidthClass() {
      return {
        "mono-modal-size-xs": this.width === "xs", // 400px
        "mono-modal-size-sm": this.width === "sm", //   500px
        "mono-modal-size-md": this.width === "md", //   600px
        "mono-modal-size-lg": this.width === "lg", //   700px
        "mono-modal-size-xl": this.width === "xl", //   800px
        "mono-modal-size-2xl": this.width === "2xl", // 900px
        "mono-modal-size-3xl": this.width === "3xl", // 1000px
        "mono-modal-size-4xl": this.width === "4xl", // 1100px
        "mono-modal-size-5xl": this.width === "5xl", // 1200px
      };
    },

    modalClasses() {
      return {
        overlay: "!mt-0 z-50 bg-gray-900 bg-opacity-75 outline-none bottom-10",
        wrapper: `flex md:justify-start flex-col z-50 mx-3 md:py-12 mono-modal-wrapper
          ${this.mobileBottomAlign ? "h-full justify-end" : "justify-start"}`,
        modal: `t-modal bg-white shadow rounded-t-2xl md:rounded-2xl p-0 pb-safe-bottom mt-safe-top`,
        footer: "rounded-b-2xl",
        overlayEnterClass: "opacity-0",
        overlayEnterActiveClass: "transition ease-out duration-300",
        overlayEnterToClass: "opacity-100",
        overlayLeaveFromClass: "opacity-100",
        overlayLeaveActiveClass: "transition ease-in duration-200",
        overlayLeaveToClass: "opacity-0",
        enterFromClass: "opacity-0 translate-y-4 sm:translate-y-0 transform sm:scale-95",
        enterActiveClass: "transition ease-out duration-300",
        enterToClass: "opacity-100 translate-y-0 transform sm:scale-100",
        leaveFromClass: "opacity-100 translate-y-0 transform sm:scale-100",
        leaveActiveClass: "transition ease-in duration-200",
        leaveToClass: "opacity-0 translate-y-4 sm:translate-y-0 transform sm:scale-95",
      };
    },

    reverseFooterClass() {
      return {
        "reverse-footer": this.mobileFooterReverse && this.isMobileDevice,
      };
    },

    headerTitleClass() {
      return Object.keys(this.backRoute).length ? "padding-left" : "";
    },

    isShownModal: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    isShownArrowButton() {
      return !!Object.keys(this.backRoute).length;
    },

    isExistFooter() {
      return this.isExistSlot("footer-left") || this.isExistSlot("footer-right");
    },
  },

  methods: {
    showModal() {
      this.isShownModal = true;
    },

    closeModal() {
      this.isShownModal = false;
    },

    onCloseModal() {
      this.closeModal();
    },

    onClickBack() {
      this.$emit("clickBack");
    },

    isExistSlot(slotName) {
      return !!this.$slots[slotName];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-modal {
  &-header {
    @apply flex items-center justify-between;
    @apply px-4 md:px-8 pb-6 pt-8;

    &-left {
      &-wrapper {
        @apply flex items-center space-x-4;
      }
    }

    &-title {
      @apply text-3xl font-medium text-gray-900;
    }

    .icon {
      @apply cursor-pointer;
    }

    &-subtitle {
      @apply mt-1.5 text-base font-normal text-gray-600;
    }
  }

  &-body {
    @apply space-y-4;
    @apply px-4 md:px-8;
  }

  &-footer {
    @apply flex justify-between px-4 md:px-8 py-8;
    @apply max-md:flex-col max-md:gap-4;

    &-left,
    &-right {
      @apply flex flex-col md:flex-row;
      @apply space-y-4 md:space-x-4 md:space-y-0;
      @apply w-full;
    }

    &-right {
      @apply justify-end;
    }
  }
}

.padding-left {
  @apply pl-2;
}

.mono-modal-size-xs > :deep(.mono-modal-wrapper) {
  @apply md:w-100;
}

.mono-modal-size-sm > :deep(.mono-modal-wrapper) {
  @apply md:w-125;
}

.mono-modal-size-md > :deep(.mono-modal-wrapper) {
  @apply md:w-150;
}

.mono-modal-size-lg > :deep(.mono-modal-wrapper) {
  @apply md:w-175;
}

.mono-modal-size-xl > :deep(.mono-modal-wrapper) {
  @apply md:w-200;
}

.mono-modal-size-2xl > :deep(.mono-modal-wrapper) {
  @apply md:w-225;
}

.mono-modal-size-3xl > :deep(.mono-modal-wrapper) {
  @apply md:w-250;
}

.mono-modal-size-4xl > :deep(.mono-modal-wrapper) {
  @apply md:w-275;
}

.mono-modal-size-5xl > :deep(.mono-modal-wrapper) {
  @apply md:w-300;
}

.mono-modal-inner > :deep(.mono-modal-wrapper) {
  @apply !my-[4.5rem];
}

.reverse-footer {
  @apply flex flex-col space-y-4;

  .page-footer-right {
    @apply flex flex-col-reverse space-y-reverse;
  }
}
</style>
