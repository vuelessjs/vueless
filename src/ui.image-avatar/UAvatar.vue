<script setup lang="ts">
import { computed, inject, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UIcon from "../ui.image-icon/UIcon.vue";
import UChip from "../ui.other-chip/UChip.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
  chip: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when the avatar is clicked.
   */
  "click",
]);

const getAvatarGroupSize = inject<() => Props["size"]>("getAvatarGroupSize", () => undefined);
const getAvatarGroupVariant = inject<() => Props["variant"]>(
  "getAvatarGroupVariant",
  () => undefined,
);
const getAvatarGroupRounded = inject<() => Props["rounded"]>(
  "getAvatarGroupRounded",
  () => undefined,
);

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

const hasChip = computed(() => props.chip != null && Boolean(Object.keys(props.chip).length));

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
  size: getAvatarGroupSize() || props.size,
  variant: getAvatarGroupVariant() || props.variant,
  rounded: getAvatarGroupRounded() || props.rounded,
}));

const { getDataTest, config, avatarAttrs, placeholderIconAttrs, chipAttrs, hiddenAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <UChip
    :icon="chip.icon"
    :color="chip.color"
    :inset="chip.inset"
    :x-position="chip.xPosition"
    :y-position="chip.yPosition"
    v-bind="chipAttrs"
  >
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
    <template v-if="!hasChip" #chip>
      <span v-bind="hiddenAttrs">&nbsp;</span>
    </template>
  </UChip>
</template>
