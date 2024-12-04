<script setup lang="ts">
import { getDefaults } from "../utils/ui.ts";

import { UCol } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UColProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UColProps>(), {
  ...getDefaults<UColProps, Config>(defaultConfig, UCol),
});

const { wrapperAttrs } = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>
