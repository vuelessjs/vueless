<script lang="ts" setup>
import { getDefault } from "../utils/ui.ts";

import { UDivider } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UDividerProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDividerProps>(), {
  size: getDefault<UDividerProps>(defaultConfig, UDivider).size,
  variant: getDefault<UDividerProps>(defaultConfig, UDivider).variant,
  padding: getDefault<UDividerProps>(defaultConfig, UDivider).padding,
  dashed: getDefault<UDividerProps>(defaultConfig, UDivider).dashed,
  dotted: getDefault<UDividerProps>(defaultConfig, UDivider).dotted,
  vertical: getDefault<UDividerProps>(defaultConfig, UDivider).vertical,
  noBorder: getDefault<UDividerProps>(defaultConfig, UDivider).noBorder,
  dataTest: "",
});

const { wrapperAttrs, dividerAttrs, labelAttrs } = useAttrs(props);
</script>

<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
    <div v-bind="dividerAttrs" />
    <span v-if="label" v-bind="labelAttrs" v-text="label" />
  </div>
</template>
