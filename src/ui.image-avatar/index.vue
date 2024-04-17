<template>
  <div
    :title="label"
    :style="bgImage"
    :data-cy="dataCy"
    v-bind="avatarAttrs"
    @click="onClick"
    v-text="labelFirstLetters"
  />
</template>

<script setup>
import { computed } from "vue";

import defaultAvatar from "./default-avatar.png";

import UIService from "../service.ui";

import { UAvatar } from "./constants/index";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({
  name: "UAvatar",
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Set avatar's image. It may be a URL or path from the "public" folder.
   */
  src: {
    type: String,
    default: "",
  },

  /**
   * The size of the avatar.
   * @values xs, sm, md, lg, xl, 2xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UAvatar).default.size,
  },

  /**
   * The color of the avatar.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UAvatar).default.color,
  },

  /**
   * Avatar label (user name, nickname, etc.).
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * The rounded of the avatar.
   * @values sm, md, lg, full
   */
  rounded: {
    type: String,
    default: UIService.get(defaultConfig, UAvatar).default.rounded,
  },

  /**
   * Active / disabled avatar border.
   */
  bordered: {
    type: Boolean,
    default: UIService.get(defaultConfig, UAvatar).default.bordered,
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const labelFirstLetters = computed(() => {
  const [firstWord, secondWord] = props.label.split(" ");

  const firstWordLetter = firstWord ? firstWord[0].toUpperCase() : "";
  const secondWordLetter = secondWord ? secondWord[0].toUpperCase() : "";

  return firstWordLetter + secondWordLetter;
});

const imgSrc = computed(() => {
  let src;

  if (props.src) {
    src = props.src.includes("http") ? props.src : import.meta.env.BASE_URL + props.path;
  } else if (!props.label && !props.src) {
    src = defaultAvatar;
  }

  return src;
});

const bgImage = computed(() => {
  return `background-image: url(${imgSrc.value});`;
});

const { avatarAttrs } = useAttrs(props);

function onClick(event) {
  emit("click", event);
}
</script>
