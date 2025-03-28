<script setup lang="ts">
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UHeader from "../ui.text-header/UHeader.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, headerAttrs, wrapperAttrs, titleFallbackAttrs, titleAttrs, contentAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <template v-if="title">
      <div v-bind="headerAttrs">
        <!--
          @slot Use it to add something on the left side of the header.
          @binding {string} title
        -->
        <slot name="title" :title="title">
          <div v-bind="titleFallbackAttrs">
            <!-- @slot Use it to add something before the title. -->
            <slot name="before-title" />

            <UHeader :label="title" size="xs" v-bind="titleAttrs" />

            <!-- @slot Use it to add something after the title. -->
            <slot name="after-title" />
          </div>
        </slot>

        <!-- @slot Use it to add something on the right side of the header. -->
        <slot name="actions" />
      </div>
    </template>

    <div v-bind="contentAttrs">
      <!-- @slot Use it to add something inside. -->
      <slot />
    </div>
  </div>
</template>
