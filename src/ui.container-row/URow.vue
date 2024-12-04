<script setup lang="ts">
import { getDefaults } from "../utils/ui.ts";

import { URow } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { URowProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<URowProps>(), {
  ...getDefaults<URowProps>(defaultConfig, URow),
});

const { wrapperAttrs } = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>
