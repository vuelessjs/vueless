import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputRating from "../UInputRating.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UInputRating.vue", () => {
  describe("props", () => {
    it("Model Value – sets initial value correctly", () => {
      const initialValue = 3;
      const component = mount(UInputRating, {
        props: {
          modelValue: initialValue,
        },
      });

      const icons = component.findAllComponents(UIcon);

      expect(icons[2].props("name")).that.includes("star-fill");
      expect(icons[3].props("name")).that.includes("star");
    });

    it("Model Value – updates value on click", async () => {
      const component = mount(UInputRating, {
        props: {
          modelValue: 2,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const icons = component.findAllComponents(UIcon);

      await icons[3].trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe(4);
      expect(icons[3].props("name")).toBe("star-fill");
      expect(icons[4].props("name")).toBe("star");
    });

    it("Model Value – display zero value correctly", async () => {
      const emptyStarIcon = "star";

      const component = mount(UInputRating, {
        props: {
          modelValue: 0,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const icons = component.findAllComponents(UIcon);

      icons.forEach((icon) => {
        expect(icon.props("name")).toBe(emptyStarIcon);
      });

      await icons[0].trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe(1);
    });

    it("Stars – sets the number of stars correctly", () => {
      const starsCount = 7;

      const component = mount(UInputRating, {
        props: {
          modelValue: 0,
          stars: starsCount,
        },
      });

      const icons = component.findAllComponents(UIcon);

      expect(icons).toHaveLength(starsCount);
    });

    it("Size – applies correct size classes", () => {
      const counterSizeClasses = {
        sm: "text-large",
        md: "text-xl",
        lg: "text-2xl",
      };

      const totalSizeClasses = {
        sm: "text-medium",
        md: "text-large",
        lg: "text-xl",
      };

      Object.entries(counterSizeClasses).forEach(([size, counterClass]) => {
        const totalSizeClass = totalSizeClasses[size as keyof typeof totalSizeClasses];

        const component = mount(UInputRating, {
          props: {
            modelValue: 2,
            total: 5,
            counter: true,
            size: size as Props["size"],
          },
        });

        const counterElement = component.get("[vl-key='counter']");
        const totalElement = component.get("[vl-key='total']");

        expect(counterElement.attributes("class")).toContain(counterClass);
        expect(totalElement.attributes("class")).toContain(totalSizeClass);
      });
    });

    it("Active Icon – sets active icon correctly", () => {
      const activeIcon = "heart-fill";

      const component = mount(UInputRating, {
        props: {
          modelValue: 2,
          activeIcon: activeIcon,
        },
      });

      const icons = component.findAllComponents(UIcon);

      expect(icons[0].props("name")).toBe(activeIcon);
      expect(icons[1].props("name")).toBe(activeIcon);
      expect(icons[2].props("name")).not.toBe(activeIcon);
      expect(icons[3].props("name")).not.toBe(activeIcon);
    });

    it("Inactive Icon – sets inactive icon correctly", () => {
      const inactiveIcon = "heart";

      const component = mount(UInputRating, {
        props: {
          modelValue: 2,
          inactiveIcon: inactiveIcon,
        },
      });

      const icons = component.findAllComponents(UIcon);

      expect(icons[0].props("name")).not.toBe(inactiveIcon);
      expect(icons[1].props("name")).not.toBe(inactiveIcon);
      expect(icons[2].props("name")).toBe(inactiveIcon);
      expect(icons[3].props("name")).toBe(inactiveIcon);
    });

    it("Readonly – prevents interaction when true", async () => {
      const emptyStarIcon = "star";

      const component = mount(UInputRating, {
        props: {
          modelValue: 2,
          readonly: true,
        },
      });

      const icons = component.findAllComponents(UIcon);

      await icons[3].trigger("click");

      expect(component.emitted("update:modelValue")).toBeUndefined();
      expect(icons[3].props("name")).toBe(emptyStarIcon);
    });

    it("Disabled – prevents interaction when true", async () => {
      const component = mount(UInputRating, {
        props: {
          modelValue: 2,
          disabled: true,
        },
      });

      const icons = component.findAllComponents(UIcon);

      await icons[3].trigger("click");

      expect(component.emitted("update:modelValue")).toBeUndefined();
      expect(icons[3].props("name")).toBe("star");
    });

    it("Disabled – applies correct class when true", () => {
      const startDisabledClasses = "muted pointer-events-none";

      const component = mount(UInputRating, {
        props: {
          modelValue: 2,
          disabled: true,
        },
      });

      const icons = component.findAllComponents(UIcon);

      icons.forEach((icon) => {
        expect(icon.attributes("class")).toContain(startDisabledClasses);
      });
    });

    it("Total – displays total count when true", () => {
      const totalCount = 5;

      const component = mount(UInputRating, {
        props: {
          modelValue: 2,
          total: totalCount,
        },
      });

      expect(component.get("[vl-key='total']").text()).toContain(totalCount);
    });

    it("Counter – displays counter when true", () => {
      const value = 2;

      const component = mount(UInputRating, {
        props: {
          modelValue: value,
          counter: true,
        },
      });

      expect(component.get("[vl-key='counter']").text()).toContain(value);
    });

    it("Id - sets id attribute correctly", () => {
      const id = "test-id";

      const component = mount(UInputRating, {
        props: {
          modelValue: 0,
          id: id,
        },
      });

      expect(component.attributes("id")).toBe(id);
    });

    it("Data test – sets data-test attribute to stars", () => {
      const dataTest = "test-rating";

      const component = mount(UInputRating, {
        props: {
          modelValue: 0,
          "data-test": dataTest,
        },
      });

      const icons = component.findAllComponents(UIcon);

      icons.forEach((icon) => {
        expect(icon.attributes("data-test")).toContain(dataTest);
      });
    });
  });

  describe("Exposed Properties", () => {
    it("Exposes wrapper element", () => {
      const component = mount(UInputRating, {
        props: {
          modelValue: 0,
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
