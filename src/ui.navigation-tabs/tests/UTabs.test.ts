import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UTabs from "../UTabs.vue";
import UTab from "../../ui.navigation-tab/UTab.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props, UTabsOption } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UTabs.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("correctly sets the selected tab", () => {
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
        { value: "tab2", label: "Tab 2" },
        { value: "tab3", label: "Tab 3" },
      ];
      const modelValue = "tab2";

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

      expect(activeTab.classes()).toContain("border-primary");
    });

    // Options prop
    it("renders the correct number of tabs from options", () => {
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
        { value: "tab2", label: "Tab 2" },
        { value: "tab3", label: "Tab 3" },
      ];

      const component = mount(UTabs, {
        props: {
          options,
        },
      });

      // Find all UTab components
      const tabs = component.findAllComponents(UTab);

      // Check that the correct number of tabs are rendered
      expect(tabs.length).toBe(options.length);

      // Check that the tabs have the correct labels
      options.forEach((option, index) => {
        expect(tabs[index].text()).toBe(option.label);
      });
    });

    // Size prop
    it("applies the correct size to tabs", () => {
      const sizes = ["2xs", "xs", "sm", "md", "lg", "xl"];
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
      ];

      sizes.forEach((size) => {
        const component = mount(UTabs, {
          props: {
            options,
            size: size as Props["size"],
          },
        });

        // Find the UTab component
        const tab = component.findComponent(UTab);

        // Check that the tab has the correct size
        expect(tab.attributes("size")).toBe(size);
      });
    });

    // Scrollable prop
    it("applies scrollable class when scrollable prop is true", () => {
      const scrollable = true;
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
        { value: "tab2", label: "Tab 2" },
      ];

      const component = mount(UTabs, {
        props: {
          options,
          scrollable,
        },
      });

      // Find the tabs container
      const tabsContainer = component.find("[data-test]");

      // Check that the container has the scrollable class
      expect(tabsContainer.classes()).toContain("overflow-hidden");
      expect(tabsContainer.classes()).toContain("flex-nowrap");
      expect(tabsContainer.classes()).toContain("scroll-smooth");
    });

    // Block prop
    it("provides block value to tabs", () => {
      const block = true;
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
      ];

      const component = mount(UTabs, {
        props: {
          options,
          block,
        },
      });

      // Find the UTab component
      const tab = component.findComponent(UTab);

      // Check that the tab has the block attribute
      expect(tab.attributes("block")).toBe("true");
    });

    // Square prop
    it("provides square value to tabs", () => {
      const square = true;
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
      ];

      const component = mount(UTabs, {
        props: {
          options,
          square,
        },
      });

      // Find the UTab component
      const tab = component.findComponent(UTab);

      // Check that the tab has the square attribute
      expect(tab.attributes("square")).toBe("true");
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-tabs";
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
      ];

      const component = mount(UTabs, {
        props: {
          options,
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
      const options: UTabsOption[] = Array.from({ length: 10 }, (_, i) => ({
        value: `tab${i}`,
        label: `Tab ${i}`,
      }));

      const component = mount(UTabs, {
        props: {
          options,
          scrollable: true,
        },
        slots: {
          prev: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Mock the scroll position to show left arrow
      const scrollContainer = component.find("[data-test]").element;

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
      const options: UTabsOption[] = Array.from({ length: 10 }, (_, i) => ({
        value: `tab${i}`,
        label: `Tab ${i}`,
      }));

      const component = mount(UTabs, {
        props: {
          options,
          scrollable: true,
        },
        slots: {
          next: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Mock the scroll position to show right arrow
      const scrollContainer = component.find("[data-test]").element;

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
      const options: UTabsOption[] = [
        { value: "tab1", label: "Tab 1" },
        { value: "tab2", label: "Tab 2" },
      ];

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
      const component = mount(UTabs, {
        props: {
          options: [{ value: "tab1", label: "Tab 1" }],
        },
      });

      expect((component.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement }).wrapperRef).toBeDefined();
    });
  });

  // Scroll functionality tests
  describe("Scroll functionality", () => {
    // Scroll buttons
    it("shows scroll buttons when scrollable and content overflows", async () => {
      const options: UTabsOption[] = Array.from({ length: 10 }, (_, i) => ({
        value: `tab${i}`,
        label: `Tab ${i}`,
      }));

      const component = mount(UTabs, {
        props: {
          options,
          scrollable: true,
        },
      });

      // Mock the scroll position to show both arrows
      const scrollContainer = component.find("[data-test]").element;

      Object.defineProperty(scrollContainer, "scrollLeft", { value: 10 });
      Object.defineProperty(scrollContainer, "scrollWidth", { value: 1000 });
      Object.defineProperty(scrollContainer, "clientWidth", { value: 500 });

      // Trigger scroll event
      await component.find("[data-test]").trigger("scroll");

      // Both arrows should be visible
      const prevButton = component.findAllComponents(UButton)[0];
      const nextButton = component.findAllComponents(UButton)[1];

      expect(prevButton.exists()).toBe(true);
      expect(nextButton.exists()).toBe(true);
      expect(prevButton.props("icon")).toBe("chevron_left");
      expect(nextButton.props("icon")).toBe("chevron_right");
    });
  });
});
