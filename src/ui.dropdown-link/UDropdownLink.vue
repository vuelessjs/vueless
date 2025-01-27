<script setup lang="ts">
import { nextTick, computed, provide, ref, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULink from "../ui.button-link/ULink.vue";
import UDropdownList from "../ui.dropdown-list/UDropdownList.vue";

import { vClickOutside } from "../directives";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

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

provide("hideDropdownOptions", hideOptions);

type UDropdownListRef = InstanceType<typeof UDropdownList>;

const isShownOptions = ref(false);
const dropdownListRef = useTemplateRef<UDropdownListRef>("dropdown-list");

const elementId = props.id || useId();

function onClickLink() {
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

const { config, getDataTest, wrapperAttrs, dropdownLinkAttrs, dropdownListAttrs, toggleIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div v-click-outside="hideOptions" v-bind="wrapperAttrs">
    <!--
      @slot Use it to add something before the label.
      @binding {boolean} opened
    -->
    <slot name="left" :opened="isShownOptions" />

    <ULink
      :id="elementId"
      :size="size"
      :label="label"
      :color="color"
      :dashed="dashed"
      :disabled="disabled"
      :underlined="underlined"
      v-bind="dropdownLinkAttrs"
      :data-test="getDataTest()"
      @click="onClickLink"
      @keydown.enter="onClickLink"
      @keydown.space.prevent="onClickLink"
    >
      <template #default>
        <!--
          @slot Use it to add something instead of the default label.
          @binding {string} label
          @binding {boolean} opened
        -->
        <slot :label="label" :opened="isShownOptions" />
      </template>
    </ULink>

    <!--
      @slot Use it to add something instead of the toggle icon.
      @binding {boolean} opened
    -->
    <slot name="toggle" :opened="isShownOptions">
      <UIcon
        v-if="!noIcon"
        internal
        interactive
        :color="color"
        :name="config.defaults.toggleIcon"
        v-bind="toggleIconAttrs"
        :data-test="getDataTest('toggle')"
        @click="onClickLink"
      />
    </slot>

    <UDropdownList
      v-if="isShownOptions"
      ref="dropdown-list"
      :size="size"
      :color="color"
      :options="options"
      :label-key="labelKey"
      v-bind="dropdownListAttrs"
      :data-test="getDataTest('list')"
      @click-option="onClickOption"
    />
  </div>
</template>
