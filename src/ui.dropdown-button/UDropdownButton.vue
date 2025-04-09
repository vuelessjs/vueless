<script setup lang="ts">
import { nextTick, computed, provide, ref, useId, useTemplateRef } from "vue";
import { isEqual } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { vClickOutside } from "../directives";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";
import type { Option, SelectedValue } from "../ui.dropdown-list/types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers on dropdown option click.
   * @property {string} value
   */
  "clickOption",

  /**
   * Triggers when option is selected.
   * @property {string} value
   * @property {number} value
   */
  "update:modelValue",
]);

provide("hideDropdownOptions", hideOptions);

type UDropdownListRef = InstanceType<typeof UDropdownList>;

const isShownOptions = ref(false);
const dropdownListRef = useTemplateRef<UDropdownListRef>("dropdown-list");
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

const buttonLabel = computed(() => {
  if (!selectedOptions.value.length) {
    return props.label;
  }

  const selectedLabels = selectedOptions.value
    .slice(0, props.labelDisplayCount)
    .map((option) => option[props.labelKey]);
  const restLabelCount = selectedOptions.value.length - props.labelDisplayCount;

  if (selectedLabels.length > 1 && restLabelCount > 0) {
    selectedLabels.push(`+${restLabelCount}`);
  }

  return selectedLabels.join(", ");
});

function onClickOption(option: Option) {
  emit("clickOption", option);

  hideOptions();
}

function onClickButton() {
  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value?.wrapperRef?.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  opened: isShownOptions.value,
}));

const {
  getDataTest,
  config,
  dropdownButtonAttrs,
  dropdownListAttrs,
  dropdownIconAttrs,
  wrapperAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div ref="wrapper" v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UButton
      :id="elementId"
      :label="buttonLabel"
      :size="size"
      :color="color"
      :round="round"
      :square="square"
      :variant="variant"
      :disabled="disabled"
      v-bind="dropdownButtonAttrs"
      :data-test="getDataTest()"
      @click="onClickButton"
    >
      <template #left>
        <!--
          @slot Use it to add something before the label.
          @binding {boolean} opened
        -->
        <slot name="left" :opened="isShownOptions" />
      </template>

      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} opened
        -->
        <slot :label="buttonLabel" :opened="isShownOptions" />
      </template>

      <template #right>
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {boolean} opened
        -->
        <slot v-if="!noIcon" name="toggle" :opened="isShownOptions">
          <UIcon
            internal
            color="inherit"
            :name="config.defaults.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="getDataTest('dropdown')"
          />
        </slot>
      </template>
    </UButton>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdown-list"
      v-model="dropdownValue"
      :multiple="multiple"
      :color="color"
      :options="options"
      :label-key="labelKey"
      :value-key="valueKey"
      v-bind="dropdownListAttrs"
      :data-test="getDataTest('list')"
      @click-option="onClickOption"
    />
  </div>
</template>
