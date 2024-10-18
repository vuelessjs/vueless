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
      <UButton
        v-if="removable"
        round
        filled
        square
        no-ring
        variant="thirdary"
        :size="removeButtonSize"
        :icon="config.defaults.removeIcon"
        v-bind="removeButtonAttrs"
        :data-test="`${dataTest}-remove-item`"
        @click.stop.prevent="onRemove"
      />
    </slot>
  </ULink>
</template>

<script setup>
import { computed, ref, useId } from "vue";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";

import { getDefault } from "../utils/utilUI.js";

import useAttrs from "./useAttrs.js";
import { UFile } from "./constants.js";
import defaultConfig from "./config.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * File url.
   */
  url: {
    type: String,
    default: "",
  },

  /**
   * Image url.
   */
  imageUrl: {
    type: String,
    default: "",
  },

  /**
   * File label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * File size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UFile).size,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
  },

  /**
   * Show remove button.
   */
  removable: {
    type: Boolean,
    default: false,
  },

  /**
   * Component config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
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
  removeButtonAttrs,
} = useAttrs(props);

const iconSize = computed(() => {
  const sizes = {
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

const removeButtonSize = computed(() => {
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
