<template>
  <tr
    v-bind="{ ...$attrs, ...getRowAttrs(row.id) }"
    :class="cx([getRowAttrs(row.id).class, getRowClasses(row)])"
    @click="onClick(props.row)"
  >
    <td
      v-if="selectable"
      :style="getNestedCheckboxShift()"
      v-bind="bodyCellCheckboxAttrs"
      @click.stop
    >
      <UCheckbox
        v-model="selectedRows"
        :data-id="row.id"
        :value="row.id"
        :data-test="`${dataTest}-body-checkbox`"
        v-bind="bodyCheckboxAttrs"
      />
    </td>

    <td
      v-for="(value, key, index) in getFilteredRow(row, columns)"
      :key="index"
      v-bind="bodyCellBaseAttrs"
      :class="cx([columns[index].tdClass, getCellClasses(row, key)])"
      @click="onClickCell(value, row)"
    >
      <div
        v-if="(row.row || nestedLevel || row.nestedData) && index === 0"
        :style="getNestedShift()"
        v-bind="bodyCellNestedAttrs"
      >
        <UIcon
          v-if="isShownToggleIcon"
          size="xs"
          internal
          interactive
          :name="getToggleIconName(row)"
          color="brand"
          v-bind="toggleIconConfig"
          @click.stop="onClickToggleIcon"
        />

        <slot :name="`cell-${key}`" :value="value" :row="row" :index="index">
          <div
            v-bind="bodyCellContentAttrs"
            ref="cellRef"
            :class="cx([bodyCellContentAttrs.class, getCellContentClasses(row, key)])"
            :data-test="`${dataTest}-${key}-cell`"
          >
            {{ value.value || value || HYPHEN_SYMBOL }}
          </div>
        </slot>
      </div>

      <template v-else>
        <slot :name="`cell-${key}`" :value="value" :row="row" :index="index">
          <div
            v-bind="bodyCellContentAttrs"
            ref="cellRef"
            :class="cx([bodyCellContentAttrs.class, getCellContentClasses(row, key)])"
            :data-test="`${dataTest}-${key}-cell`"
          >
            {{ value.value || value || HYPHEN_SYMBOL }}
          </div>
        </slot>
      </template>
    </td>
  </tr>

  <template
    v-if="row.nestedData && !row.nestedData.isHidden && hasSlotContent($slots['nested-content'])"
  >
    <tr>
      <td :colspan="columns.length + (selectable ? 1 : 0)">
        <div :style="getNestedShift()">
          <slot name="nested-content" :row="row" />
        </div>
      </td>
    </tr>
  </template>

  <UTableRow
    v-if="isSingleNestedRow && row.row && !row.row.isHidden && !row.nestedData"
    v-bind="{
      ...$attrs,
      ...getRowAttrs(row.row.id),
    }"
    v-model:selected-rows="selectedRows"
    :class="cx([getRowAttrs(row.row.id).class, getRowClasses(row.row)])"
    :attrs="attrs"
    :columns="columns"
    :row="row.row"
    :data-test="dataTest"
    :nested-level="nestedLevel + 1"
    :config="config"
    :selectable="selectable"
    @toggle-row-visibility="onClickToggleRowChild"
    @click="onClick"
  >
    <template
      v-for="(value, key, index) in getFilteredRow(row.row, columns)"
      :key="index"
      #[`cell-${key}`]="slotValues"
    >
      <slot :name="`cell-${key}`" :value="slotValues.value" :row="slotValues.row" :index="index" />
    </template>
  </UTableRow>

  <template v-if="!isSingleNestedRow && row.row.length && !row.nestedData">
    <template v-for="nestedRow in row.row" :key="nestedRow.id">
      <UTableRow
        v-if="!nestedRow.isHidden"
        v-bind="{
          ...$attrs,
          ...getRowAttrs(nestedRow.id),
        }"
        v-model:selected-rows="selectedRows"
        :class="cx([getRowAttrs(nestedRow.id).class, getRowClasses(nestedRow)])"
        :attrs="attrs"
        :columns="columns"
        :row="nestedRow"
        :data-test="dataTest"
        :nested-level="nestedLevel + 1"
        :config="config"
        :selectable="selectable"
        @toggle-row-visibility="onClickToggleRowChild"
        @click="onClick"
        @click-cell="onClickCell"
      >
        <template
          v-for="(value, key, index) in getFilteredRow(nestedRow, columns)"
          :key="index"
          #[`cell-${key}`]="slotValues"
        >
          <slot
            :name="`cell-${key}`"
            :value="slotValues.value"
            :row="slotValues.row"
            :index="index"
          />
        </template>
      </UTableRow>
    </template>
  </template>
