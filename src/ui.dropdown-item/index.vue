<template>
  <div class="mono-dropdown-item" :data-cy="dataCy" @click="onClick">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "UDropdownItem",

  inject: ["hideDropdownOptions"],

  props: {
    /**
     * Set dropdown item text.
     */
    text: {
      type: String,
      required: true,
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

  methods: {
    onClick() {
      // invokes click event on current item
      this.$emit("click");

      if (this.hideDropdownOptions) this.hideDropdownOptions();
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-dropdown-item {
  @apply whitespace-nowrap text-left text-base font-normal text-gray-900;
  @apply p-3;
  @apply cursor-pointer;

  &:first-child {
    @apply rounded-t-lg;
  }

  &:last-child {
    @apply rounded-b-lg;
  }

  &:hover {
    @apply bg-gray-100;
  }

  &:active {
    @apply bg-gray-200 font-medium;
  }

  &:disabled {
    @apply bg-gray-500;
  }
}
</style>
