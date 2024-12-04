<script setup lang="ts">
import { nextTick, computed, provide, ref, useId, useTemplateRef } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULink from "../ui.button-link/ULink.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { getDefaults } from "../utils/ui.ts";

import { vClickOutside } from "../directives";

import { UDropdownLink } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UDropdownLinkProps, IconSize } from "./types.ts";
import type { Option } from "../ui.dropdown-list/types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDropdownLinkProps>(), {
  ...getDefaults<UDropdownLinkProps>(defaultConfig, UDropdownLink),
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

  return sizes[props.size] as IconSize;
});

function onClickLink() {
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

function onClickOption(option: Option) {
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
            :name="config.defaults?.dropdownIcon"
            v-bind="dropdownIconAttrs"
            :data-test="`${dataTest}-dropdown`"
            @click="onClickLink"
          />
        </slot>
      </template>
    </ULink>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdown-list"
      :size="size"
      :options="options"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="`${dataTest}-list`"
      @click="onClickList"
      @click-option="onClickOption"
    />
  </div>
</template>
