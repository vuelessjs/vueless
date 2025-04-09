<script setup lang="ts">
import { ref, computed, nextTick, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UBadge from "../ui.text-badge/UBadge.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { vClickOutside } from "../directives";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";
import type { Option } from "../ui.dropdown-list/types.ts";

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

type UDropdownListRef = InstanceType<typeof UDropdownList>;

const isShownOptions = ref(false);
const dropdownListRef = useTemplateRef<UDropdownListRef>("dropdown-list");
const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const elementId = props.id || useId();

const dropdownValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const selectedOptions = computed(() => {
  if (props.multiple) {
    return props.options.filter(
      (option) => option.id && (dropdownValue.value as (string | number)[]).includes(option.id),
    );
  }

  return props.options.filter((option) => option.id === dropdownValue.value);
});

const selectableBadgeLabel = computed(() => {
  if (!selectedOptions.value.length) return props.label;

  return selectedOptions.value.map((option) => option[props.labelKey]).join(", ");
});

function onClickBadge() {
  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value?.wrapperRef?.focus());
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

const {
  getDataTest,
  config,
  wrapperAttrs,
  dropdownBadgeAttrs,
  dropdownListAttrs,
  dropdownIconAttrs,
  dropdownBadgeLabelAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div ref="wrapper" v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UBadge
      :id="elementId"
      :label="selectableBadgeLabel"
      :size="size"
      :color="color"
      :variant="variant"
      :round="round"
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
        <slot :label="selectableBadgeLabel" :opened="isShownOptions">
          <span
            v-bind="dropdownBadgeLabelAttrs"
            :title="selectedOptions.length >= 2 ? selectableBadgeLabel : ''"
            v-text="selectableBadgeLabel"
          />
        </slot>
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
    </UBadge>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdown-list"
      v-model="dropdownValue"
      :multiple="multiple"
      :size="size"
      :color="color"
      :options="options"
      :label-key="labelKey"
      value-key="id"
      v-bind="dropdownListAttrs"
      :data-test="getDataTest('list')"
      @click-option="onClickOption"
    />
  </div>
</template>
