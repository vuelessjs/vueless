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
import { isEqual } from "lodash-es";

import UEmpty from "../ui.text-empty/UEmpty.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";
import ULoaderProgress from "../ui.loader-progress/ULoaderProgress.vue";
import UTableRow from "./UTableRow.vue";
import UDivider from "../ui.container-divider/UDivider.vue";

import useUI from "../composables/useUI.ts";
import { getDefaults, cx, getMergedConfig } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { useComponentLocaleMessages } from "../composables/useComponentLocaleMassages.ts";

import defaultConfig from "./config.ts";
import { normalizeColumns, mapRowColumns, getFlatRows, getRowChildrenIds } from "./utilTable.ts";

import { PX_IN_REM } from "../constants.js";
import { COMPONENT_NAME } from "./constants.ts";

import type { ComputedRef } from "vue";
import type { Config as UDividerConfig } from "../ui.container-divider/types.ts";
import type {
  Cell,
  Row,
  RowId,
  Props,
  UTableRowAttrs,
  Config,
  DateDivider,
  FlatRow,
} from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  columns: () => [],
  rows: () => [],
  dateDivider: () => [],
  selectedRows: () => [],
  expandedRows: () => [],
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
   * Triggers when table row selected.
   * @property {array} row
   */
  "update:selectedRows",

  /**
   * Triggers when nested row expanded.
   * @property {array} rowId
   */
  "update:expandedRows",
]);

const slots = useSlots();

const selectAll = ref(false);
const canSelectAll = ref(true);
const tableWidth = ref(0);
const tableHeight = ref(0);
const pagePositionY = ref(0);

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const headerRowRef = useTemplateRef<HTMLTableRowElement>("header-row");
const footerRowRef = useTemplateRef<HTMLTableRowElement>("footer-row");
const tableWrapperRef = useTemplateRef<HTMLDivElement>("table-wrapper");
const stickyFooterRowRef = useTemplateRef<HTMLTableRowElement>("sticky-footer-row");
const stickyHeaderRowRef = useTemplateRef<HTMLDivElement>("sticky-header-row");
const stickyActionHeaderRowRef = useTemplateRef<HTMLDivElement>("sticky-action-header-row");
const actionHeaderRowRef = useTemplateRef<HTMLDivElement>("action-header-row");

const { localeMessages } = useComponentLocaleMessages<typeof defaultConfig.i18n>(
  COMPONENT_NAME,
  defaultConfig.i18n,
  props?.config?.i18n,
);

const localSelectedRows = ref<Row[]>([]);
const localExpandedRows = ref<RowId[]>([]);

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
  () => hasSlotContent(slots["header-actions"]) && Boolean(localSelectedRows.value.length),
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
  return Boolean(localSelectedRows.value.length);
});

const tableRowWidthStyle = computed(() => ({ width: `${tableWidth.value / PX_IN_REM}rem` }));

const flatTableRows = computed(() => getFlatRows(props.rows));

const isSelectedAllRows = computed(() => {
  return localSelectedRows.value.length === flatTableRows.value.length;
});

const tableRowAttrs = computed(() => ({
  bodyCellContentAttrs,
  bodyCellCheckboxAttrs,
  bodyCheckboxAttrs,
  bodyCellNestedAttrs,
  bodyCellNestedExpandIconAttrs,
  bodyCellNestedCollapseIconAttrs,
  bodyCellBaseAttrs,
  bodyCellNestedIconWrapperAttrs,
  bodyRowCheckedAttrs,
  bodyRowAttrs,
}));

watch(localSelectedRows, onChangeLocalSelectedRows, { deep: true });
watch(() => props.selectedRows, onChangeSelectedRows, { deep: true });
watch(() => props.expandedRows, onChangeExpandedRows, { deep: true });
watch(selectAll, onChangeSelectAll);
watch(isHeaderSticky, setHeaderCellWidth);
watch(isFooterSticky, (newValue) =>
  newValue ? nextTick(setFooterCellWidth) : setFooterCellWidth(null),
);

