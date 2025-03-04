<script setup lang="ts">
import { ref, computed, nextTick, watch, useSlots, onMounted, useId } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import useUI from "../composables/useUI.ts";
import { createDebounce, hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";
import { isMac } from "../utils/platform.ts";
import { useMutationObserver } from "../composables/useMutationObserver.ts";

import {
  filterOptions,
  filterGroups,
  removeSelectedValues,
  getCurrentOption,
} from "./utilSelect.ts";
import defaultConfig from "./config.ts";
import { COMPONENT_NAME, DIRECTION, KEYS } from "./constants.ts";

import { useLocale } from "../composables/useLocale.ts";

import type { Option, Config as UDropdownListConfig } from "../ui.dropdown-list/types.ts";
import type { Props, Config } from "./types.ts";
import type { ComponentExposed, KeyAttrsWithConfig } from "../types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: "",
  label: "",
  placeholder: "",
});

const emit = defineEmits([
  /**
   * Triggers when a dropdown list is opened.
   * @property {string} elementId
   */
  "open",

  /**
   * Triggers when a dropdown list is closed.
   * @property {string} elementId
   */
  "close",

  /**
   * Triggers when the search value is changed.
   * @property {string} query
   */
  "searchChange",

  /**
   * Triggers when option is removed.
   * @property {string} option
   */
  "remove",

  /**
   * Triggers when option is selected.
   * @property {string} value
   * @property {number} value
   * @property {Option} value
   */
  "update:modelValue",

  /**
   * Triggers on click on add new option button in the dropdown.
   */
  "add",

  /**
   * Triggers when the user commits the change to options or selected value explicitly.
   */
  "change",
]);

const slots = useSlots();
const { tm } = useLocale();

const isOpen = ref(false);
const preferredOpenDirection = ref(DIRECTION.bottom);
const search = ref("");

const dropdownListRef = ref<ComponentExposed<typeof UDropdownList> | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const labelComponentRef = ref<ComponentExposed<typeof ULabel> | null>(null);
const leftSlotWrapperRef = ref<HTMLSpanElement | null>(null);
const innerWrapperRef = ref<HTMLDivElement | null>(null);

const elementId = props.id || useId();

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config.i18n));

const isTop = computed(() => {
  if (props.openDirection === DIRECTION.top) return true;
  if (props.openDirection === DIRECTION.bottom) return false;

  return preferredOpenDirection.value === DIRECTION.top;
});

const inputPlaceholder = computed(() => {
  const message = currentLocale.value.addMore;

  return props.multiple && localValue.value?.length ? message : props.placeholder;
});

const dropdownValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    let value;

    if (props.multiple) {
      value = Array.isArray(props.modelValue) ? [...props.modelValue, newValue] : [newValue];
    } else {
      value = newValue;
    }

    emit("update:modelValue", value);
    emit("change", { value, options: props.options });
    deactivate();
  },
});

