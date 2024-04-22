<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <div
      v-show="isShownStickyOrActionsHeader"
      ref="headerStickyRow"
      :style="tableRowWidthStyle"
      v-bind="customHeaderAttrs"
    >
      <UCheckbox
        v-if="selectable"
        v-model="selectAll"
        size="sm"
        :partial="!isSelectedAllRows"
        :data-cy="`${dataCy}-select-all`"
        v-bind="selectAllCheckboxAttrs"
      />

      <template v-if="selectedRows.length">
        <div v-bind="selectedRowsCountAttrs" v-text="selectedRows.length" />

        <!-- @slot Use it to add actions instead table head (it appears when you select rows in table). -->
        <slot name="thead-actions" :selected-rows="selectedRows" />
      </template>

      <template v-else>
        <div
          v-for="(column, index) in columns"
          :key="index"
          v-bind="customHeaderItemAttrs(column.thClass)"
        >
          <template v-if="hasSlotContent($slots[`thead-${column.key}`])">
            <!-- @slot Use it to customise table column. -->
            <slot :name="`thead-${column.key}`" :label="column.label" />
          </template>

          <template v-else>
            {{ column.label }}
          </template>

          <!-- @slot Use it to add content after table column. -->
          <slot :name="`thead-${column.key}-after`" />
        </div>
      </template>

      <!-- TODO: Change to loaders config after laoader refactoring -->
      <ULoaderTop
        v-if="resource && isHeaderSticky"
        :resource-names="resource"
        position="absolute"
        v-bind="headerStickyLoaderAttrs"
      />
    </div>

    <div ref="tableWrapper" v-bind="tableWrapperAttrs">
      <table v-bind="tableAttrs">
        <thead v-bind="headerAttrs" :style="tableRowWidthStyle">
          <tr v-if="hasSlotContent($slots['before-header-row'])" v-bind="headerRowAttrs">
            <slot name="before-header-row" />
          </tr>

          <tr ref="headerRow" v-bind="headerRowCellAttrs">
            <th v-if="selectable" v-bind="headerCellAttrs(config.headerCheckboxWrapper)">
              <UCheckbox
                v-model="selectAll"
                size="sm"
                :partial="!isSelectedAllRows"
                :data-cy="`${dataCy}-select-all`"
                v-bind="headerSelectAllCheckboxAttrs"
              />
            </th>

            <th
              v-for="(column, index) in normalizedColumns"
              :key="index"
              v-bind="headerCellAttrs(column.thClass)"
            >
              <template v-if="hasSlotContent($slots[`thead-${column.key}`])">
                <!-- @slot Use it to customise table column. -->
                <slot :name="`thead-${column.key}`" :label="column.label" />
              </template>

              <template v-else>
                {{ column.label }}
              </template>

              <!-- @slot Use it to add content after table column. -->
              <slot :name="`thead-${column.key}-after`" />
            </th>
          </tr>

          <!-- TODO: Change to loaders config after laoader refactoring -->
          <ULoaderTop
            v-if="resource"
            :resource-names="resource"
            position="absolute"
            v-bind="tableLoaderAttrs"
          />
        </thead>

        <tbody v-if="tableRows.length" v-bind="bodyAttrs">
          <template v-for="(row, rowIndex) in tableRows" :key="row.id">
            <tr v-if="rowIndex === firstRow" v-bind="beforeFirstRowAttrs">
              <UTableCell
                v-if="hasSlotContent($slots['before-first-row'])"
                :colspan="colsCount"
                :compact="compact"
                v-bind="beforeFirstRowCellAttrs"
              >
                <!-- @slot Use it to add something before first row. -->
                <slot name="before-first-row" />
              </UTableCell>

              <td v-else :colspan="colsCount" v-bind="beforeFirstRowCellAttrs" />
            </tr>

            <tr
              v-if="isShownDateSeparator(rowIndex) && row.date"
              v-bind="dateSeparatorRowAttrs(rowIndex)"
            >
              <td :colspan="colsCount">
                <UDivider
                  size="xs"
                  :label="getDateSeparatorLabel(row.date.separatorDate)"
                  v-bind="dateSeparatorAttrs"
                />
              </td>
            </tr>

            <tr
              v-if="!isShownRow(row)"
              v-bind="bodyRowAttrs(rowClass(row))"
              :data-cy="`${dataCy}-row`"
              @click="onClickRow(row)"
            >
              <td v-if="selectable" :data-id="row.id" v-bind="checkboxBodyWrapperCellAttrs">
                <UCheckbox
                  v-model="selectedRows"
                  :value="row.id"
                  size="sm"
                  :data-cy="`${dataCy}-table-body-checkbox`"
                  v-bind="tableCheckboxAttrs"
                  @click.stop
                />
              </td>

              <UTableCell
                v-for="(value, key, index) in TableService.getFilteredRow(row, columns)"
                :key="index"
                :compact="compact"
                v-bind="bodyCellAttrs(getTdClass(key))"
              >
                <template v-if="Boolean($slots[`cell-${key}`])">
                  <div
                    :style="setLeftMargin(row.nestedLevel)"
                    v-bind="toggleButtonWrapperAttrs(index)"
                    @click="onClickShowItem(row)"
                  >
                    <div v-if="isShownIcon({ index, row })" v-bind="toggleItemButtonAttrs">
                      <UIcon
                        v-if="row.isHidden"
                        :name="config.expandIconName"
                        interactive
                        size="xs"
                        :color="isIconActive(row)"
                        v-bind="expandIconAttrs"
                      />

                      <UIcon
                        v-else
                        :name="config.collapseIconName"
                        interactive
                        size="xs"
                        v-bind="collapseIconAttrs"
                      />
                    </div>
                    <!-- @slot Use it to customise table cell item (in whole column). -->
                    <slot :name="`cell-${key}`" :value="value" :row="row" />
                  </div>
                </template>

                <template v-else-if="Boolean($slots['cell-other'])">
                  <slot name="cell-other" :value="value" :row="row" />
                </template>

                <template v-else-if="value.hasOwnProperty('secondaryRow')">
                  <div :data-cy="`${dataCy}-${key}-cell`">
                    {{ value.primaryRow || HYPHEN_SYMBOL }}
                  </div>

                  <div v-bind="secondaryRowAttrs">
                    <template v-if="Array.isArray(value.secondaryRow)">
                      <div v-for="(secondaryRow, idx) in value.secondaryRow" :key="idx">
                        <span v-bind="secondaryRowEmptyAttrs">
                          {{ secondaryRow }}
                        </span>
                      </div>
                    </template>

                    <template v-else>
                      {{ value.secondaryRow }}
                    </template>
                  </div>
                </template>

                <template v-else>
                  <div :data-cy="`${dataCy}-${key}-cell`">
                    {{ value || HYPHEN_SYMBOL }}
                  </div>
                </template>
              </UTableCell>
            </tr>

            <tr v-if="rowIndex === lastRow" v-bind="afterLastRowAttrs">
              <UTableCell
                v-if="hasSlotContent(slots['after-last-row'])"
                :compact="compact"
                :colspan="colsCount"
                v-bind="afterLastRowCellAttrs"
              >
                <!-- @slot Use it to add something after last row. -->
                <slot name="after-last-row" />
              </UTableCell>

              <td v-else :colspan="colsCount" v-bind="afterLastRowCellAttrs" />
            </tr>
          </template>
        </tbody>

        <tbody v-else>
          <tr>
            <td :colspan="colsCount">
              <slot name="empty-table-msg">
                <UEmpty
                  size="sm"
                  :description="emptyTableMsg"
                  :data-cy="`${dataCy}-empty`"
                  v-bind="emptyAttrs"
                />
              </slot>
            </td>
          </tr>
        </tbody>

        <tfoot v-if="hasSlotContent($slots['tfoot'])" v-bind="footerClassesAttrs">
          <tr ref="footerRow" v-bind="footerRowAttrs">
            <UTableCell v-if="selectable" :compact="compact" v-bind="footerCellAttrs" />

            <!-- @slot Use it to add something in table footer. -->
            <slot name="tfoot" :cols-count="colsCount" />
          </tr>

          <tr ref="footerStickyRow" :style="tableRowWidthStyle" v-bind="footerStickyRowAttrs">
            <UTableCell v-if="selectable" :compact="compact" v-bind="footerCellAttrs" />

            <!-- @slot Use it to add something in table footer. -->
            <slot name="tfoot" :cols-count="colsCount" />
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
  useSlots,
  onMounted,
  onUpdated,
  nextTick,
  onBeforeUnmount,
} from "vue";

