<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  useSlots,
  nextTick,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  useTemplateRef,
} from "vue";
import { merge, isEqual } from "lodash-es";

import UEmpty from "../ui.text-empty/UEmpty.vue";
import UDivider from "../ui.container-divider/UDivider.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";
import ULoaderProgress from "../ui.loader-progress/ULoaderProgress.vue";
import UTableRow from "./UTableRow.vue";

import useUI from "../composables/useUI.ts";
import { getDefaults, cx } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { useLocale } from "../composables/useLocale.ts";
import { PX_IN_REM } from "../constants.js";

import defaultConfig from "./config.ts";
import {
  normalizeColumns,
  mapRowColumns,
  syncRowCheck,
  toggleRowVisibility,
  switchRowCheck,
  getFlatRows,
  addRowId,
} from "./utilTable.ts";

import { COMPONENT_NAME } from "./constants.ts";

import type { Cell, Row, RowId, UTableProps, UTableRowAttrs, Config } from "./types.ts";
import type { Ref, ComputedRef, VNode } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UTableProps>(), {
  ...getDefaults<UTableProps, Config>(defaultConfig, COMPONENT_NAME),
  columns: () => [],
  rows: () => [],
  dateDivider: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the row is clicked.
   * @property {object} row
   */
  "clickRow",

  /**
   * Triggers when the row is double-clicked.
   * @property {object} row
   */
  "doubleClickRow",

  /**
   * Triggers when the cell is clicked.
   * @property {object} cell
   */
  "clickCell",

  /**
   * Tirggers when row expanded.
   * @property {object} row
   */
  "row-expand",

  /**
   * Tirggers when row collapsed.
   * @property {object} row
   */
  "row-collapse",

  /**
   * Triggers when table rows are selected (updated).
   * @property {array} tableRows
   */
  "update:rows",
]);

const slots = useSlots();
const { tm } = useLocale();

const selectAll = ref(false);
const canSelectAll = ref(true);
const selectedRows: Ref<RowId[]> = ref([]);
const tableRows: Ref<Row[]> = ref([]);
const firstRow = ref(0);
const tableWidth = ref(0);
const tableHeight = ref(0);
const pagePositionY = ref(0);

const headerRowRef = useTemplateRef<HTMLTableRowElement>("header-row");
const footerRowRef = useTemplateRef<HTMLTableRowElement>("footer-row");
const tableWrapperRef = useTemplateRef<HTMLDivElement>("table-wrapper");
const stickyFooterRowRef = useTemplateRef<HTMLTableRowElement>("sticky-footer-row");
const stickyHeaderRowRef = useTemplateRef<HTMLDivElement>("sticky-header-row");
const stickyActionHeaderRowRef = useTemplateRef<HTMLDivElement>("sticky-action-header-row");
const actionHeaderRowRef = useTemplateRef<HTMLDivElement>("action-header-row");

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config.i18n));

const sortedRows: ComputedRef<Row[]> = computed(() => {
  const headerKeys = props.columns.map((column) =>
    typeof column === "object" ? column.key : column,
  );

  return tableRows.value.map((row) => {
    const rowEntries = Object.entries(row);

    const sortedEntries: typeof rowEntries = new Array(rowEntries.length);

    rowEntries.forEach((entry) => {
      const [key] = entry;
      const headerIndex = headerKeys.indexOf(key);

      if (!~headerIndex) {
        sortedEntries.push(entry);

        return;
      }

      sortedEntries[headerIndex] = entry;
    });

    const sortedRow = Object.fromEntries(sortedEntries.filter((value) => value));

    return sortedRow as Row;
  });
});

const isFooterSticky = computed(() => {
  return (
    Number(window?.innerHeight) < tableHeight.value &&
    props.stickyFooter &&
    !isShownFooterPosition.value
  );
});

const normalizedColumns = computed(() => normalizeColumns(props.columns));

const visibleColumns = computed(() => {
  return normalizedColumns.value.filter((column) => column.isShown !== false);
});

const colsCount = computed(() => {
  return normalizedColumns.value.length + 1;
});

