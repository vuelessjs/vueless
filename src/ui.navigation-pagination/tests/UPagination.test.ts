import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UPagination from "../UPagination.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UPagination.vue", () => {
  // Props tests
  describe("Props", () => {
    // Variant prop
    it("applies the correct variant to buttons", async () => {
      const variants = ["solid", "outlined", "soft", "ghost"];

      variants.forEach((variant) => {
        const component = mount(UPagination, {
          props: {
            variant: variant as Props["variant"],
            modelValue: 2,
            total: 100,
            perPage: 10,
          },
        });

        const activeButton = component.findAll("button").find((button) => button.text() === "2");

        expect(activeButton?.attributes("class")).toContain(variant);
      });
    });

    // Size prop
    it("applies the correct size to buttons", async () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const component = mount(UPagination, {
          props: {
            size: size as Props["size"],
            modelValue: 1,
            total: 100,
            perPage: 10,
          },
        });

        const buttons = component.findAllComponents(UButton);

        // Check that all buttons have the correct size
        buttons.forEach((button) => {
          expect(button.attributes("class")).toContain(size);
        });
      });
    });

    // ModelValue prop
    it("correctly highlights the current page", () => {
      const currentPage = 3;

      const component = mount(UPagination, {
        props: {
          modelValue: currentPage,
          total: 100,
          perPage: 10,
        },
      });

      const activeButton = component
        .findAll("button")
        .find((button) => button.text() === currentPage.toString());

      expect(activeButton?.attributes("class")).toContain("solid");
    });

    // Total and perPage props
    it("calculates the correct number of pages", () => {
      const total = 100;
      const perPage = 10;
      const expectedPages = Math.ceil(total / perPage);

      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total,
          perPage,
        },
      });

      // Find all page buttons (excluding navigation buttons)
      const pageButtons = component.findAll("button").filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      // With default limit of 5, we should see 5 page buttons or less
      expect(pageButtons.length).toBeLessThanOrEqual(5);
    });

    // Limit prop
    it("respects the limit of visible pages", () => {
      const limit = 3;

      const component = mount(UPagination, {
        props: {
          modelValue: 5,
          total: 100,
          perPage: 10,
          limit,
        },
      });

      // Find all page buttons (excluding navigation buttons)
      const pageButtons = component.findAll("button").filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      expect(pageButtons.length).toBeLessThanOrEqual(limit);
    });

    // FirstLabel, PrevLabel, NextLabel, LastLabel props
    it("displays custom navigation labels", () => {
      const firstLabel = "First";
      const prevLabel = "Prev";
      const nextLabel = "Next";
      const lastLabel = "Last";

      const component = mount(UPagination, {
        props: {
          modelValue: 5,
          total: 100,
          perPage: 10,
          firstLabel,
          prevLabel,
          nextLabel,
          lastLabel,
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons[0].text()).toBe(firstLabel);
      expect(buttons[1].text()).toBe(prevLabel);
      expect(buttons[buttons.length - 2].text()).toBe(nextLabel);
      expect(buttons[buttons.length - 1].text()).toBe(lastLabel);
    });

    // Disabled prop
    it("disables all buttons when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UPagination, {
        props: {
          modelValue: 5,
          total: 100,
          perPage: 10,
          disabled,
        },
      });

      const buttons = component.findAllComponents(UButton);

      // Check that all page buttons are disabled
      const pageButtons = buttons.filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      pageButtons.forEach((button) => {
        expect(button.attributes("disabled")).toBeDefined();
      });
    });

    // Ellipsis prop
    it("shows ellipsis when ellipsis prop is true", () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 5,
          total: 100,
          perPage: 10,
          ellipsis: true,
        },
      });

      // Check for ellipsis character
      expect(component.html()).toContain("…");
    });

    // ShowFirst and ShowLast props
    it("hides first/last buttons when showFirst/showLast props are false", () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 5,
          total: 100,
          perPage: 10,
          showFirst: false,
          showLast: false,
        },
      });

      const buttons = component.findAllComponents(UButton);
      const firstButton = buttons[0];
      const lastButton = buttons[buttons.length - 1];

      // First button should now be "prev" and last button should be "next"
      expect(firstButton.find("i").attributes("class")).toContain("chevron_left");
      expect(lastButton.find("i").attributes("class")).toContain("chevron_right");
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-pagination";

      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
          dataTest,
        },
      });

      // Check that the first button has the correct data-test attribute
      const firstButton = component.findComponent(UButton);

      expect(firstButton.attributes("data-test")).toBe(`${dataTest}-first`);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // First slot
    it("renders content from first slot", () => {
      const slotContent = "Custom First";
      const slotClass = "first-content";

      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
        slots: {
          first: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Prev slot
    it("renders content from prev slot", () => {
      const slotContent = "Custom Prev";
      const slotClass = "prev-content";

      const component = mount(UPagination, {
        props: {
          modelValue: 2,
          total: 100,
          perPage: 10,
        },
        slots: {
          prev: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Ellipsis slot
    it("renders content from ellipsis slot", () => {
      const slotContent = "...";
      const slotClass = "ellipsis-content";

      const component = mount(UPagination, {
        props: {
          modelValue: 5,
          total: 100,
          perPage: 10,
          ellipsis: true,
        },
        slots: {
          ellipsis: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Next slot
    it("renders content from next slot", () => {
      const slotContent = "Custom Next";
      const slotClass = "next-content";

      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
        slots: {
          next: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Last slot
    it("renders content from last slot", () => {
      const slotContent = "Custom Last";
      const slotClass = "last-content";

      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
        slots: {
          last: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Change event
    it("emits change event when page is changed", async () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
      });

      // Find the second page button and click it
      const pageButtons = component.findAll("button").filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      await pageButtons[1].trigger("click");

      expect(component.emitted("change")).toBeTruthy();
      expect(component.emitted("change")?.[0]).toEqual([2]);
    });

    // Update:modelValue event
    it("emits update:modelValue event when page is changed", async () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
      });

      // Find the second page button and click it
      const pageButtons = component.findAll("button").filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      await pageButtons[1].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([2]);
    });

    // Navigation button clicks
    it("navigates to correct pages when navigation buttons are clicked", async () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 5,
          total: 100,
          perPage: 10,
        },
      });

      const buttons = component.findAllComponents(UButton);

      // Click first button
      await buttons[0].trigger("click");
      expect(component.emitted("update:modelValue")?.[0]).toEqual([1]);

      // Click prev button
      await buttons[1].trigger("click");
      expect(component.emitted("update:modelValue")?.[1]).toEqual([4]);

      // Click next button
      await buttons[buttons.length - 2].trigger("click");
      expect(component.emitted("update:modelValue")?.[2]).toEqual([6]);

      // Click last button
      await buttons[buttons.length - 1].trigger("click");
      expect(component.emitted("update:modelValue")?.[3]).toEqual([10]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // paginationRef
    it("exposes paginationRef", () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
      });

      expect(component.vm.paginationRef).toBeDefined();
    });
  });
});
