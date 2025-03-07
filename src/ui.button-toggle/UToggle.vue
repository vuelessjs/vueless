<script setup lang="ts">
import { computed } from "vue";

import UButton from "../ui.button/UButton.vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config, UToggleOption } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when toggle option is selected.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function isSelected(option: UToggleOption) {
  if (Array.isArray(selectedValue.value)) {
    return selectedValue.value.includes(option.value);
  }

  return selectedValue.value === option.value;
}

function onClickOption(rawOption: UToggleOption) {
  const option = { ...rawOption };

  delete option.onClick;

  if (typeof rawOption.onClick === "function") {
    rawOption.onClick(option);
  }

  if (props.multiple || props.options.length === 1) {
    const newValue = Array.isArray(selectedValue.value) ? [...selectedValue.value] : [];
    const index = newValue.indexOf(option.value);

    ~index ? newValue.splice(index, 1) : newValue.push(option.value);

    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", option.value);
  }
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  split: props.split,
  /* component state, not a props */
  selected: isSelected,
}));

const { getDataTest, optionsAttrs, toggleButtonInactiveAttrs, toggleButtonActiveAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div v-bind="optionsAttrs">
    <UButton
      v-for="(option, index) in options"
      :key="option.value"
      :label="option.label"
      tabindex="0"
      color="neutral"
      :size="size"
      :round="round"
      :block="block"
      :square="square"
      :icon="option.icon"
      :left-icon="option.leftIcon"
      :right-icon="option.rightIcon"
      :disabled="option.disabled || disabled"
      v-bind="isSelected(option) ? toggleButtonActiveAttrs : toggleButtonInactiveAttrs"
      :data-test="getDataTest(`option-${index}`)"
      @click="onClickOption(option)"
    >
      <template #left="{ iconName }">
        <!--
          @slot Use it to add something before the label.
          @binding {object} option
          @binding {string} icon-name
          @binding {number} index
        -->
        <slot name="left" :option="option" :icon-name="iconName" :index="index" />
      </template>

      <template #default="{ label, iconName }">
        <!--
          @slot Use it to add something instead of the toggle option label.
          @binding {object} option
          @binding {string} label
          @binding {string} icon-name
          @binding {number} index
        -->
        <slot name="option" :option="option" :label="label" :icon-name="iconName" :index="index" />
      </template>

      <template #right="{ iconName }">
        <!--
          @slot Use it to add something after the label.
          @binding {object} option
          @binding {string} icon-name
          @binding {number} index
        -->
        <slot name="right" :option="option" :icon-name="iconName" :index="index" />
      </template>
    </UButton>
  </div>
</template>