const lastRow = computed(() => {
  return props.rows.length - 1;
});

const isShownActionsHeader = computed(
  () => hasSlotContent(slots["header-actions"]) && Boolean(selectedRows.value.length),
);

const isHeaderSticky = computed(() => {
  const positionForFixHeader =
    Number(headerRowRef.value?.getBoundingClientRect()?.top) + Number(window?.scrollY) || 0;

  return positionForFixHeader <= pagePositionY.value && props.stickyHeader;
});

const isShownFooterPosition = computed(() => {
  const pageBottom = pagePositionY.value + Number(window?.innerHeight);
  const positionForFixFooter =
    Number(footerRowRef.value?.getBoundingClientRect()?.bottom) + Number(window?.scrollY);

  return pageBottom >= positionForFixFooter;
});

const isCheckedMoreOneTableItems = computed(() => {
  return tableRows.value.filter((item) => item.isChecked).length > 1;
});

const tableRowWidthStyle = computed(() => ({ width: `${tableWidth.value / PX_IN_REM}rem` }));

const hasSlotContentBeforeFirstRow = computed(() => {
  if (
    hasSlotContent(slots["before-first-row"]) &&
    typeof slots["before-first-row"] === "function"
  ) {
    return (slots["before-first-row"]({}) as VNode[])?.some((item) => Boolean(item.type));
  }

  return false;
});

const flatTableRows = computed(() => getFlatRows(tableRows.value));

const isSelectedAllRows = computed(() => {
  return selectedRows.value.length === flatTableRows.value.length;
});

const tableRowAttrs = computed(() => ({
  bodyCellContentAttrs,
  bodyCellCheckboxAttrs,
  bodyCheckboxAttrs,
  bodyCellNestedAttrs,
  bodyCellNestedExpandIconAttrs,
  bodyCellNestedCollapseIconAttrs,
  bodyCellBaseAttrs,
  bodyCellNestedExpandIconWrapperAttrs,
  bodyRowCheckedAttrs,
  bodyRowAttrs,
}));

watch(selectAll, onChangeSelectAll, { deep: true });
watch(selectedRows, onChangeSelectedRows, { deep: true });
watch(
  tableRows,
  () => {
    if (!isEqual(tableRows.value, props.rows)) {
      emit("update:rows", tableRows.value);
    }
  },
  { deep: true },
);
watch(() => tableRows.value, updateSelectedRows, { deep: true });
watch(() => props.rows, synchronizeTableItemsWithProps, { deep: true });
watch(isHeaderSticky, setHeaderCellWidth);
watch(isFooterSticky, (newValue) =>
  newValue ? nextTick(setFooterCellWidth) : setFooterCellWidth(null),
);
watch(
  () => selectedRows.value,
  () => {
    tableRows.value = tableRows.value
      .map(addRowId)
      .map((row) => syncRowCheck(row, selectedRows.value));
  },
  { deep: true },
);

onMounted(() => {
  tableRows.value = props.rows;

  document.addEventListener("keyup", onKeyupEsc);
  document.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onWindowResize);
});

onUpdated(() => {
  tableHeight.value = Number(tableWrapperRef.value?.offsetHeight);
  tableWidth.value = Number(tableWrapperRef.value?.offsetWidth);
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyupEsc);
  document.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onWindowResize);
});

function onWindowResize() {
  tableWidth.value = tableWrapperRef.value?.offsetWidth || 0;

  setHeaderCellWidth();
  setFooterCellWidth();
}

function getDateDividerLabel(rowDate: string | Date) {
  return Array.isArray(props.dateDivider)
    ? props.dateDivider.find((dateItem) => dateItem.date === rowDate)?.label || String(rowDate)
    : String(rowDate);
}

function setFooterCellWidth(zero?: null) {
  const ZERO_WIDTH = 0;

  if (!props.stickyFooter || !footerRowRef.value || !stickyFooterRowRef.value) return;

  const mainFooterItems = [...footerRowRef.value.children] as HTMLElement[];
  const stickyFooterItems = [...stickyFooterRowRef.value.children] as HTMLElement[];

  stickyFooterItems.forEach((item, index) => {
    item.style.width =
      zero === null ? `${ZERO_WIDTH}rem` : `${mainFooterItems[index].offsetWidth / PX_IN_REM}rem`;
  });
}