const filteredOptions = computed(() => {
  const normalizedSearch = search.value.toLowerCase().trim() || "";

  let selectedValues: (string | number)[] = [];

  if (Array.isArray(props.modelValue)) {
    selectedValues = props.modelValue.map((value) => {
      if (typeof value === "object") {
        return value[props.valueKey] as string | number;
      }

      return value;
    });
  } else if (props.modelValue) {
    selectedValues =
      typeof props.modelValue === "object"
        ? [props.modelValue[props.valueKey]]
        : [props.modelValue];
  }

  let options = props.multiple
    ? removeSelectedValues(props.options, selectedValues, props.valueKey, props.groupValueKey)
    : [...props.options];

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

const localValue = computed(() => {
  if (!props.multiple) {
    const [singleValue] = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];

    return getCurrentOption(props.options, singleValue, props.valueKey, props.groupValueKey);
  }

  return props.modelValue && Array.isArray(props.modelValue)
    ? props.modelValue.map((value) =>
        getCurrentOption(props.options, value, props.valueKey, props.groupValueKey),
      )
    : [];
});

const isLocalValue = computed(() => {
  const value = localValue.value;

  if (Array.isArray(value)) {
    return !!value.length;
  }

  if (typeof value === "object") {
    return !!Object.keys(value).length;
  }

  return !!String(value);
});

const selectedLabel = computed(() => {
  return isLocalValue.value ? getOptionLabel(localValue.value as Option) : "";
});

const isEmpty = computed(() => {
  return (
    (filteredOptions.value.length === 0 && search) ||
    (props.multiple && localValue.value?.length === props.options.length)
  );
});

const onSearchChange = createDebounce(function (query) {
  emit("searchChange", query);
}, 300);

watch(search, onSearchChange);
watch(localValue, setLabelPosition, { deep: true });

if (props.addOption) {
  document.addEventListener("keydown", onKeydownAddOption);
}

onMounted(setLabelPosition);

function getOptionLabel(option: Option) {
  if (!option) return "";

  return option[props.labelKey] || "";
}

function onKeydownAddOption(event: KeyboardEvent) {
  if (!isOpen.value) return;

  const isEnter = event.key === KEYS.enter;
  const isCtrl = event.ctrlKey;
  const isMeta = event.metaKey;

  if (isMeta && isEnter && isMac) {
    emit("add");
    emit("change", { value: dropdownValue.value, options: props.options });
  }

  if (isEnter && isCtrl && !isMac) {
    emit("add");
    emit("change", { value: dropdownValue.value, options: props.options });
  }
}

function onAddOption() {
  emit("add");
}

function toggle() {
  isOpen.value ? deactivate() : activate();
}

function deactivate() {
  if (!isOpen.value || props.disabled) return;

  props.searchable && searchInputRef.value ? searchInputRef.value.blur() : wrapperRef.value?.blur();

  search.value = "";
  isOpen.value = false;

  nextTick(() => emit("close", localValue.value, elementId));
}

function activate() {
  if (isOpen.value || props.disabled) return;

  adjustPosition();

  isOpen.value = true;

  if (props.searchable) {
    search.value = "";

    nextTick(() => searchInputRef.value && searchInputRef.value.focus());
  }

  if (wrapperRef.value && !props.searchable) {
    wrapperRef.value.focus();
  }

  emit("open", elementId);
}

function adjustPosition() {
  if (typeof window === "undefined" || !dropdownListRef.value || !wrapperRef.value) return;

  const dropdownHeight = dropdownListRef.value.wrapperRef?.getBoundingClientRect().height || 0;
  const spaceAbove = wrapperRef.value.getBoundingClientRect().top;
  const spaceBelow = window.innerHeight - wrapperRef.value.getBoundingClientRect().bottom;
  const hasEnoughSpaceBelow = spaceBelow > dropdownHeight;

  if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || props.openDirection === DIRECTION.bottom) {
    preferredOpenDirection.value = DIRECTION.bottom;
  } else {
    preferredOpenDirection.value = DIRECTION.top;
  }
}

function onMouseDownClearItem(event: MouseEvent, option: Option) {
  if (props.disabled) return;

  const value = Array.isArray(props.modelValue)
    ? [...props.modelValue].filter((item) => {
        if (typeof item === "object") {
          return item[props.valueKey] !== option[props.valueKey];
        }

        return item !== option[props.valueKey];
      })
    : [];

  emit("update:modelValue", value);
  emit("change", { value, options: props.options });
  emit("remove", option);
}

function onMouseDownClear() {
  if (props.disabled) return;

  if (!props.clearable && !props.multiple) {
    deactivate();

    return;
  }

  const value = props.multiple ? [] : "";

  emit("update:modelValue", value);
  emit("change", { value, options: props.options });
  emit("remove", props.options);
}

useMutationObserver(leftSlotWrapperRef, (mutations) => mutations.forEach(setLabelPosition), {
  childList: true,
  characterData: true,
  subtree: true,
});

function setLabelPosition() {
  if (props.labelAlign === "top" || (!hasSlotContent(slots["left"]) && !props.leftIcon)) {
    return;
  }

  if (!leftSlotWrapperRef.value || !innerWrapperRef.value || !labelComponentRef.value) {
    return;
  }

  const leftSlotWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;
  const innerWrapperPaddingLeft = parseInt(
    window.getComputedStyle(innerWrapperRef.value).paddingLeft,
  );

  const nestedLabel = labelComponentRef.value.labelElement;

  if (props.multiple && Array.isArray(localValue.value) && localValue.value.length >= 1) {
    if (nestedLabel) {
      nestedLabel.style.left = `${leftSlotWidth - innerWrapperPaddingLeft}px`;
    }

    leftSlotWrapperRef.value.classList.remove("group-[]/placement-inside:-mt-4");
  } else {
    if (nestedLabel) {
      nestedLabel.style.left = `${leftSlotWidth + innerWrapperPaddingLeft}px`;
    }
  }
}

