<script setup lang="ts">
import { watch, computed, useId, ref, useTemplateRef, nextTick } from "vue";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { isMac } from "../utils/platform.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import usePointer from "./usePointer.ts";
import { useLocale } from "../composables/useLocale.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Option, Props, Config } from "./types.ts";
import type { UnknownObject } from "../types.ts";

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
]);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const optionsRef = useTemplateRef<HTMLLIElement[]>("option");
const emptyOptionRef = useTemplateRef<HTMLLIElement>("empty-option");
const addOptionRef = useTemplateRef<HTMLLIElement>("add-option");

const wrapperMaxHeight = ref("");

const { pointer, pointerDirty, pointerSet, pointerBackward, pointerForward, pointerReset } =
  usePointer(props.options, optionsRef, wrapperRef);

const elementId = props.id || useId();

const { tm } = useLocale();

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config.i18n));

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const addOptionKeyCombination = computed(() => {
  return isMac ? "(⌘ + Enter)" : "(Ctrl + Enter)";
});

watch(
  () => [props.options, props.size],
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
          const elHeight = el.getBoundingClientRect().height;

          const styles = window.getComputedStyle(el);
          const marginTop = parseFloat(styles.marginTop || "0");
          const marginBottom = parseFloat(styles.marginBottom || "0");

          const [childDiv] = el.getElementsByTagName("div");
          const childStyles = childDiv && window.getComputedStyle(childDiv);
          const childMarginTop = parseFloat(childStyles?.marginTop || "0");
          const childMarginBottom = parseFloat(childStyles?.marginBottom || "0");
          const childPaddingTop = parseFloat(childStyles?.paddingTop || "0");
          const childPaddingBottom = parseFloat(childStyles?.paddingBottom || "0");

          return (
            elHeight +
            marginTop +
            marginBottom +
            childMarginTop +
            childMarginBottom +
            childPaddingTop +
            childPaddingBottom
          );
        })
        .reduce((acc, cur) => acc + cur, 0);

      const wrapperStyle = getComputedStyle(wrapperRef.value as Element);
      const wrapperPaddingTop = parseFloat(wrapperStyle.paddingTop || "0");
      const wrapperPaddingBottom = parseFloat(wrapperStyle.paddingBottom || "0");
      const wrapperBorderTop = parseFloat(wrapperStyle.borderTopWidth || "0");
      const wrapperBorderBottom = parseFloat(wrapperStyle.borderBottomWidth || "0");

      wrapperMaxHeight.value = `${
        maxHeight +
        wrapperPaddingTop +
        wrapperPaddingBottom +
        wrapperBorderTop +
        wrapperBorderBottom
      }px`;
    });
  },
  { immediate: true },
);

function onClickAddOption() {
  emit("add");
}

function isMetaKey(key: string) {
  return ["isSubGroup", "groupLabel", "level", "isHidden", "onClick", "divider"].includes(key);
}

function select(option: Option, keyCode?: string) {
  if (props.disabled || option.groupLabel) {
    return;
  }

  if (keyCode === "Tab" && !pointerDirty.value) return;

  if (props.valueKey in option && !isMetaKey(props.valueKey)) {
    selectedValue.value = option[props.valueKey] as string | number | UnknownObject;
  }
}

function isSelectedOption(option: Option) {
  return selectedValue.value === option[props.valueKey];
}

function getMarginForSubCategory(level: number = 0) {
  const baseMargin = 0.5;

  if (level > 1) {
    return `margin-left: ${baseMargin * (level - 1)}rem`;
  }
}

function optionHighlight(index: number, option: Option) {
  const classes = [];

  if (isSelectedOption(option)) {
    classes.push(config.value?.optionActive);
  }

  if (index === pointer.value && !isSelectedOption(option)) {
    classes.push(config.value?.optionHighlighted);
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

defineExpose({
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
    <ul :id="`listbox-${elementId}`" v-bind="listAttrs" role="listbox">
      <li
        v-for="(option, index) of options"
        :id="`${elementId}-${index}`"
        :key="index"
        v-bind="listItemAttrs"
        ref="option"
        :role="!(option && option.groupLabel) ? 'option' : undefined"
        :data-group-label="Boolean(option.groupLabel)"
      >
        <UDivider v-if="option.divider" padding="none" v-bind="optionDividerAttrs" />
        <!-- option title -->
        <span
          v-if="
            !(option && (option.groupLabel || option.isSubGroup)) &&
            !option.isHidden &&
            !option.divider
          "
          v-bind="isSelectedOption(option) ? optionActiveAttrs : optionAttrs"
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

      <li
        v-if="!options.length"
        :id="`${elementId}-empty`"
        ref="empty-option"
        role="option"
        v-bind="optionAttrs"
      >
        <!-- @slot Use it to add something instead of empty state. -->
        <slot name="empty">
          <span v-bind="optionContentAttrs" v-text="currentLocale.noDataToShow" />
        </slot>
      </li>

      <!-- Add button -->
      <template v-if="addOption">
        <li
          :id="`${elementId}-addOption`"
          ref="add-option"
          role="option"
          v-bind="addOptionLabelWrapperAttrs"
          :data-test="getDataTest('add')"
          @click="onClickAddOption"
          @mouseenter.self="pointerSet(options.length + 1)"
        >
          <span v-bind="addOptionLabelAttrs">
            {{ currentLocale.add }}
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
</template>
