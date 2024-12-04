<script setup lang="ts">
import { getDefaults } from "../utils/ui.ts";

import { UDivider } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UDividerProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UDividerProps>(), {
  ...getDefaults<UDividerProps>(defaultConfig, UDivider),
});

const { wrapperAttrs, dividerAttrs, labelAttrs } = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <div v-bind="dividerAttrs" />
    <span v-if="label" v-bind="labelAttrs" v-text="label" />
  </div>
</template>
