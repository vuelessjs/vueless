import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UListbox from "../UListbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UListbox.vue", () => {
  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", async () => {
      const size = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UListbox, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color class", async () => {
      const colors = [
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "info",
        "notice",
        "neutral",
        "grayscale",
      ];

      colors.forEach((color) => {
        const component = mount(UListbox, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    // Options prop
    it("renders options when options prop is provided", () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
        { id: 3, label: "Option 3" },
      ];

      const component = mount(UListbox, {
        props: {
          options,
        },
      });

      const optionElements = component.findAll("[role='option']");

      expect(optionElements.length).toBe(options.length);

      options.forEach((option, index) => {
        expect(optionElements[index].text()).toContain(option.label);
      });
    });

    // ModelValue prop
    it("selects the correct option when modelValue is provided", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
        { id: 3, label: "Option 3" },
      ];
      const modelValue = 2;

      const component = mount(UListbox, {
        props: {
          options,
          modelValue,
        },
      });

      const selectedOption = component.find(".bg-primary\\/10");

      expect(selectedOption.exists()).toBe(true);
      expect(selectedOption.text()).toContain("Option 2");
    });

    // Multiple prop
    it("allows multiple selection when multiple prop is true", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
        { id: 3, label: "Option 3" },
      ];
      const modelValue = [1, 3];
      const multiple = true;

      const component = mount(UListbox, {
        props: {
          options,
          modelValue,
          multiple,
        },
      });

      const selectedOptions = component.findAll(".bg-primary\\/10");

      expect(selectedOptions.length).toBe(2);
      expect(selectedOptions[0].text()).toContain("Option 1");
      expect(selectedOptions[1].text()).toContain("Option 3");
    });

    // Searchable prop
    it("shows search input when searchable prop is true", () => {
      const searchable = true;

      const component = mount(UListbox, {
        props: {
          searchable,
        },
      });

      expect(component.findComponent({ ref: "listbox-input" }).exists()).toBe(true);
    });

    // Disabled prop
    it("applies disabled class when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UListbox, {
        props: {
          disabled,
        },
      });

      expect(component.attributes("class")).toContain("opacity-(--vl-disabled-opacity)");
    });

    // AddOption prop
    it("shows add option button when addOption prop is true", () => {
      const addOption = true;

      const component = mount(UListbox, {
        props: {
          addOption,
        },
      });

      expect(component.find("[data-test='add']").exists()).toBe(true);
      expect(component.find("[data-test='add-button']").exists()).toBe(true);
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-listbox-id";

      const component = mount(UListbox, {
        props: {
          id,
        },
      });

      expect(component.find(`#listbox-${id}`).exists()).toBe(true);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-listbox";

      const component = mount(UListbox, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Option slot
    it("renders content from option slot", () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const slotContent = "Custom Option";
      const slotClass = "custom-option";

      const component = mount(UListbox, {
        props: {
          options,
        },
        slots: {
          option: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Before-option slot
    it("renders content from before-option slot", () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const slotContent = "Before";
      const slotClass = "before-option";

      const component = mount(UListbox, {
        props: {
          options,
        },
        slots: {
          "before-option": `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // After-option slot
    it("renders content from after-option slot", () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const slotContent = "After";
      const slotClass = "after-option";

      const component = mount(UListbox, {
        props: {
          options,
        },
        slots: {
          "after-option": `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Empty slot
    it("renders content from empty slot when no options", () => {
      const options = [];
      const slotContent = "No Options Available";
      const slotClass = "empty-slot";

      const component = mount(UListbox, {
        props: {
          options,
        },
        slots: {
          empty: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when option is selected", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];

      const component = mount(UListbox, {
        props: {
          options,
        },
      });

      await component.findAll("[role='option']")[1].trigger("click");
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([2]);
    });

    // Add event
    it("emits add event when add button is clicked", async () => {
      const addOption = true;

      const component = mount(UListbox, {
        props: {
          addOption,
        },
      });

      await component.find("[data-test='add-button']").trigger("click");
      expect(component.emitted("add")).toBeTruthy();
    });

    // ClickOption event
    it("emits clickOption event when option is clicked", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];

      const component = mount(UListbox, {
        props: {
          options,
        },
      });

      await component.findAll("[role='option']")[1].trigger("click");
      expect(component.emitted("clickOption")).toBeTruthy();
    });

    // SearchChange event
    it("emits searchChange event when search input changes", async () => {
      const searchable = true;

      const component = mount(UListbox, {
        props: {
          searchable,
        },
      });

      await component.findComponent({ ref: "listbox-input" }).vm.$emit("update:model-value", "test");
      expect(component.emitted("searchChange")).toBeTruthy();
      expect(component.emitted("searchChange")[0]).toEqual(["test"]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // pointerSet
    it("exposes pointerSet", () => {
      const component = mount(UListbox, {});

      expect(component.vm.pointerSet).toBeDefined();
    });

    // pointerBackward
    it("exposes pointerBackward", () => {
      const component = mount(UListbox, {});

      expect(component.vm.pointerBackward).toBeDefined();
    });

    // pointerForward
    it("exposes pointerForward", () => {
      const component = mount(UListbox, {});

      expect(component.vm.pointerForward).toBeDefined();
    });

    // pointerReset
    it("exposes pointerReset", () => {
      const component = mount(UListbox, {});

      expect(component.vm.pointerReset).toBeDefined();
    });

    // addPointerElement
    it("exposes addPointerElement", () => {
      const component = mount(UListbox, {});

      expect(component.vm.addPointerElement).toBeDefined();
    });

    // optionsRef
    it("exposes optionsRef", () => {
      const component = mount(UListbox, {});

      expect(component.vm.optionsRef).toBeDefined();
    });

    // listboxInputRef
    it("exposes listboxInputRef", () => {
      const component = mount(UListbox, {});

      expect(component.vm.listboxInputRef).toBeDefined();
    });

    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UListbox, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
