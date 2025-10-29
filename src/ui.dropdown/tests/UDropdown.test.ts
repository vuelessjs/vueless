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

      const wrapper = component.find('[data-test="dropdown-wrapper"]');

      expect(wrapper.exists()).toBe(true);

      await wrapper.trigger("click");
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
  });
});
