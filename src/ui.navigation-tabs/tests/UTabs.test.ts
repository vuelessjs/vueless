import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UTabs from "../UTabs.vue";
import UTab from "../../ui.navigation-tab/UTab.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props, UTabsOption } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

// Global options definition
const options: UTabsOption[] = [
  { value: "tab1", label: "Tab 1" },
  { value: "tab2", label: "Tab 2" },
  { value: "tab3", label: "Tab 3" },
];

describe("UTabs.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("correctly sets the selected tab", () => {
      const modelValue = "tab2";
      const expectedActiveClass = "border-primary";

      const component = mount(UTabs, {
        props: {
          options,
          modelValue,
        },
      });

      // Find all UTab components
      const tabs = component.findAllComponents(UTab);

      // Check that the correct tab is active
      expect(tabs.length).toBe(options.length);

      // The second tab should be active
      const activeTab = tabs[1];

      expect(activeTab.classes()).toContain(expectedActiveClass);
    });

    // Options prop
    it("renders the correct number of tabs from options", () => {
      const component = mount(UTabs, {
        props: {
          options,
        },
      });

      // Find all UTab components
      const tabs = component.findAllComponents(UTab);

      // Check that the correct number of tabs is rendered
      expect(tabs.length).toBe(options.length);

      // Check that the tabs have the correct labels
      options.forEach((option, index) => {
        expect(tabs[index].text()).toBe(option.label);
      });
    });

    // Size prop
    it("applies the correct size to tabs", () => {
      const sizes = ["2xs", "xs", "sm", "md", "lg", "xl"];

      sizes.forEach((size) => {
        const component = mount(UTabs, {
          props: {
            options: [{ value: "tab1", label: "Tab 1" }],
            size: size as Props["size"],
          },
        });

        // Find the UTab component
        const tab = component.findComponent(UTab);

        // Find the UButton inside the UTab
        const button = tab.findComponent(UButton);

        // Check that the button has the correct size
        expect(button.props("size")).toBe(size);
      });
    });

    // Scrollable prop
    it("applies scrollable class when scrollable prop is true", () => {
      const scrollable = true;
      const dataTest = "test-tabs";

      const component = mount(UTabs, {
        props: {
          options,
          scrollable,
          dataTest,
        },
      });

      // Find the tabs container
      const tabsContainer = component.find(`[data-test="${dataTest}"]`);

      // Check that the container has the scrollable class
      expect(tabsContainer.classes()).toContain("overflow-hidden");
      expect(tabsContainer.classes()).toContain("flex-nowrap");
      expect(tabsContainer.classes()).toContain("scroll-smooth");
    });

    // Block prop
    it("provides block value to tabs", () => {
      const block = true;

      const component = mount(UTabs, {
        props: {
          options: [{ value: "tab1", label: "Tab 1" }],
          block,
        },
      });

      // Find the UTab component
      const tab = component.findComponent(UTab);

      // Find the UButton inside the UTab
      const button = tab.findComponent(UButton);

      // Check that the button has the block prop
      expect(button.props("block")).toBe(true);
    });

    // Square prop
    it("provides square value to tabs", () => {
      const square = true;

      const component = mount(UTabs, {
        props: {
          options: [{ value: "tab1", label: "Tab 1" }],
          square,
        },
      });

      // Find the UTab component
      const tab = component.findComponent(UTab);

      // Find the UButton inside the UTab
      const button = tab.findComponent(UButton);

      // Check that the button has the square prop
      expect(button.props("square")).toBe(true);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-tabs";
      const singleOption = [options[0]];

      const component = mount(UTabs, {
        props: {
          options: singleOption,
          dataTest,
        },
      });

      // Find the tabs container
      const tabsContainer = component.find(`[data-test="${dataTest}"]`);

      // Check that the container has the data-test attribute
      expect(tabsContainer.exists()).toBe(true);

      // Check that the tab has the correct data-test attribute
      const tab = component.find(`[data-test="${dataTest}-item-0"]`);

      expect(tab.exists()).toBe(true);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Tabs";
      const slotClass = "custom-tabs";

      const component = mount(UTabs, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Prev slot
    it("renders content from prev slot when scrollable", async () => {
      const slotContent = "Prev";
      const slotClass = "prev-content";
      const dataTest = "test-tabs";
      const manyOptions: UTabsOption[] = Array.from({ length: 10 }, (_, i) => ({
        value: `tab${i}`,
        label: `Tab ${i}`,
      }));

      const component = mount(UTabs, {
        props: {
          options: manyOptions,
          scrollable: true,
          dataTest,
        },
        slots: {
          prev: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Mock the scroll position to show left arrow
      const scrollContainer = component.find(`[data-test="${dataTest}"]`).element;

      Object.defineProperty(scrollContainer, "scrollLeft", { value: 10 });
      Object.defineProperty(scrollContainer, "scrollWidth", { value: 1000 });
      Object.defineProperty(scrollContainer, "clientWidth", { value: 500 });

      // Trigger scroll event
      await component.find("[data-test]").trigger("scroll");

      // Now the left arrow should be visible
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Next slot
    it("renders content from next slot when scrollable", async () => {
      const slotContent = "Next";
      const slotClass = "next-content";
      const dataTest = "test-tabs";
      const manyOptions: UTabsOption[] = Array.from({ length: 10 }, (_, i) => ({
        value: `tab${i}`,
        label: `Tab ${i}`,
      }));

      const component = mount(UTabs, {
        props: {
          options: manyOptions,
          scrollable: true,
          dataTest,
        },
        slots: {
          next: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Mock the scroll position to show right arrow
      const scrollContainer = component.find(`[data-test="${dataTest}"]`).element;

      Object.defineProperty(scrollContainer, "scrollLeft", { value: 0 });
      Object.defineProperty(scrollContainer, "scrollWidth", { value: 1000 });
      Object.defineProperty(scrollContainer, "clientWidth", { value: 500 });

      // Trigger scroll event
      await component.find("[data-test]").trigger("scroll");

      // Now the right arrow should be visible
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when tab is clicked", async () => {
      const component = mount(UTabs, {
        props: {
          options,
          modelValue: "tab1",
        },
      });

      // Find the second tab and click it
      const secondTab = component.findAllComponents(UTab)[1];

      await secondTab.trigger("click");

      // Check that the update:modelValue event was emitted with the correct value
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual(["tab2"]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const singleOption = [options[0]];

      const component = mount(UTabs, {
        props: {
          options: singleOption,
        },
      });

      expect(
        (component.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement }).wrapperRef,
      ).toBeDefined();
    });
  });

  // Scroll functionality tests
  describe("Scroll functionality", () => {
    // Scroll buttons
    it("shows scroll buttons when scrollable and content overflows", async () => {
      const dataTest = "test-tabs";
      const manyOptions: UTabsOption[] = Array.from({ length: 10 }, (_, i) => ({
        value: `tab${i}`,
        label: `Tab ${i}`,
      }));

      const component = mount(UTabs, {
        props: {
          options: manyOptions,
          scrollable: true,
          dataTest,
        },
      });

      // Mock the scroll position to show both arrows
      const scrollContainer = component.find(`[data-test="${dataTest}"]`).element;

      Object.defineProperty(scrollContainer, "scrollLeft", { value: 10 });
      Object.defineProperty(scrollContainer, "scrollWidth", { value: 1000 });
      Object.defineProperty(scrollContainer, "clientWidth", { value: 500 });

      // Trigger scroll event
      await component.find("[data-test]").trigger("scroll");

      // Both arrows should be visible
      const buttons = component.findAllComponents(UButton);

      // Check that at least two buttons are rendered
      expect(buttons.length).toBeGreaterThanOrEqual(2);

      // Find the buttons with the correct icons
      const prevButton = buttons.find((button) => button.props("icon") === "chevron_left");
      const nextButton = buttons.find((button) => button.props("icon") === "chevron_right");

      expect(prevButton).toBeDefined();
      expect(nextButton).toBeDefined();
    });
  });
});
