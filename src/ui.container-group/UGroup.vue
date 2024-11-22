<script setup lang="ts">
import { getDefault } from "../utils/ui.ts";
import UDivider from "../ui.container-divider/UDivider.vue";
import UHeader from "../ui.text-header/UHeader.vue";

import { UGroup } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UGroupProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UGroupProps>(), {
  gap: getDefault<UGroupProps>(defaultConfig, UGroup).gap,
  upperlined: getDefault<UGroupProps>(defaultConfig, UGroup).upperlined,
  underlined: getDefault<UGroupProps>(defaultConfig, UGroup).underlined,
  dataTest: "",
});

const {
  headerAttrs,
  wrapperAttrs,
  headerLeftFallbackAttrs,
  titleAttrs,
  upperlineAttrs,
  underlineAttrs,
  contentAttrs,
} = useAttrs(props);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <template v-if="title">
      <UDivider v-if="upperlined" size="xl" padding="after" v-bind="upperlineAttrs" />

      <div v-bind="headerAttrs">
        <!-- @slot Use it to add something on the left side of the header. -->
        <slot name="header-left">
          <div v-bind="headerLeftFallbackAttrs">
            <!-- @slot Use it to add something before the title. -->
            <slot name="before-title" />

            <UHeader :label="title" size="xs" v-bind="titleAttrs" />

            <!-- @slot Use it to add something after the title. -->
            <slot name="after-title" />
          </div>
        </slot>

        <!-- @slot Use it to add something on the right side of the header. -->
        <slot name="header-right" />
      </div>

      <UDivider size="xl" padding="after" :no-border="!underlined" v-bind="underlineAttrs" />
    </template>

    <div v-bind="contentAttrs">
      <!-- @slot Use it to add something inside. -->
      <slot />
    </div>
  </div>
</template>
