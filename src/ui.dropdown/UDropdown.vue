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

const isOpened = ref(false);
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

function getFullOptionLabels() {
  if (!selectedOptions.value) return "";

  return selectedOptions.value.map((option) => option[props.labelKey]).join(", ");
}

function onSearchChange(query: string) {
  emit("searchChange", query);
}

function onClickOption(option: Option) {
  isClickingOption.value = true;

  emit("clickOption", option);

  if (!props.multiple && props.closeOnSelect) {
    hide();
  }

  nextTick(() => {
    setTimeout(() => {
      isClickingOption.value = false;
    }, 10);
  });
}

function handleClickOutside() {
  if (isClickingOption.value) return;

  hide();
}

function toggle() {
  if (props.disabled) return;

  isOpened.value = !isOpened.value;

  if (isOpened.value) {
    nextTick(() => listboxRef.value?.wrapperRef?.focus());

    emit("open");
  }
}

function hide() {
  isOpened.value = false;
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
   * Hides the dropdown.
   * @property {function}
   */
  hide,

  /**
   * Toggles the dropdown visibility.
   * @property {function}
   */
  toggle,

  /**
   * Indicates whether the dropdown is opened.
   * @property {boolean}
   */
  isOpened,

  /**
   * The currently selected options.
   * @property {Option[]}
   */
  selectedOptions,

  /**
   * Returns full option labels joined by comma.
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
  opened: isOpened.value,
}));

const { getDataTest, wrapperAttrs, listboxAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
  "dropdown",
);
</script>

<template>
  <div
    :id="elementId"
    ref="wrapper"
    v-click-outside="handleClickOutside"
    v-bind="wrapperAttrs"
    :data-test="getDataTest('wrapper')"
    @click="toggle"
  >
    <!--
      @slot Use it to add custom trigger element for the dropdown.
      @binding {boolean} opened
    -->
    <slot :opened="isOpened" />

    <Transition v-bind="config.listboxTransition">
      <!--
        @slot Use it to replace the UListbox with custom dropdown content.
        @binding {boolean} opened
      -->
      <slot v-if="isOpened" name="dropdown" :opened="isOpened">
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
          @click.stop
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
