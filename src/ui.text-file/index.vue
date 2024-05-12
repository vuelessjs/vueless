<template>
  <ULink :url="url" no-ring target-blank :data-cy="dataCy" v-bind="fileAttrs">
    <slot name="left" :file="{ id, text, url, imageUrl }" />

    <div v-bind="infoAttrs">
      <img v-if="imageUrl" :src="imageUrl" v-bind="itemImageAttrs" />

      <UIcon
        v-else
        internal
        interactive
        color="gray"
        :name="config.iconDescriptionName"
        v-bind="iconAttrs"
        @focus="onFocus"
        @blur="onBlur"
      />

      <span v-bind="textAttrs" v-text="label" />
    </div>

    <slot name="right" :file="{ id, label, url, imageUrl }" />
  </ULink>
</template>

<script setup>
import { ref } from "vue";

import ULink from "../ui.button-link";
import UIcon from "../ui.image-icon";
import { getRandomId } from "../service.ui";

import { useAttrs } from "./composables/attrs.composable";

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
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const focus = ref(false);

const { config, fileAttrs, infoAttrs, iconAttrs, textAttrs, itemImageAttrs } = useAttrs(props, {
  focus,
});

function onFocus() {
  focus.value = true;
}

function onBlur() {
  focus.value = false;
}
</script>
