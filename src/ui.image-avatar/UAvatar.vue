<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import { UAvatar } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { UAvatarProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UAvatarProps>(), {
  ...getDefaults<UAvatarProps, Config>(defaultConfig, UAvatar),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the avatar is clicked.
   */
  "click",
]);

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

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { avatarAttrs, placeholderIconAttrs } = useUI<Config>(defaultConfig);
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
      -->
      <slot v-else name="placeholder" :icon-name="placeholderIcon" :icon-color="componentColor">
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
