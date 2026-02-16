import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { nextTick } from "vue";

import UTable from "../UTable.vue";
import UTableRow from "../UTableRow.vue";
import UEmpty from "../../ui.container-empty/UEmpty.vue";
import ULoaderProgress from "../../ui.loader-progress/ULoaderProgress.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";
import {
  LoaderProgressSymbol,
  createLoaderProgress,
} from "../../ui.loader-progress/useLoaderProgress";

import type { Column, Row, Props, ColumnObject } from "../types";

describe("UTable.vue", () => {
  const defaultColumns: ColumnObject[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const defaultRows: Row[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
    },
  ];

  const rowsWithDates: Row[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      rowDate: "2023-01-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      rowDate: "2023-01-02",
    },
  ];

  function getDefaultProps(overrides = {}): Props {
    return {
      columns: defaultColumns,
      rows: defaultRows,
      ...overrides,
    };
  }

  function getGlobalOptions() {
    return {
      provide: {
        [LoaderProgressSymbol]: createLoaderProgress(),
      },
    };
  }

  function mountUTable(props: Props, options = {}) {
    return mount(UTable, {
      props,
      global: getGlobalOptions(),
      ...options,
    });
  }

  describe("Props", () => {
    it("Columns – renders table headers correctly", () => {
      const component = mountUTable(getDefaultProps());

      defaultColumns.forEach((column) => {
        expect(component.text()).toContain(column.label);
      });
    });

    it("Columns – handles string columns", () => {
      const stringColumns: Column[] = ["name", "email", "role"];

      const component = mountUTable(getDefaultProps({ columns: stringColumns }));

      stringColumns.forEach((column) => {
        expect(component.text()).toContain(column);
      });
    });

    it("Columns – applies column thClass to header cells", () => {
      const columnsWithClasses: ColumnObject[] = [
        { key: "name", label: "Name", thClass: "name-header-class" },
        { key: "email", label: "Email", thClass: "email-header-class" },
        { key: "role", label: "Role" },
      ];

      const component = mountUTable(getDefaultProps({ columns: columnsWithClasses }));

      const headerCells = component.findAll("th");

      expect(headerCells[0].attributes("class")).toContain(columnsWithClasses[0].thClass);
      expect(headerCells[1].attributes("class")).toContain(columnsWithClasses[1].thClass);
    });

    it("Columns – hides columns when isShown is false", async () => {
      const columnsWithHidden: ColumnObject[] = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email", isShown: false },
        { key: "role", label: "Role" },
      ];

      const component = mountUTable(getDefaultProps({ columns: columnsWithHidden }));

      const theadElement = component.get("thead");

      expect(theadElement.text()).toContain(columnsWithHidden[0].label);
      expect(theadElement.text()).not.toContain(columnsWithHidden[1].label);
      expect(theadElement.text()).toContain(columnsWithHidden[2].label);
    });

    it("Rows – renders all table rows", () => {
      const component = mountUTable(getDefaultProps());

      const tableRows = component.findAllComponents(UTableRow);

      expect(tableRows).toHaveLength(defaultRows.length);
    });

    it("Rows – renders empty state when no rows provided", () => {
      const component = mountUTable(getDefaultProps({ rows: [] }));

      const emptyComponent = component.findComponent(UEmpty);

      expect(emptyComponent.exists()).toBe(true);
    });

    it("Selectable – renders select all checkbox when selectable is true", () => {
      const component = mountUTable(getDefaultProps({ selectable: true }));

      const selectAllCheckbox = component.get("thead").find("input");

      expect(selectAllCheckbox.exists()).toBe(true);
    });

    it("Selectable – does not render select all checkbox when selectable is false", () => {
      const component = mountUTable(getDefaultProps({ selectable: false }));

      const selectAllCheckbox = component.get("thead").find("input");

      expect(selectAllCheckbox.exists()).toBe(false);
    });

    it("Selected Rows – displays selection counter", async () => {
      const selectedRows = [defaultRows[0], defaultRows[1]];

      const component = mountUTable(getDefaultProps({ selectable: true, selectedRows }));

      const theadElement = component.get("thead");

      expect(theadElement.text()).toContain(selectedRows.length.toString());
    });

    it("Selected Rows – passes is checked state to row", async () => {
      const selectedRows = [defaultRows[0], defaultRows[1]];

      const component = mountUTable(getDefaultProps({ selectable: true, selectedRows }));

      const tableRows = component.findAllComponents(UTableRow);

      tableRows.forEach((row) => {
        const currentRowId = row.props("row").id;
        const isChecked = !!selectedRows.find((selectedRow) => selectedRow.id === currentRowId);

        expect(row.props("isChecked")).toBe(isChecked);
      });
    });

    it("Expanded Rows – passes is expanded state to row", async () => {
      const expandedRows = [defaultRows[0].id, defaultRows[2].id];

      const component = mountUTable(getDefaultProps({ expandedRows }));

      const tableRows = component.findAllComponents(UTableRow);

      tableRows.forEach((row) => {
        const currentRowId = row.props("row").id;

        expect(row.props("isExpanded")).toBe(expandedRows.includes(currentRowId));
      });
    });

    it("Loading – shows loader when loading is true", () => {
      const component = mountUTable(getDefaultProps({ loading: true }));

      const loader = component.findComponent(ULoaderProgress);

      expect(loader.exists()).toBe(true);
      expect(loader.props("loading")).toBe(true);
    });

    it("Loading – hides loader when loading is false", () => {
      const component = mountUTable(getDefaultProps({ loading: false }));

      const loader = component.findComponent(ULoaderProgress);

      expect(loader.props("loading")).toBe(false);
    });

    it("Data Test – applies correct data-test attributes", () => {
      const dataTest = "test-table";

      const component = mountUTable(getDefaultProps({ dataTest }));

      expect(component.attributes("data-test")).toBe(dataTest);
    });

    it("Empty Cell Label – passes empty cell label to table rows", () => {
      const emptyCellLabel = "No data available";

      const component = mountUTable(getDefaultProps({ emptyCellLabel }));

      const tableRow = component.getComponent(UTableRow);

      expect(tableRow.props("emptyCellLabel")).toBe(emptyCellLabel);
    });

    it("Date Divider – renders date dividers when dateDivider is true", () => {
      const component = mountUTable(
        getDefaultProps({
          rows: rowsWithDates,
          dateDivider: true,
        }),
      );

      const dividers = component.findAllComponents(UDivider);

      expect(dividers.length).toBeGreaterThan(0);
    });

    it("Date Divider – renders custom date dividers", () => {
      const customDividers = [
        { date: "2023-01-01", label: "New Year" },
        { date: "2023-01-02", label: "Day Two" },
      ];

      const component = mountUTable(
        getDefaultProps({
          rows: rowsWithDates,
          dateDivider: customDividers,
        }),
      );

      expect(component.text()).not.toContain("New Year"); // should not render above first item
      expect(component.text()).toContain("Day Two");
    });

    it("Compact – applies compact classes from config", () => {
      const compactClasses = "px-4 py-3";

      const component = mountUTable(
        getDefaultProps({
          compact: true,
          selectable: true,
          selectedRows: [defaultRows[0]],
        }),
        {
          slots: {
            footer: "Footer content",
          },
        },
      );

      const headerCells = component.findAll("th");

      headerCells.forEach((cell) => {
        expect(cell.attributes("class")).toContain(compactClasses);
      });
    });

    it("Virtual Scroll – is disabled by default", () => {
      const component = mountUTable(getDefaultProps());

      expect(component.vm.$props.virtualScroll).toBe(false);
    });

    it("Virtual Scroll – enables virtual scrolling when virtualScroll is true", () => {
      const component = mountUTable(
        getDefaultProps({
          virtualScroll: true,
        }),
      );

      expect(component.vm.$props.virtualScroll).toBe(true);

      // Check that the table wrapper has virtual scroll classes
      const tableWrapper = component.find("table").element.parentElement;

      expect(tableWrapper?.className).toContain("overflow-y-auto");
    });

    it("Virtual Scroll – renders spacer rows when virtualScroll is enabled", async () => {
      const manyRows = Array.from({ length: 100 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: "User",
      }));

      const component = mountUTable(
        getDefaultProps({
          rows: manyRows,
          virtualScroll: true,
          rowHeight: 40,
        }),
      );

      await nextTick();

      const allRows = component.findAll("tbody tr");
      const spacerRows = allRows.filter((row) => {
        const td = row.find("td");
        const hasTableRow = row.findComponent(UTableRow).exists();

        return (
          td.exists() &&
          td.attributes("colspan") &&
          td.attributes("style")?.includes("height") &&
          !hasTableRow
        );
      });

      // Should have at least one spacer row (top or bottom)
      expect(spacerRows.length).toBeGreaterThanOrEqual(1);
    });

    it("Row Height – uses default rowHeight value", () => {
      const component = mountUTable(getDefaultProps());

      expect(component.vm.$props.rowHeight).toBe(40);
    });

    it("Row Height – accepts custom rowHeight value", () => {
      const customRowHeight = 60;

      const component = mountUTable(
        getDefaultProps({
          rowHeight: customRowHeight,
        }),
      );

      expect(component.vm.$props.rowHeight).toBe(customRowHeight);
    });

    it("Buffer Size – uses default bufferSize value", () => {
      const component = mountUTable(getDefaultProps());

      expect(component.vm.$props.bufferSize).toBe(10);
    });

    it("Buffer Size – accepts custom bufferSize value", () => {
      const customBufferSize = 20;

      const component = mountUTable(
        getDefaultProps({
          bufferSize: customBufferSize,
        }),
      );

      expect(component.vm.$props.bufferSize).toBe(customBufferSize);
    });

    it("Virtual Scroll – renders only visible rows plus buffer", async () => {
      const manyRows = Array.from({ length: 100 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: "User",
      }));

      const component = mountUTable(
        getDefaultProps({
          rows: manyRows,
          virtualScroll: true,
          rowHeight: 40,
          scrollHeight: "400px",
          bufferSize: 5,
        }),
      );

      await nextTick();

      const tableRows = component.findAllComponents(UTableRow);

      // Should render less than total rows (only visible + buffer)
      expect(tableRows.length).toBeLessThan(manyRows.length);
      expect(tableRows.length).toBeGreaterThan(0);
    });

    it("Virtual Scroll – renders all rows when virtualScroll is false", () => {
      const manyRows = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: "User",
      }));

      const component = mountUTable(
        getDefaultProps({
          rows: manyRows,
          virtualScroll: false,
        }),
      );

      const tableRows = component.findAllComponents(UTableRow);

      expect(tableRows.length).toBe(manyRows.length);
    });
  });

  describe("Slots", () => {
    it("Header Counter Slot – renders custom header counter content", () => {
      const customHeaderCounterContent = "Custom Header Counter";

      const component = mountUTable(
        getDefaultProps({
          selectable: true,
          selectedRows: [defaultRows[0]],
        }),
        {
          slots: {
            "header-counter": customHeaderCounterContent,
          },
        },
      );

      expect(component.text()).toContain(customHeaderCounterContent);
    });

    it("Header Slot – renders custom header content", () => {
      const customHeaderContent = "Custom Name Header";

      const component = mountUTable(getDefaultProps(), {
        slots: {
          "header-name": customHeaderContent,
        },
      });

      expect(component.text()).toContain(customHeaderContent);
    });

    it("Header Slot – exposes column and index to slot", () => {
      const component = mountUTable(getDefaultProps(), {
        slots: {
          "header-name": "Column: {{ params.column?.label }}, Index: {{ params.index }}",
        },
      });

      expect(component.text()).toContain("Column: Name");
      expect(component.text()).toContain("Index: 0");
    });

    it("Cell Slot – renders custom cell content", () => {
      const customCellContent = "Custom Cell Content";

      const component = mountUTable(getDefaultProps(), {
        slots: {
          "cell-name": customCellContent,
        },
      });

      expect(component.text()).toContain(customCellContent);
    });

    it("Cell Slot – exposes value, row, index, and cellIndex to slot", () => {
      const component = mountUTable(getDefaultProps(), {
        slots: {
          "cell-name": `
            Value: {{ params.value }}, Row: {{ params.row.id }}
            Index: {{ params.index }}, Cell: {{ params.cellIndex }}
          `,
        },
      });

      expect(component.text()).toContain("Value: John Doe");
      expect(component.text()).toContain("Row: 1");
      expect(component.text()).toContain("Index: 0");
      expect(component.text()).toContain("Cell: 0");
    });

    it("Expand Slot – renders custom expand content", () => {
      const nestedRows: Row[] = [
        {
          id: "1",
          name: "Parent Row",
          email: "parent@example.com",
          role: "Admin",
          row: [{ id: "1-1", name: "Child", email: "child@example.com", role: "User" }],
        },
      ];

      const customExpandContent = "Custom Expand Button";

      const component = mountUTable(getDefaultProps({ rows: nestedRows }), {
        slots: {
          expand: customExpandContent,
        },
      });

      expect(component.text()).toContain(customExpandContent);
    });

    it("Before First Row Slot – renders content before first row", () => {
      const customContent = "Before First Row Content";

      const component = mountUTable(getDefaultProps(), {
        slots: {
          "before-first-row": customContent,
        },
      });

      expect(component.text()).toContain(customContent);
    });

    it("Header Actions Slot – renders header actions when rows are selected", async () => {
      const customActions = "Custom Actions";

      const component = mountUTable(
        getDefaultProps({
          selectable: true,
          selectedRows: [defaultRows[0]],
        }),
        {
          slots: {
            "header-actions": customActions,
          },
        },
      );

      await nextTick();

      expect(component.text()).toContain(customActions);
    });

    it("Footer Slot – renders custom footer content", () => {
      const customFooterContent = "Custom Footer";

      const component = mountUTable(getDefaultProps(), {
        slots: {
          footer: customFooterContent,
        },
      });

      expect(component.text()).toContain(customFooterContent);
    });

    it("Nested Row Slot – renders custom nested row content", async () => {
      const nestedRows: Row[] = [
        {
          id: "1",
          name: "Parent Row",
          email: "parent@example.com",
          role: "Admin",
          row: [{ id: "1-1", name: "Child", email: "child@example.com", role: "User" }],
        },
      ];

      const customNestedContent = "Custom Nested Content";

      const component = mountUTable(
        getDefaultProps({
          rows: nestedRows,
          expandedRows: ["1"],
        }),
        {
          slots: {
            "nested-row": customNestedContent,
          },
        },
      );

      await nextTick();

      expect(component.text()).toContain(customNestedContent);
    });
  });

  describe("Events", () => {
    it("Click Row – emits clickRow event when row is clicked", async () => {
      const component = mountUTable(getDefaultProps());

      const firstRow = component.find("tbody tr");

      await firstRow.trigger("click");

      expect(component.emitted("clickRow")).toBeTruthy();
      expect(component.emitted("clickRow")![0][0]).toMatchObject(defaultRows[0]);
    });

    it("Double Click Row – emits doubleClickRow event when row is double-clicked", async () => {
      const component = mountUTable(getDefaultProps());

      const firstRow = component.find("tbody tr");

      await firstRow.trigger("dblclick");

      expect(component.emitted("doubleClickRow")).toBeTruthy();
      expect(component.emitted("doubleClickRow")![0][0]).toMatchObject(defaultRows[0]);
    });

    it("Click Cell – emits clickCell event when cell is clicked", async () => {
      const component = mountUTable(getDefaultProps());

      const firstCell = component.find("tbody tr td");

      await firstCell.trigger("click");

      expect(component.emitted("clickCell")).toBeTruthy();
      const emittedData = component.emitted("clickCell")![0];

      expect(emittedData[0]).toBe(defaultRows[0].name);
      expect(emittedData[1]).toMatchObject(defaultRows[0]);
      expect(emittedData[2]).toBe("name");
    });

    it("Toggle Row Checkbox – emits update:selectedRows when row checkbox is clicked", async () => {
      const component = mountUTable(getDefaultProps({ selectable: true }));

      const rowCheckbox = component.find("tbody tr").find("input[type='checkbox']");

      await rowCheckbox.trigger("change");

      expect(component.emitted("update:selectedRows")).toBeTruthy();
      const emittedRows = component.emitted("update:selectedRows")![0][0] as Row[];

      expect(emittedRows).toHaveLength(1);
      expect(emittedRows[0]).toMatchObject(defaultRows[0]);
    });

    it("Toggle Expand – emits row-expand and update:expandedRows when expand icon is clicked", async () => {
      const expandableRow: Row = {
        id: "1",
        name: "Parent Row",
        email: "parent@example.com",
        role: "Admin",
        row: [{ id: "1-1", name: "Child", email: "child@example.com", role: "User" }],
      };

      const component = mountUTable(getDefaultProps({ rows: [expandableRow] }));

      const expandIcon = component.find("[data-row-toggle-icon='1']");

      await expandIcon.trigger("click");

      expect(component.emitted("row-expand")).toBeTruthy();
      expect(component.emitted("row-expand")![0][0]).toMatchObject(expandableRow);
      expect(component.emitted("update:expandedRows")).toBeTruthy();
      expect(component.emitted("update:expandedRows")![0][0]).toEqual(["1"]);
    });

    it("Toggle Expand – emits row-collapse and update:expandedRows when collapse icon is clicked", async () => {
      const expandableRow: Row = {
        id: "1",
        name: "Parent Row",
        email: "parent@example.com",
        role: "Admin",
        row: [{ id: "1-1", name: "Child", email: "child@example.com", role: "User" }],
      };

      const component = mountUTable(
        getDefaultProps({
          rows: [expandableRow],
          expandedRows: ["1"],
        }),
      );

      const collapseIcon = component.find("[data-row-toggle-icon='1']");

      await collapseIcon.trigger("click");

      expect(component.emitted("row-collapse")).toBeTruthy();
      expect(component.emitted("row-collapse")![0][0]).toMatchObject(expandableRow);
      expect(component.emitted("update:expandedRows")).toBeTruthy();
      expect(component.emitted("update:expandedRows")![0][0]).toEqual([]);
    });

    it("Multiple Row Selection – emits update:selectedRows with all selected rows", async () => {
      const component = mountUTable(getDefaultProps({ selectable: true }));

      const tableRows = component.findAll("tbody tr");

      // Select first row
      await tableRows[0].find("input[type='checkbox']").trigger("change");
      // Select second row
      await tableRows[1].find("input[type='checkbox']").trigger("change");

      const emittedEvents = component.emitted("update:selectedRows");

      expect(emittedEvents).toBeTruthy();
      const emittedRows = emittedEvents![emittedEvents!.length - 1][0] as Row[];

      expect(emittedRows).toHaveLength(2);
      expect(emittedRows[0]).toMatchObject(defaultRows[0]);
      expect(emittedRows[1]).toMatchObject(defaultRows[1]);
    });

    it("Nested Row Expansion – emits update:expandedRows for nested rows", async () => {
      const nestedRows: Row[] = [
        {
          id: "1",
          name: "Parent",
          email: "parent@example.com",
          role: "Admin",
          row: [
            {
              id: "1-1",
              name: "Child 1",
              email: "child1@example.com",
              role: "User",
              row: [
                { id: "1-1-1", name: "Grandchild", email: "grandchild@example.com", role: "Guest" },
              ],
            },
          ],
        },
      ];

      const component = mountUTable(getDefaultProps({ rows: nestedRows }));

      const expandIcon = component.find("[data-row-toggle-icon='1']");

      await expandIcon.trigger("click");

      expect(component.emitted("update:expandedRows")).toBeTruthy();
      expect(component.emitted("update:expandedRows")![0][0]).toEqual(["1"]);
    });

    it("Expand Icon – prevents row click events when expand icon is clicked", async () => {
      const expandableRow: Row = {
        id: "1",
        name: "Parent Row",
        email: "parent@example.com",
        role: "Admin",
        row: [{ id: "1-1", name: "Child", email: "child@example.com", role: "User" }],
      };

      const component = mountUTable(getDefaultProps({ rows: [expandableRow] }));

      const expandIcon = component.find("[data-row-toggle-icon='1']");

      await expandIcon.trigger("click");
      await expandIcon.trigger("dblclick");

      // Row click events should not be triggered when expand icon is clicked
      expect(component.emitted("clickRow")).toBeFalsy();
      expect(component.emitted("doubleClickRow")).toBeFalsy();
    });
  });
});
