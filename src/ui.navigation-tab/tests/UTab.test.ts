import { h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import UTab from "../UTab.vue";
import UButton from "../../ui.button/UButton.vue";

describe("UTab.vue", () => {
  // Default provide values for testing
  const defaultProvide = {
    getUTabsSelectedItem: () => "",
    setUTabsSelectedItem: () => {},
    getUTabsScrollable: false,
    getUTabsSquare: false,
    getUTabsBlock: false,
    getUTabsSize: "md",
  };

  // Props tests
  describe("Props", () => {
    // Label prop
    it("renders the correct label text", () => {
      const label = "Tab Item";

      const component = mount(UTab, {
        props: {
          label,
          value: "tab1",
        },
        global: {
          provide: defaultProvide,
        },
      });

      expect(component.text()).toBe(label);
    });

    // Value prop
    it("uses the provided value for tab identity", async () => {
      const value = "tab1";
      const setUTabsSelectedItem = vi.fn();

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value,
        },
        global: {
          provide: {
            ...defaultProvide,
            setUTabsSelectedItem,
          },
        },
      });

      await component.trigger("click");
      expect(setUTabsSelectedItem).toHaveBeenCalledWith(value);
    });

    // Icon prop
    it("passes icon prop to UButton", () => {
      const icon = "home";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
          icon,
        },
        global: {
          provide: defaultProvide,
        },
      });

      const button = component.findComponent(UButton);

      expect(button.props("icon")).toBe(icon);
    });

    // Left Icon prop
    it("passes leftIcon prop to UButton", () => {
      const leftIcon = "arrow-left";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
          leftIcon,
        },
        global: {
          provide: defaultProvide,
        },
      });

      const button = component.findComponent(UButton);

      expect(button.props("leftIcon")).toBe(leftIcon);
    });

    // Right Icon prop
    it("passes rightIcon prop to UButton", () => {
      const rightIcon = "arrow-right";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
          rightIcon,
        },
        global: {
          provide: defaultProvide,
        },
      });

      const button = component.findComponent(UButton);

      expect(button.props("rightIcon")).toBe(rightIcon);
    });

    // Disabled prop
    it("passes disabled prop to UButton", () => {
      const disabled = true;

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
          disabled,
        },
        global: {
          provide: defaultProvide,
        },
      });

      const button = component.findComponent(UButton);

      expect(button.props("disabled")).toBe(disabled);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-tab";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
          dataTest,
        },
        global: {
          provide: defaultProvide,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Active state tests
  describe("Active state", () => {
    // Active state
    it("applies active classes when tab is selected", () => {
      const value = "tab1";
      const expectedClass = "border-primary";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value,
        },
        global: {
          provide: {
            ...defaultProvide,
            getUTabsSelectedItem: () => value,
          },
        },
      });

      const button = component.findComponent(UButton);

      expect(button.attributes("class")).toContain(expectedClass);
    });

    // Inactive state
    it("applies inactive classes when tab is not selected", () => {
      const value = "tab1";
      const expectedClass = "border-transparent";
      const nonExpectedClass = "border-primary";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value,
        },
        global: {
          provide: {
            ...defaultProvide,
            getUTabsSelectedItem: () => "other-tab",
          },
        },
      });

      const button = component.findComponent(UButton);

      expect(button.attributes("class")).toContain(expectedClass);
      expect(button.attributes("class")).not.toContain(nonExpectedClass);
    });

    // Disabled does not activate
    it("does not call setUTabsSelectedItem when disabled", async () => {
      const disabled = true;
      const setUTabsSelectedItem = vi.fn();

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
          disabled,
        },
        global: {
          provide: {
            ...defaultProvide,
            setUTabsSelectedItem,
          },
        },
      });

      await component.trigger("click");
      expect(setUTabsSelectedItem).not.toHaveBeenCalled();
    });
  });

  // Injected props tests
  describe("Injected props", () => {
    // Size prop from UTabs
    it("uses the size from UTabs provider", () => {
      const size = "lg";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
        },
        global: {
          provide: {
            ...defaultProvide,
            getUTabsSize: size,
          },
        },
      });

      const button = component.findComponent(UButton);

      expect(button.props("size")).toBe(size);
    });

    // Block prop from UTabs
    it("uses the block prop from UTabs provider", () => {
      const block = true;

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
        },
        global: {
          provide: {
            ...defaultProvide,
            getUTabsBlock: block,
          },
        },
      });

      const button = component.findComponent(UButton);

      expect(button.props("block")).toBe(block);
    });

    // Square prop from UTabs
    it("uses the square prop from UTabs provider", () => {
      const square = true;

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
        },
        global: {
          provide: {
            ...defaultProvide,
            getUTabsSquare: square,
          },
        },
      });

      const button = component.findComponent(UButton);

      expect(button.props("square")).toBe(square);
    });

    // Scrollable prop from UTabs
    it("applies correct classes based on scrollable prop from UTabs", () => {
      const scrollable = false;
      const expectedClasses = "-mb-px";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
        },
        global: {
          provide: {
            ...defaultProvide,
            getUTabsScrollable: scrollable,
          },
        },
      });

      const button = component.findComponent(UButton);

      expect(button.attributes("class")).toContain(expectedClasses);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content from left slot", () => {
      const label = "Tab Item";
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UTab, {
        props: {
          label,
          value: "tab1",
        },
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
        global: {
          provide: defaultProvide,
        },
      });

      expect(component.text()).toContain(label);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Label slot
    it("renders content from label slot", () => {
      const label = "Tab Item";
      const slotText = "Custom Label";
      const slotClass = "label-content";

      const component = mount(UTab, {
        props: {
          label,
          value: "tab1",
        },
        slots: {
          label: `<span class='${slotClass}'>${slotText}</span>`,
        },
        global: {
          provide: defaultProvide,
        },
      });

      expect(component.text()).not.toContain(label);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Right slot
    it("renders content from right slot", () => {
      const label = "Tab Item";
      const slotText = "Right";
      const slotClass = "right-content";

      const component = mount(UTab, {
        props: {
          label,
          value: "tab1",
        },
        slots: {
          right: `<span class='${slotClass}'>${slotText}</span>`,
        },
        global: {
          provide: defaultProvide,
        },
      });

      expect(component.text()).toContain(label);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Slot binding - active state
    it("passes active state to slots", () => {
      const value = "tab1";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value,
        },
        slots: {
          left: (props) => h("div", { "data-active": props.active }),
        },
        global: {
          provide: {
            ...defaultProvide,
            getUTabsSelectedItem: () => value,
          },
        },
      });

      expect(component.find('[data-active="true"]').exists()).toBe(true);
    });

    // Slot binding - icon-name
    it("passes icon-name to slots", () => {
      const leftIcon = "home";

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
          leftIcon,
        },
        slots: {
          left: (props) => h("div", { "data-icon-name": props.iconName }),
        },
        global: {
          provide: defaultProvide,
        },
      });

      expect(component.find(`[data-icon-name="${leftIcon}"]`).exists()).toBe(true);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("calls setUTabsSelectedItem when clicked", async () => {
      const value = "tab1";
      const setUTabsSelectedItem = vi.fn();

      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value,
        },
        global: {
          provide: {
            ...defaultProvide,
            setUTabsSelectedItem,
          },
        },
      });

      await component.trigger("click");
      expect(setUTabsSelectedItem).toHaveBeenCalledWith(value);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // button ref
    it("exposes button ref", () => {
      const component = mount(UTab, {
        props: {
          label: "Tab Item",
          value: "tab1",
        },
        global: {
          provide: defaultProvide,
        },
      });

      expect(component.vm.button).toBeDefined();
    });
  });
});
