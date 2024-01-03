<template>
  <div
    ref="UButtonGroupItem"
    :class="labelButtonsClasses"
    class="mono-button-group-item"
    :data-cy="dataCy"
    @click="onClickSetValue"
  >
    <t-radio
      :id="id"
      v-model="selectedItem"
      :class="radioButtonsClasses"
      class="radio"
      :name="buttonName"
      :value="value"
    />

    <label :for="id" class="label">
      <span v-if="isShownSlot.left" class="label-slot">
        <!-- @slot Use it to add some content before label. -->
        <slot name="left" />
      </span>

      <span v-if="label || isShownSlot.default" class="label-text label-slot">
        {{ label }}
        <!-- @slot Use it to add some content instead of label. -->
        <slot />
      </span>

      <span v-if="isShownSlot.right" class="label-slot">
        <!-- @slot Use it to some content after label. -->
        <slot name="right" />
      </span>
    </label>
  </div>
</template>

<script>
import TRadio from "vueless/library.vue-tailwind-3/t-radio";

export default {
  name: "UButtonGroupItem",

  components: { TRadio },

  inject: [
    "setButtonGroupSelectedItem",
    "getButtonGroupName",
    "getButtonGroupSize",
    "getButtonGroupValue",
  ],

  props: {
    /**
     * The variant of the button.
     * @values primary, secondary, thirdary, raw
     */
    variant: {
      type: String,
      default: "primary",
    },
    /**
     * Set data for button.
     */
    value: {
      type: [String, Number],
      default: "",
    },

    /**
     * Set label.
     */
    label: {
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

  emits: ["update:value"],

  data: () => ({
    selectedItem: "",
    buttonName: "",
    size: "md",
  }),

  computed: {
    labelButtonsClasses() {
      const size = `size-${this.size}`;
      const variant = `variant-${this.variant}`;

      return [size, variant];
    },

    radioButtonsClasses() {
      const radio = `radio-${this.variant}`;

      return [radio];
    },

    isShownSlot() {
      return {
        default: !!this.$slots["default"],
        left: !!this.$slots["left"],
        right: !!this.$slots["right"],
      };
    },

    id() {
      return this.value + this.buttonName;
    },
  },

  mounted() {
    this.size = this.getButtonGroupSize ? this.getButtonGroupSize() : this.size;

    this.selectedItem = this.getButtonGroupValue ? this.getButtonGroupValue() : this.selectedItem;

    this.buttonName = this.getButtonGroupName ? this.getButtonGroupName() : "group";
  },

  methods: {
    onClickSetValue() {
      this.selectedItem = this.value;

      if (this.setButtonGroupSelectedItem) this.setButtonGroupSelectedItem(this.value);

      this.$emit("update:value", this.value);
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-button-group-item {
  @apply rounded-none;

  .radio {
    @apply absolute -z-10 opacity-0;

    &-primary {
      &:focus {
        & + .label {
          @apply border-gray-100 bg-opacity-10;
          @apply ring-4 ring-gray-600/15;
        }
      }

      &:checked {
        & + .label {
          @apply bg-gray-900/15;
        }
      }
    }

    &-secondary {
      &:focus {
        & + .label {
          @apply !text-opacity-100;
          @apply !border-opacity-100;
        }
      }

      &:checked {
        & + .label {
          @apply !text-opacity-100;
          @apply !border-opacity-100;
        }
      }
    }

    &-thirdary {
      & + .label {
        @apply bg-transparent opacity-50;
      }

      &:focus {
        & + .label {
          @apply border-none bg-gray-100 bg-opacity-10 opacity-100;
          @apply ring-0;
        }
      }

      &:checked {
        & + .label {
          @apply bg-transparent opacity-100;
        }
      }
    }
  }

  .label {
    @apply flex items-center justify-between;
    @apply cursor-pointer;

    &-text {
      @apply font-medium;
    }

    &-slot:deep(.mono-svg-icon) {
      @apply block;
    }
  }

  &.size {
    &-sm {
      .label {
        @apply space-x-1.5 p-3.5;

        &-text {
          @apply text-sm;
        }
      }
    }

    &-md {
      .label {
        @apply space-x-2 p-[1.125rem];

        &-text {
          @apply text-base;
        }
      }
    }

    &-lg {
      .label {
        @apply space-x-2.5 p-[1.375rem];

        &-text {
          @apply text-lg;
        }
      }
    }
  }
}

.variant {
  &-primary {
    .label {
      @apply bg-gray-900/5;

      &:hover {
        @apply bg-gray-900/10;
      }

      &:active {
        @apply bg-gray-900/15;
      }
    }
  }

  &-secondary {
    .label {
      @apply !bg-transparent border;

      &:hover {
        @apply !text-opacity-80;
        @apply !border-opacity-80;
      }
    }
  }

  &-thirdary {
    .label {
      @apply !bg-transparent border-none;

      &:hover {
        @apply border-none opacity-100;
        @apply ring-0;
      }
    }
  }
}
</style>
