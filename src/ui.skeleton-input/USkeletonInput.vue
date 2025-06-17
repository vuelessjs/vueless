<script setup lang="ts">
import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, LABEL_ALIGN } from "./constants.ts";

import type { Props, Config } from "./types.ts";

import USkeleton from "../ui.skeleton/USkeleton.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const { getDataTest, inputAttrs, textareaAttrs, labelAttrs, wrapperAttrs } = useUI<Config>(
  defaultConfig,
  computed(() => props),
);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to customize the label skeleton. -->
    <slot v-if="props.labelAlign !== LABEL_ALIGN.topInside && props.label" name="label">
      <USkeleton :variant="variant" v-bind="labelAttrs" />
    </slot>
    <div v-if="props.type === 'input'">
      <USkeleton :variant="variant" v-bind="inputAttrs">
        <!-- @slot Use it to add custom content inside the input skeleton. -->
        <slot />
      </USkeleton>
    </div>
    <div v-else>
      <USkeleton :variant="variant" v-bind="textareaAttrs">
        <!-- @slot Use it to add custom content inside the textarea skeleton. -->
        <slot />
      </USkeleton>
    </div>
  </div>
</template>
