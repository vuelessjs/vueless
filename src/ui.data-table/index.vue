<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <div
      v-show="isHeaderSticky || isShownActionsHeader"
      ref="stickyHeaderRowRef"
      :style="tableRowWidthStyle"
      v-bind="stickyHeaderAttrs"
    >
      <template v-if="isShownActionsHeader">
        <div v-bind="stickyHeaderCellAttrs()">
          <UCheckbox
            v-if="selectable"
            v-model="selectAll"
            size="sm"
            :partial="!isSelectedAllRows"
            :data-cy="`${dataCy}-select-all`"
            v-bind="stickyHeaderActionsCheckboxAttrs"
          />
        </div>

        <div
          v-if="selectedRows.length"
          v-bind="stickyHeaderActionsCounterAttrs"
          v-text="selectedRows.length"
        />

        <!-- @slot Use it to add action buttons instead of table row when some rows are selected. -->
        <slot name="header-actions" :selected-rows="selectedRows" />
      </template>

      <template v-else>
        <div v-bind="stickyHeaderCellAttrs()">
          <UCheckbox
            v-if="selectable"
            v-model="selectAll"
            size="sm"
            :partial="!isSelectedAllRows"
            :data-cy="`${dataCy}-select-all`"
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
          v-bind="stickyHeaderCellAttrs(column.thClass)"
        >
          <template v-if="hasSlotContent($slots[`header-${column.key}`])">
            <!-- @slot Use it to customise table column. -->
            <slot :name="`header-${column.key}`" :column="column" />
          </template>

          <template v-else>
            {{ column.label }}
          </template>

          <!-- @slot Use it to add content after table column. -->
          <slot :name="`header-${column.key}-after`" :column="column" />
        </div>
      </template>

      <ULoaderTop
        v-if="resource && isHeaderSticky"
        :resource-names="resource"
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
              v-bind="headerCellAttrs()"
            >
              <!-- @slot Use it to add something before header row. -->
              <slot name="before-header" :cols-count="colsCount" />
            </td>
          </tr>

          <tr v-if="hasSlotContent($slots['before-header'])" v-bind="headerRowAttrs"></tr>

          <tr ref="headerRowRef" v-bind="headerRowAttrs">
            <th v-if="selectable" v-bind="headerCellAttrs(config.headerCellCheckbox)">
              <UCheckbox
                v-model="selectAll"
                size="sm"
                :partial="!isSelectedAllRows"
                :data-cy="`${dataCy}-select-all`"
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
              v-bind="headerCellAttrs(column.thClass)"
            >
              <!-- @slot Use it to customise table column. -->
              <slot
                v-if="hasSlotContent($slots[`header-${column.key}`])"
                :name="`header-${column.key}`"
                :column="column"
              />

              <template v-else>
                {{ column.label }}
              </template>

              <!-- @slot Use it to add content after table column. -->
              <slot :name="`header-${column.key}-after`" :column="column" />
            </th>
          </tr>

          <ULoaderTop v-if="resource" :resource-names="resource" v-bind="headerLoaderAttrs" />
        </thead>

        <tbody v-if="tableRows.length" v-bind="bodyAttrs">
          <template v-for="(row, rowIndex) in tableRows" :key="row.id">
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
              v-bind="bodyRowDateSeparatorAttrs(rowIndex)"
            >
              <td v-bind="bodyCellDateSeparatorAttrs(rowIndex)" :colspan="colsCount">
                <UDivider
                  size="xs"
                  :label="getDateSeparatorLabel(row.date.separatorDate)"
                  v-bind="bodyDateSeparatorAttrs"
                />
              </td>
            </tr>

            <tr
              v-if="!isShownRow(row)"
              v-bind="bodyRowAttrs(getRowClasses(row))"
              :data-cy="`${dataCy}-row`"
              @click="onClickRow(row)"
            >
              <td v-if="selectable" v-bind="bodyCellAttrs(config.bodyCellCheckbox)">
                <UCheckbox
                  v-model="selectedRows"
                  :data-id="row.id"
                  :value="row.id"
                  size="sm"
                  :data-cy="`${dataCy}-body-checkbox`"
                  v-bind="bodyCheckboxAttrs"
                  @click.stop
                />
              </td>

              <td
                v-for="(value, key, index) in TableService.getFilteredRow(row, columns)"
                :key="index"
                v-bind="bodyCellAttrs(getCellClasses(key))"
              >
                <template v-if="hasSlotContent($slots[`cell-${key}`])">
                  <div
                    v-if="isNesting"
                    :style="getNestedShift(row.nestedLevel)"
                    v-bind="bodyCellNestedWrapperAttrs(index)"
                    @click="onClickNestedWrapper(row)"
                  >
                    <div v-if="isShownNestedIcon({ index, row })" v-bind="bodyCellNestedAttrs">
                      <UIcon
                        v-if="row.isHidden"
                        size="xs"
                        internal
                        interactive
                        :name="config.bodyCellNestedExpandIconName"
                        :color="isActiveNestedIcon(row)"
                        v-bind="bodyCellNestedExpandIconAttrs"
                      />

                      <UIcon
                        v-else
                        size="xs"
                        internal
                        interactive
                        :name="config.bodyCellNestedCollapseIconName"
                        v-bind="bodyCellNestedCollapseIconAttrs"
                      />
                    </div>
                  </div>

                  <!-- @slot Use it to customise table cell item (in whole column). -->
                  <slot :name="`cell-${key}`" :value="value" :row="row" />
                </template>

                <template v-else-if="value?.hasOwnProperty('secondary')">
                  <div :data-cy="`${dataCy}-${key}-cell`">
                    {{ value.primary || HYPHEN_SYMBOL }}
                  </div>

                  <div v-bind="bodyCellSecondaryAttrs">
                    <template v-if="Array.isArray(value.secondary)">
                      <div v-for="(secondary, idx) in value.secondary" :key="idx">
                        <span v-bind="bodyCellSecondaryEmptyAttrs">
                          {{ secondary }}
                        </span>
                      </div>
                    </template>

                    <template v-else>
                      {{ value.secondary }}
                    </template>
                  </div>
                </template>

                <template v-else>
                  <div :data-cy="`${dataCy}-${key}-cell`">
                    {{ value || HYPHEN_SYMBOL }}
                  </div>
                </template>
              </td>
            </tr>

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
                  :data-cy="`${dataCy}-empty`"
                  v-bind="bodyEmptyStateAttrs"
                />
              </slot>
            </td>
          </tr>
        </tbody>

        <tfoot v-if="hasSlotContent($slots['footer'])" v-bind="footerClassesAttrs">
          <tr ref="footerRowRef" v-bind="footerRowAttrs">
            <td v-if="selectable" />

            <!-- @slot Use it to add something in table footer. -->
            <slot name="footer" :cols-count="colsCount" />
          </tr>

          <tr ref="stickyFooterRowRef" :style="tableRowWidthStyle" v-bind="stickyFooterRowAttrs">
            <td v-if="selectable" />

            <!-- @slot Use it to add something in table footer. -->
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

