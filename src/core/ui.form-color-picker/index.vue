<template>
  <div class="mono-colorpicker">
    <div class="mono-colorpicker-title">{{ title }}:</div>

    <div class="mono-colorpicker-wrapper">
      <t-radio
        v-for="(color, index) in colorOptions"
        :key="index"
        v-model="selectedItem"
        class="mono-colorpicker-radio"
        :class="setRadioColor(color)"
        name="colorPicker"
        :value="color"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import TRadio from "vueless/library.vue-tailwind-3/t-radio";

export default {
  name: "UColorPicker",

  components: { TRadio },

  props: {
    modelValue: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    colorOptions: {
      type: Array,
      default: () => [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "fuchsia",
        "violet",
        "gray",
        "black",
        "white",
      ],
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue"],

  computed: {
    selectedItem: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  methods: {
    setRadioColor(color) {
      return `mono-colorpicker-radio-${color}`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-colorpicker {
  &-title {
    @apply text-sm font-normal text-gray-500;
  }

  &-wrapper {
    @apply !mt-4 gap-4 flex flex-wrap;
  }

  &-radio {
    @apply h-6 w-6;
    @apply cursor-pointer;

    &-red {
      @apply border-red-500 bg-red-500;

      &:hover {
        @apply border-red-500;
      }

      &:active {
        @apply border-red-500 bg-red-500;
      }

      &:focus {
        @apply border-red-500 !bg-red-500 ring-4 ring-red-200;
      }

      &:checked {
        @apply border-red-500 bg-red-500;

        &:hover {
          @apply bg-red-500;
        }
      }
    }

    &-orange {
      @apply border-orange-500 bg-orange-500;

      &:hover {
        @apply border-orange-500;
      }

      &:active {
        @apply border-orange-500 bg-orange-500;
      }

      &:focus {
        @apply border-orange-500 !bg-orange-500 ring-4 ring-orange-200;
      }

      &:checked {
        @apply border-orange-500 bg-orange-500;

        &:hover {
          @apply bg-orange-500;
        }
      }
    }

    &-yellow {
      @apply border-yellow-500 bg-yellow-500;

      &:hover {
        @apply border-yellow-500;
      }

      &:active {
        @apply border-yellow-500 bg-yellow-500;
      }

      &:focus {
        @apply border-yellow-500 !bg-yellow-500 ring-4 ring-yellow-200;
      }

      &:checked {
        @apply border-yellow-500 bg-yellow-500;

        &:hover {
          @apply bg-yellow-500;
        }
      }
    }

    &-green {
      @apply border-green-500 bg-green-500;

      &:hover {
        @apply border-green-500;
      }

      &:active {
        @apply border-green-500 bg-green-500;
      }

      &:focus {
        @apply border-green-500 !bg-green-500 ring-4 ring-green-200;
      }

      &:checked {
        @apply border-green-500 bg-green-500;

        &:hover {
          @apply bg-green-500;
        }
      }
    }

    &-blue {
      @apply border-blue-500 bg-blue-500;

      &:hover {
        @apply border-blue-500;
      }

      &:active {
        @apply border-blue-500 bg-blue-500;
      }

      &:focus {
        @apply border-blue-500 !bg-blue-500 ring-4 ring-blue-200;
      }

      &:checked {
        @apply border-blue-500 bg-blue-500;

        &:hover {
          @apply bg-blue-500;
        }
      }
    }

    &-fuchsia {
      @apply border-fuchsia-500 bg-fuchsia-500;

      &:hover {
        @apply border-fuchsia-500;
      }

      &:active {
        @apply border-fuchsia-500 bg-fuchsia-500;
      }

      &:focus {
        @apply border-fuchsia-500 !bg-fuchsia-500 ring-4 ring-fuchsia-200;
      }

      &:checked {
        @apply border-fuchsia-500 bg-fuchsia-500;

        &:hover {
          @apply bg-fuchsia-500;
        }
      }
    }

    &-violet {
      @apply border-violet-500 bg-violet-500;

      &:hover {
        @apply border-violet-500;
      }

      &:active {
        @apply border-violet-500 bg-violet-500;
      }

      &:focus {
        @apply border-violet-500 !bg-violet-500 ring-4 ring-violet-200;
      }

      &:checked {
        @apply border-violet-500 bg-violet-500;

        &:hover {
          @apply bg-violet-500;
        }
      }
    }

    &-gray {
      @apply border-gray-500 bg-gray-500;

      &:hover {
        @apply border-gray-500;
      }

      &:active {
        @apply border-gray-500 bg-gray-500;
      }

      &:focus {
        @apply border-gray-500 !bg-gray-500 ring-4 ring-gray-200;
      }

      &:checked {
        @apply border-gray-500 bg-gray-500;

        &:hover {
          @apply bg-gray-500;
        }
      }
    }

    &-black {
      @apply border-gray-900 bg-gray-900;

      &:hover {
        @apply border-gray-900;
      }

      &:active {
        @apply border-gray-900 bg-gray-900;
      }

      &:focus {
        @apply border-gray-900 !bg-gray-900 ring-4 ring-gray-200;
      }

      &:checked {
        @apply border-gray-900 bg-gray-900;

        &:hover {
          @apply bg-gray-900;
        }
      }
    }

    &-white {
      @apply border-gray-500 bg-white;
      @apply relative;

      &:hover {
        @apply border-gray-500 !border-opacity-50;
      }

      &:active {
        @apply border-gray-500 bg-white;
      }

      &:focus {
        @apply border-gray-500 !bg-white ring-4 ring-gray-200;
      }

      &:checked {
        @apply border-gray-500 bg-white;

        &::after {
          content: "";
          @apply absolute left-1/2 top-1/2;
          @apply h-2.5 w-2.5;
          @apply rounded-full bg-gray-900;
          transform: translate(-50%, -50%);
        }

        &:hover {
          @apply bg-white;
        }
      }
    }

    &:hover {
      @apply bg-opacity-75 border-opacity-0;
    }
  }
}
</style>
