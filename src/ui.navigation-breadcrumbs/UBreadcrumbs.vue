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

/**
 * Declaring component props.
 */
const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  links: () => [],
  /* Add default values for props below */
});

const emit = defineEmits([
  /**
   * Triggers on a link click.
   * @property {object} link
   */
  "clickLink",
]);

const breadcrumbIconColor = computed(() => {
  return (link: UBreadcrumb) =>
    link.disabled || (!link.route && !link.href) ? "gray" : props.color;
});

function isLastLink(index: number) {
  return index === props.links.length - 1;
}

function onClickLink(link: object) {
  emit("clickLink", link);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* Add mutated props or non-props component state below */
}));

const { wrapperAttrs, breadcrumbAttrs, breadcrumbIconAttrs } = useUI<Config>(
  defaultConfig,
  mutatedProps,
);
</script>

<template>
  <div v-bind="wrapperAttrs">
    <ULink
      v-for="(link, index) in links"
      :key="index"
      :label="link.label"
      :size="size"
      :color="color"
      :ring="false"
      :underlined="underlined"
      :dashed="dashed"
      :to="link.route"
      :href="link.href"
      :target-blank="Boolean(link.href)"
      :disabled="link.disabled || (!link.route && !link.href) || isLastLink(index)"
      v-bind="breadcrumbAttrs"
      :data-test="dataTest"
      @click="onClickLink(link)"
    >
      <template v-if="link.icon" #left>
        <UIcon :name="link.icon" :color="color" size="xs" />
      </template>

      <template v-if="links.length !== index + 1" #right>
        <UIcon name="arrow_right" :color="breadcrumbIconColor(link)" v-bind="breadcrumbIconAttrs" />
      </template>
    </ULink>
  </div>
</template>
