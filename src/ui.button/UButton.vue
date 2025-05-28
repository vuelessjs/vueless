<script setup lang="ts">
import { computed, ref, watchEffect, useId, watch, useSlots, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import ULoader from "../ui.loader/ULoader.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const slots = useSlots();
const elementId = props.id || useId();

const buttonRef = useTemplateRef<HTMLElement>("button");
const buttonStyle = ref({});
const buttonWidth = ref(0);

watch(
  () => props.loading,
  (newValue, oldValue) => {
    const isLoaderOn = newValue && oldValue !== undefined;

    if (isLoaderOn && buttonRef.value) {
      buttonWidth.value = buttonRef.value.offsetWidth;
    }

    buttonStyle.value = {
      width: isLoaderOn ? `${buttonWidth.value}px` : null,
      paddingLeft: isLoaderOn ? "0px" : null,
      paddingRight: isLoaderOn ? "0px" : null,
    };
  },
  { immediate: true },
);

watchEffect(() => {
  props.loading && buttonRef?.value?.blur();
});

defineExpose({
  /**
   * A reference to the button element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  buttonRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  leftIcon: Boolean(props.leftIcon) || hasSlotContent(slots["left"]),
  rightIcon: Boolean(props.rightIcon) || hasSlotContent(slots["right"]),
  label: Boolean(props.label),
}));

const {
  getDataTest,
  buttonAttrs,
  loaderAttrs,
  leftIconAttrs,
  rightIconAttrs,
  centerIconAttrs,
  invisibleAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <component
    :is="tag"
    :id="elementId"
    ref="button"
    :disabled="disabled"
    v-bind="buttonAttrs"
    :style="buttonStyle"
    :tabindex="!loading ? tabindex : -1"
    :data-test="getDataTest()"
  >
    <template v-if="loading">
      <ULoader
        :loading="loading"
        color="inherit"
        v-bind="loaderAttrs"
        :data-test="getDataTest('loader')"
      />
    </template>

    <template v-else>
      <!--
        @slot Use it to add something before the label.
        @binding {string} icon-name
      -->
      <slot name="left" :icon-name="leftIcon">
        <UIcon v-if="leftIcon" internal color="inherit" :name="leftIcon" v-bind="leftIconAttrs" />
      </slot>

      <!--
        @slot Use it to add something instead of the label.
        @binding {string} label
        @binding {string} icon-name
      -->
      <slot name="default" :label="label" :icon-name="icon">
        <UIcon v-if="icon" internal color="inherit" :name="icon" v-bind="centerIconAttrs" />
        <template v-else>
          {{ label }}
        </template>
      </slot>

      <!--
        @slot Use it to add something after the label.
        @binding {string} icon-name
      -->
      <slot name="right" :icon-name="rightIcon">
        <UIcon
          v-if="rightIcon"
          :name="rightIcon"
          color="inherit"
          internal
          v-bind="rightIconAttrs"
        />
      </slot>
    </template>

    <!-- This is needed to prevent changing button height -->
    <div
      v-if="(!label && !hasSlotContent(slots['default']) && !icon) || loading"
      tabindex="-1"
      v-bind="invisibleAttrs"
      v-text="'invisible'"
    />
  </component>
</template>
