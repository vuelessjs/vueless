<script setup lang="ts">
import { ref, computed, nextTick, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UBadge from "../ui.text-badge/UBadge.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { vClickOutside } from "../directives";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";
import type { Option } from "../ui.dropdown-list/types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  label: "",
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

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  opened: isShownOptions.value,
}));

const { config, wrapperAttrs, dropdownBadgeAttrs, dropdownListAttrs, dropdownIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
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

      <template #right="{ iconSize }">
        <!--
          @slot Use it to add something after the label.
          @binding {boolean} opened
        -->
        <slot name="right" :opened="isShownOptions">
          <UIcon
            v-if="!noIcon"
            internal
            color="inherit"
            :size="iconSize"
            :name="config.defaults.dropdownIcon"
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
      :color="color"
      :options="options"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="`${dataTest}-list`"
      @click-option="onClickOption"
    />
  </div>
</template>
