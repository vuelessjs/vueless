<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
    <div
      v-show="isHeaderSticky || isShownActionsHeader"
      ref="stickyHeaderRowRef"
      :style="tableRowWidthStyle"
      v-bind="stickyHeaderAttrs"
    >
      <template v-if="isShownActionsHeader">
        <div v-bind="stickyHeaderCellAttrs">
          <UCheckbox
            v-if="selectable"
            v-model="selectAll"
            size="sm"
            :partial="!isSelectedAllRows"
            :data-test="`${dataTest}-select-all`"
            v-bind="stickyHeaderActionsCheckboxAttrs"
          />
        </div>

        <div
          v-if="selectedRows.length"
          v-bind="stickyHeaderActionsCounterAttrs"
          v-text="selectedRows.length"
        />

        <!--
          @slot Use it to add action buttons within the actions header, which appear when rows are selected.
          @binding {array} selected-rows
        -->
        <slot name="header-actions" :selected-rows="selectedRows" />
      </template>

      <template v-else>
        <div v-bind="stickyHeaderCellAttrs">
          <UCheckbox
            v-if="selectable"
            v-model="selectAll"
            size="sm"
            :partial="!isSelectedAllRows"
            :data-test="`${dataTest}-select-all`"
            v-bind="stickyHeaderCheckboxAttrs"
          />

          <div
            v-if="selectedRows.length"
            v-bind="stickyHeaderCounterAttrs"
            v-text="selectedRows.length"
          />
        </div>

        <div
          v-for="(column, index) in columns"
          :key="index"
          v-bind="stickyHeaderCellAttrs"
          :class="cx([stickyHeaderCellAttrs.class, column.thClass])"
        >
          <template v-if="hasSlotContent($slots[`header-${column.key}`])">
            <!--
              @slot Use it to customise needed header cell.
              @binding {string} name
              @binding {number} column
            -->
            <slot :name="`header-${column.key}`" :column="column" />
          </template>

          <template v-else>
            {{ column.label }}
          </template>

          <!--
            @slot Use it to add something after the needed header cell.
            @binding {string} name
            @binding {number} column
          -->
          <slot :name="`header-${column.key}-after`" :column="column" />
        </div>
      </template>

      <ULoaderProgress
        v-if="resource && isHeaderSticky"
        :resources="resource"
        v-bind="stickyHeaderLoaderAttrs"
      />
    </div>

    <div ref="tableWrapperRef" v-bind="tableWrapperAttrs">
      <table v-bind="tableAttrs">
        <thead v-bind="headerAttrs" :style="tableRowWidthStyle">
          <tr v-if="hasSlotContent($slots['before-header'])" v-bind="headerRowAttrs">
            <td
              v-if="hasSlotContent($slots['before-header'])"
              :colspan="colsCount"
              v-bind="headerCellBaseAttrs"
            >
              <!--
                @slot Use it to add something before header row.
                @binding {number} cols-count
              -->
              <slot name="before-header" :cols-count="colsCount" />
            </td>
          </tr>

          <tr v-if="hasSlotContent($slots['before-header'])" v-bind="headerRowAttrs"></tr>

          <tr ref="headerRowRef" v-bind="headerRowAttrs">
            <th v-if="selectable" v-bind="headerCellCheckboxAttrs">
              <UCheckbox
                v-model="selectAll"
                size="sm"
                :partial="!isSelectedAllRows"
                :data-test="`${dataTest}-select-all`"
                v-bind="headerCheckboxAttrs"
              />

              <div
                v-if="selectedRows.length"
                v-bind="headerCounterAttrs"
                v-text="selectedRows.length"
              />
            </th>

            <th
              v-for="(column, index) in normalizedColumns"
              :key="index"
              v-bind="headerCellBaseAttrs"
              :class="cx([headerCellBaseAttrs.class, column.thClass])"
            >
              <!--
                @slot Use it to customise needed header cell.
                @binding {string} name
                @binding {number} column
              -->
              <slot
                v-if="hasSlotContent($slots[`header-${column.key}`])"
                :name="`header-${column.key}`"
                :column="column"
              />

              <template v-else>
                {{ column.label }}
              </template>

              <!--
                @slot Use it to add something after the needed header cell.
                @binding {string} name
                @binding {number} column
              -->
              <slot :name="`header-${column.key}-after`" :column="column" />
            </th>
          </tr>

          <ULoaderProgress v-if="resource" :resources="resource" v-bind="headerLoaderAttrs" />
        </thead>

        <tbody v-if="tableRows.length" v-bind="bodyAttrs">
          <template v-for="(row, rowIndex) in sortedRows" :key="row.id">
            <tr
              v-if="rowIndex === firstRow && hasSlotContent($slots['before-first-row'])"
              v-bind="bodyRowBeforeAttrs"
            >
              <td :colspan="colsCount" v-bind="bodyRowBeforeCellAttrs">
                <!-- @slot Use it to add something before first row. -->
                <slot name="before-first-row" />
              </td>
            </tr>

            <tr
              v-if="isShownDateSeparator(rowIndex) && row.date"
              v-bind="
                shouldDisplayDateSeparator(rowIndex)
                  ? bodyRowDateSeparatorCheckedAttrs
                  : bodyRowDateSeparatorAttrs
              "
            >
              <td v-bind="bodyCellDateSeparatorAttrs(rowIndex)" :colspan="colsCount">
                <UDivider
                  size="xs"
                  :label="getDateSeparatorLabel(row.date.separatorDate)"
                  v-bind="bodyDateSeparatorAttrs"
                />
              </td>
            </tr>

            <UTableRow
              v-model:selected-rows="selectedRows"
              :selectable="selectable"
              :data-test="`${dataTest}-row`"
              :row="row"
              :columns="columns"
              :config="config"
              :attrs="keysAttrs"
              v-bind="getRowAttrs(row.id)"
              :class="cx([getRowAttrs(row.id).class, row.class])"
              @click="onClickRow"
              @toggle-row-visibility="onToggleRowVisibility"
            >
              <template
                v-for="(value, key, index) in getFilteredRow(row, columns)"
                :key="index"
                #[`cell-${key}`]="slotValues"
              >
                <!--
                  @slot Use it to modify all cells with a specific key.
                  @binding {string} name
                  @binding {string} value
                  @binding {object} row
                -->
                <slot :name="`cell-${key}`" :value="slotValues.value" :row="slotValues.row" />
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
              <td :colspan="colsCount" v-bind="bodyRowAfterCellAttrs">
                <!-- @slot Use it to add something after last row. -->
                <slot name="after-last-row" />
              </td>
            </tr>
          </template>
        </tbody>

        <tbody v-else>
          <tr>
            <td :colspan="colsCount">
              <!-- @slot Use it to add custom empty state. -->
              <slot name="empty-state">
                <UEmpty
                  size="sm"
                  :description="currentLocale.noData"
                  :data-test="`${dataTest}-empty`"
                  v-bind="bodyEmptyStateAttrs"
                />
              </slot>
            </td>
          </tr>
        </tbody>

        <tfoot v-if="hasSlotContent($slots['footer'])" v-bind="footerAttrs">
          <tr ref="footerRowRef" v-bind="footerRowAttrs">
            <td v-if="selectable" />

            <!--
              @slot Use it to add something into the table footer.
              @binding {number} cols-count
            -->
            <slot name="footer" :cols-count="colsCount" />
          </tr>

          <tr ref="stickyFooterRowRef" :style="tableRowWidthStyle" v-bind="stickyFooterRowAttrs">
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