import UIcon from "../ui.image-icon";
import UEmpty from "../ui.text-empty";
import UDivider from "../ui.container-divider";
import UCheckbox from "../ui.form-checkbox";
import ULoaderTop from "../ui.other-loader-top";
import UTableCell from "../ui.data-table-cell";

import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import TableService from "./services/table.service";

import { HYPHEN_SYMBOL, PX_IN_REM } from "../service.ui";
import { UTable } from "./constants";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UTable", inheritAttrs: false });

const props = defineProps({
  /**
   * Table columns.
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
   * Show/hide date divider or set label for specific date.
   */
  dateDivider: {
    type: [Array, Boolean],
    default: false,
  },

  /**
   * Enable selecting table rows.
   */
  selectable: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTable).default.selectable,
  },

  /**
   * Makes the table compact (fewer spacings).
   */
  compact: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTable).default.compact,
  },

  /**
   * Set header sticky.
   */
  stickyHeader: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTable).default.stickyHeader,
  },

  /**
   * Set footer sticky.
   */
  stickyFooter: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTable).default.stickyFooter,
  },

  /**
   * Enable nesting rows.
   */
  nesting: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTable).default.nesting,
  },

  /**
   * Sets the nesting level from which folding button need to be shown.
   */
  nestingFrom: {
    type: Number,
    default: UIService.get(defaultConfig, UTable).default.nestingFrom,
  },

  /**
   * Indicate if filters applied.
   */
  filters: {
    type: Boolean,
    default: false,
  },

  /**
   * Set loader resource name to activate table top loader exact for that resource.
   */
  resource: {
    type: String,
    default: "",
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["clickRow", "update:rows"]);

