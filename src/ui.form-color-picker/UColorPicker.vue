<script setup lang="ts">
import { computed, useId } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import URadio from "../ui.form-radio/URadio.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/ui.ts";

import { UColorPicker } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UColorPickerProps, IconSize } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UColorPickerProps>(), {
  name: getDefault<UColorPickerProps>(defaultConfig, UColorPicker).name,
  size: getDefault<UColorPickerProps>(defaultConfig, UColorPicker).size,
  colorOptions: getDefault<UColorPickerProps>(defaultConfig, UColorPicker).colorOptions,
  disabled: getDefault<UColorPickerProps>(defaultConfig, UColorPicker).disabled,
  dataTest: "",
  config: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when color value changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const elementId = props.id || useId();

const {
  config,
  colorPickerLabelAttrs,
  listAttrs,
  colorPickerRadioAttrs,
  unselectedColorPickerRadioAttrs,
  unselectedIconAttrs,
  unselectedAttrs,
} = useAttrs(props);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const iconSize = computed(() => {
  const sizes = {
    xs: "3xs",
    sm: "2xs",
    md: "xs",
    lg: "sm",
    xl: "md",
  };

  return sizes[props.size] as IconSize;
});

function onUpdateValue(value: string) {
  selectedItem.value = value;
}
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
            :size="iconSize"
            color="gray"
            :name="config.defaults?.unselectedIcon"
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
