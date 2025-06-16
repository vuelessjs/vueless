import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UTab from "../UTab.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UTab.vue", () => {
  // Helper function to create a wrapper with mocked injections
  const createWrapper = (props = {}, selectedItem = "") => {
    return mount(UTab, {
      props,
      global: {
        provide: {
          setUTabsSelectedItem: () => {},
          getUTabsSelectedItem: () => selectedItem,
          getUTabsScrollable: () => false,
          getUTabsSquare: () => false,
          getUTabsBlock: () => false,
          getUTabsSize: () => "md",
        },
      },
    });
  };

  // Props tests
  describe("Props", () => {
    // Label prop
    it("renders the correct label text", () => {
      const label = "Tab Label";

      const component = createWrapper({
        label,
      });

      expect(component.text()).toBe(label);
    });

    // Value prop
    it("correctly identifies active state based on value", () => {
      const value = "tab1";

      // Test inactive state
      const inactiveComponent = createWrapper(
        {
          label: "Tab",
          value,
        },
        "tab2",
      );

      // Test active state
      const activeComponent = createWrapper(
        {
          label: "Tab",
          value,
        },
        value,
      );

      // Check that the active component has the active class
      expect(inactiveComponent.classes()).not.toContain("border-primary");
      expect(activeComponent.classes()).toContain("border-primary");
    });

    // Icon prop
    it("renders icon when icon prop is provided", () => {
      const icon = "home";
      const label = "Tab";

      const component = createWrapper({
        label,
        icon,
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toBe("");
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(icon);
    });

    // Left Icon prop
    it("renders left icon when leftIcon prop is provided", () => {
      const leftIcon = "arrow_back";
      const label = "Tab";

      const component = createWrapper({
        label,
        leftIcon,
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toBe(label);
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(leftIcon);
    });

    // Right Icon prop
    it("renders right icon when rightIcon prop is provided", () => {
      const rightIcon = "arrow_forward";
      const label = "Tab";

      const component = createWrapper({
        label,
        rightIcon,
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toBe(label);
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(rightIcon);
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;
      const label = "Tab";

      const component = createWrapper({
        label,
        disabled,
      });

      const button = component.findComponent(UButton);

      expect(button.attributes("disabled")).toBeDefined();
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-tab";
      const label = "Tab";

      const component = createWrapper({
        label,
        dataTest,
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content from left slot", () => {
      const label = "Tab";
      const slotContent = "Left Content";
      const slotClass = "left-content";

      const component = mount(UTab, {
        props: {
          label,
        },
        slots: {
          left: `<span class="${slotClass}">${slotContent}</span>`,
        },
        global: {
          provide: {
            setUTabsSelectedItem: () => {},
            getUTabsSelectedItem: () => "",
            getUTabsScrollable: () => false,
            getUTabsSquare: () => false,
            getUTabsBlock: () => false,
            getUTabsSize: () => "md",
          },
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Label slot
    it("renders content from label slot", () => {
      const label = "Tab";
      const slotContent = "Custom Label";
      const slotClass = "label-content";

      const component = mount(UTab, {
        props: {
          label,
        },
        slots: {
          label: `<span class="${slotClass}">${slotContent}</span>`,
        },
        global: {
          provide: {
            setUTabsSelectedItem: () => {},
            getUTabsSelectedItem: () => "",
            getUTabsScrollable: () => false,
            getUTabsSquare: () => false,
            getUTabsBlock: () => false,
            getUTabsSize: () => "md",
          },
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Right slot
    it("renders content from right slot", () => {
      const label = "Tab";
      const slotContent = "Right Content";
      const slotClass = "right-content";

      const component = mount(UTab, {
        props: {
          label,
        },
        slots: {
          right: `<span class="${slotClass}">${slotContent}</span>`,
        },
        global: {
          provide: {
            setUTabsSelectedItem: () => {},
            getUTabsSelectedItem: () => "",
            getUTabsScrollable: () => false,
            getUTabsSquare: () => false,
            getUTabsBlock: () => false,
            getUTabsSize: () => "md",
          },
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("calls setUTabsSelectedItem when clicked", async () => {
      const value = "tab1";
      let selectedValue = "";

      const component = mount(UTab, {
        props: {
          label: "Tab",
          value,
        },
        global: {
          provide: {
            setUTabsSelectedItem: (val: string) => {
              selectedValue = val;
            },
            getUTabsSelectedItem: () => "",
            getUTabsScrollable: () => false,
            getUTabsSquare: () => false,
            getUTabsBlock: () => false,
            getUTabsSize: () => "md",
          },
        },
      });

      await component.trigger("click");
      expect(selectedValue).toBe(value);
    });

    // No click event when disabled
    it("does not call setUTabsSelectedItem when disabled", async () => {
      const value = "tab1";
      let selectedValue = "";

      const component = mount(UTab, {
        props: {
          label: "Tab",
          value,
          disabled: true,
        },
        global: {
          provide: {
            setUTabsSelectedItem: (val: string) => {
              selectedValue = val;
            },
            getUTabsSelectedItem: () => "",
            getUTabsScrollable: () => false,
            getUTabsSquare: () => false,
            getUTabsBlock: () => false,
            getUTabsSize: () => "md",
          },
        },
      });

      await component.trigger("click");
      expect(selectedValue).toBe("");
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // button ref
    it("exposes button ref", () => {
      const component = createWrapper({
        label: "Tab",
      });

      expect(
        (component.vm as ComponentPublicInstance & { button: HTMLButtonElement }).button,
      ).toBeDefined();
    });
  });
});
