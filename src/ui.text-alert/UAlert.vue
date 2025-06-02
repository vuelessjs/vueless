<script setup lang="ts">
import { onMounted, ref, computed, useTemplateRef } from "vue";

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

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

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
  return props.variant === "solid" ? "grayscale" : props.color;
});

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
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
  alertIconAttrs,
  contentWrapperAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-if="isShownAlert" ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()">
    <div v-bind="bodyAttrs">
      <div v-bind="contentWrapperAttrs">
        <!--
          @slot Use it to add something before the text.
          @binding {string} icon-name
        -->
        <slot name="left" :icon-name="icon">
          <UIcon v-if="icon" color="inherit" :name="icon" v-bind="alertIconAttrs" />
        </slot>

        <div v-bind="contentAttrs">
          <!--
          @slot Use it to add something instead of the title.
          @binding {string} title
          -->
          <slot v-if="!hasSlotContent($slots['default'], { title })" name="title" :title="title">
            <div v-if="title" v-bind="titleAttrs" v-text="title" />
          </slot>

          <!--
            @slot Use it to add something instead of the description.
            @binding {string} description
          -->
          <slot
            v-if="!hasSlotContent($slots['default'], { description })"
            name="description"
            :description="description"
          >
            <div v-if="description" v-bind="descriptionAttrs" v-text="description" />
          </slot>

          <UText :size="size" v-bind="textAttrs">
            <!-- @slot Use it to add something inside. -->
            <slot />
          </UText>
        </div>
      </div>

      <!--
        @slot Use it to add something instead of the close button.
        @binding {string} icon-name
        @binding {function} close
      -->
      <slot name="close" :icon-name="config.defaults.closeIcon" :close="onClickClose">
        <UButton
          v-if="closable"
          square
          size="xs"
          :color="closeButtonColor"
          variant="ghost"
          v-bind="closeButtonAttrs"
          :data-test="getDataTest('button')"
          @click="onClickClose"
        >
          <UIcon
            :color="closeButtonColor"
            :name="config.defaults.closeIcon"
            v-bind="closeIconAttrs"
          />
        </UButton>
      </slot>
    </div>
  </div>
</template>
