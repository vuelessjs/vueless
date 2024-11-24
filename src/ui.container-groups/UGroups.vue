<script setup lang="ts">
import { getDefault } from "../utils/ui.ts";

import { UGroups } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UGroupsProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UGroupsProps>(), {
  gap: getDefault<UGroupsProps>(defaultConfig, UGroups).gap,
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
