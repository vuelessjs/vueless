<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import type { Props, Config, UBreadcrumb } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  links: () => [],
});

const emit = defineEmits([
  /**
   * Triggers on a link click.
   * @property {object} link
   */
  "clickLink",
]);

const route = useRoute();

const getIconColor = computed(() => {
  return (link: UBreadcrumb, index: number) =>
    link.disabled || (!link.to && !link.href) || isLastLink(index) ? "gray" : props.color;
});

const isLinkActive = computed(() => {
  return (index: number) => {
    const link = props.links[index];

    return route.path === link.to || isLastLink(index);
  };
});

function isLastLink(index: number) {
  return index === props.links.length - 1;
}

function onClickLink(link: UBreadcrumb) {
  emit("clickLink", link);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  config,
  wrapperAttrs,
  containerAttrs,
  breadcrumbAttrs,
  breadcrumbIconAttrs,
  dividerIconAttrs,
  leftSlotWrapperAttrs,
  rightSlotWrapperAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs">
    <div v-for="(link, index) in links" :key="index" v-bind="containerAttrs">
      <div v-bind="leftSlotWrapperAttrs">
        <!--
          @slot Use it to add something instead of a link icon.
          @binding {string} icon-name
          @binding {number} index
          @binding {boolean} active
        -->
        <slot name="left" :index="index" :icon-name="link.icon" :active="isLinkActive(index)">
          <UIcon
            v-if="link.icon"
            :name="link.icon"
            :color="getIconColor(link, index)"
            v-bind="breadcrumbIconAttrs"
          />
        </slot>
      </div>

      <ULink
        :label="link.label"
        :href="link.href"
        :to="link.to"
        :size="size"
        :color="color"
        :target-blank="Boolean(link.href)"
        :custom="link.custom"
        :replace="link.replace"
        :active-class="link.activeClass"
        :exact-active-class="link.exactActiveClass"
        :wrapper-active-class="link.wrapperActiveClass"
        :wrapper-exact-active-class="link.wrapperExactActiveClass"
        :aria-current-value="link.ariaCurrentValue"
        :underlined="underlined"
        :dashed="dashed"
        :disabled="link.disabled || (!link.to && !link.href) || isLastLink(index)"
        :ring="false"
        v-bind="breadcrumbAttrs"
        :data-test="dataTest"
        @click="onClickLink(link)"
      />

      <div
        v-if="hasSlotContent($slots['divider']) || links.length !== index + 1"
        v-bind="rightSlotWrapperAttrs"
      >
        <!--
          @slot Use it to add something instead of the divider.
          @binding {string} icon-name
          @binding {number} index
          @binding {boolean} active
        -->
        <slot
          name="divider"
          :icon-name="config.defaults.dividerIcon"
          :index="index"
          :active="isLinkActive(index)"
        >
          <UIcon
            v-if="links.length !== index + 1"
            :name="config.defaults.dividerIcon"
            :color="getIconColor(link, index)"
            v-bind="dividerIconAttrs"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
