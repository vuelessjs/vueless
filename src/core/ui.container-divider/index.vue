<template>
  <div class="mono-divider-wrapper" :class="dividerWrapperClasses">
    <div class="mono-divider" :class="dividerClasses" :data-cy="dataCy" />
  </div>
</template>

<script>
export default {
  name: "UDivider",

  props: {
    /**
     * Set padding size.
     * @values xs, sm, md, lg, xl
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set divider color.
     * @values light, default, dark
     */
    variant: {
      type: String,
      default: "default",
    },

    /**
     * Make line dashed.
     */
    dashed: {
      type: Boolean,
      default: false,
    },

    /**
     * Make line dotted.
     */
    dotted: {
      type: Boolean,
      default: false,
    },

    /**
     * Remove border (keeps only spacings).
     */
    noBorder: {
      type: Boolean,
      default: false,
    },

    /**
     * Remove top padding.
     */
    noTopPadding: {
      type: Boolean,
      default: false,
    },

    /**
     * Remove bottom padding.
     */
    noBottomPadding: {
      type: Boolean,
      default: false,
    },

    /**
     * Set divider orientation to vertical.
     */
    vertical: {
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

  data: () => ({}),

  computed: {
    dividerWrapperClasses() {
      const size = this.vertical ? `size-vertical-${this.size}` : `size-horisontal-${this.size}`;
      const noTopPadding = this.noTopPadding ? "mono-divider-no-top-padding" : "";
      const noBottomPadding = this.noBottomPadding ? "mono-divider-no-bottom-padding" : "";

      return [size, noTopPadding, noBottomPadding];
    },

    dividerClasses() {
      const dashed = this.dashed ? "mono-divider-dashed" : "";
      const dotted = this.dotted ? "mono-divider-dotted" : "";
      const noBorder = this.noBorder ? "mono-divider-no-border" : "";
      const vertical = this.vertical ? "mono-divider-vertical" : "mono-divider-horizontal";
      const variant = `mono-divider-${this.variant}`;

      return [dashed, dotted, noBorder, variant, vertical];
    },
  },
};
</script>

<style lang="postcss" scoped>
.size-horisontal {
  &-xs {
    @apply py-2;
  }

  &-sm {
    @apply py-3;
  }

  &-md {
    @apply py-4;
  }

  &-lg {
    @apply py-5;
  }

  &-xl {
    @apply py-6;
  }
}

.size-vertical {
  &-xs {
    @apply px-2;
  }

  &-sm {
    @apply px-3;
  }

  &-md {
    @apply px-4;
  }

  &-lg {
    @apply px-5;
  }

  &-xl {
    @apply px-6;
  }
}

.mono-divider {
  @apply border-transparent;

  &-vertical {
    @apply border-l;
    @apply h-full;
  }

  &-horizontal {
    @apply border-t;
    @apply w-full;
  }

  &-light {
    @apply border-gray-100;
  }

  &-default {
    @apply border-gray-200;
  }

  &-dark {
    @apply border-gray-300;
  }

  &-no-border {
    @apply border-0;
  }

  &-dashed {
    @apply border-dashed;
  }

  &-dotted {
    @apply border-dotted;
  }

  &-no-top-padding {
    @apply pt-0;
  }

  &-no-bottom-padding {
    @apply pb-0;
  }
}
</style>