function setHeaderCellWidth() {
  if (
    !headerRowRef.value ||
    !stickyHeaderRowRef.value ||
    !stickyActionHeaderRowRef.value ||
    !actionHeaderRowRef.value
  ) {
    return;
  }

  const mainHeaderItems = [...headerRowRef.value.children] as HTMLElement[];
  const stickyHeaderItems = [
    ...stickyHeaderRowRef.value.children,
    ...stickyActionHeaderRowRef.value.children,
    ...actionHeaderRowRef.value.children,
  ] as HTMLElement[];

  stickyHeaderItems.forEach((item, index) => {
    item.style.width = `${mainHeaderItems[index]?.offsetWidth / PX_IN_REM}rem`;
  });
}

function onScroll() {
  pagePositionY.value = Number(window?.scrollY);
}

function synchronizeTableItemsWithProps() {
  if (!props.rows.length || props.rows.length !== tableRows.value.length) {
    selectedRows.value = [];
  }

  if (!isEqual(tableRows.value, props.rows)) {
    tableRows.value = props.rows;
  }
}

function updateSelectedRows() {
  const newSelectedRows = tableRows.value.filter((row) => row.isChecked).map((row) => row.id);
  const isNewRowsSelected = newSelectedRows.every((newRow) => selectedRows.value.includes(newRow));
  const isSelectedSameRows = selectedRows.value.every((selectedRow) =>
    newSelectedRows.includes(selectedRow),
  );

  if (isNewRowsSelected && isSelectedSameRows) {
    return;
  }

  selectedRows.value = newSelectedRows;
}

function onKeyupEsc(event: KeyboardEvent) {
  if (event.code === "Escape" && props.selectable) {
    selectedRows.value = [];
  }
}

function isShownDateDivider(rowIndex: number) {
  const prevIndex = rowIndex ? rowIndex - 1 : rowIndex;
  const nextIndex = rowIndex ? rowIndex + 1 : rowIndex;
  const prevItem = tableRows.value[prevIndex];
  const nextItem = tableRows.value[nextIndex];
  const currentItem = tableRows.value[rowIndex];

  if (rowIndex === 0) {
    return hasSlotContentBeforeFirstRow.value;
  }

  const isPrevSameDate = prevItem?.rowDate === currentItem?.rowDate;
  const isNextSameDate = nextItem?.rowDate === currentItem?.rowDate;

  return isPrevSameDate && !isNextSameDate && props.dateDivider;
}

function onClickRow(row: Row) {
  emit("clickRow", row);
}

function onDoubleClickRow(row: Row) {
  emit("doubleClickRow", row);
}

function onClickCell(cell: Cell, row: Row, key: string | number) {
  emit("clickCell", cell, row, key);
}

function onChangeSelectAll(selectAll: boolean) {
  if (selectAll && canSelectAll.value) {
    selectedRows.value = flatTableRows.value.map((row) => row.id);

    tableRows.value = tableRows.value.map((row) => switchRowCheck({ ...row }, true));
  } else if (!selectAll) {
    selectedRows.value = [];

    tableRows.value = tableRows.value.map((row) => switchRowCheck({ ...row }, false));
  }

  canSelectAll.value = true;
}

function onChangeSelectedRows(selectedRows: RowId[]) {
  if (selectedRows.length) {
    canSelectAll.value = false;

    isCheckedMoreOneTableItems.value && setFooterCellWidth();
  } else {
    nextTick(setHeaderCellWidth);
  }

  selectAll.value = !!selectedRows.length;
}

function clearSelectedItems() {
  selectedRows.value = [];
}

function onToggleRowVisibility(rowId: string | number) {
  tableRows.value = tableRows.value.map((row) => toggleRowVisibility({ ...row }, rowId));
}

function onToggleExpand(row: Row, expanded: boolean) {
  if (expanded) {
    emit("row-expand", row);
  } else {
    emit("row-collapse", row);
  }
}

