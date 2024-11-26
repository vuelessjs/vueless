<script setup lang="ts">
import { computed, inject, onMounted, ref, useId } from "vue";

import UButton from "../ui.button/UButton.vue";
import { getDefault } from "../utils/ui.ts";

import { TYPE_RADIO } from "../ui.button-toggle/constants.ts";

import useAttrs from "./useAttrs.ts";
import defaultConfig from "./config.ts";
import { UToggleItem } from "./constants.ts";

import type { UToggleItemProps, ToggleInjectValues, ToggleContextType } from "./types.ts";

type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UToggleItemProps>(), {
  disabled: getDefault<UToggleItemProps>(defaultConfig, UToggleItem).disabled,
  dataTest: "",
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
  getDefault<ToggleInjectValues>(defaultConfig, UToggleItem).type || TYPE_RADIO
);
const getToggleSize = inject<() => ButtonSize>("getToggleSize", () =>
  getDefault<ToggleInjectValues>(defaultConfig, UToggleItem).size as ButtonSize || "md" as ButtonSize
);
const getToggleRound = inject<() => boolean>("getToggleRound", () =>
  getDefault<ToggleInjectValues>(defaultConfig, UToggleItem).round || false
);
const getToggleBlock = inject<() => boolean>("getToggleBlock", () =>
  getDefault<ToggleInjectValues>(defaultConfig, UToggleItem).block || false
);
const getToggleSquare = inject<() => boolean>("getToggleSquare", () =>
  getDefault<ToggleInjectValues>(defaultConfig, UToggleItem).square || false
);
const getToggleVariant = inject<() => string>("getToggleVariant", () =>
  getDefault<ToggleInjectValues>(defaultConfig, UToggleItem).variant || "secondary"
);
const getToggleSeparated = inject<() => boolean>("getToggleSeparated", () => true);
const getToggleDisabled = inject<() => boolean>("getToggleDisabled", () =>
  props.disabled || getDefault<ToggleInjectValues>(defaultConfig, UToggleItem).disabled || false
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

const { toggleButtonAttrs, toggleInputAttrs } = useAttrs(props, {
  isSelected,
  separated: getToggleSeparated(),
  variant: getToggleVariant(),
});

onMounted(() => {
  const propValueString = props.value?.toString() ?? "";

  if (getToggleType() === TYPE_RADIO) {
    selectedItem.value = selectedValue?.value ?? "";
  } else {
    selectedItem.value = selectedValue?.value?.includes(propValueString) ? true : false;
  }
});

function onClickSetValue() {
  const propValueString = props.value?.toString() ?? "";

  if (getToggleType() === TYPE_RADIO) {
    selectedItem.value = propValueString;
  } else {
    selectedItem.value = selectedValue?.value?.includes(propValueString) ? true : false;
  }

  updateSelectedValue && updateSelectedValue(propValueString, !selectedItem.value);

  emit("update:modelValue", props.value);
}
</script>

<template>
  <UButton
    tabindex="0"
    :for="elementId"
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
