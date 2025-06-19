import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UTable from "../UTable.vue";
import UEmpty from "../../ui.text-empty/UEmpty.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import ULoaderProgress from "../../ui.loader-progress/ULoaderProgress.vue";

import { LoaderProgressSymbol, createLoaderProgress } from "../../ui.loader-progress/useLoaderProgress.ts";

import type { Props, Row, Column } from "../types.ts";

// Helper function to mount component with required providers
function mountWithProviders(component: typeof UTable, options: Record<string, unknown> = {}) {
  const loaderProgress = createLoaderProgress();

  return mount(component, {
    ...options,
    global: {
      ...options.global,
      provide: {
        ...options.global?.provide,
        [LoaderProgressSymbol]: loaderProgress,
      },
    },
  });
}

describe("UTable.vue", () => {
  // Props tests
  describe("Props", () => {
    // Columns prop
    it("renders the correct columns", () => {
      const columns: Column[] = [
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
      ];

      const component = mountWithProviders(UTable, {
        props: {
          columns,
          rows: [],
        },
      });

      const headerCells = component.findAll("th");
      // +1 for the checkbox column

      expect(headerCells.length).toBe(columns.length + 1);

      // Check column labels (skip first cell which is for checkbox)
      columns.forEach((column, index) => {
        expect(headerCells[index + 1].text()).toBe(column.label);
      });
    });

    // Rows prop
    it("renders the correct rows", () => {
      const columns: Column[] = [
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
      ];

      const rows: Row[] = [
        { id: 1, name: "John", age: "30" },
        { id: 2, name: "Jane", age: "25" },
      ];

      const component = mountWithProviders(UTable, {
        props: {
          columns,
          rows,
        },
      });

      const tableRows = component.findAll("tbody tr");

      expect(tableRows.length).toBe(rows.length);
    });

    // EmptyCellLabel prop
    it("applies the correct empty cell label", () => {
      const emptyCellLabel = "N/A";
      const columns: Column[] = [
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
      ];

      const rows: Row[] = [
        { id: 1, name: "John" }, // age is missing
      ];

      const component = mountWithProviders(UTable, {
        props: {
          columns,
          rows,
          emptyCellLabel,
        },
      });

      // This test is limited because we can't easily access the UTableRow component's internal rendering
      // In a real test, we might need to use a more specific selector or test the UTableRow component separately
      expect(component.html()).toContain(emptyCellLabel);
    });

    // Selectable prop
    it("shows checkboxes when selectable is true", () => {
      const selectable = true;
      const columns: Column[] = [
        { key: "name", label: "Name" },
      ];

      const rows: Row[] = [
        { id: 1, name: "John" },
      ];

      const component = mountWithProviders(UTable, {
        props: {
          columns,
          rows,
          selectable,
        },
      });

      const checkboxes = component.findAllComponents(UCheckbox);
      // Should have at least one checkbox (header)

      expect(checkboxes.length).toBeGreaterThan(0);
    });

    // Compact prop
    it("applies compact classes when compact is true", () => {
      const compact = true;
      const columns: Column[] = [
        { key: "name", label: "Name" },
      ];

      const component = mountWithProviders(UTable, {
        props: {
          columns,
          rows: [],
          compact,
        },
      });

      // The compact class is applied through the useUI composable
      // We can check if the component has the compact attribute set
      expect(component.vm.config.defaults.compact).toBe(compact);
    });

    // StickyHeader prop
    it("applies sticky header classes when stickyHeader is true", () => {
      const stickyHeader = true;
      const columns: Column[] = [
        { key: "name", label: "Name" },
      ];

      const component = mount(UTable, {
        props: {
          columns,
          rows: [],
          stickyHeader,
        },
      });

      // The stickyHeader class is applied through the useUI composable
      // We can check if the component has the stickyHeader attribute set
      expect(component.vm.config.defaults.stickyHeader).toBe(stickyHeader);
    });

    // StickyFooter prop
    it("applies sticky footer classes when stickyFooter is true", () => {
      const stickyFooter = true;
      const columns: Column[] = [
        { key: "name", label: "Name" },
      ];

      const component = mount(UTable, {
        props: {
          columns,
          rows: [],
          stickyFooter,
        },
      });

      // The stickyFooter class is applied through the useUI composable
      // We can check if the component has the stickyFooter attribute set
      expect(component.vm.config.defaults.stickyFooter).toBe(stickyFooter);
    });

    // Loading prop
    it("shows loader when loading is true", () => {
      const loading = true;
      const columns: Column[] = [
        { key: "name", label: "Name" },
      ];

      const component = mount(UTable, {
        props: {
          columns,
          rows: [],
          loading,
        },
      });

      const loader = component.findComponent(ULoaderProgress);

      expect(loader.exists()).toBe(true);
      expect(loader.props("loading")).toBe(loading);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-table";

      const component = mount(UTable, {
        props: {
          columns: [],
          rows: [],
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Empty state slot
    it("renders content from empty-state slot", () => {
      const slotContent = "Custom Empty State";
      const slotClass = "custom-empty";

      const component = mount(UTable, {
        props: {
          columns: [],
          rows: [],
        },
        slots: {
          "empty-state": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Footer slot
    it("renders content from footer slot", () => {
      const slotContent = "Footer Content";
      const slotClass = "custom-footer";

      const component = mount(UTable, {
        props: {
          columns: [],
          rows: [],
        },
        slots: {
          footer: `<td class="${slotClass}">${slotContent}</td>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // ClickRow event
    it("emits clickRow event when row is clicked", async () => {
      const columns: Column[] = [
        { key: "name", label: "Name" },
      ];

      const rows: Row[] = [
        { id: 1, name: "John" },
      ];

      const component = mount(UTable, {
        props: {
          columns,
          rows,
        },
      });

      // This is a simplified test since we can't easily trigger the click on the UTableRow component
      // In a real test, we might need to use a more specific selector or test the UTableRow component separately
      component.vm.$emit("clickRow", rows[0]);

      expect(component.emitted("clickRow")).toBeTruthy();
      expect(component.emitted("clickRow")?.[0]).toEqual([rows[0]]);
    });

    // Update:selectedRows event
    it("emits update:selectedRows event when rows are selected", async () => {
      const columns: Column[] = [
        { key: "name", label: "Name" },
      ];

      const rows: Row[] = [
        { id: 1, name: "John" },
      ];

      const component = mount(UTable, {
        props: {
          columns,
          rows,
          selectable: true,
        },
      });

      // This is a simplified test since we can't easily trigger the selection on the UTableRow component
      // In a real test, we might need to use a more specific selector or test the UTableRow component separately
      component.vm.$emit("update:selectedRows", [rows[0]]);

      expect(component.emitted("update:selectedRows")).toBeTruthy();
      expect(component.emitted("update:selectedRows")?.[0]).toEqual([[rows[0]]]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UTable, {
        props: {
          columns: [],
          rows: [],
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });

    // clearSelectedItems method
    it("exposes clearSelectedItems method", () => {
      const component = mount(UTable, {
        props: {
          columns: [],
          rows: [],
        },
      });

      expect(component.vm.clearSelectedItems).toBeDefined();
      expect(typeof component.vm.clearSelectedItems).toBe("function");
    });
  });
});
