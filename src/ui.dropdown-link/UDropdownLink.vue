<script setup lang="ts">
import { nextTick, computed, provide, ref, useId, useTemplateRef } from "vue";
import { isEqual } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULink from "../ui.button-link/ULink.vue";
import ULisbox from "../ui.form-listbox/UListbox.vue";

import { vClickOutside } from "../directives";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";
import type { Option, SelectedValue } from "../ui.form-listbox/types.ts";

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
]);

provide("hideDropdownOptions", hideOptions);

type ULisboxRef = InstanceType<typeof ULisbox>;

const isShownOptions = ref(false);
const listboxRef = useTemplateRef<ULisboxRef>("dropdown-list");
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

const linkLabel = computed(() => {
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

const toggleIconName = computed(() => {
  if (typeof props.toggleIcon === "string") {
    return props.toggleIcon;
  }

  return props.toggleIcon ? config.value.defaults.toggleIcon : "";
});

function getFullOptionLabels(value: Option | Option[]) {
  const labelKey = props.labelKey;

  if (Array.isArray(value)) {
    return value.map((item) => item[labelKey]).join(", ");
  }

  return "";
}

function onClickLink() {
  if (props.disabled) return;

  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => listboxRef.value?.wrapperRef?.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickOption(option: Option) {
  emit("clickOption", option);

  hideOptions();
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

const { config, getDataTest, wrapperAttrs, dropdownLinkAttrs, listboxAttrs, toggleIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div
    ref="wrapper"
    v-click-outside="hideOptions"
    tabindex="1"
    v-bind="wrapperAttrs"
    @keydown.enter="onClickLink"
    @keydown.space.prevent="onClickLink"
  >
    <!--
      @slot Use it to add something before the label.
      @binding {boolean} opened
    -->
    <slot name="left" :opened="isShownOptions" />

    <ULink
      :id="elementId"
      tabindex="-1"
      :size="size"
      :label="linkLabel"
      :color="color"
      :dashed="dashed"
      :disabled="disabled"
      :underlined="underlined"
      :title="getFullOptionLabels(selectedOptions)"
      v-bind="dropdownLinkAttrs"
      :data-test="getDataTest()"
      @click="onClickLink"
    >
      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} opened
        -->
        <slot :label="linkLabel" :opened="isShownOptions" />
      </template>
    </ULink>

    <!--
      @slot Use it to add something instead of the toggle icon.
      @binding {boolean} opened
      @binding {function} toggle
    -->
    <slot name="toggle" :opened="isShownOptions" :toggle="onClickLink">
      <UIcon
        v-if="toggleIconName"
        interactive
        :color="color"
        :disabled="disabled"
        :name="toggleIconName"
        v-bind="toggleIconAttrs"
        :data-test="getDataTest('toggle')"
        @click="onClickLink"
      />
    </slot>

    <ULisbox
      v-if="isShownOptions"
      ref="dropdown-list"
      v-model="dropdownValue"
      :searchable="searchable"
      :multiple="multiple"
      :size="size"
      :color="color"
      :options="options"
      :label-key="labelKey"
      :value-key="valueKey"
      v-bind="listboxAttrs"
      :data-test="getDataTest('list')"
      @click-option="onClickOption"
    />
  </div>
</template>
