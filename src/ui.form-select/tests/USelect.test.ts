import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USelect from "../USelect.vue";
import UListbox from "../../ui.form-listbox/UListbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("USelect.vue", () => {
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
        const component = mount(USelect, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.findComponent(ULabel).attributes("class")).toContain(classes);
      });
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Select Label";

      const component = mount(USelect, {
        props: {
          label,
        },
      });

      expect(component.findComponent(ULabel).text()).toBe(label);
    });

    // LabelAlign prop
    it("applies the correct label align class", async () => {
      const labelAlign = {
        topInside: "group/placement-inside",
        top: "group/placement-top",
        topWithDesc: "group/placement-top-with-desc",
        left: "group/placement-left",
        right: "group/placement-right",
      };

      Object.entries(labelAlign).forEach(([align, classes]) => {
        const component = mount(USelect, {
          props: {
            label: "Label",
            labelAlign: align as Props["labelAlign"],
          },
        });

        expect(component.findComponent(ULabel).attributes("class")).toContain(classes);
      });
    });

    // Placeholder prop
    it("renders the correct placeholder text", () => {
      const placeholder = "Select an option";

      const component = mount(USelect, {
        props: {
          placeholder,
        },
      });

      expect(component.text()).toContain(placeholder);
    });

    // Description prop
    it("renders the correct description text", () => {
      const description = "This is a description";

      const component = mount(USelect, {
        props: {
          description,
        },
      });

      expect(component.findComponent(ULabel).text()).toContain(description);
    });

    // Error prop
    it("applies error class when error prop is provided", () => {
      const error = "This is an error message";

      const component = mount(USelect, {
        props: {
          error,
        },
      });

      expect(component.findComponent(ULabel).attributes("class")).toContain("text-error");
      expect(component.findComponent(ULabel).text()).toContain(error);
    });

    // LeftIcon prop
    it("renders left icon when leftIcon prop is provided", () => {
      const leftIcon = "search";

      const component = mount(USelect, {
        props: {
          leftIcon,
        },
      });

      const iconComponent = component.findAllComponents(UIcon)[0];

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(leftIcon);
    });

    // RightIcon prop
    it("renders right icon when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(USelect, {
        props: {
          rightIcon,
        },
      });

      const iconComponent = component.findAllComponents(UIcon)[0];

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(rightIcon);
    });

    // ToggleIcon prop
    it("renders toggle icon when toggleIcon prop is provided", () => {
      const toggleIcon = "arrow_down";

      const component = mount(USelect, {
        props: {
          toggleIcon,
        },
      });

      const iconComponent = component.findAllComponents(UIcon)[0];

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(toggleIcon);
    });

    // Options prop
    it("passes options to UListbox when dropdown is open", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
        { id: 3, label: "Option 3" },
      ];

      const component = mount(USelect, {
        props: {
          options,
        },
      });

      // Open the dropdown
      await component.find("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);

      expect(listbox.exists()).toBe(true);
      expect(listbox.props("options")).toEqual(options);
    });

    // ModelValue prop
    it("displays the selected option label when modelValue is provided", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
        { id: 3, label: "Option 3" },
      ];
      const modelValue = 2;

      const component = mount(USelect, {
        props: {
          options,
          modelValue,
        },
      });

      expect(component.text()).toContain("Option 2");
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

      const component = mount(USelect, {
        props: {
          options,
          modelValue,
          multiple,
        },
      });

      expect(component.text()).toContain("Option 1");
      expect(component.text()).toContain("Option 3");
    });

    // MultipleVariant prop
    it("applies the correct multiple variant class", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const modelValue = [1, 2];
      const multiple = true;
      const multipleVariant = {
        inline: "flex order-last",
        list: "flex flex-col col-span-2",
        badge: "flex gap-1 flex-wrap",
      };

      Object.entries(multipleVariant).forEach(([variant, classes]) => {
        const component = mount(USelect, {
          props: {
            options,
            modelValue,
            multiple,
            multipleVariant: variant as Props["multipleVariant"],
          },
        });

        expect(component.find("[class*='selectedLabels']").attributes("class")).toContain(classes);
      });
    });

    // Searchable prop
    it("passes searchable prop to UListbox when dropdown is open", async () => {
      const searchable = true;

      const component = mount(USelect, {
        props: {
          searchable,
        },
      });

      // Open the dropdown
      await component.find("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);

      expect(listbox.props("searchable")).toBe(searchable);
    });

    // Disabled prop
    it("applies disabled class when disabled prop is true", () => {
      const disabled = true;

      const component = mount(USelect, {
        props: {
          disabled,
        },
      });

      expect(component.find("[role='combobox']").attributes("class")).toContain("bg-lifted");
    });

    // Readonly prop
    it("prevents dropdown from opening when readonly prop is true", async () => {
      const readonly = true;

      const component = mount(USelect, {
        props: {
          readonly,
        },
      });

      // Try to open the dropdown
      await component.find("[role='combobox']").trigger("focus");

      expect(component.findComponent(UListbox).exists()).toBe(false);
    });

    // Clearable prop
    it("shows clear button when clearable prop is true and value is selected", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const modelValue = 1;
      const clearable = true;

      const component = mount(USelect, {
        props: {
          options,
          modelValue,
          clearable,
        },
      });

      expect(component.find("[data-test='clear']").exists()).toBe(true);
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-select-id";

      const component = mount(USelect, {
        props: {
          id,
        },
      });

      expect(component.find(`[aria-owns='listbox-${id}']`).exists()).toBe(true);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-select";

      const component = mount(USelect, {
        props: {
          dataTest,
        },
      });

      expect(component.findComponent(ULabel).attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const label = "Select Label";
      const slotContent = "Custom Label";
      const slotClass = "custom-label";

      const component = mount(USelect, {
        props: {
          label,
        },
        slots: {
          label: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Left slot
    it("renders content from left slot", () => {
      const slotContent = "Left";
      const slotClass = "left-content";

      const component = mount(USelect, {
        slots: {
          left: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Right slot
    it("renders content from right slot", () => {
      const slotContent = "Right";
      const slotClass = "right-content";

      const component = mount(USelect, {
        slots: {
          right: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Toggle slot
    it("renders content from toggle slot", () => {
      const slotContent = "Toggle";
      const slotClass = "toggle-content";

      const component = mount(USelect, {
        slots: {
          toggle: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Clear slot
    it("renders content from clear slot when value is selected", () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const modelValue = 1;
      const slotContent = "Clear";
      const slotClass = "clear-content";

      const component = mount(USelect, {
        props: {
          options,
          modelValue,
          clearable: true,
        },
        slots: {
          clear: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Selected-option slot
    it("renders content from selected-option slot when value is selected", () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const modelValue = 1;
      const slotContent = "Selected Option";
      const slotClass = "selected-option-content";

      const component = mount(USelect, {
        props: {
          options,
          modelValue,
        },
        slots: {
          "selected-option": `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("emits click event when clicked", async () => {
      const component = mount(USelect, {});

      await component.find("[role='combobox']").trigger("click");
      expect(component.emitted("click")).toBeTruthy();
    });

    // Open event
    it("emits open event when dropdown is opened", async () => {
      const component = mount(USelect, {});

      await component.find("[role='combobox']").trigger("focus");
      expect(component.emitted("open")).toBeTruthy();
    });

    // Close event
    it("emits close event when dropdown is closed", async () => {
      const component = mount(USelect, {});

      // Open the dropdown
      await component.find("[role='combobox']").trigger("focus");
      // Close the dropdown
      await component.find("[role='combobox']").trigger("keyup.esc");

      expect(component.emitted("close")).toBeTruthy();
    });

    // Update:modelValue event
    it("emits update:modelValue event when option is selected", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];

      const component = mount(USelect, {
        props: {
          options,
        },
      });

      // Open the dropdown
      await component.find("[role='combobox']").trigger("focus");

      // Simulate option selection by emitting from UListbox
      await component.findComponent(UListbox).vm.$emit("update:modelValue", 2);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([2]);
    });

    // Change event
    it("emits change event when option is selected", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];

      const component = mount(USelect, {
        props: {
          options,
        },
      });

      // Open the dropdown
      await component.find("[role='combobox']").trigger("focus");

      // Simulate option selection by emitting from UListbox
      await component.findComponent(UListbox).vm.$emit("update:modelValue", 2);

      expect(component.emitted("change")).toBeTruthy();
    });

    // Remove event
    it("emits remove event when option is removed", async () => {
      const options = [
        { id: 1, label: "Option 1" },
        { id: 2, label: "Option 2" },
      ];
      const modelValue = [1, 2];
      const multiple = true;

      const component = mount(USelect, {
        props: {
          options,
          modelValue,
          multiple,
        },
      });

      // Click the clear item button
      await component.find("[data-test='clear-item']").trigger("click");

      expect(component.emitted("remove")).toBeTruthy();
    });

    // Add event
    it("emits add event when add button is clicked", async () => {
      const addOption = true;

      const component = mount(USelect, {
        props: {
          addOption,
        },
      });

      // Open the dropdown
      await component.find("[role='combobox']").trigger("focus");

      // Simulate add option by emitting from UListbox
      await component.findComponent(UListbox).vm.$emit("add");

      expect(component.emitted("add")).toBeTruthy();
    });

    // SearchChange event
    it("emits searchChange event when search input changes", async () => {
      const searchable = true;

      const component = mount(USelect, {
        props: {
          searchable,
        },
      });

      // Open the dropdown
      await component.find("[role='combobox']").trigger("focus");

      // Simulate search change by emitting from UListbox
      await component.findComponent(UListbox).vm.$emit("searchChange", "test");

      expect(component.emitted("searchChange")).toBeTruthy();
      expect(component.emitted("searchChange")[0]).toEqual(["test"]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // listboxRef
    it("exposes listboxRef", () => {
      const component = mount(USelect, {});

      expect(component.vm.listboxRef).toBeDefined();
    });

    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(USelect, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });

    // labelComponentRef
    it("exposes labelComponentRef", () => {
      const component = mount(USelect, {});

      expect(component.vm.labelComponentRef).toBeDefined();
    });

    // leftSlotWrapperRef
    it("exposes leftSlotWrapperRef", () => {
      const component = mount(USelect, {});

      expect(component.vm.leftSlotWrapperRef).toBeDefined();
    });

    // innerWrapperRef
    it("exposes innerWrapperRef", () => {
      const component = mount(USelect, {});

      expect(component.vm.innerWrapperRef).toBeDefined();
    });
  });
});
