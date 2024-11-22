<script setup lang="ts">
import { getDefault } from "../utils/ui.ts";

import { URow } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { URowProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<URowProps>(), {
  gap: getDefault<URowProps>(defaultConfig, URow).gap,
  align: getDefault<URowProps>(defaultConfig, URow).align,
  content: getDefault<URowProps>(defaultConfig, URow).content,
  justify: getDefault<URowProps>(defaultConfig, URow).justify,
  reverse: getDefault<URowProps>(defaultConfig, URow).reverse,
  wrap: getDefault<URowProps>(defaultConfig, URow).wrap,
  noMobile: getDefault<URowProps>(defaultConfig, URow).noMobile,
  dataTest: "",
});

const { wrapperAttrs } = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>
