<template>
  <div class="mono-text-header" :class="headerClasses" :data-cy="dataCy">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "UHeader",

  props: {
    /**
     * Set text.
     */
    text: {
      type: String,
      default: "",
    },

    /**
     * Set size.
     * @values xs, sm, md, lg, xl, 2xl
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set weight.
     * @values regular, medium, bold
     */
    weight: {
      type: String,
      default: "medium",
    },

    /**
     * Show bottom line.
     */
    underlined: {
      type: Boolean,
      default: false,
    },

    /**
     * Text color.
     * @values brand, gray, red, orange, yellow, green, blue, violet, fuchsia, black, white
     */
    color: {
      type: String,
      default: "gray",
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
    headerClasses() {
      const size = `mono-text-header-size-${this.size}`;
      const weight = `mono-text-header-weight-${this.weight}`;
      const underline = this.underlined ? "mono-text-header-under-line" : "";
      const color = `mono-text-header-color-${this.color}`;

      return [size, weight, underline, color];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-text-header {
  &-size {
    &-xs {
      @apply text-lg;
    }

    &-sm {
      @apply text-xl;
    }

    &-md {
      @apply text-2xl;
    }

    &-lg {
      @apply text-3xl;
    }

    &-xl {
      @apply text-4xl;
    }

    &-2xl {
      @apply text-5xl;
    }
  }

  &-under-line {
    @apply border-b border-brand;

    &.mono-text-header-size-xs {
      @apply pb-1.5;
    }

    &.mono-text-header-size-sm {
      @apply pb-2;
    }

    &.mono-text-header-size-md {
      @apply pb-2;
    }

    &.mono-text-header-size-lg {
      @apply pb-2.5;
    }

    &.mono-text-header-size-xl {
      @apply pb-2.5;
    }

    &.mono-text-header-size-2xl {
      @apply pb-3;
    }
  }

  &-weight {
    &-regular {
      @apply font-normal;
    }

    &-medium {
      @apply font-medium;
    }

    &-bold {
      @apply font-bold;
    }
  }

  &-color {
    &-brand {
      @apply text-brand;

      &.mono-text-header-under-line {
        @apply border-brand;
      }
    }

    &-white {
      @apply text-white;

      &.mono-text-header-under-line {
        @apply border-white;
      }
    }

    &-black {
      @apply text-gray-900;

      &.mono-text-header-under-line {
        @apply border-gray-900;
      }
    }

    &-gray {
      @apply text-gray-800;

      &.mono-text-header-under-line {
        @apply border-gray-800;
      }
    }

    &-red {
      @apply text-red-800;

      &.mono-text-header-under-line {
        @apply border-red-800;
      }
    }

    &-orange {
      @apply text-orange-800;

      &.mono-text-header-under-line {
        @apply border-orange-800;
      }
    }

    &-yellow {
      @apply text-yellow-800;

      &.mono-text-header-under-line {
        @apply border-yellow-800;
      }
    }

    &-green {
      @apply text-green-800;

      &.mono-text-header-under-line {
        @apply border-green-800;
      }
    }

    &-blue {
      @apply text-blue-800;

      &.mono-text-header-under-line {
        @apply border-blue-800;
      }
    }

    &-violet {
      @apply text-violet-800;

      &.mono-text-header-under-line {
        @apply border-violet-800;
      }
    }

    &-fuchsia {
      @apply text-fuchsia-800;

      &.mono-text-header-under-line {
        @apply border-fuchsia-800;
      }
    }
  }
}
</style>
