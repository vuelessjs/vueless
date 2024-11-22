<script setup lang="ts">
import { nextTick, ref, useId, useTemplateRef } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UBadge from "../ui.text-badge/UBadge.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { getDefault } from "../utils/ui.ts";

import { vClickOutside } from "../directives";

import defaultConfig from "./config.ts";
import { UDropdownBadge } from "./constants.ts";
import useAttrs from "./useAttrs.ts";

import type { UDropdownBadgeProps } from "./types.ts";
import type { Option } from "../ui.dropdown-list/types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDropdownBadgeProps>(), {
  label: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).label,
  options: () => [],
  labelKey: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).labelKey,
  variant: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).variant,
  color: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).color,
  size: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).size,
  round: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).round,
  noIcon: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).noIcon,
  yPosition: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).yPosition,
  xPosition: getDefault<UDropdownBadgeProps>(defaultConfig, UDropdownBadge).xPosition,
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

type UDropdownListRef = InstanceType<typeof UDropdownList>;

const isShownOptions = ref(false);
const dropdownListRef = useTemplateRef<UDropdownListRef>("dropdown-list");

const elementId = props.id || useId();

const { config, wrapperAttrs, dropdownBadgeAttrs, dropdownListAttrs, dropdownIconAttrs } = useAttrs(
  props,
  {
    isShownOptions,
  },
);

function onClickBadge() {
  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value?.wrapperRef?.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickOption(option: Option) {
  emit("clickOption", option);

  hideOptions();
}
</script>

<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <UBadge
      :id="elementId"
      :label="label"
      :size="size"
      :color="color"
      :variant="variant"
      v-bind="dropdownBadgeAttrs"
      tabindex="0"
      :data-test="dataTest"
      @click="onClickBadge"
      @keydown.enter="onClickBadge"
      @keydown.space.prevent="onClickBadge"
    >
      <template #left>
        <!--
          @slot Use it to add something before the label.
          @binding {string} label
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

      <template #right="{ iconColor }">
        <!--
          @slot Use it to add something after the label.
          @binding {boolean} opened
        -->
        <slot name="right" :opened="isShownOptions">
          <UIcon
            v-if="!noIcon"
            internal
            :color="iconColor"
            :size="size"
            :name="config.defaults?.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="`${dataTest}-dropdown`"
          />
        </slot>
      </template>
    </UBadge>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdown-list"
      :size="size"
      :options="options"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="`${dataTest}-list`"
      @click-option="onClickOption"
    />
  </div>
</template>
