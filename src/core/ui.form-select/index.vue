<template>
  <div class="mono-select-block">
    <div :id="wrapperId" class="mono-select-wrapper" :class="multiselectClass">
      <label v-if="label" class="label" :class="labelClasses" :for="id">
        {{ label }}
      </label>

      <Multiselect
        :id="id"
        ref="select"
        v-model="selectValue"
        class="mono-select"
        :options="options"
        :options-limit="optionsLimit"
        :label="itemLabel"
        :group-label="groupLabel"
        :group-values="groupValues"
        :track-by="valueKey"
        :open-direction="openDirection"
        select-label=""
        deselect-label=""
        selected-label=""
        :hide-selected="false"
        :disabled="disabled"
        :placeholder="placeholder"
        :allow-empty="false"
        :loading="isLoading"
        :searchable="searchable"
        :data-cy="dataCy"
        :class="hideInactiveElement(modelValue, options)"
        :option-height="optionHeight"
        @open="onOpen"
        @close="onClose"
        @searchChange="onSearchChange"
        @remove="removeValue"
      >
        <template #singleLabel="props">
          <!-- @slot Use it to add single label. -->
          <slot :scope-props="props" name="singleLabel" />
          <span v-if="!isShownSingleLabelSlot" class="mono-select-single-slot">
            {{ props.option[itemLabel] }}
          </span>

          <span>
            <!-- @slot Use it to add after single label. -->
            <slot :scope-props="props" name="singleLabelAfter" />
          </span>
        </template>

        <template #option="props">
          <!-- @slot Use it to add option. -->
          <slot :scope-props="props" name="option" />

          <div v-if="groupValues && !isShownOptionSlot">
            <div v-if="props.option.$groupLabel">
              {{ props.option.$groupLabel }}
            </div>

            <div
              v-else-if="props.option.isSubGroup"
              class="group-label"
              :style="leftMarginForSubCategory(props.option.level)"
            >
              {{ props.option[itemLabel] }}
            </div>

            <div v-else :style="leftMarginForSubCategory(props.option.level)" class="select-label">
              <!-- @slot Use it to add something before option. -->
              <slot :option="props.option" name="beforeOption"></slot>
              {{ props.option[itemLabel] }}
            </div>
          </div>
          <div v-else class="select-label">
            <!-- @slot Use it to add something before option. -->
            <slot :option="props.option" name="beforeOption"></slot>
            {{ props.option[itemLabel] }}
          </div>
        </template>

        <template #noResult>
          {{ ui.i18n.listIsEmpty }}
        </template>

        <template #noOptions>
          {{ ui.i18n.noDataToShow }}
        </template>

        <template #caret="{ toggle }">
          <div class="mono-select-caret-down" @mousedown.prevent.stop="toggle">
            <UIcon
              interactive
              :size="iconSize"
              color="gray"
              name="expand_more"
              class="icon"
              :data-cy="`${dataCy}-caret`"
            />
          </div>

          <div v-if="selectValue && allowEmpty && !disabled" class="mono-select-caret-close">
            <UIcon
              interactive
              :size="iconSize"
              color="gray"
              name="close"
              :data-cy="`${dataCy}-close`"
              @mousedown="[onMousedownRemoveValue(), toggle()]"
            />
          </div>
        </template>

        <template #afterList>
          <div v-if="addOption" class="mono-select-add-wrapper" @click="onClickAddOption">
            <div class="mono-select-add-title">
              {{ ui.i18n.add }}
              <span class="mono-select-add-title-command">{{ addOptionKeyCombination }}</span>
            </div>

            <UButton ref="addOptionButton" class="mono-select-add-button">
              <UIcon name="add" class="mono-select-add-icon" color="white" pill size="2xs" />
            </UButton>
          </div>
        </template>
      </Multiselect>

      <div v-if="isShownAfterCaretSlot" class="after-caret-slot">
        <!-- @slot Use it to add something after caret. -->
        <slot name="after-caret" />
      </div>
    </div>

    <div v-if="description && !error" class="description">
      {{ description }}
    </div>

    <p
      v-if="error && !modelValue.length"
      class="error-message"
      :data-cy="`${dataCy}-error-message`"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { getRandomId, isMac, PX_IN_REM } from "vueless/service.ui";
