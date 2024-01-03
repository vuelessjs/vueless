<template>
  <div class="mono-table-wrapper" :data-cy="dataCy">
    <div
      v-show="isShownFixedOrActionsHeader"
      ref="headerFixedRow"
      class="mono-table-custom-header"
      :class="[headerClasses.actionsHeader, headerClasses.fixedHeader, headerClasses.compact]"
      :style="tableRowWidthStyle"
    >
      <UCheckbox
        v-if="selectable"
        v-model="selectAll"
        :partial="!isSelectedAllRows"
        class="mono-table-custom-header-item"
        size="sm"
      />

      <template v-if="selectedRowsLength">
        <div class="selected-rows-count">
          {{ selectedRowsLength }}
        </div>

        <!-- @slot Use it to add actions instead table head (it appears when you select items in table). -->
        <slot name="thead-actions" :selected-rows="selectedRows" />
      </template>

      <template v-else>
        <div
          v-for="(item, index) in headers"
          :key="index"
          class="mono-table-custom-header-item"
          :class="item.thClass"
        >
          <template v-if="isExistSlot(`thead-${item.value}`)">
            <!-- @slot Use it to customise table header item. -->
            <slot :name="`thead-${item.value}`" :text="item.text" />
          </template>

          <template v-else>
            {{ item.text }}
          </template>
        </div>
      </template>

      <UTopLoader
        v-if="loaderResourceName && isFixedHeader"
        class="table-fixed-loader"
        :resource-names="loaderResourceName"
        position="absolute"
      />
    </div>

    <div ref="tableWrapper" class="mono-table-inner-wrapper" :class="tableWrapClass">
      <t-table class="mono-table" :data="tableItems" :headers="headers" :class="tableClasses">
        <template #thead="{ thClass, data }">
          <thead>
            <tr ref="headerRow" :class="headerClasses.hideHeader">
              <th v-if="selectable" class="table-checkbox">
                <UCheckbox
                  v-model="selectAll"
                  size="sm"
                  :show-partial-icon="!isSelectedAllRows"
                  partial
                  :data-cy="`${dataCy}-select-all`"
                />
              </th>

              <th v-for="(item, index) in data" :key="index" :class="[thClass, item.thClass]">
                <template v-if="isExistSlot(`thead-${item.value}`)">
                  <!-- @slot Use it to customise table header item. -->
                  <slot :name="`thead-${item.value}`" :text="item.text" />
                </template>

                <template v-else>
                  {{ item.text }}
                </template>
              </th>
            </tr>
            <UTopLoader
              v-if="loaderResourceName"
              class="table-loader"
              :resource-names="loaderResourceName"
              position="absolute"
            />
          </thead>
        </template>

        <template #row="{ row, rowIndex }">
          <tr
            v-if="rowIndex === firstRow && isShownSlot.beforeFirstRow"
            class="more-row"
            :class="beforeFirstRowClass"
          >
            <td v-if="isShownSlot.beforeFirstRow" :colspan="colsCount" :class="firstRowClass">
              <!-- @slot Use it to add something before first row. -->
              <slot name="before-first-row" />
            </td>

            <td v-else class="first-row" />
          </tr>

          <DateSeparator
            v-if="isShownDateSeparator(rowIndex, row.date)"
            :class="dateSeparatorRowClass(rowIndex)"
            :date="row.date.primaryRow || row.date"
            :cols-count="colsCount"
            :i18n="i18n"
          />

          <tr
            v-if="!isShownRow(row)"
            class="table-row"
            :class="rowClass(row)"
            :data-cy="`${dataCy}-row`"
            @click="onClickRow(row)"
          >
            <td v-if="selectable" class="col-checkbox">
              <TableCheckbox
                v-model:values="selectedRows"
                :value="rowIndex"
                :data-cy="`${dataCy}-table-body-checkbox`"
                @click.stop="onClickSelectRow(rowIndex)"
              />
            </td>

            <td
              v-for="(value, key, index) in getFilteredRow(row)"
              :key="index"
              :class="getTdClass(key)"
            >
              <template v-if="isExistSlot(`cell-${key}`)">
                <div
                  :class="tableContainerClass(index)"
                  :style="setLeftMargin(row.nestedLevel)"
                  @click="onClickShowItem(row)"
                >
                  <div v-if="isShownIcon({ index, row })" class="table-button">
                    <UIcon
                      v-if="row.isHidden"
                      name="add"
                      class="table-container-icon"
                      size="xs"
                      :color="isIconActive(row)"
                      variant="light"
                      interactive
                    />

                    <UIcon
                      v-else
                      name="remove"
                      class="table-container-icon"
                      size="xs"
                      variant="light"
                      interactive
                    />
                  </div>
                  <!-- @slot Use it to customise table cell item (in whole column). -->
                  <slot :name="`cell-${key}`" :value="value" />
                </div>
              </template>

              <template v-else-if="isExistSlot('cell-other')">
                <slot name="cell-other" :value="value" />
              </template>

              <template v-else-if="key === 'date'">
                <div v-if="value.format">
                  {{ dateConverter(value.timestamp, value.format) }}
                </div>

                <div v-else>
                  {{ dateConverter(value) }}
                </div>
              </template>

              <template v-else-if="key === 'email'">
                <div @click.stop>
                  <ULink :text="value" :url="`mailto:${value}`" size="sm" />
                </div>
              </template>

              <template v-else-if="key === 'link'">
                <ULink
                  v-if="value.route"
                  :data-cy="`${dataCy}-${key}-link`"
                  :text="value.label"
                  router-link
                  :route="value.route"
                  size="sm"
                />

                <span v-else>
                  {{ value }}
                </span>
              </template>

              <template v-else-if="key === 'money'">
                <UMoney :sum="value.sum" :currency-symbol="value.currencySymbol" />
              </template>

              <template v-else-if="key === 'tags'">
                <div class="tags-cell">
                  <UTag
                    v-for="item in value.tags"
                    :key="item"
                    :text="item"
                    :color="value.variant"
                  />
                </div>
              </template>

              <template v-else-if="value.hasOwnProperty('secondaryRow')">
                <div :data-cy="`${dataCy}-${key}-cell`">
                  {{ value.primaryRow || emptyItem }}
                </div>

                <div class="secondary-row">
                  <template v-if="Array.isArray(value.secondaryRow)">
                    <div v-for="(secondaryRow, idx) in value.secondaryRow" :key="idx">
                      <span class="children-empty">
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
                  {{ value || emptyItem }}
                </div>
              </template>
            </td>
          </tr>

          <tr v-if="rowIndex === lastRow" :class="afterLastRowClass">
            <td v-if="isShownSlot.afterLastRow" :colspan="colsCount">
              <!-- @slot Use it to add something after last row. -->
              <slot name="after-last-row" />
            </td>
          </tr>
        </template>

        <template v-if="isExistSlot('tfoot')" #tfoot>
          <tfoot class="table-footer">
            <tr ref="footerRow" class="table-footer-row">
              <td v-if="selectable" />

              <!-- @slot Use it to add something in table footer. -->
              <slot name="tfoot" :cols-count="colsCount" />
            </tr>

            <tr ref="footerFixedRow" class="table-footer-fixed-row" :style="tableRowWidthStyle">
              <td v-if="selectable" />

              <!-- @slot Use it to add something in table footer. -->
              <slot name="tfoot" :cols-count="colsCount" />
            </tr>
          </tfoot>
        </template>

        <template v-if="!tableItems.length" #tbody>
          <EmptyTableMsg :colspan="colsCount" :filters="filters" :i18n="i18n">
            <slot name="empty-table-msg" />
          </EmptyTableMsg>
        </template>
      </t-table>
    </div>
  </div>
