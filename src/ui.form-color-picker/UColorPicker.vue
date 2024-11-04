<template>
  <ULabel
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    align="topWithDesc"
    :data-test="dataTest"
    v-bind="colorPickerLabelAttrs"
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

<script setup>
import { computed, useId } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import URadio from "../ui.form-radio/URadio.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/ui.ts";

import { UColorPicker } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Color picker selected value.
   */
  modelValue: {
    type: String,
    default: "",
  },

  /**
   * Color picker name.
   */
  name: {
    type: String,
    default: getDefault(defaultConfig, UColorPicker).name,
  },

  /**
   * Color picker label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Color picker description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Error message.
   */
  error: {
    type: String,
    default: "",
  },

  /**
   * Color picker size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UColorPicker).size,
  },

  /**
   * Color picker color list.
   */
  colorOptions: {
    type: Array,
    default: () => getDefault(defaultConfig, UColorPicker).colorOptions,
  },

  /**
   * Set color picker disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UColorPicker).disabled,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Component config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "radio",
  },
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

  return sizes[props.size];
});

function onUpdateValue(value) {
  selectedItem.value = value;
}
</script>
