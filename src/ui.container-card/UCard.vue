<script setup lang="ts">
import { computed, useSlots } from "vue";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import UHeader from "../ui.text-header/UHeader.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const slots = useSlots();

const isShownHeader = computed(() => {
  const isTitleSlot = hasSlotContent(slots["title"]);
  const isActionsSlot = hasSlotContent(slots["actions"]);

  return props.title || isTitleSlot || isActionsSlot;
});

const isShownFooter = computed(() => {
  return hasSlotContent(slots["footer-left"]) || hasSlotContent(slots["footer-right"]);
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  wrapperAttrs,
  titleAttrs,
  headerAttrs,
  headerLeftAttrs,
  headerLeftFallbackAttrs,
  descriptionAttrs,
  footerAttrs,
  footerLeftAttrs,
  footerRightAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-if="isShownHeader" v-bind="headerAttrs">
      <div v-bind="headerLeftAttrs">
        <!-- @slot Use it to add something before left side of the header. -->
        <slot name="before-title" />

        <!-- @slot Use it to customise left side of the header. -->
        <slot name="title">
          <div v-bind="headerLeftFallbackAttrs">
            <UHeader :label="title" size="xs" v-bind="titleAttrs" />
            <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
          </div>
        </slot>

        <!-- @slot Use it to add something after left side of the header. -->
        <slot name="after-title" />
      </div>

      <!-- @slot Use it to customise right side of the header. -->
      <slot name="actions" />
    </div>

    <!-- @slot Use it to add something inside. -->
    <slot />

    <div v-if="isShownFooter" v-bind="footerAttrs">
      <div v-bind="footerLeftAttrs">
        <!-- @slot Use it to add something to the left side of the footer. -->
        <slot name="footer-left" />
      </div>

      <div v-bind="footerRightAttrs">
        <!-- @slot Use it to add something to the right side of the footer. -->
        <slot name="footer-right" />
      </div>
    </div>
  </div>
</template>
