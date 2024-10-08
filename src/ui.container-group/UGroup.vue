<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
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

      <UDivider size="xl" padding="after" :no-border="!underlined" v-bind="underlineAttrs" />
    </template>

    <div v-bind="contentAttrs">
      <!-- @slot Use it to add something inside. -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { getDefault } from "../utils/utilUI.js";
import UDivider from "../ui.container-divider/UDivider.vue";
import UHeader from "../ui.text-header/UHeader.vue";

import { UGroup } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Group title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * The distance between nested elements.
   * @values none, xs, sm, md, lg, xl
   */
  gap: {
    type: String,
    default: getDefault(defaultConfig, UGroup).gap,
  },

  /**
   * Show line above the header.
   */
  upperlined: {
    type: Boolean,
    default: getDefault(defaultConfig, UGroup).upperlined,
  },

  /**
   * Show line under the header.
   */
  underlined: {
    type: Boolean,
    default: getDefault(defaultConfig, UGroup).underlined,
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

const {
  headerAttrs,
  wrapperAttrs,
  headerLeftFallbackAttrs,
  titleAttrs,
  upperlineAttrs,
  underlineAttrs,
  contentAttrs,
} = useAttrs(props);
</script>
