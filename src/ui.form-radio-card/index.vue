<template>
  <div class="mono-radio-card-wrapper" :class="gridColsClass">
    <label
      v-for="(item, index) in options"
      :key="item.value"
      class="mono-radio-card"
      :class="selectedItemClass(item.value)"
      :data-cy="`${dataCy}-item-${index}`"
    >
      <t-radio
        v-model="selectedItem"
        class="mono-radio-card-radio"
        :name="name"
        :value="item.value"
      />

      <div class="mono-radio-card-inner-wrapper">
        <!-- @slot Use it to add icon. -->
        <slot v-if="withIcon" name="icon" :item="item">
          <UIcon :name="item.iconName" size="xl" color="blue" />
        </slot>

        <div class="mono-radio-card-title">{{ item.label }}</div>

        <div class="mono-radio-card-description">{{ item.description }}</div>
      </div>
    </label>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import UIcon from "vueless/ui.image-icon";
import TRadio from "vueless/library.vue-tailwind-3/t-radio";

export default {
  name: "URadioCard",

  components: {
    UIcon,
    TRadio,
  },

  props: {
    /**
     * Set radio card name.
     */
    name: {
      type: String,
      required: true,
      default: "",
    },

    /**
     * Set options for component.
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * Set component value.
     */
    modelValue: {
      type: [String, Number, Boolean],
      default: "",
    },

    /**
     * Set grid cols number.
     */
    gridCols: {
      type: Number,
      default: 2,
    },

    /**
     * Show / hide component icon.
     */
    withIcon: {
      type: Boolean,
      default: true,
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
    ...mapGetters("breakpoint", ["isMobileDevice"]),

    selectedItem: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    gridColsClass() {
      return {
        "grid-cols-1": this.isMobileDevice,
        "grid-cols-2": this.gridCols === 2 && !this.isMobileDevice,
        "grid-cols-3": this.gridCols === 3 && !this.isMobileDevice,
        "grid-cols-4": this.gridCols === 4 && !this.isMobileDevice,
      };
    },
  },

  methods: {
    selectedItemClass(value) {
      return {
        "selected-option": this.selectedItem === value,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-radio-card {
  @apply rounded-lg border border-solid border-gray-300;
  @apply cursor-pointer pb-6 pl-6 pr-6 pt-4;
  @apply relative w-full;

  &-wrapper {
    @apply grid grid-rows-1 gap-4 md:gap-6;
  }

  &:hover {
    @apply border-gray-400;
  }

  &:focus-within {
    @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
  }

  &-radio {
    @apply border border-solid border-gray-300;
    @apply h-6 w-6;
    @apply absolute right-4 top-4;

    &:focus {
      @apply ring-0;
    }

    &:active {
      @apply border-gray-900 bg-gray-900;
    }

    &:checked {
      @apply border-gray-900 bg-gray-900;
    }
  }

  &-wrapper {
    @apply text-center;
  }

  &-title {
    @apply text-base font-normal text-gray-900;
    @apply mb-1 mt-3;
  }

  &-description {
    @apply text-xs font-normal text-gray-500/[85];
  }
}

.selected-option {
  @apply border-gray-500;
}
</style>
