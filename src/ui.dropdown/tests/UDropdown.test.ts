import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { nextTick } from "vue";

import UDropdown from "../UDropdown.vue";
import UListbox from "../../ui.form-listbox/UListbox.vue";

describe("UDropdown.vue", () => {
  const defaultOptions = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  describe("Props", () => {
    it("ModelValue – selects the correct option based on modelValue", async () => {
      const modelValue = 2;

      const component = mount(UDropdown, {
        props: {
          modelValue,
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      expect(component.vm.selectedOptions[0]?.value).toBe(modelValue);
    });

    it("Multiple – handles multiple selections correctly", async () => {
      const modelValue = [1, 3];

      const component = mount(UDropdown, {
        props: {
          modelValue,
          multiple: true,
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      expect(component.vm.selectedOptions.length).toBe(2);
      expect(component.vm.selectedOptions[0]?.value).toBe(1);
      expect(component.vm.selectedOptions[1]?.value).toBe(3);
    });

    it("Disabled – applies disabled state correctly", async () => {
      const component = mount(UDropdown, {
        props: {
          disabled: true,
          options: defaultOptions,
          dataTest: "dropdown",
        },
        slots: {
          default: `<button>Click me</button>`,
        },
      });

      const collapsible = component.findComponent({ name: "UCollapsible" });

      expect(collapsible.props("disabled")).toBe(true);

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).exists()).toBe(false);
    });

    it("Searchable – renders searchable dropdown", async () => {
      const component = mount(UDropdown, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).props("searchable")).toBe(true);
    });

    it("Size – applies the correct size to listbox", async () => {
      const sizes = ["sm", "md", "lg"] as const;

      for (const size of sizes) {
        const component = mount(UDropdown, {
          props: {
            size,
            options: defaultOptions,
          },
          slots: {
            default: `<button>Trigger</button>`,
          },
        });

        await component.find("button").trigger("click");
        await nextTick();

        expect(component.findComponent(UListbox).props("size")).toBe(size);
      }
    });

    it("Color – applies the correct color to listbox", async () => {
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
      ] as const;

      for (const color of colors) {
        const component = mount(UDropdown, {
          props: {
            color,
            options: defaultOptions,
          },
          slots: {
            default: `<button>Trigger</button>`,
          },
        });

        await component.find("button").trigger("click");
        await nextTick();

        expect(component.findComponent(UListbox).props("color")).toBe(color);
      }
    });

    it("XPosition – passes xPosition prop to collapsible", () => {
      const component = mount(UDropdown, {
        props: {
          xPosition: "right",
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      const collapsible = component.findComponent({ name: "UCollapsible" });

      expect(collapsible.props("xPosition")).toBe("right");
    });

    it("YPosition – passes yPosition prop to collapsible", () => {
      const component = mount(UDropdown, {
        props: {
          yPosition: "top",
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      const collapsible = component.findComponent({ name: "UCollapsible" });

      expect(collapsible.props("yPosition")).toBe("top");
    });

    it("LabelKey – uses custom label key for options", async () => {
      const customOptions = [
        { id: 1, name: "First" },
        { id: 2, name: "Second" },
      ];

      const component = mount(UDropdown, {
        props: {
          options: customOptions,
          labelKey: "name",
          valueKey: "id",
          modelValue: 1,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).props("labelKey")).toBe("name");
    });

    it("ValueKey – uses custom value key for options", async () => {
      const customOptions = [
        { id: 1, name: "First" },
        { id: 2, name: "Second" },
      ];

      const component = mount(UDropdown, {
        props: {
          options: customOptions,
          labelKey: "name",
          valueKey: "id",
          modelValue: 1,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).props("valueKey")).toBe("id");
    });

    it("GroupValueKey – passes groupValueKey prop to listbox", async () => {
      const component = mount(UDropdown, {
        props: {
          groupValueKey: "items",
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).props("groupValueKey")).toBe("items");
    });

    it("CloseOnSelect – closes dropdown when option is selected and closeOnSelect is true", async () => {
      const component = mount(UDropdown, {
        props: {
          closeOnSelect: true,
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).exists()).toBe(true);

      const listbox = component.findComponent(UListbox);

      await listbox.vm.$emit("click-option", defaultOptions[0]);
      await nextTick();

      // Give time for the hide function to execute
      await new Promise((resolve) => setTimeout(resolve, 20));
      await nextTick();

      expect(component.findComponent(UListbox).exists()).toBe(false);
    });

    it("CloseOnSelect – keeps dropdown open when option is selected and closeOnSelect is false", async () => {
      const component = mount(UDropdown, {
        props: {
          closeOnSelect: false,
          options: defaultOptions,
        },
        slots: {
          default: `<button>Trigger</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).exists()).toBe(true);

      const listbox = component.findComponent(UListbox);

      await listbox.vm.$emit("click-option", defaultOptions[0]);
      await nextTick();

      expect(component.findComponent(UListbox).exists()).toBe(true);
    });
  });

  describe("Slots", () => {
    it("Default – renders default slot with correct bindings", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `
            <template #default="{ opened }">
              <button>{{ opened ? 'Opened' : 'Closed' }}</button>
            </template>
          `,
        },
      });

      expect(component.find("button").exists()).toBe(true);
      expect(component.text()).toContain("Closed");
    });

    it("Empty – renders empty slot when no options are provided", async () => {
      const component = mount(UDropdown, {
        props: {
          options: [],
        },
        slots: {
          default: `<button>Open</button>`,
          empty: `<div class="empty-state">No options available</div>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.find(".empty-state").exists()).toBe(true);
      expect(component.text()).toContain("No options available");
    });

    it("Before-option – renders before-option slot", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
          "before-option": `<span class="before-icon">→</span>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findAll(".before-icon").length).toBeGreaterThan(0);
    });

    it("Option – renders option slot with custom content", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
          option: `<template #option="{ option }"><div class="custom-option">{{ option.label }}</div></template>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findAll(".custom-option").length).toBeGreaterThan(0);
    });

    it("After-option – renders after-option slot", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
          "after-option": `<span class="after-icon">✓</span>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findAll(".after-icon").length).toBeGreaterThan(0);
    });

    it("Dropdown – renders custom dropdown content slot", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
          dropdown: `<div class="custom-dropdown">Custom dropdown content</div>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.find(".custom-dropdown").exists()).toBe(true);
      expect(component.text()).toContain("Custom dropdown content");
    });
  });

  describe("Events", () => {
    it("Update:modelValue – emits update:modelValue when an option is selected", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      const listbox = component.findComponent(UListbox);

      await listbox.vm.$emit("update:modelValue", defaultOptions[0].value);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0][0]).toBe(defaultOptions[0].value);
    });

    it("Open – emits open event when dropdown is opened", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.emitted("open")).toBeTruthy();
    });

    it("Close – emits close event when dropdown is closed", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      const hide = component.vm.hide as () => void;

      hide();
      await nextTick();

      expect(component.emitted("close")).toBeTruthy();
    });

    it("ClickOption – emits clickOption event when an option is clicked", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      const listbox = component.findComponent(UListbox);

      await listbox.vm.$emit("click-option", defaultOptions[0]);

      expect(component.emitted("clickOption")).toBeTruthy();
    });

    it("SearchChange – emits searchChange event when search value changes", async () => {
      const component = mount(UDropdown, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      const listbox = component.findComponent(UListbox);

      await listbox.vm.$emit("search-change", "test query");

      expect(component.emitted("searchChange")).toBeTruthy();
      expect(component.emitted("searchChange")![0][0]).toBe("test query");
    });

    it("Update:search – emits update:search event when search value updates", async () => {
      const component = mount(UDropdown, {
        props: {
          searchable: true,
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      const listbox = component.findComponent(UListbox);

      await listbox.vm.$emit("update:search", "new search");

      expect(component.emitted("update:search")).toBeTruthy();
      expect(component.emitted("update:search")![0][0]).toBe("new search");
    });
  });

  describe("Exposed methods", () => {
    it("Toggle – exposes toggle method", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.toggle).toBeDefined();
      expect(typeof component.vm.toggle).toBe("function");
    });

    it("Hide – exposes hide method", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.hide).toBeDefined();
      expect(typeof component.vm.hide).toBe("function");
    });

    it("WrapperRef – exposes wrapperRef", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });

    it("IsOpened – exposes isOpened property", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.isOpened).toBe(false);

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.vm.isOpened).toBe(true);
    });

    it("SelectedOptions – exposes selectedOptions property", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
          modelValue: 2,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.selectedOptions).toBeDefined();
      expect(component.vm.selectedOptions.length).toBe(1);
      expect(component.vm.selectedOptions[0].value).toBe(2);
    });

    it("DisplayLabel – exposes displayLabel property", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
          modelValue: 2,
          labelDisplayCount: 1,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.displayLabel).toBeDefined();
      expect(component.vm.displayLabel).toBe("Option 2");
    });

    it("FullLabel – exposes fullLabel property", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
          modelValue: [1, 2],
          multiple: true,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.fullLabel).toBeDefined();
      expect(component.vm.fullLabel).toBe("Option 1, Option 2");
    });
  });
});
