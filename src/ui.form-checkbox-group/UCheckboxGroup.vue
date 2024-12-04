<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { isEqual } from "lodash-es";

import { getDefaults } from "../utils/ui.ts";

import ULabel from "../ui.form-label/ULabel.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import { UCheckboxGroup } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UnknownObject } from "../types.ts";
import type { UCheckboxGroupProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UCheckboxGroupProps>(), {
  ...getDefaults<UCheckboxGroupProps, Config>(defaultConfig, UCheckboxGroup),
});

const emit = defineEmits([
  /**
   * Triggers when checkbox value changes.
   * @property {object} value
   */
  "update:modelValue",
]);

const checkedItems = ref<UnknownObject[]>([]);

const { groupLabelAttrs, groupCheckboxAttrs, listAttrs } = useAttrs(props);

provide<(value: UnknownObject[]) => void>(
  "setCheckboxGroupCheckedItems",
  (value: UnknownObject[]) => {
    checkedItems.value = value;
  },
);
provide<() => UnknownObject[]>("getCheckboxGroupCheckedItems", () => checkedItems.value);
provide<() => string>("getCheckboxGroupName", () => props.name);
provide("getCheckboxGroupColor", () => props.color);
provide("getCheckboxSize", () => props.size);

watch(() => checkedItems.value.length, onChangeCheckedItems);
watch(
  () => props?.modelValue?.length,
  (newValue, oldValue) => {
    if (!isEqual(newValue, oldValue)) {
      checkedItems.value = props.modelValue();
    }
  },
  { immediate: true },
);

function onChangeCheckedItems() {
  emit("update:modelValue", checkedItems.value);
}
</script>

<template>
  <ULabel
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :disabled="disabled"
    align="topWithDesc"
    v-bind="groupLabelAttrs"
    :data-test="dataTest"
  >
    <div v-bind="listAttrs">
      <!-- @slot Use it to add URadio directly. -->
      <slot>
        <UCheckbox
          v-for="(option, index) in options()"
          :key="option.id"
          :model-value="modelValue"
          :value="option.value"
          :true-value="option.trueValue"
          :false-value="option.falseValue"
          :label="option.label"
          :description="option.description"
          :disabled="disabled"
          v-bind="groupCheckboxAttrs"
          :data-test="`${dataTest}-item-${index}`"
        />
      </slot>
    </div>
  </ULabel>
</template>
