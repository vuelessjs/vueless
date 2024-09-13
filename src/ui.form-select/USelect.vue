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
    v-bind="selectLabelAttrs"
    :data-test="dataTest"
    :tabindex="-1"
  >
    <div
      ref="wrapperRef"
      :tabindex="searchable || disabled ? -1 : 0"
      role="combobox"
      :aria-owns="'listbox-' + elementId"
      v-bind="wrapperAttrs"
      @focus="activate"
      @blur="deactivate"
      @keydown.self.down.prevent="dropdownListRef.pointerForward"
      @keydown.self.up.prevent="dropdownListRef.pointerBackward"
      @keydown.enter.tab.stop.self="dropdownListRef.addPointerElement"
      @keyup.esc="deactivate"
    >
      <!-- @slot Use it to add something after input. -->
      <slot name="right" />

      <div v-if="hasSlotContent($slots['right-icon']) || rightIcon" v-bind="rightIconWrapperAttrs">
        <!--
            @slot Use it to add icon after option.
            @binding {string} icon-name
            @binding {string} icon-size
          -->
        <slot name="right-icon" :icon-name="rightIcon" :icon-size="iconSize">
          <UIcon
            v-if="rightIcon"
            :name="rightIcon"
            :size="iconSize"
            internal
            v-bind="rightIconAttrs"
          />
        </slot>
      </div>

      <div
        v-if="hasSlotContent($slots['after-caret']) && !(multiple && localValue.length)"
        v-bind="afterCaretAttrs"
        :tabindex="-1"
      >
        <!--
          @slot Use it to add something after caret.
          @binding {object} scope-props
        -->
        <slot :scope-props="props" name="after-caret" />
      </div>

      <div
        v-show="!multiple || (!isLocalValue && multiple)"
        v-bind="toggleAttrs"
        :tabindex="-1"
        @mousedown.prevent.stop="toggle"
      >
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot
          name="toggle"
          :icon-name="config.defaults.dropdownIcon"
          :icon-size="iconSize"
          :opened="isOpen"
        >
          <UIcon
            internal
            interactive
            color="gray"
            :size="iconSize"
            :name="config.defaults.dropdownIcon"
            v-bind="toggleIconAttrs"
            :tabindex="-1"
          />
        </slot>
      </div>

      <div
        v-if="isLocalValue && !noClear && !disabled && !multiple"
        v-bind="clearAttrs"
        @mousedown="removeElement"
      >
        <!--
          @slot Use it to add something instead of the clear icon.
          @binding {string} icon-name
          @binding {string} icon-size
        -->
        <slot name="clear" :icon-name="config.defaults.clearIcon" :icon-size="iconSize">
          <UIcon
            internal
            interactive
            color="gray"
            :size="iconSize"
            :name="config.defaults.clearIcon"
            v-bind="clearIconAttrs"
          />
        </slot>
      </div>

      <div
        v-if="hasSlotContent($slots['before-caret']) && !(multiple && localValue.length)"
        v-bind="beforeCaretAttrs"
      >
        <!--
          @slot Use it to add something before caret.
          @binding {object} scope-props
        -->
        <slot :scope-props="props" name="before-caret" />
      </div>

      <div ref="innerWrapperRef" v-bind="innerWrapperAttrs">
        <span
          v-if="hasSlotContent($slots['left-icon']) || leftIcon"
          ref="leftSlotWrapperRef"
          v-bind="leftIconWrapperAttrs"
        >
          <!--
            @slot Use it to add icon before option.
            @binding {string} icon-name
            @binding {string} icon-size
          -->
          <slot name="left-icon" :icon-name="leftIcon" :icon-size="iconSize">
            <UIcon
              v-if="leftIcon"
              :name="leftIcon"
              :size="iconSize"
              internal
              v-bind="leftIconAttrs"
            />
          </slot>
        </span>

        <span v-if="hasSlotContent($slots['left'])" ref="leftSlotWrapperRef">
          <!-- @slot Use it to add something before input. -->
          <slot name="left" />
        </span>

        <div v-if="multiple && localValue.length" v-bind="selectedLabelsAttrs">
          <span v-for="item in localValue" :key="item[valueKey]" v-bind="selectedLabelAttrs">
            <!--
              @slot Use it to add selected value label.
              @binding {string} selected-label
            -->
            <slot
              name="selected-label"
              :selected-label="getOptionLabel(item)"
              :value="item[valueKey]"
              :raw-option="item"
            >
              {{ getOptionLabel(item) }}
            </slot>

            <!--
              @slot Use it to add something after selected value label.
              @binding {object} scope-props
            -->
            <slot :scope-props="props" name="selected-label-after" />

            <div
              v-if="!disabled"
              v-bind="clearMultipleAttrs"
              @mousedown.prevent.capture
              @click.prevent.capture
              @mousedown="removeElement(item)"
            >
              <!--
                @slot Use it to add something instead of the clear icon (when multiple prop enabled).
                @binding {string} icon-name
                @binding {string} icon-size
              -->
              <slot
                name="clear-multiple"
                :icon-name="config.defaults.clearMultipleIcon"
                :icon-size="iconSize"
              >
                <UIcon
                  internal
                  interactive
                  color="gray"
                  :size="iconSize"
                  :name="config.defaults.clearMultipleIcon"
                  v-bind="clearMultipleIconAttrs"
                />
              </slot>
            </div>
          </span>
        </div>

        <div v-bind="searchAttrs">
          <input
            v-show="searchable || !localValue || multiple || !isOpen"
            :id="elementId"
            ref="searchInputRef"
            v-model="search"
            type="text"
            autocomplete="off"
            :spellcheck="false"
            :placeholder="inputPlaceholder"
            :value="search"
            :disabled="disabled"
            :aria-controls="'listbox-' + elementId"
            v-bind="searchInputAttrs"
            @focus="activate"
            @blur.prevent="deactivate"
            @keyup.esc="deactivate"
            @keydown.down.prevent="dropdownListRef.pointerForward"
            @keydown.up.prevent="dropdownListRef.pointerBackward"
            @keydown.enter.prevent.stop.self="dropdownListRef.addPointerElement"
          />
        </div>

        <span
          v-if="isSelectedValueLabelVisible"
          v-bind="selectedLabelAttrs"
          @mousedown.prevent="toggle"
        >
          <!--
            @slot Use it to add selected value label.
            @binding {string} selected-label
            @binding {string} value
          -->
          <slot name="selected-label" :selected-label="selectedLabel" :value="localValue[valueKey]">
            {{ selectedLabel }}
          </slot>

          <!--
            @slot Use it to add something after selected value label.
            @binding {object} scope-props
          -->
          <slot :scope-props="props" name="selected-label-after" />
        </span>

        <div
          v-if="isLocalValue && !noClear && !disabled && multiple"
          v-bind="clearMultipleTextAllAttrs"
          @mousedown.prevent.capture="removeElement(localValue)"
          @click.prevent.capture
          v-text="currentLocale.clear"
        />
      </div>

      <UDropdownList
        v-if="isOpen"
        ref="dropdownListRef"
        v-model="dropdownValue"
        :options="filteredOptions"
        :disabled="disabled"
        :size="size"
        :visible-options="visibleOptions"
        :value-key="valueKey"
        :label-key="labelKey"
        :add-option="addOption"
        tabindex="-1"
        v-bind="dropdownListAttrs"
        @focus="activate"
        @add-option="onAddOption"
        @mousedown.prevent.capture
        @click.prevent.capture
      >
        <template #before-option="{ option, index }">
          <!--
            @slot Use it to add something before option.
            @binding {other} option
          -->
          <slot name="before-option" :option="option" :index="index" />
        </template>

        <template #option="{ option, index }">
          <!--
            @slot Use it to add something instead of option.
            @binding {other} option
            @binding {number} index
          -->
          <slot name="option" :option="option" :index="index" />
        </template>

        <template #after-option="{ option, index }">
          <!--
            @slot Use it to add something after option.
            @binding {other} option
          -->
          <slot name="after-option" :option="option" :index="index" />
        </template>

        <template #empty="{ emptyStyles }">
          <span v-show="isEmpty" :class="emptyStyles" v-text="currentLocale.listIsEmpty" />
          <span
            v-show="options.length === 0 && !search && !isEmpty"
            :class="emptyStyles"
            v-text="currentLocale.noDataToShow"
          />
        </template>
      </UDropdownList>
    </div>
  </ULabel>
