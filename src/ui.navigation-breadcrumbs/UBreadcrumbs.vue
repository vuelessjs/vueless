<script setup lang="ts">
import { computed } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import ULink from "../ui.button-link/ULink.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import type { Props, Config, UBreadcrumb } from "./types.ts";
import type { ULinkSlotProps } from "../ui.button-link/types.ts";

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

const getIconColor = computed(() => {
  return (link: UBreadcrumb) => (link.disabled || (!link.to && !link.href) ? "gray" : props.color);
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
      -->
      <slot name="icon" :icon-name="link.icon" :index="index">
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
        :target="link.target || target"
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
        <template #default="slotProps">
          <!--
            @slot Use it to add something instead of a link label.
            @binding {string} label
            @binding {number} index
            @binding {boolean} active
          -->
          <slot
            name="label"
            :label="link.label"
            :index="index"
            :active="
              (slotProps as ULinkSlotProps).isActive || (slotProps as ULinkSlotProps).isExactActive
            "
          />
        </template>
      </ULink>

      <!--
        @slot Use it to add something instead of the divider.
        @binding {string} icon-name
        @binding {number} index
      -->
      <slot
        v-if="links.length !== index + 1"
        name="divider"
        :icon-name="config.defaults.dividerIcon"
        :index="index"
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
