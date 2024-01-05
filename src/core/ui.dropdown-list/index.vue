<template>
  <div class="mono-dropdown-list">
    <template v-if="options.length">
      <div
        v-for="(option, key) of options"
        :key="key"
        class="mono-dropdown-list-option"
        :class="selectedOptionClass(option[valueKey])"
        @click="onClickOption(option[valueKey])"
      >
        {{ option[itemLabel] }}
      </div>
    </template>
    <div v-else class="mono-dropdown-list-plug">{{ i18n.noDataToShow }}</div>
  </div>
</template>

<script>
import I18nServiceDefault from "vueless/service.i18n";

export default {
  name: "UDropdownList",

  props: {
    /**
     * Set input select value.
     */
    modelValue: {
      type: [String, Number],
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
     * Label from option Object, that will be visible in the dropdown.
     */
    itemLabel: {
      type: String,
      default: "label",
    },

    /**
     * Set track value key.
     */
    valueKey: {
      type: String,
      default: "id",
    },
  },

  emits: ["update:modelValue"],

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  computed: {
    selectValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    i18n() {
      return {
        noDataToShow: this.getTranslation("noDataToShow"),
      };
    },
  },

  methods: {
    selectedOptionClass(value) {
      return this.selectValue === value ? "selected" : "";
    },

    onClickOption(value) {
      this.selectValue = value;
    },
  },
};
</script>

<i18n>
en:
  noDataToShow: "No data to show."
ru:
  noDataToShow: "Нет данных."
ua:
  noDataToShow: "Дані відсутні."
</i18n>

<style lang="postcss" scoped>
.mono-dropdown-list {
  &:hover {
    @apply transition duration-100 ease-in-out;
  }

  &-option {
    @apply whitespace-nowrap text-base font-normal normal-case text-gray-900 no-underline;
    @apply min-h-full cursor-pointer align-middle;
    @apply px-3 py-2;

    &:first-child {
      @apply rounded-t-lg;
    }

    &:last-child {
      @apply rounded-b-lg;
    }

    &:hover {
      @apply bg-gray-100;
    }

    &:active,
    &.selected {
      @apply !bg-gray-200 font-medium;
    }
  }

  &-plug {
    @apply whitespace-nowrap text-base font-normal normal-case text-gray-900 no-underline;
    @apply relative block min-h-full cursor-pointer align-middle;
    @apply px-3 py-2;
  }
}
</style>
