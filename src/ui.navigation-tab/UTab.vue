<script setup lang="ts">
import { computed, inject, toValue, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import UButton from "../ui.button/UButton.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";
import type { Props as UTabsProps, SetUTabsSelectedItem } from "../ui.navigation-tabs/types.ts";

defineOptions({ inheritAttrs: false });

const setUTabsSelectedItem = inject<SetUTabsSelectedItem>("setUTabsSelectedItem");
const getUTabsSelectedItem = inject("getUTabsSelectedItem");
const getUTabsScrollable = inject<UTabsProps["scrollable"]>("getUTabsScrollable");
const getUTabsSquare = inject<UTabsProps["square"]>("getUTabsSquare");
const getUTabsBlock = inject<UTabsProps["block"]>("getUTabsBlock");
const getUTabsSize = inject<UTabsProps["size"]>("getUTabsSize", "md");

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const tabRef = useTemplateRef<InstanceType<typeof UButton>>("tab");

const button = computed(() => {
  return tabRef.value?.buttonRef;
});

const size = computed(() => toValue(getUTabsSize));
const block = computed(() => toValue(getUTabsBlock));
const square = computed(() => toValue(getUTabsSquare));
const scrollable = computed(() => toValue(getUTabsScrollable));
const isActive = computed(() => toValue(getUTabsSelectedItem) === props.value && !props.disabled);

async function onClickSetValue() {
  if (!props.disabled && setUTabsSelectedItem) {
    setUTabsSelectedItem(props.value ?? "");
  }
}

defineExpose({
  /**
   * A reference to the UButton component instance for direct DOM manipulation.
   * @property {InstanceType<typeof UButton>}
   */
  button,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  size: size.value,
  block: block.value,
  square: square.value,
  scrollable: scrollable.value,
  /* component state, not a props */
  active: isActive.value,
}));

const { getDataTest, tabButtonAttrs, tabButtonActiveAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <UButton
    ref="tab"
    variant="ghost"
    :size="size"
    :label="label"
    :icon="icon"
    :left-icon="leftIcon"
    :right-icon="rightIcon"
    :block="block"
    :square="square"
    :disabled="disabled"
    v-bind="isActive ? tabButtonActiveAttrs : tabButtonAttrs"
    :data-test="getDataTest()"
    @click="onClickSetValue"
  >
    <template #left="{ iconName }">
      <!--
        @slot Use it to add something before the label.
        @binding {boolean} active
        @binding {string} icon-name
      -->
      <slot name="left" :active="isActive" :icon-name="iconName" />
    </template>

    <template #default="{ iconName, label }">
      <!--
        @slot Use it to add something instead of the label.
        @binding {string} label
        @binding {boolean} active
        @binding {string} icon-name
      -->
      <slot name="label" :label="label" :active="isActive" :icon-name="iconName" />
    </template>

    <template #right="{ iconName }">
      <!--
        @slot Use it to add something after the label.
        @binding {boolean} active
        @binding {string} icon-name
      -->
      <slot name="right" :active="isActive" :icon-name="iconName" />
    </template>
  </UButton>
</template>
