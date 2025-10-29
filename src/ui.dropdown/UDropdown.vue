<script setup lang="ts">
import { nextTick, computed, ref, useId, useTemplateRef } from "vue";
import { isEqual } from "lodash-es";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UListbox from "../ui.form-listbox/UListbox.vue";

import vClickOutside from "../v.click-outside/vClickOutside";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";
import type { Option, SelectedValue } from "../ui.form-listbox/types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers on a dropdown option click.
   * @property {string} value
   */
  "clickOption",

  /**
   * Triggers when an option is selected.
   * @property {string} value
   * @property {number} value
   */
  "update:modelValue",

  /**
   * Triggers when a dropdown list is opened.
   */
  "open",

  /**
   * Triggers when a dropdown list is closed.
   */
  "close",

  /**
   * Triggers when the search value is changed.
   * @property {string} query
   */
  "searchChange",

  /**
   * Triggers when the search v-model updates.
   * @property {string} query
   */
  "update:search",
]);

type UListboxRef = InstanceType<typeof UListbox>;

const isShownOptions = ref(false);
const isClickingOption = ref(false);
const listboxRef = useTemplateRef<UListboxRef>("dropdown-list");
const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const elementId = props.id || useId();

const dropdownValue = computed({
  get: () => {
    if (props.multiple && !Array.isArray(props.modelValue)) {
      return props.modelValue ? [props.modelValue] : [];
    }

    return props.modelValue;
  },
  set: (value) => emit("update:modelValue", value),
});

const dropdownSearch = computed({
  get: () => props.search ?? "",
  set: (value: string) => emit("update:search", value),
});

const selectedOptions = computed(() => {
  if (props.multiple) {
    return props.options.filter((option) => {
      return (
        option[props.valueKey] &&
        (dropdownValue.value as SelectedValue[]).find((selected) =>
          isEqual(selected, option[props.valueKey]),
        )
      );
    });
  }

  return [
    props.options.find(
      (option) => option[props.valueKey] && isEqual(option[props.valueKey], dropdownValue.value),
    ),
  ].filter((option) => !!option);
});

const displayLabel = computed(() => {
  if (!props.labelDisplayCount || !selectedOptions.value.length) {
    return props.label;
  }

  const selectedLabels = selectedOptions.value
    .slice(0, props.labelDisplayCount)
    .map((option) => option[props.labelKey]);
  const restLabelCount = selectedOptions.value.length - props.labelDisplayCount;

  if (restLabelCount > 0) {
    selectedLabels.push(`+${restLabelCount}`);
  }

  return selectedLabels.join(", ");
});

function getFullOptionLabels(value: Option | Option[]) {
  const labelKey = props.labelKey;

  if (Array.isArray(value)) {
    return value.map((item) => item[labelKey]).join(", ");
  }

  return "";
}

function onSearchChange(query: string) {
  emit("searchChange", query);
}

function onClickOption(option: Option) {
  isClickingOption.value = true;

  emit("clickOption", option);

  if (!props.multiple && props.closeOnSelect) hideOptions();

  nextTick(() => {
    setTimeout(() => {
      isClickingOption.value = false;
    }, 10);
  });
}

function handleClickOutside() {
  if (isClickingOption.value) return;

  hideOptions();
}

function toggleOptions() {
  if (props.disabled) return;

  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => listboxRef.value?.wrapperRef?.focus());

    emit("open");
  }
}

function hideOptions() {
  isShownOptions.value = false;
  dropdownSearch.value = "";

  emit("close");
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,

  /**
   * Hides the dropdown options.
   * @property {function}
   */
  hideOptions,

  /**
   * Toggles the dropdown options visibility.
   * @property {function}
   */
  toggleOptions,

  /**
   * Indicates whether the dropdown options are shown.
   * @property {boolean}
   */
  isShownOptions,

  /**
   * The computed display label for the dropdown.
   * @property {string}
   */
  displayLabel,

  /**
   * The currently selected options.
   * @property {Option[]}
   */
  selectedOptions,

  /**
   * The unique element ID.
   * @property {string}
   */
  elementId,

  /**
   * Gets the full option labels as a comma-separated string.
   * @property {function}
   */
  getFullOptionLabels,
});

/*
 * Vueless: Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  opened: isShownOptions.value,
}));

const { getDataTest, wrapperAttrs, listboxAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
  "dropdown",
);
</script>

<template>
  <div
    ref="wrapper"
    v-click-outside="handleClickOutside"
    v-bind="wrapperAttrs"
    :data-test="getDataTest('wrapper')"
  >
    <!--
      @slot Use it to add custom trigger element for the dropdown.
      @binding {boolean} opened
      @binding {string} label
      @binding {function} toggle
      @binding {string} element-id
    -->
    <slot
      :opened="isShownOptions"
      :label="displayLabel"
      :toggle="toggleOptions"
      :element-id="elementId"
    />

    <Transition v-bind="config.listboxTransition">
      <!--
        @slot Use it to replace the UListbox with custom dropdown content.
        @binding {boolean} opened
        @binding {string} label
        @binding {function} toggle
        @binding {function} hide
        @binding {array} selectedOptions
        @binding {string} elementId
      -->
      <slot
        v-if="isShownOptions"
        name="dropdown"
        :opened="isShownOptions"
        :label="displayLabel"
        :toggle="toggleOptions"
        :hide="hideOptions"
        :selected-options="selectedOptions"
        :element-id="elementId"
      >
        <UListbox
          ref="dropdown-list"
          v-model="dropdownValue"
          v-model:search="dropdownSearch"
          :searchable="searchable"
          :multiple="multiple"
          :color="color"
          :options="options"
          :options-limit="optionsLimit"
          :visible-options="visibleOptions"
          :label-key="labelKey"
          :value-key="valueKey"
          :group-label-key="groupLabelKey"
          :group-value-key="groupValueKey"
          v-bind="listboxAttrs"
          :data-test="getDataTest('list')"
          @click-option="onClickOption"
          @search-change="onSearchChange"
          @update:search="(value) => emit('update:search', value)"
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
            @slot Use it to customize the option.
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
            <!-- @slot Use it to add something instead of empty state. -->
            <slot name="empty" />
          </template>
        </UListbox>
      </slot>
    </Transition>
  </div>
</template>
