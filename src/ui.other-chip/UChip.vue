<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import UDot from "../ui.other-dot/UDot.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import type { Props, Config } from "./types";

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
}));

const { getDataTest, wrapperAttrs, chipWrapperAttrs, chipDotAttrs, chipIconAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add something inside. -->
    <slot name="default" />
    <div v-bind="chipWrapperAttrs">
      <!-- @slot Use it to add something instead of the default chip. -->
      <slot name="chip">
        <UIcon v-if="icon" :name="icon" :color="color" :size="size" v-bind="chipIconAttrs" />
        <UDot v-else :color="color" :size="size" v-bind="chipDotAttrs" />
      </slot>
    </div>
  </div>
</template>
