<script setup lang="ts">
import { computed, onMounted, useTemplateRef, useSlots, useAttrs, h } from "vue";
import { hasSlotContent, isEmptyValue } from "../utils/helper";
import { cx } from "../utils/ui";

import { PX_IN_REM } from "../constants";
import { mapRowColumns } from "./utilTable";

import { useUI } from "../composables/useUI";
import { useMutationObserver } from "../composables/useMutationObserver";

import UIcon from "../ui.image-icon/UIcon.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";

import defaultConfig from "./config";

import { StickySide } from "./types";
import type { VNode } from "vue";
import type { Cell, CellObject, Row, UTableRowProps, Config, ColumnObject } from "./types";

const NESTED_ROW_SHIFT_REM = 1.5;
const LAST_NESTED_ROW_SHIFT_REM = 1;

defineOptions({ internal: true });

const props = defineProps<UTableRowProps>();

const slots = useSlots();
const attrs = useAttrs();

const cellRef = useTemplateRef<HTMLDivElement[]>("cell");
const toggleWrapperRef = useTemplateRef<HTMLDivElement[]>("toggle-wrapper");

if (props.textEllipsis) {
  useMutationObserver(cellRef, setCellTitle, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: false,
  });
}

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

function getCellContentClass(row: Row, key: string) {
  const cell = row[key] as CellObject;
  const cellContentClass = cell?.contentClass || "";

  return cellContentClass instanceof Function
    ? cellContentClass(cell.value, row)
    : cellContentClass;
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

function getRowClasses(row: Row) {
  const rowClasses = row?.class || "";

  return typeof rowClasses === "function" ? rowClasses(row) : rowClasses;
}

function getRowAttrs() {
  return props.isChecked ? props.attrs.bodyRowCheckedAttrs.value : props.attrs.bodyRowAttrs.value;
}

function getStickyColumnStyle(column: ColumnObject) {
  const position = props.columnPositions.get(column.key);

  if (position === undefined) return {};

  if (column.sticky === StickySide.Left) {
    return { left: `${position / PX_IN_REM}rem` };
  }

  if (column.sticky === StickySide.Right) {
    return { right: `${position / PX_IN_REM}rem` };
  }

  return {};
}

function getStickyColumnClass(column: ColumnObject) {
  if (column.sticky === StickySide.Left) {
    return props.attrs.bodyCellStickyLeftAttrs.value.class as string;
  }

  if (column.sticky === StickySide.Right) {
    return props.attrs.bodyCellStickyRightAttrs.value.class as string;
  }

  return "";
}

function isCellSearchMatch(key: string): boolean {
  return Boolean(props.searchMatchColumns?.has(key));
}

function isCellActiveSearchMatch(key: string): boolean {
  return props.activeSearchMatchColumn === key;
}

function getSearchMatchCellClass(key: string): string {
  if (!isCellSearchMatch(key)) return "";

  return isCellActiveSearchMatch(key)
    ? (props.attrs.bodyCellSearchMatchActiveAttrs.value.class as string)
    : (props.attrs.bodyCellSearchMatchAttrs.value.class as string);
}

function getHighlightedHtml(value: Cell, key: string): string {
  const text = String(formatCellValue(value));
  const query = props.search;

  if (!query || !isCellSearchMatch(key)) return escapeHtml(text);

  const isActive = isCellActiveSearchMatch(key);
  const matchClass = isActive
    ? (props.attrs.bodyCellSearchMatchTextActiveAttrs.value.class as string)
    : (props.attrs.bodyCellSearchMatchTextAttrs.value.class as string);

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: string[] = [];
  let lastIndex = 0;

  let pos = lowerText.indexOf(lowerQuery);

  while (~pos) {
    if (pos > lastIndex) {
      parts.push(escapeHtml(text.slice(lastIndex, pos)));
    }

    parts.push(
      `<mark class="${matchClass}">${escapeHtml(text.slice(pos, pos + query.length))}</mark>`,
    );
    lastIndex = pos + query.length;
    pos = lowerText.indexOf(lowerQuery, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push(escapeHtml(text.slice(lastIndex)));
  }

  return parts.join("");
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isNestedFirstCell(index: number): boolean {
  return (Boolean(props.row.row) || Boolean(props.nestedLevel)) && index === 0;
}

function shouldRenderCellWrapper(row: Row, key: string): boolean {
  return Boolean(
    props.textEllipsis ||
      (props.search && isCellSearchMatch(key)) ||
      getCellContentClass(row, String(key)),
  );
}

function renderCellContent(value: Cell, key: string, index: number): VNode | VNode[] | string {
  const keyStr = String(key);
  const hasCellSlot = hasSlotContent(slots[`cell-${key}`], { value, row: props.row, index });

  // Check if slot exists
  if (hasCellSlot) {
    return slots[`cell-${key}`]?.({ value, row: props.row, index }) || "";
  }

  // Render cell wrapper with highlighted HTML
  if (shouldRenderCellWrapper(props.row, keyStr)) {
    return h("div", {
      ref: cellRef,
      ...props.attrs.bodyCellContentAttrs.value,
      class: cx([
        props.attrs.bodyCellContentAttrs.value.class,
        getCellContentClass(props.row, keyStr),
      ]),
      innerHTML: getHighlightedHtml(value, keyStr),
    });
  }

  // Render plain text
  return formatCellValue(value);
}

function renderNestedFirstCell(value: Cell, key: string, index: number): VNode {
  const keyStr = String(key);
  const hasExpandSlot = hasSlotContent(slots?.expand, {
    row: props.row,
    expanded: props.isExpanded,
  });

  const toggleIconNode = h(UIcon, {
    size: "xs",
    interactive: true,
    name: getToggleIconName(),
    color: "primary",
    ...toggleIconConfig.value,
  });

  const toggleWrapperNode = h(
    "div",
    {
      ref: toggleWrapperRef,
      ...props.attrs.bodyCellNestedIconWrapperAttrs.value,
      style: { width: getIconWidth() },
    },
    [toggleIconNode],
  );

  const toggleIconWrapperNode = h(
    "div",
    {
      "data-row-toggle-icon": props.row.id,
      "data-expand-icon": props.row.id,
      onDblclick: (e: Event) => e.stopPropagation(),
    },
    hasExpandSlot
      ? slots?.expand?.({ row: props.row, expanded: props.isExpanded })
      : [toggleWrapperNode],
  );

  const hasCellSlot = hasSlotContent(slots[`cell-${key}`], { value, row: props.row, index });

  return h(
    "div",
    {
      style: getNestedShift(),
      ...props.attrs.bodyCellNestedAttrs.value,
    },
    [
      props.row.row ? toggleIconWrapperNode : null,
      // Cell content
      ...(() => {
        if (hasCellSlot) {
          const slotContent = slots[`cell-${key}`]?.({ value, row: props.row, index });

          return Array.isArray(slotContent) ? slotContent : [slotContent];
        }

        if (shouldRenderCellWrapper(props.row, keyStr)) {
          return [
            h("div", {
              ref: cellRef,
              ...props.attrs.bodyCellContentAttrs.value,
              class: cx([
                props.attrs.bodyCellContentAttrs.value.class,
                getCellContentClass(props.row, keyStr),
              ]),
              "data-test": getDataTest(`${key}-cell`),
              innerHTML: getHighlightedHtml(value, keyStr),
            }),
          ];
        }

        return [formatCellValue(value)];
      })(),
    ].filter(Boolean),
  );
}

function renderTableCell(value: Cell, key: string, index: number): VNode {
  const keyStr = String(key);

  const nestedCellNode = isNestedFirstCell(index)
    ? renderNestedFirstCell(value, key, index)
    : renderCellContent(value, key, index);

  return h(
    "td",
    {
      key: index,
      ...props.attrs.bodyCellBaseAttrs.value,
      class: cx([
        props.attrs.bodyCellBaseAttrs.value.class,
        props.columns[index].tdClass,
        getCellClasses(props.row, keyStr),
        getStickyColumnClass(props.columns[index]),
        getSearchMatchCellClass(keyStr),
      ]),
      style: getStickyColumnStyle(props.columns[index]),
      "data-cell-key": key,
      "data-test": getDataTest(`${key}-cell`),
    },
    [nestedCellNode],
  );
}

function renderCheckboxCell(): VNode | null {
  if (!props.selectable) return null;

  const checkboxNode = h(UCheckbox, {
    modelValue: props.isChecked,
    size: "md",
    ...props.attrs.bodyCheckboxAttrs.value,
    "data-id": props.row.id,
    "data-checkbox-id": props.row.id,
    "data-test": getDataTest("body-checkbox"),
  });

  return h(
    "td",
    {
      ...props.attrs.bodyCellCheckboxAttrs.value,
      "data-checkbox-id": props.row.id,
      class: cx([
        props.attrs.bodyCellCheckboxAttrs.value.class,
        props.columns[0]?.sticky === StickySide.Left
          ? props.attrs.bodyCellStickyLeftAttrs.value.class
          : "",
      ]),
      style: {
        ...getNestedCheckboxShift(),
        ...(props.columns[0]?.sticky === StickySide.Left ? { left: "0" } : {}),
      },
      onDblclick: (e: Event) => e.stopPropagation(),
    },
    [checkboxNode],
  );
}

function renderMainRow(): VNode | null {
  const hasNestedRowSlot = hasSlotContent(slots["nested-row"], {
    row: props.row,
    nestedLevel: props.nestedLevel,
  });

  if (hasNestedRowSlot && props.row.parentRowId) {
    return null;
  }

  const cells = Object.entries(mapRowColumns(props.row, props.columns)).map(
    ([key, value], index) => {
      return renderTableCell(value, key, index);
    },
  );

  return h(
    "tr",
    {
      ...attrs,
      ...getRowAttrs(),
      class: cx([getRowAttrs().class, getRowClasses(props.row)]),
    },
    [renderCheckboxCell(), ...cells].filter(Boolean),
  );
}

function renderNestedRow(): VNode | null {
  const hasNestedRowSlot = hasSlotContent(slots["nested-row"], {
    row: props.row,
    nestedLevel: props.nestedLevel,
  });

  if (!hasNestedRowSlot || !props.row.parentRowId) {
    return null;
  }

  const nestedRowSlotContent = slots["nested-row"]?.({
    row: props.row,
    nestedLevel: props.nestedLevel,
  });

  const tdNode = h(
    "td",
    { colspan: props.columns.length + Number(props.selectable) },
    nestedRowSlotContent,
  );

  return h("tr", { class: props.row.class }, [tdNode]);
}

const { getDataTest } = useUI<Config>(defaultConfig);
</script>

<template>
  <component :is="() => [renderMainRow(), renderNestedRow()].filter(Boolean)" />
</template>
