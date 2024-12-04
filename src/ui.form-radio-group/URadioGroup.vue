<script setup lang="ts">
import { computed, provide } from "vue";

import ULabel from "../ui.form-label/ULabel.vue";
import URadio from "../ui.form-radio/URadio.vue";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { URadioGroup } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { URadioGroupProps, SetRadioGroupSelectedItem, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<URadioGroupProps>(), {
  ...getDefaults<URadioGroupProps, Config>(defaultConfig, URadioGroup),
});

const emit = defineEmits([
  /**
   * Triggers when the value attribute changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const { groupLabelAttrs, listAttrs, groupRadioAttrs } = useAttrs(props);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

provide<SetRadioGroupSelectedItem>("setRadioGroupSelectedItem", (value) => {
  selectedItem.value = value;
});
provide("getRadioGroupSelectedItem", () => selectedItem.value);
provide("getRadioGroupName", () => props.name);
provide("getRadioGroupColor", () => props.color);
provide("getRadioGroupSize", () => props.size);
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
        <URadio
          v-for="(option, index) in options()"
          :key="index"
          :model-value="selectedItem"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :disabled="disabled"
          v-bind="groupRadioAttrs"
          :data-test="`${dataTest}-item-${index}`"
        />
      </slot>
    </div>
  </ULabel>
</template>
