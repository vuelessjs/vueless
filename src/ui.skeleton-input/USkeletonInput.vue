<script setup lang="ts">
import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import defaultConfig from "./config";
import { COMPONENT_NAME, LABEL_ALIGN } from "./constants";

import type { Props, Config } from "./types";

import USkeleton from "../ui.skeleton/USkeleton.vue";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, inputAttrs, textareaAttrs, labelAttrs, wrapperAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to customize the label skeleton. -->
    <slot v-if="labelAlign !== LABEL_ALIGN.topInside && label" name="label">
      <USkeleton :variant="variant" v-bind="labelAttrs" />
    </slot>

    <USkeleton v-if="type === 'input'" :variant="variant" v-bind="inputAttrs">
      <!-- @slot Use it to add custom content inside the input skeleton. -->
      <slot />
    </USkeleton>

    <USkeleton v-else :variant="variant" v-bind="textareaAttrs">
      <!-- @slot Use it to add custom content inside the textarea skeleton. -->
      <slot />
    </USkeleton>
  </div>
</template>