</template>

<script setup>
import { ref, computed, nextTick, watch, useSlots, onMounted, useId } from "vue";
import { debounce, merge } from "lodash-es";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";
import { getDefault } from "../utils/utilUI.js";
import { isMac } from "../utils/utilPlatform.js";

import SelectService from "./utilSelect.js";
import useAttrs from "./useAttrs.js";
import defaultConfig from "./config.js";
import { USelect, DIRECTION, KEY_CODES } from "./constants.js";

import { useLocale } from "../composables/useLocale.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Select value.
   */
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },

  /**
   * Select options.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Select label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set label placement related from the default slot.
   * @values top, topInside, topWithDesc, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, USelect).labelAlign,
  },

  /**
   * Select placeholder.
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Select description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Select error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Select size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, USelect).size,
  },

  /**
   * Left side icon name.
   */
  leftIcon: {
    type: String,
    default: "",
  },

  /**
   * Right side icon name.
   */
  rightIcon: {
    type: String,
    default: "",
  },

  /**
   * Select open direction.
   * @values auto, top, bottom
   */
  openDirection: {
    type: String,
    default: getDefault(defaultConfig, USelect).openDirection,
  },

  /**
   * Label key in the item object of options.
   */
  labelKey: {
    type: String,
    default: getDefault(defaultConfig, USelect).labelKey,
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: getDefault(defaultConfig, USelect).valueKey,
  },

  /**
   * Set a name of the property containing the group label.
   */
  groupLabelKey: {
    type: String,
    default: "label",
  },

  /**
   * Set a name of the property containing the group values.
   */
  groupValueKey: {
    type: String,
    default: "",
  },

  /**
   * Number of options displayed in the dropdown.
   */
  optionsLimit: {
    type: Number,
    default: getDefault(defaultConfig, USelect).optionsLimit,
  },

  /**
   * Amount of options you can see without scroll.
   */
  visibleOptions: {
    type: Number,
    default: getDefault(defaultConfig, USelect).visibleOptions,
  },

  /**
   * Allow clearing selected value.
   */
  noClear: {
    type: Boolean,
    default: getDefault(defaultConfig, USelect).noClear,
  },

  /**
   * Allows multiple selection.
   */
  multiple: {
    type: Boolean,
    default: getDefault(defaultConfig, USelect).multiple,
  },

  /**
   * Allows to search value in a list.
   */
  searchable: {
    type: Boolean,
    default: getDefault(defaultConfig, USelect).searchable,
  },

  /**
   * Disable the select.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, USelect).disabled,
  },

  /**
   * Show "Add new option" button in the list.
   */
  addOption: {
    type: Boolean,
    default: getDefault(defaultConfig, USelect).addOption,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when dropdown list is opened.
   * @property {string} propsId
   */
  "open",

  /**
   * Triggers when dropdown list is closed.
   * @property {string} propsId
   */
  "close",

  /**
   * Triggers when the input value is changed.
   */
  "searchChange",

  /**
   * Triggers when option is removed.
   * @property {string} option
   * @property {string} propsId
   */
  "remove",

  /**
   * Triggers when option is selected.
   * @property {number} value
   */
  "update:modelValue",

  /**
   * Triggers when dropdown options list is updated.
   */
  "addOption",

  /**
   * Triggers when label position is changed.
   */
  "change",
]);