<script setup>
import {
  ref,
  computed,
  watch,
  toValue,
  useSlots,
  nextTick,
  onMounted,
  onUpdated,
  onBeforeUnmount,
} from "vue";
import { merge } from "lodash-es";

import UEmpty from "../ui.text-empty/UEmpty.vue";
import UDivider from "../ui.container-divider/UDivider.vue";
import UCheckbox from "../ui.form-checkbox/UCheckbox.vue";
import ULoaderProgress from "../ui.loader-progress/ULoaderProgress.vue";
import UTableRow from "./UTableRow.vue";

import { getDefault, cx } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import {
  normalizeColumns,
  getFilteredRow,
  syncRowCheck,
  toggleRowVisibility,
  switchRowCheck,
  getFlatRows,
} from "./utilTable.js";

import { PX_IN_REM } from "../constants.js";
import { UTable } from "./constants.js";
import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Table columns (headers).
   */
  columns: {
    type: Array,
    required: true,
  },

  /**
   * Table rows data.
   */
  rows: {
    type: Array,
    required: true,
  },

  /**
   * Show date divider line between dates.
   */
  dateDivider: {
    type: [Array, Boolean],
    default: getDefault(defaultConfig, UTable).dateDivider,
  },

  /**
   * Allow rows selecting.
   */
  selectable: {
    type: Boolean,
    default: getDefault(defaultConfig, UTable).selectable,
  },

  /**
   * Makes the table compact (fewer spacings).
   */
  compact: {
    type: Boolean,
    default: getDefault(defaultConfig, UTable).compact,
  },

  /**
   * Set header sticky.
   */
  stickyHeader: {
    type: Boolean,
    default: getDefault(defaultConfig, UTable).stickyHeader,
  },

  /**
   * Set footer sticky.
   */
  stickyFooter: {
    type: Boolean,
    default: getDefault(defaultConfig, UTable).stickyFooter,
  },

  /**
   * Set loader resource name to activate table progress loader exact for that resource (deprecated).
   */
  resource: {
    type: String,
    default: "",
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
   * Triggers when the row is clicked.
   * @property {object} row
   */
  "clickRow",

  /**
   * Triggers when table rows are selected (updated).
   * @property {array} tableRows
   */
  "update:rows",
]);

