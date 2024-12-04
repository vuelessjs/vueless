<script setup lang="ts">
import { getDefaults } from "../utils/ui.ts";

import { UDot } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UDotProps, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDotProps>(), {
  ...getDefaults<UDotProps, Config>(defaultConfig, UDot),
});

const { dotAttrs } = useAttrs(props);
</script>

<template>
  <div v-bind="dotAttrs" :data-test="dataTest" />
</template>
