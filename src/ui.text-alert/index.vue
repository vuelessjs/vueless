<template>
  <div v-if="isShownAlert" :data-cy="dataCy" v-bind="wrapperAttrs">
    <div>
      <!-- @slot Use it to add some component above text. -->
      <slot name="top" />
    </div>
    <div v-bind="bodyAttrs">
      <div>
        <!-- @slot Use it to add some component before text. -->
        <slot name="left" />
      </div>
      <div>
        <div v-bind="titleAttrs">
          <slot name="title" :title="title">
            <div v-if="title" v-bind="titleAttrs" v-text="title" />
          </slot>
        </div>
        <div v-bind="descriptionAttrs">
          <slot name="description" :description="description">
            <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
          </slot>
        </div>
        <slot />
        <div v-if="!hasSlotContent($slots.default)" v-html="html" />
      </div>
      <div>
        <!-- @slot Use it to add some component after text. -->
        <slot name="right" />
      </div>
    </div>
    <div>
      <!-- @slot Use it to add some component under text. -->
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
   * Alert title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Alert description.
   */
  description: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["hidden"]);

const isShownAlert = ref(true);

const {
  config,
  wrapperAttrs,
  bodyAttrs,
  titleAttrs,
  descriptionAttrs,
  iconAttrs,
  buttonAttrs,
  hasSlotContent,
} = useAttrs(props);

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
