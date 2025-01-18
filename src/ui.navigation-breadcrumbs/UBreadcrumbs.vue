<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

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
  return (link: UBreadcrumb) => (link.disabled || (!link.to && !link.href) ? "gray" : props.color);
});

const isLinkActive = computed(() => {
  return (index: number) => {
    const link = props.links[index];

    return route.path === link.to;
  };
});

function onClickLink(link: UBreadcrumb) {
  emit("clickLink", link);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  config,
  breadcrumbsAttrs,
  breadcrumbAttrs,
  breadcrumbLinkAttrs,
  breadcrumbIconAttrs,
  dividerIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="breadcrumbsAttrs">
    <div v-for="(link, index) in links" :key="index" v-bind="breadcrumbAttrs">
      <!--
          @slot Use it to add something instead of a link icon.
          @binding {string} icon-name
          @binding {number} index
          @binding {boolean} active
        -->
      <slot name="left" :icon-name="link.icon" :index="index" :active="isLinkActive(index)">
        <UIcon
          v-if="link.icon"
          :name="link.icon"
          :color="getIconColor(link)"
          v-bind="breadcrumbIconAttrs"
        />
      </slot>

      <ULink
        :label="link.label"
        :href="link.href"
        :to="link.to"
        :size="size"
        :color="color"
        :target-blank="targetBlank"
        :custom="link.custom"
        :replace="link.replace"
        :active-class="link.activeClass"
        :exact-active-class="link.exactActiveClass"
        :aria-current-value="link.ariaCurrentValue"
        :underlined="underlined"
        :dashed="dashed"
        :disabled="link.disabled || (!link.to && !link.href)"
        :ring="false"
        v-bind="breadcrumbLinkAttrs"
        :data-test="dataTest"
        @click="onClickLink(link)"
      >
        <!--
          @slot Use it to add something instead of a link label.
          @binding {string} label
          @binding {number} index
          @binding {boolean} active
        -->
        <slot name="label" :label="link.label" :index="index" :active="isLinkActive(index)" />
      </ULink>

      <!--
          @slot Use it to add something instead of the divider.
          @binding {string} icon-name
          @binding {number} index
          @binding {boolean} active
        -->
      <slot
        v-if="links.length !== index + 1"
        name="divider"
        :icon-name="config.defaults.dividerIcon"
        :index="index"
        :active="isLinkActive(index)"
      >
        <UIcon
          v-if="links.length !== index + 1"
          :name="config.defaults.dividerIcon"
          :color="getIconColor(link)"
          v-bind="dividerIconAttrs"
        />
      </slot>
    </div>
  </div>
</template>
