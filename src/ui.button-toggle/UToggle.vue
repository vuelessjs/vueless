<script setup lang="ts">
import { computed, useId } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import UButton from "../ui.button/UButton.vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, TYPE_RADIO, TYPE_CHECKBOX } from "./constants.ts";

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

const elementId = props.id || useId();

const type = computed(() => {
  return props.multiple ? TYPE_CHECKBOX : TYPE_RADIO;
});

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

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  split: props.split,
  /* component state, not a props */
  selected: isSelected,
}));

const {
  toggleLabelAttrs,
  itemsAttrs,
  itemWrapperAttrs,
  toggleButtonInactiveAttrs,
  toggleButtonActiveAttrs,
  toggleInputAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
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
      <label
        v-for="(item, index) in options"
        :key="item.value"
        :for="`${elementId}-${index}`"
        v-bind="itemWrapperAttrs"
      >
        <UButton
          :label="item.label"
          tabindex="0"
          color="gray"
          :for="elementId"
          :size="size"
          :round="round"
          :block="block"
          :square="square"
          :disabled="disabled"
          :tag="'div'"
          v-bind="isSelected(item) ? toggleButtonActiveAttrs : toggleButtonInactiveAttrs"
          :data-test="`${dataTest}-item-${index}`"
        >
          <template #left="{ iconName }">
            <!--
              @slot Use it to add something before the label.
              @binding {string} icon-name
            -->
            <slot name="left" :icon-name="iconName" />
          </template>

          <template #default="{ label, iconName }">
            <input
              :id="`${elementId}-${index}`"
              v-model="selectedValue"
              :name="name"
              :type="type"
              :value="item.value"
              :disabled="disabled"
              v-bind="toggleInputAttrs"
            />
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
            -->
            <slot name="right" :icon-name="iconName" />
          </template>
        </UButton>
      </label>
    </div>
  </ULabel>
</template>
