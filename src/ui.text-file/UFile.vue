<template>
  <ULink :href="url" no-ring v-bind="fileAttrs" :data-test="dataTest">
    <slot name="left" :file="{ id, label, url, imageUrl }" />

    <slot :file="{ id, label, url, imageUrl }">
      <div v-bind="bodyAttrs">
        <img v-if="imageUrl" :alt="label" :src="imageUrl" v-bind="fileImageAttrs" />

        <UIcon
          v-else
          internal
          interactive
          color="gray"
          :size="iconSize"
          :name="config.defaults.fileIcon"
          v-bind="fileIconAttrs"
          @focus="onFocus"
          @blur="onBlur"
        />

        <ULink :label="label" :size="size" color="gray" dashed no-ring v-bind="fileLabelAttrs" />
      </div>
    </slot>

    <slot name="right" :file="{ id, label, url, imageUrl }" />
  </ULink>
</template>

<script setup>
import { computed, ref } from "vue";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import { getRandomId, getDefault } from "../utils/utilUI.js";

import useAttrs from "./useAttrs.js";
import { UFile } from "./constants.js";
import defaultConfig from "./config.js";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UFile", inheritAttrs: false });

const props = defineProps({
  /**
   * File url.
   */
  url: {
    type: String,
    default: "",
  },

  /**
   * Image url.
   */
  imageUrl: {
    type: String,
    default: "",
  },

  /**
   * File label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * File size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UFile).size,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
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

const focus = ref(false);

const { config, fileAttrs, bodyAttrs, fileIconAttrs, fileLabelAttrs, fileImageAttrs } = useAttrs(
  props,
  {
    focus,
  },
);

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

function onFocus() {
  focus.value = true;
}

function onBlur() {
  focus.value = false;
}
</script>
