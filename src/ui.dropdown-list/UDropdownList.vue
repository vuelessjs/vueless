<template>
  <div
    ref="wrapperRef"
    tabindex="1"
    :style="{ maxHeight: wrapperHeight }"
    v-bind="wrapperAttrs"
    @keydown.self.down.prevent="pointerForward"
    @keydown.self.up.prevent="pointerBackward"
    @keydown.enter.stop.self="addPointerElement"
  >
    <ul :id="`listbox-${elementId}`" v-bind="listAttrs" role="listbox">
      <li
        v-for="(option, index) of options"
        :id="`${elementId}-${index}`"
        :key="index"
        v-bind="listItemAttrs"
        ref="optionsRef"
        :role="!(option && option.groupLabel) ? 'option' : null"
        :data-group-label="Boolean(option.groupLabel)"
      >
        <!-- option title -->
        <span
          v-if="!(option && (option.groupLabel || option.isSubGroup)) && !option.isHidden"
          v-bind="optionAttrs"
          :class="optionHighlight(index, option)"
          @click="select(option), onClickOption(option)"
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
              v-text="option[labelKey]"
            />
          </slot>

          <!--
              @slot Use it to add something after the option.
              @binding {object} option
              @binding {number} index
            -->
          <slot name="after-option" :option="option" :index="index" />
        </span>

        <!-- group title -->
        <template v-if="option && (option.groupLabel || option.isSubGroup) && !option.isHidden">
          <div v-if="option.groupLabel" v-bind="groupAttrs" v-text="option.groupLabel" />

          <div
            v-else-if="option.isSubGroup"
            :style="getMarginForSubCategory(option.level)"
            v-bind="subGroupAttrs"
            v-text="option[labelKey]"
          />
        </template>
      </li>

      <!--
        @slot Use it to add something instead of empty state.
        @binding {string} emptyStyles
      -->
      <slot name="empty" :empty-styles="optionClasses">
        <span v-if="!options.length" v-bind="optionAttrs">
          <span v-bind="optionContentAttrs" v-text="currentLocale.noDataToShow" />
        </span>
      </slot>

      <!-- Add button -->
      <template v-if="addOption">
        <div v-bind="addOptionLabelWrapperAttrs" @click="onClickAddOption">
          <div v-bind="addOptionLabelAttrs">
            {{ currentLocale.add }}
            <span v-bind="addOptionLabelHotkeyAttrs" v-text="addOptionKeyCombination" />
          </div>
        </div>

        <UButton round square v-bind="addOptionButtonAttrs" @click="onClickAddOption">
          <UIcon
            internal
            color="white"
            size="xs"
            :name="config.defaults.addOptionIcon"
            v-bind="addOptionIconAttrs"
          />
        </UButton>
      </template>
    </ul>
  </div>

  <!-- {{ !options.length }} -->
</template>

<script setup>
import { computed, ref, useId } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";

import { getDefault } from "../utils/utilUI.js";
import { isMac } from "../utils/utilPlatform.js";

import usePointer from "./usePointer.js";
import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.js";

import defaultConfig from "./config.js";
import { UDropdownList } from "./constants.js";

defineOptions({ inheritAttrs: false });

// TODO: Use props and regular modal value
const modelValue = defineModel({ type: [String, Number, Object], default: "" });

const props = defineProps({
  /**
   * List options.
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
    default: getDefault(defaultConfig, UDropdownList).valueKey,
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: getDefault(defaultConfig, UDropdownList).valueKey,
  },

  /**
   * Show add option button.
   */
  addOption: {
    type: Boolean,
    default: false,
  },

  /**
   * Disable the list.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UDropdownList).disabled,
  },

  /**
   * List size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UDropdownList).size,
  },

  /**
   * Number of options to show without a scroll.
   */
  visibleOptions: {
    type: Number,
    default: getDefault(defaultConfig, UDropdownList).visibleOptions,
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
});

const emit = defineEmits([
  /**
   * Triggers when option is added.
   */
  "addOption",
  /**
   * Triggers on click option.
   */
  "clickOption",
]);

const wrapperRef = ref(null);
const optionsRef = ref([]);

const { pointer, pointerDirty, pointerSet, pointerBackward, pointerForward, pointerReset } =
  usePointer(props.options, optionsRef, wrapperRef);

const elementId = props.id || useId();

const {
  config,
  wrapperAttrs,
  listAttrs,
  listItemAttrs,
  addOptionLabelWrapperAttrs,
  addOptionLabelAttrs,
  addOptionLabelHotkeyAttrs,
  addOptionButtonAttrs,
  addOptionIconAttrs,
  optionAttrs,
  subGroupAttrs,
  groupAttrs,
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
  if (!optionsRef.value.length) return "auto";

  const maxHeight = optionsRef.value
    .slice(0, props.visibleOptions)
    .map((el) => el.getBoundingClientRect().height)
    .reduce((acc, cur) => acc + cur, 0);

  return props.visibleOptions === undefined ? "auto" : `${maxHeight + 10}px`;
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

  if (index === pointer.value) classes.push(config.value.optionHighlighted);
  if (isSelectedOption(option)) classes.push(config.value.optionSelected);

  return classes;
}

function addPointerElement({ key } = "Enter") {
  if (props.options.length > 0) {
    select(props.options[pointer.value], key);
    onClickOption(props.options[pointer.value]);
  }

  pointerReset();
}

function onClickOption(option) {
  emit("clickOption", option);
}
</script>
