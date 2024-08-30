<template>
  <ul v-bind="listAttrs">
    <li v-if="showFirst" v-bind="listItemAttrs()">
      <UButton
        no-ring
        size="sm"
        variant="thirdary"
        :disabled="prevIsDisabled"
        :data-test="`${dataTest}-first`"
        v-bind="navButtonAttrs"
        @click="goToFirstPage"
      >
        <!-- @slot Use it to add something instead of the "first" label. -->
        <slot name="first">
          <span v-bind="navButtonLabelAttrs" v-html="firstLabel" />
        </slot>
      </UButton>
    </li>

    <li v-bind="listItemAttrs()">
      <UButton
        no-ring
        size="sm"
        variant="thirdary"
        :disabled="prevIsDisabled"
        :data-test="`${dataTest}-prev`"
        v-bind="navButtonAttrs"
        @click="goToPrevPage"
      >
        <!-- @slot Use it to add something instead of the "prev" label. -->
        <slot name="prev">
          <span v-bind="navButtonLabelAttrs" v-html="prevLabel" />
        </slot>
      </UButton>
    </li>

    <li v-for="page in pageButtons" :key="page" v-bind="listItemAttrs(page)">
      <UButton
        v-if="!isFinite(page.number)"
        square
        no-ring
        size="sm"
        variant="thirdary"
        disabled
        v-bind="pageButtonAttrs"
      >
        <!-- @slot Use it to add something instead of the ellipsis. -->
        <slot name="ellipsis">&hellip;</slot>
      </UButton>

      <UButton
        v-else
        no-ring
        size="sm"
        variant="thirdary"
        :data-test="`${dataTest}-page`"
        :disabled="disabled"
        v-bind="pageButtonAttrs(page)"
        @click="selectPage(page.number)"
      >
        {{ page.number }}
      </UButton>
    </li>

    <li v-bind="listItemAttrs()">
      <UButton
        no-ring
        size="sm"
        variant="thirdary"
        :disabled="nextIsDisabled"
        :data-test="`${dataTest}-next`"
        v-bind="navButtonAttrs"
        @click="goToNextPage"
      >
        <!-- @slot Use it to add something instead of the "next" label. -->
        <slot name="next">
          <span v-bind="navButtonLabelAttrs" v-html="nextLabel" />
        </slot>
      </UButton>
    </li>

    <li v-if="showLast" v-bind="listItemAttrs()">
      <UButton
        no-ring
        size="sm"
        variant="thirdary"
        :disabled="nextIsDisabled"
        :data-test="`${dataTest}-last`"
        v-bind="navButtonAttrs"
        @click="goToLastPage"
      >
        <!-- @slot Use it to add something instead of the "last" label. -->
        <slot name="last">
          <span v-bind="navButtonLabelAttrs" v-html="lastLabel" />
        </slot>
      </UButton>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { range } from "lodash-es";

import UButton from "../ui.button";
import { getDefault } from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UPagination } from "./constants";
import useAttrs from "./composables/attrs.composable";

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
    default: getDefault(defaultConfig, UPagination).disabled,
  },

  /**
   * Number of items per page.
   */
  perPage: {
    type: Number,
    default: getDefault(defaultConfig, UPagination).perPage,
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
    default: getDefault(defaultConfig, UPagination).limit,
    validator: (value) => value >= 0,
  },

  /**
   * Show ellipsis.
   */
  ellipsis: {
    type: Boolean,
    default: getDefault(defaultConfig, UPagination).ellipsis,
  },

  /**
   * Prev button label.
   */
  prevLabel: {
    type: String,
    default: getDefault(defaultConfig, UPagination).prevLabel,
  },

  /**
   * Next button label.
   */
  nextLabel: {
    type: String,
    default: getDefault(defaultConfig, UPagination).nextLabel,
  },

  /**
   * First button label.
   */
  firstLabel: {
    type: String,
    default: getDefault(defaultConfig, UPagination).firstLabel,
  },

  /**
   * Last button label.
   */
  lastLabel: {
    type: String,
    default: getDefault(defaultConfig, UPagination).lastLabel,
  },

  /**
   * Show the first control.
   */
  showFirst: {
    type: Boolean,
    default: getDefault(defaultConfig, UPagination).showLast,
  },

  /**
   * Show the last control.
   */
  showLast: {
    type: Boolean,
    default: getDefault(defaultConfig, UPagination).showLast,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
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

const { listAttrs, listItemAttrs, navButtonAttrs, navButtonLabelAttrs, pageButtonAttrs } =
  useAttrs(props);

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
