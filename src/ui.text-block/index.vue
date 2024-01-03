<template>
  <div class="mono-text-block" :class="textBlockClasses" :data-cy="dataCy">
    <!-- @slot Use it to add something. -->
    <div v-if="!$slots.default" v-html="html" />
    <slot />
  </div>
</template>

<script>
import { useSlots } from "vue";

export default {
  name: "UText",

  props: {
    /**
     * Set html to render inside the component.
     */
    html: {
      type: String,
      default: undefined,
    },

    /**
     * Set text block size.
     * @values xs, sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set component align.
     * @values left , center, right
     */
    align: {
      type: String,
      default: "left",
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  setup() {
    const slots = useSlots();

    return { slots };
  },

  computed: {
    textBlockClasses() {
      const size = `mono-text-block-size-${this.size}`;
      const align = `mono-text-block-position-${this.align}`;

      return [size, align];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-text-block {
  @apply space-y-4;
  @apply font-normal leading-normal;

  :deep(a) {
    @apply underline;
    @apply transition duration-100 ease-in-out;

    &:hover {
      @apply opacity-80;
    }
  }

  :deep(b) {
    @apply font-bold;
  }

  :deep(i) {
    @apply italic;
  }

  :deep(ul),
  :deep(ol) {
    @apply font-normal leading-[1.125rem];
    @apply list-inside;
    @apply ml-2;
  }

  :deep(ul) {
    @apply list-disc;
  }

  :deep(ol) {
    @apply list-decimal;
  }

  &-size {
    &-xs {
      @apply text-xs leading-tight;
    }

    &-sm {
      @apply text-sm leading-tight;
    }

    &-md {
      @apply text-base leading-tight;
    }

    &-lg {
      @apply text-lg leading-tight;
    }
  }

  &-position {
    &-left {
      @apply text-left;
    }

    &-center {
      @apply text-center;
    }

    &-right {
      @apply text-right;
    }
  }
}
</style>
