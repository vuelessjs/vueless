<template>
  <ULink :url="url" no-ring target-blank :data-cy="dataCy" v-bind="fileAttrs">
    <slot name="left" :file="{ id, label, url, imageUrl }" />

    <slot :file="{ id, label, url, imageUrl, iconName: config.iconName }">
      <div v-bind="infoAttrs">
        <img v-if="imageUrl" :src="imageUrl" v-bind="imageAttrs" />

        <UIcon
          v-else
          internal
          interactive
          color="gray"
          :size="iconSize"
          :name="config.iconName"
          v-bind="iconAttrs"
          @focus="onFocus"
          @blur="onBlur"
        />

        <span v-bind="labelAttrs" v-text="label" />
      </div>
    </slot>

    <slot name="right" :file="{ id, label, url, imageUrl }" />
  </ULink>
</template>

<script setup>
import { computed, ref } from "vue";

import ULink from "../ui.button-link";
import UIcon from "../ui.image-icon";

import { getRandomId, getDefault } from "../service.ui";

import useAttrs from "./composables/attrs.composable";
import { UFile } from "./constants";
import defaultConfig from "./configs/default.config";

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
   * Data-cy attribute for automated testing.
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