defineExpose({ clearSelectedItems });

const slots = useSlots();
const { tm } = useLocale();

const selectAll = ref(false);
const canSelectAll = ref(true);
const selectedRows = ref([]);
const tableRows = ref([]);
const firstRow = ref(0);
const tableWidth = ref(0);
const tableHeight = ref(0);
const pagePositionY = ref(0);

const headerRowRef = ref(null);
const footerRowRef = ref(null);
const tableWrapperRef = ref(null);
const stickyFooterRowRef = ref(null);
const stickyHeaderRowRef = ref(null);

const i18nGlobal = tm(UTable);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const sortedRows = computed(() => {
  const headerKeys = props.columns.map((column) => column.key);

  return tableRows.value.map((row) => {
    const rowEntries = Object.entries(row);

    const sortedEntries = new Array(rowEntries.length);

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

    return sortedRow;
  });
});

const isFooterSticky = computed(
  () =>
    window.innerHeight < tableHeight.value &&
    props.stickyFooter &&
    !isShownFooterPosition.value &&
    isCheckedMoreOneTableItems.value,
);

const normalizedColumns = computed(() => normalizeColumns(props.columns));

const colsCount = computed(() => {
  return props.columns.length + 1;
});

const lastRow = computed(() => {
  return props.rows.length - 1;
});

const isShownActionsHeader = computed(
  () => hasSlotContent(slots["header-actions"]) && Boolean(selectedRows.value.length),
);

const isHeaderSticky = computed(() => {
  const positionForFixHeader =
    headerRowRef.value?.getBoundingClientRect().top + window.scrollY || 0;

  return positionForFixHeader <= pagePositionY.value && props.stickyHeader;
});

const isShownFooterPosition = computed(() => {
  const pageBottom = pagePositionY.value + window.innerHeight;
  const positionForFixFooter = footerRowRef.value?.getBoundingClientRect().bottom + window.scrollY;

  return pageBottom >= positionForFixFooter;
});

const isCheckedMoreOneTableItems = computed(() => {
  return tableRows.value.filter((item) => item.isChecked).length > 1;
});

const tableRowWidthStyle = computed(() => ({ width: `${tableWidth.value / PX_IN_REM}rem` }));

const hasSlotContentBeforeFirstRow = computed(() => {
  return hasSlotContent(slots["before-first-row"])
    ? slots["before-first-row"]()?.some((item) => !!item.type?.render)
    : false;
});

const isSelectedAllRows = computed(() => {
  const rows = getFlatRows(tableRows.value);

  return selectedRows.value.length === rows.length;
});

const {
  config,
  keysAttrs,
  wrapperAttrs,
  stickyHeaderCellAttrs,
  stickyHeaderAttrs,
  tableWrapperAttrs,
  headerRowAttrs,
  bodyRowAfterAttrs,
  bodyRowAfterCellAttrs,
  bodyRowBeforeAttrs,
  bodyRowBeforeCellAttrs,
  bodyRowAttrs,
  bodyRowCheckedAttrs,
  footerAttrs,
  bodyRowDateSeparatorAttrs,
  bodyRowDateSeparatorCheckedAttrs,
  headerCellBaseAttrs,
  headerCellCheckboxAttrs,
  stickyHeaderActionsCheckboxAttrs,
  stickyHeaderCheckboxAttrs,
  headerCheckboxAttrs,
  headerCounterAttrs,
  bodyEmptyStateAttrs,
  bodyDateSeparatorAttrs,
  bodyCellDateSeparatorAttrs,
  stickyHeaderActionsCounterAttrs,
  stickyHeaderCounterAttrs,
  stickyHeaderLoaderAttrs,
  tableAttrs,
  headerLoaderAttrs,
  bodyAttrs,
  footerRowAttrs,
  stickyFooterRowAttrs,
  hasSlotContent,
  headerAttrs,
} = useAttrs(props, {
  tableRows,
  isShownActionsHeader,
  isHeaderSticky,
  isFooterSticky,
});

