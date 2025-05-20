<script setup lang="ts">
import { computed, defineAsyncComponent, useTemplateRef } from "vue";
import { cachedIcons } from "virtual:vueless/icons";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { ICONS_CACHED_DIR, INTERNAL_ICONS_LIBRARY, STORYBOOK_ICONS_LIBRARY } from "../constants.js";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { AsyncComponentLoader, ComponentPublicInstance } from "vue";
import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const emit = defineEmits([
  /**
   * Triggers when the icon is clicked.
   */
  "click",
]);

const iconRef = useTemplateRef<ComponentPublicInstance | HTMLElement>("icon");

const dynamicComponent = computed(() => {
  let userLibrary = config.value.defaults.library;

  const isInternalIconExists = cachedIcons.find(([path]: [string]) =>
    path.includes(`${ICONS_CACHED_DIR}/${INTERNAL_ICONS_LIBRARY}/${props.name}.svg`),
  );

  const isStorybookIconExists = cachedIcons.find(([path]: [string]) =>
    path.includes(`${ICONS_CACHED_DIR}/${STORYBOOK_ICONS_LIBRARY}/${props.name}.svg`),
  );

  const isExternalIconExists = cachedIcons.find(([path]: [string]) =>
    path.includes(`${ICONS_CACHED_DIR}/${userLibrary}/${props.name}.svg`),
  );

  if (isInternalIconExists && !isExternalIconExists) {
    userLibrary = INTERNAL_ICONS_LIBRARY;
  }

  if (isStorybookIconExists && !isExternalIconExists) {
    userLibrary = STORYBOOK_ICONS_LIBRARY;
  }

  const name = props.name;
  const src = props.src;

  /* Edge case */
  if (!src && !name) return "";

  /* Static import */
  if (src?.render) {
    return src.render({}, {});
  }

  /* Dynamic import */
  if (!name) return "";

  const [, component] =
    cachedIcons.find(([path]: [string]) =>
      path.includes(`${ICONS_CACHED_DIR}/${userLibrary}/${props.name}.svg`),
    ) || [];

  return defineAsyncComponent(async () => (await component) as AsyncComponentLoader);
});

function onClick(event: MouseEvent) {
  emit("click", event);
}

defineExpose({
  /**
   * A reference to the icon element for direct DOM manipulation.
   * @property {ComponentPublicInstance | HTMLElement}
   */
  iconRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, config, iconAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <component
    :is="dynamicComponent"
    ref="icon"
    tabindex="-1"
    v-bind="iconAttrs"
    :data-test="getDataTest()"
    @click="onClick"
  />
</template>
