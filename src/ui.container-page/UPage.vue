<script setup lang="ts">
import { computed, useSlots, onMounted } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import useBreakpoint from "../composables/useBreakpoint.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

const slots = useSlots();

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  backTo: "",
  backLabel: "",
});

const { isMobileBreakpoint } = useBreakpoint();

const isExistHeader = computed(() => {
  return (
    props.title ||
    hasSlotContent(slots["header-left"]) ||
    hasSlotContent(slots["header-right"]) ||
    hasSlotContent(slots["before-title"]) ||
    hasSlotContent(slots["after-title"])
  );
});

const isExistFooter = computed(() => {
  return hasSlotContent(slots["footer-left"]) || hasSlotContent(slots["footer-right"]);
});

const isShownArrowButton = computed(() => {
  return Object.keys(props.backTo || {}).length > 0;
});

onMounted(() => {
  const classes =
    props.gray && config.value?.htmlBody
      ? config.value.htmlBody.split(" ").filter((item) => Boolean(item))
      : "";

  if (document.body) {
    document.body.classList.add(...classes);
  }
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  config,
  wrapperAttrs,
  pageAttrs,
  rightRoundingAttrs,
  titleAttrs,
  backLinkAttrs,
  backLinkIconAttrs,
  headerAttrs,
  headerLeftFallbackAttrs,
  descriptionAttrs,
  headerLeftAttrs,
  headerRightAttrs,
  bodyAttrs,
  footerAttrs,
  footerLeftAttrs,
  footerRightAttrs,
  rightRoundingWrapperAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <div v-bind="pageAttrs">
      <!-- @slot Use it to add something before the header. -->
      <slot name="header-before" />

      <div v-if="isExistHeader" v-bind="headerAttrs">
        <div v-bind="headerLeftAttrs">
          <!-- @slot Use it to add something to the left side of the header. -->
          <slot name="header-left">
            <!-- @slot Use it to add something before the header title. -->
            <slot name="before-title" />

            <div v-bind="headerLeftFallbackAttrs">
              <ULink
                v-if="isShownArrowButton"
                no-ring
                size="sm"
                color="gray"
                :to="backTo"
                :label="backLabel"
                v-bind="backLinkAttrs"
              >
                <template #left>
                  <UIcon
                    internal
                    size="2xs"
                    color="gray"
                    :name="config.defaults.backIcon"
                    v-bind="backLinkIconAttrs"
                  />
                </template>
              </ULink>

              <UHeader :label="title" :size="titleSize" v-bind="titleAttrs" />
              <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
            </div>

            <!-- @slot Use it to add something after the header title. -->
            <slot name="after-title" />
          </slot>
        </div>

        <div v-bind="headerRightAttrs">
          <!-- @slot Use it to add something to the right side of the header. -->
          <slot name="header-right" />
        </div>
      </div>

      <!-- @slot Use it to add something after the header. -->
      <slot name="header-after" />

      <div v-bind="bodyAttrs">
        <!-- @slot Use it to add main content. -->
        <slot />
      </div>

      <!-- @slot Use it to add something before the footer. -->
      <slot name="footer-before" />

      <div v-if="isExistFooter" v-bind="footerAttrs">
        <div v-bind="footerLeftAttrs">
          <!-- @slot Use it to add something to the left side of the footer. -->
          <slot name="footer-left" />
        </div>

        <div v-bind="footerRightAttrs">
          <!-- @slot Use it to add something to the right side of the footer. -->
          <slot name="footer-right" />
        </div>
      </div>

      <!-- @slot Use it to add something after the footer. -->
      <slot name="footer-after" />
    </div>

    <div v-if="fixedRounding && !isMobileBreakpoint" v-bind="rightRoundingWrapperAttrs">
      <div v-bind="rightRoundingAttrs" />
    </div>
  </div>
</template>
