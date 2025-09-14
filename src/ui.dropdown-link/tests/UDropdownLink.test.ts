import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDropdownLink from "../UDropdownLink.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UListbox from "../../ui.form-listbox/UListbox.vue";

import type { Props } from "../types";

describe("UDropdownLink.vue", () => {
  const defaultOptions = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  // Props tests
  describe("Props", () => {
    // Label prop
    it("renders the correct label text", () => {
      const label = "Dropdown Link";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("label")).toBe(label);
    });

    // ModelValue prop
    it("selects the correct option based on modelValue", async () => {
      const modelValue = 2;

      const component = mount(UDropdownLink, {
        props: {
          modelValue,
          options: defaultOptions,
        },
      });

      // Find the selected option's label
      const selectedOption = defaultOptions.find((option) => option.id === modelValue);

      expect(component.findComponent(ULink).props("label")).toBe(selectedOption?.label);
    });

    // Multiple prop with modelValue
    it("handles multiple selections correctly", async () => {
      const modelValue = [1, 3];

      const component = mount(UDropdownLink, {
        props: {
          modelValue,
          multiple: true,
          options: defaultOptions,
        },
      });

      // Find the selected options' labels
      const selectedOptions = defaultOptions.filter((option) => modelValue.includes(option.id));
      const expectedLabel = selectedOptions.map((option) => option.label).join(", ");

      expect(component.findComponent(ULink).props("label")).toBe(expectedLabel);
    });

    // LabelDisplayCount prop
    it("limits displayed labels based on labelDisplayCount", async () => {
      const modelValue = [1, 2, 3];
      const labelDisplayCount = 1;

      // Should show the first label + count of remaining
      const expectedLabel = "Option 1, +2";

      const component = mount(UDropdownLink, {
        props: {
          modelValue,
          multiple: true,
          labelDisplayCount,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("label")).toBe(expectedLabel);
    });

    // LabelDisplayCount prop with single value
    it("correctly displays label when labelDisplayCount is 1 and only one value is selected", async () => {
      const modelValue = [1];
      const labelDisplayCount = 1;

      // Should show only the selected label without +X suffix
      const expectedLabel = "Option 1";

      const component = mount(UDropdownLink, {
        props: {
          modelValue,
          multiple: true,
          labelDisplayCount,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("label")).toBe(expectedLabel);
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
        const component = mount(UDropdownLink, {
          props: {
            color: color as Props["color"],
            options: defaultOptions,
          },
        });

        expect(component.findComponent(ULink).props("color")).toBe(color);
      });
    });

    // Size prop
    it("applies the correct size class", async () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const component = mount(UDropdownLink, {
          props: {
            size: size as Props["size"],
            options: defaultOptions,
          },
        });

        expect(component.findComponent(ULink).props("size")).toBe(size);
      });
    });

    // Underlined prop
    it("applies underlined class when underlined prop is true", () => {
      const underlined = true;

      const component = mount(UDropdownLink, {
        props: {
          underlined,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("underlined")).toBe(underlined);
    });

    // Dashed prop
    it("applies dashed class when dashed prop is true", () => {
      const dashed = true;

      const component = mount(UDropdownLink, {
        props: {
          dashed,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("dashed")).toBe(dashed);
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UDropdownLink, {
        props: {
          disabled,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("disabled")).toBe(disabled);
    });

    // ToggleIcon prop (boolean: true)
    it("shows default toggle icon when toggleIcon is true", () => {
      const toggleIcon = true;

      const component = mount(UDropdownLink, {
        props: {
          toggleIcon,
          options: defaultOptions,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe("keyboard_arrow_down");
    });

    // ToggleIcon prop (boolean: false)
    it("hides toggle icon when toggleIcon is false", () => {
      const toggleIcon = false;

      const component = mount(UDropdownLink, {
        props: {
          toggleIcon,
          options: defaultOptions,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(false);
    });

    // ToggleIcon prop (string)
    it("shows custom toggle icon when toggleIcon is a string", () => {
      const toggleIcon = "custom_icon";

      const component = mount(UDropdownLink, {
        props: {
          toggleIcon,
          options: defaultOptions,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(toggleIcon);
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-dropdown-id";

      const component = mount(UDropdownLink, {
        props: {
          id,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).attributes("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-dropdown";

      const component = mount(UDropdownLink, {
        props: {
          dataTest,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).attributes("data-test")).toBe(dataTest);
    });

    // OptionsLimit prop
    it("passes optionsLimit prop to UListbox component", async () => {
      const optionsLimit = 2;

      const component = mount(UDropdownLink, {
        props: {
          optionsLimit,
          options: defaultOptions,
        },
      });

      await component.findComponent(ULink).trigger("click");

      expect(component.findComponent(UListbox).props("optionsLimit")).toBe(optionsLimit);
    });

    // VisibleOptions prop
    it("passes visibleOptions prop to UListbox component", async () => {
      const visibleOptions = 5;

      const component = mount(UDropdownLink, {
        props: {
          visibleOptions,
          options: defaultOptions,
        },
      });

      await component.findComponent(ULink).trigger("click");

      expect(component.findComponent(UListbox).props("visibleOptions")).toBe(visibleOptions);
    });

    // GroupLabelKey prop
    it("passes groupLabelKey prop to UListbox component", async () => {
      const groupLabelKey = "category";
      const groupedOptions = [
        { groupLabel: "Group 1", category: "group1" },
        { label: "Option 1", id: "option1", category: "group1" },
        { groupLabel: "Group 2", category: "group2" },
        { label: "Option 2", id: "option2", category: "group2" },
      ];

      const component = mount(UDropdownLink, {
        props: {
          groupLabelKey,
          options: groupedOptions,
        },
      });

      await component.findComponent(ULink).trigger("click");

      expect(component.findComponent(UListbox).props("groupLabelKey")).toBe(groupLabelKey);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Content";
      const label = "Dropdown Link";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    // Left slot
    it("renders content from left slot", () => {
      const label = "Dropdown Link";
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Toggle slot
    it("renders content from toggle slot", () => {
      const label = "Dropdown Link";
      const slotText = "Toggle";
      const slotClass = "toggle-content";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          toggle: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Before-option slot
    it("renders content from before-option slot", async () => {
      const label = "Dropdown Link";
      const slotText = "Before";
      const slotClass = "before-option-content";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          "before-option": `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      await component.findComponent(ULink).trigger("click");

      const listbox = component.findComponent(UListbox);
      const beforeOptionSlot = listbox.find(`.${slotClass}`);

      expect(beforeOptionSlot.exists()).toBe(true);
      expect(beforeOptionSlot.text()).toBe(slotText);
    });

    // Option slot
    it("renders custom content from option slot", async () => {
      const label = "Dropdown Link";
      const slotClass = "custom-option-content";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          option: `<span class='${slotClass}'>Custom {{ params.option.label }}</span>`,
        },
      });

      await component.findComponent(ULink).trigger("click");

      const listbox = component.findComponent(UListbox);
      const customOptionSlot = listbox.find(`.${slotClass}`);

      expect(customOptionSlot.exists()).toBe(true);
      expect(customOptionSlot.text()).toBe("Custom Option 1");
    });

    // After-option slot
    it("renders content from after-option slot", async () => {
      const label = "Dropdown Link";
      const slotText = "After";
      const slotClass = "after-option-content";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          "after-option": `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      await component.findComponent(ULink).trigger("click");

      const listbox = component.findComponent(UListbox);
      const afterOptionSlot = listbox.find(`.${slotClass}`);

      expect(afterOptionSlot.exists()).toBe(true);
      expect(afterOptionSlot.text()).toBe(slotText);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event to open dropdown
    it("opens dropdown when link is clicked", async () => {
      const component = mount(UDropdownLink, {
        props: {
          options: defaultOptions,
        },
      });

      // Initially, dropdown should be closed
      expect(component.findComponent(UListbox).exists()).toBe(false);

      // Click the link
      await component.findComponent(ULink).trigger("click");

      // Dropdown should be open
      expect(component.findComponent(UListbox).exists()).toBe(true);
    });

    // update:modelValue event
    it("emits update:modelValue event when an option is selected", async () => {
      const component = mount(UDropdownLink, {
        props: {
          options: defaultOptions,
        },
      });

      // Open the dropdown
      await component.findComponent(ULink).trigger("click");

      // Find the listbox component
      const listbox = component.findComponent(UListbox);

      // Simulate selecting an option by emitting update:modelValue from the listbox
      listbox.vm.$emit("update:modelValue", 2);

      // Check if the event was emitted with the correct value
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([2]);
    });

    // clickOption event
    it("emits clickOption event when an option is clicked", async () => {
      const component = mount(UDropdownLink, {
        props: {
          options: defaultOptions,
        },
      });

      // Open the dropdown
      await component.findComponent(ULink).trigger("click");

      // Find the listbox component
      const listbox = component.findComponent(UListbox);

      // Simulate clicking an option by emitting clickOption from the listbox
      const option = defaultOptions[1];

      listbox.vm.$emit("clickOption", option);

      // Check if the event was emitted with the correct value
      expect(component.emitted("clickOption")).toBeTruthy();
      expect(component.emitted("clickOption")?.[0]).toEqual([option]);
    });

    // Close dropdown when clicking outside
    it("closes dropdown when clicking outside", async () => {
      const component = mount(UDropdownLink, {
        props: {
          options: defaultOptions,
        },
      });

      // Open the dropdown
      await component.findComponent(ULink).trigger("click");
      expect(component.findComponent(UListbox).exists()).toBe(true);

      // Directly call the hideOptions function
      // This is equivalent to what happens when clicking outside
      component.vm.hideOptions();
      await component.vm.$nextTick();

      // Dropdown should be closed
      expect(component.findComponent(UListbox).exists()).toBe(false);
    });

    // No dropdown toggle when disabled
    it("does not toggle dropdown when disabled", async () => {
      const component = mount(UDropdownLink, {
        props: {
          disabled: true,
          options: defaultOptions,
        },
      });

      // Initially, dropdown should be closed
      expect(component.findComponent(UListbox).exists()).toBe(false);

      // Click the link
      await component.findComponent(ULink).trigger("click");

      // Dropdown should still be closed
      expect(component.findComponent(UListbox).exists()).toBe(false);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UDropdownLink, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
