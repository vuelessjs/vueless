<template>
  <label ref="inputCheckbox" class="mono-checkbox-wrapper">
    <t-checkbox
      v-model="selected"
      class="mono-checkbox"
      :class="checkboxSizeClass"
      :disabled="disabled"
      :value="values.select"
      :unchecked-value="values.unselect"
      :name="checkboxName"
      :data-cy="dataCy"
    />

    <UIcon
      v-if="isShownPartialIcon"
      name="remove"
      :size="size"
      class="mono-checkbox-partial-icon"
      color="white"
    />

    <div>
      <span v-if="label" class="label">
        {{ label }}
      </span>

      <!-- @slot Use it to add some description. -->
      <div v-if="isShownDescription" class="mono-checkbox-description">
        <slot name="description" :description="description">
          <span>{{ description }}</span>
        </slot>
      </div>
    </div>
  </label>
</template>

<script>
import TCheckbox from "vueless/library.vue-tailwind-3/t-checkbox";
import UIcon from "vueless/ui.image-icon";

export default {
  name: "UCheckbox",

  components: { UIcon, TCheckbox },

  inject: {
    setCheckboxGroupSelectedItems: { default: null },
    getCheckboxGroupSelectedItems: { default: null },
    getCheckboxGroupName: { default: null },
  },

  props: {
    /**
     * Set checkbox value.
     */
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },

    /**
     * Set own values for checkbox states (selected | unselected).
     */
    values: {
      type: Object,
      default: () => ({
        select: true,
        unselect: false,
      }),
    },

    /**
     * Set checkbox label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set checkbox size.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set description.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * Make checkbox inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Make checkbox partially selected (change the selected tick to a minus).
     */
    partial: {
      type: Boolean,
      default: false,
    },

    /**
     * Set the name for checkbox.
     */
    name: {
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

  emits: ["update:modelValue", "input"],

  data() {
    return {
      checkboxName: "",
    };
  },

  computed: {
    selected: {
      get() {
        const { select, unselect } = this.values;

        return this.modelValue === select ? select : unselect;
      },
      set(value) {
        if (this.isCheckboxInGroup) {
          const selectedItems = this.getCheckboxGroupSelectedItems();

          if (!value) {
            const checkboxIndex = selectedItems.findIndex((item) => item === this.values.select);

            selectedItems.splice(checkboxIndex, 1);
          } else {
            selectedItems.push(value);
          }

          this.setCheckboxGroupSelectedItems(selectedItems);
        } else {
          this.$emit("update:modelValue", value);
          this.$emit("input", value);
        }
      },
    },

    isCheckboxInGroup() {
      return !!this.getCheckboxGroupName;
    },

    isShownDescription() {
      return this.description || !!this.$slots["description"];
    },

    checkboxSizeClass() {
      return {
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
        "mono-checkbox-with-label": !!this.label,
      };
    },

    isShownPartialIcon() {
      const { select } = this.values;

      return this.partial && this.selected === select;
    },
  },

  mounted() {
    this.checkboxName = this.isCheckboxInGroup ? this.getCheckboxGroupName() : this.name;
  },
};
</script>

<style lang="postcss" scoped>
.mono-checkbox-wrapper {
  @apply flex max-w-max items-center;
  @apply relative;

  .mono-checkbox {
    @apply border border-solid border-gray-300;

    &-with-label {
      @apply mr-4;
    }

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

    &-partial-icon {
      @apply absolute rounded bg-gray-900;
    }

    &-description {
      @apply text-xs font-normal text-gray-500/[85];
      @apply pt-1;
    }
  }

  .label {
    @apply text-base font-normal text-gray-900;
  }
}

.size {
  &-sm {
    @apply h-5 w-5;

    & + .label {
      @apply text-sm;
    }
  }

  &-md {
    @apply h-6 w-6;
  }

  &-lg {
    @apply h-7 w-7;

    & + .label {
      @apply text-lg;
    }
  }
}
</style>

<!-- Brand theme -->
<style scoped lang="postcss">
.brand-theme {
  &.mono-checkbox-wrapper {
    .mono-checkbox {
      @apply border border-solid border-gray-300;

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

    .label {
      @apply text-sm font-normal text-gray-900;
      @apply ml-4;
    }
  }
}
</style>
