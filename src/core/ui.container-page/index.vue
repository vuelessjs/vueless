<template>
  <div
    ref="pageWrapper"
    class="mono-page-wrapper"
    :class="[pageWidthClass, pageClasses]"
    :data-cy="dataCy"
  >
    <div class="mono-page-additional-wrapper" :class="pageAdditionClasses">
      <div ref="page" class="mono-page" :class="contentWidthClass">
        <div v-if="isShownHeader" class="mono-page-header" :class="headerPaddingClass">
          <div class="mono-page-header-left">
            <div class="mono-page-header-left-wrapper">
              <!-- @slot Use it to add something before left side of the header. -->
              <slot name="header-left-before" />

              <!-- @slot Use it to customise left side of the header. -->
              <slot name="header-left">
                <div class="header-left">
                  <ArrowLink
                    v-if="isShownArrowButton"
                    :back-route="backRoute"
                    :data-cy="`${dataCy}-back`"
                  />

                  <UHeader :text="title" :size="titleSize" color="black" />

                  <div v-if="description" class="mono-page-header-left-subtitle">
                    {{ description }}
                  </div>
                </div>
              </slot>

              <!-- @slot Use it to add something after left side of the header. -->
              <slot name="header-left-after" />
            </div>
          </div>

          <div class="mono-page-header-right">
            <!-- @slot Use it to customise right side of the header. -->
            <slot name="header-right" />
          </div>
        </div>

        <div class="mono-page-content">
          <!-- @slot Use it to add main content. -->
          <slot />
        </div>

        <div
          v-if="isShownFooterSlot"
          :class="[reverseFooterClass, footerPaddingClass]"
          class="mono-page-footer"
        >
          <div class="mono-page-footer-left">
            <!-- @slot Use it to add something to the left side of the footer. -->
            <slot name="footer-left" />
          </div>

          <div class="mono-page-footer-right">
            <!-- @slot Use it to add something to the right side of the footer. -->
            <slot name="footer-right" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isDisabledFixedRounding && !isMobileDevice" class="mono-page-fixed-block-wrapper">
      <div class="fixed-block" :class="fixedBlockClass" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { globalComponentConfig, isMobileApp } from "vueless/service.ui";

import ArrowLink from "./components/ArrowLink.vue";
import UHeader from "vueless/ui.text-header";

