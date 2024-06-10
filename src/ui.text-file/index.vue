<template>
  <ULink :url="url" no-ring target-blank :data-cy="dataCy" v-bind="fileAttrs">
    <slot name="left" :file="{ id, label, url, imageUrl }" />

    <div v-bind="infoAttrs">
      <img v-if="imageUrl" :src="imageUrl" v-bind="imageAttrs" />

      <UIcon
        v-else
        internal
        interactive
        color="gray"
        :name="config.iconName"
        v-bind="iconAttrs"
        @focus="onFocus"
        @blur="onBlur"
      />

      <span v-bind="labelAttrs" v-text="label" />
    </div>

    <slot name="right" :file="{ id, label, url, imageUrl }" />
  </ULink>
</template>

<script setup>
import { ref } from "vue";

import ULink from "../ui.button-link";
import UIcon from "../ui.image-icon";

import UIService, { getRandomId } from "../service.ui";

import { useAttrs } from "./composables/attrs.composable";
import { UFile } from "./constants";
import defaultConfig from "./configs/default.config";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UFile", inheritAttrs: false });

const props = defineProps({
  /**
   * Set url link for the file.
   */
  url: {
    type: String,
    default: "",
  },

  /**
   * Set image url.
   */
  imageUrl: {
    type: String,
    default: "",
  },

  /**
   * Set label.
   */
  label: {
    type: String,
    default: "",
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
   * Set size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UFile).default.size,
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const focus = ref(false);

const { config, fileAttrs, infoAttrs, iconAttrs, labelAttrs, imageAttrs } = useAttrs(props, {
  focus,
});

function onFocus() {
  focus.value = true;
}

function onBlur() {
  focus.value = false;
}
</script>
