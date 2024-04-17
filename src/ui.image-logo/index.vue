<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs" @click="onClick">
    <div v-bind="logoAttrs">
      <div v-if="label" v-bind="labelAttrs" v-text="label" />

      <div :style="bgImage" v-bind="imageAttrs" />
    </div>

    <div v-if="title" v-bind="titleAttrs" v-text="title" />
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIService from "../service.ui";

import { useAttrs } from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";
import { ULogo } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULogo", inheritAttrs: false });

const props = defineProps({
  /**
   * Logo source path.
   */
  src: {
    type: String,
    default: "",
  },

  /**
   * Logo label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Logo title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Logo title size.
   * @values 2xs, xs, sm, md, lg, xl, 2xl
   */
  titleSize: {
    type: String,
    default: UIService.get(defaultConfig, ULogo).default.titleSize,
  },

  /**
   * title size.
   * @values 2xs, xs, sm, md, lg, xl, 2xl, 3xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, ULogo).default.size,
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

const emit = defineEmits(["click"]);

const { titleAttrs, logoAttrs, wrapperAttrs, labelAttrs, imageAttrs } = useAttrs(props);

const bgImage = computed(() => {
  let path = props.src.includes("http") ? props.src : import.meta.env.BASE_URL + props.src;

  return `background-image: url(${path});`;
});

function onClick(event) {
  emit("click", event);
}
</script>
