<template>
  <t-button
    :id="id"
    class="mono-button px-6 pb-12 pt-8"
    :disabled="disabled"
    :class="buttonClasses"
    :variant="variant"
    :data-cy="dataCy"
    @click="onClick"
  >
    <!-- @slot Use it to add something before text. -->
    <slot v-if="!loading" name="left" />

    <!-- @slot Use it to add something instead of text. -->
    <slot v-if="!loading">
      <div v-if="text" class="mono-button-text-wrapper">
        {{ text }}
      </div>
    </slot>

    <!-- @slot Use it to add something after text. -->
    <slot v-if="!loading" name="right" />

    <ULoader v-if="loading" :size="size" />
  </t-button>
</template>

<script>
import { getRandomId } from "vueless/service.ui";
import TButton from "vueless/library.vue-tailwind-3/t-button";
import ULoader from "vueless/ui.other-loader";

export default {
  name: "UButton",

  components: {
    TButton,
    ULoader,
  },

  props: {
    /**
     * The variant of the button.
     * @values primary, secondary, thirdary
     */
    variant: {
      type: String,
      default: "primary",
    },

    /**
     * The color of the button.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia, white
     */
    color: {
      type: String,
      default: "",
    },

    /**
     * The size of the button.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set button text.
     */
    text: {
      type: String,
      default: "",
    },

    /**
     * Make button inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Make button's corners rounded.
     */
    pill: {
      type: Boolean,
      default: false,
    },

    /**
     * Fill the background for thirdary variant.
     */
    filled: {
      type: Boolean,
      default: false,
    },

    /**
     * Enables loader.
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * Generates unique element id.
     * @ignore
     */
    id: {
      type: String,
      default: () => getRandomId(),
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
    buttonClasses() {
      const size = `mono-button-${this.size}`;
      const classes = { pill: this.pill };
      const filled = this.filled ? `${this.variant}-filled` : "";
      const loading = this.loading ? "mono-button-loading" : "";

      return [classes, this.variant, filled, size, this.color, loading];
    },
  },

  methods: {
    onClick(event) {
      this.$emit("click", event);

      document.getElementById(this.id).blur();
    },
  },
};
</script>

<style scoped lang="postcss">
.mono-button {
  @apply flex items-center justify-center;
  @apply text-base font-medium;
  @apply rounded-lg outline-none;
  @apply transition duration-100 ease-in-out;

  &:focus {
    @apply ring-4 ring-gray-900 !ring-opacity-10;
  }

  &-loading {
    @apply pointer-events-none;
  }

  &-text-wrapper {
    @apply whitespace-nowrap px-1.5;
  }

  &-sm {
    @apply px-3 py-2.5;
    @apply text-sm;
  }

  &-md {
    @apply px-3.5 py-3;
  }

  &-lg {
    @apply px-4 py-4;
    @apply text-lg;
  }
}

.pill {
  @apply rounded-full;
}

.primary {
  @apply border border-solid border-gray-900 bg-gray-900 text-white;

  &:focus {
    @apply !border-opacity-0;
    @apply !bg-opacity-80;
  }

  &:hover {
    @apply !border-opacity-0;
    @apply !bg-opacity-80;
  }

  &:active {
    @apply !border-opacity-0;
    @apply !bg-opacity-70;
  }

  &:disabled {
    @apply !border-opacity-0;
    @apply !bg-opacity-40;
  }
}

.secondary {
  @apply border border-solid border-gray-900 bg-transparent text-gray-900;

  &:focus {
    @apply !text-opacity-80;
    @apply !border-opacity-80;
  }

  &:hover {
    @apply !text-opacity-80;
    @apply !border-opacity-80;
  }

  &:active {
    @apply !text-opacity-70;
    @apply !border-opacity-70;
  }

  &:disabled {
    @apply !text-opacity-40;
    @apply !border-opacity-40;
  }
}

.thirdary {
  @apply border border-transparent bg-transparent text-gray-900;

  &-filled {
    @apply bg-gray-900 !bg-opacity-5;
  }

  &:focus {
    @apply !text-opacity-70;
    @apply bg-gray-900 !bg-opacity-5;
  }

  &:hover {
    @apply !text-opacity-70;
    @apply bg-gray-900 !bg-opacity-10;
  }

  &:active {
    @apply !text-opacity-60;
    @apply bg-gray-900 !bg-opacity-15;
  }

  &:disabled {
    @apply !text-opacity-40;
  }
}
</style>

<!-- Colors & Brand -->
<style scoped lang="postcss">
.brand {
  &.mono-button {
    &:focus {
      @apply ring-brand;
    }
  }

  &.primary {
    @apply border-brand bg-brand text-white;

    &:hover {
      @apply border-brand bg-brand;
    }

    &:focus {
      @apply bg-brand ring-brand/20;
    }

    &:active {
      @apply border-brand bg-brand;
    }

    &:disabled {
      @apply border-brand bg-brand;
    }
  }

  &.secondary {
    @apply text-brand;
    @apply border-brand;

    &:focus {
      @apply border-brand text-brand ring-brand/20;
    }

    &:hover {
      @apply border-brand text-brand;
    }

    &:active {
      @apply border-brand text-brand;
    }

    &:disabled {
      @apply border-brand text-brand;
    }
  }

  &.thirdary {
    @apply text-brand;

    &-filled {
      @apply bg-brand text-brand;
    }

    &:focus {
      @apply bg-brand text-brand;
    }

    &:hover {
      @apply bg-brand text-brand;
    }

    &:active {
      @apply bg-brand text-brand;
    }

    &:disabled {
      @apply text-brand;
    }
  }
}

.primary {
  &.gray {
    @apply border-gray-800 bg-gray-800 text-white;

    &:focus {
      @apply border-gray-800 bg-gray-800 ring-gray-800;
    }

    &:hover {
      @apply border-gray-800 bg-gray-800;
    }

    &:active {
      @apply border-gray-800 bg-gray-800;
    }

    &:disabled {
      @apply text-gray-800;
      @apply border-gray-800 bg-gray-800;
    }
  }

  &.red {
    @apply border-red-700 bg-red-700 text-white;

    &:focus {
      @apply border-red-700 bg-red-700;
      @apply ring-red-700;
    }

    &:hover {
      @apply border-red-700 bg-red-700;
    }

    &:active {
      @apply border-red-700 bg-red-700;
    }

    &:disabled {
      @apply text-red-700;
      @apply border-red-700 bg-red-700;
    }
  }

  &.orange {
    @apply border-orange-700 bg-orange-700 text-white;

    &:focus {
      @apply border-orange-700 bg-orange-700;
      @apply ring-orange-700;
    }

    &:hover {
      @apply border-orange-700 bg-orange-700;
    }

    &:active {
      @apply border-orange-700 bg-orange-700;
    }

    &:disabled {
      @apply text-orange-700;
      @apply border-orange-700 bg-orange-700;
    }
  }

  &.yellow {
    @apply border-yellow-700 bg-yellow-700 text-white;

    &:focus {
      @apply border-yellow-700 bg-yellow-700;
      @apply ring-yellow-700;
    }

    &:hover {
      @apply border-yellow-700 bg-yellow-700;
    }

    &:active {
      @apply border-yellow-700 bg-yellow-700;
    }

    &:disabled {
      @apply text-yellow-700;
      @apply border-yellow-700 bg-yellow-700;
    }
  }

  &.green {
    @apply border-green-700 bg-green-700 text-white;

    &:focus {
      @apply border-green-700 bg-green-700;
      @apply ring-green-700;
    }

    &:hover {
      @apply border-green-700 bg-green-700;
    }

    &:active {
      @apply border-green-700 bg-green-700;
    }

    &:disabled {
      @apply text-green-700;
      @apply border-green-700 bg-green-700;
    }
  }

  &.blue {
    @apply border-blue-700 bg-blue-700 text-white;

    &:focus {
      @apply border-blue-700 bg-blue-700;
      @apply ring-blue-700;
    }

    &:hover {
      @apply border-blue-700 bg-blue-700;
    }

    &:active {
      @apply border-blue-700 bg-blue-700;
    }

    &:disabled {
      @apply text-blue-700;
      @apply border-blue-700 bg-blue-700;
    }
  }

  &.violet {
    @apply border-violet-700 bg-violet-700 text-white;

    &:focus {
      @apply border-violet-700 bg-violet-700;
      @apply ring-violet-700;
    }

    &:hover {
      @apply border-violet-700 bg-violet-700;
    }

    &:active {
      @apply border-violet-700 bg-violet-700;
    }

    &:disabled {
      @apply text-violet-700;
      @apply border-violet-700 bg-violet-700;
    }
  }

  &.fuchsia {
    @apply border-fuchsia-700 bg-fuchsia-700 text-white;

    &:focus {
      @apply border-fuchsia-700 bg-fuchsia-700;
      @apply ring-fuchsia-700;
    }

    &:hover {
      @apply border-fuchsia-700 bg-fuchsia-700;
    }

    &:active {
      @apply border-fuchsia-700 bg-fuchsia-700;
    }

    &:disabled {
      @apply text-fuchsia-700;
      @apply border-fuchsia-700 bg-fuchsia-700;
    }
  }

  &.white {
    @apply border-white bg-white text-gray-700;

    &:focus {
      @apply border-white bg-white;
      @apply ring-white;
    }

    &:hover {
      @apply border-white bg-white;
    }

    &:active {
      @apply border-white bg-white;
    }

    &:disabled {
      @apply text-white;
      @apply border-white bg-white;
    }
  }
}

.secondary {
  &.gray {
    @apply border-gray-800 bg-transparent text-gray-800;

    &:focus {
      @apply text-gray-800;
      @apply border-gray-800;
      @apply ring-gray-800;
    }

    &:hover {
      @apply text-gray-800;
      @apply border-gray-800;
    }

    &:active {
      @apply text-gray-800;
      @apply border-gray-800;
    }

    &:disabled {
      @apply text-gray-800;
      @apply border-gray-800;
    }
  }

  &.red {
    @apply border-red-700 bg-transparent text-red-700;

    &:focus {
      @apply text-red-700;
      @apply border-red-700;
      @apply ring-red-700;
    }

    &:hover {
      @apply text-red-700;
      @apply border-red-700;
    }

    &:active {
      @apply text-red-700;
      @apply border-red-700;
    }

    &:disabled {
      @apply text-red-700;
      @apply border-red-700;
    }
  }

  &.orange {
    @apply border-orange-700 bg-transparent text-orange-700;

    &:focus {
      @apply text-orange-700;
      @apply border-orange-700;
      @apply ring-orange-700;
    }

    &:hover {
      @apply text-orange-700;
      @apply border-orange-700;
    }

    &:active {
      @apply text-orange-700;
      @apply border-orange-700;
    }

    &:disabled {
      @apply text-orange-700;
      @apply border-orange-700;
    }
  }

  &.yellow {
    @apply border-yellow-700 bg-transparent text-yellow-700;

    &:focus {
      @apply text-yellow-700;
      @apply border-yellow-700;
      @apply ring-yellow-700;
    }

    &:hover {
      @apply text-yellow-700;
      @apply border-yellow-700;
    }

    &:active {
      @apply text-yellow-700;
      @apply border-yellow-700;
    }

    &:disabled {
      @apply text-yellow-700;
      @apply border-yellow-700;
    }
  }

  &.green {
    @apply border-green-700 bg-transparent text-green-700;

    &:focus {
      @apply text-green-700;
      @apply border-green-700;
      @apply ring-green-700;
    }

    &:hover {
      @apply text-green-700;
      @apply border-green-700;
    }

    &:active {
      @apply text-green-700;
      @apply border-green-700;
    }

    &:disabled {
      @apply text-green-700;
      @apply border-green-700;
    }
  }

  &.blue {
    @apply border-blue-700 bg-transparent text-blue-700;

    &:focus {
      @apply text-blue-700;
      @apply border-blue-700;
      @apply ring-blue-700;
    }

    &:hover {
      @apply text-blue-700;
      @apply border-blue-700;
    }

    &:active {
      @apply text-blue-700;
      @apply border-blue-700;
    }

    &:disabled {
      @apply text-blue-700;
      @apply border-blue-700;
    }
  }

  &.violet {
    @apply border-violet-700 bg-transparent text-violet-700;

    &:focus {
      @apply text-violet-700;
      @apply border-violet-700;
      @apply ring-violet-700;
    }

    &:hover {
      @apply text-violet-700;
      @apply border-violet-700;
    }

    &:active {
      @apply text-violet-700;
      @apply border-violet-700;
    }

    &:disabled {
      @apply text-violet-700;
      @apply border-violet-700;
    }
  }

  &.fuchsia {
    @apply border-fuchsia-700 bg-transparent text-fuchsia-700;

    &:focus {
      @apply text-fuchsia-700;
      @apply border-fuchsia-700;
      @apply ring-fuchsia-700;
    }

    &:hover {
      @apply text-fuchsia-700;
      @apply border-fuchsia-700;
    }

    &:active {
      @apply text-fuchsia-700;
      @apply border-fuchsia-700;
    }

    &:disabled {
      @apply text-fuchsia-700;
      @apply border-fuchsia-700;
    }
  }

  &.white {
    @apply border-white bg-transparent text-white;

    &:focus {
      @apply text-white;
      @apply border-white;
      @apply ring-white;
    }

    &:hover {
      @apply text-white;
      @apply border-white;
    }

    &:active {
      @apply text-white;
      @apply border-white;
    }

    &:disabled {
      @apply text-white;
      @apply border-white;
    }
  }
}

.thirdary {
  &.gray {
    @apply border-transparent bg-transparent text-gray-800;

    &.thirdary-filled {
      @apply bg-gray-800;
    }

    &:focus {
      @apply text-gray-800;
      @apply bg-gray-800;
      @apply ring-gray-800;
    }

    &:hover {
      @apply text-gray-800;
      @apply bg-gray-800;
    }

    &:active {
      @apply text-gray-800;
      @apply bg-gray-800;
    }

    &:disabled {
      @apply text-gray-800;
    }
  }

  &.red {
    @apply border-transparent bg-transparent text-red-700;

    &.thirdary-filled {
      @apply bg-red-700;
    }

    &:focus {
      @apply text-red-700;
      @apply bg-red-700;
      @apply ring-red-700;
    }

    &:hover {
      @apply text-red-700;
      @apply bg-red-700;
    }

    &:active {
      @apply text-red-700;
      @apply bg-red-700;
    }

    &:disabled {
      @apply text-red-700;
    }
  }

  &.orange {
    @apply border-transparent bg-transparent text-orange-700;

    &.thirdary-filled {
      @apply bg-orange-700;
    }

    &:focus {
      @apply text-orange-700;
      @apply bg-orange-700;
      @apply ring-orange-700;
    }

    &:hover {
      @apply text-orange-700;
      @apply bg-orange-700;
    }

    &:active {
      @apply text-orange-700;
      @apply bg-orange-700;
    }

    &:disabled {
      @apply text-orange-700;
    }
  }

  &.yellow {
    @apply border-transparent bg-transparent text-yellow-700;

    &.thirdary-filled {
      @apply bg-yellow-700;
    }

    &:focus {
      @apply text-yellow-700;
      @apply bg-yellow-700;
      @apply ring-yellow-700;
    }

    &:hover {
      @apply text-yellow-700;
      @apply bg-yellow-700;
    }

    &:active {
      @apply text-yellow-700;
      @apply bg-yellow-700;
    }

    &:disabled {
      @apply text-yellow-700;
    }
  }

  &.green {
    @apply border-transparent bg-transparent text-green-700;

    &.thirdary-filled {
      @apply bg-green-700;
    }

    &:focus {
      @apply text-green-700;
      @apply bg-green-700;
      @apply ring-green-700;
    }

    &:hover {
      @apply text-green-700;
      @apply bg-green-700;
    }

    &:active {
      @apply text-green-700;
      @apply bg-green-700;
    }

    &:disabled {
      @apply text-green-700;
    }
  }

  &.blue {
    @apply border-transparent bg-transparent text-blue-700;

    &.thirdary-filled {
      @apply bg-blue-700;
    }

    &:focus {
      @apply text-blue-700;
      @apply bg-blue-700;
      @apply ring-blue-700;
    }

    &:hover {
      @apply text-blue-700;
      @apply bg-blue-700;
    }

    &:active {
      @apply text-blue-700;
      @apply bg-blue-700;
    }

    &:disabled {
      @apply text-blue-700;
    }
  }

  &.violet {
    @apply border-transparent bg-transparent text-violet-700;

    &.thirdary-filled {
      @apply bg-violet-700;
    }

    &:focus {
      @apply text-violet-700;
      @apply bg-violet-700;
      @apply ring-violet-700;
    }

    &:hover {
      @apply text-violet-700;
      @apply bg-violet-700;
    }

    &:active {
      @apply text-violet-700;
      @apply bg-violet-700;
    }

    &:disabled {
      @apply text-violet-700;
    }
  }

  &.fuchsia {
    @apply border-transparent bg-transparent text-fuchsia-700;

    &.thirdary-filled {
      @apply bg-fuchsia-700;
    }

    &:focus {
      @apply text-fuchsia-700;
      @apply bg-fuchsia-700;
      @apply ring-fuchsia-700;
    }

    &:hover {
      @apply text-fuchsia-700;
      @apply bg-fuchsia-700;
    }

    &:active {
      @apply text-fuchsia-700;
      @apply bg-fuchsia-700;
    }

    &:disabled {
      @apply text-fuchsia-700;
    }
  }

  &.white {
    @apply border-transparent bg-transparent text-white;

    &.thirdary-filled {
      @apply bg-white;
    }

    &:focus {
      @apply text-white;
      @apply bg-white;
      @apply ring-white;
    }

    &:hover {
      @apply text-white;
      @apply bg-white;
    }

    &:active {
      @apply text-white;
      @apply bg-white;
    }

    &:disabled {
      @apply text-white;
    }
  }
}
</style>
