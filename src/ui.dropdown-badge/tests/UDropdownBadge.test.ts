import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDropdownBadge from "../UDropdownBadge.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UListbox from "../../ui.form-listbox/UListbox.vue";

import type { Props } from "../types";

describe("UDropdownBadge.vue", () => {
  const defaultOptions = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  describe("Props", () => {
    it("Label – renders the correct label text", () => {
      const label = "Dropdown Badge";

      const component = mount(UDropdownBadge, {
        props: {
          label,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).props("label")).toBe(label);
    });

    it("ModelValue – selects the correct option based on modelValue", async () => {
      const modelValue = 2;

      const component = mount(UDropdownBadge, {
        props: {
          modelValue,
          options: defaultOptions,
        },
      });

      // Find the selected option's label
      const selectedOption = defaultOptions.find((option) => option.value === modelValue);

      expect(component.findComponent(UBadge).props("label")).toBe(selectedOption?.label);
    });

    it("Multiple – handles multiple selections correctly", async () => {
      const modelValue = [1, 3];

      const component = mount(UDropdownBadge, {
        props: {
          modelValue,
          multiple: true,
          options: defaultOptions,
        },
      });

      // Find the selected options' labels
      const selectedOptions = defaultOptions.filter((option) => modelValue.includes(option.value));
      const expectedLabel = selectedOptions.map((option) => option.label).join(", ");

      expect(component.findComponent(UBadge).props("label")).toBe(expectedLabel);
    });

    it("LabelDisplayCount – limits displayed labels based on labelDisplayCount", async () => {
      const modelValue = [1, 2, 3];
      const labelDisplayCount = 1;

      // Should show the first label + count of remaining
      const expectedLabel = "Option 1, +2";

      const component = mount(UDropdownBadge, {
        props: {
          modelValue,
          multiple: true,
          labelDisplayCount,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).props("label")).toBe(expectedLabel);
    });

    it("LabelDisplayCount – displays label correctly with single value", async () => {
      const modelValue = [1];
      const labelDisplayCount = 1;

      // Should show only the selected label without +X suffix
      const expectedLabel = "Option 1";

      const component = mount(UDropdownBadge, {
        props: {
          modelValue,
          multiple: true,
          labelDisplayCount,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).props("label")).toBe(expectedLabel);
    });

    it("Variant – applies the correct variant class", async () => {
      const variants = ["solid", "outlined", "subtle", "soft"];

      variants.forEach((variant) => {
        const component = mount(UDropdownBadge, {
          props: {
            variant: variant as Props["variant"],
            options: defaultOptions,
          },
        });

        expect(component.findComponent(UBadge).props("variant")).toBe(variant);
      });
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
        const component = mount(UDropdownBadge, {
          props: {
            color: color as Props["color"],
            options: defaultOptions,
          },
        });

        expect(component.findComponent(UBadge).props("color")).toBe(color);
      });
    });

    it("Size – applies the correct size class", async () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const component = mount(UDropdownBadge, {
          props: {
            size: size as Props["size"],
            options: defaultOptions,
          },
        });

        expect(component.findComponent(UBadge).props("size")).toBe(size);
      });
    });

    it("Round – applies round class when round prop is true", () => {
      const round = true;

      const component = mount(UDropdownBadge, {
        props: {
          round,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).props("round")).toBe(round);
    });

    it("ToggleIcon – shows default toggle icon when toggleIcon is true", () => {
      const toggleIcon = true;

      const component = mount(UDropdownBadge, {
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

      const component = mount(UDropdownBadge, {
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

      const component = mount(UDropdownBadge, {
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

      const component = mount(UDropdownBadge, {
        props: {
          id,
          options: defaultOptions,
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("id")).toBe(id);
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-dropdown";

      const component = mount(UDropdownBadge, {
        props: {
          dataTest,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).attributes("data-test")).toBe(dataTest);
    });

    it("OptionsLimit – passes optionsLimit prop to UListbox component", async () => {
      const optionsLimit = 2;

      const component = mount(UDropdownBadge, {
        props: {
          optionsLimit,
          options: defaultOptions,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      expect(component.findComponent(UListbox).props("optionsLimit")).toBe(optionsLimit);
    });

    it("VisibleOptions – passes visibleOptions prop to UListbox component", async () => {
      const visibleOptions = 5;

      const component = mount(UDropdownBadge, {
        props: {
          visibleOptions,
          options: defaultOptions,
        },
      });

      await component.findComponent(UBadge).trigger("click");

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

      const component = mount(UDropdownBadge, {
        props: {
          groupLabelKey,
          options: groupedOptions,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      expect(component.findComponent(UListbox).props("groupLabelKey")).toBe(groupLabelKey);
    });

    it("Search v-model – passes search to UListbox and filters", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          searchable: true,
          options: defaultOptions,
          search: "Option 1",
        },
      });

      await component.findComponent(UBadge).trigger("click");

      const listbox = component.getComponent(UListbox);
      const options = listbox.findAll("[vl-child-key='option']");

      expect(options).toHaveLength(1);
      expect(options[0].text()).toBe("Option 1");
    });

    it("CloseOnSelect – keeps dropdown open when closeOnSelect is false", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
          closeOnSelect: false,
        },
      });

      // Open the dropdown
      await component.findComponent(UBadge).trigger("click");
      expect(component.findComponent(UListbox).exists()).toBe(true);

      // Find the listbox component
      const listbox = component.findComponent(UListbox);

      // Simulate selecting an option by emitting update:modelValue from the listbox
      listbox.vm.$emit("update:modelValue", 2);

      // Dropdown should remain open
      expect(component.findComponent(UListbox).exists()).toBe(true);
    });

    it("XPosition – passes xPosition prop to dropdown", () => {
      const component = mount(UDropdownBadge, {
        props: {
          xPosition: "right",
          options: defaultOptions,
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("xPosition")).toBe("right");
    });

    it("YPosition – passes yPosition prop to dropdown", () => {
      const component = mount(UDropdownBadge, {
        props: {
          yPosition: "top",
          options: defaultOptions,
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("yPosition")).toBe("top");
    });

    it("LabelKey – uses custom label key for options", () => {
      const customOptions = [
        { id: 1, name: "First" },
        { id: 2, name: "Second" },
      ];

      const component = mount(UDropdownBadge, {
        props: {
          options: customOptions,
          labelKey: "name",
          valueKey: "id",
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("labelKey")).toBe("name");
    });

    it("ValueKey – uses custom value key for options", () => {
      const customOptions = [
        { id: 1, name: "First" },
        { id: 2, name: "Second" },
      ];

      const component = mount(UDropdownBadge, {
        props: {
          options: customOptions,
          labelKey: "name",
          valueKey: "id",
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("valueKey")).toBe("id");
    });

    it("GroupValueKey – passes groupValueKey prop to dropdown", () => {
      const component = mount(UDropdownBadge, {
        props: {
          groupValueKey: "items",
          options: defaultOptions,
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("groupValueKey")).toBe("items");
    });

    it("Searchable – passes searchable prop to dropdown", () => {
      const component = mount(UDropdownBadge, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("searchable")).toBe(true);
    });

    it("Disabled – applies disabled state correctly", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          disabled: true,
          options: defaultOptions,
        },
      });

      const dropdown = component.findComponent({ name: "UDropdown" });

      expect(dropdown.props("disabled")).toBe(true);
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
      const slotContent = "Custom Content";
      const label = "Dropdown Badge";

      const component = mount(UDropdownBadge, {
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
      const label = "Dropdown Badge";
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UDropdownBadge, {
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
      const label = "Dropdown Badge";
      const slotText = "Toggle";
      const slotClass = "toggle-content";

      const component = mount(UDropdownBadge, {
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
      const label = "Dropdown Badge";
      const slotText = "Before";
      const slotClass = "before-option-content";

      const component = mount(UDropdownBadge, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          "before-option": `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      const listbox = component.findComponent(UListbox);
      const beforeOptionSlot = listbox.find(`.${slotClass}`);

      expect(beforeOptionSlot.exists()).toBe(true);
      expect(beforeOptionSlot.text()).toBe(slotText);
    });

    it("Option – renders custom content from option slot", async () => {
      const label = "Dropdown Badge";
      const slotClass = "custom-option-content";

      const component = mount(UDropdownBadge, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          option: `<span class='${slotClass}'>Custom {{ params.option.label }}</span>`,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      const listbox = component.findComponent(UListbox);
      const customOptionSlot = listbox.find(`.${slotClass}`);

      expect(customOptionSlot.exists()).toBe(true);
      expect(customOptionSlot.text()).toBe("Custom Option 1");
    });

    it("After – renders content from after-option slot", async () => {
      const label = "Dropdown Badge";
      const slotText = "After";
      const slotClass = "after-option-content";

      const component = mount(UDropdownBadge, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          "after-option": `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      const listbox = component.findComponent(UListbox);
      const afterOptionSlot = listbox.find(`.${slotClass}`);

      expect(afterOptionSlot.exists()).toBe(true);
      expect(afterOptionSlot.text()).toBe(slotText);
    });

    it("Empty – renders custom content from empty slot", async () => {
      const label = "Dropdown Badge";
      const slotContent = "No options available";
      const slotClass = "custom-empty";

      const component = mount(UDropdownBadge, {
        props: {
          label,
          options: [],
        },
        slots: {
          empty: `<span class='${slotClass}'>${slotContent}</span>`,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      const listbox = component.findComponent(UListbox);
      const emptySlot = listbox.find(`.${slotClass}`);

      expect(emptySlot.exists()).toBe(true);
      expect(emptySlot.text()).toBe(slotContent);
    });
  });

  describe("Events", () => {
    it("Click – opens dropdown when badge is clicked", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      // Initially, dropdown should be closed
      expect(component.findComponent(UListbox).exists()).toBe(false);

      // Click the badge
      await component.findComponent(UBadge).trigger("click");

      // Dropdown should be open
      expect(component.findComponent(UListbox).exists()).toBe(true);
    });

    it("update:modelValue – emits update:modelValue event when an option is selected", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      // Open the dropdown
      await component.findComponent(UBadge).trigger("click");

      // Find the listbox component
      const listbox = component.findComponent(UListbox);

      // Simulate selecting an option by emitting update:modelValue from the listbox
      listbox.vm.$emit("update:modelValue", 2);

      // Check if the event was emitted with the correct value
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([2]);
    });

    it("clickOption – emits clickOption event when an option is clicked", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      // Open the dropdown
      await component.findComponent(UBadge).trigger("click");

      // Find the listbox component
      const listbox = component.findComponent(UListbox);

      // Simulate clicking an option by emitting clickOption from the listbox
      listbox.vm.$emit("clickOption", defaultOptions[1]);

      // Check if the event was emitted with the correct value
      expect(component.emitted("clickOption")).toBeTruthy();
      expect(component.emitted("clickOption")?.[0]).toEqual([defaultOptions[1]]);
    });

    it("Close – closes dropdown when clicking outside", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      // Open the dropdown
      await component.findComponent(UBadge).trigger("click");
      expect(component.findComponent(UListbox).exists()).toBe(true);

      // Directly call the hide function
      // This is equivalent to what happens when clicking outside
      component.vm.hide();
      await component.vm.$nextTick();

      // Dropdown should be closed
      expect(component.findComponent(UListbox).exists()).toBe(false);
    });

    it("Open – emits open event when dropdown is opened", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      expect(component.emitted("open")).toBeTruthy();
    });

    it("Close – emits close event when dropdown is closed", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      component.vm.hide();
      await component.vm.$nextTick();

      expect(component.emitted("close")).toBeTruthy();
    });

    it("SearchChange – emits searchChange event when search value changes", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      const dropdown = component.findComponent({ name: "UDropdown" });

      dropdown.vm.$emit("searchChange", "test query");

      expect(component.emitted("searchChange")).toBeTruthy();
      expect(component.emitted("searchChange")?.[0]).toEqual(["test query"]);
    });

    it("Update:search – emits update:search event when search value updates", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      await component.findComponent(UBadge).trigger("click");

      const dropdown = component.findComponent({ name: "UDropdown" });

      dropdown.vm.$emit("update:search", "new search");

      expect(component.emitted("update:search")).toBeTruthy();
      expect(component.emitted("update:search")?.[0]).toEqual(["new search"]);
    });
  });

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