import UIcon from "../ui.image-icon";
import UEmpty from "../ui.text-empty";
import UDivider from "../ui.container-divider";
import UCheckbox from "../ui.form-checkbox";
import ULoaderTop from "../ui.loader-top";

import UIService from "../service.ui";

import defaultConfig from "./configs/default.config";
import TableService from "./services/table.service";

import { HYPHEN_SYMBOL, PX_IN_REM } from "../service.ui";
import { UTable } from "./constants";
import { useAttrs } from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

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
   * Show date divider label.
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
   * Sets the nesting level from which folding button need to be shown.
   */
  nesting: {
    type: [Number, Boolean],
    default: UIService.get(defaultConfig, UTable).default.nesting,
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
const { tm } = useLocale();

const selectAll = ref(false);
const canSelectAll = ref(true);
const selectedRows = ref([]);
const tableRows = ref([]);
const hiddenIds = ref([]);
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

const isFooterSticky = computed(
  () =>
    window.innerHeight < tableHeight.value &&
    props.stickyFooter &&
    !isShownFooterPosition.value &&
    isCheckedMoreOneTableItems.value,
);

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

const isShownActionsHeader = computed(
  () => hasSlotContent(slots["header-actions"]) && selectedRows.value.length,
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

const isNesting = computed(() => {
  return Boolean(props.nesting) || props.nesting === 0;
});

const {
  config,
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
  footerClassesAttrs,
  bodyRowDateSeparatorAttrs,
  bodyCellNestedWrapperAttrs,
  headerCellAttrs,
  bodyCellAttrs,
  stickyHeaderActionsCheckboxAttrs,
  stickyHeaderCheckboxAttrs,
  headerCheckboxAttrs,
  headerCounterAttrs,
  bodyCheckboxAttrs,
  bodyCellNestedCollapseIconAttrs,
  bodyCellNestedExpandIconAttrs,
  bodyEmptyStateAttrs,
  bodyDateSeparatorAttrs,
  bodyCellDateSeparatorAttrs,
  stickyHeaderActionsCounterAttrs,
  stickyHeaderCounterAttrs,
  stickyHeaderLoaderAttrs,
  tableAttrs,
  headerLoaderAttrs,
  bodyAttrs,
  bodyCellNestedAttrs,
  bodyCellSecondaryAttrs,
  bodyCellSecondaryEmptyAttrs,
  footerRowAttrs,
  stickyFooterRowAttrs,
  hasSlotContent,
  headerAttrs,
} = useAttrs(props, {
  tableRows,
  isNesting,
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
    tableRows.value = tableRows.value.map((row) => {
      row.isChecked = selectedRows.value.includes(row.id);

      return row;
    });
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

function isShownNestedIcon({ index, row }) {
  const nestedLevel = props.nesting === true ? 0 : Number(props.nesting);
  const isWithinNestingLevel = row.nestedLevel >= nestedLevel;
  const isChildren = row.childrenIds?.length > 0;

  const isFirstRow = index === 0;

  return isFirstRow && (isChildren || row.isNestingRow) && isNesting.value && isWithinNestingLevel;
}

function isActiveNestedIcon(row) {
  return !row.childrenIds?.length ? "grayscale" : "";
}

function onClickNestedWrapper(row) {
  if (!isNesting.value || !row.childrenIds.length) return;
  const [firstElement] = row.childrenIds;

  row.isHidden = !row.isHidden;

  if (row.isHidden && row.childrenIds.length) {
    hiddenIds.value.push(...row.childrenIds);
  } else {
    const nestedLevel = props.nesting === true ? 0 : Number(props.nesting);

    hiddenIds.value =
      row.nestedLevel === nestedLevel
        ? row.childrenIds.filter((item) => !hiddenIds.value.includes(item))
        : hiddenIds.value.filter((item) => item !== firstElement);
  }
}

function getNestedShift(nestedLevel) {
  return { marginLeft: `${nestedLevel * 1.5}rem` };
}

function getDateSeparatorLabel(separatorDate) {
  return Array.isArray(props.dateDivider)
    ? props.dateDivider.find((dateItem) => dateItem.date === separatorDate)?.label || separatorDate
    : separatorDate;
}

function isShownRow(row) {
  if (hiddenIds.value.includes(row.id)) {
    row.isHidden = true;
  }

  return hiddenIds.value.includes(row.id);
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

  tableRows.value.forEach((item) => {
    if (isNesting.value && item.isHidden && item.childrenIds?.length) {
      hiddenIds.value.push(...item.childrenIds);
    }
  });
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

function getRowClasses(row) {
  return selectedRows.value.includes(row.id) ? config.value.bodyRowChecked : "";
}

function getCellClasses(key) {
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

    isCheckedMoreOneTableItems.value ? setFooterCellWidth() : "";
  } else {
    nextTick(setHeaderCellWidth);
  }

  selectAll.value = !!selectedRows.length;
}

function clearSelectedItems() {
  selectedRows.value = [];
}
</script>
