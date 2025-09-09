import { ref } from "vue";
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
        props: { options },
      });

      const items = component.findAllComponents(UAccordionItem);

      expect(items.length).toBe(options.length);
    });

    it("passes base props down to items", () => {
      const component = mount(UAccordion, {
        props: { size: "md", disabled: true, options },
      });

      const item = component.findComponent(UAccordionItem);

      expect(item.props("size")).toBe("md");
      expect(item.props("disabled")).toBe(true);
    });

    it("applies data-test attribute to wrapper", () => {
      const dataTest = "accordion-test";

      const component = mount(UAccordion, {
        props: { dataTest },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    it("exposes accordionRef", () => {
      const component = mount(UAccordion);

      expect(component.vm.accordionRef).toBeDefined();
      expect(component.vm.accordionRef instanceof HTMLDivElement).toBe(true);
    });
  });

  // Events
  describe("Events", () => {
    it("emits update:modelValue when an item is toggled (single)", async () => {
      const modelValue = ref<string | null>(null);

      const component = mount(UAccordion, {
        props: {
          options,
          modelValue: modelValue.value,
          "onUpdate:modelValue": (value: string | null) => {
            modelValue.value = value;
            component.setProps({ modelValue: value });
          },
        },
      });

      const firstItem = component.findAllComponents(UAccordionItem)[0];

      await firstItem.find("[vl-child-key='title']").trigger("click");

      const updates = component.emitted("update:modelValue");

      expect(updates).toBeTruthy();
      expect(updates?.[0]).toEqual(["a"]);

      await firstItem.find("[vl-child-key='title']").trigger("click");
      const updates2 = component.emitted("update:modelValue");

      expect(updates2?.[1]).toEqual([null]);
    });

    it("emits update:modelValue with arrays when multiple=true", async () => {
      const modelValue = ref<string[]>([]);

      const component = mount(UAccordion, {
        props: {
          options,
          multiple: true,
          modelValue: modelValue.value,
          "onUpdate:modelValue": (value: string[]) => {
            modelValue.value = value;
            component.setProps({ modelValue: value });
          },
        },
      });

      const [firstItem, secondItem] = component.findAllComponents(UAccordionItem);

      await firstItem.find("[vl-child-key='title']").trigger("click");
      await secondItem.find("[vl-child-key='title']").trigger("click");
      const updates = component.emitted("update:modelValue");

      expect(updates?.[0]).toEqual([["a"]]);
      expect(updates?.[1]).toEqual([["a", "b"]]);

      await firstItem.find("[vl-child-key='title']").trigger("click");
      const updates2 = component.emitted("update:modelValue");

      expect(updates2?.[2]).toEqual([["b"]]);
    });
  });
});
