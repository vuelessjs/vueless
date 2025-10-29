import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDropdownLink from "../UDropdownLink.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UListbox from "../../ui.form-listbox/UListbox.vue";

import type { Props } from "../types";

describe("UDropdownLink.vue", () => {
  const defaultOptions = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  describe("Props", () => {
    it("Label – renders the correct label text", () => {
      const label = "Dropdown Link";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("label")).toBe(label);
    });

    it("ModelValue – selects the correct option based on modelValue", async () => {
      const modelValue = 2;

      const component = mount(UDropdownLink, {
        props: {
          modelValue,
          options: defaultOptions,
        },
      });

      // Find the selected option's label
      const selectedOption = defaultOptions.find((option) => option.value === modelValue);

      expect(component.findComponent(ULink).props("label")).toBe(selectedOption?.label);
    });

    it("Multiple – handles multiple selections correctly", async () => {
      const modelValue = [1, 3];

      const component = mount(UDropdownLink, {
        props: {
          modelValue,
          multiple: true,
          options: defaultOptions,
        },
      });

      // Find the selected options' labels
      const selectedOptions = defaultOptions.filter((option) => modelValue.includes(option.value));
      const expectedLabel = selectedOptions.map((option) => option.label).join(", ");

      expect(component.findComponent(ULink).props("label")).toBe(expectedLabel);
    });

    it("LabelDisplayCount – limits displayed labels based on labelDisplayCount", async () => {
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

    it("LabelDisplayCount – displays label correctly with single value", async () => {
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

    it("Color – applies the correct color class", async () => {
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

    it("Size – applies the correct size class", async () => {
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

    it("Underlined – applies underlined class when underlined prop is true", () => {
      const underlined = true;

      const component = mount(UDropdownLink, {
        props: {
          underlined,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("underlined")).toBe(underlined);
    });

    it("Dashed – applies dashed class when dashed prop is true", () => {
      const dashed = true;

      const component = mount(UDropdownLink, {
        props: {
          dashed,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("dashed")).toBe(dashed);
    });

    it("Disabled – applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UDropdownLink, {
        props: {
          disabled,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).props("disabled")).toBe(disabled);
    });

    it("ToggleIcon – shows default toggle icon when toggleIcon is true", () => {
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

    it("ToggleIcon – hides toggle icon when toggleIcon is false", () => {
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

    it("ToggleIcon – shows custom toggle icon when toggleIcon is a string", () => {
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

    it("ID – applies the correct id attribute", () => {
      const id = "test-dropdown-id";

      const component = mount(UDropdownLink, {
        props: {
          id,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).attributes("id")).toBe(id);
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-dropdown";

      const component = mount(UDropdownLink, {
        props: {
          dataTest,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(ULink).attributes("data-test")).toBe(dataTest);
    });

    it("OptionsLimit – passes optionsLimit prop to UListbox component", async () => {
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

    it("VisibleOptions – passes visibleOptions prop to UListbox component", async () => {
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

    it("GroupLabelKey – passes groupLabelKey prop to UListbox component", async () => {
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

    it("Search v-model – passes search to UListbox and filters", async () => {
      const component = mount(UDropdownLink, {
        props: {
          searchable: true,
          options: defaultOptions,
          search: "Option 3",
        },
      });

      await component.findComponent(ULink).trigger("click");

      const listbox = component.getComponent(UListbox);
      const options = listbox.findAll("[vl-child-key='option']");

      expect(options).toHaveLength(1);
      expect(options[0].text()).toBe("Option 3");
    });

    it("CloseOnSelect – keeps dropdown open when closeOnSelect is false", async () => {
      const component = mount(UDropdownLink, {
        props: {
          options: defaultOptions,
          closeOnSelect: false,
        },
      });

      // Open the dropdown
      await component.findComponent(ULink).trigger("click");
      expect(component.findComponent(UListbox).exists()).toBe(true);

      // Find the listbox component
      const listbox = component.findComponent(UListbox);

      // Simulate selecting an option by emitting update:modelValue from the listbox
      listbox.vm.$emit("update:modelValue", 2);

      // Dropdown should remain open
      expect(component.findComponent(UListbox).exists()).toBe(true);
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
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

    it("Left – renders content from left slot", () => {
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

    it("Toggle – renders content from toggle slot", () => {
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

    it("Before – renders content from before-option slot", async () => {
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

    it("Option – renders custom content from option slot", async () => {
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

    it("After – renders content from after-option slot", async () => {
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

    it("Empty – renders custom content from empty slot", async () => {
      const label = "Dropdown Link";
      const slotContent = "No options available";
      const slotClass = "custom-empty";

      const component = mount(UDropdownLink, {
        props: {
          label,
          options: [],
        },
        slots: {
          empty: `<span class='${slotClass}'>${slotContent}</span>`,
        },
      });

      await component.findComponent(ULink).trigger("click");

      const listbox = component.findComponent(UListbox);
      const emptySlot = listbox.find(`.${slotClass}`);

      expect(emptySlot.exists()).toBe(true);
      expect(emptySlot.text()).toBe(slotContent);
    });
  });

  describe("Events", () => {
    it("Click – opens dropdown when link is clicked", async () => {
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

    it("update:modelValue – emits update:modelValue event when an option is selected", async () => {
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

    it("clickOption – emits clickOption event when an option is clicked", async () => {
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

    it("Close – closes dropdown when clicking outside", async () => {
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

    it("No – does not toggle dropdown when disabled", async () => {
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

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UDropdownLink, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
