<script setup lang="ts">
import { computed } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import { getDefaults } from "../utils/ui.ts";

import { UAvatar } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UAvatarProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UAvatarProps>(), {
  ...getDefaults<UAvatarProps, Config>(defaultConfig, UAvatar),
});

const emit = defineEmits([
  /**
   * Triggers when the avatar is clicked.
   */
  "click",
]);

const { avatarAttrs, placeholderIconAttrs } = useAttrs(props);

const labelFirstLetters = computed(() => {
  if (!props.label) return "";

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

const componentColor = computed(() => {
  return props.color === "white" ? "grayscale" : props.color;
});

function onClick(event: MouseEvent) {
  emit("click", event);
}
</script>

<template>
  <div
    :title="label"
    :style="backgroundImage"
    v-bind="avatarAttrs"
    :data-test="dataTest"
    @click="onClick"
  >
    <template v-if="!backgroundImage">
      <template v-if="labelFirstLetters">{{ labelFirstLetters }}</template>
      <!--
        @slot Use it to add something instead of the avatar image placeholder.
        @binding {string} icon-name
        @binding {string} icon-color
        @binding {string} icon-size
      -->
      <slot
        v-else
        name="placeholder"
        :icon-name="placeholderIcon"
        :icon-color="componentColor"
        :icon-size="size"
      >
        <UIcon
          internal
          :size="size"
          :color="componentColor"
          :name="placeholderIcon"
          v-bind="placeholderIconAttrs"
        />
      </slot>
    </template>
  </div>
</template>
