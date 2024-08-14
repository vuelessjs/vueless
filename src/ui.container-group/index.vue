<template>
  <div v-bind="wrapperAttrs" :data-cy="dataCy">
    <template v-if="title">
      <UDivider v-if="upperlined" size="xl" no-top-padding v-bind="upperlineAttrs" />

      <div v-bind="headerAttrs">
        <!-- @slot Use it to add something left side of the header. -->
        <slot name="left">
          <div v-bind="headerFallbackAttrs">
            <!-- @slot Use it to add something before the title. -->
            <slot name="before-title" />

            <UHeader :label="title" size="xs" v-bind="titleAttrs" />

            <!-- @slot Use it to add something after the title. -->
            <slot name="after-title" />
          </div>
        </slot>

        <!-- @slot Use it to add something right side of the header. -->
        <slot name="right" />
      </div>

      <UDivider v-if="underlined" size="xl" v-bind="underlineAttrs" />
    </template>

    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import UIService from "../service.ui";
import UDivider from "../ui.container-divider";
import UHeader from "../ui.text-header";

import { UGroup } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UGroup", inheritAttrs: false });

const props = defineProps({
  /**
   * Header title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Show line above the header.
   */
  upperlined: {
    type: Boolean,
    default: UIService.get(defaultConfig, UGroup).default.upperlined,
  },

  /**
   * Show line under the header.
   */
  underlined: {
    type: Boolean,
    default: UIService.get(defaultConfig, UGroup).default.underlined,
  },

  /**
   *Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const {
  headerAttrs,
  wrapperAttrs,
  headerFallbackAttrs,
  titleAttrs,
  upperlineAttrs,
  underlineAttrs,
} = useAttrs(props);
</script>
