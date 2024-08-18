<template>
  <UButton
    tabindex="0"
    :for="id"
    :no-ring="!getToggleSeparated()"
    color="grayscale"
    variant="secondary"
    :label="label"
    :size="getToggleSize()"
    :pill="getTogglePill()"
    :block="getToggleBlock()"
    :square="getToggleSquare()"
    :disabled="getToggleDisabled()"
    v-bind="buttonAttrs"
    @click="onClickSetValue"
  >
    <template #left>
      <!-- @slot Use it to add something before the text. -->
      <slot name="left" />
    </template>

    <template #default>
      <input
        :id="id"
        v-model="selectedItem"
        :name="getToggleName()"
        :type="getToggleType()"
        :value="value"
        :disabled="getToggleDisabled()"
        v-bind="inputAttrs"
      />
      {{ label }}
      <!-- @slot Use it to add something instead of the text. -->
      <slot name="default" />
    </template>

    <template #right>
      <!-- @slot Use it to add something after the text. -->
      <slot name="right" />
    </template>
  </UButton>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue";

import UButton from "../ui.button";
import UIService, { getRandomId } from "../service.ui";

import { TYPE_RADIO } from "../ui.button-toggle/constants";

import useAttrs from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";
import { UToggleItem } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UToggleItem", inheritAttrs: false });

const props = defineProps({
  /**
   * Selected value.
   */
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },

  /**
   * Value for checkbox state.
   */
  value: {
    type: [String, Number],
    default: "",
  },

  /**
   * Toggle item label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Make toggle item disabled.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UToggleItem).default.disabled,
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
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when new value is set.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

/* eslint-disable prettier/prettier, vue/max-len */
const getToggleName = inject("getToggleName", () => "toggle");
const getToggleType = inject("getToggleType", () => UIService.get(defaultConfig, UToggleItem).default.type);
const getToggleSize = inject("getToggleSize", () => UIService.get(defaultConfig, UToggleItem).default.size);
const getTogglePill = inject("getTogglePill", () => UIService.get(defaultConfig, UToggleItem).default.pill);
const getToggleBlock = inject("getToggleBlock", () => UIService.get(defaultConfig, UToggleItem).default.block);
const getToggleSquare = inject("getToggleSquare", () => UIService.get(defaultConfig, UToggleItem).default.square);
const getToggleVariant = inject("getToggleVariant",() => UIService.get(defaultConfig, UToggleItem).default.variant);
const getToggleSeparated = inject("getToggleSeparated", () => true);
const getToggleDisabled = inject("getToggleDisabled", () => props.disabled || UIService.get(defaultConfig, UToggleItem).default.disabled);
/* eslint-enaable prettier/prettier, vue/max-len */

const { selectedValue, updateSelectedValue } = inject("toggleSelectedValue", {});

const selectedItem = ref("");

const isSelected = computed(() => {
  return Array.isArray(selectedValue?.value)
    ? selectedValue?.value?.includes(props.value)
    : selectedValue?.value === props.value;
});

const { buttonAttrs, inputAttrs } = useAttrs(props, {
  isSelected,
  separated: getToggleSeparated,
  variant: getToggleVariant
});

onMounted(() => {
  selectedItem.value = getToggleType() === TYPE_RADIO
  ? selectedValue?.value || selectedItem.value
  : selectedValue?.value?.includes(props.value) || selectedItem.value;
});

function onClickSetValue() {
  selectedItem.value = getToggleType() === TYPE_RADIO
  ? props.value
  : selectedValue?.value?.includes(props.value) || selectedItem.value;

  updateSelectedValue && updateSelectedValue(props.value, !selectedItem.value);

  emit("update:modelValue", props.value);
}
</script>
