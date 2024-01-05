<template>
  <div class="mono-multiselect-block">
    <div :id="wrapperId" class="mono-multiselect-wrapper" :class="multiselectClass">
      <label class="mono-multiselect-label" :class="labelClasses" :for="id">
        {{ label }}
      </label>

      <Multiselect
        :id="id"
        ref="multiselect"
        v-model="selectValue"
        class="mono-multiselect"
        :options="withInternalSearch ? options : asyncOptions"
        :options-limit="optionsLimit"
        :multiple="true"
        :label="itemLabel"
        :track-by="valueKey"
        :open-direction="openDirection"
        select-label=""
        deselect-label=""
        selected-label=""
        hide-selected
        :group-label="groupLabel"
        :group-values="groupValues"
        :disabled="disabled"
        :placeholder="placeholderState"
        :allow-empty="allowEmpty"
        :internal-search="withInternalSearch"
        :loading="isLoading"
        :taggable="true"
        :tag-position="tagPosition"
        :data-cy="dataCy"
        tag-placeholder=""
        :searchable="searchable"
        :option-height="optionHeight"
        @open="onOpen"
        @close="onClose"
        @searchChange="onSearchChange"
      >
        <template #selection="{ values }">
          <div class="tags">
            <div v-for="(tag, index) in values" :key="index" class="tags-wrapper">
              <div
                class="tags-title"
                :data-cy="`${dataCy}-item-${index}`"
                :class="hideInactiveElement(tag)"
              >
                <!-- @slot Use it to add tag title. -->
                <slot name="tag-title" :tag="tag">
                  {{ tag[itemLabel] }}
                </slot>
              </div>

              <UIcon
                v-if="!disabled"
                size="sm"
                name="close"
                interactive
                color="gray"
                :data-cy="`${dataCy}-close`"
                @click="onClickRemoveValue(index)"
              />
            </div>
          </div>
        </template>

        <template #noResult>
          {{ ui.i18n.listIsEmpty }}
        </template>

        <template #noOptions>
          {{ ui.i18n.noDataToShow }}
        </template>

        <template #afterList>
          <li v-if="isSelectedAllOptions" class="multiselect__element">
            <span class="multiselect__option">
              {{ ui.i18n.listIsEmpty }}
            </span>
          </li>

          <div v-if="addOption" class="mono-multiselect-add-wrapper" @click="onClickAddOption">
            <div class="mono-multiselect-add-title">
              {{ ui.i18n.add }}
              <span class="mono-multiselect-add-title-command">{{ addOptionKeyCombination }}</span>
            </div>

            <UButton ref="addOptionButton" class="mono-multiselect-add-button">
              <UIcon name="add" class="mono-multiselect-add-icon" color="white" pill size="2xs" />
            </UButton>
          </div>
        </template>

        <template #caret="{ toggle }">
          <div
            v-show="!selectValue.length"
            class="mono-multiselect-angle"
            @mousedown.prevent.stop="toggle"
          >
            <UIcon
              color="gray"
              name="expand_more"
              class="icon"
              interactive
              :data-cy="`${dataCy}-caret`"
            />
          </div>

          <div v-if="selectValue.length" class="mono-multiselect-clear" @click="onClickClearAll">
            <div class="mono-multiselect-clear-text">
              {{ ui.i18n.clear }}
            </div>
          </div>
        </template>

        <template #option="props">
          <!-- @slot Use it to add option. -->
          <slot :scope-props="props" name="option" />

          <div v-if="groupValues && !hasSlotContent($slots['option'])">
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
      </Multiselect>

      <div v-if="hasSlotContent($slots['after-caret'])" class="after-caret">
        <!-- @slot Use it to add something after caret. -->
        <slot name="after-caret" />
      </div>
    </div>

    <template v-if="description">
      <div class="description">
        {{ description }}
      </div>
    </template>

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
import { getRandomId, isMac, PX_IN_REM } from "vueless/service.ui";
import debounce from "lodash.debounce";

import Multiselect from "vue-multiselect";
import UButton from "vueless/ui.button";
import UIcon from "vueless/ui.image-icon";

import defaultConfig from "./configs/default.config";
import { useUI } from "../composable.ui";

const OPTIONS_LIMIT = 50;