</template>

<script>
import DateServiceDefault from "vueless/service.date";

import { isSameDay, isValid, secondsToMilliseconds } from "date-fns";

import UMoney from "vueless/ui.text-money";
import UTag from "vueless/ui.text-tag";
import ULink from "vueless/ui.button-link";
import UCheckbox from "vueless/ui.form-checkbox";
import UTopLoader from "vueless/layout-ui.loader-top";
import TTable from "vueless/library.vue-tailwind-3/t-table";
import TableCheckbox from "./components/TableCheckbox.vue";
import EmptyTableMsg from "./components/EmptyTableMsg.vue";
import DateSeparator from "./components/DateSeparator.vue";
import I18nServiceDefault from "vueless/service.i18n";

const ONE_REM = 16;
const ONE_AND_HALF_REM = 1.5;

export default {
  name: "UTable",
  components: {
    UTag,
    ULink,
    UMoney,
    UCheckbox,
    UTopLoader,
    TTable,
    TableCheckbox,
    EmptyTableMsg,
    DateSeparator,
  },

  props: {
    /**
     * Set items (rows) for table.
     */
    items: {
      type: Array,
      default: () => [],
      required: true,
    },

    /**
     * Set headers for table.
     */
    headers: {
      type: Array,
      default: () => [],
      required: true,
    },

    /**
     * Set filters for table.
     */
    filters: {
      type: Object,
      default: () => ({}),
    },

    /**
     * It allows selecting table rows.
     */
    selectable: {
      type: Boolean,
      default: false,
    },

    /**
     * Makes the table more narrow.
     */
    compact: {
      type: Boolean,
      default: false,
    },

    /**
     * Make footer fixed.
     */
    fixedFooter: {
      type: Boolean,
      default: false,
    },

    /**
     * Make header sticky.
     */
    stickyHeader: {
      type: Boolean,
      default: false,
    },

    /**
     * Set loader resource name to activate table top loader exact for that request.
     */
    loaderResourceName: {
      type: String,
      default: "",
    },

    /**
     * Enable or disable nesting.
     */
    nesting: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets the nesting level from which folding button need to be shown.
     */
    nestingFromLevel: {
      type: Number,
      default: 0,
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["clickRow", "update:items"],

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  data: () => ({
    selectAll: false,
    canSelectAll: true,
    selectedRows: [],
    tableItems: [],
    hiddenIds: [],
    firstRow: 0,
    emptyItem: "-",
    tableWidth: 0,
    tableHeight: 0,
    pagePositionY: 0,
  }),

  computed: {
    i18n() {
      return {
        noItems: this.getTranslation("noItems"),
        noResultsForFilters: this.getTranslation("noResultsForFilters"),
        yesterday: this.getTranslation("yesterday"),
        today: this.getTranslation("today"),
        tomorrow: this.getTranslation("tomorrow"),
      };
    },

    tableWrapClass() {
      const selected = this.selectedRowsLength ? "mono-table-inner-wrapper-selected" : "";
      const compact = this.compact ? "mono-table-inner-wrapper-compact" : "";

      return [selected, compact];
    },

    selectedRowsLength() {
      return this.selectedRows.length;
    },

    isSelectedAllRows() {
      return this.selectedRowsLength === this.tableItems.length;
    },

    colsCount() {
      return this.headers.length + 1;
    },

    lastRow() {
      return this.items.length - 1;
    },

    isShownSlot() {
      return {
        beforeFirstRow: !!this.$slots["before-first-row"],
        afterLastRow: !!this.$slots["after-last-row"],
      };
    },

    tableClasses() {
      return {
        "fixed-footer": this.isFixedFooter,
      };
    },

    headerClasses() {
      return {
        compact: this.compact ? "compact-header" : "",
        actionsHeader: this.selectedRowsLength ? "actions-header" : "",
        fixedHeader: this.isFixedHeader && this.stickyHeader ? "mono-table-fixed-header" : "",
        hideHeader: this.selectedRowsLength && !this.isFixedHeader ? "hide-header" : "",
      };
    },

    isShownFixedOrActionsHeader() {
      return this.isFixedHeader || this.selectedRowsLength;
    },

    isFixedFooter() {
      const windowHeight = window.innerHeight;

      return (
        windowHeight < this.tableHeight &&
        this.fixedFooter &&
        !this.isShownFooterPosition &&
        this.isCheckedMoreOneTableItems
      );
    },

    isFixedHeader() {
      return !this.isShownHeaderPosition;
    },

    isShownHeaderPosition() {
      const positionForFixHeader =
        this.$refs?.headerRow?.getBoundingClientRect().top + window.pageYOffset || 0;

      return positionForFixHeader >= this.pagePositionY;
    },

    isShownFooterPosition() {
      const windowHeight = window.innerHeight;
      const pageBottom = this.pagePositionY + windowHeight;
      const positionForFixFooter =
        this.$refs?.footerRow?.getBoundingClientRect().bottom + window.pageYOffset;

      return pageBottom >= positionForFixFooter;
    },

    isCheckedMoreOneTableItems() {
      const checkedTableItems = this.tableItems.filter((item) => item.isChecked);

      return checkedTableItems.length > 1;
    },

    tableRowWidthStyle() {
      return `width: ${this.tableWidth / ONE_REM}rem`;
    },

    beforeFirstRowClass() {
      return this.tableItems[0]?.isChecked ? "table-row-checked" : "";
    },

    firstRowClass() {
      return this.hasContentBeforeFirstRowSlot ? "" : "first-row";
    },

    afterLastRowClass() {
      return this.isSlotEmpty("after-last-row") ? "more-row-hide" : "more-row";
    },

    hasContentBeforeFirstRowSlot() {
      return this.isShownSlot.beforeFirstRow
        ? this.$slots["before-first-row"]()?.some((item) => !!item.type?.render)
        : false;
    },
  },

  watch: {
    selectAll: {
      handler: "onChangeSelectAll",
      deep: true,
    },
    selectedRows: {
      handler: "onChangeSelectedRows",
      deep: true,
    },
    tableItems: {
      handler: "onChangeTableItems",
      deep: true,
    },
    items: {
      handler: "onChangeItems",
      deep: true,
    },
    isFixedFooter: "onChangeFixedFooter",
    isFixedHeader: "onChangeFixedHeader",
  },

  created() {
    this.tableItems = this.items;

    document.addEventListener("keyup", this.onKeyupClearCheckbox);
    document.addEventListener("scroll", this.onScrollGetPosition, { passive: true });
  },

  updated() {
    this.tableHeight = this.$refs.tableWrapper.offsetHeight;
    this.tableWidth = this.$refs.tableWrapper.offsetWidth;
  },

  beforeUnmount() {
    document.removeEventListener("keyup", this.onKeyupClearCheckbox);
    document.removeEventListener("scroll", this.onScrollGetPosition);
  },

  methods: {
    isShownIcon({ index, row }) {
      const isChildren = row.childrenIds?.length > 0;
      const isWithinNestingLevel = row.nestedLevel >= this.nestingFromLevel;

      const isFirstRow = index === 0;

      return isFirstRow && (isChildren || row.isNestingRow) && this.nesting && isWithinNestingLevel;
    },

    isIconActive(row) {
      return !row.childrenIds?.length ? "gray" : "";
    },

    isSlotEmpty(slotName) {
      return Boolean(this.$slots[slotName]);
    },

    onClickShowItem(row) {
      if (!this.nesting || !row.childrenIds.length) return;
      const [firstElement] = row.childrenIds;

      row.isHidden = !row.isHidden;

      if (row.isHidden && row.childrenIds.length) {
        this.hiddenIds.push(...row.childrenIds);
      } else {
        this.hiddenIds =
          row.nestedLevel === this.nestingFromLevel
            ? row.childrenIds.filter((item) => !this.hiddenIds.includes(item))
            : this.hiddenIds.filter((item) => item !== firstElement);
      }
    },

    tableContainerClass(index) {
      return index === 0 && this.nesting ? "table-container" : "";
    },

    setLeftMargin(nestedLevel) {
      return `margin-left: ${nestedLevel * ONE_AND_HALF_REM}rem`;
    },

    isShownRow(row) {
      if (this.hiddenIds.includes(row.id)) {
        row.isHidden = true;
      }

      return this.hiddenIds.includes(row.id);
    },

    onChangeFixedFooter() {
      if (this.isFixedFooter) {
        this.$nextTick(() => {
          this.setFooterItemsWidth();
        });
      } else {
        this.setFooterItemsWidth(true);
      }
    },

    setFooterItemsWidth(setNullWidth) {
      const ZERO_WIDTH = 0;

      if (!this.fixedFooter) return;

      const [...mainFooterItems] = this.$refs.footerRow.children;
      const [...fixedFooterItems] = this.$refs.footerFixedRow.children;

      fixedFooterItems.forEach((item, index) => {
        item.style.width = setNullWidth
          ? `${ZERO_WIDTH}rem`
          : `${mainFooterItems[index].offsetWidth / ONE_REM}rem`;
      });
    },

    onChangeFixedHeader() {
      this.setHeaderItemsWidth();
    },

    setHeaderItemsWidth() {
      if (!this.selectedRowsLength) {
        const [...mainHeaderItems] = this.$refs.headerRow.children;
        const [...fixedHeaderItems] = this.$refs.headerFixedRow.children;

        fixedHeaderItems.forEach((item, index) => {
          item.style.width = `${mainHeaderItems[index]?.offsetWidth / ONE_REM}rem`;
        });
      }
    },

    onScrollGetPosition() {
      this.pagePositionY = window.pageYOffset;
    },

    onChangeTableItems(tableItems) {
      this.$emit("update:items", tableItems);
    },

    onKeyupClearCheckbox(event) {
      const escKeyCode = 27;

      if (event.keyCode === escKeyCode && this.selectable) {
        this.selectedRows = [];
      }
    },

    onChangeItems() {
      if (!this.items.length || this.tableItems.length !== this.items.length) {
        this.selectedRows = [];
      }

      const checkedTableItems = this.tableItems.filter((item) => item.isChecked);

      this.tableItems = this.items;

      this.tableItems.forEach((item) => {
        checkedTableItems.forEach((checkedItem) => {
          if (item.id === checkedItem.id) {
            item.isChecked = true;
          }
        });

        if (this.nesting && item.isHidden && item.childrenIds?.length) {
          this.hiddenIds.push(...item.childrenIds);
        }
      });
    },

    isShownDateSeparator(rowIndex, date) {
      const prevIndex = rowIndex ? rowIndex - 1 : rowIndex;
      const prevItem = this.tableItems[prevIndex];
      const prevDateInMilliseconds = secondsToMilliseconds(prevItem?.date?.primaryRow);
      const dateInMilliseconds = secondsToMilliseconds(date?.primaryRow);
      const isSameDate = isSameDay(dateInMilliseconds, prevDateInMilliseconds);

      if (rowIndex === 0) {
        return isValid(prevDateInMilliseconds) && this.hasContentBeforeFirstRowSlot;
      }

      return isValid(prevDateInMilliseconds) && !isSameDate;
    },

    rowClass(row) {
      return row.isChecked ? "table-row-checked" : "";
    },

    dateSeparatorRowClass(rowIndex) {
      const isCheckedRowBefore = this.tableItems[rowIndex - 1]?.isChecked;
      const isCheckedRowAfter = this.tableItems[rowIndex]?.isChecked;

      return (isCheckedRowBefore && isCheckedRowAfter) || (rowIndex === 0 && isCheckedRowAfter)
        ? "table-row-checked"
        : "";
    },

    onClickSelectRow(rowIndex) {
      const isRowChecked = this.tableItems[rowIndex].isChecked;

      this.tableItems[rowIndex].isChecked = !isRowChecked;
    },

    getFilteredRow(row) {
      const filteredRow = Object.entries(row).filter((col) => {
        const [key] = col;
        const isShownCol = this.headers.some((header) => header.value === key);

        if (isShownCol) return col;
      });

      return Object.fromEntries(filteredRow);
    },

    onClickRow(row) {
      this.$emit("clickRow", row);
    },

    isExistSlot(slotName) {
      return !!this.$slots[slotName];
    },

    getTdClass(key) {
      return this.headers.find((item) => item.value === key)?.tdClass;
    },

    onChangeSelectAll(selectAll) {
      if (selectAll && this.canSelectAll) {
        this.selectedRows = this.tableItems.map((item, index) => index);

        this.tableItems.forEach((item) => {
          item.isChecked = true;
        });
      } else if (!selectAll) {
        this.selectedRows = [];

        this.tableItems.forEach((item) => {
          item.isChecked = false;
        });
      }

      this.canSelectAll = true;
    },

    onChangeSelectedRows(selectedRows) {
      if (selectedRows.length) {
        this.canSelectAll = false;

        this.isCheckedMoreOneTableItems ? this.setFooterItemsWidth() : "";
      } else {
        this.$nextTick(() => {
          this.setHeaderItemsWidth();
        });
      }

      this.selectAll = !!selectedRows.length;
    },

    dateConverter(value, format) {
      return new DateServiceDefault().dateConverter(value, format);
    },

    clearSelectedItems() {
      this.selectedRows = [];
    },
  },
};
</script>

<i18n>
en:
  noItems: There is no data in the table yet.
  noResultsForFilters: No results were found for the specified filters.
  yesterday: Yesterday
  today: Today
  tomorrow: Tomorrow
ru:
  noItems: Пока что в таблице нет данных.
  noResultsForFilters: По заданным фильтрам ничего не найдено.
  yesterday: Вчера
  today: Сегодня
  tomorrow: Завтра
ua:
  noItems: Поки що в таблиці немає даних.
  noResultsForFilters: За даними фільтрами нічого не знайдено.
  yesterday: Вчора
  today: Сьогодні
  tomorrow: Завтра
</i18n>

<style lang="postcss" scoped>
.mono-table-wrapper {
  @apply relative bg-white rounded-2xl;
}

.more-row {
  .first-row {
    @apply py-1 !important;
  }

  .last-row {
    @apply py-1 !important;
  }

  td {
    @apply px-0 py-4 !important;

    & :deep(:first-child) {
      @apply mx-auto;
    }
  }

  &-hide {
    td {
      @apply !p-0;
    }
  }
}

.mono-table-fixed-header {
  @apply fixed top-0 border border-t-0 border-gray-200;
  @apply bg-white;

  &.actions-header {
    @apply rounded-t-none;
  }
}

.actions-header {
  @apply rounded-t-lg border border-blue-200 bg-blue-50;

  .selected-rows-count {
    @apply flex items-center pr-4;
    @apply font-medium text-gray-900;
  }
}

.mono-table-custom-header {
  @apply flex items-center;
  @apply z-40;

  &-item {
    @apply flex-none;
    @apply text-sm font-normal text-gray-500;
    @apply px-[1.125rem] py-5;

    &:first-child {
      @apply p-5;
    }

    &:nth-child(2) {
      @apply pl-0;
    }

    &:last-child {
      @apply p-5;
    }
  }

  &.compact-header {
    .fixed-header-table-loader {
      @apply !top-[3.25rem];
    }

    .mono-table-custom-header-item {
      @apply p-4;

      &:nth-child(2) {
        @apply pl-0;
      }
    }
  }
}

.mono-table-inner-wrapper {
  @apply overflow-auto rounded-lg;
  @apply border border-gray-200;

  &-selected {
    @apply !rounded-t-none border-t-0;
  }

  .mono-table {
    @apply min-w-full border-none bg-white text-sm;
    @apply w-full;

    :deep(thead) {
      @apply border-b border-solid border-gray-200;

      tr {
        th {
          @apply bg-white px-[1.125rem] py-5;
          @apply text-sm font-normal text-gray-500;

          &:first-child,
          &:last-child {
            @apply p-5;
          }

          &:nth-child(2) {
            @apply pl-0;
          }
        }
      }
    }

    :deep(tbody) {
      @apply divide-none;

      tr {
        td {
          @apply text-ellipsis whitespace-nowrap p-[1.125rem] py-5;
          @apply align-top;

          &:first-child,
          &:last-child {
            @apply p-5;
          }

          &:nth-child(2) {
            @apply pl-0;
          }

          .tags-cell {
            @apply flex space-x-2;
          }
        }
      }
    }

    :deep(tfoot) {
      @apply border-t border-solid border-gray-200;

      tr {
        td {
          @apply p-[1.125rem] py-5;

          &:first-child {
            @apply p-5;
          }

          &:nth-child(2) {
            @apply pl-0;
          }
        }
      }
    }

    :deep(.secondary-row) {
      @apply mt-1 text-xs text-gray-500;
    }
  }

  &-compact {
    .mono-table {
      :deep(thead) {
        tr {
          th {
            @apply bg-white p-4;

            &:first-child,
            &:last-child {
              @apply p-4;
            }
          }
        }
      }

      :deep(tbody) {
        tr {
          td {
            @apply px-4 py-3;

            &:first-child,
            &:last-child {
              @apply px-4 py-3;
            }
          }
        }
      }

      :deep(tfoot) {
        tr {
          td {
            @apply p-4;

            &:first-child {
              @apply p-4;
            }
          }
        }
      }
    }
  }
}

.col-checkbox {
  @apply w-[3.75rem];
}

.table-row {
  @apply transition duration-100;
  @apply hover:bg-gray-50;

  &-checked {
    @apply transition duration-100;
    @apply bg-gray-100;
  }
}

.table-button {
  @apply flex relative -top-px;
}

.children-empty {
  @apply inline-block;
}

.fixed-footer {
  .table {
    &-footer {
      @apply relative;

      &-fixed-row {
        visibility: inherit;
      }
    }
  }
}

.hide-header {
  @apply relative -top-[3.75rem];
  visibility: collapse;
}

.table-footer-fixed-row {
  @apply fixed bottom-0 -ml-px;
  @apply border border-b-0 border-gray-200 bg-white;
  visibility: collapse;
}

.table-loader {
  @apply !top-auto;
}

.table-fixed-loader {
  @apply !top-[3.25rem];
}

.fixed-header-table-loader {
  @apply !top-[3.75rem];
}

.table-checkbox {
  @apply w-[3.75rem];
}
.table-container {
  @apply flex items-center;

  &-icon {
    @apply mr-2 rounded-sm bg-gray-200;
  }
}
</style>
