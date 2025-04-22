<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import UDot from "../ui.other-dot/UDot.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UText from "../ui.text-block/UText.vue";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  icon: Boolean(props.icon),
  text: Boolean(props.text),
}));

const { wrapperAttrs, chipDotAttrs, chipIconAttrs, chipTextAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs">
    <UIcon v-if="icon" :name="icon" :color="color" v-bind="chipIconAttrs" />
    <UDot v-if="!icon" :color="color" :size="size" v-bind="chipDotAttrs">
      <UText v-if="text" :html="text" v-bind="chipTextAttrs" />
    </UDot>
    <!-- @slot Use it to add something inside. -->
    <slot name="default" />
  </div>
</template>