watch(selectAll, onChangeSelectAll, { deep: true });
watch(selectedRows, onChangeSelectedRows, { deep: true });
watch(tableRows, () => emit("update:rows", toValue(tableRows)), { deep: true });
watch(() => tableRows.value.length, updateSelectedRows);
watch(() => props.rows, synchronizeTableItemsWithProps, { deep: true });
watch(isHeaderSticky, setHeaderCellWidth);
watch(isFooterSticky, (newValue) =>
  newValue ? nextTick(setFooterCellWidth) : setFooterCellWidth(null),
);
watch(
  () => selectedRows.value.length,
  () => {
    tableRows.value = tableRows.value.map((row) => syncRowCheck(row, selectedRows.value));
  },
);

onMounted(() => {
  tableRows.value = props.rows;

  document.addEventListener("keyup", onKeyupEsc);
  document.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onWindowResize);
});

onUpdated(() => {
  tableHeight.value = tableWrapperRef.value?.offsetHeight;
  tableWidth.value = tableWrapperRef.value?.offsetWidth;
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

function getDateSeparatorLabel(separatorDate) {
  return Array.isArray(props.dateDivider)
    ? props.dateDivider.find((dateItem) => dateItem.date === separatorDate)?.label || separatorDate
    : separatorDate;
}

function shouldDisplayDateSeparator(rowIndex) {
  const isPreviousRowChecked = tableRows.value[rowIndex - 1]?.isChecked;
  const isCheckedRowAfter = tableRows.value[rowIndex]?.isChecked;
  const isFirstRowAndNextChecked = rowIndex === 0 && isCheckedRowAfter;

  return (isPreviousRowChecked && isCheckedRowAfter) || isFirstRowAndNextChecked;
}

function getRowAttrs(rowId) {
  return selectedRows.value.includes(rowId) ? bodyRowCheckedAttrs : bodyRowAttrs;
}

function setFooterCellWidth(width) {
  const ZERO_WIDTH = 0;

  if (!props.stickyFooter) return;

  const mainFooterItems = [...footerRowRef.value.children];
  const stickyFooterItems = [...stickyFooterRowRef.value.children];

  stickyFooterItems.forEach((item, index) => {
    item.style.width =
      width === null ? `${ZERO_WIDTH}rem` : `${mainFooterItems[index].offsetWidth / PX_IN_REM}rem`;
  });
}

function setHeaderCellWidth() {
  if (selectedRows.value.length) return;

  const mainHeaderItems = [...(headerRowRef.value?.children || [])];
  const stickyHeaderItems = [...(stickyHeaderRowRef.value?.children || [])];

  stickyHeaderItems.forEach((item, index) => {
    item.style.width = `${mainHeaderItems[index]?.offsetWidth / PX_IN_REM}rem`;
  });
}

function onScroll() {
  pagePositionY.value = window.scrollY;
}

function synchronizeTableItemsWithProps() {
  if (!props.rows.length || props.rows.length !== tableRows.value.length) {
    selectedRows.value = [];
  }

  tableRows.value = props.rows;
}

function updateSelectedRows() {
  selectedRows.value = tableRows.value.filter((row) => row.isChecked).map((row) => row.id);
}

function onKeyupEsc(event) {
  const escKeyCode = 27;

  if (event.keyCode === escKeyCode && props.selectable) {
    selectedRows.value = [];
  }
}

function isShownDateSeparator(rowIndex) {
  const prevIndex = rowIndex ? rowIndex - 1 : rowIndex;
  const nextIndex = rowIndex ? rowIndex + 1 : rowIndex;
  const prevItem = tableRows.value[prevIndex];
  const nextItem = tableRows.value[nextIndex];
  const currentItem = tableRows.value[rowIndex];

  if (rowIndex === 0) {
    return hasSlotContentBeforeFirstRow.value;
  }

  const isPrevSameDate = prevItem?.date?.primary === currentItem?.date?.primary;
  const isNextSameDate = nextItem?.date?.primary === currentItem?.date?.primary;

  return isPrevSameDate && !isNextSameDate && props.dateDivider;
}

function onClickRow(row) {
  emit("clickRow", row);
}

function onChangeSelectAll(selectAll) {
  if (selectAll && canSelectAll.value) {
    selectedRows.value = getFlatRows(tableRows.value).map((row) => row.id);

    tableRows.value.forEach((row) => switchRowCheck(row, true));
  } else if (!selectAll) {
    selectedRows.value = [];

    tableRows.value.forEach((row) => switchRowCheck(row, false));
  }

  canSelectAll.value = true;
}

function onChangeSelectedRows(selectedRows) {
  if (selectedRows.length) {
    canSelectAll.value = false;

    isCheckedMoreOneTableItems.value ? setFooterCellWidth() : "";
  } else {
    nextTick(setHeaderCellWidth);
  }

  selectAll.value = !!selectedRows.length;
}

function clearSelectedItems() {
  selectedRows.value = [];
}

function onToggleRowVisibility(rowId) {
  tableRows.value.forEach((row) => toggleRowVisibility(row, rowId));
}
</script>
