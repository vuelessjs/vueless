<script setup lang="ts">
import { inject, ref, onMounted, computed, watchEffect, toValue, useId } from "vue";
import { isEqual } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config.ts";
import { UCheckbox } from "./constants.ts";

import type { UnknownObject } from "../types.ts";
import type { CheckboxProps, IconSize, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const getCheckboxGroupName = inject("getCheckboxGroupName", null);
const getCheckboxGroupCheckedItems = inject("getCheckboxGroupCheckedItems", null);
const setCheckboxGroupCheckedItems = inject<((value: UnknownObject[]) => void) | null>(
  "setCheckboxGroupCheckedItems",
  null,
);
const getCheckboxGroupColor = inject("getCheckboxGroupColor", null);
const getCheckboxSize = inject("getCheckboxSize", null);

const props = withDefaults(defineProps<CheckboxProps>(), {
  ...getDefaults<CheckboxProps, Config>(defaultConfig, UCheckbox),
  modelValue: false,
  value: "",
  trueValue: true,
  falseValue: false,
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when checkbox is toggled.
   * @property {Boolean} modelValue
   */
  "update:modelValue",

  /**
   * Triggers when checkbox is toggled.
   * @property {Boolean} modelValue
   */
  "input",
]);

const checkboxName = ref("");
const checkboxSize = ref(props.size);
const checkboxColor = ref(props.color);

const elementId = props.id || useId();

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size] as IconSize;
});

const isBinary = computed(() => !Array.isArray(props.modelValue));
const isCheckboxInGroup = computed(() => Boolean(toValue(getCheckboxGroupName)));

const isChecked = computed(() => {
  if (isBinary.value && !isCheckboxInGroup.value) {
    return isEqual(props.modelValue, props.trueValue);
  } else if (Array.isArray(currentValue.value)) {
    return currentValue.value.findIndex((item) => isEqual(item, checkboxValue.value)) !== -1;
  } else {
    return false;
  }
});

const checkboxValue = computed(() => {
  return props.value === "" ? "on" : props.value;
});

const currentValue = computed(() => {
  return isCheckboxInGroup.value ? toValue(getCheckboxGroupCheckedItems) : props.modelValue;
});

onMounted(() => {
  checkboxName.value =
    isCheckboxInGroup.value && getCheckboxGroupName ? toValue(getCheckboxGroupName) : props.name;
});

watchEffect(() => (checkboxColor.value = toValue(getCheckboxGroupColor) || props.color));
watchEffect(() => (checkboxSize.value = toValue(getCheckboxSize) || props.size));

function onChange() {
  let newModelValue;

  if (isBinary.value) {
    newModelValue = isChecked.value ? props.falseValue : props.trueValue;
  }

  if (!isBinary.value || isCheckboxInGroup.value) {
    if (Array.isArray(currentValue.value)) {
      newModelValue = !isChecked.value
        ? [...currentValue.value, checkboxValue.value]
        : currentValue.value.filter((item) => !isEqual(checkboxValue.value, item));
    } else {
      newModelValue = isChecked.value ? [checkboxValue.value] : [];
    }
  }

  if (isCheckboxInGroup.value && setCheckboxGroupCheckedItems) {
    setCheckboxGroupCheckedItems(newModelValue as UnknownObject[]);
  }

  emit("update:modelValue", newModelValue);
  emit("input", newModelValue);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  color: checkboxColor.value,
  size: checkboxSize.value,
  label: Boolean(props.label),
  error: Boolean(props.error),
}));

const { config, checkboxAttrs, iconWrapperAttrs, checkboxLabelAttrs, checkedIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    :for="elementId"
    :label="label"
    :error="error"
    :size="checkboxSize"
    :align="labelAlign"
    :disabled="disabled"
    :description="description"
    v-bind="checkboxLabelAttrs"
    :data-test="`${dataTest}-label`"
  >
    <input
      :id="elementId"
      type="checkbox"
      :value="checkboxValue"
      :true-value="trueValue"
      :false-value="falseValue"
      :name="checkboxName"
      :checked="isChecked"
      :disabled="disabled"
      v-bind="checkboxAttrs"
      :data-test="dataTest"
      @change="onChange"
    />

    <label v-if="isChecked" v-bind="iconWrapperAttrs" :for="elementId">
      <UIcon
        internal
        :name="partial ? config.defaults.partiallyCheckedIcon : config.defaults.checkedIcon"
        :size="iconSize"
        color="white"
        v-bind="checkedIconAttrs"
      />
    </label>

    <template #bottom>
      <!-- @slot Use it to add something below the checkbox. -->
      <slot name="bottom" />
    </template>
  </ULabel>
</template>
