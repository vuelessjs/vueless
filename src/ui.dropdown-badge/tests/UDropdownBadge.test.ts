import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDropdownBadge from "../UDropdownBadge.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UListbox from "../../ui.form-listbox/UListbox.vue";

import type { Props } from "../types.ts";

describe("UDropdownBadge.vue", () => {
  const defaultOptions = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  // Props tests
  describe("Props", () => {
    // Label prop
    it("renders the correct label text", () => {
      const label = "Dropdown Badge";

      const component = mount(UDropdownBadge, {
        props: {
          label,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).props("label")).toBe(label);
    });

    // ModelValue prop
    it("selects the correct option based on modelValue", async () => {
      const modelValue = 2;

      const component = mount(UDropdownBadge, {
        props: {
          modelValue,
          options: defaultOptions,
        },
      });

      // Find the selected option's label
      const selectedOption = defaultOptions.find((option) => option.id === modelValue);

      expect(component.findComponent(UBadge).props("label")).toBe(selectedOption?.label);
    });

    // Multiple prop with modelValue
    it("handles multiple selections correctly", async () => {
      const modelValue = [1, 3];

      const component = mount(UDropdownBadge, {
        props: {
          modelValue,
          multiple: true,
          options: defaultOptions,
        },
      });

      // Find the selected options' labels
      const selectedOptions = defaultOptions.filter((option) => modelValue.includes(option.id));
      const expectedLabel = selectedOptions.map((option) => option.label).join(", ");

      expect(component.findComponent(UBadge).props("label")).toBe(expectedLabel);
    });

    // LabelDisplayCount prop
    it("limits displayed labels based on labelDisplayCount", async () => {
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

    // LabelDisplayCount prop with single value
    it("correctly displays label when labelDisplayCount is 1 and only one value is selected", async () => {
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

    // Variant prop
    it("applies the correct variant class", async () => {
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
        const component = mount(UDropdownBadge, {
          props: {
            color: color as Props["color"],
            options: defaultOptions,
          },
        });

        expect(component.findComponent(UBadge).props("color")).toBe(color);
      });
    });

    // Size prop
    it("applies the correct size class", async () => {
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

    // Round prop
    it("applies round class when round prop is true", () => {
      const round = true;

      const component = mount(UDropdownBadge, {
        props: {
          round,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).props("round")).toBe(round);
    });

    // ToggleIcon prop (boolean: true)
    it("shows default toggle icon when toggleIcon is true", () => {
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

    // ToggleIcon prop (boolean: false)
    it("hides toggle icon when toggleIcon is false", () => {
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

    // ToggleIcon prop (string)
    it("shows custom toggle icon when toggleIcon is a string", () => {
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

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-dropdown-id";

      const component = mount(UDropdownBadge, {
        props: {
          id,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).props("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-dropdown";

      const component = mount(UDropdownBadge, {
        props: {
          dataTest,
          options: defaultOptions,
        },
      });

      expect(component.findComponent(UBadge).attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
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

    // Left slot
    it("renders content from left slot", () => {
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

    // Toggle slot
    it("renders content from toggle slot", () => {
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
  });

  // Events tests
  describe("Events", () => {
    // Click event to open dropdown
    it("opens dropdown when badge is clicked", async () => {
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

    // update:modelValue event
    it("emits update:modelValue event when an option is selected", async () => {
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

    // clickOption event
    it("emits clickOption event when an option is clicked", async () => {
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

    // Close dropdown when clicking outside
    it("closes dropdown when clicking outside", async () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      // Open the dropdown
      await component.findComponent(UBadge).trigger("click");
      expect(component.findComponent(UListbox).exists()).toBe(true);

      // Directly call the hideOptions function
      // This is equivalent to what happens when clicking outside
      component.vm.hideOptions();
      await component.vm.$nextTick();

      // Dropdown should be closed
      expect(component.findComponent(UListbox).exists()).toBe(false);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UDropdownBadge, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
