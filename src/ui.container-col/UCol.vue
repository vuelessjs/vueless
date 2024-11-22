<script setup lang="ts">
import { getDefault } from "../utils/ui.ts";

import { UCol } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UColProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UColProps>(), {
  gap: getDefault<UColProps>(defaultConfig, UCol).gap,
  align: getDefault<UColProps>(defaultConfig, UCol).align,
  content: getDefault<UColProps>(defaultConfig, UCol).content,
  justify: getDefault<UColProps>(defaultConfig, UCol).justify,
  reverse: getDefault<UColProps>(defaultConfig, UCol).reverse,
  wrap: getDefault<UColProps>(defaultConfig, UCol).wrap,
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
