<script setup lang="ts">
import { computed, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import URadio from "../ui.form-radio/URadio.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import { UColorPicker } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";
import type { BrandColors } from "../types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UColorPicker),
  colorOptions: () =>
    getDefaults<Props, Config>(defaultConfig, UColorPicker).colorOptions as BrandColors[],
  modelValue: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when color value changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const elementId = props.id || useId();

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function onUpdateValue(value: string) {
  selectedItem.value = value;
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  config,
  colorPickerLabelAttrs,
  listAttrs,
  colorPickerRadioAttrs,
  unselectedColorPickerRadioAttrs,
  unselectedIconAttrs,
  unselectedAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <ULabel
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    align="topWithDesc"
    v-bind="colorPickerLabelAttrs"
    :data-test="dataTest"
  >
    <div v-bind="listAttrs">
      <div v-bind="unselectedAttrs">
        <URadio
          :id="elementId"
          :name="name"
          :size="size"
          color="gray"
          :checked="selectedItem === ''"
          :disabled="disabled"
          v-bind="unselectedColorPickerRadioAttrs"
          @update:model-value="onUpdateValue('')"
        />

        <label :for="elementId">
          <UIcon
            v-if="selectedItem === ''"
            internal
            color="gray"
            :name="config.defaults.unselectedIcon"
            v-bind="unselectedIconAttrs"
          />
        </label>
      </div>

      <URadio
        v-for="(color, index) in colorOptions"
        :key="index"
        :name="name"
        :size="size"
        :value="color"
        :color="color"
        :checked="selectedItem === color"
        :disabled="disabled"
        v-bind="colorPickerRadioAttrs"
        @update:model-value="onUpdateValue(color)"
      />
    </div>
  </ULabel>
</template>
