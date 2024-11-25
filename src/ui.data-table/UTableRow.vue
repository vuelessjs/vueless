<script setup lang="ts">
import { computed, onMounted, useSlots, useTemplateRef } from "vue";
import { cx } from "../utils/ui.ts";
import useUI from "../composables/useUI.ts";

import { PX_IN_REM } from "../constants.js";
import { mapRowColumns } from "./utilTable.ts";

import { useMutationObserver } from "../composables/useMutationObserver.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import defaultConfig from "./config.ts";

import type { Cell, CellObject, Row, RowScopedProps, UTableRowProps } from "./types.ts";

const { hasSlotContent } = useUI(defaultConfig);

const NESTED_ROW_SHIFT_REM = 1.5;
const LAST_NESTED_ROW_SHIFT_REM = 2;

const props = defineProps<UTableRowProps>();

const emit = defineEmits(["toggleRowVisibility", "click", "doubleClick", "click-cell"]);

const selectedRows = defineModel("selectedRows", { type: Array, default: () => [] });

const cellRef = useTemplateRef<HTMLDivElement[]>("cell");
const toggleWrapperRef = useTemplateRef<HTMLDivElement[]>("toggle-wrapper");
const slots = useSlots();

useMutationObserver(cellRef, setCellTitle);

const toggleIconConfig = computed(() => {
  const nestedRow = props.row?.row;
  let isHidden = false;

  if (Array.isArray(nestedRow)) {
    isHidden = nestedRow.some((row) => row.isHidden);
  } else {
    isHidden = Boolean(nestedRow?.isHidden);
  }

  return isHidden
    ? props.attrs.bodyCellNestedExpandIconAttrs.value
    : props.attrs.bodyCellNestedCollapseIconAttrs.value;
});

const shift = computed(() => (props.row.row ? NESTED_ROW_SHIFT_REM : LAST_NESTED_ROW_SHIFT_REM));

const isSingleNestedRow = computed(() => !Array.isArray(props.row.row));

const singleNestedRow = computed(() =>
  Array.isArray(props.row.row) ? props.row.row.at(0) : props.row.row,
);
const nestedRows = computed(() => props.row.row as unknown as Row[]);

const isNestedRowEmpty = computed(() => {
  if (!props.row.row) return true;

  if (Array.isArray(props.row.row)) {
    return props.row.row.some(
      (nestedRow) => !Object.keys(mapRowColumns(nestedRow, props.columns)).length,
    );
  }

  return !Object.keys(mapRowColumns(props.row.row, props.columns)).length;
});

const isShownToggleIcon = computed(() => {
  return (
    (props.row.row && !isNestedRowEmpty.value) ||
    (props.row.nestedData && hasSlotContent(slots["nested-content"]))
  );
});

onMounted(() => {
  if (cellRef.value) {
    cellRef.value.forEach(setElementTitle);
  }
});

function getToggleIconName(row: Row) {
  const isHiddenNestedRow = Array.isArray(row.row)
    ? row.row.some((nestedRow) => nestedRow.isHidden)
    : row.row?.isHidden;

  const isHidden = isHiddenNestedRow || row.nestedData?.isHidden;

  return isHidden ? props.config?.defaults?.expandIcon : props.config?.defaults?.collapseIcon;
}

function getIconWidth() {
  const icon = document.querySelector(`[data-row-toggle-icon='${props.row.id}']`);
  const currentWrapperWidth = toggleWrapperRef.value?.at(0)?.getBoundingClientRect()?.width || 0;

  if (icon) {
    return `${icon.getBoundingClientRect().width / PX_IN_REM}rem`;
  }

  return `${currentWrapperWidth / PX_IN_REM || 1}rem`;
}

function getCellClasses(row: Row, key: string) {
  const isCellData = typeof row[key] === "object" && row[key] !== null && "class" in row[key];
  const cell = row[key] as CellObject;
  const cellClasses = isCellData ? cell?.class : undefined;

  if (!cellClasses) return "";

  return cellClasses instanceof Function ? cellClasses(cell.value, row) : cellClasses;
}

function getCellContentClasses(row: Row, key: string) {
  const cell = row[key] as CellObject;
  const cellContentClasses = cell?.contentClasses || "";

  return cellContentClasses instanceof Function
    ? cellContentClasses(cell.value, row)
    : cellContentClasses;
}

function isEmptyValue(value: object | null | undefined | string | unknown) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && !Object.keys(value).length)
  );
}

function formatCellValue(value: Cell) {
  const nestedValue = value && typeof value === "object" && "value" in value ? value.value : value;

  return isEmptyValue(nestedValue) ? props.emptyCellLabel : nestedValue;
}

function getNestedShift() {
  return { marginLeft: `${props.nestedLevel * shift.value}rem` };
}

function getNestedCheckboxShift() {
  return { transform: `translateX(${props.nestedLevel * shift.value}rem)` };
}

function onClickToggleRowChild(rowId: string | number) {
  if (props.row.row || props.row.nestedData) {
    emit("toggleRowVisibility", rowId);
  }
}

function onClick(row: Row) {
  emit("click", row);
}

function onDoubleClick(row: Row) {
  emit("doubleClick", row);
}

function setCellTitle(mutations: MutationRecord[]) {
  mutations.forEach((mutation) => {
    const { target } = mutation;

    setElementTitle(target as HTMLElement);
  });
}

function isElementOverflown(element: HTMLElement) {
  return element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight;
}

