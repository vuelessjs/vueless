<template>
  <div v-bind="paginationAttrs">
    <UButton
      v-if="showFirst"
      no-ring
      :size="buttonSize"
      variant="thirdary"
      :label="firstLabel"
      :square="!firstLabel"
      :disabled="prevIsDisabled"
      :data-test="`${dataTest}-first`"
      v-bind="firstButtonAttrs"
      @click="goToFirstPage"
    >
      <!-- @slot Use it to add something instead of the "first" label. -->
      <slot name="first">
        <UIcon
          v-if="!firstLabel"
          internal
          :size="iconSize"
          :name="config.defaults.firstIcon"
          v-bind="firstIconAttrs"
        />
      </slot>
    </UButton>

    <UButton
      no-ring
      :size="buttonSize"
      variant="thirdary"
      :label="prevLabel"
      :square="!prevLabel"
      :disabled="prevIsDisabled"
      :data-test="`${dataTest}-prev`"
      v-bind="prevButtonAttrs"
      @click="goToPrevPage"
    >
      <!-- @slot Use it to add something instead of the "prev" label. -->
      <slot name="prev">
        <UIcon
          v-if="!prevLabel"
          internal
          :size="iconSize"
          :name="config.defaults.prevIcon"
          v-bind="prevIconAttrs"
        />
      </slot>
    </UButton>

    <template v-for="page in pageButtons" :key="page">
      <UButton
        v-if="!isFinite(page.number)"
        square
        no-ring
        disabled
        :size="buttonSize"
        variant="thirdary"
        v-bind="inactiveButtonAttrs"
      >
        <!-- @slot Use it to add something instead of the ellipsis. -->
        <slot name="ellipsis">&hellip;</slot>
      </UButton>

      <UButton
        v-else-if="page.isActive"
        filled
        no-ring
        :size="buttonSize"
        :variant="variant"
        :label="String(page.number)"
        :disabled="disabled"
        v-bind="activeButtonAttrs"
        :data-test="`${dataTest}-active`"
      />

      <UButton
        v-else
        no-ring
        :size="buttonSize"
        variant="thirdary"
        :label="String(page.number)"
        :disabled="disabled"
        v-bind="inactiveButtonAttrs"
        :data-test="`${dataTest}-inactive`"
        @click="selectPage(page.number)"
      />
    </template>

    <UButton
      no-ring
      :size="buttonSize"
      variant="thirdary"
      :label="nextLabel"
      :square="!nextLabel"
      :disabled="nextIsDisabled"
      v-bind="nextButtonAttrs"
      :data-test="`${dataTest}-next`"
      @click="goToNextPage"
    >
      <!-- @slot Use it to add something instead of the "next" label. -->
      <slot name="next">
        <UIcon
          v-if="!nextLabel"
          internal
          :size="iconSize"
          :name="config.defaults.nextIcon"
          v-bind="nextIconAttrs"
        />
      </slot>
    </UButton>

    <UButton
      v-if="showLast"
      no-ring
      :size="buttonSize"
      variant="thirdary"
      :label="lastLabel"
      :square="!lastLabel"
      :disabled="nextIsDisabled"
      v-bind="lastButtonAttrs"
      :data-test="`${dataTest}-last`"
      @click="goToLastPage"
    >
      <!-- @slot Use it to add something instead of the "last" label. -->
      <slot name="last">
        <UIcon
          v-if="!lastLabel"
          internal
          :size="iconSize"
          :name="config.defaults.lastIcon"
          v-bind="lastIconAttrs"
        />
      </slot>
    </UButton>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { range } from "lodash-es";

import UButton from "../ui.button/UButton.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import { getDefault } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { UPagination } from "./constants.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Current page number.
   */
  modelValue: {
    type: Number,
    default: null,
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
   * Pagination variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UPagination).variant,
  },

  /**
   * Pagination size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UPagination).size,
  },

  /**
   * First button label.
   */
  firstLabel: {
    type: String,
    default: "",
  },

  /**
   * Prev button label.
   */
  prevLabel: {
    type: String,
    default: "",
  },

  /**
   * Next button label.
   */
  nextLabel: {
    type: String,
    default: "",
  },

  /**
   * Last button label.
   */
  lastLabel: {
    type: String,
    default: "",
  },

  /**
   * Disable navigation buttons.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, UPagination).disabled,
  },

  /**
   * Show ellipsis.
   */
  ellipsis: {
    type: Boolean,
    default: getDefault(defaultConfig, UPagination).ellipsis,
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
   * Component config object.
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

const {
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
} = useAttrs(props);

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  },
});

const buttonSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
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
