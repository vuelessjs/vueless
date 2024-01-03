<template>
  <div
    :id="id"
    class="date-input"
    tabindex="1"
    :data-cy="dataCy"
    @click="onClickRangeSet"
    @blur="onBlur"
  >
    <div>
      <div class="date-input-label">{{ label }}</div>

      <div class="date-input-value">{{ modelValue }}</div>

      <div v-if="!modelValue" class="date-input-placeholder">{{ placeholder }}</div>
    </div>

    <div @click.stop>
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },

    modelValue: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },

    id: {
      type: String,
      default: "",
    },

    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["clickRangeSet", "blur"],

  methods: {
    onClickRangeSet() {
      this.$emit("clickRangeSet");
    },

    onBlur() {
      this.$emit("blur");
    },
  },
};
</script>

<style lang="postcss" scoped>
.date {
  &-input {
    @apply flex flex-col max-md:gap-3 md:flex-row md:items-center md:justify-between;
    @apply relative cursor-text;
    @apply rounded-lg border border-gray-300 bg-white;
    @apply px-4 py-2.5;

    &:hover {
      @apply border-gray-400;
    }

    &:focus {
      @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
    }

    &:focus-within {
      @apply outline-0;
    }

    &-value {
      @apply text-base font-normal text-gray-900;
    }

    &-placeholder {
      @apply text-base font-normal text-gray-400;
    }

    &-label {
      @apply pb-0.5;
      @apply text-sm font-normal text-gray-500;
    }
  }
}
</style>
