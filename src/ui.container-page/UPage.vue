<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
    <div v-bind="pageAttrs">
      <!-- @slot Use it to add something before the header. -->
      <slot name="header-before" />

      <div v-if="isShownHeader" v-bind="headerAttrs">
        <div v-bind="headerLeftAttrs">
          <!-- @slot Use it to add something before left side of the header. -->
          <slot name="header-left-before" />

          <!-- @slot Use it to customise left side of the header. -->
          <slot name="header-left">
            <div v-bind="headerLeftFallbackAttrs">
              <ULink
                v-if="isShownArrowButton"
                no-ring
                size="sm"
                color="gray"
                :to="backRoute"
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
          </slot>

          <!-- @slot Use it to add something after left side of the header. -->
          <slot name="header-left-after" />
        </div>

        <div v-bind="headerRightAttrs">
          <!-- @slot Use it to customise right side of the header. -->
          <slot name="header-right" />
        </div>
      </div>

      <!-- @slot Use it to add something after the header. -->
      <slot name="header-after" />

      <div>
        <!-- @slot Use it to add main content. -->
        <slot />
      </div>

      <!-- @slot Use it to add something before the footer. -->
      <slot name="footer-before" />

      <div v-if="isShownFooterSlot" class="vueless-page-footer" v-bind="footerAttrs">
        <div class="vueless-page-footer-left" v-bind="footerLeftAttrs">
          <!-- @slot Use it to add something to the left side of the footer. -->
          <slot name="footer-left" />
        </div>

        <div class="vueless-page-footer-right" v-bind="footerRightAttrs">
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
   * The width of the page.
   * @values xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, wide
   */
  width: {
    type: String,
    default: getDefault(defaultConfig, UPage).width,
  },

  /**
   * Set page title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Set page title size.
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
  backRoute: {
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
   * Set gray background color.
   */
  gray: {
    type: Boolean,
    default: getDefault(defaultConfig, UPage).gray,
  },

  /**
   * Reverse left and right footer blocks (in a mobile version only).
   */
  mobileFooterReverse: {
    type: Boolean,
    default: getDefault(defaultConfig, UPage).mobileFooterReverse,
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
  footerAttrs,
  footerLeftAttrs,
  footerRightAttrs,
  rightRoundingWrapperAttrs,
  hasSlotContent,
} = useAttrs(props, { isMobileBreakpoint });

const isShownHeader = computed(() => {
  const isHeaderLeftSlot = hasSlotContent(slots["header-left"]);
  const isHeaderRightSlot = hasSlotContent(slots["header-right"]);
  const isHeaderLeftBeforeSlot = hasSlotContent(slots["header-left-before"]);
  const isHeaderLeftAfterSlot = hasSlotContent(slots["header-left-after"]);

  return (
    props.title ||
    isHeaderLeftSlot ||
    isHeaderLeftBeforeSlot ||
    isHeaderLeftAfterSlot ||
    isHeaderRightSlot
  );
});

const isShownFooterSlot = computed(() => {
  return hasSlotContent(slots["footer-left"]) || hasSlotContent(slots["footer-right"]);
});

const isShownArrowButton = computed(() => {
  return Boolean(Object.keys(props.backRoute).length);
});

onMounted(() => {
  const classes = props.gray
    ? config.value.htmlBody.split(" ").filter((item) => Boolean(item))
    : "";

  document.querySelector("body").classList.add(...classes);
});
</script>

<!--style lang="postcss" scoped>
/**
  * TODO: Move this styles to global vueless config using tailwind group class and remove footer classes
  *
.vueless-page {
  &-footer {
    &-left:deep(.vueless-dropdown-button) {
      @apply !block;
    }

    &-right,
    &-left {
      :deep(.vueless-dropdown-button) {
        .dropdown-block,
        .vueless-dropdown-button-list {
          @apply max-md:w-full;
        }

        .vueless-dropdown-item {
          @apply max-md:text-center;
        }

        .dropdown-list {
           @apply xmb-[calc(theme("spacing.mobile-menu-height")+3rem)];
        }
      }

      &:deep(.vueless-dropdown-tag, .vueless-dropdown-link, .vueless-dropdown-button) {
        @apply w-full md:w-auto;

        .dropdown-wrapper-list {
          @apply mb-2 md:mb-0;
        }

        .dropdown-block {
          @apply relative md:absolute;
        }

        .dropdown-list-right {
          @apply w-full text-center;
        }

        .dropdown-wrapper {
          @apply block w-full;

          .vueless-svg-icon {
            @apply right-auto;
          }
        }
      }
    }
  }
}
*/
</style-->
