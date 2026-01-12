<script setup lang="ts">
import { watch, computed, useId, ref, useTemplateRef, nextTick } from "vue";
import { isEqual } from "lodash-es";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";
import { isMac } from "../utils/platform";
import { filterOptions, filterGroups } from "./utilListbox";
import { useComponentLocaleMessages } from "../composables/useComponentLocaleMassages";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UDivider from "../ui.container-divider/UDivider.vue";
import UInputSearch from "../ui.form-input-search/UInputSearch.vue";

import usePointer from "./usePointer";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Option, Props, Config, SelectedValue } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  options: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the selected value is changes.
   * @property {string} modelValue
   * @property {number} modelValue
   * @property {object} modelValue
   */
  "update:modelValue",

  /**
   * Triggers when option is added.
   */
  "add",

  /**
   * Triggers on click option.
   */
  "clickOption",

  /**
   * Triggers when the search input value changes.
   * @property {string} value
   */
  "searchChange",

  /**
   * Triggers when the search input loses focus.
   */
  "searchBlur",

  /**
   * Triggers when the search v-model updates.
   * @property {string} query
   */
  "update:search",
]);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const listboxInputRef = useTemplateRef<{ input: HTMLInputElement }>("listbox-input");
const optionsRef = useTemplateRef<HTMLLIElement[]>("option");
const emptyOptionRef = useTemplateRef<HTMLLIElement>("empty-option");
const addOptionRef = useTemplateRef<HTMLLIElement>("add-option");

const wrapperMaxHeight = ref("");

const localSearch = ref(props.search ?? "");

const { pointer, pointerDirty, pointerSet, pointerBackward, pointerForward, pointerReset } =
  usePointer(props.options, optionsRef, wrapperRef);

const elementId = props.id || useId();

const { localeMessages } = useComponentLocaleMessages<typeof defaultConfig.i18n>(
  COMPONENT_NAME,
  defaultConfig.i18n,
  props?.config?.i18n,
);

const searchModel = computed({
  get: () => localSearch.value,
  set: (value: string) => {
    emit("update:search", value);

    localSearch.value = value ?? "";
  },
});

const selectedValue = computed({
  get: () => {
    if (props.multiple && !Array.isArray(props.modelValue)) {
      return props.modelValue ? [props.modelValue] : [];
    }

    return props.modelValue;
  },
  set: (value) => emit("update:modelValue", value),
});

const addOptionKeyCombination = computed(() => {
  return isMac ? "(⌘ + Enter)" : "(Ctrl + Enter)";
});

const listboxAriaMultiselectable = computed(() => props.multiple || undefined);

const listboxAriaActivedescendant = computed(() =>
  pointer.value >= 0 ? `${elementId}-${pointer.value}` : undefined,
);

const getOptionAriaSelected = (option: Option) => {
  if (option && option.groupLabel) return undefined;
  if (option.divider) return undefined;

  return !!isSelectedOption(option);
};

const filteredOptions = computed(() => {
  const normalizedSearch = searchModel.value.toLowerCase().trim();

  let options = [...props.options];

  options = props.groupValueKey
    ? filterGroups(
        options,
        normalizedSearch,
        props.labelKey,
        props.groupValueKey,
        props.groupLabelKey,
      )
    : filterOptions(options, normalizedSearch, props.labelKey);

  return options.slice(0, props.optionsLimit || options.length);
});

