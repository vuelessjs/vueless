<script setup lang="ts">
import { ref, computed, nextTick, useId, useTemplateRef } from "vue";
import { isEqual } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UBadge from "../ui.text-badge/UBadge.vue";
import UListbox from "../ui.form-listbox/UListbox.vue";

import { vClickOutside } from "../directives";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

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

type UListboxRef = InstanceType<typeof UListbox>;

const isShownOptions = ref(false);
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

const badgeLabel = computed(() => {
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

function onClickBadge() {
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

const { getDataTest, config, wrapperAttrs, dropdownBadgeAttrs, listboxAttrs, toggleIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps, "dropdownBadge");
</script>

<template>
  <div ref="wrapper" v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UBadge
      :id="elementId"
      :label="badgeLabel"
      :size="size"
      :color="color"
      :variant="variant"
      :round="round"
      :title="getFullOptionLabels(selectedOptions)"
      v-bind="dropdownBadgeAttrs"
      tabindex="0"
      :data-test="getDataTest()"
      @click="onClickBadge"
      @keydown.enter="onClickBadge"
      @keydown.space.prevent="onClickBadge"
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
        <slot :label="badgeLabel" :opened="isShownOptions" />
      </template>

      <template #right>
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {boolean} opened
        -->
        <slot name="toggle" :opened="isShownOptions">
          <UIcon
            v-if="toggleIconName"
            internal
            color="inherit"
            :name="toggleIconName"
            v-bind="toggleIconAttrs"
            :data-test="getDataTest('dropdown')"
          />
        </slot>
      </template>
    </UBadge>

    <UListbox
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
