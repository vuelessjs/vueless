<template>
  <div ref="UCheckboxGroup" class="mono-checkbox-group" :data-cy="dataCy">
    <h3 v-if="label" class="label-title" :class="titleClass">{{ label }}</h3>

    <div class="mono-checkbox-group-block">
      <slot>
        <UCheckbox
          v-for="(option, index) in options"
          :key="option.value"
          :data-cy="`${dataCy}-item-${index}`"
          :disabled="disabled"
          :label="option.label"
          :description="option.description"
          :values="{
            select: option.value,
            unselect: false,
          }"
        />
      </slot>
    </div>

    <p v-if="error" class="error-message" :data-cy="`${dataCy}-error-message`">
      {{ error }}
    </p>
  </div>
</template>

<script>
import UCheckbox from "vueless/ui.form-checkbox";

export default {
  name: "UCheckboxGroup",

  components: { UCheckbox },

  provide() {
    return {
      setCheckboxGroupSelectedItems: (value) => {
        this.selectedItems = value;
      },

      getCheckboxGroupSelectedItems: () => {
        return this.selectedItems;
      },

      getCheckboxGroupName: () => {
        return this.name;
      },
    };
  },

  props: {
    /**
     * Set checkbox group label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set checkbox group value.
     */
    modelValue: {
      type: Array,
      default: () => [],
    },

    /**
     * Set options for checkbox group.
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * Make checkbox group inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Set error text.
     */
    error: {
      type: String,
      default: "",
    },

    /**
     * Set the name for checkbox group for each checkbox.
     */
    name: {
      type: String,
      default: "",
    },

    /**
     * Set test dataCy for a checkbox group.
     */
    dataCy: {
      type: String,
      default: "checkbox",
    },
  },

  emits: ["update:modelValue"],

  data: () => ({
    selectedItems: [],
  }),

  computed: {
    titleClass() {
      return {
        "error-title": this.error,
      };
    },

    labelClass() {
      return {
        "label-separated": this.label,
      };
    },
  },

  watch: {
    selectedItems: {
      handler: "onChangeSelectedItems",
      deep: true,
    },
  },

  methods: {
    onChangeSelectedItems() {
      this.$emit("update:modelValue", this.selectedItems);
    },
  },
};
</script>

<style lang="postcss" scoped>
.label {
  @apply block max-w-max;

  &-separated {
    @apply ml-4 mt-4;
  }

  &-title {
    @apply text-sm font-normal text-gray-500;
    @apply mb-6;
  }

  &-box {
    @apply inline-flex;

    &-inner {
      @apply block;
    }
  }
}

.mono-checkbox {
  @apply border border-solid border-gray-300;
  @apply h-6 w-6;

  &:hover {
    @apply border-gray-400;
  }

  &:active {
    @apply border-gray-900 bg-gray-900;
  }

  &:checked {
    @apply border-gray-900 bg-gray-900;
  }

  &:focus {
    @apply border-gray-500 ring-4 ring-gray-200;
  }

  &:disabled {
    @apply border-gray-100 bg-gray-100;
  }

  &-title {
    @apply block cursor-pointer text-base font-medium text-gray-900;
    @apply pl-4 pt-0.5;
  }

  &-description {
    @apply block text-xs font-normal text-gray-500/[85];
    @apply pl-4 pt-1;
  }

  &-group-block {
    @apply ml-4 space-y-4;
  }
}

.error {
  &-title {
    @apply text-red-500;
  }

  &-message {
    @apply text-xs font-normal text-red-500;
    @apply mt-2 pl-4;
  }
}
</style>
