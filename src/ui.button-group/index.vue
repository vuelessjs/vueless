<template>
  <div class="mono-button-group" :class="componentClasses" :data-cy="dataCy">
    <slot>
      <UButtonGroupItem
        v-for="(item, index) in options"
        :key="item.value"
        :value="item.value"
        :size="size"
        :label="item.label"
        :data-cy="`${dataCy}-item-${index}`"
      />
    </slot>
  </div>
</template>

<script>
import UButtonGroupItem from "vueless/ui.button-group-item";

export default {
  name: "UButtonGroup",

  components: { UButtonGroupItem },

  provide() {
    return {
      setButtonGroupSelectedItem: (value) => {
        this.selectedItem = value;
      },

      getButtonGroupName: () => {
        return this.name;
      },

      getButtonGroupSize: () => {
        return this.size;
      },

      getButtonGroupValue: () => {
        return this.selectedItem;
      },
    };
  },

  props: {
    /**
     * Set buttons name.
     */
    name: {
      type: String,
      required: true,
      default: "",
    },

    /**
     * Set data for buttons.
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * Set current value.
     */
    modelValue: {
      type: [String, Number],
      default: "",
    },

    /**
     * The size of the buttons.
     * @values xs ,sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Fit buttons to the parent block.
     */
    wide: {
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

    componentClasses() {
      const wide = this.wide ? "mono-button-group-wide" : "";

      return [wide];
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-button-group {
  @apply flex space-x-px;

  &-wide {
    &:deep(.mono-button-group-item) {
      @apply w-full;

      .label {
        @apply w-full justify-center;
      }
    }
  }

  &:deep(.mono-button-group-item) {
    &:first-child {
      .label {
        @apply rounded-l-lg;
      }
    }

    &:last-child {
      .label {
        @apply rounded-r-lg;
      }
    }
  }

  &:deep(.mono-link-wrapper) {
    .mono-button-group-item {
      .label {
        @apply rounded-none;
      }
    }

    &:first-child {
      .label {
        @apply rounded-l-lg;
      }
    }

    &:last-child {
      .label {
        @apply rounded-r-lg;
      }
    }
  }
}
</style>
