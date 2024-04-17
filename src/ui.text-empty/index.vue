<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <div v-bind="headerAttrs">
      <!-- @slot Use it to add something to the header. -->
      <slot name="header">
        <UIcon :name="config.iconName" color="gray" :size="iconSize" pill v-bind="iconAttrs" />
      </slot>
    </div>

    <!-- @slot Use it to add something inside. -->
    <slot>
      <div v-if="title" v-bind="titleAttrs">
        {{ title }}
      </div>
      <div v-if="description" v-bind="descriptionAttrs">
        {{ description }}
      </div>
    </slot>

    <div v-bind="footerAttrs">
      <!-- @slot Use it to add something to the footer. -->
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon";
import UIService from "../service.ui";

import { UEmpty } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UEmpty", inheritAttrs: false });

const props = defineProps({
  /**
   * Sets title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Sets description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Sets component size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UEmpty).default.size,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const { config, titleAttrs, descriptionAttrs, wrapperAttrs, headerAttrs, footerAttrs, iconAttrs } =
  useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "xl",
    md: "2xl",
    lg: "3xl",
  };

  return sizes[props.size];
});
</script>