onMounted(() => {
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

function onChangeSelectedRows() {
  if (!isEqual(props.selectedRows, localSelectedRows.value)) {
    localSelectedRows.value = props.selectedRows;
  }
}

function onChangeExpandedRows() {
  if (!isEqual(props.expandedRows, localExpandedRows.value)) {
    localExpandedRows.value = props.expandedRows;
  }
}

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

function onKeyupEsc(event: KeyboardEvent) {
  if (event.code === "Escape" && props.selectable) {
    localSelectedRows.value = [];
  }
}

function isShownDateDivider(rowIndex: number) {
  const prevIndex = rowIndex ? rowIndex - 1 : rowIndex;
  const prevItem = props.rows[prevIndex];
  const currentItem = props.rows[rowIndex];

  if (rowIndex === 0) {
    return false;
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
    localSelectedRows.value = [...flatTableRows.value];
  } else if (!selectAll) {
    localSelectedRows.value = [];
  }

  canSelectAll.value = true;
}

function onChangeLocalSelectedRows(selectedRows: Row[]) {
  if (selectedRows.length) {
    canSelectAll.value = false;

    isCheckedMoreOneTableItems.value && setFooterCellWidth();
  } else {
    nextTick(setHeaderCellWidth);
  }

  selectAll.value = !!selectedRows.length;

  if (!isEqual(localSelectedRows.value, props.selectedRows)) {
    emit("update:selectedRows", localSelectedRows.value);
  }
}

function clearSelectedItems() {
  localSelectedRows.value = [];
}

function onToggleExpand(row: Row) {
  const targetIndex = localExpandedRows.value.findIndex((expandedId) => expandedId === row.id);

  if (~targetIndex) {
    localExpandedRows.value = localExpandedRows.value.filter((expendedRow) => {
      return ![row.id, ...getRowChildrenIds(row)].includes(expendedRow);
    });
    emit("row-collapse", row);
  } else {
    localExpandedRows.value.push(row.id);
    emit("row-expand", row);
  }

  emit("update:expandedRows", localExpandedRows.value);
}

function isRowSelectedWithin(rowIndex: number) {
  const prevRow = sortedRows.value[rowIndex - 1];
  const targetRow = sortedRows.value[rowIndex];

  const isPrevRowChecked = prevRow && isRowSelected(prevRow);
  const isTargetRowChecked = targetRow && isRowSelected(targetRow);

  if (prevRow) {
    return isPrevRowChecked && isTargetRowChecked;
  }

  return isTargetRowChecked;
}

function onToggleRowCheckbox(row: Row) {
  const targetIndex = localSelectedRows.value.findIndex((selectedRow) => selectedRow.id === row.id);

  ~targetIndex ? localSelectedRows.value.splice(targetIndex, 1) : localSelectedRows.value.push(row);
}

function getDateDividerConfig(row: Row, isSelected: boolean) {
  const defaultConfig = isSelected
    ? bodySelectedDateDividerAttrs.value.config
    : bodyDateDividerAttrs.value.config;

  return getMergedConfig({
    defaultConfig: defaultConfig,
    globalConfig: getDateDividerData(row.rowDate).config,
  }) as UDividerConfig;
}

function isRowSelected(row: Row | undefined) {
  if (!row) return false;

  return !!localSelectedRows.value.find((selectedRow) => selectedRow.id === row.id);
}

defineExpose({
  /**
   * Allows to clear selected rows.
   * @property {Function}
   */
  clearSelectedItems,

  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
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
  beforeHeaderRowAttrs,
  beforeHeaderCellAttrs,
  afterBodyRowAttrs,
  beforeBodyRowAttrs,
  beforeBodyRowCheckedAttrs,
  beforeBodyRowCellAttrs,
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
  bodyCellNestedIconWrapperAttrs,
  bodyRowCheckedAttrs,
  bodyRowAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs" :data-test="getDataTest()">
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
          v-if="localSelectedRows.length"
          v-bind="stickyHeaderCounterAttrs"
          v-text="localSelectedRows.length"
        />
      </div>

      <!-- TODO: Remove any when key attrs are typed-->
      <div
        v-for="(column, index) in normalizedColumns"
        :key="index"
        v-bind="stickyHeaderCellAttrs"
        :class="cx([(stickyHeaderCellAttrs as any).class, column.thClass])"
      >
        <template v-if="hasSlotContent($slots[`header-${column.key}`], { column, index })">
          <!--
              @slot Use it to customize needed header cell.
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
        v-if="localSelectedRows.length"
        v-bind="headerActionsCounterAttrs"
        v-text="localSelectedRows.length"
      />

      <!--
        @slot Use it to add action buttons within the actions header, which appear when rows are selected.
        @binding {array} selected-rows
      -->
      <slot name="header-actions" :selected-rows="localSelectedRows" />

      <ULoaderProgress :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
    </div>

    <div
      v-show="isShownActionsHeader && !isHeaderSticky"
      ref="action-header-row"
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
        v-if="localSelectedRows.length"
        v-bind="headerActionsCounterAttrs"
        v-text="localSelectedRows.length"
      />

      <!--
        @slot Use it to add action buttons within the actions header, which appear when rows are selected.
        @binding {array} selected-rows
      -->
      <slot name="header-actions" :selected-rows="localSelectedRows" />

      <ULoaderProgress :loading="loading" v-bind="stickyHeaderLoaderAttrs" />
    </div>

    <div ref="table-wrapper" v-bind="tableWrapperAttrs">
      <table v-bind="tableAttrs">
        <thead v-bind="headerAttrs" :style="tableRowWidthStyle">
          <tr
            v-if="
              hasSlotContent($slots['before-header'], { colsCount, classes: headerRowAttrs.class })
            "
            v-bind="beforeHeaderRowAttrs"
          >
            <!--
              @slot Use it to add something before header row.
              @binding {number} cols-count
              @binding {string} classes
            -->
            <slot
              name="before-header"
              :cols-count="colsCount"
              :classes="beforeHeaderCellAttrs.class"
            />
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
                v-if="localSelectedRows.length"
                v-bind="headerCounterAttrs"
                v-text="localSelectedRows.length"
              />
            </th>

            <th
              v-for="(column, index) in visibleColumns"
              :key="index"
              v-bind="headerCellBaseAttrs"
              :class="cx([(headerCellBaseAttrs as any).class, column.thClass])"
            >
              <!--
                @slot Use it to customize needed header cell.
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
            v-if="hasSlotContent($slots['before-first-row'], { colsCount })"
            v-bind="isRowSelected(sortedRows[0]) ? beforeBodyRowCheckedAttrs : beforeBodyRowAttrs"
          >
            <td :colspan="colsCount" v-bind="beforeBodyRowCellAttrs">
              <!-- @slot Use it to add something before first row. -->
              <slot name="before-first-row" />
            </td>
          </tr>

          <template
            v-for="(row, rowIndex) in sortedRows.filter(
              (row) => !row.parentRowId || localExpandedRows.includes(row.parentRowId),
            )"
            :key="row.id"
          >
            <tr
              v-if="isShownDateDivider(rowIndex) && !isRowSelectedWithin(rowIndex) && row.rowDate"
              v-bind="bodyRowDateDividerAttrs"
            >
              <td v-bind="bodyCellDateDividerAttrs" :colspan="colsCount">
                <UDivider
                  :label="getDateDividerData(row.rowDate).label"
                  v-bind="bodyDateDividerAttrs"
                  :config="getDateDividerConfig(row, false)"
                />
              </td>
            </tr>

            <tr
              v-if="isShownDateDivider(rowIndex) && isRowSelectedWithin(rowIndex) && row.rowDate"
              v-bind="bodyRowCheckedDateDividerAttrs"
            >
              <td v-bind="bodyCellDateDividerAttrs" :colspan="colsCount">
                <UDivider
                  :label="getDateDividerData(row.rowDate).label"
                  v-bind="bodySelectedDateDividerAttrs"
                  :config="getDateDividerConfig(row, true)"
                />
              </td>
            </tr>

            <UTableRow
              :selectable="selectable"
              :row="row"
              :columns="normalizedColumns"
              :config="config"
              :attrs="tableRowAttrs as unknown as UTableRowAttrs"
              :cols-count="colsCount"
              :nested-level="Number(row.nestedLevel || 0)"
              :empty-cell-label="emptyCellLabel"
              :data-test="getDataTest('row')"
              :is-expanded="localExpandedRows.includes(row.id)"
              :is-checked="isRowSelected(row)"
              @click="onClickRow"
              @dblclick="onDoubleClickRow"
              @click-cell="onClickCell"
              @toggle-expand="onToggleExpand"
              @toggle-checkbox="onToggleRowCheckbox"
            >
              <template
                v-for="(value, key, cellIndex) in mapRowColumns(row, normalizedColumns)"
                :key="`${rowIndex}-${cellIndex}`"
                #[`cell-${key}`]="{ value: cellValue, row: cellRow }"
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
                  :value="cellValue"
                  :row="cellRow"
                  :index="rowIndex"
                  :cell-index="cellIndex"
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

              <template #nested-row>
                <!--
                  @slot Use it to add inside nested row.
                  @binding {object} row
                  @binding {number} index
                  @binding {number} nestedLevel
                -->
                <slot
                  v-if="row"
                  name="nested-row"
                  :index="rowIndex"
                  :row="row"
                  :nested-level="Number(row.nestedLevel || 0)"
                />
              </template>
            </UTableRow>
          </template>

          <tr
            v-if="
              hasSlotContent($slots['after-last-row'], {
                colsCount,
                classes: bodyCellBaseAttrs.class,
              })
            "
            v-bind="afterBodyRowAttrs"
          >
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
                  :description="localeMessages.noData"
                  v-bind="bodyEmptyStateAttrs"
                  :data-test="getDataTest('empty')"
                />
              </slot>
            </td>
          </tr>
        </tbody>

        <tfoot v-if="hasSlotContent($slots['footer'], { colsCount })" v-bind="footerAttrs">
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
