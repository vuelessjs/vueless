<script setup lang="ts">
import { getDefault } from "../utils/ui.ts";

import { UHeader } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UHeaderProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UHeaderProps>(), {
  size: getDefault<UHeaderProps>(defaultConfig, UHeader).size,
  color: getDefault<UHeaderProps>(defaultConfig, UHeader).color,
  tag: getDefault<UHeaderProps>(defaultConfig, UHeader).tag,
  line: getDefault<UHeaderProps>(defaultConfig, UHeader).line,
  underlined: getDefault<UHeaderProps>(defaultConfig, UHeader).underlined,
  dataTest: "",
});

const { headerAttrs } = useAttrs(props);
</script>

<template>
  <component :is="tag" v-bind="headerAttrs" :data-test="dataTest">
    <slot>{{ label }}</slot>
  </component>
</template>
