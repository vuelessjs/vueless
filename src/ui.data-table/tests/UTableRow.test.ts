import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { ref, nextTick } from "vue";

import UTableRow from "../UTableRow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";

import type { FlatRow, ColumnObject, UTableRowAttrs, Config, Row } from "../types";

describe("UTableRow.vue", () => {
  const defaultColumns: ColumnObject[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const defaultRow: FlatRow = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    nestedLevel: 0,
  };

  const defaultAttrs: UTableRowAttrs = {
    bodyCellContentAttrs: ref({ class: "cell-content" }),
    bodyCellCheckboxAttrs: ref({ class: "cell-checkbox" }),
    bodyCheckboxAttrs: ref({ class: "checkbox" }),
    bodyCellNestedAttrs: ref({ class: "cell-nested" }),
    bodyCellNestedExpandIconAttrs: ref({ class: "expand-icon" }),
    bodyCellNestedCollapseIconAttrs: ref({ class: "collapse-icon" }),
    bodyCellBaseAttrs: ref({ class: "cell-base" }),
    bodyCellNestedIconWrapperAttrs: ref({ class: "icon-wrapper" }),
    bodyRowCheckedAttrs: ref({ class: "row-checked" }),
    bodyRowAttrs: ref({ class: "row-base" }),
    bodyCellStickyLeftAttrs: ref({ class: "sticky-left" }),
    bodyCellStickyRightAttrs: ref({ class: "sticky-right" }),
    bodyCellSearchMatchAttrs: ref({ class: "search-match" }),
    bodyCellSearchMatchTextAttrs: ref({ class: "search-match-text" }),
    bodyCellSearchMatchActiveAttrs: ref({ class: "search-match-active" }),
    bodyCellSearchMatchTextActiveAttrs: ref({ class: "search-match-active-text" }),
  };

  const defaultConfig = {
    defaults: {
      expandIcon: "expand_more",
      collapseIcon: "expand_less",
    },
  } as Config;

  function getDefaultProps(overrides = {}) {
    const columnPositions = new Map<string, number>();

    columnPositions.set("name", 0);
    columnPositions.set("email", 100);
    columnPositions.set("role", 200);

    return {
      row: defaultRow,
      columns: defaultColumns,
      emptyCellLabel: "No data",
      selectable: false,
      nestedLevel: 0,
      dataTest: "table-row",
      attrs: defaultAttrs,
      colsCount: 3,
      config: defaultConfig,
      isChecked: false,
      isExpanded: false,
      isVisible: true,
      columnPositions,
      ...overrides,
    };
  }

  describe("Props", () => {
    it("Row – renders row data correctly", () => {
      const component = mount(UTableRow, {
        props: getDefaultProps(),
      });

      expect(component.text()).toContain(defaultRow.name);
      expect(component.text()).toContain(defaultRow.email);
      expect(component.text()).toContain(defaultRow.role);
    });

    it("Row – applies row classes when provided", () => {
      const testClass = "test-row-class";

      const rowWithClass: FlatRow = {
        ...defaultRow,
        class: testClass,
      };

      const component = mount(UTableRow, {
        props: getDefaultProps({ row: rowWithClass }),
      });

      expect(component.get("tr").attributes("class")).toContain(testClass);
    });

    it("Row – applies dynamic row classes from function", () => {
      const rowWithDynamicClass: FlatRow = {
        ...defaultRow,
        class: (row) => `dynamic-${row.role}`,
      };

      const expectedClass = `dynamic-${defaultRow.role}`;

      const component = mount(UTableRow, {
        props: getDefaultProps({ row: rowWithDynamicClass }),
      });

      expect(component.get("tr").attributes("class")).toContain(expectedClass);
    });

    it("Row – handles cell with custom classes", () => {
      const rowWithCellObject: FlatRow = {
        ...defaultRow,
        name: {
          value: "John Doe",
          class: "custom-cell-class",
          contentClass: "custom-content-class",
        },
      };

      const component = mount(UTableRow, {
        props: getDefaultProps({ row: rowWithCellObject }),
      });

      const cell = component.find("td");

      expect(cell.attributes("class")).toContain("custom-cell-class");
      expect(cell.find("div").attributes("class")).toContain("custom-content-class");
    });

    it("Row – handles dynamic cell classes", () => {
      const rowWithDynamicCellObject: FlatRow = {
        ...defaultRow,
        name: {
          value: "John Doe",
          class: (value: unknown, row: Row) => `dynamic-${row.role}`,
          contentClass: (value: unknown) => `content-${value}`,
        },
      };

      const component = mount(UTableRow, {
        props: getDefaultProps({ row: rowWithDynamicCellObject }),
      });

      const cell = component.find("td");

      expect(cell.attributes("class")).toContain("dynamic-Admin");
      expect(cell.find("div").attributes("class")).toContain("content-John Doe");
    });

    it("Columns – applies column tdClass when provided", () => {
      const columnsWithClass: ColumnObject[] = [
        { key: "name", label: "Name", tdClass: "name-column" },
        { key: "email", label: "Email", tdClass: "email-column" },
        { key: "role", label: "Role" },
      ];

      const component = mount(UTableRow, {
        props: getDefaultProps({ columns: columnsWithClass }),
      });

      const cells = component.findAll("td");

      expect(cells[0].attributes("class")).toContain(columnsWithClass[0].tdClass);
      expect(cells[1].attributes("class")).toContain(columnsWithClass[1].tdClass);
    });

    it("Empty Cell Label – displays empty cell label for empty values", () => {
      const rowWithEmptyValue: FlatRow = {
        ...defaultRow,
        name: "",
        email: "",
        role: undefined,
      };

      const component = mount(UTableRow, {
        props: getDefaultProps({
          row: rowWithEmptyValue,
          emptyCellLabel: "N/A",
        }),
      });

      expect(component.text()).toContain("N/A");
    });

    it("Selectable – renders checkbox when selectable is true", () => {
      const component = mount(UTableRow, {
        props: getDefaultProps({ selectable: true }),
      });

      const checkbox = component.findComponent(UCheckbox);

      expect(checkbox.exists()).toBe(true);
    });

    it("Selectable – does not render checkbox when selectable is false", () => {
      const component = mount(UTableRow, {
        props: getDefaultProps({ selectable: false }),
      });

      const checkbox = component.findComponent(UCheckbox);

      expect(checkbox.exists()).toBe(false);
    });

    it("Nested Level – applies correct nested shift for nested rows", () => {
      const nestedRow: FlatRow = {
        ...defaultRow,
        nestedLeveL: 2,
      };

      const component = mount(UTableRow, {
        props: getDefaultProps({
          row: nestedRow,
          nestedLevel: 2,
          selectable: true,
        }),
      });

      const checkboxCell = component.find("td");

      expect(checkboxCell.attributes("style")).toContain("transform: translateX(2rem)");
    });

    it("Is Checked – applies checked state to checkbox", () => {
      const component = mount(UTableRow, {
        props: getDefaultProps({
          selectable: true,
          isChecked: true,
        }),
      });

      const checkbox = component.getComponent(UCheckbox);

      expect(checkbox.props("modelValue")).toBe(true);
    });

    it("Is Checked – applies checked row attributes when checked", async () => {
      const component = mount(UTableRow, {
        props: getDefaultProps({ isChecked: true, selectable: true }),
      });

      const rowCheckbox = component.getComponent(UCheckbox);

      expect(rowCheckbox.props("modelValue")).toBe(true);
    });

    it("Is Expanded – shows correct expand/collapse icon", async () => {
      const expandableRow: FlatRow = {
        ...defaultRow,
        row: [{ id: "2", name: "Child", nestedLeveL: 1 }],
      };

      const component = mount(UTableRow, {
        props: getDefaultProps({
          row: expandableRow,
          isExpanded: false,
        }),
      });

      let icon = component.findComponent(UIcon);

      expect(icon.props("name")).toBe(defaultConfig.defaults.expandIcon);

      await component.setProps({ isExpanded: true });
      await nextTick();
      await flushPromises();

      // Re-query the icon after props update
      icon = component.findComponent(UIcon);

      expect(icon.props("name")).toBe(defaultConfig.defaults.collapseIcon);
    });

    it("Data Test – applies correct data-test attributes to cells", async () => {
      const dataTest = "test";

      const component = mount(UTableRow, {
        props: getDefaultProps({ dataTest, selectable: true }),
      });

      const cellWithDataTest = component.find(`[data-test='${dataTest}-name-cell']`);
      const checkboxDataTest = component.find(`[data-test='${dataTest}-body-checkbox']`);

      expect(cellWithDataTest.exists()).toBe(true);
      expect(checkboxDataTest.exists()).toBe(true);
    });
  });

  // Events are now handled by UTable via event delegation
  // UTableRow no longer emits click, dblclick, clickCell, toggleExpand, or toggleCheckbox events

  describe("Slots", () => {
    it("Cell Slot – renders custom content from cell slot", () => {
      const customCellContent = "Custom Name Content";

      const component = mount(UTableRow, {
        props: getDefaultProps(),
        slots: {
          "cell-name": customCellContent,
        },
      });

      expect(component.text()).toContain(customCellContent);
    });

    it("Cell Slot – exposes value, row, and index to slot", () => {
      const component = mount(UTableRow, {
        props: getDefaultProps(),
        slots: {
          "cell-name":
            "Value: {{ params.value }}, Row ID: {{ params.row.id }}, Index: {{ params.index }}",
        },
      });

      expect(component.text()).toContain("Value: John Doe");
      expect(component.text()).toContain("Row ID: 1");
      expect(component.text()).toContain("Index: 0");
    });

    it("Expand Slot – renders custom expand content", () => {
      const expandableRow: FlatRow = {
        ...defaultRow,
        row: [{ id: "2", name: "Child", nestedLeveL: 1 }],
      };

      const customExpandContent = "Custom Expand Button";

      const component = mount(UTableRow, {
        props: getDefaultProps({ row: expandableRow }),
        slots: {
          expand: customExpandContent,
        },
      });

      expect(component.text()).toContain(customExpandContent);
    });

    it("Expand Slot – exposes row and expanded state to slot", () => {
      const expandableRow: FlatRow = {
        ...defaultRow,
        row: [{ id: "2", name: "Child", nestedLeveL: 1 }],
      };

      const component = mount(UTableRow, {
        props: getDefaultProps({
          row: expandableRow,
          isExpanded: true,
        }),
        slots: {
          expand: "Row: {{ params.row.id }}, Expanded: {{ params.expanded }}",
        },
      });

      expect(component.text()).toContain("Row: 1");
      expect(component.text()).toContain("Expanded: true");
    });

    it("Nested Row Slot – renders nested row content", () => {
      const parentRow: FlatRow = {
        ...defaultRow,
        parentRowId: "parent-1",
      };

      const nestedContent = "Nested Row Content";

      const component = mount(UTableRow, {
        props: getDefaultProps({ row: parentRow }),
        slots: {
          "nested-row": nestedContent,
        },
      });

      expect(component.text()).toContain(nestedContent);
    });
  });

  describe("Functionality", () => {
    it("Element Title – sets title attribute when element is overflown", async () => {
      // Mock element properties to simulate overflow
      const mockElement = {
        clientWidth: 100,
        scrollWidth: 200,
        clientHeight: 50,
        scrollHeight: 50,
        textContent: "Very long text that overflows",
        setAttribute: vi.fn(),
        removeAttribute: vi.fn(),
        hasAttribute: vi.fn().mockReturnValue(false),
      };

      const component = mount(UTableRow, {
        props: getDefaultProps(),
      });

      // Access the component's internal methods
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vm = component.vm as any;

      vm.setElementTitle(mockElement);

      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        "title",
        "Very long text that overflows",
      );
    });

    it("Element Title – removes title attribute when element is not overflown", async () => {
      // Mock element properties to simulate no overflow
      const mockElement = {
        clientWidth: 200,
        scrollWidth: 100,
        clientHeight: 50,
        scrollHeight: 50,
        textContent: "Short text",
        setAttribute: vi.fn(),
        removeAttribute: vi.fn(),
        hasAttribute: vi.fn().mockReturnValue(true),
      };

      const component = mount(UTableRow, {
        props: getDefaultProps(),
      });

      // Access the component's internal methods
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vm = component.vm as any;

      vm.setElementTitle(mockElement);

      expect(mockElement.removeAttribute).toHaveBeenCalledWith("title");
    });

    it("Icon Width – calculates correct icon width", async () => {
      const expandableRow: FlatRow = {
        ...defaultRow,
        row: [{ id: "2", name: "Child", nestedLeveL: 1 }],
      };

      // Mock getBoundingClientRect
      const mockGetBoundingClientRect = vi.fn().mockReturnValue({ width: 24 });

      Object.defineProperty(Element.prototype, "getBoundingClientRect", {
        value: mockGetBoundingClientRect,
      });

      const component = mount(UTableRow, {
        props: getDefaultProps({ row: expandableRow }),
        attachTo: document.body,
      });

      const iconWrapper = component.find(".icon-wrapper");

      expect(iconWrapper.exists()).toBe(true);
    });

    it("isVisible – shows row when isVisible is true", () => {
      const component = mount(UTableRow, {
        props: getDefaultProps({ isVisible: true }),
      });

      const row = component.find("tr");
      const style = row.attributes("style") || "";

      expect(style).not.toContain("display: none");
    });

    it("isVisible – hides row when isVisible is false", () => {
      const component = mount(UTableRow, {
        props: getDefaultProps({ isVisible: false }),
      });

      const row = component.find("tr");

      expect(row.attributes("style")).toContain("display: none");
    });
  });
});
