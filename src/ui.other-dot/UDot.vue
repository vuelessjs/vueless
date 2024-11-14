<script lang="ts" setup>
import { getDefault } from "../utils/ui.ts";

import { UDot } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UDotProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDotProps>(), {
  color: getDefault<UDotProps>(defaultConfig, UDot).color,
  size: getDefault<UDotProps>(defaultConfig, UDot).size,
  dataTest: "",
});

const { dotAttrs } = useAttrs(props);
</script>

<template>
  <div v-bind="dotAttrs" :data-test="dataTest" />
</template>
