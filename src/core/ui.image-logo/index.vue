<template>
  <div class="mono-logo-wrapper" :data-cy="dataCy" @click="onClick">
    <div class="mono-logo" :class="sizeClass">
      <div v-if="label" class="mono-logo-label">
        {{ label }}
      </div>

      <div class="mono-logo-image" :style="bgImage" />
    </div>

    <div v-if="title" class="mono-logo-title" :class="sizeTitleClass">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ULogo",

  props: {
    /**
     * Set the path for img.
     */
    path: {
      type: String,
      default: "",
    },

    /**
     * Set label for component.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set title for component.
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * The size of title.
     * @values 2xs, xs, sm, md, lg, xl, 2xl
     */
    sizeTitle: {
      type: String,
      default: "md",
    },

    /**
     * The size of the logo.
     * @values 2xs, xs, sm, md, lg, xl, 2xl, 3xl
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

  emits: ["click"],

  computed: {
    bgImage() {
      let path = this.path.includes("http") ? this.path : import.meta.env.BASE_URL + this.path;

      return `background-image: url(${path});`;
    },

    sizeClass() {
      return `mono-logo-size-${this.size}`;
    },

    sizeTitleClass() {
      return `mono-logo-size-${this.sizeTitle}-title`;
    },
  },

  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-logo-wrapper {
  @apply flex items-center;

  .mono-logo {
    @apply relative;

    &-label {
      @apply bg-red-500 text-xs font-medium text-white;
      @apply rounded-full;
      @apply absolute -right-7 -top-1.5 px-2 py-0.5;
    }

    &-image {
      @apply h-full w-full;
      @apply bg-contain bg-center bg-no-repeat;
    }

    &-title {
      @apply whitespace-nowrap px-3.5 font-bold text-white;
    }

    &-size {
      &-2xs {
        @apply h-3.5 w-3.5;

        &-title {
          @apply text-xs;
        }
      }

      &-xs {
        @apply h-4 w-4;

        &-title {
          @apply text-sm;
        }
      }

      &-sm {
        @apply h-5 w-5;

        &-title {
          @apply text-base;
        }
      }

      &-md {
        @apply h-6 w-6;

        &-title {
          @apply text-lg;
        }
      }

      &-lg {
        @apply h-8 w-8;

        &-title {
          @apply text-2xl;
        }
      }

      &-xl {
        @apply h-10 w-10;

        &-title {
          @apply text-3xl;
        }
      }

      &-2xl {
        @apply h-12 w-12;

        &-title {
          @apply text-4xl;
        }
      }

      &-3xl {
        @apply h-14 w-14;
      }
    }
  }
}
</style>
