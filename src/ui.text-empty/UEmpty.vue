<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
    <div v-bind="headerAttrs">
      <!-- @slot Use it to add something to the header. -->
      <slot name="header">
        <div v-bind="emptyIconWrapperAttrs">
          <UIcon
            internal
            :name="config.defaults.emptyIcon"
            color="gray"
            :size="iconSize"
            v-bind="emptyIconAttrs"
          />
        </div>
      </slot>
    </div>

    <!-- @slot Use it to add something inside. -->
    <slot>
      <UHeader v-if="title" :label="title" :size="titleSize" v-bind="titleAttrs" />
      <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
    </slot>

    <div v-bind="footerAttrs">
      <!-- @slot Use it to add something to the footer. -->
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";
import { getDefault } from "../utils/utilUI.ts";

import { UEmpty } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Empty state title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Empty state description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Empty state size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UEmpty).size,
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
  config,
  titleAttrs,
  descriptionAttrs,
  wrapperAttrs,
  headerAttrs,
  footerAttrs,
  emptyIconWrapperAttrs,
  emptyIconAttrs,
} = useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "2xl",
    md: "3xl",
    lg: "4xl",
  };

  return sizes[props.size];
});

const titleSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});
</script>
