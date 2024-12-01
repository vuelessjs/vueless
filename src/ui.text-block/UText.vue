<script setup lang="ts">
import { getDefault } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import { UText } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UTextProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UTextProps>(), {
  size: getDefault<UTextProps>(defaultConfig, UText).size,
  align: getDefault<UTextProps>(defaultConfig, UText).align,
  line: getDefault<UTextProps>(defaultConfig, UText).line,
  dataTest: "",
});

const { wrapperAttrs, htmlAttrs } = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <div v-if="!hasSlotContent($slots['default'])" v-bind="htmlAttrs" v-html="html" />
    <slot />
  </div>
</template>
