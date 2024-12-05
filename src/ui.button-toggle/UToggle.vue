<script setup lang="ts">
import { computed, provide, readonly } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import UToggleItem from "../ui.button-toggle-item/UToggleItem.vue";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { UToggle, TYPE_RADIO, TYPE_CHECKBOX } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { Props, LabelSize, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UToggle),
  options: () => [],
  modelValue: "",
});

const emit = defineEmits([
  /**
   * Triggers when toggle item is selected.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const { toggleLabelAttrs, itemsAttrs, itemAttrs } = useAttrs(props);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const labelSize = computed(() => {
  const sizes = {
    "2xs": "sm",
    xs: "sm",
    sm: "md",
    md: "md",
    lg: "lg",
    xl: "lg",
  };

  return sizes[props.size] as LabelSize;
});

const type = computed(() => {
  return props.multiple ? TYPE_CHECKBOX : TYPE_RADIO;
});

function updateSelectedValue(value: string | number, checked: boolean) {
  if (type.value === TYPE_RADIO) {
    selectedValue.value = value;

    return;
  }

  if (Array.isArray(selectedValue.value)) {
    selectedValue.value = checked
      ? [...selectedValue.value, value]
      : selectedValue.value.filter((item) => String(item) !== String(value));
  } else {
    selectedValue.value = [value];
  }
}

provide("getToggleName", () => props.name);
provide("getToggleType", () => type.value);
provide("getToggleSize", () => props.size);
provide("getToggleRound", () => props.round);
provide("getToggleBlock", () => props.block);
provide("getToggleSquare", () => props.square);
provide("getToggleVariant", () => props.variant);
provide("getToggleDisabled", () => props.disabled);
provide("getToggleSeparated", () => props.separated);

provide("toggleSelectedValue", {
  selectedValue: readonly(selectedValue),
  updateSelectedValue,
});
</script>

<template>
  <ULabel
    :size="labelSize"
    :label="label"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    centred
    v-bind="toggleLabelAttrs"
    :data-test="dataTest"
  >
    <div v-bind="itemsAttrs">
      <!-- @slot Use it to add UToggleItem directly. -->
      <slot>
        <UToggleItem
          v-for="(item, index) in options"
          :key="item.value"
          :name="name"
          :model-value="item.value"
          :value="item.value"
          :disabled="disabled"
          :label="item.label"
          v-bind="itemAttrs"
          :data-test="`${dataTest}-item-${index}`"
        />
      </slot>
    </div>
  </ULabel>
</template>