import debounce from "lodash.debounce";

import UButton from "vueless/ui.button";
import UIcon from "vueless/ui.image-icon";

import defaultConfig from "./configs/default.config";
import { useUI } from "../composable.ui";

export default {
  name: "USelect",
  components: {
    Multiselect,
    UButton,
    UIcon,
  },

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
     * Set component label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Label from option Object, that will be visible in the dropdown.
     */
    itemLabel: {
      type: String,
      default: "label",
    },

    /**
     * Set input placeholder.
     */
    placeholder: {
      type: String,
      default: "",
    },

    /**
     * Set error message.
     */
    error: {
      type: String,
      default: "",
    },

    /**
     * Make input inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Allows clear selected value.
     */
    allowEmpty: {
      type: Boolean,
      default: true,
    },

    /**
     * Set a name of the property containing the group label.
     */
    groupLabel: {
      type: String,
      default: "label",
    },

    /**
     * Set a name of the property containing the group values.
     */
    groupValues: {
      type: String,
      default: "",
    },

    /**
     * Set limits the options displayed in the dropdown to the first X options.
     */
    optionsLimit: {
      type: Number,
      default: 100,
    },

    /**
     * Set track value key.
     */
    valueKey: {
      type: String,
      default: "id",
    },

    /**
     * Fixed opening direction (instead of auto). Options are "above"/"top" or "below"/"bottom".
     * @values auto, top, bottom
     */
    openDirection: {
      type: String,
      default: "auto",
    },

    /**
     * Set description for input.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * Show add new option button to the list.
     */
    addOption: {
      type: Boolean,
      default: false,
    },

    /**
     * Set input size.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Allow search value in list.
     */
    searchable: {
      type: Boolean,
      default: true,
    },

    /**
     * Sets component ui config object.
     */
    config: {
      type: Object,
      default: () => ({}),
    },

    /**
     * Generates unique element id.
     * @ignore
     */
    id: {
      type: String,
      default: () => getRandomId(),
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "open", "addOption", "close", "change", "remove", "searchChange"],

  setup(props) {
    const { ui } = useUI(defaultConfig, props.config);

    console.log("ui", ui);

    return { ui };
  },

  data: () => ({
    isLoading: false,
    isOpen: null,
    isFocused: false,
    optionHeight: 0,
  }),

  computed: {
    wrapperId() {
      return `wrapper${this.id}`;
    },

    multiselectClass() {
      return {
        error: this.error && !this.modelValue.length,
        "mono-select-wrapper-disabled": this.disabled,
        "group-select": this.groupValues,
        "after-caret": this.isShownAfterCaretSlot,
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
      };
    },

    addOptionKeyCombination() {
      return isMac ? "(⌘ + Enter)" : "(Ctrl + Enter)";
    },

    isShownAfterCaretSlot() {
      return !!this.$slots["after-caret"];
    },

    isShownOptionSlot() {
      return !!this.$slots["option"];
    },

    isShownSingleLabelSlot() {
      return !!this.$slots["singleLabel"];
    },

    isShownSingleLabelAfterSlot() {
      return !!this.$slots["singleLabelAfter"];
    },

    labelClasses() {
      return {
        "label-color": this.isOpen,
        "error-label": this.error && !this.modelValue.length,
      };
    },

    selectValue: {
      get() {
        if (this.groupValues) {
          const option = this.options.find((option) => {
            return option[this.groupValues]?.find(
              (item) => item[this.valueKey] === this.modelValue,
            );
          });

          return option?.[this.groupValues].find((option) => option.id === this.modelValue);
        }

        return this.options.find((option) => option[this.valueKey] === this.modelValue);
      },
      set(newItem) {
        this.$emit("update:modelValue", newItem?.[this.valueKey]);
      },
    },

    multiselectContentWrapper() {
      return document.querySelector(`#${this.wrapperId} .multiselect__content-wrapper`);
    },

    iconSize() {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      return sizes[this.size];
    },
  },

  watch: {
    options: {
      handler: "onChangeOptions",
      deep: true,
    },

    isOpen: {
      handler: "onChangeOpenState",
      deep: true,
    },

    selectValue: {
      handler: "onChangeSelectValue",
      deep: true,
    },
  },

  created() {
    if (this.addOption) {
      document.addEventListener("keydown", this.onKeydownAddOption);
    }
  },

  mounted() {
    if (this.addOption) {
      this.multiselectContentWrapper.addEventListener("scroll", this.setAddOptionButtonPosition, {
        passive: true,
      });
    }
  },

  beforeUnmount() {
    if (this.addOption) {
      document.removeEventListener("keydown", this.onKeydownAddOption);

      this.multiselectContentWrapper.removeEventListener("scroll", this.setAddOptionButtonPosition);
    }
  },

  methods: {
    setAddOptionButtonPosition() {
      const scrollBottomPosition = -this.multiselectContentWrapper.scrollTop;
      const defaultButtonPosition = 9;
      const addOptionPosition = (scrollBottomPosition + defaultButtonPosition) / PX_IN_REM;

      this.$refs.addOptionButton.$el.style.bottom = `${addOptionPosition}rem`;
    },

    onOpen() {
      this.$emit("open");
      this.isOpen = true;
      this.isFocused = true;
    },

    onMousedownRemoveValue() {
      this.selectValue = "";
    },

    onKeydownAddOption(event) {
      if (!this.isFocused) return;

      const isEnter = event.keyCode === 13;
      const isCtrl = event.ctrlKey;
      const isMeta = event.metaKey;

      if (isMeta && isEnter && isMac) {
        this.$emit("addOption");
      }

      if (isEnter && isCtrl && !isMac) {
        this.$emit("addOption");
      }
    },

    onClickAddOption() {
      this.$emit("addOption");
    },

    onChangeOptions() {
      const subOptions = document.querySelectorAll(".group-label");

      subOptions.forEach((subOption) => {
        const subOptionsParent = subOption.parentElement.parentElement;

        subOptionsParent.classList.add("multiselect__option", "multiselect__option--disabled");
      });
    },

    onClose() {
      this.isOpen = false;

      setTimeout(() => {
        this.isFocused = false;
      }, 100);

      this.$emit("close");
    },

    onChangeSelectValue() {
      this.$emit("change");
    },

    leftMarginForSubCategory(level) {
      const baseMargin = 1;

      if (level > 1) {
        return `margin-left: ${baseMargin * (level - 1)}rem`;
      }
    },

    removeValue(itemToRemove) {
      this.$emit("remove", itemToRemove);
    },

    onSearchChange: debounce(async function (query) {
      this.$emit("searchChange", query);
    }, 300),

    onChangeOpenState() {
      this.onChangeOptions();

      this.$nextTick(() => {
        this.optionHeight = this.$refs.select
          ? this.$refs.select.$refs.list.firstChild.firstElementChild.clientHeight
          : this.optionHeight;
      });
    },

    hideInactiveElement(id) {
      let selectedId = {};

      if (this.groupValues !== "") {
        this.options.forEach((option) => {
          option[this.groupValues].forEach((item) => {
            if (item.id === id) selectedId = item;
          });
        });
      } else {
        selectedId = this.options.find((item) => item.id === id);
      }

      if (!selectedId) return;

      return selectedId.isHidden ? "cross-out-option" : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-select-block {
  @apply min-w-0;
  @apply relative;
}

.mono-select-wrapper {
  @apply flex w-full items-center;
  @apply box-border rounded-lg border border-gray-300 bg-white;

  &:hover {
    @apply border-gray-400;
    @apply transition duration-100 ease-in-out;
  }

  &:focus-within {
    @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
  }

  .mono-select {
    @apply flex flex-row-reverse justify-between;
    @apply static min-h-full w-full overflow-hidden text-left;

    &-caret-down,
    &-caret-close {
      @apply -mt-1.5 mr-4;
      @apply cursor-pointer;
    }

    &-caret-down {
      @apply scale-125 h-fit;
    }

    &-caret-close {
      @apply mr-1;
    }

    &--active {
      @apply z-[inherit];

      .icon {
        @apply rotate-180 transform transition-all duration-300;
      }
    }

    &.multiselect--above {
      &:deep(.multiselect__content-wrapper) {
        @apply bottom-full top-auto;
      }
    }

    :deep(.multiselect) {
      &__tags {
        @apply rounded-none border-0 bg-transparent;
        @apply min-h-full w-full overflow-hidden;
      }

      &__input {
        @apply font-normal text-gray-900;
        @apply p-0;
        @apply relative inline-block min-h-full w-full align-top;
        @apply border-none bg-white;

        &:focus {
          @apply shadow-none outline-none ring-0;
        }

        &::placeholder {
          @apply font-normal text-gray-400;
        }
      }

      &__placeholder {
        @apply inline-block;
        @apply whitespace-nowrap font-normal text-gray-400;
        @apply mb-0 w-0 pt-px;
      }

      &__content-wrapper {
        @apply rounded-lg border border-gray-300 shadow;
        @apply mb-2 mt-[2.625rem];
        @apply absolute right-0;
        @apply z-50 flex max-h-60 w-full overflow-auto;
        @apply bg-white;
        -webkit-overflow-scrolling: touch;
      }

      &__content {
        @apply inline-block list-none align-top;
        @apply m-0 min-w-full p-0;

        .multiselect__element:first-child {
          .multiselect__option--group {
            @apply !mt-4;
          }
        }
      }

      &__element {
        @apply block;
      }

      &__option {
        @apply whitespace-nowrap text-base font-normal normal-case text-gray-900 no-underline;
        @apply relative block cursor-pointer align-middle;
        @apply px-3 py-2;

        &:hover {
          @apply bg-gray-100;
        }

        &:active,
        &--selected {
          @apply !bg-gray-200 font-medium;
        }

        &:disabled {
          @apply text-gray-900;
        }

        &--highlight {
          @apply bg-gray-100;
        }

        &--disabled {
          @apply pointer-events-none;
        }

        &--group {
          @apply bg-transparent;
          @apply !text-xs font-medium uppercase text-gray-500/[85];
          @apply pb-1 pt-6;
        }
      }

      &__single {
        @apply font-normal text-gray-900;
        @apply mb-px p-0;
        @apply relative inline-block w-full align-top;
        @apply border-none bg-white;
        @apply overflow-hidden text-ellipsis whitespace-nowrap;
      }
    }
  }
}

.mono-select-wrapper-disabled {
  @apply border-gray-100 bg-gray-100 text-gray-900;

  &:hover {
    @apply border-gray-100;
  }

  &:focus-within {
    @apply border-gray-100 ring-0;
  }

  &:deep(.multiselect--disabled) {
    @apply rounded-lg bg-transparent;
    @apply pointer-events-none opacity-100;

    .multiselect__single {
      @apply bg-gray-100;
    }
  }
}

.icon {
  @apply transition-all duration-300;
}

.label {
  @apply absolute left-4 block;
  @apply font-normal text-gray-500;
  @apply z-10;
  @apply w-3/5 overflow-hidden text-ellipsis whitespace-nowrap;

  &-color {
    @apply font-normal text-gray-500;
    z-index: 9999;
  }
}

.select-label {
  @apply flex;
}

.group-label {
  @apply bg-transparent;
  @apply !text-xs font-medium uppercase text-gray-500/[85] pt-1;
}

.size {
  &-sm {
    .group-label {
      @apply !text-2xs;
    }

    > .mono-select {
      @apply pt-5;

      :deep(.multiselect__option) {
        @apply py-2;
      }

      :deep(.multiselect) {
        &__tags {
          @apply mb-px pb-1.5 pl-4 pr-4 pt-1;
        }

        &__content-wrapper {
          @apply mt-[2.375rem];
        }

        &__content {
          .multiselect__element {
            .multiselect__option--group {
              @apply !text-2xs;
              @apply pb-1 mt-4;
            }
          }
        }

        &__input {
          @apply mb-0 pt-0.5 text-sm;

          &::placeholder {
            @apply text-sm font-normal;
            @apply pt-0;
          }
        }

        &__single {
          @apply mt-1 text-sm;
        }

        &__placeholder {
          @apply text-sm min-h-[0.875rem];
        }

        &__option {
          @apply text-sm;
        }
      }
    }

    > .label {
      @apply top-2 text-xs;

      &-color {
        @apply text-xs;
      }
    }
  }

  &-md {
    > .mono-select {
      @apply pt-6;

      :deep(.multiselect) {
        &__tags {
          @apply mb-px pb-2 pl-4 pr-4 pt-1;
        }

        &__input {
          @apply mb-px text-base;

          &::placeholder {
            @apply text-base font-normal;
            @apply pt-px;
          }
        }

        &__single {
          @apply text-base;
        }

        &__placeholder {
          @apply text-base min-h-[1rem];
        }
      }
    }

    > .label {
      @apply top-2.5 text-sm;

      &-color {
        @apply text-sm;
      }
    }
  }

  &-lg {
    .group-label {
      @apply !text-sm;
    }

    > .mono-select {
      @apply pt-7;

      :deep(.multiselect) {
        &__tags {
          @apply mb-px pb-2.5 pl-4 pr-4 pt-1;
        }

        &__content-wrapper {
          @apply mt-[2.875rem];
        }

        &__content {
          .multiselect__element {
            .multiselect__option--group {
              @apply !text-sm;
              @apply pb-1 mt-4;
            }
          }
        }

        .multiselect__option {
          @apply py-4;
        }

        &__input {
          @apply mb-0 pt-0.5 text-lg;

          &::placeholder {
            @apply text-lg font-normal;
            @apply pt-0;
          }
        }

        &__single {
          @apply mt-1 text-lg;
        }

        &__placeholder {
          @apply text-lg min-h-[1.125rem];
        }

        &__option {
          @apply text-lg;
        }
      }
    }

    > .label {
      @apply top-3 text-base;

      &-color {
        @apply text-base;
      }
    }
  }
}

.icon {
  @apply transition-all duration-300;
}

.error {
  @apply border-red-300;

  &:hover {
    @apply border-red-400;
  }

  &:focus-within {
    @apply border-red-500 ring-4 ring-red-100;
  }

  &-label {
    @apply text-red-500;
  }

  &-message {
    @apply text-xs font-normal text-red-500;
    @apply mt-2 pl-4;
  }
}

.description {
  @apply text-xs font-normal text-gray-500/[85];
  @apply pl-4 pt-2;
}

.after-caret {
  @apply flex-col items-start md:flex-row md:items-center;

  .after-caret-slot {
    @apply pb-2.5 pl-4 pr-4 md:pb-0 md:pl-0;
  }
}

.mono-select-add {
  &-wrapper {
    @apply flex items-center justify-between;
    @apply cursor-pointer;
    @apply p-3;

    &:hover {
      @apply bg-gray-100;
    }

    &:active {
      @apply bg-gray-200 font-medium;
    }
  }

  &-title {
    @apply text-base font-medium text-gray-900;

    &-command {
      @apply text-gray-500;
    }
  }

  &-button {
    @apply absolute bottom-[0.5625rem] right-3;
    @apply rounded-full p-0;
  }

  &-icon {
    @apply bg-transparent;
    @apply p-0;

    &:deep(svg) {
      @apply !m-1;
    }
  }
}

.cross-out-option {
  :deep(.multiselect__option--selected) {
    @apply hidden !important;
  }

  :deep(.multiselect-single-slot) {
    @apply !line-through;
  }
}
</style>
