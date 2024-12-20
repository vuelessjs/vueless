<script setup lang="ts">
import { computed, inject, onMounted, ref, useId } from "vue";

import UButton from "../ui.button/UButton.vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { TYPE_RADIO } from "../ui.button-toggle/constants.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, ToggleInjectValues, ToggleContextType, Config } from "./types.ts";

type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when new value is set.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

/* eslint-disable prettier/prettier */
const getToggleName = inject<() => string>("getToggleName", () => "toggle");
const getToggleType = inject<() => string>("getToggleType", () =>
  getDefaults<ToggleInjectValues, Config>(defaultConfig, COMPONENT_NAME).type || TYPE_RADIO
);
const getToggleSize = inject<() => ButtonSize>("getToggleSize", () =>
  (getDefaults<ToggleInjectValues, Config>(defaultConfig, COMPONENT_NAME).size || "md") as ButtonSize
);
const getToggleRound = inject<() => boolean>("getToggleRound", () =>
  getDefaults<ToggleInjectValues, Config>(defaultConfig, COMPONENT_NAME).round || false
);
const getToggleBlock = inject<() => boolean>("getToggleBlock", () =>
  getDefaults<ToggleInjectValues, Config>(defaultConfig, COMPONENT_NAME).block || false
);
const getToggleSquare = inject<() => boolean>("getToggleSquare", () =>
  getDefaults<ToggleInjectValues, Config>(defaultConfig, COMPONENT_NAME).square || false
);
const getToggleSplit = inject<() => boolean>("getToggleSplit", () => true);
const getToggleDisabled = inject<() => boolean>("getToggleDisabled", () =>
  props.disabled || getDefaults<ToggleInjectValues, Config>(defaultConfig, COMPONENT_NAME).disabled || false
);
/* eslint-enable prettier/prettier */

const { selectedValue, updateSelectedValue } = inject<ToggleContextType>("toggleSelectedValue", {
  selectedValue: ref(""),
  updateSelectedValue: () => {},
});

const elementId = props.id || useId();

const selectedItem = ref<string | boolean>("");

const isSelected = computed(() => {
  return Array.isArray(selectedValue?.value)
    ? selectedValue?.value?.includes(props.value)
    : selectedValue?.value === props.value;
});

onMounted(() => {
  const propValueString = props.value?.toString() ?? "";

  selectedItem.value =
    getToggleType() === TYPE_RADIO
      ? (selectedValue?.value ?? "")
      : Boolean(selectedValue?.value?.includes(propValueString));
});

function onClickSetValue() {
  const propValueString = props.value?.toString() ?? "";

  selectedItem.value =
    getToggleType() === TYPE_RADIO
      ? propValueString
      : Boolean(selectedValue?.value?.includes(propValueString));

  updateSelectedValue && updateSelectedValue(propValueString, !selectedItem.value);

  emit("update:modelValue", props.value);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  selected: isSelected.value,
}));

const { toggleButtonAttrs, toggleButtonActiveAttrs, toggleInputAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <UButton
    :label="label"
    tabindex="0"
    color="brand"
    :for="elementId"
    :filled="getToggleSplit()"
    :no-ring="!getToggleSplit()"
    :size="getToggleSize()"
    :round="getToggleRound()"
    :block="getToggleBlock()"
    :square="getToggleSquare()"
    :disabled="getToggleDisabled() || disabled"
    v-bind="isSelected ? toggleButtonActiveAttrs : toggleButtonAttrs"
    @click="onClickSetValue"
  >
    <template #left>
      <!-- @slot Use it to add something before the label. -->
      <slot name="left" />
    </template>

    <!-- @slot Use it to add something instead of the label. -->
    <template #default>
      <input
        :id="elementId"
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
