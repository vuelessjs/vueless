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

import type { Ref, ComputedRef } from "vue";
import type {
  Cell,
  Row,
  RowId,
  UTableProps,
  UTableRowAttrs,
  Config,
  DateDivider,
  FlatRow,
} from "./types.ts";

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

const sortedRows: ComputedRef<FlatRow[]> = computed(() => {
  const headerKeys = props.columns.map((column) =>
    typeof column === "object" ? column.key : column,
  );

  return flatTableRows.value.map((row) => {
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

    return sortedRow as FlatRow;
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
  bodyDateDividerAttrs,
  bodySelectedDateDividerAttrs,
  bodyCellDateDividerAttrs,
  bodyRowDateDividerAttrs,
  bodyRowCheckedDateDividerAttrs,
}));

watch(selectAll, onChangeSelectAll, { deep: true });
watch(selectedRows, onChangeSelectedRows, { deep: true });
watch(
  tableRows,
  () => {
    emit("update:rows", tableRows.value);
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

function getDateDividerData(rowDate: string | Date | undefined) {
  if (!rowDate) {
    return {
      date: "",
      label: "",
      config: {},
    };
  }

  let dividerItem = {} as DateDivider;

  if (Array.isArray(props.dateDivider)) {
    const dividerItemData = props.dateDivider.find((dateItem) => dateItem.date === rowDate);

    if (dividerItemData) {
      dividerItem = dividerItemData;
    }
  }

  return {
    date: dividerItem?.date || "",
    label: dividerItem?.label || String(rowDate),
    config: dividerItem?.config,
  };
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
  const newSelectedRows = getFlatRows(tableRows.value)
    .filter((row) => row.isChecked)
    .map((row) => row.id);
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
  const prevItem = tableRows.value[prevIndex];
  const currentItem = tableRows.value[rowIndex];

  if (rowIndex === 0) {
    return true;
  }

  const isPrevSameDate = prevItem?.rowDate === currentItem?.rowDate;

  return Boolean(!isPrevSameDate && props.dateDivider);
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

function onToggleRowVisibility(row: Row) {
  const nestedRows = flatTableRows.value.filter((flatRow) => flatRow.parentRowId === row.id);

  if (row.nestedData && row.nestedData.hasOwnProperty("isShown")) {
    row.nestedData.isShown = !row.nestedData.isShown;
  }

  if (nestedRows.length) {
    let updatedRows: Row[] = [];

    nestedRows.forEach((nestedRow) => {
      updatedRows = tableRows.value.map((row) => toggleRowVisibility({ ...row }, nestedRow.id));
    });

    tableRows.value = updatedRows;
  }
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
  const targetRow = sortedRows.value[rowIndex];

  if (prevRow) {
    return Boolean(prevRow.isChecked && targetRow.isChecked);
  }

  return Boolean(targetRow.isChecked);
}

function onToggleRowCheckbox(rowId: RowId) {
  const targetIndex = selectedRows.value.findIndex((selectedId) => selectedId === rowId);

  ~targetIndex ? selectedRows.value.splice(targetIndex, 1) : selectedRows.value.push(rowId);
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
  getDataTest,
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
  bodyDateDividerAttrs,
  bodySelectedDateDividerAttrs,
  bodyCellDateDividerAttrs,
  headerCellBaseAttrs,
  headerCellCheckboxAttrs,
  headerActionsCheckboxAttrs,
  stickyHeaderCheckboxAttrs,
  headerCheckboxAttrs,
  headerCounterAttrs,
  bodyEmptyStateAttrs,
  bodyEmptyStateCellAttrs,
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
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
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
          :data-test="getDataTest('select-all')"
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
      </div>

      <ULoaderProgress :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
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
          :data-test="getDataTest('select-all')"
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

      <ULoaderProgress :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
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
          :data-test="getDataTest('select-all')"
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

      <ULoaderProgress :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
    </div>

    <div ref="table-wrapper" v-bind="tableWrapperAttrs">
      <table v-bind="tableAttrs">
        <thead v-bind="headerAttrs" :style="tableRowWidthStyle">
          <tr v-if="hasSlotContent($slots['before-header'])" v-bind="headerRowAttrs">
            <!--
              @slot Use it to add something before header row.
              @binding {number} cols-count
              @binding {string} classes
            -->
            <slot name="before-header" :cols-count="colsCount" :classes="headerRowAttrs.class" />
          </tr>

          <tr ref="header-row" v-bind="headerRowAttrs">
            <th v-if="selectable" v-bind="headerCellCheckboxAttrs">
              <UCheckbox
                v-model="selectAll"
                size="md"
                :partial="!isSelectedAllRows"
                v-bind="headerCheckboxAttrs"
                :data-test="getDataTest('select-all')"
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
            </th>
          </tr>

          <ULoaderProgress :loading="loading" v-bind="headerLoaderAttrs" />
        </thead>

        <tbody v-if="sortedRows.length" v-bind="bodyAttrs">
          <tr
            v-if="hasSlotContent($slots['before-first-row'])"
            v-bind="sortedRows[0]?.isChecked ? bodyRowBeforeCheckedAttrs : bodyRowBeforeAttrs"
          >
            <td :colspan="colsCount" v-bind="bodyRowBeforeCellAttrs">
              <!-- @slot Use it to add something before first row. -->
              <slot name="before-first-row" />
            </td>
          </tr>

          <UTableRow
            v-for="(row, rowIndex) in sortedRows"
            :key="row.id"
            v-memo="[selectedRows.includes(row.id), row.isShown, isRowSelectedWithin(rowIndex)]"
            :selectable="selectable"
            :row="row"
            :is-date-divider="isShownDateDivider(rowIndex)"
            :columns="normalizedColumns"
            :config="config"
            :selected-within="isRowSelectedWithin(rowIndex)"
            :date-divider-data="getDateDividerData(row.rowDate)"
            :attrs="tableRowAttrs as unknown as UTableRowAttrs"
            :cols-count="colsCount"
            :nested-level="Number(row.nestedLevel || 0)"
            :empty-cell-label="emptyCellLabel"
            :data-test="getDataTest('row')"
            @click="onClickRow"
            @dblclick="onDoubleClickRow"
            @click-cell="onClickCell"
            @toggle-expand="onToggleExpand"
            @toggle-row-visibility="onToggleRowVisibility(row)"
            @toggle-checkbox="onToggleRowCheckbox"
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
                  @binding {number} cellIndex
                -->
              <slot
                :name="`cell-${key}`"
                :value="slotValues.value"
                :row="slotValues.row"
                :index="rowIndex"
                :cell-index="index"
              />
            </template>

            <template #expand="{ row: expandedRow, expanded }">
              <!--
                  @slot Use it to customize row expand icon.
                  @binding {object} row
                  @binding {boolean} expanded
                  @binding {number} index
                -->
              <slot name="expand" :index="rowIndex" :row="expandedRow" :expanded="expanded" />
            </template>

            <template #nested-content>
              <!--
                  @slot Use it to add nested content inside a row.
                  @binding {object} row
                  @binding {number} index
                -->
              <slot v-if="row" name="nested-content" :index="rowIndex" :row="row" />
            </template>
          </UTableRow>

          <tr v-if="hasSlotContent($slots['after-last-row'])" v-bind="bodyRowAfterAttrs">
            <!--
                @slot Use it to add something after last row.
                @binding {number} cols-count
                @classes {string} classes
              -->
            <slot
              name="after-last-row"
              :cols-count="colsCount"
              :classes="bodyCellBaseAttrs.class"
            />
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td :colspan="colsCount" v-bind="bodyEmptyStateCellAttrs">
              <!-- @slot Use it to add custom empty state. -->
              <slot name="empty-state">
                <UEmpty
                  size="md"
                  :description="currentLocale.noData"
                  v-bind="bodyEmptyStateAttrs"
                  :data-test="getDataTest('empty')"
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
