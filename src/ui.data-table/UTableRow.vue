<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from "vue";
import { cx } from "../utils/ui.ts";
import { hasSlotContent, isEmptyValue } from "../utils/helper.ts";

import { PX_IN_REM } from "../constants.js";
import { mapRowColumns } from "./utilTable.ts";

import { useMutationObserver } from "../composables/useMutationObserver.ts";
import useUI from "../composables/useUI.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import defaultConfig from "./config.ts";

import type { Cell, CellObject, Row, UTableRowProps, Config } from "./types.ts";

const NESTED_ROW_SHIFT_REM = 1.5;
const LAST_NESTED_ROW_SHIFT_REM = 1;

defineOptions({ internal: true });

const props = defineProps<UTableRowProps>();

const emit = defineEmits(["click", "dblclick", "clickCell", "toggleExpand", "toggleCheckbox"]);

const cellRef = useTemplateRef<HTMLDivElement[]>("cell");
const toggleWrapperRef = useTemplateRef<HTMLDivElement[]>("toggle-wrapper");

useMutationObserver(cellRef, setCellTitle, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: false,
});

const toggleIconConfig = computed(() => {
  const nestedRow = props.row?.row;
  let isShown = false;

  if (Array.isArray(nestedRow)) {
    isShown = nestedRow.some((row) => row.isShown);
  } else {
    isShown = Boolean(nestedRow?.isShown);
  }

  return isShown
    ? props.attrs.bodyCellNestedCollapseIconAttrs.value
    : props.attrs.bodyCellNestedExpandIconAttrs.value;
});

onMounted(() => {
  if (cellRef.value) {
    cellRef.value.forEach(setElementTitle);
  }
});

function getToggleIconName() {
  return props.isExpanded
    ? props.config?.defaults?.collapseIcon
    : props.config?.defaults?.expandIcon;
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

function formatCellValue(value: Cell) {
  const nestedValue = value && typeof value === "object" && "value" in value ? value.value : value;

  return isEmptyValue(nestedValue) ? props.emptyCellLabel : nestedValue;
}

function getNestedShift() {
  return { marginLeft: `${props.nestedLevel * NESTED_ROW_SHIFT_REM}rem` };
}

function getNestedCheckboxShift() {
  return { transform: `translateX(${props.nestedLevel * LAST_NESTED_ROW_SHIFT_REM}rem)` };
}

function onClick(row: Row) {
  emit("click", row);
}

function onDoubleClick(row: Row) {
  const selection = window.getSelection();

  if (selection) {
    selection.removeAllRanges();
  }

  emit("dblclick", row);
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

function onClickCell(cell: unknown | string | number, row: Row, key: string | number) {
  emit("clickCell", cell, row, key);
}

function getRowClasses(row: Row) {
  const rowClasses = row?.class || "";

  return typeof rowClasses === "function" ? rowClasses(row) : rowClasses;
}

function getRowAttrs() {
  return props.isChecked ? props.attrs.bodyRowCheckedAttrs.value : props.attrs.bodyRowAttrs.value;
}

function onToggleExpand(row: Row) {
  emit("toggleExpand", row);
}

function onInputCheckbox(row: Row) {
  emit("toggleCheckbox", row);
}

const { getDataTest } = useUI<Config>(defaultConfig);
</script>

<template>
  <tr
    v-if="!row.parentRowId || !hasSlotContent($slots['nested-row'])"
    v-bind="{ ...$attrs, ...getRowAttrs() }"
    :class="cx([getRowAttrs().class, getRowClasses(row)])"
    @click="onClick(props.row)"
    @dblclick="onDoubleClick(props.row)"
  >
    <td
      v-if="selectable"
      :style="getNestedCheckboxShift()"
      v-bind="attrs.bodyCellCheckboxAttrs.value"
      @click.stop
      @dblclick.stop
    >
      <UCheckbox
        :model-value="isChecked"
        size="md"
        v-bind="attrs.bodyCheckboxAttrs.value"
        :data-id="row.id"
        :data-test="getDataTest('body-checkbox')"
        @input="onInputCheckbox(row)"
      />
    </td>

    <td
      v-for="(value, key, index) in mapRowColumns(row, columns)"
      :key="index"
      v-bind="attrs.bodyCellBaseAttrs.value"
      :class="cx([columns[index].tdClass, getCellClasses(row, String(key))])"
      @click="onClickCell(value, row, key)"
    >
      <div
        v-if="(row.row || nestedLevel) && index === 0"
        :style="getNestedShift()"
        v-bind="attrs.bodyCellNestedAttrs.value"
      >
        <div
          v-if="row.row"
          :data-row-toggle-icon="row.id"
          @dblclick.stop
          @click.stop="onToggleExpand(row)"
        >
          <slot name="expand" :row="row" :expanded="isExpanded">
            <div
              ref="toggle-wrapper"
              v-bind="attrs.bodyCellNestedIconWrapperAttrs.value"
              :style="{ width: getIconWidth() }"
            >
              <UIcon
                size="xs"
                interactive
                :name="getToggleIconName()"
                color="primary"
                v-bind="toggleIconConfig"
              />
            </div>
          </slot>
        </div>
        <slot :name="`cell-${key}`" :value="value" :row="row" :index="index">
          <div
            v-if="value"
            ref="cell"
            v-bind="attrs.bodyCellContentAttrs.value"
            :class="
              cx([attrs.bodyCellContentAttrs.value.class, getCellContentClasses(row, String(key))])
            "
            :data-test="getDataTest(`${key}-cell`)"
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
            :data-test="getDataTest(`${key}-cell`)"
          >
            {{ formatCellValue(value) }}
          </div>
        </slot>
      </template>
    </td>
  </tr>

  <tr
    v-if="row.parentRowId && hasSlotContent($slots['nested-row'], { row, nestedLevel })"
    :class="row.class"
  >
    <td :colspan="columns.length + Number(selectable)">
      <slot name="nested-row" :row="row" :nested-level="nestedLevel" />
    </td>
  </tr>
</template>
