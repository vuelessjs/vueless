<script setup lang="ts">
import { getDefaults } from "../utils/ui.ts";

import { UHeader } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UHeaderProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UHeaderProps>(), {
  ...getDefaults<UHeaderProps>(defaultConfig, UHeader),
});

const { headerAttrs } = useAttrs(props);
</script>

<template>
  <component :is="tag" v-bind="headerAttrs" :data-test="dataTest">
    <slot>{{ label }}</slot>
  </component>
</template>
