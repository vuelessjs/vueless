<template>
  <div v-if="isShownAlert" :data-test="dataTest" v-bind="wrapperAttrs">
    <!-- @slot Use it to add something above the text. -->
    <slot name="top" />

    <div v-bind="bodyAttrs">
      <div v-bind="contentWrapperAttrs">
        <!-- @slot Use it to add something before the text. -->
        <slot name="left" />

        <div v-bind="contentAttrs">
          <!--
          @slot Use it to add something instead of the title.
          @binding {string} title
          -->
          <slot v-if="!hasSlotContent($slots['default'])" name="title" :title="title">
            <div v-if="title" v-bind="titleAttrs" v-text="title" />
          </slot>

          <!--
            @slot Use it to add something instead of the description.
            @binding {string} description
          -->
          <slot
            v-if="!hasSlotContent($slots['default'])"
            name="description"
            :description="description"
          >
            <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
          </slot>

          <UText v-bind="textAttrs" :size="size">
            <!-- @slot Use it to add something inside. -->
            <slot />
          </UText>
        </div>

        <!-- @slot Use it to add something after the text. -->
        <slot name="right" />
      </div>

      <UButton
        v-if="closable"
        square
        no-ring
        size="xs"
        :color="closeButtonColor"
        variant="thirdary"
        v-bind="closeButtonAttrs"
        @click="onClickClose"
      >
        <!--
          @slot Use it to add something instead of the close button.
          @binding {string} icon-size
          @binding {string} icon-color
        -->
        <slot
          name="close"
          :icon-name="config.defaults.closeIcon"
          :icon-size="closeIconSize"
          :icon-color="iconColor"
        >
          <UIcon
            internal
            :size="closeIconSize"
            :color="iconColor"
            :name="config.defaults.closeIcon"
            :data-test="`${dataTest}-button`"
            v-bind="closeIconAttrs"
          />
        </slot>
      </UButton>
    </div>

    <!-- @slot Use it to add something under the text. -->
    <slot name="bottom" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UText from "../ui.text-block/UText.vue";
import { getDefault } from "../utils/utilUI.js";

import { UAlert } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

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
    default: getDefault(defaultConfig, UAlert).variant,
  },

  /**
   * Add border to the `thirdary` variant.
   */
  bordered: {
    type: Boolean,
    default: getDefault(defaultConfig, UAlert).bordered,
  },

  /**
   * Alert size.
   * @values xs, sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UAlert).size,
  },

  /**
   * Alert color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UAlert).color,
  },

  /**
   * Alert timeout.
   */
  timeout: {
    type: Number,
    default: getDefault(defaultConfig, UAlert).timeout,
  },

  /**
   * Show close button.
   */
  closable: {
    type: Boolean,
    default: getDefault(defaultConfig, UAlert).closable,
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
  closeButtonAttrs,
  closeIconAttrs,
  contentWrapperAttrs,
  hasSlotContent,
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

const closeIconSize = computed(() => {
  const sizes = {
    xs: "3xs",
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size];
});

const closeButtonColor = computed(() => {
  if (props.color === "grayscale") return "white";
  if (props.color === "white") return "grayscale";

  return props.color;
});

const iconColor = computed(() => {
  if (props.color === "white") return "gray";

  return props.variant === "primary" ? "white" : props.color;
});
</script>