const slots = useSlots();
const { tm } = useLocale();

const isOpen = ref(false);
const preferredOpenDirection = ref(DIRECTION.bottom);
const search = ref("");

const dropdownListRef = ref(null);
const wrapperRef = ref(null);
const searchInputRef = ref(null);
const labelComponentRef = ref(null);
const leftSlotWrapperRef = ref(null);
const innerWrapperRef = ref(null);

defineExpose({
  dropdownListRef,
  wrapperRef,
  searchInputRef,
  labelComponentRef,
  leftSlotWrapperRef,
  innerWrapperRef,
});

const isTop = computed(() => {
  if (props.openDirection === DIRECTION.top) return true;
  if (props.openDirection === DIRECTION.bottom) return false;

  return preferredOpenDirection.value === DIRECTION.top;
});

const selectedLabel = computed(() => {
  return isLocalValue.value ? getOptionLabel(localValue.value) : "";
});

const elementId = props.id || useId();

const {
  config,
  hasSlotContent,
  selectLabelAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  leftIconWrapperAttrs,
  rightIconWrapperAttrs,
  leftIconAttrs,
  rightIconAttrs,
  beforeCaretAttrs,
  afterCaretAttrs,
  toggleAttrs,
  clearAttrs,
  clearMultipleTextAllAttrs,
  clearMultipleAttrs,
  searchAttrs,
  searchInputAttrs,
  selectedLabelsAttrs,
  selectedLabelAttrs,
  dropdownListAttrs,
  toggleIconAttrs,
  clearIconAttrs,
  clearMultipleIconAttrs,
} = useAttrs(props, { isTop, isOpen, selectedLabel });