defineExpose({ clearSelectedItems });

const slots = useSlots();

const selectAll = ref(false);
const canSelectAll = ref(true);
const selectedRows = ref([]);
const tableRows = ref([]);
const hiddenIds = ref([]);
const firstRow = ref(0);
const tableWidth = ref(0);
const tableHeight = ref(0);
const pagePositionY = ref(0);

const headerRow = ref(null);
const footerRow = ref(null);
const tableWrapper = ref(null);
const footerStickyRow = ref(null);
const headerStickyRow = ref(null);

const isHeaderSticky = computed(() => {
  return !isShownHeaderPosition.value;
});

const isFooterSticky = computed(
  () =>
    window.innerHeight < tableHeight.value &&
    props.stickyFooter &&
    !isShownFooterPosition.value &&
    isCheckedMoreOneTableItems.value,
);

const {
  config,
  wrapperAttrs,
  customHeaderItemAttrs,
  customHeaderAttrs,
  tableWrapperAttrs,
  headerRowCellAttrs,
  afterLastRowAttrs,
  afterLastRowCellAttrs,
  beforeFirstRowAttrs,
  beforeFirstRowCellAttrs,
  bodyRowAttrs,
  footerClassesAttrs,
  dateSeparatorRowAttrs,
  toggleButtonWrapperAttrs,
  headerCellAttrs,
  bodyCellAttrs,
  checkboxBodyWrapperCellAttrs,
  footerCellAttrs,
  selectAllCheckboxAttrs,
  headerSelectAllCheckboxAttrs,
  tableCheckboxAttrs,
  collapseIconAttrs,
  expandIconAttrs,
  emptyAttrs,
  dateSeparatorAttrs,
  selectedRowsCountAttrs,
  headerStickyLoaderAttrs,
  tableAttrs,
  headerRowAttrs,
  tableLoaderAttrs,
  bodyAttrs,
  toggleItemButtonAttrs,
  secondaryRowAttrs,
  secondaryRowEmptyAttrs,
  footerRowAttrs,
  footerStickyRowAttrs,
  hasSlotContent,
  headerAttrs,
} = useAttrs(props, { selectedRows, isHeaderSticky, tableRows, isFooterSticky });

