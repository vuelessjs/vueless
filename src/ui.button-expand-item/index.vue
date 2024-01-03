<template>
  <div class="mono-expand-button-item">
    <t-button
      class="mono-expand-button-item-button"
      :disabled="disabled"
      :class="sizeClass"
      :data-cy="dataCy"
      @click="onClick"
    >
      <UIcon :name="iconName" class="icon" color="gray" />

      <slot>
        <span class="mono-expand-button-item-button-text">{{ text }}</span>
      </slot>
    </t-button>

    <div class="mono-expand-button-item-line" />
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";
import TButton from "vueless/library.vue-tailwind-3/t-button";

export default {
  name: "UButtonExpandItem",

  components: {
    UIcon,
    TButton,
  },

  props: {
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
     * Icon SVG data source path.
     */
    iconName: {
      type: String,
      default: "",
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
    sizeClass() {
      return `size-${this.size}`;
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
.mono-expand-button-item {
  &:last-child {
    .mono-expand-button-item-line {
      @apply hidden;
    }
  }

  .mono-expand-button-item-button {
    @apply flex items-center;
    @apply font-normal text-gray-900;
    @apply w-full text-left;
    @apply rounded-lg shadow-none outline-none;
    @apply border bg-transparent;

    &-text {
      @apply border-b border-transparent;
    }

    .icon {
      @apply mr-3;
    }

    &:hover {
      .mono-expand-button-item-button-text {
        @apply transition duration-100 ease-in-out;
        @apply border-b border-dashed border-gray-900;
      }
    }

    &:focus {
      @apply border-transparent;
      @apply ring-0;
    }

    &:disabled {
      @apply text-gray-400;
    }
  }

  .mono-expand-button-item-line {
    @apply border border-l-0 border-r-0 border-t-0 border-gray-200;
    @apply my-2;
  }
}

.size {
  &-sm {
    @apply text-sm;
    @apply px-3;
  }

  &-md {
    @apply text-base;
    @apply px-4;
  }

  &-lg {
    @apply text-lg;
    @apply px-5;
  }
}
</style>
