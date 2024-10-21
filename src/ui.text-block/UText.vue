<script lang="ts" setup>
import { getDefault } from "../utilsTs/utilUI";

import { UText } from "./constants";
import defaultConfig from "./config";
import useAttrs from "./useAttrs";

import type { UTextProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UTextProps>(), {
  size: getDefault(defaultConfig, UText).size,
  align: getDefault(defaultConfig, UText).align,
  line: getDefault(defaultConfig, UText).line,
});

const { wrapperAttrs, htmlAttrs, hasSlotContent } = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <div v-if="!hasSlotContent($slots['default'])" v-bind="htmlAttrs" v-html="html" />
    <slot />
  </div>
</template>