const normalizedColumns = computed(() => TableService.normalizeColumns(props.columns));

const isSelectedAllRows = computed(() => {
  return selectedRows.value.length === tableRows.value.length;
});

const colsCount = computed(() => {
  return props.columns.length + 1;
});

const lastRow = computed(() => {
  return props.rows.length - 1;
});

const isShownStickyOrActionsHeader = computed(() => {
  return isHeaderSticky.value || selectedRows.value.length;
});

const isShownHeaderPosition = computed(() => {
  const positionForFixHeader = headerRow.value?.getBoundingClientRect().top + window.scrollY || 0;

  return positionForFixHeader >= pagePositionY.value;
});

const isShownFooterPosition = computed(() => {
  const pageBottom = pagePositionY.value + window.innerHeight;
  const positionForFixFooter = footerRow.value?.getBoundingClientRect().bottom + window.scrollY;

  return pageBottom >= positionForFixFooter;
});

const isCheckedMoreOneTableItems = computed(() => {
  return tableRows.value.filter((item) => item.isChecked).length > 1;
});

const tableRowWidthStyle = computed(() => ({ width: `${tableWidth.value / PX_IN_REM}rem` }));

const hasContentBeforeFirstRowSlot = computed(() => {
  return hasSlotContent(slots["before-first-row"])
    ? slots["before-first-row"]()?.some((item) => !!item.type?.render)
    : false;
});

const emptyTableMsg = computed(() => {
  return props.filters ? config.value.i18n.noResultsForFilters : config.value.i18n.noItems;
});

watch(selectAll, onChangeSelectAll, { deep: true });
watch(selectedRows, onChangeSelectedRows, { deep: true });
watch(tableRows, () => emit("update:rows", tableRows), { deep: true });
watch(() => tableRows.value.length, updateSelectedRows);
watch(() => props.rows, synchronizeTableItemsWithProps, { deep: true });
watch(isHeaderSticky, setHeaderItemsWidth);
watch(isFooterSticky, (newValue) =>
  newValue ? nextTick(setFooterItemsWidth) : setFooterItemsWidth(true),
);
watch(
  () => selectedRows.value.length,
  () => {
    tableRows.value = tableRows.value.map((row) => {
      row.isChecked = selectedRows.value.includes(row.id);

      return row;
    });
  },
);

tableRows.value = props.rows;

onMounted(() => {
  document.addEventListener("keyup", onKeyupClearCheckbox);
  document.addEventListener("scroll", onScrollGetPosition, { passive: true });
  window.addEventListener("resize", onWindowResizeSetWidth);
});

onUpdated(() => {
  tableHeight.value = tableWrapper.value?.offsetHeight;
  tableWidth.value = tableWrapper.value?.offsetWidth;
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyupClearCheckbox);
  document.removeEventListener("scroll", onScrollGetPosition);
  window.removeEventListener("resize", onWindowResizeSetWidth);
});

function onWindowResizeSetWidth() {
  tableWidth.value = tableWrapper.value.offsetWidth;

  setHeaderItemsWidth();
  setFooterItemsWidth();
}

function isShownIcon({ index, row }) {
  const isChildren = row.childrenIds?.length > 0;
  const isWithinNestingLevel = row.nestedLevel >= props.nestingFrom;

  const isFirstRow = index === 0;

  return isFirstRow && (isChildren || row.isNestingRow) && props.nesting && isWithinNestingLevel;
}

function isIconActive(row) {
  return !row.childrenIds?.length ? "grayscale" : "";
}

function onClickShowItem(row) {
  if (!props.nesting || !row.childrenIds.length) return;
  const [firstElement] = row.childrenIds;

  row.isHidden = !row.isHidden;

  if (row.isHidden && row.childrenIds.length) {
    hiddenIds.value.push(...row.childrenIds);
  } else {
    hiddenIds.value =
      row.nestedLevel === props.nestingFromLevel
        ? row.childrenIds.filter((item) => !hiddenIds.value.includes(item))
        : hiddenIds.value.filter((item) => item !== firstElement);
  }
}

