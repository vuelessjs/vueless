<template>
  <div ref="UTab" class="mono-tab" :class="tabClasses" :data-cy="dataCy" @click="onClickSetValue">
    <!-- @slot Use it to add something instead of label. -->
    <slot>
      {{ label }}
    </slot>
  </div>
</template>

<script>
export default {
  name: "UTab",

  inject: ["setTabsSelectedItem", "getTabsSelectedItem", "getTabsSize"],

  props: {
    /**
     * Set label.
     * @ignore
     */
    label: {
      type: String,
      required: true,
    },

    /**
     * Set component value.
     */
    value: {
      type: String,
      default: "",
    },

    /**
     * Make tab inactive.
     * @ignore
     */
    disabled: {
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

  data: () => ({
    size: "md",
  }),

  computed: {
    tabClasses() {
      const size = `mono-tab-size-${this.size}`;
      const disabled = this.disabled ? "mono-tab-disabled" : "";
      const selected =
        this.getTabsSelectedItem && this.getTabsSelectedItem() === this.value && !this.disabled
          ? "mono-tab-selected"
          : "";

      return [size, disabled, selected];
    },
  },

  mounted() {
    this.size = this.getTabsSize ? this.getTabsSize() : this.size;
  },

  methods: {
    async onClickSetValue() {
      if (!this.disabled) {
        this.setTabsSelectedItem && this.setTabsSelectedItem(this.value);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-tab {
  @apply w-max;
  @apply pb-2;
  @apply text-center;
  @apply cursor-pointer;

  &-selected {
    @apply border-b-2 border-gray-900;
  }

  &-disabled {
    @apply text-gray-500;
  }

  &-size {
    &-sm {
      @apply text-xs;
    }

    &-md {
      @apply text-sm;
    }

    &-lg {
      @apply text-base;
    }
  }
}
</style>
