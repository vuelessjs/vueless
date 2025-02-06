<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UButton from "../ui.button/UButton.vue";
import UText from "../ui.text-block/UText.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const emit = defineEmits([
  /**
   * Triggers when the alert is hidden.
   */
  "hidden",
]);

const isShownAlert = ref(true);

onMounted(() => {
  if (props.timeout > 0) {
    setTimeout(() => onClickClose(), props.timeout);
  }
});

function onClickClose() {
  isShownAlert.value = false;
  emit("hidden");
}

const closeButtonColor = computed(() => {
  if (props.variant === "primary" || props.color === "white") {
    return props.color === "white" ? "grayscale" : "white";
  } else {
    return props.color;
  }
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
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
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-if="isShownAlert" v-bind="wrapperAttrs" :data-test="getDataTest()">
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

          <UText v-bind="textAttrs">
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
        size="xs"
        :color="closeButtonColor"
        variant="thirdary"
        v-bind="closeButtonAttrs"
        @click="onClickClose"
      >
        <!--
          @slot Use it to add something instead of the close button.
          @binding {string} icon-name
        -->
        <slot name="close" :icon-name="config.defaults.closeIcon">
          <UIcon
            internal
            :color="closeButtonColor"
            :name="config.defaults.closeIcon"
            v-bind="closeIconAttrs"
            :data-test="getDataTest('button')"
          />
        </slot>
      </UButton>
    </div>

    <!-- @slot Use it to add something under the text. -->
    <slot name="bottom" />
  </div>
</template>
