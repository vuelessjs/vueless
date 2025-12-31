<script setup lang="ts">
import { computed, provide, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UAvatar from "../ui.image-avatar/UAvatar.vue";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";
import type { Props as AvatarProps } from "../ui.image-avatar/types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  avatars: () => [],
});

const avatarGroupRef = useTemplateRef<HTMLDivElement>("avatarGroup");

provide("getAvatarGroupSize", () => props.size);
provide("getAvatarGroupVariant", () => props.variant);
provide("getAvatarGroupRounded", () => props.rounded);

const visibleAvatars = computed(() => {
  return props.avatars.slice(0, props.max);
});

const remainingCount = computed(() => {
  return props.avatars.length - props.max;
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
const { getDataTest, avatarGroupAttrs, avatarAttrs, remainingAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="avatarGroup" v-bind="avatarGroupAttrs" :data-test="getDataTest()">
    <template v-for="(avatar, index) in visibleAvatars" :key="index">
      <!--
        @slot Use it to customize a specific avatar.
        @binding {number} index
        @binding {object} avatar
      -->
      <slot :name="`avatar-${index}`" :index="index" :avatar="avatar">
        <UAvatar
          :src="avatar.src"
          :label="avatar.label"
          :color="avatar.color as AvatarProps['color']"
          :placeholder-icon="avatar.placeholderIcon"
          :chip="avatar.chip"
          v-bind="avatarAttrs"
        />
      </slot>
    </template>

    <div v-if="hasMoreAvatars">
      <UAvatar :size="size" color="neutral" :rounded="rounded" v-bind="remainingAttrs">
        <template #placeholder>
          <!--
            @slot Use it to customize the remaining count avatar.
            @binding {number} remaining-count
          -->
          <slot name="remaining" :remaining-count="remainingCount">
            {{ `+${remainingCount}` }}
          </slot>
        </template>
      </UAvatar>
    </div>
  </div>
</template>
