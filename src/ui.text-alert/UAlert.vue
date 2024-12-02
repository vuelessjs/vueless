<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { getDefault } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UText from "../ui.text-block/UText.vue";

import { UAlert } from "./constants.ts";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.ts";

import type { UAlertProps, TextSize, CloseIconSize } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UAlertProps>(), {
  variant: getDefault<UAlertProps>(defaultConfig, UAlert).variant,
  bordered: getDefault<UAlertProps>(defaultConfig, UAlert).bordered,
  size: getDefault<UAlertProps>(defaultConfig, UAlert).size,
  color: getDefault<UAlertProps>(defaultConfig, UAlert).color,
  timeout: getDefault<UAlertProps>(defaultConfig, UAlert).timeout,
  closable: getDefault<UAlertProps>(defaultConfig, UAlert).closable,
  dataTest: "",
  config: () => ({}),
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

const textSize = computed(() => {
  const sizes = {
    xs: "sm",
    sm: "sm",
    md: "md",
    lg: "lg",
  };

  return sizes[props.size] as TextSize;
});

const closeIconSize = computed(() => {
  const sizes = {
    xs: "3xs",
    sm: "2xs",
    md: "xs",
    lg: "sm",
  };

  return sizes[props.size] as CloseIconSize;
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

<template>
  <div v-if="isShownAlert" v-bind="wrapperAttrs" :data-test="dataTest">
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

          <UText v-bind="textAttrs" :size="textSize">
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
          :icon-name="config?.defaults?.closeIcon"
          :icon-size="closeIconSize"
          :icon-color="iconColor"
        >
          <UIcon
            internal
            :size="closeIconSize"
            :color="iconColor"
            :name="config.defaults?.closeIcon"
            v-bind="closeIconAttrs"
            :data-test="`${dataTest}-button`"
          />
        </slot>
      </UButton>
    </div>

    <!-- @slot Use it to add something under the text. -->
    <slot name="bottom" />
  </div>
</template>
