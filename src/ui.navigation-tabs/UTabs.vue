<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UTab from "../ui.navigation-tab/UTab.vue";
import UButton from "../ui.button/UButton.vue";

import { COMPONENT_NAME, SCROLL_OFFSET } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  options: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the selected tab changes.
   * @property {string} modelValue
   */
  "update:modelValue",
]);

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const scrollContainerRef = useTemplateRef<HTMLDivElement | null>("scroll-container");
const showLeftArrow = ref(false);
const showRightArrow = ref(false);

function checkScroll() {
  if (!scrollContainerRef.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.value;

  showLeftArrow.value = scrollLeft > 0;
  showRightArrow.value = scrollLeft < scrollWidth - clientWidth;
}

function scrollPrev() {
  if (!scrollContainerRef.value) return;

  scrollContainerRef.value.scrollBy({ left: -SCROLL_OFFSET, behavior: "smooth" });
}

function scrollNext() {
  if (!scrollContainerRef.value) return;

  scrollContainerRef.value.scrollBy({ left: SCROLL_OFFSET, behavior: "smooth" });
}

onMounted(() => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.addEventListener("scroll", checkScroll, { passive: true });

    checkScroll();
  }
});

onUnmounted(() => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.removeEventListener("scroll", checkScroll);
  }
});

provide("getUTabsSize", () => props.size);
provide("getUTabsBlock", () => props.block);
provide("getUTabsSquare", () => props.square);
provide("getUTabsScrollable", () => props.scrollable);
provide("getUTabsSelectedItem", () => selectedItem.value);
provide("setUTabsSelectedItem", (value: string) => (selectedItem.value = value));

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  wrapperAttrs,
  tabsAttrs,
  tabAttrs,
  prevAttrs,
  nextAttrs,
  nextButtonAttrs,
  prevButtonAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs">
    <div v-if="scrollable && showLeftArrow" v-bind="prevAttrs" @click="scrollPrev">
      <!--
        @slot Use it to add something instead of the "prev" button.
        @binding {string} icon-name
      -->
      <slot name="prev" :icon-name="config.defaults.prevIcon">
        <UButton :icon="config.defaults.prevIcon" v-bind="prevButtonAttrs" />
      </slot>
    </div>

    <div ref="scroll-container" v-bind="tabsAttrs" :data-test="getDataTest()" @scroll="checkScroll">
      <!-- @slot Use it to add the UTab component. -->
      <slot>
        <UTab
          v-for="(item, index) in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          :size="size"
          v-bind="tabAttrs"
          :data-test="getDataTest(`item-${index}`)"
        />
      </slot>
    </div>

    <div v-if="scrollable && showRightArrow" v-bind="nextAttrs" @click="scrollNext">
      <!--
        @slot Use it to add something instead of the "next" button.
        @binding {string} icon-name
      -->
      <slot name="next" :icon-name="config.defaults.nextIcon">
        <UButton :icon="config.defaults.nextIcon" v-bind="nextButtonAttrs" />
      </slot>
    </div>
  </div>
</template>
