<template>
  <ULabel
    ref="labelComponentRef"
    :for="id"
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="labelAttrs"
  >
    <div
      ref="wrapperRef"
      :tabindex="searchable ? -1 : 0"
      role="combobox"
      :aria-owns="'listbox-' + id"
      v-bind="wrapperAttrs"
      @focus="activate"
      @blur="deactivate"
      @keydown.self.down.prevent="dropdownListRef.pointerForward"
      @keydown.self.up.prevent="dropdownListRef.pointerBackward"
      @keydown.enter.tab.stop.self="dropdownListRef.addPointerElement"
      @keyup.esc="deactivate"
    >
      <div
        v-if="hasSlotContent($slots['after-caret']) && !(multiple && localValue.length)"
        v-bind="afterCaretSlotAttrs"
      >
        <!-- @slot Use it to add something after caret. -->
        <slot :scope-props="props" name="after-caret" />
      </div>

      <div
        v-show="!multiple || (!isLocalValue && multiple)"
        v-bind="caretToggleAttrs"
        @mousedown.prevent.stop="toggle"
      >
        <UIcon
          interactive
          color="gray"
          :size="size"
          :name="config.iconToggleName"
          v-bind="iconToggleAttrs"
        />
      </div>

      <div
        v-if="hasSlotContent($slots['before-caret']) && !(multiple && localValue.length)"
        v-bind="beforeCaretSlotAttrs"
      >
        <!-- @slot Use it to add something after caret. -->
        <slot :scope-props="props" name="before-caret" />
      </div>

      <div v-if="isLocalValue && !noClear && !disabled && !multiple" v-bind="caretClearAttrs">
        <UIcon
          interactive
          color="gray"
          :size="size"
          :name="config.iconClearName"
          v-bind="iconClearAttrs"
          @mousedown="removeElement"
        />
      </div>

      <div ref="innerWrapperRef" v-bind="innerWrapperAttrs">
        <div v-if="multiple" v-bind="selectedLabelsAttrs">
          <span v-for="item in localValue" :key="item[valueKey]" v-bind="selectedLabelAttrs">
            <!-- @slot Use it to add selected value label. -->
            <slot
              name="selected-label"
              :selected-label="getOptionLabel(item)"
              :value="item[valueKey]"
              :raw-option="item"
            >
              {{ getOptionLabel(item) }}
            </slot>

            <!-- @slot Use it to add selected value label. -->
            <slot :scope-props="props" name="selected-label-after" />

            <div
              v-if="!disabled"
              v-bind="caretRemoveItemAttrs"
              @mousedown.prevent.capture
              @click.prevent.capture
            >
              <UIcon
                interactive
                color="gray"
                :size="size"
                :name="config.iconRemoveItemName"
                v-bind="iconRemoveItemAttrs"
                @mousedown="removeElement(item)"
              />
            </div>
          </span>
        </div>

        <div v-bind="searchAttrs">
          <span
            v-if="hasSlotContent($slots['left'])"
            ref="leftSlotWrapperRef"
            v-bind="leftSlotAttrs"
          >
            <!-- @slot Use it to add some component before text. -->
            <slot name="left" />
          </span>

          <input
            v-show="searchable || !localValue || multiple || !isOpen"
            :id="id"
            ref="searchInputRef"
            v-model="search"
            :name="name"
            type="text"
            autocomplete="off"
            :spellcheck="false"
            :placeholder="inputPlaceholder"
            :value="search"
            :disabled="disabled"
            :aria-controls="'listbox-' + id"
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
          <!-- @slot Use it to add selected value label. -->
          <slot name="selected-label" :selected-label="selectedLabel" :value="localValue[valueKey]">
            {{ selectedLabel }}
          </slot>

          <!-- @slot Use it to add selected value label. -->
          <slot :scope-props="props" name="selected-label-after" />
        </span>

        <div
          v-if="isLocalValue && !noClear && !disabled && multiple"
          v-bind="caretClearTextAttrs"
          @mousedown.prevent.capture="removeElement(localValue)"
          @click.prevent.capture
          v-text="currentLocale.clear"
        />
      </div>

      <UDropdownList
        v-show="isOpen"
        ref="dropdownListRef"
        v-model="dropdownValue"
        :options="filteredOptions"
        :disabled
        :size
        :max-height="optimizedHeight"
        :option-height="optionHeight"
        :value-key
        :label-key
        :add-option
        tabindex="-1"
        v-bind="dropdownListAttrs"
        @focus="activate"
        @addOption="onAddOption"
        @mousedown.prevent.capture
        @click.prevent.capture
      >
        <template #before-option="{ option }">
          <!-- @slot Use it to add something before option. -->
          <slot :option="option" name="before-option" />
        </template>

        <template #option="{ option, index }">
          <slot name="option" :option="option" :index="index" />
        </template>

        <template #after-option="{ option }">
          <!-- @slot Use it to add something after option. -->
          <slot :option="option" name="after-option" />
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
import { ref, computed, nextTick, watch, useSlots, onMounted } from "vue";
import { debounce, merge } from "lodash-es";

import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";
import UDropdownList from "../ui.dropdown-list";
import UIService, { getRandomId, isMac } from "../service.ui";

import SelectService from "./services/select.service";
import useAttrs from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";
import { USelect, DIRECTION, KEY_CODES } from "./constants";

import { useLocale } from "../composable.locale";

