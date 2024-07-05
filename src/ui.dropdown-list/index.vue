<template>
  <div
    ref="wrapperRef"
    tabindex="1"
    :style="{ maxHeight: wrapperHeight }"
    v-bind="wrapperAttrs"
    @keydown.self.down.prevent="pointerForward"
    @keydown.self.up.prevent="pointerBackward"
    @keydown.enter.tab.stop.self="addPointerElement"
  >
    <ul :id="`listbox-${id}`" v-bind="listAttrs" role="listbox">
      <li
        v-for="(option, index) of options"
        :id="`${id}-${index}`"
        :key="index"
        v-bind="optionItemAttrs"
        ref="optionsRef"
        :role="!(option && option.groupLabel) ? 'option' : null"
        :data-group-label="Boolean(option.groupLabel)"
      >
        <!-- option title -->
        <span
          v-if="!(option && (option.groupLabel || option.isSubGroup)) && !option.isHidden"
          v-bind="optionAttrs(optionHighlight(index, option))"
          @click.stop="select(option)"
          @mouseenter.self="pointerSet(index)"
        >
          <!-- @slot Use it to add something before option. -->
          <slot :option="option" name="before-option" />

          <slot name="option" :option="option" :index="index">
            <span
              :style="getMarginForSubCategory(option.level)"
              v-bind="optionContentAttrs"
              v-text="option[labelKey]"
            />
          </slot>

          <!-- @slot Use it to add something after option. -->
          <slot :option="option" name="after-option" />
        </span>

        <!-- group title -->
        <div v-if="option && (option.groupLabel || option.isSubGroup) && !option.isHidden">
          <div v-if="option.groupLabel" v-bind="groupLabelAttrs" v-text="option.groupLabel" />

          <div
            v-else-if="option.isSubGroup"
            :style="getMarginForSubCategory(option.level)"
            v-bind="subGroupLabelAttrs"
            v-text="option[labelKey]"
          />
        </div>
      </li>
      <slot
        v-if="hasSlotContent($slots['empty']) || options.length === 0"
        name="empty"
        :empty-styles="optionClasses"
      >
        <span v-bind="optionAttrs()">
          <span v-text="currentLocale.noDataToShow" />
        </span>
      </slot>

      <!-- Add button -->
      <template v-if="addOption">
        <div v-bind="addTitleWrapperAttrs" @click="onClickAddOption">
          <div v-bind="addTitleAttrs">
            {{ currentLocale.add }}
            <span v-bind="addTitleHotkeyAttrs" v-text="addOptionKeyCombination" />
          </div>
        </div>
        <UButton pill square v-bind="buttonAddAttrs" @click="onClickAddOption">
          <UIcon
            internal
            color="white"
            size="xs"
            :name="config.addIconName"
            v-bind="addIconAttrs"
          />
        </UButton>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon";
import UButton from "../ui.button";

import UIService, { getRandomId, isMac } from "../service.ui";

import usePointer from "./composables/usePointer";
import useAttrs from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

import defaultConfig from "./configs/default.config.js";
import { UDropdownList } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDropdownList", inheritAttrs: false });

// TODO: Use props and regular modal value
const modelValue = defineModel({ type: [String, Number, Object], default: "" });

const props = defineProps({
  /**
   * Set options list.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Label key in the item object of options.
   */
  labelKey: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownList).default.valueKey,
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownList).default.valueKey,
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
   * Show add new option button to the list.
   */
  addOption: {
    type: Boolean,
    default: false,
  },

  /**
   * Disables the select.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownList).default.disabled,
  },

  /**
   * Set size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownList).default.size,
  },

  /**
   * Amount of options you can see without scroll.
   */
  visibleOptions: {
    type: Number,
    default: UIService.get(defaultConfig, UDropdownList).default.visibleOptions,
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
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue", "addOption"]);

const wrapperRef = ref(null);
const optionsRef = ref([]);

const { pointer, pointerDirty, pointerSet, pointerBackward, pointerForward, pointerReset } =
  usePointer(props.options, optionsRef, wrapperRef);

const {
  config,
  hasSlotContent,
  wrapperAttrs,
  listAttrs,
  optionItemAttrs,
  addTitleWrapperAttrs,
  addTitleAttrs,
  addTitleHotkeyAttrs,
  buttonAddAttrs,
  addIconAttrs,
  optionAttrs,
  subGroupLabelAttrs,
  groupLabelAttrs,
  optionClasses,
  optionContentAttrs,
} = useAttrs(props);

const { tm } = useLocale();

defineExpose({
  pointerSet,
  pointerBackward,
  pointerForward,
  pointerReset,
  addPointerElement,
  optionsRef,
  wrapperRef,
});

const i18nGlobal = tm(UDropdownList);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const addOptionKeyCombination = computed(() => {
  return isMac ? "(⌘ + Enter)" : "(Ctrl + Enter)";
});

const wrapperHeight = computed(() => {
  const maxHeight = optionsRef.value
    .slice(0, props.visibleOptions)
    .map((el) => el.getBoundingClientRect().height)
    .reduce((acc, cur) => acc + cur, 0);

  return props.visibleOptions === undefined ? "auto" : `${maxHeight}px`;
});

function onClickAddOption() {
  emit("addOption");
}

function select(option, key) {
  if (props.disabled || option.groupLabel) {
    return;
  }

  if (key === "Tab" && !pointerDirty.value) return;

  modelValue.value = option[props.valueKey];
}

function isSelectedOption(option) {
  return modelValue.value === option[props.valueKey];
}

function getMarginForSubCategory(level) {
  const baseMargin = 1;

  if (level > 1) {
    return `margin-left: ${baseMargin * (level - 1)}rem`;
  }
}

function optionHighlight(index, option) {
  const classes = [];

  if (index === pointer.value) classes.push(config.value.optionHighlight);
  if (isSelectedOption(option)) classes.push(config.value.optionSelected);

  return classes;
}

function addPointerElement({ key } = "Enter") {
  if (props.options.length > 0) {
    select(props.options[pointer.value], key);
  }

  pointerReset();
}
</script>
