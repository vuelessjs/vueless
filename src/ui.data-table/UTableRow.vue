<template>
  <tr v-bind="$attrs" @click="onClick(props.row)">
    <td v-if="selectable" :style="getNestedCheckboxShift()" v-bind="bodyCellCheckboxAttrs">
      <UCheckbox
        v-model="selectedRows"
        :data-id="row.id"
        :value="row.id"
        size="sm"
        :data-test="`${dataTest}-body-checkbox`"
        v-bind="bodyCheckboxAttrs"
      />
    </td>

    <td
      v-for="(value, key, index) in getFilteredRow(row, columns)"
      :key="index"
      v-bind="getCellAttrs(key, row, index)"
      :class="cx([getCellAttrs(key, row, index).class, columns[index].tdClass])"
    >
      <div
        v-if="(row.row || nestedLevel) && index === 0"
        :style="getNestedShift()"
        v-bind="bodyCellNestedAttrs"
      >
        <UIcon
          v-if="row.row"
          size="xs"
          internal
          interactive
          :name="row?.row?.isHidden ? config.defaults.expandIcon : config.defaults.collapseIcon"
          color="brand"
          v-bind="toggleIconConfig"
          @click="onClickToggleRowChild(row.row.id)"
        />
      </div>

      <div v-if="value?.hasOwnProperty('secondary')">
        <slot :name="`cell-${key}`" :value="value" :row="row">
          <div v-bind="bodyCellPrimaryAttrs" ref="cellRef" :data-test="`${dataTest}-${key}-cell`">
            {{ value.primary || HYPHEN_SYMBOL }}
          </div>

          <div v-bind="bodyCellSecondaryAttrs">
            <template v-if="Array.isArray(value.secondary)">
              <div v-for="(secondary, idx) in value.secondary" ref="cellRef" :key="idx">
                <span v-bind="bodyCellSecondaryEmptyAttrs">
                  {{ secondary }}
                </span>
              </div>
            </template>

            <div v-else ref="cellRef">
              {{ value.secondary }}
            </div>
          </div>
        </slot>
      </div>

      <template v-else>
        <slot :name="`cell-${key}`" :value="value" :row="row">
          <div v-bind="bodyCellPrimaryAttrs" ref="cellRef" :data-test="`${dataTest}-${key}-cell`">
            {{ value || value === 0 ? value : HYPHEN_SYMBOL }}
          </div>
        </slot>
      </template>
    </td>
  </tr>

  <UTableRow
    v-if="row.row && !row.row.isHidden"
    v-bind="$attrs"
    v-model:selected-rows="selectedRows"
    :attrs="attrs"
    :columns="columns"
    :row="row.row"
    :data-test="dataTest"
    :nested-level="nestedLevel + 1"
    :config="config"
    :selectable="selectable"
    @toggle-row-visibility="onClickToggleRowChild"
    @click="onClick"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { cx } from "../utils/utilUI.js";

import { HYPHEN_SYMBOL } from "../constants.js";
import { getFilteredRow } from "./utilTable.js";

import { useMutationObserver } from "../composables/useMutationObserver.js";

import UIcon from "../ui.image-icon/UIcon.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },

  columns: {
    type: Array,
    required: true,
  },

  tag: {
    type: String,
    default: "tr",
  },

  selectable: {
    type: Boolean,
    default: false,
  },

  nestedLevel: {
    type: Number,
    default: 0,
  },

  dataTest: {
    type: String,
    required: true,
  },

  attrs: {
    type: Object,
    required: true,
  },

  config: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["toggleRowVisibility", "click"]);

const selectedRows = defineModel("selectedRows", { type: Array, default: () => [] });

const cellRef = ref([]);

useMutationObserver(cellRef, setCellTitle, { childList: true });

const {
  bodyCellPrimaryAttrs,
  bodyCellSecondaryAttrs,
  bodyCellSecondaryEmptyAttrs,
  bodyCellCheckboxAttrs,
  bodyCheckboxAttrs,
  bodyCellNestedAttrs,
  bodyCellNestedExpandIconAttrs,
  bodyCellNestedCollapseIconAttrs,
  bodyCellNestedRowAttrs,
  bodyCellBaseAttrs,
} = props.attrs;

const toggleIconConfig = computed(() =>
  props.row?.row?.isHidden ? bodyCellNestedExpandIconAttrs : bodyCellNestedCollapseIconAttrs,
);

const shift = computed(() => (props.row.row ? 1.5 : 2));

onMounted(() => {
  cellRef.value.forEach(setElementTitle);
});

function getCellAttrs(key, row, cellIndex) {
  const isNestedRow = (row.row || props.nestedLevel > 0) && cellIndex === 0;

  return isNestedRow ? bodyCellNestedRowAttrs : bodyCellBaseAttrs;
}

function getNestedShift() {
  return { marginLeft: `${props.nestedLevel * shift.value}rem` };
}

function getNestedCheckboxShift() {
  return { transform: `translateX(${props.nestedLevel * shift.value}rem)` };
}

function onClickToggleRowChild(rowId) {
  emit("toggleRowVisibility", rowId);
}

function onClick(row) {
  emit("click", row);
}

function setCellTitle(mutations) {
  mutations.forEach((mutation) => {
    const { target } = mutation;

    setElementTitle(target);
  });
}

function isElementOverflown(element) {
  return element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight;
}

function setElementTitle(element) {
  const isOverflown = isElementOverflown(element);

  if (isOverflown) {
    element.setAttribute("title", element.textContent);
  }

  if (!isOverflown && element.hasAttribute("title")) {
    element.removeAttribute("title");
  }
}
</script>
