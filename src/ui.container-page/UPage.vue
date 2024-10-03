<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
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
                    size="xs"
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

<script setup>
import { computed, useSlots, onMounted } from "vue";

import useBreakpoint from "../composables/useBreakpoint.js";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";

import { getDefault } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { UPage } from "./constants.js";
import useAttrs from "./useAttrs.js";

const slots = useSlots();

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Page size (width).
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, wide
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UPage).size,
  },

  /**
   * Page title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Page title size.
   * @values xs, sm, md, lg, xl, 2xl
   */
  titleSize: {
    type: String,
    default: getDefault(defaultConfig, UPage).titleSize,
  },

  /**
   * Set page description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Back link vue-router route object.
   */
  backTo: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Back link label.
   */
  backLabel: {
    type: String,
    default: "",
  },

  /**
   * Sets background light gray (useful if the page contains nested cards).
   */
  gray: {
    type: Boolean,
    default: getDefault(defaultConfig, UPage).gray,
  },

  /**
   * Stick right page rounding.
   */
  fixedRounding: {
    type: Boolean,
    default: getDefault(defaultConfig, UPage).fixedRounding,
  },

  /**
   * Component config object.
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

const { isMobileBreakpoint } = useBreakpoint();

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
  hasSlotContent,
} = useAttrs(props, { isMobileBreakpoint });

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
  return Boolean(Object.keys(props.backTo).length);
});

onMounted(() => {
  const classes = props.gray
    ? config.value.htmlBody.split(" ").filter((item) => Boolean(item))
    : "";

  document.querySelector("body").classList.add(...classes);
});
</script>
