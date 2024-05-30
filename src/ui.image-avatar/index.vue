<template>
  <div
    :title="label"
    :style="backgroundImage"
    :data-cy="dataCy"
    v-bind="avatarAttrs"
    @click="onClick"
  >
    <template v-if="!backgroundImage">
      <template v-if="labelFirstLetters">{{ labelFirstLetters }}</template>
      <UIcon
        v-else
        :name="icon"
        :color="color === 'white' ? 'grayscale' : color"
        :size="size"
        v-bind="iconAttrs"
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon";
import UIService from "../service.ui";

import { UAvatar } from "./constants/index";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UAvatar", inheritAttrs: false });

const props = defineProps({
  /**
   * Avatar image source.
   */
  src: {
    type: String,
    default: "",
  },

  /**
   * Avatar label (user name, nickname, etc.).
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Avatar icon placeholder.
   */
  icon: {
    type: String,
    default: UIService.get(defaultConfig, UAvatar).default.icon,
  },

  /**
   * Avatar size.
   * @values 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UAvatar).default.size,
  },

  /**
   * Avatar color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UAvatar).default.color,
  },

  /**
   * Avatar corner rounding.
   * @values none, sm, md, lg, full
   */
  rounded: {
    type: String,
    default: UIService.get(defaultConfig, UAvatar).default.rounded,
  },

  /**
   * Add border to the avatar.
   */
  bordered: {
    type: Boolean,
    default: UIService.get(defaultConfig, UAvatar).default.bordered,
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

const labelFirstLetters = computed(() => {
  const [firstWord, secondWord] = props.label.split(" ");

  const firstWordLetter = firstWord ? firstWord[0].toUpperCase() : "";
  const secondWordLetter = secondWord ? secondWord[0].toUpperCase() : "";

  return firstWordLetter + secondWordLetter;
});

const backgroundImage = computed(() => {
  const baseUrl = import.meta.env.BASE_URL;
  const src = props.src && props.src.includes("http") ? props.src : baseUrl + props.src;

  return props.src ? `background-image: url(${src});` : "";
});

const { avatarAttrs, iconAttrs } = useAttrs(props);

function onClick(event) {
  emit("click", event);
}
</script>
