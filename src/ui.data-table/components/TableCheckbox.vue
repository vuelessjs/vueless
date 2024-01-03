<template>
  <label class="checkbox-wrap">
    <t-checkbox v-model="selected" :value="value" class="checkbox" :disabled="disabled" />
  </label>
</template>

<script>
import TCheckbox from "vueless/library.vue-tailwind-3/t-checkbox";

export default {
  name: "TableCheckbox",

  components: { TCheckbox },

  props: {
    values: {
      type: Array,
      default: () => [],
    },

    value: {
      type: Number,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:values"],

  computed: {
    selected: {
      get() {
        return this.values;
      },
      set(values) {
        this.$emit("update:values", values);
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.checkbox-wrap {
  @apply flex max-w-max items-center;

  .checkbox {
    @apply border border-solid border-gray-300;
    @apply h-5 w-5;

    &:disabled {
      @apply border-gray-100 bg-gray-100;
    }

    &:hover {
      @apply border-gray-400;
    }

    &:focus {
      @apply border-gray-500 ring-4 ring-gray-200;
    }

    &:active {
      @apply border-gray-900 bg-gray-900;
    }

    &:checked {
      @apply border-gray-900 bg-gray-900;
    }
  }
}
</style>

<!-- Brand theme -->
<style scoped lang="postcss">
.brand-theme {
  &.checkbox-wrap {
    .checkbox {
      @apply border-gray-300;

      &:disabled {
        @apply bg-brand bg-opacity-10;
        @apply border-brand border-opacity-10;
      }

      &:hover {
        @apply border-brand border-opacity-40;
      }

      &:focus {
        @apply border-brand border-opacity-50;
        @apply ring-4 ring-brand ring-opacity-15;
      }

      &:active {
        @apply border-brand bg-brand;
      }

      &:checked {
        @apply border-brand bg-brand;
      }
    }
  }
}
</style>
