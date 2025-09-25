import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UListbox from "../UListbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UInputSearch from "../../ui.form-input-search/UInputSearch.vue";

import type { Props } from "../types";

describe("UListbox.vue", () => {
  const defaultOptions = [
    { label: "Option 1", id: "option1" },
    { label: "Option 2", id: "option2" },
    { label: "Option 3", id: "option3" },
  ];

  const highlightedClass = "bg-primary/5";

  describe("Props", () => {
    it("Model Value – sets initial value correctly for single selection", async () => {
      const initialValue = "option1";

      const component = mount(UListbox, {
        props: {
          modelValue: initialValue,
          options: defaultOptions,
        },
      });

      await flushPromises();
      const selectedIcon = component.findComponent(UIcon);

      expect(selectedIcon.exists()).toBe(true);
    });

    it("Model Value – sets initial value correctly for multiple selection", () => {
      const initialValue = ["option1", "option2"];

      const component = mount(UListbox, {
        props: {
          modelValue: initialValue,
          options: defaultOptions,
          multiple: true,
        },
      });

      const selectedIcons = component.findAllComponents(UIcon);

      expect(selectedIcons.length).toBe(2);
    });

    it("Model Value – updates value on option selection", async () => {
      const updatedValue = "option1";

      const component = mount(UListbox, {
        props: {
          modelValue: "",
          options: defaultOptions,
        },
      });

      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Options – renders all options correctly", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      const options = component.findAll('[vl-key="option"]');

      expect(options).toHaveLength(defaultOptions.length);

      options.forEach((option, index) => {
        expect(option.text()).toBe(defaultOptions[index].label);
      });
    });

    it("Options – handles empty options array", () => {
      const emptyOptionLabel = "No data to show";
      const expectedOptionsAmount = 1;

      const component = mount(UListbox, {
        props: {
          options: [],
        },
      });

      const options = component.findAll('[vl-key="option"]');

      expect(options).toHaveLength(expectedOptionsAmount);
      expect(options[0].text()).toContain(emptyOptionLabel);
    });

    it("Searchable – renders search input when searchable is true", () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.findComponent(UInputSearch);

      expect(searchInput.exists()).toBe(true);
    });

    it("Searchable – does not render search input when searchable is false", () => {
      const component = mount(UListbox, {
        props: {
          searchable: false,
          options: defaultOptions,
        },
      });

      const searchInput = component.findComponent(UInputSearch);

      expect(searchInput.exists()).toBe(false);
    });

    it("Multiple – allows multiple selection when multiple is true", async () => {
      const component = mount(UListbox, {
        props: {
          multiple: true,
          modelValue: [],
          "onUpdate:modelValue": (value: string[]) => component.setProps({ modelValue: value }),
          options: defaultOptions,
        },
      });

      const options = component.findAll('[vl-key="option"]');

      await options[0].trigger("click");

      await options[1].trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toEqual([defaultOptions[0].id]);
      expect(component.emitted("update:modelValue")![1][0]).toEqual([
        defaultOptions[0].id,
        defaultOptions[1].id,
      ]);
    });

    it("Multiple – toggles selection when clicking selected option", async () => {
      const component = mount(UListbox, {
        props: {
          multiple: true,
          modelValue: ["option1"],
          "onUpdate:modelValue": (value: string[]) => component.setProps({ modelValue: value }),
          options: defaultOptions,
        },
      });

      const selectedOption = component.find('[vl-key="optionActive"]');

      await selectedOption.trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toEqual([]);
    });

    it("Label Key – uses correct label key for display", () => {
      const customOptions = [
        { title: "First Option", id: 1 },
        { title: "Second Option", id: 2 },
      ];

      const component = mount(UListbox, {
        props: {
          options: customOptions,
          labelKey: "title",
          valueKey: "id",
        },
      });

      const options = component.findAll('[vl-key="option"]');

      expect(options[0].text()).toBe(customOptions[0].title);
      expect(options[1].text()).toBe(customOptions[1].title);
    });

    it("Value Key – uses correct value key for selection", async () => {
      const customOptions = [
        { title: "First Option", id: 1 },
        { title: "Second Option", id: 2 },
      ];

      const updatedValue = 1;

      const component = mount(UListbox, {
        props: {
          options: customOptions,
          labelKey: "title",
          valueKey: "id",
        },
      });

      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Size – passes size prop to search input", () => {
      const size = "lg";

      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
          size: size as Props["size"],
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      expect(searchInput.props("size")).toBe(size);
    });

    it("Color – applies correct color class to selected options", async () => {
      const color = "error";

      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
          modelValue: "option1",
          color: color as Props["color"],
        },
      });

      const firstOption = component.find('[vl-key="option"]');

      expect(firstOption.attributes("class")).toContain(color);
    });

    it("Disabled – disables all options when disabled is true", () => {
      const disabledOpacity = "--vl-disabled-opacity";

      const component = mount(UListbox, {
        props: {
          disabled: true,
          options: defaultOptions,
        },
      });

      const options = component.findAll('[vl-key="option"]');

      options.forEach((option) => {
        expect(option.attributes("class")).toContain(disabledOpacity);
      });
    });

    it("Disabled – does not emit update when disabled", async () => {
      const component = mount(UListbox, {
        props: {
          disabled: true,
          options: defaultOptions,
        },
      });

      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      expect(component.emitted("update:modelValue")).toBeFalsy();
    });

    it("Options Limit – limits number of displayed options", () => {
      const manyOptions = Array.from({ length: 10 }, (_, i) => ({
        label: `Option ${i}`,
        id: `option-${i}`,
      }));

      const optionsAmount = 5;

      const component = mount(UListbox, {
        props: {
          options: manyOptions,
          optionsLimit: optionsAmount,
        },
      });

      const options = component.findAll('[vl-key="option"]');

      expect(options).toHaveLength(optionsAmount);
    });

    it("Add Option – renders add button when addOption is true", () => {
      const component = mount(UListbox, {
        props: {
          addOption: true,
          options: defaultOptions,
        },
      });

      const addButton = component.find('[vl-key="addOptionButton"]');

      expect(addButton.exists()).toBe(true);
    });

    it("Add Option – emits add event when add button is clicked", async () => {
      const component = mount(UListbox, {
        props: {
          addOption: true,
          options: defaultOptions,
        },
      });

      const addButton = component.find('[vl-key="addOptionButton"]');

      await addButton.trigger("click");

      expect(component.emitted("add")).toBeTruthy();
    });

    it("Debounce – passes debounce prop to search input", () => {
      const debounce = 500;

      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
          debounce,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      expect(searchInput.props("debounce")).toBe(debounce);
    });

    it("Id – sets correct id attribute", () => {
      const id = "test-listbox";

      const component = mount(UListbox, {
        props: {
          id,
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      expect(searchInput.props("id")).toBe(id);
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-listbox";

      const component = mount(UListbox, {
        props: {
          dataTest,
          options: defaultOptions,
          searchable: true,
          addOption: true,
        },
      });

      expect(component.find('[data-test="test-listbox-add"]').exists()).toBe(true);
      expect(component.find('[data-test="test-listbox-search"]').exists()).toBe(true);
      expect(component.find('[data-test="test-listbox-list"]').exists()).toBe(true);
      expect(component.find('[data-test="test-listbox-option"]').exists()).toBe(true);
    });

    it("Group Label Key – renders group labels correctly", () => {
      const groupedOptions = [
        { groupLabel: "Group 1", group: "group1" },
        { label: "Option 1", value: "option1", group: "group1" },
        { groupLabel: "Group 2", group: "group2" },
        { label: "Option 2", value: "option2", group: "group2" },
      ];

      const groupsAmount = 2;

      const component = mount(UListbox, {
        props: {
          options: groupedOptions,
          groupLabelKey: "group",
        },
      });

      const groupLabels = component.findAll('[data-group-label="true"]');

      expect(groupLabels).toHaveLength(groupsAmount);
      expect(groupLabels[0].text()).toBe(groupedOptions[0].groupLabel);
      expect(groupLabels[1].text()).toBe(groupedOptions[2].groupLabel);
    });

    it("Visible Options – limits visible options without scroll", async () => {
      const manyOptions = Array.from({ length: 10 }, (_, i) => ({
        label: `Option ${i}`,
        id: `option-${i}`,
      }));

      const expectedStyle = "max-height:";

      const component = mount(UListbox, {
        props: {
          options: manyOptions,
          visibleOptions: 3,
        },
      });

      await flushPromises();

      const wrapper = component.find('[vl-key="wrapper"]');

      expect(wrapper.attributes("style")).toContain(expectedStyle);
    });
  });

  describe("Functionality", () => {
    it("Search v-model – filters options using external search prop", async () => {
      const targetValue = "Option 2";

      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
          search: targetValue,
        },
      });

      await flushPromises();

      const options = component.findAll('[vl-key="option"]');

      expect(options).toHaveLength(1);
      expect(options[0].text()).toBe(targetValue);
    });

    it("Search v-model – emits update:search on input change", async () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      await searchInput.setValue("Option 3");

      expect(component.emitted("update:search")).toBeTruthy();
      expect(component.emitted("update:search")![0][0]).toBe("Option 3");
    });

    it("Search – filters options based on search input", async () => {
      const targetValue = "Option 1";
      const filteredOptionsAmount = 1;

      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      await searchInput.setValue(targetValue);
      await flushPromises();

      const options = component.findAll('[vl-key="option"]');

      expect(options).toHaveLength(filteredOptionsAmount);
      expect(options[0].text()).toBe(targetValue);
    });

    it("Search – emits searchChange event on input", async () => {
      const targetValue = "test";

      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      await searchInput.setValue(targetValue);

      expect(component.emitted("searchChange")).toBeTruthy();
      expect(component.emitted("searchChange")![0][0]).toBe(targetValue);
    });

    it("Search – emits searchBlur event on blur", async () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch).get("input");

      await searchInput.trigger("blur");

      expect(component.emitted("searchBlur")).toBeTruthy();
    });

    it("ClearSearchOnSelect – clears search when option is selected and clearSearchOnSelect is true", async () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
          clearSearchOnSelect: true,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      // Set search value
      await searchInput.setValue("Option 1");
      await flushPromises();

      // Select an option
      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      // Check that search was cleared
      expect(searchInput.props("modelValue")).toBe("");
    });

    it(`ClearSearchOnSelect –
        does not clear search when option is selected and clearSearchOnSelect is false`, async () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
          clearSearchOnSelect: false,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      // Set search value
      await searchInput.setValue("Option 1");
      await flushPromises();

      // Select an option
      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      // Check that search was NOT cleared
      expect(searchInput.props("modelValue")).toBe("Option 1");
    });

    it("ClearSearchOnSelect – defaults to true", async () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      // Set search value
      await searchInput.setValue("Option 1");
      await flushPromises();

      // Select an option
      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      // Check that search was cleared (default behavior)
      expect(searchInput.props("modelValue")).toBe("");
    });

    it(`ClearSearchOnSelect –
        does not clear search in multiple mode regardless of clearSearchOnSelect value`, async () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          multiple: true,
          options: defaultOptions,
          clearSearchOnSelect: true, // Even when true, should not clear in multiple mode
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      // Set search value
      await searchInput.setValue("Option 1");
      await flushPromises();

      // Select an option
      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      // Check that search was NOT cleared in multiple mode
      expect(searchInput.props("modelValue")).toBe("Option 1");
    });

    it("Keyboard Navigation – moves pointer down with arrow down", async () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      const wrapper = component.find('[vl-key="wrapper"]');

      await wrapper.trigger("focus");
      await wrapper.trigger("keydown", { key: "ArrowDown" });

      const options = component.findAll('[vl-key="option"]');

      expect(options[1].attributes("class")).toContain(highlightedClass);
    });

    it("Keyboard Navigation – moves pointer up with arrow up", async () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      const wrapper = component.find('[vl-key="wrapper"]');

      await wrapper.trigger("focus");
      await wrapper.trigger("keydown", { key: "ArrowDown" });
      await wrapper.trigger("keydown", { key: "ArrowUp" });

      const options = component.findAll('[vl-key="option"]');

      expect(options[0].attributes("class")).toContain(highlightedClass);
    });

    it("Keyboard Navigation – selects option with Enter key", async () => {
      const expectedValue = "option1";

      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      const wrapper = component.find('[vl-key="wrapper"]');

      await wrapper.trigger("keydown", { key: "Enter" });

      expect(component.emitted("update:modelValue")![0][0]).toBe(expectedValue);
    });

    it("Disabled Option – does not select disabled option", async () => {
      const optionsWithDisabled = [
        { label: "Option 1", id: "option1", disabled: true },
        { label: "Option 2", id: "option2" },
      ];

      const component = mount(UListbox, {
        props: {
          options: optionsWithDisabled,
        },
      });

      const firstOption = component.find('[vl-key="optionDisabled"]');

      await firstOption.trigger("click");

      expect(component.emitted("update:modelValue")).toBeFalsy();
    });

    it("Mouse Enter – sets pointer on mouseenter", async () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      const secondOption = component.findAll('[vl-key="option"]')[1];

      await secondOption.trigger("mouseenter");

      expect(secondOption.attributes("class")).toContain(highlightedClass);
    });
  });

  describe("Slots", () => {
    it("Option – renders custom option content", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
        slots: {
          option: '<span class="custom-option">Custom {{ params.option.label }}</span>',
        },
      });

      const customOption = component.find(".custom-option");

      expect(customOption.exists()).toBe(true);
      expect(customOption.text()).toBe("Custom Option 1");
    });

    it("Option – exposes option and index to slot", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
        slots: {
          option: "Option: {{ params.option.label }}, Index: {{ params.index }}",
        },
      });

      const firstOption = component.find('[vl-key="option"]');

      expect(firstOption.text()).toContain("Option: Option 1, Index: 0");
    });

    it("Before Option – renders content before option", () => {
      const slotContent = "Before";

      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
        slots: {
          "before-option": `<span class="before-option">${slotContent}</span>`,
        },
      });

      const beforeOption = component.find(".before-option");

      expect(beforeOption.exists()).toBe(true);
      expect(beforeOption.text()).toBe(slotContent);
    });

    it("After Option – renders content after option", () => {
      const slotContent = "After";

      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
        slots: {
          "after-option": `<span class="after-option">${slotContent}</span>`,
        },
      });

      const afterOption = component.find(".after-option");

      expect(afterOption.exists()).toBe(true);
      expect(afterOption.text()).toBe(slotContent);
    });

    it("After Option – shows selected icon for selected option by default", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
          modelValue: "option1",
        },
      });

      const selectedIcon = component.findComponent(UIcon);

      expect(selectedIcon.exists()).toBe(true);
    });

    it("Empty – renders custom empty state content", () => {
      const slotContent = "No options available";

      const component = mount(UListbox, {
        props: {
          options: [],
        },
        slots: {
          empty: `<span class="custom-empty">${slotContent}</span>`,
        },
      });

      const emptySlot = component.find(".custom-empty");

      expect(emptySlot.exists()).toBe(true);
      expect(emptySlot.text()).toBe(slotContent);
    });
  });

  describe("Events", () => {
    it("Add – emits when add button is clicked", async () => {
      const component = mount(UListbox, {
        props: {
          addOption: true,
          options: defaultOptions,
        },
      });

      const addButton = component.find('[vl-key="addOptionButton"]');

      await addButton.trigger("click");

      expect(component.emitted("add")).toBeTruthy();
    });

    it("Click Option – emits when option is clicked", async () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      const firstOption = component.find('[vl-key="option"]');

      await firstOption.trigger("click");

      expect(component.emitted("clickOption")).toBeTruthy();
      expect(component.emitted("clickOption")![0][0]).toEqual(defaultOptions[0]);
    });

    it("Search Change – emits when search input changes", async () => {
      const expectedValue = "test";

      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      await searchInput.setValue("test");

      expect(component.emitted("searchChange")).toBeTruthy();
      expect(component.emitted("searchChange")![0][0]).toBe(expectedValue);
    });

    it("Search Blur – emits when search input loses focus", async () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      const searchInput = component.getComponent(UInputSearch);

      await searchInput.get("input").trigger("blur");

      expect(component.emitted("searchBlur")).toBeTruthy();
    });
  });

  describe("Exposed Properties", () => {
    it("Pointer Set – exposes pointerSet method", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.pointerSet).toBeDefined();
      expect(typeof component.vm.pointerSet).toBe("function");
    });

    it("Pointer Backward – exposes pointerBackward method", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.pointerBackward).toBeDefined();
      expect(typeof component.vm.pointerBackward).toBe("function");
    });

    it("Pointer Forward – exposes pointerForward method", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.pointerForward).toBeDefined();
      expect(typeof component.vm.pointerForward).toBe("function");
    });

    it("Pointer Reset – exposes pointerReset method", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.pointerReset).toBeDefined();
      expect(typeof component.vm.pointerReset).toBe("function");
    });

    it("Add Pointer Element – exposes addPointerElement method", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.addPointerElement).toBeDefined();
      expect(typeof component.vm.addPointerElement).toBe("function");
    });

    it("Options Ref – exposes optionsRef", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.optionsRef).toBeDefined();
    });

    it("Listbox Input Ref – exposes listboxInputRef", () => {
      const component = mount(UListbox, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
      });

      expect(component.vm.listboxInputRef).toBeDefined();
    });

    it("Wrapper Ref – exposes wrapperRef", () => {
      const component = mount(UListbox, {
        props: {
          options: defaultOptions,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
