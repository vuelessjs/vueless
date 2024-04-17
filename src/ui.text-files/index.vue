<template>
  <div :data-cy="dataCy" v-bind="filesAttrs">
    <ULabel :label="label" :description="description" v-bind="labelAttrs">
      <div v-bind="bodyAttrs">
        <slot>
          <UFile
            v-for="(option, index) in options"
            :id="option.id"
            :key="option.text"
            :label="option.text"
            :url="option.url"
            :data-cy="`${dataCy}-item-${index}`"
            v-bind="fileAttrs"
          >
            <template #left="{ file }">
              <!-- @slot Use it to add something left. -->
              <slot name="left" :file="file" />
            </template>

            <template #right="{ file }">
              <!-- @slot Use it to add something right. -->
              <slot name="right" :file="file" />
            </template>
          </UFile>
        </slot>
      </div>
    </ULabel>
  </div>
</template>

<script setup>
import UFile from "../ui.text-file";
import ULabel from "../ui.form-label";
import UIService from "../service.ui";

import { UFiles } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UFiles", inheritAttrs: false });

const props = defineProps({
  /**
   * Set files label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Set description text.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Set label placement related from the default slot.
   * @values topInside, top, left, right
   */
  placement: {
    type: String,
    default: UIService.get(defaultConfig, UFiles).default.placement,
  },

  /**
   * Set options for files.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const { filesAttrs, labelAttrs, bodyAttrs, fileAttrs } = useAttrs(props);
</script>