function setElementTitle(element: HTMLElement) {
  const isOverflown = isElementOverflown(element);

  if (isOverflown) {
    element.setAttribute("title", String(element.textContent));
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
    onClickToggleRowChild((props.row.row as Row).id);

    return;
  }

  (props.row.row as Row[]).forEach(({ id }) => onClickToggleRowChild(id));
}

function onClickCell(cell: unknown | string | number, row: Row) {
  emit("click-cell", cell, row);
}

function getRowClasses(row: Row) {
  const rowClasses = row?.class || "";

  return typeof rowClasses === "function" ? rowClasses(row) : rowClasses;
}

function getRowAttrs(rowId: string | number) {
  return selectedRows.value.includes(rowId)
    ? props.attrs.bodyRowCheckedAttrs.value
    : props.attrs.bodyRowAttrs.value;
}
</script>

<template>
  <tr
    v-bind="{ ...$attrs, ...getRowAttrs(row.id) }"
    :class="cx([getRowAttrs(row.id).class, getRowClasses(row)])"
    @click="onClick(props.row)"
    @dblclick="onDoubleClick(props.row)"
  >
    <td
      v-if="selectable"
      :style="getNestedCheckboxShift()"
      v-bind="attrs.bodyCellCheckboxAttrs.value"
      @click.stop
    >
      <UCheckbox
        v-model="selectedRows"
        size="md"
        :value="row.id"
        v-bind="attrs.bodyCheckboxAttrs.value"
        :data-id="row.id"
        :data-test="`${dataTest}-body-checkbox`"
      />
    </td>

    <td
      v-for="(value, key, index) in mapRowColumns(row, columns)"
      :key="index"
      v-bind="attrs.bodyCellBaseAttrs.value"
      :class="cx([columns[index].tdClass, getCellClasses(row, String(key))])"
      @click="onClickCell(value, row)"
    >
      <div
        v-if="(row.row || nestedLevel || row.nestedData) && index === 0"
        :style="getNestedShift()"
        v-bind="attrs.bodyCellNestedAttrs.value"
      >
        <div
          v-show="isShownToggleIcon"
          ref="toggle-wrapper"
          v-bind="attrs.bodyCellNestedExpandIconWrapperAttrs.value"
          :style="{ width: getIconWidth() }"
        >
          <UIcon
            v-if="isShownToggleIcon"
            size="xs"
            internal
            interactive
            :data-row-toggle-icon="row.id"
            :name="getToggleIconName(row)"
            color="brand"
            v-bind="toggleIconConfig"
            @click.stop="onClickToggleIcon"
          />
        </div>
        <slot :name="`cell-${key}`" :value="value" :row="row" :index="index">
          <div
            v-if="value"
            ref="cell"
            v-bind="attrs.bodyCellContentAttrs.value"
            :class="
              cx([attrs.bodyCellContentAttrs.value.class, getCellContentClasses(row, String(key))])
            "
            :data-test="`${dataTest}-${key}-cell`"
          >
            {{ formatCellValue(value) }}
          </div>
        </slot>
      </div>

      <template v-else>
        <slot :name="`cell-${key}`" :value="value" :row="row" :index="index">
          <div
            v-bind="attrs.bodyCellContentAttrs.value"
            ref="cell"
            :class="
              cx([attrs.bodyCellContentAttrs.value.class, getCellContentClasses(row, String(key))])
            "
            :data-test="`${dataTest}-${key}-cell`"
          >
            {{ formatCellValue(value) }}
          </div>
        </slot>
      </template>
    </td>
  </tr>

  <template
    v-if="row.nestedData && !row.nestedData.isHidden && hasSlotContent($slots['nested-content'])"
  >
    <tr :class="row.nestedData.class">
      <td :colspan="columns.length + (selectable ? 1 : 0)">
        <div :style="getNestedShift()">
          <slot name="nested-content" :row="row" />
        </div>
      </td>
    </tr>
  </template>

  <UTableRow
    v-if="isSingleNestedRow && singleNestedRow && !singleNestedRow.isHidden && !row.nestedData"
    v-bind="{
      ...$attrs,
      ...getRowAttrs(singleNestedRow.id),
    }"
    v-model:selected-rows="selectedRows"
    :class="cx([getRowAttrs(singleNestedRow.id).class, getRowClasses(singleNestedRow)])"
    :attrs="attrs"
    :columns="columns"
    :row="row.row as Row"
    :data-test="dataTest"
    :nested-level="nestedLevel + 1"
    :config="config"
    :selectable="selectable"
    :empty-cell-label="emptyCellLabel"
    @toggle-row-visibility="onClickToggleRowChild"
    @click="onClick"
  >
    <template
      v-for="(value, key, index) in mapRowColumns(singleNestedRow, columns)"
      :key="index"
      #[`cell-${key}`]="slotValues: RowScopedProps"
    >
      <slot :name="`cell-${key}`" :value="slotValues.value" :row="slotValues.row" :index="index" />
    </template>
  </UTableRow>

  <template v-if="!isSingleNestedRow && nestedRows.length && !row.nestedData">
    <template v-for="nestedRow in nestedRows" :key="nestedRow.id">
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
        :empty-cell-label="emptyCellLabel"
        @toggle-row-visibility="onClickToggleRowChild"
        @click="onClick"
        @dblclick="onDoubleClick"
        @click-cell="onClickCell"
      >
        <template
          v-for="(value, key, index) in mapRowColumns(nestedRow, columns)"
          :key="index"
          #[`cell-${key}`]="slotValues: RowScopedProps"
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
