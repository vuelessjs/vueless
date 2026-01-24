import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UPagination from "../UPagination.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("UPagination.vue", () => {
  describe("Props", () => {
    it("Variant – applies the correct variant to buttons", async () => {
      const variants = ["solid", "outlined", "subtle", "soft", "ghost"];

      variants.forEach((variant) => {
        const component = mount(UPagination, {
          props: {
            variant: variant as Props["variant"],
            modelValue: 2,
            total: 100,
            perPage: 10,
          },
        });

        const activeButton = component
          .findAllComponents(UButton)
          .find((button) => button.text() === "2");

        expect(activeButton?.props("variant")).toBe(variant);
      });
    });

    it("Size – applies the correct size to buttons", async () => {
      const sizes = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UPagination, {
          props: {
            size: size as Props["size"],
            modelValue: 1,
            total: 100,
            perPage: 10,
          },
        });

        const buttons = component.findAllComponents(UButton);

        // Check that all buttons have the correct font-size class
        buttons.forEach((button) => {
          expect(button.attributes("class")).toContain(classes);
        });
      });
    });

    it("ModelValue – correctly highlights the current page", () => {
      const currentPage = 3;

      const component = mount(UPagination, {
        props: {
          modelValue: currentPage,
          total: 100,
          perPage: 10,
        },
      });

      const activeButton = component
        .findAllComponents(UButton)
        .find((button) => button.text() === String(currentPage));

      expect(activeButton?.props("variant")).toBe("solid");
    });

    it("Total – calculates the correct number of pages", () => {
      const total = 100;
      const perPage = 10;

      const expectedAmountOfButtons = 5;

      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total,
          perPage,
        },
      });

      // Find all page buttons (excluding navigation buttons)
      const pageButtons = component.findAllComponents(UButton).filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      // With default limit of 5, we should see 5 page buttons or less
      expect(pageButtons.length).toBeLessThanOrEqual(expectedAmountOfButtons);
    });

    it("Limit – respects the limit of visible pages", () => {
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
      const pageButtons = component.findAllComponents(UButton).filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      expect(pageButtons.length).toBeLessThanOrEqual(limit);
    });

    it("FirstLabel, PrevLabel, NextLabel, LastLabel – displays custom navigation labels", () => {
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

    it("Disabled – disables all buttons when disabled prop is true", () => {
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

    it("Ellipsis – shows ellipsis when ellipsis prop is true", () => {
      const ellipsis = true;
      const expectedEllipsis = "…";

      const component = mount(UPagination, {
        props: {
          ellipsis,
          modelValue: 5,
          total: 100,
          perPage: 10,
        },
      });

      // Check for ellipsis character
      expect(component.html()).toContain(expectedEllipsis);
    });

    it("ShowFirst – hides first/last buttons when showFirst/showLast props are false", () => {
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

      // The first button should now be "prev" and the last button should be "next"
      expect(firstButton.findComponent(UIcon).props("name")).toContain("chevron_left");
      expect(lastButton.findComponent(UIcon).props("name")).toContain("chevron_right");
    });

    it("DataTest – applies the correct data-test attribute", () => {
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

  describe("Slots", () => {
    it("First – renders content from first slot", () => {
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

    it("Prev – renders content from prev slot", () => {
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

    it("Ellipsis – renders content from ellipsis slot", () => {
      const slotContent = "......";
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

    it("Next – renders content from next slot", () => {
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

    it("Last – renders content from last slot", () => {
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

  describe("Events", () => {
    it("Update:modelValue – emits update:modelValue event when page is changed", async () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
      });

      // Find the second page button and click it
      const pageButtons = component.findAllComponents(UButton).filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      // Second button
      await pageButtons[1].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual([2]); // Second button value
    });

    it("Navigation – navigates to correct pages when navigation buttons are clicked", async () => {
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

    it("Change – emits change event when page is changed", async () => {
      const component = mount(UPagination, {
        props: {
          modelValue: 1,
          total: 100,
          perPage: 10,
        },
      });

      // Find the second page button and click it
      const pageButtons = component.findAllComponents(UButton).filter((button) => {
        const text = button.text();

        return text && !isNaN(Number(text));
      });

      // Second button
      await pageButtons[1].trigger("click");

      expect(component.emitted("change")).toBeTruthy();
      expect(component.emitted("change")?.[0]).toEqual([2]); // Second button value
    });
  });

  describe("Exposed refs", () => {
    it("paginationRef – exposes paginationRef", () => {
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
