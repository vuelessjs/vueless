<script setup lang="ts">
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";

import { UEmpty } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UEmpty),
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
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
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <div v-bind="headerAttrs">
      <!-- @slot Use it to add something to the header. -->
      <slot name="header">
        <div v-bind="emptyIconWrapperAttrs">
          <UIcon internal :name="config.defaults.emptyIcon" color="gray" v-bind="emptyIconAttrs" />
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