function isRowSelectedWithin(rowIndex: number) {
  const prevRow = sortedRows.value[rowIndex - 1];
  const isPrevRowSelected = prevRow && selectedRows.value.find((rowId) => rowId === prevRow.id);
  const isRowsSelected = selectedRows.value.find(
    (rowId) => rowId === sortedRows.value[rowIndex].id,
  );

  if (prevRow) {
    return isPrevRowSelected && isRowsSelected;
  }

  return isRowsSelected;
}

defineExpose({
  /**
   * Allows to clear selected rows.
   * @property {Function}
   */
  clearSelectedItems,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  actionsHeader: isShownActionsHeader.value,
  stickedHeader: isHeaderSticky.value,
  stickedFooter: isFooterSticky.value,
}));

const {
  config,
  wrapperAttrs,
  stickyHeaderCellAttrs,
  stickyHeaderAttrs,
  tableWrapperAttrs,
  headerRowAttrs,
  bodyRowAfterAttrs,
  bodyRowBeforeAttrs,
  bodyRowBeforeCheckedAttrs,
  bodyRowBeforeCellAttrs,
  footerAttrs,
  bodyRowDateDividerAttrs,
  bodyRowCheckedDateDividerAttrs,
  headerCellBaseAttrs,
  headerCellCheckboxAttrs,
  headerActionsCheckboxAttrs,
  stickyHeaderCheckboxAttrs,
  headerCheckboxAttrs,
  headerCounterAttrs,
  bodyEmptyStateAttrs,
  bodyDateDividerAttrs,
  bodySelectedDateDividerAttrs,
  bodyCellDateDividerAttrs,
  headerActionsCounterAttrs,
  stickyHeaderCounterAttrs,
  stickyHeaderLoaderAttrs,
  tableAttrs,
  headerLoaderAttrs,
  bodyAttrs,
  footerRowAttrs,
  stickyFooterRowAttrs,
  headerAttrs,
  bodyCellContentAttrs,
  bodyCellCheckboxAttrs,
  bodyCheckboxAttrs,
  bodyCellNestedAttrs,
  bodyCellNestedExpandIconAttrs,
  bodyCellNestedCollapseIconAttrs,
  bodyCellBaseAttrs,
  bodyCellNestedExpandIconWrapperAttrs,
  bodyRowCheckedAttrs,
  bodyRowAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="dataTest">
    <div
      v-show="isHeaderSticky && !isShownActionsHeader"
      ref="sticky-header-row"
      :style="tableRowWidthStyle"
      v-bind="stickyHeaderAttrs"
    >
      <div v-bind="stickyHeaderCellAttrs">
        <UCheckbox
          v-if="selectable"
          v-model="selectAll"
          size="md"
          :partial="!isSelectedAllRows"
          v-bind="stickyHeaderCheckboxAttrs"
          :data-test="`${dataTest}-select-all`"
        />

        <div
          v-if="selectedRows.length"
          v-bind="stickyHeaderCounterAttrs"
          v-text="selectedRows.length"
        />
      </div>

      <!-- TODO: Remove any when key attrs are typed-->
      <div
        v-for="(column, index) in normalizedColumns"
        :key="index"
        v-bind="stickyHeaderCellAttrs"
        :class="cx([(stickyHeaderCellAttrs as any).class, column.thClass])"
      >
        <template v-if="hasSlotContent($slots[`header-${column.key}`])">
          <!--
              @slot Use it to customise needed header cell.
              @binding {object} column
              @binding {number} index
            -->
          <slot :name="`header-${column.key}`" :column="column" :index="index" />
        </template>

        <template v-else>
          {{ column.label }}
        </template>

        <!--
            @slot Use it to add something after the needed header cell.
            @binding {object} column
            @binding {number} index
          -->
        <slot :name="`header-${column.key}-after`" :column="column" :index="index" />
      </div>

      <ULoaderProgress v-if="isHeaderSticky" :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
    </div>

    <div
      v-show="isShownActionsHeader && isHeaderSticky"
      ref="sticky-action-header-row"
      :style="tableRowWidthStyle"
      v-bind="stickyHeaderAttrs"
    >
      <div v-bind="stickyHeaderCellAttrs">
        <UCheckbox
          v-if="selectable"
          v-model="selectAll"
          size="md"
          :partial="!isSelectedAllRows"
          v-bind="headerActionsCheckboxAttrs"
          :data-test="`${dataTest}-select-all`"
        />
      </div>

      <div
        v-if="selectedRows.length"
        v-bind="headerActionsCounterAttrs"
        v-text="selectedRows.length"
      />

      <!--
          @slot Use it to add action buttons within the actions header, which appear when rows are selected.
          @binding {array} selected-rows
        -->
      <slot name="header-actions" :selected-rows="selectedRows" />

      <ULoaderProgress v-if="isHeaderSticky" :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
    </div>

    <div
      v-show="isShownActionsHeader && !isHeaderSticky"
      ref="action-header-row"
      :style="tableRowWidthStyle"
      v-bind="stickyHeaderAttrs"
      class="absolute"
    >
      <div v-bind="stickyHeaderCellAttrs">
        <UCheckbox
          v-if="selectable"
          v-model="selectAll"
          size="md"
          :partial="!isSelectedAllRows"
          v-bind="headerActionsCheckboxAttrs"
          :data-test="`${dataTest}-select-all`"
        />
      </div>

      <div
        v-if="selectedRows.length"
        v-bind="headerActionsCounterAttrs"
        v-text="selectedRows.length"
      />

      <!--
          @slot Use it to add action buttons within the actions header, which appear when rows are selected.
          @binding {array} selected-rows
        -->
      <slot name="header-actions" :selected-rows="selectedRows" />

      <ULoaderProgress v-if="isHeaderSticky" :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
    </div>

    <div ref="table-wrapper" v-bind="tableWrapperAttrs">
      <table v-bind="tableAttrs">
        <thead v-bind="headerAttrs" :style="tableRowWidthStyle">
          <tr v-if="hasSlotContent($slots['before-header'])" v-bind="headerRowAttrs">
            <!--
                @slot Use it to add something before header row.
                @binding {number} cols-count
              -->
            <slot name="before-header" :cols-count="colsCount" />
          </tr>

          <tr v-if="hasSlotContent($slots['before-header'])" v-bind="headerRowAttrs"></tr>

          <tr ref="header-row" v-bind="headerRowAttrs">
            <th v-if="selectable" v-bind="headerCellCheckboxAttrs">
              <UCheckbox
                v-model="selectAll"
                size="md"
                :partial="!isSelectedAllRows"
                v-bind="headerCheckboxAttrs"
                :data-test="`${dataTest}-select-all`"
              />

              <div
                v-if="selectedRows.length"
                v-bind="headerCounterAttrs"
                v-text="selectedRows.length"
              />
            </th>

            <th
              v-for="(column, index) in visibleColumns"
              :key="index"
              v-bind="headerCellBaseAttrs"
              :class="cx([(headerCellBaseAttrs as any).class, column.thClass])"
            >
              <!--
                @slot Use it to customise needed header cell.
                @binding {object} column
                @binding {number} index
              -->
              <slot
                v-if="hasSlotContent($slots[`header-${column.key}`])"
                :name="`header-${column.key}`"
                :column="column"
                :index="index"
              />

              <template v-else>
                {{ column.label }}
              </template>

              <!--
                @slot Use it to add something after the needed header cell.
                @binding {object} column
                @binding {number} index
              -->
              <slot :name="`header-${column.key}-after`" :column="column" :index="index" />
            </th>
          </tr>

          <ULoaderProgress :loading="loading" v-bind="headerLoaderAttrs" />
        </thead>

        <tbody v-if="tableRows.length" v-bind="bodyAttrs">
          <template v-for="(row, rowIndex) in sortedRows" :key="row.id">
            <tr
              v-if="rowIndex === firstRow && hasSlotContent($slots['before-first-row'])"
              v-bind="tableRows[0]?.isChecked ? bodyRowBeforeCheckedAttrs : bodyRowBeforeAttrs"
            >
              <td :colspan="colsCount" v-bind="bodyRowBeforeCellAttrs">
                <!-- @slot Use it to add something before first row. -->
                <slot name="before-first-row" />
              </td>
            </tr>

            <tr
              v-if="isShownDateDivider(rowIndex) && !isRowSelectedWithin(rowIndex) && row.rowDate"
              v-bind="bodyRowDateDividerAttrs"
            >
              <td v-bind="bodyCellDateDividerAttrs" :colspan="colsCount">
                <UDivider
                  size="xs"
                  :label="getDateDividerLabel(row.rowDate)"
                  v-bind="bodyDateDividerAttrs"
                />
              </td>
            </tr>

            <tr
              v-if="isShownDateDivider(rowIndex) && isRowSelectedWithin(rowIndex) && row.rowDate"
              v-bind="bodyRowCheckedDateDividerAttrs"
            >
              <td v-bind="bodyCellDateDividerAttrs" :colspan="colsCount">
                <UDivider
                  size="xs"
                  :label="getDateDividerLabel(row.rowDate)"
                  v-bind="bodySelectedDateDividerAttrs"
                />
              </td>
            </tr>

            <UTableRow
              v-model:selected-rows="selectedRows"
              :selectable="selectable"
              :row="row"
              :columns="normalizedColumns"
              :config="config"
              :attrs="tableRowAttrs as unknown as UTableRowAttrs"
              :nested-level="0"
              :empty-cell-label="emptyCellLabel"
              :data-test="`${dataTest}-row`"
              @click="onClickRow"
              @dblclick="onDoubleClickRow"
              @click-cell="onClickCell"
              @toggle-expand="onToggleExpand"
              @toggle-row-visibility="onToggleRowVisibility"
            >
              <template
                v-for="(value, key, index) in mapRowColumns(row, normalizedColumns)"
                :key="index"
                #[`cell-${key}`]="slotValues"
              >
                <!--
                  @slot Use it to customize needed table cell.
                  @binding {string} value
                  @binding {object} row
                  @binding {number} index
                -->
                <slot
                  :name="`cell-${key}`"
                  :value="slotValues.value"
                  :row="slotValues.row"
                  :index="index"
                />
              </template>

              <template #expand="{ row: expandedRow, expanded }">
                <!--
                  @slot Use it to customize row expand icon.
                  @binding {object} row
                  @binding {boolean} expanded
                -->
                <slot name="expand" :row="expandedRow" :expanded="expanded" />
              </template>

              <template #nested-content>
                <!--
                  @slot Use it to add nested content inside a row.
                  @binding {object} row
                -->
                <slot v-if="row" name="nested-content" :row="row" />
              </template>
            </UTableRow>

            <tr
              v-if="rowIndex === lastRow && hasSlotContent($slots['after-last-row'])"
              v-bind="bodyRowAfterAttrs"
            >
              <!-- @slot Use it to add something after last row. -->
              <slot name="after-last-row" :cols-count="colsCount" />
            </tr>
          </template>
        </tbody>

        <tbody v-else>
          <tr>
            <td :colspan="colsCount">
              <!-- @slot Use it to add custom empty state. -->
              <slot name="empty-state">
                <UEmpty
                  size="md"
                  :description="currentLocale.noData"
                  v-bind="bodyEmptyStateAttrs"
                  :data-test="`${dataTest}-empty`"
                />
              </slot>
            </td>
          </tr>
        </tbody>

        <tfoot v-if="hasSlotContent($slots['footer'])" v-bind="footerAttrs">
          <tr ref="footer-row" v-bind="footerRowAttrs">
            <td v-if="selectable" />

            <!--
              @slot Use it to add something into the table footer.
              @binding {number} cols-count
            -->
            <slot name="footer" :cols-count="colsCount" />
          </tr>

          <tr ref="sticky-footer-row" :style="tableRowWidthStyle" v-bind="stickyFooterRowAttrs">
            <td v-if="selectable" />

            <!--
              @slot Use it to add something into the table footer.
              @binding {number} cols-count
            -->
            <slot name="footer" :cols-count="colsCount" />
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
