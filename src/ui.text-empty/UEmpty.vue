<script setup lang="ts">
import { computed } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UHeader from "../ui.text-header/UHeader.vue";
import { getDefaults } from "../utils/ui.ts";

import { UEmpty } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UEmptyProps, IconSize, TitleSize, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UEmptyProps>(), {
  ...getDefaults<UEmptyProps, Config>(defaultConfig, UEmpty),
});

const {
  config,
  titleAttrs,
  descriptionAttrs,
  wrapperAttrs,
  headerAttrs,
  footerAttrs,
  emptyIconWrapperAttrs,
  emptyIconAttrs,
} = useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "2xl",
    md: "3xl",
    lg: "4xl",
  };

  return sizes[props.size] as IconSize;
});

const titleSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size] as TitleSize;
});
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <div v-bind="headerAttrs">
      <!-- @slot Use it to add something to the header. -->
      <slot name="header">
        <div v-bind="emptyIconWrapperAttrs">
          <UIcon
            internal
            :name="config.defaults?.emptyIcon"
            color="gray"
            :size="iconSize"
            v-bind="emptyIconAttrs"
          />
        </div>
      </slot>
    </div>

    <!-- @slot Use it to add something inside. -->
    <slot>
      <UHeader v-if="title" :label="title" :size="titleSize" v-bind="titleAttrs" />
      <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
    </slot>

    <div v-bind="footerAttrs">
      <!-- @slot Use it to add something to the footer. -->
      <slot name="footer" />
    </div>
  </div>
</template>