/* Should be a string for correct web-types gen */
defineOptions({ name: "USelect", inheritAttrs: false });

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
   * @values top, topInside, topWithDesc, bottom, left, right
   */
  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, USelect).default.labelAlign,
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
    default: UIService.get(defaultConfig, USelect).default.size,
  },

  /**
   * Select open direction.
   * @values auto, top, bottom
   */
  openDirection: {
    type: String,
    default: UIService.get(defaultConfig, USelect).default.openDirection,
  },

  /**
   * Label key in the item object of options.
   */
  labelKey: {
    type: String,
    default: UIService.get(defaultConfig, USelect).default.labelKey,
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: UIService.get(defaultConfig, USelect).default.valueKey,
  },

  /**
   * Set a name of the property containing the group label.
   */
  // TODO: groupLabelKey ???
  groupLabel: {
    type: String,
    default: "label",
  },

  /**
   * Set a name of the property containing the group values.
   */
  // TODO: groupValueKey ???
  groupValues: {
    type: String,
    default: "",
  },

  /**
   * name attribute to match optional label element.
   */
  // TODO: what is it?
  name: {
    type: String,
    default: "",
  },

  /**
   * Number of options displayed in the dropdown.
   */
  optionsLimit: {
    type: Number,
    default: UIService.get(defaultConfig, USelect).default.optionsLimit,
  },

  /**
   * Sets maxHeight style value of the dropdown
   */
  // TODO: Should be in option amount not in pixels (option may have be different height)
  maxHeight: {
    type: Number,
    default: UIService.get(defaultConfig, USelect).default.maxHeight,
  },

  // TODO: there is no desc
  optionHeight: {
    type: Number,
    default: UIService.get(defaultConfig, USelect).default.optionHeight,
  },

  /**
   * Allow clearing selected value.
   */
  noClear: {
    type: Boolean,
    default: UIService.get(defaultConfig, USelect).default.noClear,
  },

  /**
   * Allows multiple selection.
   */
  multiple: {
    type: Boolean,
    default: UIService.get(defaultConfig, USelect).default.multiple,
  },

  /**
   * Allows to search value in a list.
   */
  searchable: {
    type: Boolean,
    default: UIService.get(defaultConfig, USelect).default.searchable,
  },

  /**
   * Disable the select.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, USelect).default.disabled,
  },

  /**
   * Show "Add new option" button in the list.
   */
  addOption: {
    type: Boolean,
    default: UIService.get(defaultConfig, USelect).default.addOption,
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
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "open",
  "close",
  "searchChange",
  "remove",
  "update:modelValue",
  "select",
  "addOption",
  "change",
]);

const slots = useSlots();
const { tm } = useLocale();

const isOpen = ref(false);
const preferredOpenDirection = ref(DIRECTION.bottom);
const search = ref("");
const optimizedHeight = ref(props.maxHeight);

const dropdownListRef = ref(null);
const wrapperRef = ref(null);
const searchInputRef = ref(null);
const labelComponentRef = ref(null);
const leftSlotWrapperRef = ref(null);
const innerWrapperRef = ref(null);

const isTop = computed(() => {
  if (props.openDirection === DIRECTION.top) return true;
  if (props.openDirection === DIRECTION.bottom) return false;

  return preferredOpenDirection.value === DIRECTION.top;
});

const selectedLabel = computed(() => {
  return isLocalValue.value ? getOptionLabel(localValue.value) : "";
});

const {
  config,
  hasSlotContent,
  labelAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  leftSlotAttrs,
  beforeCaretSlotAttrs,
  afterCaretSlotAttrs,
  caretToggleAttrs,
  iconToggleAttrs,
  caretClearAttrs,
  caretClearTextAttrs,
  iconClearAttrs,
  caretRemoveItemAttrs,
  iconRemoveItemAttrs,
  searchAttrs,
  searchInputAttrs,
  selectedLabelsAttrs,
  selectedLabelAttrs,
  dropdownListAttrs,
} = useAttrs(props, { isTop, isOpen, selectedLabel });

const currentLocale = computed(() => merge(tm("USelect"), props.config.i18n));

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
        props.groupValues,
        props.valueKey,
        props.modelValue,
      )
    : [...props.options];

  options = props.groupValues
    ? filterAndFlat(options, normalizedSearch, props.labelKey)
    : SelectService.filterOptions(options, normalizedSearch, props.labelKey);

  return options.slice(0, props.optionsLimit);
});

const localValue = computed(() => {
  if (!props.multiple) {
    return SelectService.getCurrentOption(
      props.modelValue,
      props.options,
      props.groupValues,
      props.valueKey,
    );
  }

  return props.modelValue
    ? props.modelValue.map((item) =>
        SelectService.getCurrentOption(item, props.options, props.groupValues, props.valueKey),
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
  if (option.$isLabel) return option.$groupLabel;

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
    props.groupValues,
    props.groupLabel,
  );

  return SelectService.flattenOptions(filteredGroups, props.groupValues, props.groupLabel);
}

function toggle() {
  isOpen.value ? deactivate() : activate();
}

function deactivate() {
  if (!isOpen.value) return;

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
  if (typeof window === "undefined") return;

  const spaceAbove = wrapperRef.value.getBoundingClientRect().top;
  const spaceBelow = window.innerHeight - wrapperRef.value.getBoundingClientRect().bottom;
  const hasEnoughSpaceBelow = spaceBelow > props.maxHeight;

  if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || props.openDirection === DIRECTION.bottom) {
    preferredOpenDirection.value = DIRECTION.bottom;
    // TODO: magic numbers
    optimizedHeight.value = Math.min(spaceBelow - 40, props.maxHeight);
  } else {
    preferredOpenDirection.value = DIRECTION.top;
    optimizedHeight.value = Math.min(spaceAbove - 40, props.maxHeight);
  }
}

function removeElement(option, shouldClose = true) {
  if (props.disabled) return;
  if (option.$isDisabled) return;

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
  if (props.labelOutside || !hasSlotContent(slots["left"])) return;

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
