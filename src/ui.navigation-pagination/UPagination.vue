<script setup lang="ts">
import { computed } from "vue";
import { range } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UButton from "../ui.button/UButton.vue";
import UIcon from "../ui.image-icon/UIcon.vue";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: 1,
  firstLabel: "",
  prevLabel: "",
  nextLabel: "",
  lastLabel: "",
});

const emit = defineEmits([
  /**
   * Triggers when current page changes.
   * @property {number} value
   */
  "change",

  /**
   * Triggers when current page changes.
   * @property {number} value
   */
  "update:modelValue",
]);

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  },
});

const totalPages = computed(() => {
  return props.perPage > 0 && props.total ? Math.ceil(props.total / props.perPage) : 0;
});

const pageButtons = computed(() => {
  const from1 = Number(currentPage.value) - Math.round(props.limit / 2) + 1;
  const from2 = totalPages.value + 1 - props.limit;

  const from = Math.max(Math.min(from1, from2), 1);
  const to = Math.min(from + props.limit - 1, totalPages.value);

  return range(from, to + 1).map((page) => {
    if (props.ellipsis && page === from && from > 1) {
      return { number: -Infinity };
    }

    if (props.ellipsis && page === to && to < totalPages.value) {
      return { number: Infinity };
    }

    return { number: page, isActive: page === currentPage.value };
  });
});

const prevIsDisabled = computed(() => {
  return props.disabled || !currentPage.value || currentPage.value <= 1;
});

const nextIsDisabled = computed(() => {
  return props.disabled || !currentPage.value || currentPage.value >= totalPages.value;
});

function selectPage(page: number) {
  currentPage.value = page;
}

function goToPrevPage() {
  currentPage.value = !currentPage.value ? 1 : Math.max(currentPage.value - 1, 1);
}

function goToNextPage() {
  currentPage.value = !currentPage.value
    ? totalPages.value
    : Math.min(currentPage.value + 1, totalPages.value);
}

function goToFirstPage() {
  currentPage.value = 1;
}

function goToLastPage() {
  currentPage.value = totalPages.value;
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
  config,
  paginationAttrs,
  firstButtonAttrs,
  lastButtonAttrs,
  prevButtonAttrs,
  nextButtonAttrs,
  activeButtonAttrs,
  inactiveButtonAttrs,
  lastIconAttrs,
  firstIconAttrs,
  prevIconAttrs,
  nextIconAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="paginationAttrs">
    <UButton
      v-if="showFirst"
      variant="thirdary"
      :label="firstLabel"
      :square="!firstLabel"
      :disabled="prevIsDisabled"
      v-bind="firstButtonAttrs"
      :data-test="getDataTest('first')"
      @click="goToFirstPage"
    >
      <!-- @slot Use it to add something instead of the "first" label. -->
      <slot name="first">
        <UIcon
          v-if="!firstLabel"
          internal
          color="brand"
          :name="config.defaults.firstIcon"
          v-bind="firstIconAttrs"
        />
      </slot>
    </UButton>

    <UButton
      variant="thirdary"
      :label="prevLabel"
      :square="!prevLabel"
      :disabled="prevIsDisabled"
      v-bind="prevButtonAttrs"
      :data-test="getDataTest('prev')"
      @click="goToPrevPage"
    >
      <!-- @slot Use it to add something instead of the "prev" label. -->
      <slot name="prev">
        <UIcon
          v-if="!prevLabel"
          internal
          color="brand"
          :name="config.defaults.prevIcon"
          v-bind="prevIconAttrs"
        />
      </slot>
    </UButton>

    <template v-for="page in pageButtons" :key="page">
      <UButton
        v-if="!isFinite(page.number)"
        square
        disabled
        variant="thirdary"
        v-bind="inactiveButtonAttrs"
      >
        <!-- @slot Use it to add something instead of the ellipsis. -->
        <slot name="ellipsis">&hellip;</slot>
      </UButton>

      <UButton
        v-else-if="page.isActive"
        filled
        :variant="variant"
        :label="String(page.number)"
        :disabled="disabled"
        v-bind="activeButtonAttrs"
        :data-test="getDataTest('active')"
      />

      <UButton
        v-else
        variant="thirdary"
        :label="String(page.number)"
        :disabled="disabled"
        v-bind="inactiveButtonAttrs"
        :data-test="getDataTest('inactive')"
        @click="selectPage(page.number)"
      />
    </template>

    <UButton
      variant="thirdary"
      :label="nextLabel"
      :square="!nextLabel"
      :disabled="nextIsDisabled"
      v-bind="nextButtonAttrs"
      :data-test="getDataTest('next')"
      @click="goToNextPage"
    >
      <!-- @slot Use it to add something instead of the "next" label. -->
      <slot name="next">
        <UIcon
          v-if="!nextLabel"
          internal
          color="brand"
          :name="config.defaults.nextIcon"
          v-bind="nextIconAttrs"
        />
      </slot>
    </UButton>

    <UButton
      v-if="showLast"
      variant="thirdary"
      :label="lastLabel"
      :square="!lastLabel"
      :disabled="nextIsDisabled"
      v-bind="lastButtonAttrs"
      :data-test="getDataTest('last')"
      @click="goToLastPage"
    >
      <!-- @slot Use it to add something instead of the "last" label. -->
      <slot name="last">
        <UIcon
          v-if="!lastLabel"
          internal
          color="brand"
          :name="config.defaults.lastIcon"
          v-bind="lastIconAttrs"
        />
      </slot>
    </UButton>
  </div>
</template>