watch(
  () => [props.options, props.size, props.visibleOptions, props.searchable, searchModel.value],
  () => {
    nextTick(() => {
      const options = [
        ...(optionsRef.value || []),
        ...(addOptionRef.value ? [addOptionRef.value] : []),
        ...(emptyOptionRef.value ? [emptyOptionRef.value] : []),
      ];

      if (props.visibleOptions) {
        options.slice(0, props.visibleOptions);
      }

      const maxHeight = options
        .slice(0, props.visibleOptions)
        .map((el) => {
          const styles = window.getComputedStyle(el);
          const height = parseFloat(styles.height || "0");
          const marginTop = parseFloat(styles.marginTop || "0");
          const marginBottom = parseFloat(styles.marginBottom || "0");

          return height + marginTop + marginBottom;
        })
        .reduce((acc, cur) => acc + cur, 0);

      const wrapperStyle = getComputedStyle(wrapperRef.value as Element);
      const wrapperPaddingTop = parseFloat(wrapperStyle.paddingTop || "0");
      const wrapperPaddingBottom = parseFloat(wrapperStyle.paddingBottom || "0");
      const wrapperBorderTop = parseFloat(wrapperStyle.borderTopWidth || "0");
      const wrapperBorderBottom = parseFloat(wrapperStyle.borderBottomWidth || "0");
      const wrapperGap = parseFloat(wrapperStyle.gap || "0");

      const addOptionHeight = addOptionRef.value?.getBoundingClientRect().height || 0;

      const inputEl = listboxInputRef.value?.input as HTMLInputElement | undefined;
      let listboxInputHeight = 0;

      let listboxInputWrapperPaddingTop = 0;
      let listboxInputBorderTop = 0;
      let listboxInputBorderBottom = 0;

      if (inputEl) {
        const listboxInputStyle = getComputedStyle(inputEl);
        const listboxInputLabelStyle = inputEl.parentElement
          ? getComputedStyle(inputEl.parentElement)
          : undefined;
        const listboxInputWrapperStyle = getComputedStyle(
          inputEl.parentElement?.parentElement?.parentElement as Element,
        );

        listboxInputHeight = parseFloat(listboxInputStyle.height || "0");

        listboxInputWrapperPaddingTop = parseFloat(listboxInputWrapperStyle.paddingTop || "0");

        listboxInputBorderTop = parseFloat(listboxInputLabelStyle?.borderTop || "0");
        listboxInputBorderBottom = parseFloat(listboxInputLabelStyle?.borderBottom || "0");
      }

      wrapperMaxHeight.value = `${
        maxHeight +
        addOptionHeight +
        (props.searchable ? wrapperGap : 0) +
        wrapperPaddingTop +
        wrapperPaddingBottom +
        wrapperBorderTop +
        wrapperBorderBottom +
        listboxInputHeight +
        listboxInputBorderTop +
        listboxInputBorderBottom +
        listboxInputWrapperPaddingTop
      }px`;
    });
  },
  { immediate: true },
);

watch(
  () => props.multiple,
  (newValue, oldValue) => {
    if (newValue && !oldValue && props.modelValue) {
      selectedValue.value = [props.modelValue as SelectedValue];
    }

    if (newValue && !oldValue && !props.modelValue) {
      selectedValue.value = [];
    }

    const currentSelectedValue = props.modelValue as SelectedValue[];

    if (!newValue && oldValue && currentSelectedValue.length) {
      selectedValue.value = currentSelectedValue[0];
    }

    if (!newValue && oldValue && !currentSelectedValue.length) {
      selectedValue.value = "";
    }
  },
);

function onClickAddOption() {
  emit("add");
}

function onSearchChange(value: string) {
  emit("searchChange", value);
}

function onKeydownUp() {
  wrapperRef.value?.focus();
}

function onKeydownDown() {
  wrapperRef.value?.focus();
}

function isMetaKey(key: string) {
  return ["isSubGroup", "groupLabel", "level", "isHidden", "onClick", "divider"].includes(key);
}

function select(option: Option, keyCode?: string) {
  if (props.disabled || option.disabled || option.groupLabel) {
    return;
  }

  if (keyCode === "Tab" && !pointerDirty.value) return;

  const optionValue = option[props.valueKey] as SelectedValue;

  if (props.valueKey in option && !isMetaKey(props.valueKey) && !props.multiple) {
    selectedValue.value = optionValue;
  }

  if (props.valueKey in option && !isMetaKey(props.valueKey) && props.multiple) {
    const currentSelectedValue = selectedValue.value as SelectedValue[];

    selectedValue.value = !isSelectedOption(option)
      ? [...currentSelectedValue, optionValue]
      : currentSelectedValue.filter((selected) => !isEqual(selected, optionValue));
  }
}

