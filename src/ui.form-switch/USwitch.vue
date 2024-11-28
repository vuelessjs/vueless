<script setup lang="ts">
import { computed, useId } from "vue";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import { getDefault } from "../utils/ui.ts";

import { USwitch } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import { useLocale } from "../composables/useLocale.ts";

import type { USwitchProps, IconSize } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<USwitchProps>(), {
  labelAlign: getDefault<USwitchProps>(defaultConfig, USwitch).labelAlign,
  size: getDefault<USwitchProps>(defaultConfig, USwitch).size,
  color: getDefault<USwitchProps>(defaultConfig, USwitch).color,
  toggleIcon: getDefault<USwitchProps>(defaultConfig, USwitch).toggleIcon,
  toggleLabel: getDefault<USwitchProps>(defaultConfig, USwitch).toggleLabel,
  disabled: getDefault<USwitchProps>(defaultConfig, USwitch).disabled,
  modelValue: false,
  dataTest: "",
  config: () => ({}),
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
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config?.i18n));

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

  return sizes[props.size] as IconSize;
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
          :name="checkedValue ? config.defaults?.onIcon : config.defaults?.offIcon"
          :color="iconColor"
          :size="iconSize"
          v-bind="toggleIconAttrs"
        />
      </span>

      <span v-if="toggleLabel" v-bind="toggleLabelAttrs" v-text="switchLabel" />
    </label>
  </ULabel>
</template>
