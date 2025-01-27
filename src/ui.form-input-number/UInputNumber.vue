<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import ULabel from "../ui.form-label/ULabel.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { UInputNumberProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UInputNumberProps>(), {
  ...getDefaults<UInputNumberProps, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the input value changes.
   * @property {number} modelValue
   */
  "update:modelValue",
]);

const count = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isAddButtonDisabled = computed(() => count.value >= props.max);
const isRemoveButtonDisabled = computed(() => count.value <= props.min);

function onClickRemove() {
  const newCount = count.value - props.step;

  count.value = newCount >= props.min ? newCount : count.value;
}

function onClickAdd() {
  const newCount = count.value + props.step;

  count.value = newCount <= props.max ? newCount : count.value;
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  config,
  valueAttrs,
  labelAttrs,
  removeButtonAttrs,
  removeIconAttrs,
  addButtonAttrs,
  addIconAttrs,
  numberAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <ULabel
    :label="label"
    :description="description"
    :disabled="disabled"
    :error="error"
    :size="size"
    :align="labelAlign"
    centred
    v-bind="labelAttrs"
    :data-test="dataTest"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <UButton
      variant="thirdary"
      size="2xs"
      filled
      square
      round
      :disabled="isRemoveButtonDisabled || disabled"
      v-bind="removeButtonAttrs"
      :data-test="`${dataTest}-remove`"
      @click="onClickRemove"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.removeIcon"
        :color="isRemoveButtonDisabled ? 'gray' : 'grayscale'"
        v-bind="removeIconAttrs"
      />
    </UButton>

    <div v-bind="numberAttrs">
      <div v-bind="valueAttrs" v-text="count" />
    </div>

    <UButton
      variant="thirdary"
      size="2xs"
      filled
      square
      round
      :disabled="isAddButtonDisabled || disabled"
      v-bind="addButtonAttrs"
      :data-test="`${dataTest}-add`"
      @click="onClickAdd"
    >
      <UIcon
        internal
        :size="size"
        :name="config.defaults.addIcon"
        :color="isAddButtonDisabled ? 'gray' : 'grayscale'"
        v-bind="addIconAttrs"
      />
    </UButton>
  </ULabel>
</template>
