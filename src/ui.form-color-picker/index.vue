<template>
  <ULabel
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    align="topWithDesc"
    :data-cy="dataCy"
    v-bind="labelAttrs"
  >
    <div v-bind="listAttrs">
      <div v-bind="unselectedAttrs">
        <URadio
          :id="id"
          :name="name"
          :size="size"
          color="gray"
          :checked="selectedItem === ''"
          :disabled="disabled"
          v-bind="unselectedRadioAttrs"
          @update:model-value="onUpdateValue('')"
        />

        <label :for="id">
          <UIcon
            v-if="selectedItem === ''"
            internal
            :size="iconSize"
            color="gray"
            :name="config.unselectedIconName"
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
        v-bind="radioAttrs"
        @update:model-value="onUpdateValue(color)"
      />
    </div>
  </ULabel>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon";
import URadio from "../ui.form-radio";
import ULabel from "../ui.form-label";
import UIService, { getRandomId } from "../service.ui";

import { UColorPicker } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UColorPicker", inheritAttrs: false });

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
    default: UIService.get(defaultConfig, UColorPicker).default.name,
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
    default: UIService.get(defaultConfig, UColorPicker).default.size,
  },

  /**
   * Color picker color list.
   */
  colorOptions: {
    type: Array,
    default: () => UIService.get(defaultConfig, UColorPicker).default.colorOptions,
  },

  /**
   * Set color picker disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UColorPicker).default.disabled,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
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

const {
  config,
  labelAttrs,
  listAttrs,
  radioAttrs,
  unselectedIconAttrs,
  unselectedAttrs,
  unselectedRadioAttrs,
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
