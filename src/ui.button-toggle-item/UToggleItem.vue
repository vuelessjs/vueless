<template>
  <UButton
    tabindex="0"
    :for="id"
    :no-ring="!getToggleSeparated()"
    color="grayscale"
    variant="secondary"
    :label="label"
    :size="getToggleSize()"
    :round="getToggleRound()"
    :block="getToggleBlock()"
    :square="getToggleSquare()"
    :disabled="getToggleDisabled()"
    v-bind="toggleButtonAttrs"
    @click="onClickSetValue"
  >
    <template #left>
      <!-- @slot Use it to add something before the label. -->
      <slot name="left" />
    </template>

    <!-- @slot Use it to add something instead of the label. -->
    <template #default>
      <input
        :id="id"
        v-model="selectedItem"
        :name="getToggleName()"
        :type="getToggleType()"
        :value="value"
        :disabled="getToggleDisabled()"
        v-bind="toggleInputAttrs"
      />

      <!--
        @slot Use it to add something instead of the label.
        @binding {string} label
      -->
      <slot name="default" :label="label">
        {{ label }}
      </slot>
    </template>

    <template #right>
      <!-- @slot Use it to add something after the label. -->
      <slot name="right" />
    </template>
  </UButton>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue";

import UButton from "../ui.button/UButton.vue";
import { getRandomId, getDefault } from "../utils/utilUI.js";

import { TYPE_RADIO } from "../ui.button-toggle/constants.js";

import useAttrs from "./useAttrs.js";
import defaultConfig from "./config.js";
import { UToggleItem } from "./constants.js";

defineOptions({ inheritAttrs: false });

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
    default: getDefault(defaultConfig, UToggleItem).disabled,
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
   * Data-test attribute for automated testing.
   */
  dataTest: {
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
const getToggleType = inject("getToggleType", () => getDefault(defaultConfig, UToggleItem).type);
const getToggleSize = inject("getToggleSize", () => getDefault(defaultConfig, UToggleItem).size);
const getToggleRound = inject("getToggleRound", () => getDefault(defaultConfig, UToggleItem).round);
const getToggleBlock = inject("getToggleBlock", () => getDefault(defaultConfig, UToggleItem).block);
const getToggleSquare = inject("getToggleSquare", () => getDefault(defaultConfig, UToggleItem).square);
const getToggleVariant = inject("getToggleVariant",() => getDefault(defaultConfig, UToggleItem).variant);
const getToggleSeparated = inject("getToggleSeparated", () => true);
const getToggleDisabled = inject("getToggleDisabled", () => props.disabled || getDefault(defaultConfig, UToggleItem).disabled);
/* eslint-enaable prettier/prettier, vue/max-len */

const { selectedValue, updateSelectedValue } = inject("toggleSelectedValue", {});

const selectedItem = ref("");

const isSelected = computed(() => {
  return Array.isArray(selectedValue?.value)
    ? selectedValue?.value?.includes(props.value)
    : selectedValue?.value === props.value;
});

const { toggleButtonAttrs, toggleInputAttrs } = useAttrs(props, {
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
