<template>
  <div class="mono-checkbox-multistate-wrapper" @click="onClickChangeActiveOption">
    <div class="mono-checkbox-multistate" :class="checkboxClasses">
      <UIcon
        v-if="selectedStateIcon"
        :class="selectedStateIcon"
        :name="selectedStateIcon"
        :size="iconSize"
        color="white"
      />

      <t-checkbox class="mono-checkbox-multistate-input" :value="selectedState" :data-cy="dataCy" />
    </div>

    <label v-if="selectedStateLabel" class="mono-checkbox-multistate-label">
      {{ selectedStateLabel }}
    </label>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";
import TCheckbox from "vueless/library.vue-tailwind-3/t-checkbox";

export default {
  name: "UCheckboxMultiState",

  components: { UIcon, TCheckbox },

  props: {
    /**
     * Set checkbox multi state value.
     */
    modelValue: {
      type: [String, Boolean, Number],
      default: "",
    },

    /**
     * Set options data for component.
     */
    optionsData: {
      type: Array,
      default: () => [
        { code: false, label: "" },
        { code: true, label: "" },
        { code: null, label: "" },
      ],
    },

    /**
     * Set component size.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
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

  data: () => ({
    index: 0,
    selectedState: "",
  }),

  computed: {
    options() {
      const [unSelected, selectedFull, selectedPartially] = this.optionsData;

      return [
        {
          selected: unSelected?.code,
          label: unSelected?.label || "",
        },
        {
          iconName: "check",
          selected: selectedFull?.code,
          label: selectedFull?.label || "",
        },
        {
          iconName: "remove",
          selected: selectedPartially?.code,
          label: selectedPartially?.label || "",
        },
      ];
    },

    checkboxClasses() {
      const checked = this.index > 0 ? "mono-checkbox-multistate-checked" : "";
      const size = `size-${this.size}`;

      return [checked, size];
    },

    selectedStateIcon() {
      return this.options[this.index]?.iconName;
    },

    isCheck() {
      return this.options[this.index]?.iconName === "check";
    },

    iconSize() {
      const size = this.size;
      const check = this.isCheck;
      let iconSize;

      if (!check && size === "lg") {
        iconSize = "md";
      } else if (check && size === "md") {
        iconSize = "xs";
      } else {
        iconSize = "sm";
      }

      return iconSize;
    },

    selectedStateLabel() {
      return this.options[this.index]?.label;
    },
  },

  watch: {
    value: {
      handler: "onChangeValue",
      immediate: true,
    },
  },

  methods: {
    onClickChangeActiveOption() {
      this.index += 1;

      if (this.index >= this.options.length) {
        this.index = 0;
      }

      this.changeSelectedState();
    },

    onChangeValue() {
      this.index = this.options.findIndex((item) => item.selected === this.modelValue);
    },

    changeSelectedState() {
      const activeOption = this.options[this.index];

      this.selectedState = activeOption.selected;

      this.$emit("update:modelValue", this.selectedState);
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-checkbox-multistate {
  &-wrapper {
    @apply flex;
    @apply cursor-pointer;
  }

  @apply flex items-center justify-center;
  @apply rounded border border-solid border-gray-300;
  @apply bg-white;
  @apply relative;

  &:hover {
    @apply border-gray-400;
  }

  &:focus-within {
    @apply border-gray-500 ring-4 ring-gray-200;
  }

  &:active {
    @apply border-gray-900 bg-gray-900;
  }

  &-input {
    @apply opacity-0;
    @apply absolute left-0 top-0;
    @apply h-full w-full;
    @apply cursor-pointer;
  }

  &-checked {
    @apply border-gray-900 bg-gray-900;

    &:hover {
      @apply border-gray-900;
    }
  }

  &-label {
    @apply flex flex-col justify-center;
    @apply text-base font-normal text-gray-900;
    @apply pl-4;
  }
}

.check {
  &:deep(g) {
    @apply stroke-white stroke-[1.75];
  }

  &:deep(polygon) {
    @apply hidden;
  }
}

.size {
  &-sm {
    @apply h-5 w-5;

    & + .multistate-checkbox-label {
      @apply text-sm;
    }
  }

  &-md {
    @apply h-6 w-6;
  }

  &-lg {
    @apply h-7 w-7;

    & + .mono-checkbox-multistate-label {
      @apply text-lg;
    }
  }
}
</style>
