import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UChip from "../UChip.vue";
import UDot from "../../ui.other-dot/UDot.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("UChip.vue", () => {
  describe("Props", () => {
    it("Icon – renders UIcon when icon prop is provided", () => {
      const icon = "close";

      const component = mount(UChip, {
        props: {
          icon,
        },
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);
      const nestedUDotComponents = component.findAllComponents(UDot);

      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(icon);
      expect(nestedUDotComponents.length).toBe(0);
    });

    it("Default – renders UDot when no icon prop is provided", () => {
      const component = mount(UChip, {});

      const nestedUIconComponents = component.findAllComponents(UIcon);
      const nestedUDotComponents = component.findAllComponents(UDot);

      expect(nestedUIconComponents.length).toBe(0);
      expect(nestedUDotComponents.length).toBe(1);
    });

    it("Color – applies the correct color class to UDot component", async () => {
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
      ];

      colors.forEach((color) => {
        const component = mount(UChip, {
          props: {
            color: color as Props["color"],
          },
        });

        // Check if color is applied to the nested UDot component
        const dot = component.findComponent(UDot);

        expect(dot.exists()).toBe(true);
        expect(dot.props("color")).toBe(color);
      });
    });

    it("Color – applies the correct color class to UIcon component", async () => {
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
      ];

      colors.forEach((color) => {
        const componentWithIcon = mount(UChip, {
          props: {
            color: color as Props["color"],
            icon: "close",
          },
        });

        // Check if color is applied to the nested UIcon component
        const icon = componentWithIcon.findComponent(UIcon);

        expect(icon.exists()).toBe(true);
        expect(icon.props("color")).toBe(color);
      });
    });

    it("Size – applies the correct size class", async () => {
      const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"];

      sizes.forEach((size) => {
        const component = mount(UChip, {
          props: {
            size: size as Props["size"],
          },
        });

        const dot = component.findComponent(UDot);

        expect(dot.props("size")).toBe(size);
      });
    });

    it("X Position – applies the correct xPosition class", async () => {
      const xPositions = {
        left: "left-px",
        right: "right-px",
      };

      Object.entries(xPositions).forEach(([position, classes]) => {
        const component = mount(UChip, {
          props: {
            xPosition: position as Props["xPosition"],
          },
        });

        const chipWrapper = component.find("[vl-key='chipWrapper']");

        expect(chipWrapper.attributes("class")).toContain(classes);
      });
    });

    it("Y Position – applies the correct yPosition class", async () => {
      const yPositions = {
        top: "top-px",
        bottom: "bottom-px",
      };

      Object.entries(yPositions).forEach(([position, classes]) => {
        const component = mount(UChip, {
          props: {
            yPosition: position as Props["yPosition"],
          },
        });

        const chipWrapper = component.find("[vl-key='chipWrapper']");

        expect(chipWrapper.attributes("class")).toContain(classes);
      });
    });

    it("Inset – applies transform classes when inset prop is false", async () => {
      const inset = false;
      const yPosition = "top";
      const xPosition = "right";

      const component = mount(UChip, {
        props: {
          inset,
          yPosition,
          xPosition,
        },
      });

      const chipWrapper = component.find("[vl-key='chipWrapper']");

      expect(chipWrapper.attributes("class")).toContain("-translate-y-1/2");
      expect(chipWrapper.attributes("class")).toContain("translate-x-1/2");
    });

    it("Inset – does not apply transform classes when inset prop is true", async () => {
      const inset = true;
      const yPosition = "top";
      const xPosition = "right";

      const component = mount(UChip, {
        props: {
          inset,
          yPosition,
          xPosition,
        },
      });

      const chipWrapper = component.find("[vl-key='chipWrapper']");

      expect(chipWrapper.attributes("class")).not.toContain("-translate-y-1/2");
      expect(chipWrapper.attributes("class")).not.toContain("translate-x-1/2");
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-chip";

      const component = mount(UChip, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UChip, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Chip – renders content from chip slot", () => {
      const slotText = "Custom Chip";
      const slotClass = "custom-chip";

      const component = mount(UChip, {
        slots: {
          chip: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.findAllComponents(UDot).length).toBe(0);
      expect(component.findAllComponents(UIcon).length).toBe(0);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });
  });

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UChip, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
