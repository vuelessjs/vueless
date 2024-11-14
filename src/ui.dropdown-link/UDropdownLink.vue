<script lang="ts" setup>
import { nextTick, computed, provide, ref, useId } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULink from "../ui.button-link/ULink.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { getDefault } from "../utils/ui.ts";

import { vClickOutside } from "../directives";

import { UDropdownLink } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UDropdownLinkProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDropdownLinkProps>(), {
  labelKey: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).labelKey,
  color: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).color,
  size: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).size,
  underlined: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).underlined,
  dashed: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).dashed,
  disabled: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).disabled,
  noRing: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).noRing,
  noIcon: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).noIcon,
  yPosition: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).yPosition,
  xPosition: getDefault<UDropdownLinkProps>(defaultConfig, UDropdownLink).xPosition,
  dataTest: "",
});

const emit = defineEmits([
  /**
   * Triggers on dropdown option click.
   * @property {string} value
   */
  "clickOption",
]);

provide("hideDropdownOptions", hideOptions);

const isShownOptions = ref(false);
const dropdownListRef = ref(null);

const elementId = props.id || useId();

const { config, wrapperAttrs, dropdownLinkAttrs, dropdownListAttrs, dropdownIconAttrs } = useAttrs(
  props,
  { isShownOptions },
);

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

function onClickLink() {
  isShownOptions.value = !isShownOptions.value;

  if (isShownOptions.value) {
    nextTick(() => dropdownListRef.value.wrapperRef.focus());
  }
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickList() {
  hideOptions();
}

function onClickOption(option) {
  emit("clickOption", option);
}
</script>

<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <ULink
      :id="elementId"
      :size="size"
      :label="label"
      :color="color"
      :dashed="dashed"
      :no-ring="noRing"
      :disabled="disabled"
      :underlined="underlined"
      v-bind="dropdownLinkAttrs"
      :data-test="dataTest"
      @click="onClickLink"
      @keydown.enter="onClickLink"
      @keydown.space.prevent="onClickLink"
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
            interactive
            :color="color"
            :size="iconSize"
            :name="config.defaults.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="`${dataTest}-dropdown`"
            @click="onClickLink"
          />
        </slot>
      </template>
    </ULink>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdownListRef"
      :size="size"
      :options="options"
      :label-key="labelKey"
      :data-test="`${dataTest}-list`"
      v-bind="dropdownListAttrs"
      @click="onClickList"
      @click-option="onClickOption"
    />
  </div>
</template>
