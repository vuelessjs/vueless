import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UAccordion from "../UAccordion.vue";
import UAccordionItem from "../../ui.container-accordion-item/UAccordionItem.vue";

describe("UAccordion", () => {
  const options = [
    { value: "a", title: "A" },
    { value: "b", title: "B" },
  ];

  // Props
  describe("Props", () => {
    it("renders items from options", () => {
      const component = mount(UAccordion, {
        props: { name: "test", options },
      });

      const items = component.findAllComponents(UAccordionItem);

      expect(items.length).toBe(options.length);
    });

    it("passes base props down to items", () => {
      const component = mount(UAccordion, {
        props: { name: "acc", size: "md", disabled: true, options },
      });

      const item = component.findComponent(UAccordionItem);

      expect(item.props("name")).toBe("acc");
      expect(item.props("size")).toBe("md");
      expect(item.props("disabled")).toBe(true);
    });

    it("applies data-test attribute to wrapper", () => {
      const dataTest = "accordion-test";

      const component = mount(UAccordion, {
        props: { name: "test", dataTest },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    it("exposes listRef", () => {
      const component = mount(UAccordion, { props: { name: "test" } });

      expect(component.vm.listRef).toBeDefined();
      expect(component.vm.listRef instanceof HTMLDivElement).toBe(true);
    });
  });

  // Events
  describe("Events", () => {
    it("emits update:modelValue when an item is toggled (single)", async () => {
      const component = mount(UAccordion, {
        props: { name: "test", options },
      });

      const firstItem = component.findAllComponents(UAccordionItem)[0];

      await firstItem.trigger("click");

      const updates = component.emitted("update:modelValue");

      expect(updates).toBeTruthy();
      expect(updates?.[0]).toEqual(["a"]);

      await firstItem.trigger("click");
      const updates2 = component.emitted("update:modelValue");

      expect(updates2?.[1]).toEqual([null]);
    });

    it("emits update:modelValue with arrays when multiple=true", async () => {
      const component = mount(UAccordion, {
        props: { name: "test", options, multiple: true },
      });

      const [firstItem, secondItem] = component.findAllComponents(UAccordionItem);

      await firstItem.trigger("click");
      await secondItem.trigger("click");
      const updates = component.emitted("update:modelValue");

      expect(updates?.[0]).toEqual([["a"]]);
      expect(updates?.[1]).toEqual([["a", "b"]]);

      await firstItem.trigger("click");
      const updates2 = component.emitted("update:modelValue");

      expect(updates2?.[2]).toEqual([["b"]]);
    });
  });
});
