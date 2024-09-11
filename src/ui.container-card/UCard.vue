<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
    <div v-if="isShownHeader" v-bind="headerAttrs">
      <div v-bind="headerLeftAttrs">
        <!-- @slot Use it to add something before left side of the header. -->
        <slot name="header-left-before" />

        <!-- @slot Use it to customise left side of the header. -->
        <slot name="header-left">
          <div v-bind="headerLeftFallbackAttrs">
            <UHeader :label="title" size="md" v-bind="titleAttrs" />
            <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
          </div>
        </slot>

        <!-- @slot Use it to add something after left side of the header. -->
        <slot name="header-left-after" />
      </div>

      <!-- @slot Use it to customise right side of the header. -->
      <slot name="header-right" />
    </div>

    <!-- @slot Use it to add something inside. -->
    <div v-bind="contentAttrs">
      <slot />
    </div>

    <UDivider v-if="isShownFooter" no-top-padding no-bottom-padding v-bind="dividerAttrs" />

    <div v-if="isShownFooter" v-bind="footerAttrs">
      <!-- @slot Use it to add something to the left side of the footer. -->
      <slot name="footer-left" />

      <!-- @slot Use it to add something to the right side of the footer. -->
      <slot name="footer-right" />
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from "vue";

import { getDefault } from "../utils/utilUI.js";
import UHeader from "../ui.text-header/UHeader.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import { UCard } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import useBreakpoint from "./composables/useBreakpoint.js";

defineOptions({ inheritAttrs: false });

const slots = useSlots();

const props = defineProps({
  /**
   * Card title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Card description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Card padding.
   * @values sm, md, lg
   */
  padding: {
    type: String,
    default: getDefault(defaultConfig, UCard).padding,
  },

  /**
   * Reverse left and right footer blocks (in a mobile version only).
   */
  mobileFooterReverse: {
    type: Boolean,
    default: getDefault(defaultConfig, UCard).mobileFooterReverse,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const isShownHeader = computed(() => {
  const isHeaderLeftSlot = hasSlotContent(slots["header-left"]);
  const isHeaderRightSlot = hasSlotContent(slots["header-left"]);

  return props.title || isHeaderLeftSlot || isHeaderRightSlot;
});

const isShownFooter = computed(() => {
  return hasSlotContent(slots["footer-left"]) || hasSlotContent(slots["footer-right"]);
});

const { isMobileBreakpoint } = useBreakpoint();

const {
  hasSlotContent,
  wrapperAttrs,
  titleAttrs,
  dividerAttrs,
  headerAttrs,
  headerLeftAttrs,
  headerLeftFallbackAttrs,
  descriptionAttrs,
  contentAttrs,
  footerAttrs,
} = useAttrs(props, { isMobileBreakpoint });
</script>