export default {
  name: "UMultiselect",

  components: {
    Multiselect,
    UButton,
    UIcon,
  },

  props: {
    /**
     * Generates unique element id.
     * @ignore
     */
    id: {
      type: String,
      default: () => getRandomId(),
    },

    /**
     * Set component select value.
     */
    modelValue: {
      type: Array,
      default: () => [],
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
     * Make component inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Allows removing all selected values. Otherwise, one must be left selected.
     */
    allowEmpty: {
      type: Boolean,
      default: true,
    },

    /**
     * Allow internal search.
     */
    withInternalSearch: {
      type: Boolean,
      default: true,
    },

    /**
     * Set limits the options displayed in the dropdown to the first X options.
     */
    optionsLimit: {
      type: Number,
      default: OPTIONS_LIMIT,
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
     * Set description for component.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * By default new tags will appear above the search results. Changing to 'bottom' will revert this behaviour and will proritize the search results.
     * @values top, bottom
     */
    tagPosition: {
      type: String,
      default: "top",
    },

    /**
     * Allow return full value properties.
     */
    returnFullValue: {
      type: Boolean,
      default: false,
    },

    /**
     * Set the name of the property containing the group label.
     */
    groupLabel: {
      type: String,
      default: "label",
    },

    /**
     * Set the name of the property containing the group values.
     */
    groupValues: {
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
     * Allow search value in a list.
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
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "open", "addOption", "searchChange"],

  setup(props) {
    const { ui, hasSlotContent } = useUI(defaultConfig, props.config);

    return { ui, hasSlotContent };
  },

  data: () => ({
    isLoading: false,
    asyncValue: "",
    asyncOptions: [],
    isOpen: null,
    isFocused: false,
    optionHeight: 0,
  }),

  computed: {
    wrapperId() {
      return `wrapper${this.id}`;
    },

    selectValue: {
      get() {
        return this.modelValue
          .map((item) => {
            if (this.groupValues) {
              const options = this.options.find((option) => {
                return option[this.groupValues].find((value) => {
                  return value[this.valueKey] === item;
                });
              });

              return options[this.groupValues].find((value) => {
                return value[this.valueKey] === item;
              });
            }

            const value = item?.[this.valueKey] || item;

            return this.options.find((option) => option[this.valueKey] === value);
          })
          .filter((value) => value);
      },

      set(value) {
        let newValue = value;

        if (!this.returnFullValue) newValue = value.map((item) => item[this.valueKey]);

        this.$emit("update:modelValue", newValue);
      },
    },

    multiselectClass() {
      return {
        error: this.error && !this.modelValue.length,
        "mono-multiselect-wrapper-disabled": this.disabled,
        "group-select": this.groupValues,
      };
    },

    addOptionKeyCombination() {
      return isMac ? "(⌘ + Enter)" : "(Ctrl + Enter)";
    },

    isSelectedAllOptions() {
      return this.options.length && this.options.length === this.selectValue.length;
    },

    labelClasses() {
      return {
        "label-color": this.isOpen,
        "error-label": this.error && !this.modelValue.length,
      };
    },

    placeholderState() {
      return this.selectValue.length ? this.ui.i18n.addMore : this.placeholder;
    },

    multiselectContentWrapper() {
      return document.querySelector(`#${this.wrapperId} .multiselect__content-wrapper`);
    },
  },

  watch: {
    resetAsync() {
      this.asyncValue = "";
      this.asyncOptions = [];
    },

    isOpen: {
      handler: "onChangeOpenState",
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
      this.$nextTick(() => {
        this.multiselectContentWrapper.addEventListener("scroll", this.setAddOptionButtonPosition, {
          passive: true,
        });
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

    onOpen() {
      this.$emit("open");
      this.isOpen = true;
      this.isFocused = true;
    },

    onClose() {
      this.isOpen = false;

      setTimeout(() => {
        this.isFocused = false;
      }, 100);
    },

    onClickRemoveValue(index) {
      const intermediateValue = [...this.selectValue];

      intermediateValue.splice(index, 1);

      this.selectValue = intermediateValue;
    },

    onClickClearAll() {
      this.selectValue = [];
    },

    onSearchChange: debounce(async function (query) {
      this.$emit("searchChange", query);
    }, 300),

    onChangeOpenState() {
      this.$nextTick(() => {
        this.optionHeight =
          this.$refs.multiselect.$refs.list.firstChild.firstElementChild.clientHeight;
      });
    },

    hideInactiveElement(tag) {
      const selectedId = this.options.find((option) => option.id === tag.id);

      if (!selectedId) return;

      return selectedId.isHidden ? "cross-out-option" : "";
    },

    leftMarginForSubCategory(level) {
      const baseMargin = 1;

      if (level > 1) {
        return `margin-left: ${baseMargin * (level - 1)}rem`;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-multiselect {
  &-block {
    @apply relative w-full;
  }

  &-wrapper {
    @apply flex w-full items-center;
    @apply rounded-lg border border-gray-300 bg-white;

    &-disabled {
      @apply border-gray-100 bg-gray-100;

      &:hover {
        @apply border-gray-100;
      }

      &:focus-within {
        @apply border-gray-100 ring-0;
      }
    }

    &:hover {
      @apply border-gray-400;
      @apply transition duration-100 ease-in-out;
    }

    &:focus-within {
      @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
    }

    :deep(.multiselect) {
      @apply flex flex-row-reverse justify-between;
      @apply static min-h-full w-full overflow-hidden text-left;
      @apply pt-6;
    }

    :deep(.multiselect__tags) {
      @apply rounded-none border-0 bg-transparent;
      @apply mb-px pb-3 pl-4 pr-4 pt-1;
      @apply min-h-full w-full;
    }

    :deep(.multiselect__input) {
      @apply text-base font-normal text-gray-900;
      @apply !relative block !w-full align-top;
      @apply mb-0 !pb-0 !pl-0 !pr-10 !pt-px;
      @apply rounded-none border-none bg-white;

      &:focus {
        @apply shadow-none outline-none ring-0;
      }

      &::placeholder {
        @apply font-normal text-gray-400;
      }
    }

    :deep(.multiselect__placeholder) {
      @apply hidden;
    }

    :deep(.multiselect--disabled) {
      @apply rounded-lg bg-transparent;
      @apply opacity-100;
      @apply pointer-events-none;
    }

    :deep(.multiselect__content-wrapper) {
      @apply my-2;
      @apply rounded-lg border border-gray-300 shadow;
      @apply absolute right-0 top-full;
      @apply z-50 block max-h-60 w-full overflow-auto;
      @apply bg-white;
      -webkit-overflow-scrolling: touch;
    }

    :deep(.multiselect__content) {
      @apply inline-block list-none align-top;
      @apply m-0 min-w-full p-0;
    }

    :deep(.multiselect--above) {
      .multiselect__content-wrapper {
        @apply !bottom-full top-auto;
      }
    }

    :deep(.multiselect__element) {
      @apply block;
    }

    :deep(.multiselect__option) {
      @apply whitespace-nowrap text-base font-normal normal-case text-gray-900 no-underline;
      @apply relative block cursor-pointer align-middle;
      @apply px-3 py-2;

      &:hover {
        @apply bg-gray-100;
      }

      &:active {
        @apply bg-gray-200 font-medium;
      }

      &:disabled {
        @apply text-gray-500;
      }
    }

    :deep(.multiselect__option--selected) {
      @apply bg-gray-200 font-medium;

      &:hover {
        @apply bg-gray-200 font-medium;
      }
    }

    :deep(.multiselect__option--highlight) {
      @apply bg-gray-100;
    }

    :deep(.multiselect--disabled) {
      .multiselect__input {
        @apply !bg-gray-100;
      }

      .multiselect__single {
        @apply font-normal text-gray-900;
        @apply mb-px p-0;
        @apply relative inline-block w-full align-top;
        @apply border-none bg-gray-100;
      }
    }
  }

  &-angle {
    @apply -mt-[0.188rem] mr-4 scale-125;
    @apply cursor-pointer;
  }

  &--active .icon {
    @apply rotate-180 transform transition-all duration-300;
  }

  &-clear {
    @apply absolute bottom-3.5  pr-4;
    @apply z-10 cursor-pointer;

    &-text {
      @apply transition-all duration-100 ease-in-out;
      @apply text-sm font-normal text-gray-400;

      &:hover {
        @apply text-gray-500;
      }
    }

    &:active {
      @apply text-gray-700;
    }
  }

  .tags {
    &-wrapper {
      @apply flex items-center justify-between;
      @apply border border-l-0 border-r-0 border-t-0 border-gray-100;
      @apply py-3;

      &:last-child {
        @apply mb-2.5;
      }
    }

    &-title {
      @apply text-base font-normal text-gray-900;
      @apply overflow-hidden text-ellipsis whitespace-nowrap;
    }
  }
}

.select-label {
  @apply flex;
}

.icon {
  @apply transition-all duration-300;
}

.mono-multiselect-label {
  @apply absolute left-4 top-2.5 block;
  @apply text-sm font-normal text-gray-500;
  @apply z-10;

  &-color {
    @apply text-sm font-normal text-gray-500;
    z-index: 9999;
  }
}

.description {
  @apply text-xs font-normal text-gray-500/[85];
  @apply pl-4 pt-2;
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

.after-caret {
  @apply pr-4;
}

.group-select:deep(.multiselect__option--group) {
  @apply !bg-transparent;
  @apply !text-xs !font-medium uppercase !text-gray-500/[85] pb-1 mt-4;
}

.group-label {
  @apply text-xs font-medium uppercase text-gray-500/[85];
}

.mono-multiselect-add {
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
  @apply line-through;
}
</style>
