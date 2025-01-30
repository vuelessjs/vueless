<script setup lang="ts">
import { computed } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
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
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when toggle item is selected.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function isSelected(item: UToggleOption) {
  if (Array.isArray(selectedValue.value)) {
    return selectedValue.value.includes(item.value);
  }

  return selectedValue.value === item.value;
}

function onClickOption(item: UToggleOption) {
  if (props.multiple) {
    const newValue = Array.isArray(selectedValue.value) ? [...selectedValue.value] : [];
    const index = newValue.indexOf(item.value);

    ~index ? newValue.splice(index, 1) : newValue.push(item.value);

    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", item.value);
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

const { toggleLabelAttrs, itemsAttrs, toggleButtonInactiveAttrs, toggleButtonActiveAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    :error="error"
    centred
    v-bind="toggleLabelAttrs"
    :data-test="dataTest"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div v-bind="itemsAttrs">
      <UButton
        v-for="(item, index) in options"
        :key="item.value"
        :label="item.label"
        tabindex="0"
        color="gray"
        :size="size"
        :round="round"
        :block="block"
        :square="square"
        :disabled="disabled"
        v-bind="isSelected(item) ? toggleButtonActiveAttrs : toggleButtonInactiveAttrs"
        :data-test="`${dataTest}-item-${index}`"
        @click="onClickOption(item)"
      >
        <template #left="{ iconName }">
          <!--
            @slot Use it to add something before the label.
            @binding {string} icon-name
            @binding {number} index
          -->
          <slot name="left" :icon-name="iconName" :index="index" />
        </template>

        <template #default="{ label, iconName }">
          <!--
            @slot Use it to add something instead of the toggle item label.
            @binding {string} label
            @binding {string} icon-name
            @binding {number} index
          -->
          <slot name="default" :label="label" :icon-name="iconName" :index="index">
            {{ item.label }}
          </slot>
        </template>

        <template #right="{ iconName }">
          <!--
            @slot Use it to add something after the label.
            @binding {string} icon-name
            @binding {number} index
          -->
          <slot name="right" :icon-name="iconName" :index="index" />
        </template>
      </UButton>
    </div>
  </ULabel>
</template>