const i18nGlobal = tm(USelect);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const inputPlaceholder = computed(() => {
  const message = currentLocale.value.addMore;

  return props.multiple && localValue.value.length ? message : props.placeholder;
});

const dropdownValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    let value = newValue;

    if (props.multiple) {
      value = Array.isArray(props.modelValue) ? [...props.modelValue, newValue] : [newValue];
    }

    emit("update:modelValue", value);
    deactivate();
  },
});

const isSelectedValueLabelVisible = computed(() => {
  return !props.multiple && isLocalValue.value && (!isOpen.value || !props.searchable);
});

const filteredOptions = computed(() => {
  const normalizedSearch = search.value.toLowerCase().trim();

  let options = props.multiple
    ? SelectService.removeSelectedValues(
        props.options,
        props.groupValueKey,
        props.valueKey,
        props.modelValue,
      )
    : [...props.options];

  if (!normalizedSearch) {
    return options.slice(0, props.optionsLimit || options.length);
  }

  options = props.groupValueKey
    ? filterAndFlat(options, normalizedSearch, props.labelKey)
    : SelectService.filterOptions(options, normalizedSearch, props.labelKey);

  return options.slice(0, props.optionsLimit || options.length);
});

const localValue = computed(() => {
  if (!props.multiple) {
    return SelectService.getCurrentOption(
      props.modelValue,
      props.options,
      props.groupValueKey,
      props.valueKey,
    );
  }

  return props.modelValue
    ? props.modelValue.map((item) =>
        SelectService.getCurrentOption(item, props.options, props.groupValueKey, props.valueKey),
      )
    : [];
});

const isEmpty = computed(() => {
  return (
    (filteredOptions.value.length === 0 && search) ||
    (props.multiple && localValue.value.length === props.options.length)
  );
});

const isLocalValue = computed(() => {
  if (props.multiple) return Boolean(localValue.value.length);

  return typeof localValue.value !== "number"
    ? Boolean(localValue.value)
    : Boolean(String(localValue.value));
});

