<template>
  <ULabel
    :for="id"
    :size="size"
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    :data-cy="dataCy"
    v-bind="labelAttrs"
    @click="onClickToggle"
  >
    <label :for="id" v-bind="wrapperAttrs">
      <input
        :id="id"
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
          :name="checkedValue ? config.selectedIconName : config.unselectedIconName"
          :color="iconColor"
          :size="iconSize"
          v-bind="iconAttrs"
        />
      </span>

      <span v-if="toggleLabel" v-bind="toggleLabelAttrs" v-text="switchLabel" />
    </label>
  </ULabel>
</template>

<script setup>
import { computed } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon";
import ULabel from "../ui.form-label";
import { getRandomId, getDefault } from "../service.ui";

import { USwitch } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

/* Should be a string for correct web-types gen */
defineOptions({ name: "USwitch", inheritAttrs: false });

const props = defineProps({
  /**
   * Set switch value.
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
   * Set label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * The size of the switch.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, USwitch).size,
  },

  /**
   * The color of the switch.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white   */
  color: {
    type: String,
    default: getDefault(defaultConfig, USwitch).color,
  },

  /**
   * Show on / off icon inside circle.
   */
  toggleIcon: {
    type: Boolean,
    default: getDefault(defaultConfig, USwitch).toggleIcon,
  },

  /**
   * The label variant of the switch.
   */
  toggleLabel: {
    type: Boolean,
    default: getDefault(defaultConfig, USwitch).toggleLabel,
  },

  /**
   * Show on / off icon inside circle.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, USwitch).disabled,
  },

  /**
   * Unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
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

const { config, iconAttrs, labelAttrs, inputAttrs, wrapperAttrs, circleAttrs, toggleLabelAttrs } =
  useAttrs(props, { checked: checkedValue });

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
