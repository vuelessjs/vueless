<template>
  <div v-if="isShownAlert" :data-cy="dataCy" v-bind="wrapperAttrs">
    <div v-bind="bodyAttrs">
      <slot name="top" />

      <div>
        <slot name="left" />
        <div class="flex flex-col gap-2">
          <slot name="title">
            <div v-if="title" class="text-lg font-bold">{{ title }}</div>
          </slot>
          <slot name="description">
            <div v-if="description" class="text-sm">{{ description }}</div>
          </slot>
          <slot />
          <div v-if="!hasSlotContent($slots.default)" v-html="html" />
        </div>
        <slot name="right" />
      </div>

      <slot name="bottom" />
    </div>

    <UButton
      v-if="closable"
      size="sm"
      variant="thirdary"
      :color="color"
      square
      v-bind="buttonAttrs"
    >
      <UIcon
        internal
        size="xs"
        :color="color"
        :name="config.iconName"
        :data-cy="`${dataCy}-button`"
        v-bind="iconAttrs"
        @click="onHidden"
      />
    </UButton>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import UIcon from "../ui.image-icon";
import UButton from "../ui.button";
import UIService from "../service.ui";

import { UAlert } from "./constatns";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UAlert" });

const props = defineProps({
  /**
   * HTML or plain text.
   */
  html: {
    type: String,
    default: UIService.get(defaultConfig, UAlert).default.html,
  },

  /**
   * Hint size.
   * @values xs, sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UAlert).default.size,
  },

  /**
   * Hint color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UAlert).default.color,
  },

  /**
   * Show Alert with a border.
   */
  bordered: {
    type: Boolean,
    default: UIService.get(defaultConfig, UAlert).default.bordered,
  },

  /**
   * Hint timeout.
   */
  timeout: {
    type: Number,
    default: UIService.get(defaultConfig, UAlert).default.timeout,
  },

  /**
   * Show close button.
   */
  closable: {
    type: Boolean,
    default: UIService.get(defaultConfig, UAlert).default.closable,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },

  /**
   * Title of the alert.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Description of the alert.
   */
  description: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["hidden"]);

const isShownAlert = ref(true);

const { config, wrapperAttrs, bodyAttrs, iconAttrs, buttonAttrs, hasSlotContent } = useAttrs(props);

onMounted(() => {
  if (props.timeout > 0) {
    setTimeout(() => onHidden(), props.timeout);
  }
});

function onHidden() {
  isShownAlert.value = false;
  emit("hidden");
}
</script>