function isSelectedOption(option: Option) {
  if (props.multiple) {
    return (selectedValue.value as SelectedValue[]).find((selected) =>
      isEqual(selected, option[props.valueKey]),
    );
  }

  return isEqual(selectedValue.value, option[props.valueKey]);
}

function getMarginForSubCategory(level: number = 0) {
  const baseMargin = 0.5;

  if (level > 1) {
    return `margin-left: ${baseMargin * (level - 1)}rem`;
  }
}

function getOptionAttrs(option: Option) {
  if (option.disabled) {
    return isSelectedOption(option) ? optionDisabledActiveAttrs.value : optionDisabledAttrs.value;
  }

  return isSelectedOption(option) ? optionActiveAttrs.value : optionAttrs.value;
}

function optionHighlight(index: number, option: Option) {
  const classes = [];

  if (isSelectedOption(option)) {
    classes.push(optionActiveAttrs.value.class);
  }

  if (index === pointer.value && !isSelectedOption(option)) {
    classes.push(optionHighlightedAttrs.value.class);
  }

  return classes;
}

function addPointerElement(keyCode?: string) {
  if (props.options.length > 0) {
    select(props.options[pointer.value], keyCode);
    onClickOption(props.options[pointer.value]);
  }

  pointerReset();
}

function onClickOption(rawOption: Option) {
  const option = { ...rawOption };

  delete option.onClick;

  if (typeof rawOption.onClick === "function") {
    rawOption.onClick(option);
  }

  emit("clickOption", option);
}

function onInputSearchBlur(event: FocusEvent) {
  emit("searchBlur", event);
}

