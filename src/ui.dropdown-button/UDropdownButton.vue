<script setup lang="ts">
import { nextTick, computed, provide, ref, useId, useTemplateRef } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { getDefault } from "../utils/ui.ts";

import { vClickOutside } from "../directives";

import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import { UDropdownButton, BUTTON_VARIANT } from "./constants.ts";

import type { UDropdownButtonProps } from "./types.ts";
import type { Option } from "../ui.dropdown-list/types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDropdownButtonProps>(), {
  label: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).label,
  options: () => [],
  labelKey: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).labelKey,
  variant: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).variant,
  color: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).color,
  filled: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).filled,
  size: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).size,
  round: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).round,
  square: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).square,
  disabled: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).disabled,
  noIcon: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).noIcon,
  yPosition: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).yPosition,
  xPosition: getDefault<UDropdownButtonProps>(defaultConfig, UDropdownButton).xPosition,
  id: "",
  dataTest: "",
  config: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers on dropdown option click.
   * @property {string} value
   */
  "clickOption",
]);

provide("hideDropdownOptions", hideOptions);

type UDropdownListRef = InstanceType<typeof UDropdownList>;

const isShownOptions = ref(false);
const dropdownListRef = useTemplateRef<UDropdownListRef>("dropdown-list");

const elementId = props.id || useId();

const { config, dropdownButtonAttrs, dropdownListAttrs, dropdownIconAttrs, wrapperAttrs } =
  useAttrs(props, { isShownOptions });

const iconColor = computed(() => {
  return props.variant === BUTTON_VARIANT.primary ? "white" : props.color;
});

type IconSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
const iconSize = computed(() => {
  const sizes = {
    "2xs": "xs",
    xs: "xs",
    sm: "sm",
    md: "sm",
    lg: "md",
    xl: "md",
  };

  return sizes[props.size] as IconSize;
});

type DropdownSize = "sm" | "md" | "lg";
const dropdownSize = computed(() => {
  const sizes = {
    "2xs": "sm",
    xs: "sm",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "lg",
  };

  return sizes[props.size] as DropdownSize;
});

function onClickOption(option: Option) {
  emit("clickOption", option);
}

function onClickButton() {
  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value?.wrapperRef?.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickList() {
  hideOptions();
}
</script>

<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UButton
      :id="elementId"
      :label="label"
      :size="size"
      :color="color"
      :round="round"
      :square="square"
      :variant="variant"
      :disabled="disabled"
      :filled="filled || isShownOptions"
      v-bind="dropdownButtonAttrs"
      :data-test="dataTest"
      @click="onClickButton"
    >
      <template #left>
        <!--
          @slot Use it to add something before the label.
          @binding {boolean} opened
        -->
        <slot name="left" :opened="isShownOptions" />
      </template>

      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} opened
        -->
        <slot :label="label" :opened="isShownOptions" />
      </template>

      <template #right>
        <!--
          @slot Use it to add something after the label.
          @binding {boolean} opened
        -->
        <slot name="right" :opened="isShownOptions">
          <UIcon
            v-if="!noIcon"
            internal
            :size="iconSize"
            :color="iconColor"
            :name="config.defaults?.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="`${dataTest}-dropdown`"
          />
        </slot>
      </template>
    </UButton>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdown-list"
      :size="dropdownSize"
      :options="options"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="`${dataTest}-list`"
      @click="onClickList"
      @click-option="onClickOption"
    />
  </div>
</template>
