<template>
  <div v-bind="wrapperAttrs">
    <ULabel
      :label="label"
      :description="description"
      :disabled="disabled"
      :error="error"
      :size="size"
      placement="topWithDesc"
      :data-cy="dataCy"
      v-bind="labelAttrs"
    >
      <div v-bind="listAttrs">
        <div v-bind="uncoloredAttrs">
          <URadio
            key="uncolored"
            name="uncolored"
            :checked="selectedItem === ''"
            :disabled="disabled"
            :size="size"
            color="grayscale"
            v-bind="uncoloredRadioAttrs"
            @update:value="onInputRadio('')"
          />

          <UIcon
            v-if="selectedItem === ''"
            :name="config.iconName"
            color="gray"
            v-bind="iconAttrs"
            size="sm"
          />
        </div>

        <URadio
          v-for="(color, index) in colorOptions"
          :key="index"
          :name="name"
          :value="color"
          :checked="selectedItem === color"
          :color="color"
          :disabled="disabled"
          :size="size"
          v-bind="radioAttrs"
          @update:value="onInputRadio(color)"
        />
      </div>
    </ULabel>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon";
import URadio from "../ui.form-radio";
import ULabel from "../ui.form-label";
import UIService, { getRandomId } from "../service.ui";

import { UColorPicker } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

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
   * Color picker colors.
   */
  colorOptions: {
    type: Array,
    default: () => UIService.get(defaultConfig, UColorPicker).default.colorOptions,
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
   * Color picker name.
   */
  name: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Set color picker disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UColorPicker).default.disabled,
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

const emit = defineEmits(["update:modelValue"]);

const {
  config,
  wrapperAttrs,
  listAttrs,
  labelAttrs,
  radioAttrs,
  iconAttrs,
  uncoloredAttrs,
  uncoloredRadioAttrs,
} = useAttrs(props);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function onInputRadio(value) {
  selectedItem.value = value;
}
</script>
