<template>
  <t-dropdown
    v-model:show="isShownOptions"
    :classes="dropdownClasses"
    toggle-on-focus
    :data-cy="dataCy"
    class="mono-dropdown-link"
  >
    <template #trigger>
      <div class="mono-dropdown-link-trigger" :class="iconRotateClass">
        <ULink
          ref="dropdown"
          :variant="variant"
          :text="text"
          :size="size"
          :color="color"
          :dashed="dashed"
          :no-focus-ring="noFocusRing"
          :data-cy="`${dataCy}-button`"
          @mousedown="onMousedown"
        />

        <div v-if="dropdownIcon" class="mono-dropdown-link-block">
          <UIcon
            :variant="variant"
            name="expand_more"
            class="icon"
            :color="color"
            :size="iconSize"
            :data-cy="`${dataCy}-caret`"
          />
        </div>
      </div>
    </template>

    <div class="mono-dropdown-link-list">
      <!-- @slot Use it to add dropdown list. -->
      <slot>
        <UDropdownList
          v-model="selectValue"
          :options="options"
          :value-key="valueKey"
          :item-label="itemLabel"
          :data-cy="`${dataCy}-item`"
        />
      </slot>
    </div>
  </t-dropdown>
</template>

<script>
import TDropdown from "vueless/library.vue-tailwind-3/t-dropdown";
import UIcon from "vueless/ui.image-icon";
import ULink from "vueless/ui.button-link";
import UDropdownList from "vueless/ui.dropdown-list";

export default {
  name: "UDropdownLink",

  components: {
    TDropdown,
    UIcon,
    ULink,
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
     * Set button text.
     */
    text: {
      type: String,
      default: "",
    },

    /**
     * The color of the link.
     * @values gray, red, orange, yellow, green, blue, violet, fuchsia, black, white
     */
    color: {
      type: String,
      default: "",
    },

    /**
     * The variant of the link and icon.
     * @values light, default, dark
     */
    variant: {
      type: String,
      default: "default",
    },

    /**
     * The size of the button.
     * @values xs, sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Make a button border dashed.
     */
    dashed: {
      type: Boolean,
      default: undefined,
    },

    /**
     * Makes outline ring during focus inactive.
     */
    noFocusRing: {
      type: Boolean,
      default: false,
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
        xs: "2xs",
        sm: "xs",
        md: "sm",
        lg: "md",
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
        dropdownWrapper: "relative z-10 mb-0 dropdown-list",
        dropdown: `${this.dropdownListYPosition} ${this.dropdownListXPosition} absolute
        rounded-lg shadow bg-white mt-2 dropdown-block`,
        enterClass: "opacity-0 scale-95",
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
    window.addEventListener("click", (event) => this.onClickOutside(event));
  },

  unmounted() {
    window.removeEventListener("click", (event) => this.onClickOutside(event));
  },

  methods: {
    onMousedown() {
      this.isShownOptions = !this.isShownOptions;
    },

    hideOptions() {
      this.isShownOptions = false;
    },

    onClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isShownOptions = false;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-dropdown-link {
  &-block {
    @apply flex items-center;
  }

  &-trigger {
    @apply flex items-center relative space-x-0.5;
  }

  &-list {
    @apply max-h-60 overflow-y-auto overflow-x-hidden md:!w-auto;
    @apply border-gray-300;
    @apply top-3;
  }

  .icon {
    @apply transition-all duration-300 mt-1;
  }

  .icon-rotate {
    .icon {
      @apply rotate-180 transform;
    }
  }

  :deep(.dropdown-list-bottom) {
    &-xs {
      @apply bottom-4;
    }

    &-sm {
      @apply bottom-5;
    }

    &-md {
      @apply bottom-6;
    }

    &-lg {
      @apply bottom-7;
    }
  }
}
</style>
