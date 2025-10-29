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
    it("Label – renders the correct label text", () => {
      const label = "Select option";

      const component = mount(UDropdown, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          default: `<button>{{ label }}</button>`,
        },
      });

      expect(component.text()).toContain(label);
    });

    it("ModelValue – selects the correct option based on modelValue", async () => {
      const modelValue = 2;

      const component = mount(UDropdown, {
        props: {
          modelValue,
          options: defaultOptions,
        },
        slots: {
          default: `<button>{{ label }}</button>`,
        },
      });

      const selectedOption = defaultOptions.find((option) => option.value === modelValue);

      expect(component.text()).toContain(selectedOption?.label);
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
          default: `<button>{{ label }}</button>`,
        },
      });

      const selectedOptions = defaultOptions.filter((option) => modelValue.includes(option.value));
      const expectedLabel = selectedOptions.map((option) => option.label).join(", ");

      expect(component.text()).toContain(expectedLabel);
    });

    it("LabelDisplayCount – limits displayed labels based on labelDisplayCount", async () => {
      const modelValue = [1, 2, 3];
      const labelDisplayCount = 1;
      const expectedLabel = "Option 1, +2";

      const component = mount(UDropdown, {
        props: {
          modelValue,
          multiple: true,
          labelDisplayCount,
          options: defaultOptions,
        },
        slots: {
          default: `<button>{{ label }}</button>`,
        },
      });

      expect(component.text()).toContain(expectedLabel);
    });

    // eslint-disable-next-line vue/max-len
    it("LabelDisplayCount – correctly displays label when labelDisplayCount is 1 and only one value is selected", async () => {
      const modelValue = [1];
      const labelDisplayCount = 1;
      const expectedLabel = "Option 1";

      const component = mount(UDropdown, {
        props: {
          modelValue,
          multiple: true,
          labelDisplayCount,
          options: defaultOptions,
        },
        slots: {
          default: `<button>{{ label }}</button>`,
        },
      });

      expect(component.text()).toContain(expectedLabel);
    });

    it("Label – displays the default label when no option is selected", () => {
      const label = "Select an option";

      const component = mount(UDropdown, {
        props: {
          label,
          options: defaultOptions,
        },
        slots: {
          default: `<button>{{ label }}</button>`,
        },
      });

      expect(component.text()).toContain(label);
    });

    it("Disabled – applies disabled state correctly", async () => {
      const component = mount(UDropdown, {
        props: {
          disabled: true,
          options: defaultOptions,
          dataTest: "dropdown",
        },
        slots: {
          default: `<button @click="toggle">Click me</button>`,
        },
      });

      const wrapper = component.find('[data-test="dropdown-wrapper"]');

      expect(wrapper.exists()).toBe(true);

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
          default: `<button @click="toggle">{{ label }}</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findComponent(UListbox).props("searchable")).toBe(true);
    });
  });

  describe("Slots", () => {
    it("Default – renders default slot with correct bindings", () => {
      const component = mount(UDropdown, {
        props: {
          label: "Test Label",
          options: defaultOptions,
        },
        slots: {
          default: `
            <template #default="{ opened, label, toggle, elementId }">
              <button :id="elementId" @click="toggle">{{ label }}</button>
            </template>
          `,
        },
      });

      expect(component.find("button").exists()).toBe(true);
      expect(component.text()).toContain("Test Label");
    });

    it("Empty – renders empty slot when no options are provided", async () => {
      const component = mount(UDropdown, {
        props: {
          options: [],
        },
        slots: {
          default: `<button @click="toggle">Open</button>`,
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
          default: `<button @click="toggle">Open</button>`,
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
          default: `<button @click="toggle">Open</button>`,
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
          default: `<button @click="toggle">Open</button>`,
          "after-option": `<span class="after-icon">✓</span>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      expect(component.findAll(".after-icon").length).toBeGreaterThan(0);
    });
  });

  describe("Events", () => {
    it("Update:modelValue – emits update:modelValue when an option is selected", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button @click="toggle">Open</button>`,
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
          default: `<button @click="toggle">Open</button>`,
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
          default: `<button @click="toggle">Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      const hideOptions = component.vm.hideOptions as () => void;

      hideOptions();
      await nextTick();

      expect(component.emitted("close")).toBeTruthy();
    });

    it("ClickOption – emits clickOption event when an option is clicked", async () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button @click="toggle">Open</button>`,
        },
      });

      await component.find("button").trigger("click");
      await nextTick();

      const listbox = component.findComponent(UListbox);

      await listbox.vm.$emit("click-option", defaultOptions[0]);

      expect(component.emitted("clickOption")).toBeTruthy();
    });
  });

  describe("Exposed methods", () => {
    it("ToggleOptions – exposes toggleOptions method", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.toggleOptions).toBeDefined();
      expect(typeof component.vm.toggleOptions).toBe("function");
    });

    it("HideOptions – exposes hideOptions method", () => {
      const component = mount(UDropdown, {
        props: {
          options: defaultOptions,
        },
        slots: {
          default: `<button>Open</button>`,
        },
      });

      expect(component.vm.hideOptions).toBeDefined();
      expect(typeof component.vm.hideOptions).toBe("function");
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
  });
});
