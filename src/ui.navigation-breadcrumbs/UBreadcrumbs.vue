<script setup lang="ts">
import { computed } from "vue";

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

const getLinkProps = computed(() => {
  return (link: UBreadcrumb, index: number) => ({
    label: link.label,
    href: link.href,
    to: link.route,
    size: props.size,
    color: props.color,
    targetBlank: Boolean(link.href),
    custom: link.custom,
    replace: link.replace,
    activeClass: link.activeClass,
    exactActiveClass: link.exactActiveClass,
    wrapperActiveClass: link.wrapperActiveClass,
    wrapperExactActiveClass: link.wrapperExactActiveClass,
    ariaCurrentValue: link.ariaCurrentValue,
    underlined: props.underlined,
    dashed: props.dashed,
    disabled: link.disabled || (!link.route && !link.href) || isLastLink(index),
    ring: false,
    "data-test": props.dataTest,
  });
});

const dividerIconColor = computed(() => {
  return (link: UBreadcrumb) =>
    link.disabled || (!link.route && !link.href) ? "gray" : props.color;
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
const { config, breadcrumbsAttrs, breadcrumbAttrs, dividerIconAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="breadcrumbsAttrs">
    <ULink
      v-for="(link, index) in links"
      :key="index"
      v-bind="{ ...getLinkProps(link, index), ...breadcrumbAttrs }"
      @click="onClickLink(link)"
    >
      <template #left>
        <!--
          @slot Use it to add something instead of a link icon.
          @binding {string} icon-name
          @binding {number} index
        -->
        <slot name="left" :index="index" :icon-name="link.icon">
          <UIcon v-if="link.icon" :name="link.icon" :color="color" size="xs" />
        </slot>
      </template>

      <template v-if="links.length !== index + 1" #right>
        <!--
          @slot Use it to add something instead of the divider.
          @binding {string} icon-name
          @binding {number} index
        -->
        <slot name="divider" :icon-name="config.defaults.dividerIcon" :index="index">
          <UIcon
            :name="config.defaults.dividerIcon"
            :color="dividerIconColor(link)"
            v-bind="dividerIconAttrs"
          />
        </slot>
      </template>
    </ULink>
  </div>
</template>
