<template>
  <div v-if="isShownAlert" :data-cy="dataCy" v-bind="wrapperAttrs">
    <!-- @slot Use it to add something above the text. -->
    <slot name="top" />

    <div v-bind="bodyAttrs">
      <!-- @slot Use it to add something before the text. -->
      <slot name="left" />

      <div v-bind="contentAttrs">
        <!--
      @slot Use it to add something instead of the title.
      @binding {string} title
      -->
        <slot name="title" :title="title">
          <div v-if="title" v-bind="titleAttrs" v-text="title" />
        </slot>

        <!--
        @slot Use it to add something instead of the description.
        @binding {string} description
      -->
        <slot name="description" :description="description">
          <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
        </slot>

        <!-- @slot Use it to add something inside. -->
        <UText v-bind="textAttrs" :size="size">
          <slot />
        </UText>
      </div>

      <UButton
        v-if="closable"
        size="sm"
        variant="thirdary"
        :color="color"
        square
        v-bind="buttonAttrs"
        @click="onClickClose"
      >
        <UIcon
          internal
          size="xs"
          :color="iconColor"
          :name="config.iconName"
          :data-cy="`${dataCy}-button`"
          v-bind="iconAttrs"
        />
      </UButton>

      <!-- @slot Use it to add something after the text. -->
      <slot name="right" />
    </div>

    <!-- @slot Use it to add something under the text. -->
    <slot name="bottom" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

import UIcon from "../ui.image-icon";
import UButton from "../ui.button";
import UText from "../ui.text-block";
import UIService from "../service.ui";

import { UAlert } from "./constatns";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UAlert" });

const props = defineProps({
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

  /**
   * Alert variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UAlert).default.variant,
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
});

const emit = defineEmits([
  /**
   * Triggers when the alert is hidden.
   */
  "hidden",
]);

const isShownAlert = ref(true);

const {
  config,
  wrapperAttrs,
  bodyAttrs,
  contentAttrs,
  textAttrs,
  titleAttrs,
  descriptionAttrs,
  iconAttrs,
  buttonAttrs,
} = useAttrs(props);

onMounted(() => {
  if (props.timeout > 0) {
    setTimeout(() => onClickClose(), props.timeout);
  }
});

function onClickClose() {
  isShownAlert.value = false;
  emit("hidden");
}

const iconColor = computed(() => {
  if (props.color === "white") {
    return "gray";
  }

  return props.variant === "primary" ? "white" : props.color;
});
</script>
