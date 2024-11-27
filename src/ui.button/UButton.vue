<script setup lang="ts">
import { computed, ref, watchEffect, useId, watch } from "vue";

import { useDarkMode } from "../composables/useDarkMode.ts";
import { getDefault } from "../utils/ui.ts";
import ULoader from "../ui.loader/ULoader.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";
import { UButton } from "./constants.ts";

import type { UButtonProps, LoaderSize, IconSize } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UButtonProps>(), {
  variant: getDefault<UButtonProps>(defaultConfig, UButton).variant,
  color: getDefault<UButtonProps>(defaultConfig, UButton).color,
  size: getDefault<UButtonProps>(defaultConfig, UButton).size,
  tag: getDefault<UButtonProps>(defaultConfig, UButton).tag,
  tabindex: getDefault<UButtonProps>(defaultConfig, UButton).tabindex,
  filled: getDefault<UButtonProps>(defaultConfig, UButton).filled,
  disabled: getDefault<UButtonProps>(defaultConfig, UButton).disabled,
  block: getDefault<UButtonProps>(defaultConfig, UButton).block,
  round: getDefault<UButtonProps>(defaultConfig, UButton).round,
  square: getDefault<UButtonProps>(defaultConfig, UButton).square,
  loading: getDefault<UButtonProps>(defaultConfig, UButton).loading,
  noRing: getDefault<UButtonProps>(defaultConfig, UButton).noRing,
  dataTest: "",
});

const elementId = props.id || useId();

const { isDarkMode } = useDarkMode();

const { buttonAttrs, loaderAttrs, leftIconAttrs, rightIconAttrs, centerIconAttrs } =
  useAttrs(props);

const buttonRef = ref<HTMLElement | null>(null);
const buttonStyle = ref({});
const buttonWidth = ref(0);

const loaderSize = computed(() => {
  const sizes = {
    "2xs": "sm",
    xs: "sm",
    sm: "md",
    md: "md",
    lg: "lg",
    xl: "lg",
  };

  return sizes[props.size] as LoaderSize;
});

const iconSize = computed(() => {
  const sizes = {
    "2xs": "2xs",
    xs: "xs",
    sm: "sm",
    md: "sm",
    lg: "sm",
    xl: "sm",
  };

  return sizes[props.size] as IconSize;
});

const iconColor = computed(() => {
  const primaryColor = isDarkMode.value ? "black" : "white";

  return props.variant === "primary" ? primaryColor : props.color;
});

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
</script>

<template>
  <component
    :is="tag"
    :id="elementId"
    ref="buttonRef"
    :disabled="disabled"
    v-bind="buttonAttrs"
    :style="buttonStyle"
    :tabindex="!loading ? tabindex : -1"
    :data-test="dataTest"
  >
    <template v-if="loading">
      <ULoader :loading="loading" :size="loaderSize" :color="iconColor" v-bind="loaderAttrs" />
    </template>

    <template v-else>
      <!--
        @slot Use it to add something before the label.
        @binding {string} icon-name
        @binding {string} icon-size
        @binding {string} icon-color
      -->
      <slot name="left" :icon-name="leftIcon" :icon-size="iconSize" :icon-color="iconColor">
        <UIcon
          v-if="leftIcon"
          internal
          :name="leftIcon"
          :size="iconSize"
          :color="iconColor"
          v-bind="leftIconAttrs"
        />
      </slot>

      <!--
        @slot Use it to add something instead of the label.
        @binding {string} label
        @binding {string} icon-name
        @binding {string} icon-size
        @binding {string} icon-color
      -->
      <slot
        name="default"
        :label="label"
        :icon-name="icon"
        :icon-size="iconSize"
        :icon-color="iconColor"
      >
        <UIcon
          v-if="icon"
          internal
          :name="icon"
          :size="iconSize"
          :color="iconColor"
          v-bind="centerIconAttrs"
        />
        <template v-else>
          {{ label }}
        </template>
      </slot>

      <!--
        @slot Use it to add something after the label.
        @binding {string} icon-name
        @binding {string} icon-size
        @binding {string} icon-color
      -->
      <slot name="right" :icon-name="rightIcon" :icon-size="iconSize" :icon-color="iconColor">
        <UIcon
          v-if="rightIcon"
          internal
          :name="rightIcon"
          :size="iconSize"
          :color="iconColor"
          v-bind="rightIconAttrs"
        />
      </slot>
    </template>

    <!-- This is needed to prevent changing button height -->
    <div v-if="!label || loading" tabindex="-1" class="invisible w-0" v-text="'invisible'" />
  </component>
</template>
