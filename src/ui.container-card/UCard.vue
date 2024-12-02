<script setup lang="ts">
import { computed, useSlots } from "vue";

import { hasSlotContent } from "../utils/helper.ts";

import UHeader from "../ui.text-header/UHeader.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import useAttrs from "./useAttrs.ts";

import type { UCardProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UCardProps>(), {
  dataTest: "",
});

const slots = useSlots();

const isShownHeader = computed(() => {
  const isHeaderLeftSlot = hasSlotContent(slots["header-left"]);
  const isHeaderRightSlot = hasSlotContent(slots["header-left"]);

  return props.title || isHeaderLeftSlot || isHeaderRightSlot;
});

const isShownFooter = computed(() => {
  return hasSlotContent(slots["footer-left"]) || hasSlotContent(slots["footer-right"]);
});

const {
  wrapperAttrs,
  titleAttrs,
  dividerAttrs,
  headerAttrs,
  headerLeftAttrs,
  headerLeftFallbackAttrs,
  descriptionAttrs,
  contentAttrs,
  footerAttrs,
} = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <div v-if="isShownHeader" v-bind="headerAttrs">
      <div v-bind="headerLeftAttrs">
        <!-- @slot Use it to add something before left side of the header. -->
        <slot name="header-left-before" />

        <!-- @slot Use it to customise left side of the header. -->
        <slot name="header-left">
          <div v-bind="headerLeftFallbackAttrs">
            <UHeader :label="title" size="xs" v-bind="titleAttrs" />
            <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
          </div>
        </slot>

        <!-- @slot Use it to add something after left side of the header. -->
        <slot name="header-left-after" />
      </div>

      <!-- @slot Use it to customise right side of the header. -->
      <slot name="header-right" />
    </div>

    <div v-bind="contentAttrs">
      <!-- @slot Use it to add something inside. -->
      <slot />
    </div>

    <UDivider v-if="isShownFooter" padding="none" v-bind="dividerAttrs" />

    <div v-if="isShownFooter" v-bind="footerAttrs">
      <!-- @slot Use it to add something to the left side of the footer. -->
      <slot name="footer-left" />

      <!-- @slot Use it to add something to the right side of the footer. -->
      <slot name="footer-right" />
    </div>
  </div>
</template>
