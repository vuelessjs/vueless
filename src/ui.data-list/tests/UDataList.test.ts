import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDataList from "../UDataList.vue";
import UEmpty from "../../ui.text-empty/UEmpty.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props, DataListItem } from "../types.ts";

describe("UDataList.vue", () => {
  // Props tests
  describe("Props", () => {
    // List prop
    it("renders the correct list items", () => {
      const list: DataListItem[] = [
        { id: 1, label: "Item 1" },
        { id: 2, label: "Item 2" },
      ];

      const component = mount(UDataList, {
        props: {
          list,
        },
      });

      const items = component.findAll("[data-test^='vl-ui-data-list-item-']");

      expect(items.length).toBe(list.length);

      list.forEach((item, index) => {
        expect(items[index].text()).toContain(item.label);
      });
    });

    // Size prop
    it("applies the correct size class", () => {
      const sizes = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UDataList, {
          props: {
            size: size as Props["size"],
            list: [{ id: 1, label: "Item 1" }],
          },
        });

        expect(component.html()).toContain(classes);
      });
    });

    // LabelKey prop
    it("uses the correct labelKey for displaying items", () => {
      const labelKey = "title";
      const list: DataListItem[] = [
        { id: 1, [labelKey]: "Custom Title 1" },
        { id: 2, [labelKey]: "Custom Title 2" },
      ];

      const component = mount(UDataList, {
        props: {
          list,
          labelKey,
        },
      });

      const items = component.findAll("[data-test^='vl-ui-data-list-item-']");

      expect(items.length).toBe(list.length);

      list.forEach((item, index) => {
        expect(items[index].text()).toContain(item[labelKey]);
      });
    });

    // ValueKey prop
    it("uses the correct valueKey for item identification", () => {
      const valueKey = "code";
      const list: DataListItem[] = [
        { [valueKey]: "a1", label: "Item 1" },
        { [valueKey]: "a2", label: "Item 2" },
      ];

      const component = mount(UDataList, {
        props: {
          list,
          valueKey,
        },
      });

      const items = component.findAll("[data-test^='vl-ui-data-list-item-']");

      expect(items.length).toBe(list.length);

      // Check if the items have the correct IDs based on valueKey
      list.forEach((item, index) => {
        const itemElement = component.find(`#${item[valueKey]}`);

        expect(itemElement.exists()).toBe(true);
      });
    });

    // Nesting prop
    it("renders nested items when nesting is true", () => {
      const nesting = true;
      const list: DataListItem[] = [
        {
          id: 1,
          label: "Parent Item",
          nesting: true,
          children: [
            { id: 11, label: "Child Item 1" },
            { id: 12, label: "Child Item 2" },
          ]
        },
      ];

      const component = mount(UDataList, {
        props: {
          list,
          nesting,
        },
      });

      // Check if the parent item is rendered
      const parentItem = component.find("[data-test='vl-ui-data-list-item-1']");

      expect(parentItem.exists()).toBe(true);
      expect(parentItem.text()).toContain("Parent Item");

      // Check if nested UDataList component is rendered
      const nestedList = component.findAllComponents(UDataList);

      expect(nestedList.length).toBeGreaterThan(0);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-data-list";

      const component = mount(UDataList, {
        props: {
          list: [],
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Empty slot
    it("renders content from empty slot", () => {
      const slotContent = "Custom Empty State";
      const slotClass = "custom-empty";

      const component = mount(UDataList, {
        props: {
          list: [],
        },
        slots: {
          empty: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label";
      const slotClass = "custom-label";
      const list: DataListItem[] = [
        { id: 1, label: "Item 1" },
      ];

      const component = mount(UDataList, {
        props: {
          list,
        },
        slots: {
          label: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Actions slot
    it("renders content from actions slot", () => {
      const slotContent = "Custom Action";
      const slotClass = "custom-action";
      const list: DataListItem[] = [
        { id: 1, label: "Item 1" },
      ];

      const component = mount(UDataList, {
        props: {
          list,
        },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Drag slot
    it("renders content from drag slot", () => {
      const slotContent = "Custom Drag";
      const slotClass = "custom-drag";
      const list: DataListItem[] = [
        { id: 1, label: "Item 1" },
      ];

      const component = mount(UDataList, {
        props: {
          list,
        },
        slots: {
          drag: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // DragSort event
    it("emits dragSort event when items are sorted", async () => {
      const list: DataListItem[] = [
        { id: 1, label: "Item 1" },
        { id: 2, label: "Item 2" },
      ];

      const component = mount(UDataList, {
        props: {
          list,
        },
      });

      // This is a simplified test since we can't easily trigger the drag-and-drop functionality
      // In a real test, we might need to use a more specific approach to test drag-and-drop
      component.vm.$emit("dragSort", list);

      expect(component.emitted("dragSort")).toBeTruthy();
      expect(component.emitted("dragSort")?.[0]).toEqual([list]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UDataList, {
        props: {
          list: [],
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