watch(search, () => onSearchChange);
watch(
  localValue,
  () => {
    setLabelPosition();
    emit("change");
  },
  { deep: true },
);

if (props.addOption) {
  document.addEventListener("keydown", onKeydownAddOption);
}

onMounted(setLabelPosition);

const onSearchChange = debounce(async function (query) {
  emit("searchChange", query);
}, 300);

function getOptionLabel(option) {
  if (!option) return "";

  return option[props.labelKey] || "";
}

function onKeydownAddOption(event) {
  if (!isOpen.value) return;

  const isEnter = event.keyCode === KEY_CODES.enter;
  const isCtrl = event.ctrlKey;
  const isMeta = event.metaKey;

  if (isMeta && isEnter && isMac) {
    emit("addOption");
  }

  if (isEnter && isCtrl && !isMac) {
    emit("addOption");
  }
}

function onAddOption() {
  emit("addOption");
}

function filterAndFlat(options, search, label) {
  const filteredGroups = SelectService.filterGroups(
    options,
    search,
    label,
    props.groupValueKey,
    props.groupLabelKey,
  );

  return SelectService.flattenOptions(filteredGroups, props.groupValueKey, props.groupLabelKey);
}

function toggle() {
  isOpen.value ? deactivate() : activate();
}

function deactivate() {
  if (!isOpen.value || props.disabled) return;

  props.searchable && searchInputRef.value ? searchInputRef.value.blur() : wrapperRef.value?.blur();

  search.value = "";
  isOpen.value = false;

  nextTick(() => emit("close", localValue.value, props.id));
}

function activate() {
  if (props.isOpen || props.disabled) return;

  adjustPosition();

  isOpen.value = true;

  if (props.searchable) {
    search.value = "";

    nextTick(() => searchInputRef.value && searchInputRef.value.focus());
  }

  if (wrapperRef.value !== undefined && !props.searchable) wrapperRef.value.focus();

  emit("open", props.id);
}

function adjustPosition() {
  if (typeof window === "undefined" || !dropdownListRef.value) return;

  const dropdownHeight = dropdownListRef.value.wrapperRef.getBoundingClientRect().height;
  const spaceAbove = wrapperRef.value.getBoundingClientRect().top;
  const spaceBelow = window.innerHeight - wrapperRef.value.getBoundingClientRect().bottom;
  const hasEnoughSpaceBelow = spaceBelow > dropdownHeight;

  if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || props.openDirection === DIRECTION.bottom) {
    preferredOpenDirection.value = DIRECTION.bottom;
  } else {
    preferredOpenDirection.value = DIRECTION.top;
  }
}

function removeElement(option, shouldClose = true) {
  if (props.disabled) return;

  if (props.noClear && !props.multiple) {
    deactivate();

    return;
  }

  let value = "";

  if (props.multiple) {
    value = !Array.isArray(option)
      ? [...props.modelValue].filter((item) => item !== option[props.valueKey])
      : [];
  }

  emit("update:modelValue", value);
  emit("remove", option, props.id);

  if (shouldClose) {
    deactivate();
  }
}

function setLabelPosition() {
  if (
    props.labelAlign === "top" ||
    !hasSlotContent(slots["left"]) ||
    (!hasSlotContent(slots["left-icon"]) && !props.leftIcon)
  ) {
    return;
  }

  const leftSlotWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;
  const innerWrapperPaddingLeft = parseInt(
    window.getComputedStyle(innerWrapperRef.value).paddingLeft,
  );

  if (props.multiple && localValue.value.length >= 1) {
    labelComponentRef.value.labelElement.style.left = `${leftSlotWidth - innerWrapperPaddingLeft}px`;
    leftSlotWrapperRef.value.classList.remove("group-[]/placement-inside:-mt-4");
  } else {
    labelComponentRef.value.labelElement.style.left = `${leftSlotWidth + innerWrapperPaddingLeft}px`;
  }
}
</script>
