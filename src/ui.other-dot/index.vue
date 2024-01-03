<template>
  <div class="mono-dot" :class="dotClasses" />
</template>

<script>
export default {
  name: "UDot",

  props: {
    /**
     * The dot color.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia, black, white
     */
    color: {
      type: String,
      default: "gray",
    },

    /**
     * The dot size.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },
  },

  computed: {
    dotClasses() {
      const size = `size-${this.size}`;
      const color = `mono-dot-color-${this?.color}`;

      return [color, size];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-dot {
  @apply rounded-full;

  &-color {
    &-red {
      @apply bg-red-500;
    }

    &-orange {
      @apply bg-orange-500;
    }

    &-yellow {
      @apply bg-yellow-500;
    }

    &-green {
      @apply bg-green-500;
    }

    &-blue {
      @apply bg-blue-500;
    }

    &-fuchsia {
      @apply bg-fuchsia-500;
    }

    &-violet {
      @apply bg-violet-500;
    }

    &-gray {
      @apply bg-gray-500;
    }

    &-black {
      @apply bg-gray-900;
    }

    &-white {
      @apply bg-white;
    }
  }
}

.size {
  &-sm {
    @apply mr-1 h-1 w-1;
  }

  &-md {
    @apply mr-1 h-1.5 w-1.5;
  }

  &-lg {
    @apply mr-1 h-2 w-2;
  }
}
</style>
