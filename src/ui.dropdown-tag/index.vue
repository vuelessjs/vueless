<template>
  <t-dropdown
    v-model:show="isShownOptions"
    :classes="dropdownClasses"
    toggle-on-focus
    :data-cy="dataCy"
    class="mono-dropdown-tag"
  >
    <template #trigger>
      <div class="relative" :class="iconRotateClass">
        <UTag class="tag" :text="text" :color="color" @mousedown="onMousedown">
          <template #right>
            <UIcon
              v-if="dropdownIcon"
              name="keyboard_arrow_down"
              class="icon"
              :color="color"
              :size="iconSize"
              :data-cy="`${dataCy}-caret`"
            />
          </template>
        </UTag>
      </div>
    </template>

    <div class="mono-dropdown-tag-list">
      <!-- @slot Use it to add dropdown list. -->
      <slot>
        <UDropdownList
          v-model="selectValue"
          :options="options"
          :value-key="valueKey"
          :item-label="itemLabel"
        />
      </slot>
    </div>
  </t-dropdown>
</template>

<script>
import TDropdown from "vueless/library.vue-tailwind-3/t-dropdown";
import UIcon from "vueless/ui.image-icon";
import UTag from "vueless/ui.text-tag";
import UDropdownList from "vueless/ui.dropdown-list";

export default {
  name: "UDropdownTag",

  components: {
    TDropdown,
    UIcon,
    UTag,
    UDropdownList,
  },

  provide() {
    return {
      hideDropdownOptions: () => {
        this.hideOptions();
      },
    };
  },

  props: {
    /**
     * Set tag text.
     */
    text: {
      type: String,
      default: "",
    },

    /**
     * The color of the tag.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia
     */
    color: {
      type: String,
      default: "blue",
    },

    /**
     * The size of the tag.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Make the dropdown icon visible.
     */
    dropdownIcon: {
      type: Boolean,
      default: true,
    },

    /**
     * Set select value.
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

    /**
     * The position of dropdown list on the y-axis.
     * @values top, bottom
     */
    listYPosition: {
      type: String,
      default: "bottom",
    },

    /**
     * The position of dropdown list on the x-axis.
     * @values left, right
     */
    listXPosition: {
      type: String,
      default: "left",
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
    isShownOptions: false,
  }),

  computed: {
    selectValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.isShownOptions = false;
        this.$emit("update:modelValue", value);
      },
    },

    dropdownListYPosition() {
      return this.listYPosition === "bottom" ? "top-0" : `dropdown-list-bottom-${this.size}`;
    },

    dropdownListXPosition() {
      return this.listXPosition === "right" ? "right-0" : "left-0";
    },

    iconRotateClass() {
      return this.isShownOptions ? "icon-rotate" : "";
    },

    iconSize() {
      const sizes = {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      };

      return sizes[this.size];
    },

    dropdownClasses() {
      return {
        button: `block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border
          border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2
          focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50
          disabled:cursor-not-allowed`,
        wrapper: "inline-flex flex-col",
        dropdownWrapper: "relative z-10 mb-0 dropdown-wrapper-list",
        dropdown: `${this.dropdownListYPosition} ${this.dropdownListXPosition} absolute
        rounded-lg shadow bg-white mt-2 dropdown-block`,
        enterFromClass: "opacity-0 scale-95",
        enterActiveClass: "transition transform ease-out duration-100",
        enterToClass: "opacity-100 scale-100",
        leaveFromClass: "opacity-100 scale-100",
        leaveActiveClass: "transition transform ease-in duration-75",
        leaveToClass: "opacity-0 scale-95",
      };
    },
  },

  watch: {
    modelValue: {
      handler: "hideOptions",
    },
  },

  created() {
    window.addEventListener("click", (event) => this.closeOptions(event));
  },

  unmounted() {
    window.removeEventListener("click", (event) => this.closeOptions(event));
  },

  methods: {
    onMousedown() {
      this.isShownOptions = !this.isShownOptions;
    },

    closeOptions(event) {
      if (!this.$el.contains(event.target)) {
        this.isShownOptions = false;
      }
    },

    hideOptions() {
      this.isShownOptions = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-dropdown-tag {
  .tag {
    @apply cursor-pointer;
  }

  .icon {
    @apply transition-all duration-300;
  }

  .icon-rotate {
    .icon {
      @apply rotate-180 transform;
    }
  }

  &-list {
    @apply max-h-60 overflow-y-auto overflow-x-hidden md:!w-auto;
    @apply border-gray-300;
    @apply top-3;
  }

  :deep(.dropdown-list-bottom) {
    &-sm {
      @apply bottom-[1.625rem];
    }

    &-md {
      @apply bottom-7;
    }

    &-lg {
      @apply bottom-8;
    }
  }
}
</style>
