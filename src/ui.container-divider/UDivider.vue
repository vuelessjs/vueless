<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";
import { hasSlotContent } from "../utils/helper.ts";
import UIcon from "../ui.image-icon/UIcon.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

const mutatedProps = computed(() => ({
  label: Boolean(props.label),
}));

const { getDataTest, wrapperAttrs, dividerAttrs, dividerIconAttrs, labelAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-bind="dividerAttrs" />

    <div v-if="label || icon || hasSlotContent($slots['default'])" v-bind="labelAttrs">
      <UIcon
        v-if="icon && !label"
        :name="icon"
        size="xl"
        color="inherit"
        v-bind="dividerIconAttrs"
      />

      <!--
        @slot Use it to add some content inside the divider.
        @binding {string} label
        @binding {string} icon-name
      -->
      <slot name="default" :label="label" :icon-name="icon">
        {{ label }}
      </slot>
    </div>

    <div v-if="label || icon || hasSlotContent($slots['default'])" v-bind="dividerAttrs" />
  </div>
</template>
