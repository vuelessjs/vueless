<script setup lang="ts">
import { computed, inject, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UIcon from "../ui.image-icon/UIcon.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
});

const emit = defineEmits([
  /**
   * Triggers when the avatar is clicked.
   */
  "click",
]);

// Inject props from UAvatarGroup if available
const getAvatarGroupSize = inject<() => Props["size"]>("getAvatarGroupSize", () => null);
const getAvatarGroupVariant = inject<() => Props["variant"]>("getAvatarGroupVariant", () => null);
const getAvatarGroupRounded = inject<() => Props["rounded"]>("getAvatarGroupRounded", () => null);

const avatarRef = useTemplateRef<HTMLDivElement>("avatar");

const labelFirstLetters = computed(() => {
  if (!props.label) return "";

  const [firstWord, secondWord] = props.label.split(" ");

  const firstWordLetter = firstWord ? firstWord[0].toUpperCase() : "";
  const secondWordLetter = secondWord ? secondWord[0].toUpperCase() : "";

  return firstWordLetter + secondWordLetter;
});

const backgroundImage = computed(() => {
  return props.src ? `background-image: url(${props.src});` : "";
});

function onClick(event: MouseEvent) {
  emit("click", event);
}

const placeholderIconName = computed(() => {
  return props.placeholderIcon || config.value.defaults.placeholderIcon;
});

defineExpose({
  /**
   * A reference to the avatar element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  avatarRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  src: Boolean(props.src),
  // Use injected props from UAvatarGroup if available, otherwise use local props
  size: getAvatarGroupSize() || props.size,
  variant: getAvatarGroupVariant() || props.variant,
  rounded: getAvatarGroupRounded() || props.rounded,
}));

const { getDataTest, config, avatarAttrs, placeholderIconAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div
    ref="avatar"
    :title="label"
    :style="backgroundImage"
    v-bind="avatarAttrs"
    :data-test="getDataTest()"
    @click="onClick"
  >
    <template v-if="!backgroundImage">
      <!--
        @slot Use it to add something instead of the avatar image placeholder.
        @binding {string} icon-name
      -->
      <slot name="placeholder" :icon-name="placeholderIconName">
        <template v-if="labelFirstLetters">{{ labelFirstLetters }}</template>
        <UIcon
          v-else
          :size="size"
          color="inherit"
          :name="placeholderIconName"
          v-bind="placeholderIconAttrs"
        />
      </slot>
    </template>
  </div>
</template>