defineExpose({
  /**
   * Current pointer index value.
   * @property {Ref<number>}
   */
  pointer,

  /**
   * Allows setting the pointer to a specific index.
   * @property {Function}
   */
  pointerSet,

  /**
   * Moves the pointer to the previous option in the list.
   * @property {Function}
   */
  pointerBackward,

  /**
   * Advances the pointer to the next option.
   * @property {Function}
   */
  pointerForward,

  /**
   * Resets the pointer to the first option.
   * @property {Function}
   */
  pointerReset,

  /**
   * Adds the current pointer element to the model value.
   * @property {Function}
   */
  addPointerElement,

  /**
   * A reference to the list of elements representing the available options.
   * @property {HTMLElement}
   */
  optionsRef,

  /**
   * A reference to the search input element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  listboxInputRef,

  /**
   * A reference to the wrapper element containing the entire list of options.
   * @property {HTMLElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  listboxInputAttrs,
  listAttrs,
  listItemAttrs,
  addOptionLabelWrapperAttrs,
  addOptionLabelAttrs,
  addOptionLabelHotkeyAttrs,
  addOptionButtonAttrs,
  addOptionIconAttrs,
  optionActiveAttrs,
  optionAttrs,
  subGroupAttrs,
  groupAttrs,
  optionContentAttrs,
  optionDividerAttrs,
  selectedIconAttrs,
  optionHighlightedAttrs,
  optionDisabledAttrs,
  optionDisabledActiveAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div
    ref="wrapper"
    tabindex="1"
    :style="{ maxHeight: wrapperMaxHeight }"
    v-bind="wrapperAttrs"
    :data-test="getDataTest('list')"
    @keydown.self.down.prevent="pointerForward"
    @keydown.self.up.prevent="pointerBackward"
    @keydown.enter.stop.self="addPointerElement('Enter')"
  >
    <UInputSearch
      v-if="searchable"
      :id="elementId"
      ref="listbox-input"
      v-model="searchModel"
      :placeholder="localeMessages.search"
      :size="size"
      :debounce="debounce"
      v-bind="listboxInputAttrs"
      :data-test="getDataTest('search')"
      @blur="onInputSearchBlur"
      @keydown.self.down.prevent="onKeydownDown"
      @keydown.self.up.prevent="onKeydownUp"
      @update:model-value="onSearchChange"
    />

    <ul
      v-bind="listAttrs"
      role="listbox"
      :aria-multiselectable="listboxAriaMultiselectable"
      :aria-activedescendant="listboxAriaActivedescendant"
    >
      <li
        v-for="(option, index) of filteredOptions"
        :key="index"
        v-bind="listItemAttrs"
        ref="option"
        :role="!(option && option.groupLabel) ? 'option' : undefined"
        :aria-selected="getOptionAriaSelected(option)"
        :aria-disabled="Boolean(option.disabled) || undefined"
        :data-group-label="Boolean(option.groupLabel)"
      >
        <UDivider v-if="option.divider" v-bind="optionDividerAttrs" />

        <!-- option title -->
        <span
          v-if="
            !(option && (option.groupLabel || option.isSubGroup)) &&
            !option.isHidden &&
            !option.divider
          "
          v-bind="getOptionAttrs(option)"
          :data-test="getDataTest('option')"
          :class="optionHighlight(index, option)"
          @click="(select(option), onClickOption(option))"
          @mouseenter.self="pointerSet(index)"
        >
          <!--
            @slot Use it to add something before the option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="before-option" :option="option" :index="index" />

          <!--
            @slot Use it to add something instead of the option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="option" :option="option" :index="index">
            <span
              :style="getMarginForSubCategory(option.level)"
              v-bind="optionContentAttrs"
              :title="String(option[labelKey])"
              v-text="option[labelKey]"
            />
          </slot>

          <!--
            @slot Use it to add something after the option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="after-option" :option="option" :index="index">
            <UIcon
              v-if="isSelectedOption(option)"
              color="inherit"
              :name="config.defaults.selectedIcon"
              v-bind="selectedIconAttrs"
            />
          </slot>
        </span>

        <!-- group title -->
        <template v-if="option && (option.groupLabel || option.isSubGroup) && !option.isHidden">
          <div
            v-if="option.groupLabel"
            role="group"
            :aria-label="option.groupLabel"
            v-bind="groupAttrs"
            v-text="option.groupLabel"
          />

          <div
            v-else-if="option.isSubGroup"
            role="group"
            :aria-label="String(option[labelKey])"
            :style="getMarginForSubCategory(option.level)"
            v-bind="subGroupAttrs"
            v-text="option[labelKey]"
          />
        </template>
      </li>

      <li v-if="!filteredOptions.length" ref="empty-option" role="option" v-bind="optionAttrs">
        <!-- @slot Use it to add something instead of empty state. -->
        <slot name="empty">
          <span v-bind="optionContentAttrs" v-text="localeMessages.noDataToShow" />
        </slot>
      </li>

      <!-- Add button -->
      <template v-if="addOption">
        <li
          ref="add-option"
          role="option"
          v-bind="addOptionLabelWrapperAttrs"
          :data-test="getDataTest('add')"
          @click="onClickAddOption"
          @mouseenter.self="pointerSet(filteredOptions.length + 1)"
        >
          <span v-bind="addOptionLabelAttrs">
            {{ localeMessages.add }}
            <span v-bind="addOptionLabelHotkeyAttrs" v-text="addOptionKeyCombination" />
          </span>
        </li>

        <UButton
          round
          square
          v-bind="addOptionButtonAttrs"
          :data-test="getDataTest('add-button')"
          @click="onClickAddOption"
        >
          <UIcon
            color="inherit"
            size="xs"
            :name="config.defaults.addOptionIcon"
            v-bind="addOptionIconAttrs"
          />
        </UButton>
      </template>
    </ul>
  </div>
</template>