function getDateSeparatorLabel(separatorDate) {
  return Array.isArray(props.dateDivider)
    ? props.dateDivider.find((dateItem) => dateItem.date === separatorDate)?.label || separatorDate
    : separatorDate;
}

function setLeftMargin(nestedLevel) {
  return { marginLeft: `${nestedLevel * 1.5}rem` };
}

function isShownRow(row) {
  if (hiddenIds.value.includes(row.id)) {
    row.isHidden = true;
  }

  return hiddenIds.value.includes(row.id);
}

function setFooterItemsWidth(setNullWidth) {
  const ZERO_WIDTH = 0;

  if (!props.stickyFooter) return;

  const mainFooterItems = [...footerRow.value.children];
  const stickyFooterItems = [...footerStickyRow.value.children];

  stickyFooterItems.forEach((item, index) => {
    item.style.width = setNullWidth
      ? `${ZERO_WIDTH}rem`
      : `${mainFooterItems[index].offsetWidth / PX_IN_REM}rem`;
  });
}

function setHeaderItemsWidth() {
  if (selectedRows.value.length) return;

  const mainHeaderItems = [...(headerRow.value?.children || [])];
  const stickyHeaderItems = [...(headerStickyRow.value?.children || [])];

  stickyHeaderItems.forEach((item, index) => {
    item.style.width = `${mainHeaderItems[index]?.offsetWidth / PX_IN_REM}rem`;
  });
}

function onScrollGetPosition() {
  pagePositionY.value = window.scrollY;
}

function onKeyupClearCheckbox(event) {
  const escKeyCode = 27;

  if (event.keyCode === escKeyCode && props.selectable) {
    selectedRows.value = [];
  }
}

function synchronizeTableItemsWithProps() {
  if (!props.rows.length || props.rows.length !== tableRows.value.length) {
    selectedRows.value = [];
  }

  tableRows.value = props.rows;

  tableRows.value.forEach((item) => {
    if (props.nesting && item.isHidden && item.childrenIds?.length) {
      hiddenIds.value.push(...item.childrenIds);
    }
  });
}

function updateSelectedRows() {
  selectedRows.value = tableRows.value.filter((row) => row.isChecked).map((row) => row.id);
}

function isShownDateSeparator(rowIndex) {
  const prevIndex = rowIndex ? rowIndex - 1 : rowIndex;
  const nextIndex = rowIndex ? rowIndex + 1 : rowIndex;
  const prevItem = tableRows.value[prevIndex];
  const nextItem = tableRows.value[nextIndex];
  const currentItem = tableRows.value[rowIndex];

  if (rowIndex === 0) {
    return hasContentBeforeFirstRowSlot.value;
  }

  const isPrevSameDate = prevItem?.date?.primaryRow === currentItem?.date?.primaryRow;
  const isNextSameDate = nextItem?.date?.primaryRow === currentItem?.date?.primaryRow;

  return isPrevSameDate && !isNextSameDate && props.dateDivider;
}

function rowClass(row) {
  return selectedRows.value.includes(row.id) ? config.value.checkedRow : "";
}

function onClickRow(row) {
  emit("clickRow", row);
}

function getTdClass(key) {
  return props.columns.find((column) => column.key === key)?.tdClass;
}

function onChangeSelectAll(selectAll) {
  if (selectAll && canSelectAll.value) {
    selectedRows.value = tableRows.value.map((item) => item.id);

    tableRows.value.forEach((item) => (item.isChecked = true));
  } else if (!selectAll) {
    selectedRows.value = [];

    tableRows.value.forEach((item) => (item.isChecked = false));
  }

  canSelectAll.value = true;
}

function onChangeSelectedRows(selectedRows) {
  if (selectedRows.length) {
    canSelectAll.value = false;

    isCheckedMoreOneTableItems.value ? setFooterItemsWidth() : "";
  } else {
    nextTick(setHeaderItemsWidth);
  }

  selectAll.value = !!selectedRows.length;
}

function clearSelectedItems() {
  selectedRows.value = [];
}
</script>
