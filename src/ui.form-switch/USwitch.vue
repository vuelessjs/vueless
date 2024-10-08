<template>
  <ULabel
    :for="elementId"
    :size="size"
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    :data-test="dataTest"
    v-bind="switchLabelAttrs"
    @click="onClickToggle"
  >
    <label :for="elementId" v-bind="wrapperAttrs">
      <input
        :id="elementId"
        v-model="checkedValue"
        type="checkbox"
        :disabled="disabled"
        v-bind="inputAttrs"
        @click="onClickToggle"
        @keydown.space="onKeydownSpace"
      />

      <span v-bind="circleAttrs">
        <UIcon
          v-if="toggleIcon"
          internal
          :name="checkedValue ? config.defaults.onIcon : config.defaults.offIcon"
          :color="iconColor"
          :size="iconSize"
          v-bind="toggleIconAttrs"
        />
      </span>

      <span v-if="toggleLabel" v-bind="toggleLabelAttrs" v-text="switchLabel" />
    </label>
  </ULabel>
</template>

<script setup>
import { computed, useId } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/utilUI.js";

import { USwitch } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Switch value.
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * Label alignment.
   * @values top, left, right
   */
  labelAlign: {
    type: String,
    default: getDefault(defaultConfig, USwitch).labelAlign,
  },

  /**
   * Switch label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Switch description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Switch size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, USwitch).size,
  },

  /**
   * Switch color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white   */
  color: {
    type: String,
    default: getDefault(defaultConfig, USwitch).color,
  },

  /**
   * Show toggle icons inside the circle.
   */
  toggleIcon: {
    type: Boolean,
    default: getDefault(defaultConfig, USwitch).toggleIcon,
  },

  /**
   * Show toggle labels (on / off).
   */
  toggleLabel: {
    type: Boolean,
    default: getDefault(defaultConfig, USwitch).toggleLabel,
  },

  /**
   * Set switch disabled.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, USwitch).disabled,
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
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when switch value changes.
   * @property {Boolean} value
   */
  "update:modelValue",
]);

const { tm } = useLocale();

const i18nGlobal = tm(USwitch);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const checkedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const elementId = props.id || useId();

const {
  config,
  toggleIconAttrs,
  switchLabelAttrs,
  inputAttrs,
  wrapperAttrs,
  circleAttrs,
  toggleLabelAttrs,
} = useAttrs(props, { checked: checkedValue });

const switchLabel = computed(() => {
  return checkedValue.value ? currentLocale.value.active : currentLocale.value.inactive;
});

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

const iconColor = computed(() => {
  return checkedValue.value ? props.color : "grayscale";
});

function toggle() {
  if (!props.disabled) {
    checkedValue.value = !checkedValue.value;
  }
}

function onClickToggle() {
  toggle();
}

function onKeydownSpace() {
  toggle();
}
</script>
