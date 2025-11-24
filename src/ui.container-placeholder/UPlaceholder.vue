<script setup lang="ts">
import { useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
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

const { getDataTest, wrapperAttrs, contentAttrs, labelAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div
    ref="wrapper"
    role="region"
    :aria-label="label || 'Placeholder area'"
    v-bind="wrapperAttrs"
    :data-test="getDataTest()"
  >
    <div v-bind="contentAttrs">
      <!--
        @slot Use it to add custom content inside the placeholder.
        @binding {string} label
      -->
      <slot :label="label">
        <span v-if="label" v-bind="labelAttrs">{{ label }}</span>
      </slot>
    </div>
  </div>
</template>
