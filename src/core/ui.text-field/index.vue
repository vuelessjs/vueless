<template>
  <div class="mono-text-field" :class="fieldClasses" :data-cy="dataCy">
    <div class="mono-text-field-label">
      {{ label }}
    </div>

    <!-- @slot Use it to change structure. -->
    <slot :value="value">
      <div class="mono-text-field-value">
        {{ value }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "UField",

  props: {
    /**
     * Set label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set value.
     */
    value: {
      type: String,
      default: "–",
    },

    /**
     * Set size
     * @values sm, md, lg
     */
    size: {
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
    fieldClasses() {
      const size = `mono-text-field-size-${this.size}`;

      return [size];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-text-field {
  @apply w-full;

  &-label {
    @apply font-normal text-gray-500;
  }

  &-value {
    @apply font-normal text-gray-800;
  }

  &-size {
    &-sm {
      .mono-text-field-label {
        @apply mb-0.5 text-xs;
      }

      .mono-text-field-value {
        @apply text-sm;
      }
    }

    &-md {
      .mono-text-field-label {
        @apply mb-1 text-sm;
      }

      .mono-text-field-value {
        @apply text-base;
      }
    }

    &-lg {
      .mono-text-field-label {
        @apply mb-1.5 text-base;
      }

      .mono-text-field-value {
        @apply text-lg;
      }
    }
  }
}
</style>