defineExpose({
  /**
   * A reference to the dropdown list element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  dropdownListRef,

  /**
   * A reference to the wrapper element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  wrapperRef,

  /**
   * A reference to the search input element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  searchInputRef,

  /**
   * A reference to the label component for direct DOM manipulation.
   * @property {HTMLElement}
   */
  labelComponentRef,

  /**
   * A reference to the left slot wrapper element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  leftSlotWrapperRef,

  /**
   * A reference to the inner wrapper element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  innerWrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error) && !props.disabled,
  label: Boolean(props.label),
  /* component state, not a props */
  selected: Boolean(selectedLabel.value),
  opened: isOpen.value,
  openedTop: isTop.value,
}));

const {
  config,
  getDataTest,
  selectLabelAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  leftSlotAttrs,
  rightSlotAttrs,
  leftIconAttrs,
  rightIconAttrs,
  beforeToggleAttrs,
  afterToggleAttrs,
  toggleWrapperAttrs,
  clearAttrs,
  clearMultipleTextAttrs,
  clearMultipleAttrs,
  searchAttrs,
  searchInputAttrs,
  selectedLabelsAttrs,
  selectedLabelAttrs,
  dropdownListAttrs,
  toggleIconAttrs,
  clearIconAttrs,
  clearMultipleIconAttrs,
} = useUI(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    ref="labelComponentRef"
    :for="elementId"
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    centred
    interactive
    v-bind="selectLabelAttrs"
    :data-test="getDataTest()"
    :tabindex="-1"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div
      ref="wrapperRef"
      :tabindex="searchable || disabled ? -1 : 0"
      role="combobox"
      :aria-owns="'listbox-' + elementId"
      v-bind="wrapperAttrs"
      @focus="activate"
      @blur="deactivate"
      @keydown.self.down.prevent="dropdownListRef?.pointerForward"
      @keydown.self.up.prevent="dropdownListRef?.pointerBackward"
      @keydown.enter.tab.stop.self="dropdownListRef?.addPointerElement()"
      @keyup.esc="deactivate"
    >
      <div v-if="hasSlotContent($slots['right']) || rightIcon" v-bind="rightSlotAttrs">
        <!--
            @slot Use it to add something to the right of input.
            @binding {string} icon-name
          -->
        <slot name="right" :icon-name="rightIcon">
          <UIcon v-if="rightIcon" :name="rightIcon" internal v-bind="rightIconAttrs" />
        </slot>
      </div>

      <div
        v-if="hasSlotContent($slots['after-toggle']) && !(multiple && localValue?.length)"
        v-bind="afterToggleAttrs"
        :tabindex="-1"
      >
        <!--
          @slot Use it to add something after toggle.
          @binding {object} option
        -->
        <slot :option="localValue" name="after-toggle" />
      </div>

      <div
        v-show="!multiple || (!isLocalValue && multiple)"
        v-bind="toggleWrapperAttrs"
        :tabindex="-1"
        :data-test="getDataTest('toggle')"
        @mousedown.prevent.stop="toggle"
      >
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {string} icon-name
          @binding {boolean} opened
        -->
        <slot name="toggle" :icon-name="config.defaults.dropdownIcon" :opened="isOpen">
          <UIcon
            internal
            interactive
            color="gray"
            :name="config.defaults.dropdownIcon"
            v-bind="toggleIconAttrs"
            :tabindex="-1"
          />
        </slot>
      </div>

      <div
        v-if="isLocalValue && clearable && !disabled && !multiple"
        v-bind="clearAttrs"
        :data-test="getDataTest('clear')"
        @mousedown="onMouseDownClear"
      >
        <!--
          @slot Use it to add something instead of the clear icon.
          @binding {string} icon-name
        -->
        <slot name="clear" :icon-name="config.defaults.clearIcon">
          <UIcon
            internal
            interactive
            color="gray"
            :name="config.defaults.clearIcon"
            v-bind="clearIconAttrs"
          />
        </slot>
      </div>

      <div
        v-if="hasSlotContent($slots['before-toggle']) && !(multiple && localValue?.length)"
        v-bind="beforeToggleAttrs"
      >
        <!--
          @slot Use it to add something before toggle.
          @binding {object} option
        -->
        <slot :option="localValue" name="before-toggle" />
      </div>

      <div ref="innerWrapperRef" v-bind="innerWrapperAttrs">
        <div v-if="multiple && localValue?.length" v-bind="selectedLabelsAttrs">
          <div
            v-for="item in localValue as Option[]"
            :key="String(item[valueKey])"
            v-bind="selectedLabelAttrs"
          >
            <!--
              @slot Use it to customise selected value label.
              @binding {string} selected-label
              @binding {object} option
            -->
            <slot
              name="selected-label"
              :selected-label="getOptionLabel(item)"
              :value="item[valueKey]"
              :option="item"
            >
              {{ getOptionLabel(item) }}
            </slot>

            <!--
              @slot Use it to add something after selected value label.
              @binding {object} option
            -->
            <slot :option="item" name="selected-label-after" />

            <div
              v-if="!disabled"
              v-bind="clearMultipleAttrs"
              :data-test="getDataTest('clear-item')"
              @mousedown.prevent.capture
              @click.prevent.capture
              @mousedown="onMouseDownClearItem($event, item)"
            >
              <!--
                @slot Use it to add something instead of the clear icon (when multiple prop enabled).
                @binding {string} icon-name
              -->
              <slot name="clear-multiple" :icon-name="config.defaults.clearMultipleIcon">
                <UIcon
                  internal
                  interactive
                  color="gray"
                  :name="config.defaults.clearMultipleIcon"
                  v-bind="clearMultipleIconAttrs"
                />
              </slot>
            </div>
          </div>
        </div>

        <div v-bind="searchAttrs">
          <input
            :id="elementId"
            ref="searchInputRef"
            v-model="search"
            type="text"
            autocomplete="off"
            :spellcheck="false"
            :placeholder="inputPlaceholder"
            :disabled="disabled || !searchable"
            :aria-controls="'listbox-' + elementId"
            v-bind="searchInputAttrs"
            :data-test="getDataTest('search')"
            @focus="activate"
            @blur.prevent="deactivate"
            @keyup.esc="deactivate"
            @keydown.down.prevent="dropdownListRef?.pointerForward"
            @keydown.up.prevent="dropdownListRef?.pointerBackward"
            @keydown.enter.prevent.stop.self="dropdownListRef?.addPointerElement()"
          />
        </div>

        <span
          v-if="!multiple && isLocalValue && ((searchable && !isOpen) || !searchable)"
          v-bind="selectedLabelAttrs"
          @mousedown.prevent="toggle"
        >
          <!--
            @slot Use it to add selected value label.
            @binding {string} selected-label
            @binding {string} value
            @binding {object} option
          -->
          <slot
            name="selected-label"
            :selected-label="selectedLabel"
            :value="(localValue as Option)[valueKey]"
            :option="localValue"
          >
            {{ selectedLabel }}
          </slot>

          <!--
            @slot Use it to add something after selected value label.
            @binding {object} option
          -->
          <slot :option="localValue" name="selected-label-after" />
        </span>

        <div
          v-if="isLocalValue && clearable && !disabled && multiple"
          v-bind="clearMultipleTextAttrs"
          :data-test="getDataTest('clear-all')"
          @mousedown.prevent.capture="onMouseDownClear"
          @click.prevent.capture
          v-text="currentLocale.clear"
        />
      </div>

      <UDropdownList
        v-if="isOpen"
        ref="dropdownListRef"
        v-model="dropdownValue as string | number"
        :options="filteredOptions"
        :disabled="disabled"
        :size="size"
        :visible-options="visibleOptions"
        :value-key="valueKey"
        :label-key="labelKey"
        :add-option="addOption"
        tabindex="-1"
        v-bind="dropdownListAttrs as KeyAttrsWithConfig<UDropdownListConfig>"
        :data-test="getDataTest()"
        @add="onAddOption"
        @focus="activate"
        @mousedown.prevent.capture
        @click.prevent.capture
      >
        <template #before-option="{ option, index }">
          <!--
            @slot Use it to add something before option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="before-option" :option="option" :index="index" />
        </template>

        <template #option="{ option, index }">
          <!--
            @slot Use it to customise the option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="option" :option="option" :index="index" />
        </template>

        <template #after-option="{ option, index }">
          <!--
            @slot Use it to add something after option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="after-option" :option="option" :index="index" />
        </template>

        <template #empty>
          <template v-if="isEmpty">
            {{ currentLocale.listIsEmpty }}
          </template>

          <template v-else>
            {{ currentLocale.noDataToShow }}
          </template>
        </template>
      </UDropdownList>

      <div
        v-if="hasSlotContent($slots['left']) || leftIcon"
        ref="leftSlotWrapperRef"
        v-bind="leftSlotAttrs"
      >
        <!--
            @slot Use it to add something to the left of input.
            @binding {string} icon-name
          -->
        <slot name="left" :icon-name="leftIcon">
          <UIcon v-if="leftIcon" :name="leftIcon" internal v-bind="leftIconAttrs" />
        </slot>
      </div>
    </div>
  </ULabel>
</template>
