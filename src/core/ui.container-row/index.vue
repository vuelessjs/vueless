<template>
  <div class="mono-row" :class="rowClasses" :data-cy="dataCy">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script>
export default {
  name: "URow",

  props: {
    /**
     * Disables mobile adaptivity.
     */
    noMobile: {
      type: Boolean,
      default: false,
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
    rowClasses() {
      const mobileAdaptivity = this.noMobile ? "mono-row-no-mobile" : "mono-row-mobile";

      return [mobileAdaptivity];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-row {
  @apply flex w-full;

  &-mobile {
    @apply flex-col space-y-4;
    @apply md:flex-row md:space-x-4 md:space-y-0;
  }

  &-no-mobile {
    @apply flex-row space-x-4;
  }
}
</style>
