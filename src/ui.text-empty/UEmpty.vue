<script setup lang="ts">
import { useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  titleAttrs,
  descriptionAttrs,
  wrapperAttrs,
  headerAttrs,
  footerAttrs,
  emptyIconWrapperAttrs,
  emptyIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-bind="headerAttrs">
      <!-- @slot Use it to add something to the header. -->
      <slot name="header">
        <div v-bind="emptyIconWrapperAttrs">
          <UIcon
            internal
            :name="config.defaults.emptyIcon"
            color="neutral"
            v-bind="emptyIconAttrs"
          />
        </div>
      </slot>
    </div>

    <!-- @slot Use it to add something inside. -->
    <slot>
      <UHeader v-if="title" :label="title" v-bind="titleAttrs" />
      <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
    </slot>

    <div v-bind="footerAttrs">
      <!-- @slot Use it to add something to the footer. -->
      <slot name="footer" />
    </div>
  </div>
</template>