</template>

<script setup>
import { computed, onMounted, ref, useSlots } from "vue";
import { cx } from "../utils/utilUI.js";
import useUI from "../composables/useUI.js";

import { HYPHEN_SYMBOL } from "../constants.js";
import { getFilteredRow } from "./utilTable.js";

import { useMutationObserver } from "../composables/useMutationObserver.js";

import UIcon from "../ui.image-icon/UIcon.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

const { hasSlotContent } = useUI();

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

const emit = defineEmits(["toggleRowVisibility", "click", "click-cell"]);

const selectedRows = defineModel("selectedRows", { type: Array, default: () => [] });

const cellRef = ref([]);
const slots = useSlots();

useMutationObserver(cellRef, setCellTitle, { childList: true });

const {
  bodyCellContentAttrs,
  bodyCellCheckboxAttrs,
  bodyCheckboxAttrs,
  bodyCellNestedAttrs,
  bodyCellNestedExpandIconAttrs,
  bodyCellNestedCollapseIconAttrs,
  bodyCellBaseAttrs,
} = props.attrs;

const toggleIconConfig = computed(() =>
  props.row?.row?.isHidden
    ? bodyCellNestedExpandIconAttrs.value
    : bodyCellNestedCollapseIconAttrs.value,
);

const shift = computed(() => (props.row.row ? 1.5 : 2));

const isSingleNestedRow = computed(() => !Array.isArray(props.row.row));

const isNestedRowEmpty = computed(() => {
  if (!props.row.row) return true;

  if (Array.isArray(props.row.row)) {
    return props.row.row.some(
      (nestedRow) => !Object.keys(getFilteredRow(nestedRow, props.columns)).length,
    );
  }

  return !Object.keys(getFilteredRow(props.row.row, props.columns)).length;
});

const isShownToggleIcon = computed(() => {
  return (
    (props.row.row && !isNestedRowEmpty.value) ||
    (props.row.nestedData && hasSlotContent(slots["nested-content"]))
  );
});

const getToggleIconName = computed(() => (row) => {
  const isHiddenNestedRow = Array.isArray(row.row)
    ? row.row.some((nestedRow) => nestedRow.isHidden)
    : row.row?.isHidden;

  const isHidden = isHiddenNestedRow || row.nestedData?.isHidden;

  return isHidden ? props.config.defaults.expandIcon : props.config.defaults.collapseIcon;
});

onMounted(() => {
  cellRef.value.forEach(setElementTitle);
});

function getCellClasses(row, key) {
  const cellClasses = row[key]?.class || "";

  return typeof cellClasses === "function" ? cellClasses(row[key].value, row) : cellClasses;
}

function getCellContentClasses(row, key) {
  const cellClasses = row[key]?.contentClasses || "";

  return typeof cellClasses === "function" ? cellClasses(row[key].value, row) : cellClasses;
}

function getNestedShift() {
  return { marginLeft: `${props.nestedLevel * shift.value}rem` };
}

function getNestedCheckboxShift() {
  return { transform: `translateX(${props.nestedLevel * shift.value}rem)` };
}

function onClickToggleRowChild(rowId) {
  if (props.row.row || props.row.nestedData) {
    emit("toggleRowVisibility", rowId);
  }
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

function onClickToggleIcon() {
  if (props.row.nestedData) {
    onClickToggleRowChild(props.row.id);

    return;
  }

  if (isSingleNestedRow.value) {
    onClickToggleRowChild(props.row.row.id);

    return;
  }

  props.row.row.forEach(({ id }) => onClickToggleRowChild(id));
}

function onClickCell(cell, row) {
  emit("click-cell", cell, row);
}

function getRowClasses(row) {
  const rowClasses = row?.class || "";

  return typeof rowClasses === "function" ? rowClasses(row) : rowClasses;
}

function getRowAttrs(rowId) {
  return selectedRows.value.includes(rowId)
    ? props.attrs.bodyRowCheckedAttrs.value
    : props.attrs.bodyRowAttrs.value;
}
</script>
