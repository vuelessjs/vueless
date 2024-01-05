<template>
  <t-card no-body class="mono-card" :class="cardClasses" :data-cy="dataCy">
    <div v-if="isShownHeader" class="mono-card-header">
      <div class="mono-card-header-left-wrapper">
        <!-- @slot Use it to add something before left side of the header. -->
        <slot name="header-left-before" />

        <!-- @slot Use it to customise left side of the header. -->
        <slot name="header-left">
          <div class="mono-card-header-left">
            <UHeader size="md" color="brand" :text="title" />
            <div v-if="description" class="mono-card-header-left-subtitle">
              {{ description }}
            </div>
          </div>
        </slot>

        <!-- @slot Use it to add something after left side of the header. -->
        <slot name="header-left-after" />
      </div>

      <div>
        <!-- @slot Use it to customise right side of the header. -->
        <slot name="header-right" />
      </div>
    </div>

    <!-- @slot Use it to add something inside. -->
    <div class="mono-card-content">
      <slot />
    </div>

    <UDivider v-if="isShownFooterSlot" no-top-padding no-bottom-padding size="xl" />

    <div v-if="isShownFooterSlot" class="mono-card-footer" :class="reverseFooterClass">
      <div>
        <!-- @slot Use it to add something to the left side of the footer. -->
        <slot name="footer-left" />
      </div>

      <div>
        <!-- @slot Use it to add something to the right side of the footer. -->
        <slot name="footer-right" />
      </div>
    </div>
  </t-card>
</template>

<script>
import TCard from "vueless/library.vue-tailwind-3/t-card";
import UHeader from "vueless/ui.text-header";
import UDivider from "vueless/ui.container-divider";

export default {
  name: "UCard",

  components: {
    TCard,
    UHeader,
    UDivider,
  },

  props: {
    /**
     * Sets card title.
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Sets card description.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * The size of the padding.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Reverse left and right footer blocks (in mobile version only).
     */
    mobileFooterReverse: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets border radius size (makes card more or less rounded).
     * @values xs, sm, md, lg
     */
    borderRadius: {
      type: String,
      default: "md",
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
    cardClasses() {
      const borderRadius = `border-radius-${this.borderRadius}`;
      const size = `size-${this.size}`;

      return [borderRadius, size];
    },

    isShownHeader() {
      return this.title || !!this.$slots["header-left"] || !!this.$slots["header-right"];
    },

    isShownFooterSlot() {
      return !!this.$slots["footer-left"] || !!this.$slots["footer-right"];
    },

    reverseFooterClass() {
      return {
        "reverse-footer": this.mobileFooterReverse && this.isMobileDevice,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-card {
  @apply border border-gray-200 bg-white;
  @apply shadow-none;
  @apply space-y-4 md:space-y-6;
  @apply w-full;

  &.border-radius {
    &-xs {
      @apply rounded;
    }

    &-sm {
      @apply rounded-lg;
    }

    &-md {
      @apply rounded-2xl;
    }

    &-lg {
      @apply rounded-3xl;
    }
  }

  &.size {
    &-sm {
      @apply p-2 md:p-4;
    }

    &-md {
      @apply p-4 md:p-6;
    }

    &-lg {
      @apply p-6 md:p-8;
    }
  }

  &-header {
    @apply flex justify-between;

    &-left {
      @apply flex flex-col;

      &-wrapper {
        @apply flex items-center space-x-4;
      }

      &-subtitle {
        @apply mt-1.5 text-base font-normal text-gray-600;
      }
    }
  }

  &-content {
    @apply space-y-2 md:space-y-4;
  }

  &-footer {
    @apply flex justify-between;
  }
}

.reverse-footer {
  @apply flex flex-col-reverse space-y-reverse;
}
</style>
