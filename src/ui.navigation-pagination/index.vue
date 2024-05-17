<template>
  <ul v-bind="listAttrs">
    <li v-if="showFirst" v-bind="itemAttrs()">
      <UButton
        square
        variant="thirdary"
        :disabled="prevIsDisabled"
        :data-cy="`${dataCy}-first`"
        v-bind="navigationButtonAttrs"
        @click="goToFirstPage"
      >
        <slot name="first-label">
          <span v-bind="navigationButtonTextAttrs" v-html="firstLabel" />
        </slot>
      </UButton>
    </li>
    <li v-bind="itemAttrs()">
      <UButton
        square
        variant="thirdary"
        :disabled="prevIsDisabled"
        :data-cy="`${dataCy}-prev`"
        v-bind="navigationButtonAttrs"
        @click="goToPrevPage"
      >
        <slot name="prev-label">
          <span v-bind="navigationButtonTextAttrs" v-html="prevLabel" />
        </slot>
      </UButton>
    </li>

    <li v-for="page in pageButtons" :key="page" v-bind="itemAttrs(page)">
      <span v-if="!isFinite(page.number)" v-bind="itemEllipsisAttrs" v-html="ELLIPSIS_LABEL" />

      <UButton
        v-else
        square
        variant="thirdary"
        :data-cy="`${dataCy}-page`"
        :disabled="disabled"
        v-bind="pageButtonAttrs(page)"
        @click="selectPage(page.number)"
      >
        {{ page.number }}
      </UButton>
    </li>

    <li v-bind="itemAttrs()">
      <UButton
        square
        variant="thirdary"
        :disabled="nextIsDisabled"
        :data-cy="`${dataCy}-next`"
        v-bind="navigationButtonAttrs"
        @click="goToNextPage"
      >
        <slot name="next-label">
          <span v-bind="navigationButtonTextAttrs" v-html="nextLabel" />
        </slot>
      </UButton>
    </li>
    <li v-if="showLast" v-bind="itemAttrs()">
      <UButton
        square
        variant="thirdary"
        :disabled="nextIsDisabled"
        :data-cy="`${dataCy}-last`"
        v-bind="navigationButtonAttrs"
        @click="goToLastPage"
      >
        <slot name="next-label">
          <span v-bind="navigationButtonTextAttrs" v-html="lastLabel" />
        </slot>
      </UButton>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { range } from "lodash-es";

import UButton from "../ui.button";
import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UPagination, ELLIPSIS_LABEL } from "./constants";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UPagination", inheritAttrs: false });

const props = defineProps({
  /**
   * Current page number.
   */
  modelValue: {
    type: Number,
    default: null,
  },

  /**
   * Disable navigation buttons.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UPagination).default.disabled,
  },

  /**
   * Number of items per page.
   */
  perPage: {
    type: Number,
    default: UIService.get(defaultConfig, UPagination).default.perPage,
    validator: (value) => value > 0,
  },

  /**
   * Total number of items.
   */
  total: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0,
  },

  /**
   * Limit of visible pages.
   */
  limit: {
    type: Number,
    default: UIService.get(defaultConfig, UPagination).default.limit,
    validator: (value) => value >= 0,
  },

  /**
   * Show ellipsis.
   */
  ellipsis: {
    type: Boolean,
    default: UIService.get(defaultConfig, UPagination).default.ellipsis,
  },

  /**
   * Prev button label.
   */
  prevLabel: {
    type: String,
    default: UIService.get(defaultConfig, UPagination).default.prevLabel,
  },

  /**
   * Next button label.
   */
  nextLabel: {
    type: String,
    default: UIService.get(defaultConfig, UPagination).default.nextLabel,
  },

  /**
   * First button label.
   */
  firstLabel: {
    type: String,
    default: UIService.get(defaultConfig, UPagination).default.firstLabel,
  },

  /**
   * Last button label.
   */
  lastLabel: {
    type: String,
    default: UIService.get(defaultConfig, UPagination).default.lastLabel,
  },

  /**
   * Show the first control.
   */
  showFirst: {
    type: Boolean,
    default: UIService.get(defaultConfig, UPagination).default.showLast,
  },

  /**
   * Show the last control.
   */
  showLast: {
    type: Boolean,
    default: UIService.get(defaultConfig, UPagination).default.showLast,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["change", "update:modelValue"]);

const {
  listAttrs,
  itemAttrs,
  itemEllipsisAttrs,
  navigationButtonAttrs,
  navigationButtonTextAttrs,
  pageButtonAttrs,
} = useAttrs(props);

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  },
});

const totalPages = computed(() => {
  return props.perPage > 0 ? Math.ceil(props.total / props.perPage) : 0;
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
  return props.disabled || currentPage.value === null || currentPage.value <= 1;
});

const nextIsDisabled = computed(() => {
  return props.disabled || currentPage.value === null || currentPage.value >= totalPages.value;
});

function selectPage(page) {
  currentPage.value = page;
}

function goToPrevPage() {
  currentPage.value = currentPage.value === null ? 1 : Math.max(currentPage.value - 1, 1);
}

function goToNextPage() {
  currentPage.value =
    currentPage.value === null
      ? totalPages.value
      : Math.min(currentPage.value + 1, totalPages.value);
}

function goToFirstPage() {
  currentPage.value = 1;
}

function goToLastPage() {
  currentPage.value = totalPages.value;
}
</script>
