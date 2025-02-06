<script setup lang="ts">
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import UDivider from "../ui.container-divider/UDivider.vue";
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
const {
  getDataTest,
  headerAttrs,
  wrapperAttrs,
  headerLeftFallbackAttrs,
  titleAttrs,
  upperlineAttrs,
  underlineAttrs,
  contentAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <template v-if="title">
      <UDivider v-if="upperlined" size="xl" padding="after" v-bind="upperlineAttrs" />

      <div v-bind="headerAttrs">
        <!-- @slot Use it to add something on the left side of the header. -->
        <slot name="header-left">
          <div v-bind="headerLeftFallbackAttrs">
            <!-- @slot Use it to add something before the title. -->
            <slot name="before-title" />

            <UHeader :label="title" size="xs" v-bind="titleAttrs" />

            <!-- @slot Use it to add something after the title. -->
            <slot name="after-title" />
          </div>
        </slot>

        <!-- @slot Use it to add something on the right side of the header. -->
        <slot name="header-right" />
      </div>

      <UDivider size="xl" padding="after" :border="underlined" v-bind="underlineAttrs" />
    </template>

    <div v-bind="contentAttrs">
      <!-- @slot Use it to add something inside. -->
      <slot />
    </div>
  </div>
</template>
