<script setup lang="ts">
import { ref, computed, provide, onMounted } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UTab from "../ui.navigation-tab/UTab.vue";
import UButton from "../ui.button/UButton.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import { COMPONENT_NAME } from "./constants.ts";
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

const scrollContainer = ref<HTMLElement | null>(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(false);

function checkScroll() {
  if (!scrollContainer.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;

  showLeftArrow.value = scrollLeft > 0;
  showRightArrow.value = scrollLeft < scrollWidth - clientWidth;
}

function scrollLeft() {
  if (!scrollContainer.value) return;
  scrollContainer.value.scrollBy({ left: -200, behavior: "smooth" });
}

function scrollRight() {
  if (!scrollContainer.value) return;
  scrollContainer.value.scrollBy({ left: 200, behavior: "smooth" });
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", checkScroll);

    checkScroll();
  }
});

provide("getUTabsSize", () => props.size);
provide("getUTabsBlock", () => props.block);
provide("getUTabsSquare", () => props.square);
provide("getUTabsSelectedItem", () => selectedItem.value);
provide("setUTabsSelectedItem", (value: string) => (selectedItem.value = value));

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  config,
  wrapperAttrs,
  tabsAttrs,
  tabAttrs,
  scrollButtonAttrs,
  nextIconAttrs,
  prevIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs">
    <UButton v-if="scrollable && showLeftArrow" v-bind="scrollButtonAttrs" @click="scrollLeft">
      <!--
        @slot Use it to add something instead of the "prev" icon.
        @binding {string} icon-name
      -->
      <slot name="scrollLeft" :icon-name="config.defaults.prevIcon">
        <UIcon :name="config.defaults.prevIcon" color="inherit" v-bind="prevIconAttrs" />
      </slot>
    </UButton>
    <div ref="scrollContainer" v-bind="tabsAttrs" :data-test="dataTest" @scroll="checkScroll">
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
          :data-test="`${dataTest}-item-${index}`"
        />
      </slot>
    </div>
    <UButton v-if="scrollable && showRightArrow" v-bind="scrollButtonAttrs" @click="scrollRight">
      <!--
        @slot Use it to add something instead of the "next" icon.
        @binding {string} icon-name
      -->
      <slot name="scrollRight" :icon-name="config.defaults.nextIcon">
        <UIcon :name="config.defaults.nextIcon" color="inherit" v-bind="nextIconAttrs" />
      </slot>
    </UButton>
  </div>
</template>
