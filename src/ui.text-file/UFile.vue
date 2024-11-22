<script setup lang="ts">
import { computed, ref, useId } from "vue";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import { getDefault } from "../utils/ui.ts";

import useAttrs from "./useAttrs.ts";
import { UFile } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { UFileProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UFileProps>(), {
  size: getDefault<UFileProps>(defaultConfig, UFile).size,
  dataTest: "",
});

const emit = defineEmits([
  /**
   * Triggers when remove button is clicked.
   * @property {string} fileId
   */
  "remove",
]);

const focus = ref(false);

const elementId = props.id || useId();

const {
  config,
  fileAttrs,
  bodyAttrs,
  fileIconAttrs,
  fileLabelAttrs,
  fileImageAttrs,
  removeIconAttrs,
} = useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const removeIconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

function onRemove() {
  emit("remove", props.id);
}

function onFocus() {
  focus.value = true;
}

function onBlur() {
  focus.value = false;
}
</script>

<template>
  <ULink :href="url" no-ring v-bind="fileAttrs" :data-test="dataTest">
    <slot name="left" :file="{ elementId, label, url, imageUrl }" />

    <slot :file="{ elementId, label, url, imageUrl }">
      <div v-bind="bodyAttrs">
        <img v-if="imageUrl" :alt="label" :src="imageUrl" v-bind="fileImageAttrs" />

        <UIcon
          v-else
          internal
          interactive
          color="gray"
          :size="iconSize"
          :name="config.defaults.fileIcon"
          v-bind="fileIconAttrs"
          @focus="onFocus"
          @blur="onBlur"
        />

        <ULink :label="label" :size="size" color="gray" dashed no-ring v-bind="fileLabelAttrs" />
      </div>
    </slot>

    <slot name="right" :file="{ elementId, label, url, imageUrl }">
      <UIcon
        v-if="removable"
        internal
        interactive
        color="gray"
        :size="removeIconSize"
        :name="config.defaults.removeIcon"
        v-bind="removeIconAttrs"
        :data-test="`${dataTest}-remove-item`"
        @click.stop.prevent="onRemove"
      />
    </slot>
  </ULink>
</template>
