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

const emit = defineEmits([
  /**
   * Triggers when a back link is clicked.
   */
  "back",
]);

const { isMobileBreakpoint } = useBreakpoint();

const isExistHeader = computed(() => {
  return (
    props.title ||
    hasSlotContent(slots["before-title"]) ||
    hasSlotContent(slots["title"]) ||
    hasSlotContent(slots["after-title"]) ||
    hasSlotContent(slots["actions"])
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

function onClickBackLink() {
  emit("back");
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  pageAttrs,
  rightRoundingAttrs,
  titleAttrs,
  backLinkWrapperAttrs,
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
} = useUI<Config>(defaultConfig, undefined, "wrapper");
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-bind="pageAttrs">
      <div v-if="isExistHeader" v-bind="headerAttrs">
        <div v-bind="headerLeftAttrs">
          <!-- @slot Use it to add something before the header title. -->
          <slot name="before-title" />

          <!-- @slot Use it to add something to the left side of the header. -->
          <slot name="title">
            <div v-bind="headerLeftFallbackAttrs">
              <div v-if="isShownArrowButton" v-bind="backLinkWrapperAttrs">
                <UIcon
                  internal
                  size="2xs"
                  color="gray"
                  :name="config.defaults.backIcon"
                  v-bind="backLinkIconAttrs"
                />

                <ULink
                  size="sm"
                  color="gray"
                  :to="backTo"
                  :label="backLabel"
                  v-bind="backLinkAttrs"
                  @click="onClickBackLink"
                />
              </div>

              <UHeader :label="title" :size="titleSize" v-bind="titleAttrs" />
              <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
            </div>
          </slot>
          <!-- @slot Use it to add something after the header title. -->
          <slot name="after-title" />
        </div>

        <div v-bind="headerRightAttrs">
          <!-- @slot Use it to add something to the right side of the header. -->
          <slot name="actions" />
        </div>
      </div>

      <div v-bind="bodyAttrs">
        <!-- @slot Use it to add main content. -->
        <slot />
      </div>

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
    </div>

    <div v-if="!isMobileBreakpoint" v-bind="rightRoundingWrapperAttrs">
      <div v-bind="rightRoundingAttrs" />
    </div>
  </div>
</template>