export default {
  name: "UPage",

  components: {
    ArrowLink,
    UHeader,
  },

  props: {
    /**
     * Sets page title.
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Set size.
     * @values xs, sm, md, lg, xl, 2xl
     */
    titleSize: {
      type: String,
      default: "lg",
    },

    /**
     * Sets page description.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * Sets Vue router route params for back arrow
     */
    backRoute: {
      type: Object,
      default: () => ({}),
    },

    /**
     * The width of the container page.
     * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, wide
     */
    width: {
      type: String,
      default: "wide",
    },

    /**
     * Reverse left and right footer blocks (in mobile version only).
     */
    mobileFooterReverse: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets full width for wrapper block, and fixed with for content (from size prop). Content will be aligned center.
     */
    widePage: {
      type: Boolean,
      default: false,
    },

    /**
     * Active side padding for header.
     */
    headerPadding: {
      type: Boolean,
      default: undefined,
    },

    /**
     * Active side padding for footer.
     */
    footerPadding: {
      type: Boolean,
      default: undefined,
    },

    /**
     * Sets background color gray.
     */
    gray: {
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

  computed: {
    ...mapGetters("breakpoint", ["isMobileDevice"]),

    isDisabledFixedRounding() {
      return globalComponentConfig.UPage?.disabledFixedRounding;
    },

    isHeaderPadding() {
      if (this.headerPadding !== undefined) return this.headerPadding;

      return globalComponentConfig.UPage?.headerPadding;
    },

    isFooterPadding() {
      if (this.footerPadding !== undefined) return this.footerPadding;

      return globalComponentConfig.UPage?.footerPadding;
    },

    reverseFooterClass() {
      return {
        "reverse-footer": this.mobileFooterReverse && this.isMobileDevice,
      };
    },

    isShownFooterSlot() {
      return !!this.$slots["footer-left"] || !!this.$slots["footer-right"];
    },

    isShownHeader() {
      return this.title || !!this.$slots["header-left"] || !!this.$slots["header-right"];
    },

    isShownArrowButton() {
      return !!Object.keys(this.backRoute).length;
    },

    pageClasses() {
      const minHeight =
        this.isMobileDevice && !isMobileApp ? "min-height-mobile" : "min-height-desktop";
      const rounding =
        !this.isDisabledFixedRounding && !this.isMobileDevice ? "fixed-rounding" : "rounding";
      const backgroundColor = this.gray ? "bg-color-gray" : "";

      return [minHeight, rounding, backgroundColor];
    },

    widthClass() {
      return {
        "mono-page-size-xs": this.width === "xs", // 400px
        "mono-page-size-sm": this.width === "sm", //   500px
        "mono-page-size-md": this.width === "md", //   600px
        "mono-page-size-lg": this.width === "lg", //   700px
        "mono-page-size-xl": this.width === "xl", //   800px
        "mono-page-size-2xl": this.width === "2xl", // 900px
        "mono-page-size-3xl": this.width === "3xl", // 1000px
        "mono-page-size-4xl": this.width === "4xl", // 1100px
        "mono-page-size-5xl": this.width === "5xl", // 1200px
        "mono-page-size-wide": this.width === "wide", // 100%
      };
    },

    pageWidthClass() {
      return !this.widePage ? this.widthClass : "mono-page-size-wide";
    },

    pageAdditionClasses() {
      const rounding =
        !this.isDisabledFixedRounding && !this.isMobileDevice ? "fixed-rounding" : "";
      const backgroundColor = this.gray ? "bg-color-gray" : "";

      return [rounding, backgroundColor];
    },

    contentWidthClass() {
      return this.widePage ? this.widthClass : "";
    },

    headerPaddingClass() {
      return this.isHeaderPadding ? "header-padding" : "";
    },

    footerPaddingClass() {
      return this.isFooterPadding ? "footer-padding" : "";
    },

    fixedBlockClass() {
      return this.gray ? "bg-color-gray" : "";
    },
  },

  mounted() {
    const bodyClasses = document.querySelector("body").classList;

    this.gray ? bodyClasses.add("body-gray-bg") : bodyClasses.remove("body-gray-bg");
  },
};
</script>

<style lang="postcss">
.body-gray-bg {
  @apply bg-gray-50;
}
</style>

<style lang="postcss" scoped>
.mono-page {
  @apply mx-auto;
  @apply min-h-full;

  &-wrapper {
    @apply min-h-full overflow-auto;

    &.rounding {
      @apply p-4 md:px-8 md:py-6;
      @apply md:rounded-r-2xl;
      @apply bg-white bg-cover bg-fixed bg-center;

      &.bg-color-gray {
        @apply bg-gray-50;
      }
    }

    &.fixed-rounding {
      @apply relative;
      @apply pr-0 md:pr-4;
      @apply md:rounded-none;
      @apply bg-none;
    }
  }

  &-additional-wrapper {
    min-height: 100%;

    &.fixed-rounding {
      @apply p-4 md:py-6 md:pl-8 md:pr-4;
      @apply bg-white bg-cover bg-fixed bg-center;
      min-height: 100vh;
    }

    &.bg-color-gray {
      @apply bg-gray-50;
    }
  }

  &-header {
    @apply flex items-start justify-between;
    @apply mb-4 md:mb-6;

    &-left {
      &-wrapper {
        @apply flex items-center space-x-4;

        .header-left {
          @apply flex flex-col;
        }
      }

      &-subtitle {
        @apply mt-1.5 text-base font-normal text-gray-600;
      }
    }
  }

  &-footer {
    @apply mb-0 mt-14 justify-between pt-8 md:flex md:items-baseline;
    @apply space-y-4 md:space-y-0;
    @apply border-t border-gray-200;

    &-left:deep(.mono-link-wrapper, .mono-dropdown-button) {
      @apply !block;
    }

    &-right,
    &-left {
      @apply md:flex;
      @apply space-y-4 md:space-x-4 md:space-y-0;

      &:deep(.mono-button) {
        @apply w-full md:w-auto;
      }

      :deep(.mono-dropdown-button) {
        .dropdown-block,
        .mono-dropdown-button-list {
          @apply max-md:w-full;
        }

        .mono-dropdown-item {
          @apply max-md:text-center;
        }

        .dropdown-list {
          @apply mb-[calc(theme("spacing.mobile-menu-height")+3rem)];
        }
      }

      &:deep(.mono-dropdown-tag, .mono-dropdown-link, .mono-dropdown-button) {
        @apply w-full md:w-auto;

        .dropdown-list {
        }

        .dropdown-wrapper-list {
          @apply mb-2 md:mb-0;
        }

        .dropdown-block {
          @apply relative md:absolute;
        }

        .dropdown-list-right {
          @apply w-full text-center;
        }

        .dropdown-wrapper {
          @apply block w-full;

          .mono-svg-icon {
            @apply right-auto;
          }
        }
      }
    }
  }

  &-fixed-block-wrapper {
    @apply absolute right-4;

    .fixed-block {
      @apply fixed;
      @apply top-0;
      @apply w-4;
      height: 100vh;
      @apply rounded-r-2xl bg-white;

      &.bg-color-gray {
        @apply !bg-gray-50;
      }
    }
  }
}

.header-padding,
.footer-padding {
  @apply px-4 md:px-6;
}

.reverse-footer {
  @apply flex flex-col-reverse space-y-reverse;

  .mono-page-footer-right {
    @apply flex flex-col-reverse space-y-reverse;
  }
}

.mono-page-size-xs {
  @apply md:w-100;
}

.mono-page-size-sm {
  @apply md:w-125;
}

.mono-page-size-md {
  @apply md:w-150;
}

.mono-page-size-lg {
  @apply md:w-175;
}

.mono-page-size-xl {
  @apply md:w-200;
}

.mono-page-size-2xl {
  @apply md:w-225;
}

.mono-page-size-3xl {
  @apply md:w-250;
}

.mono-page-size-4xl {
  @apply md:w-275;
}

.mono-page-size-5xl {
  @apply md:w-300;
}

.mono-page-size-wide {
  @apply md:w-full;
}

.min-height {
  &-desktop {
    min-height: 100vh;
  }

  &-mobile {
    overflow-x: hidden;
    margin-bottom: theme("spacing.mobile-menu-height");
  }
}
</style>
