import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import USelect from "../USelect.vue";
import UListbox from "../../ui.form-listbox/UListbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Props } from "../types";

describe("USelect.vue", () => {
  const defaultOptions = [
    { label: "Option 1", id: "option1" },
    { label: "Option 2", id: "option2" },
    { label: "Option 3", id: "option3" },
  ];

  describe("Props", () => {
    it("Model Value – sets initial value correctly for single selection", async () => {
      const initialValue = "option1";

      const component = mount(USelect, {
        props: {
          modelValue: initialValue,
          options: defaultOptions,
        },
      });

      expect(component.find("[vl-key='innerWrapper']").text()).toContain("Option 1");
    });

    it("Model Value – sets initial value correctly for multiple selection", async () => {
      const initialValue = ["option1", "option2"];

      const component = mount(USelect, {
        props: {
          modelValue: initialValue,
          options: defaultOptions,
          multiple: true,
        },
      });

      expect(component.text()).toContain(defaultOptions[0].label);
      expect(component.text()).toContain(defaultOptions[1].label);
    });

    it("Model Value – updates value on option selection", async () => {
      const component = mount(USelect, {
        props: {
          modelValue: "",
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);
      const firstOption = listbox.find("[vl-child-key='option']");

      await firstOption.trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe("option1");
    });

    it("Options – passes options to UListbox component", async () => {
      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("options")).toEqual(defaultOptions);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(USelect, {
        props: {
          label: labelText,
          options: defaultOptions,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Label Align – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "left";

      const component = mount(USelect, {
        props: {
          label: "Test Label",
          labelAlign,
          options: defaultOptions,
        },
      });

      expect(component.getComponent(ULabel).props("align")).toBe(labelAlign);
    });

    it("Placeholder – displays placeholder when no value is selected", () => {
      const placeholderText = "Select an option";

      const component = mount(USelect, {
        props: {
          placeholder: placeholderText,
          options: defaultOptions,
        },
      });

      expect(component.find("[vl-key='placeholder']").text()).toBe(placeholderText);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(USelect, {
        props: {
          description: descriptionText,
          options: defaultOptions,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(descriptionText);
    });

    it("Error – passes error message to ULabel component", () => {
      const errorText = "This is an error";

      const component = mount(USelect, {
        props: {
          error: errorText,
          options: defaultOptions,
        },
      });

      expect(component.getComponent(ULabel).props("error")).toBe(errorText);
    });

    it("Size – passes size prop to ULabel component", () => {
      const sizeClasses = ["sm", "md", "lg"];

      sizeClasses.forEach((size) => {
        const component = mount(USelect, {
          props: {
            size: size as Props["size"],
            options: defaultOptions,
          },
        });

        expect(component.getComponent(ULabel).props("size")).toBe(size);
      });
    });

    it("Left Icon – renders left icon when leftIcon prop is provided", async () => {
      const leftIcon = "search";

      const component = mount(USelect, {
        props: {
          leftIcon,
          options: defaultOptions,
        },
      });

      const iconComponents = component.findAllComponents(UIcon);
      const leftIconComponent = iconComponents.find((icon) => icon.props("name") === leftIcon);

      expect(leftIconComponent?.exists()).toBe(true);
      expect(leftIconComponent?.props("name")).toBe(leftIcon);
    });

    it("Right Icon – renders right icon when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(USelect, {
        props: {
          rightIcon,
          options: defaultOptions,
        },
      });

      const iconComponents = component.findAllComponents(UIcon);
      const rightIconComponent = iconComponents.find((icon) => icon.props("name") === rightIcon);

      expect(rightIconComponent?.exists()).toBe(true);
    });

    it("Toggle Icon – renders toggle icon", () => {
      const component = mount(USelect, {
        props: {
          toggleIcon: true,
          options: defaultOptions,
        },
      });

      const iconComponents = component.findAllComponents(UIcon);
      const toggleIconComponent = iconComponents.find(
        (icon) => icon.props("name") === "keyboard_arrow_down",
      );

      expect(toggleIconComponent?.exists()).toBe(true);
    });

    it("Multiple Variant Badge – renders badges for selected options", async () => {
      const badgeAmount = 2;

      const component = mount(USelect, {
        props: {
          multiple: true,
          multipleVariant: "badge",
          modelValue: ["option1", "option2"],
          options: defaultOptions,
        },
      });

      const badges = component.findAllComponents(UBadge);

      expect(badges.length).toBe(badgeAmount);
    });

    it("Label Display Count – controls how many selected option labels are shown", async () => {
      const component = mount(USelect, {
        props: {
          multiple: true,
          modelValue: ["option1", "option2", "option3"],
          options: defaultOptions,
          labelDisplayCount: 2,
        },
      });

      await flushPromises();

      const selectedLabelElement = component.find("[vl-key='selectedLabel']");
      const labelCounterElement = component.find("[vl-key='counter']");

      expect(selectedLabelElement.text()).toContain(defaultOptions[0].label);
      expect(selectedLabelElement.text()).toContain(defaultOptions[1].label);
      expect(labelCounterElement.text()).toContain("+1");
    });

    it("Searchable – passes searchable prop to UListbox", async () => {
      const component = mount(USelect, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("searchable")).toBe(true);
    });

    it("Search v-model – passes search to UListbox and filters", async () => {
      const component = mount(USelect, {
        props: {
          searchable: true,
          options: defaultOptions,
          search: "Option 2",
        },
      });

      await component.get("[role='combobox']").trigger("focus");
      await flushPromises();

      const listbox = component.getComponent(UListbox);
      const options = listbox.findAll("[vl-child-key='option']");

      expect(options).toHaveLength(1);
      expect(options[0].text()).toBe("Option 2");
    });

    it("Clearable – renders clear icon when true", async () => {
      const component = mount(USelect, {
        props: {
          clearable: true,
          modelValue: "option1",
          options: defaultOptions,
        },
      });

      await flushPromises();

      expect(component.find("[vl-key='clearIcon']").exists()).toBe(true);
    });

    it("Clearable – clears value when clear icon is clicked", async () => {
      const component = mount(USelect, {
        props: {
          clearable: true,
          modelValue: "option1",
          options: defaultOptions,
        },
      });

      await flushPromises();

      component.find("[vl-key='clearIcon']").trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe("");
      expect(component.emitted("clear")).toBeDefined();
    });

    it("Disabled – sets disabled state on wrapper", () => {
      const component = mount(USelect, {
        props: {
          disabled: true,
          options: defaultOptions,
        },
      });

      expect(component.find("[vl-key='wrapper']").attributes("tabindex")).toBe("-1");
      expect(component.getComponent(ULabel).props("disabled")).toBe(true);
    });

    it("Readonly – sets readonly state", async () => {
      const component = mount(USelect, {
        props: {
          readonly: true,
          options: defaultOptions,
        },
      });

      component.get("[role='combobox']").trigger("focus");

      await flushPromises();

      expect(component.findComponent(UListbox).exists()).toBe(false);
    });

    it("Add Option – passes addOption prop to UListbox", async () => {
      const component = mount(USelect, {
        props: {
          addOption: true,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("addOption")).toBe(true);
    });

    it("Label Key – passes labelKey prop to UListbox", async () => {
      const labelKey = "name";

      const component = mount(USelect, {
        props: {
          labelKey,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("labelKey")).toBe(labelKey);
    });

    it("Value Key – passes valueKey prop to UListbox", async () => {
      const valueKey = "id";

      const component = mount(USelect, {
        props: {
          valueKey,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("valueKey")).toBe(valueKey);
    });

    it("Options Limit – passes optionsLimit prop to UListbox", async () => {
      const optionsLimit = 5;

      const component = mount(USelect, {
        props: {
          optionsLimit,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("optionsLimit")).toBe(optionsLimit);
    });

    it("Visible Options – passes visibleOptions prop to UListbox", async () => {
      const visibleOptions = 3;

      const component = mount(USelect, {
        props: {
          visibleOptions,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("visibleOptions")).toBe(visibleOptions);
    });

    it("Debounce – passes debounce prop to UListbox", async () => {
      const debounce = 300;

      const component = mount(USelect, {
        props: {
          debounce,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.getComponent(UListbox).props("debounce")).toBe(debounce);
    });

    it("Id – sets correct id attribute", () => {
      const id = "test-select";

      const component = mount(USelect, {
        props: {
          id,
          options: defaultOptions,
        },
      });

      expect(component.find("[vl-key='wrapper']").attributes("aria-owns")).toBe(`listbox-${id}`);
    });

    it("Data Test – applies the correct data-test attributes", async () => {
      const testCases = {
        toggleWrapper: "toggle",
        clearIcon: "clear",
      };

      const dataTest = "test";

      const component = mount(USelect, {
        props: {
          dataTest,
          multiple: false,
          multipleVariant: "list",
          modelValue: ["option1", "option2", "option3"],
          options: defaultOptions,
          clearable: true,
          toggleIcon: true,
        },
      });

      await flushPromises();

      Object.entries(testCases).forEach(async ([key, value]) => {
        const expectedDataTest = `${dataTest}-${value}`;

        await component.get("[role='combobox']").trigger("focus");

        await flushPromises();

        expect(component.find(`[vl-key='${key}']`).attributes("data-test")).toBe(expectedDataTest);
      });
    });
  });

  describe("Functionality", () => {
    it("Opens dropdown when wrapper is clicked", async () => {
      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.findComponent(UListbox).exists()).toBe(true);
    });

    it("Closes dropdown when option is selected in single mode", async () => {
      const component = mount(USelect, {
        props: {
          modelValue: "",
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const firstOption = component.find("[vl-child-key='option']");

      await firstOption.trigger("click");

      expect(component.findComponent(UListbox).exists()).toBe(false);
    });

    it("Keeps dropdown open when closeOnSelect is false", async () => {
      const component = mount(USelect, {
        props: {
          modelValue: "",
          options: defaultOptions,
          closeOnSelect: false,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const firstOption = component.find("[vl-child-key='option']");

      await firstOption.trigger("click");

      expect(component.findComponent(UListbox).exists()).toBe(true);
    });

    it("Handles keyboard navigation", async () => {
      const updatedValue = "option2";

      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      const wrapperElement = await component.get("[role='combobox']");

      await wrapperElement.trigger("focus");
      await wrapperElement.trigger("keydown", { key: "ArrowDown" });
      await wrapperElement.trigger("keydown", { key: "Enter" });

      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Closes dropdown on Escape key", async () => {
      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      const wrapperElement = await component.get("[role='combobox']");

      await wrapperElement.trigger("focus");

      expect(component.findComponent(UListbox).exists()).toBe(true);

      await wrapperElement.trigger("keyup", { key: "Escape" });

      expect(component.findComponent(UListbox).exists()).toBe(false);
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom Label Content";

      const component = mount(USelect, {
        props: {
          label: "Default Label",
          options: defaultOptions,
        },
        slots: {
          label: customLabelContent,
        },
      });

      expect(component.text()).toContain(customLabelContent);
    });

    it("Label – exposes label prop to slot", () => {
      const defaultLabel = "Test Label";

      const component = mount(USelect, {
        props: {
          label: defaultLabel,
          options: defaultOptions,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      expect(component.text()).toContain(`Modified ${defaultLabel}`);
    });

    it("Left – renders custom content from left slot", () => {
      const slotContent = "Left Slot Content";

      const component = mount(USelect, {
        props: {
          leftIcon: "search",
          options: defaultOptions,
        },
        slots: {
          left: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Left – exposes icon-name to slot when leftIcon prop is provided", () => {
      const leftIcon = "search";

      const component = mount(USelect, {
        props: {
          leftIcon,
          options: defaultOptions,
        },
        slots: {
          left: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.text()).toContain(`Icon: ${leftIcon}`);
    });

    it("Right – renders custom content from right slot", () => {
      const slotContent = "Right Slot Content";

      const component = mount(USelect, {
        props: {
          rightIcon: "close",
          options: defaultOptions,
        },
        slots: {
          right: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Right – exposes icon-name to slot when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(USelect, {
        props: {
          rightIcon,
          options: defaultOptions,
        },
        slots: {
          right: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.text()).toContain(`Icon: ${rightIcon}`);
    });

    it("Toggle – renders custom content from toggle slot", () => {
      const slotContent = "Toggle Slot Content";

      const component = mount(USelect, {
        props: {
          toggleIcon: true,
          options: defaultOptions,
        },
        slots: {
          toggle: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Clear – renders custom content from clear slot", () => {
      const slotContent = "Clear Slot Content";

      const component = mount(USelect, {
        props: {
          clearable: true,
          modelValue: "option1",
          options: defaultOptions,
        },
        slots: {
          clear: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Before Toggle – renders custom content from before-toggle slot", () => {
      const slotContent = "Before Toggle Content";

      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
        slots: {
          "before-toggle": slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Before Option – renders custom content from before-option slot", async () => {
      const slotContent = "Before Option";
      const slotClass = "before-option-content";

      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
        slots: {
          "before-option": `<span class='${slotClass}'>${slotContent}</span>`,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);
      const beforeOptionSlot = listbox.find(`.${slotClass}`);

      expect(beforeOptionSlot.exists()).toBe(true);
      expect(beforeOptionSlot.text()).toBe(slotContent);
    });

    it("Option – renders custom content from option slot", async () => {
      const slotClass = "custom-option-content";

      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
        slots: {
          option: `<span class='${slotClass}'>Custom {{ params.option.label }}</span>`,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);
      const customOptionSlot = listbox.find(`.${slotClass}`);

      expect(customOptionSlot.exists()).toBe(true);
      expect(customOptionSlot.text()).toBe("Custom Option 1");
    });

    it("After Option – renders custom content from after-option slot", async () => {
      const slotContent = "After Option";
      const slotClass = "after-option-content";

      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
        slots: {
          "after-option": `<span class='${slotClass}'>${slotContent}</span>`,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);
      const afterOptionSlot = listbox.find(`.${slotClass}`);

      expect(afterOptionSlot.exists()).toBe(true);
      expect(afterOptionSlot.text()).toBe(slotContent);
    });

    it("Empty – renders custom content from empty slot", async () => {
      const slotContent = "No options available";
      const slotClass = "custom-empty";

      const component = mount(USelect, {
        props: {
          options: [],
        },
        slots: {
          empty: `<span class='${slotClass}'>${slotContent}</span>`,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);
      const emptySlot = listbox.find(`.${slotClass}`);

      expect(emptySlot.exists()).toBe(true);
      expect(emptySlot.text()).toBe(slotContent);
    });
  });

  describe("Events", () => {
    it("Click – emits when select is clicked", async () => {
      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("click");

      expect(component.emitted("click")).toBeDefined();
    });

    it("Open – emits when dropdown is opened", async () => {
      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      expect(component.emitted("open")).toBeDefined();
    });

    it("Close – emits when dropdown is closed", async () => {
      const component = mount(USelect, {
        props: {
          modelValue: "",
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);
      const firstOption = listbox.find("[vl-child-key='option']");

      await firstOption.trigger("click");

      expect(component.emitted("close")).toBeDefined();
    });

    it("Search Change – emits when search input changes", async () => {
      vi.useFakeTimers();

      const testValue = "test";

      const component = mount(USelect, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      component.get("input").setValue(testValue);

      vi.advanceTimersByTime(300); // Simulate debounce delay

      expect(component.emitted("searchChange")).toBeDefined();
      expect(component.emitted("searchChange")![0][0]).toBe(testValue);

      vi.useRealTimers();
    });

    it("Update:search – re-emits from UListbox", async () => {
      const component = mount(USelect, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const input = component.get("input");

      await input.setValue("Option 3");
      await flushPromises();

      expect(component.emitted("update:search")).toBeTruthy();
      expect(component.emitted("update:search")![0][0]).toBe("Option 3");
    });

    it("Clear – emits when clear icon is clicked", async () => {
      const component = mount(USelect, {
        props: {
          clearable: true,
          modelValue: "option1",
          options: defaultOptions,
        },
      });

      await flushPromises();

      component.find("[vl-key='clearIcon']").trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe("");

      expect(component.emitted("clear")).toBeDefined();
    });

    it("Add – emits when add button is clicked", async () => {
      const component = mount(USelect, {
        props: {
          addOption: true,
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      await flushPromises();

      const icons = component.findAllComponents(UIcon);
      const addButton = icons.find((icon) => icon.props("name") === "add");

      await addButton?.trigger("click");

      expect(component.emitted("add")).toBeDefined();
    });

    it("Change – emits when value changes", async () => {
      const component = mount(USelect, {
        props: {
          modelValue: "",
          options: defaultOptions,
        },
      });

      await component.get("[role='combobox']").trigger("focus");

      const listbox = component.findComponent(UListbox);
      const firstOption = listbox.find("[vl-child-key='option']");

      await firstOption.trigger("click");

      expect(component.emitted("change")).toBeDefined();
      expect(component.emitted("change")![0][0]).toEqual({
        value: "option1",
        options: defaultOptions,
      });
    });
  });

  describe("Exposed Properties", () => {
    it("Wrapper Ref – exposes wrapper element ref", () => {
      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });

    it("Listbox Ref – exposes listbox component ref", () => {
      const component = mount(USelect, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.listboxRef).toBeDefined();
    });

    it("Label Component Ref – exposes label component ref", () => {
      const component = mount(USelect, {
        props: {
          label: "Test Label",
          options: defaultOptions,
        },
      });

      expect(component.vm.labelComponentRef).toBeDefined();
    });
  });
});
