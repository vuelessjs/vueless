<template>
  <div
    :title="label"
    :style="backgroundImage"
    :data-test="dataTest"
    v-bind="avatarAttrs"
    @click="onClick"
  >
    <template v-if="!backgroundImage">
      <template v-if="labelFirstLetters">{{ labelFirstLetters }}</template>
      <!--
        @slot Use it to add something instead of the avatar placeholder.
        @binding {string} icon-color
        @binding {string} icon-size
      -->
      <slot v-else name="placeholder" :icon-color="componentColor" :icon-size="size">
        <UIcon :name="icon" :color="componentColor" :size="size" v-bind="placeholderIconAttrs" />
      </slot>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

import UIcon from "../ui.image-icon";
import { getDefault } from "../service.ui";

import { UAvatar } from "./constants/index";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

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
    default: getDefault(defaultConfig, UAvatar).placeholderIcon,
  },

  /**
   * Avatar size.
   * @values 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UAvatar).size,
  },

  /**
   * Avatar color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UAvatar).color,
  },

  /**
   * Avatar corner rounding.
   * @values none, sm, md, lg, full
   */
  rounded: {
    type: String,
    default: getDefault(defaultConfig, UAvatar).rounded,
  },

  /**
   * Add border to the avatar.
   */
  bordered: {
    type: Boolean,
    default: getDefault(defaultConfig, UAvatar).bordered,
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

const emit = defineEmits([
  /**
   * Triggers when the avatar is clicked.
   */
  "click",
]);

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

const { avatarAttrs, placeholderIconAttrs } = useAttrs(props);

const componentColor = computed(() => (props.color === "white" ? "grayscale" : props.color));

function onClick(event) {
  emit("click", event);
}
</script>
