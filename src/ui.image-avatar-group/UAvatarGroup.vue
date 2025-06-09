<script setup lang="ts">
import { computed, provide, useTemplateRef, useSlots } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UAvatar from "../ui.image-avatar/UAvatar.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const avatarGroupRef = useTemplateRef<HTMLDivElement>("avatarGroup");
const slots = useSlots();

// Provide props to child UAvatar components
provide("getAvatarGroupSize", () => props.size);
provide("getAvatarGroupVariant", () => props.variant);
provide("getAvatarGroupRounded", () => props.rounded);

const visibleAvatars = computed(() => {
  // Get all default slot children
  const children = slots.default ? slots.default() : [];

  return children.slice(0, props.max);
});

const remainingCount = computed(() => {
  const children = slots.default ? slots.default() : [];

  return Math.max(0, children.length - props.max);
});

const hasMoreAvatars = computed(() => remainingCount.value > 0);

defineExpose({
  /**
   * A reference to the avatar group element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  avatarGroupRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  max: hasMoreAvatars.value,
}));

const { getDataTest, avatarGroupAttrs } = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div ref="avatarGroup" v-bind="avatarGroupAttrs" :data-test="getDataTest()">
    <template v-for="(avatar, index) in visibleAvatars" :key="index">
      <!--
        @slot Use it to customize the avatar at a specific index.
        @binding {number} index
      -->
      <slot :name="`avatar-${index}`" :index="index">
        <component :is="avatar" />
      </slot>
    </template>

    <!-- Show count of remaining avatars if needed -->
    <div v-if="hasMoreAvatars">
      <!--
        @slot Use it to customize the remaining count avatar.
        @binding {number} remaining-count
      -->
      <slot name="remaining" :remaining-count="remainingCount">
        <UAvatar :size="size" color="grayscale" :label="`+${remainingCount}`" />
      </slot>
    </div>
  </div>
</template>
