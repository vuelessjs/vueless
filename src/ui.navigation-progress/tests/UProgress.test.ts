import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UProgress from "../UProgress.vue";
import UStepperProgress from "../UStepperProgress.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UProgress.vue", () => {
  // Props tests
  describe("Props", () => {
    // Value prop
    it("sets the correct value for progress", () => {
      const value = 50;
      const max = 100;

      const component = mount(UProgress, {
        props: {
          value,
          max,
          variant: "progress",
        },
      });

      const progressElement = component.find("progress");

      expect(progressElement.attributes("value")).toBe(value.toString());
      expect(progressElement.attributes("max")).toBe(max.toString());
    });

    // Max prop (number)
    it("sets the correct max value for progress", () => {
      const value = 5;
      const max = 10;

      const component = mount(UProgress, {
        props: {
          value,
          max,
          variant: "progress",
        },
      });

      const progressElement = component.find("progress");

      expect(progressElement.attributes("max")).toBe(max.toString());
    });

    // Max prop (array)
    it("handles array of steps for max prop", () => {
      const value = 1;
      const max = ["Step 1", "Step 2", "Step 3"];

      const component = mount(UProgress, {
        props: {
          value,
          max,
          variant: "stepper",
        },
      });

      // Should render the active step
      const activeStep = component.find("h1");

      expect(activeStep.text()).toBe(max[value]);
    });

    // Size prop
    it("applies the correct size class", () => {
      const size = {
        xs: "h-0.5",
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      };
      const value = 50;

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UProgress, {
          props: {
            value,
            size: size as Props["size"],
            variant: "progress",
          },
        });

        const progressElement = component.find("progress");

        expect(progressElement.classes()).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color class", () => {
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
      const value = 50;

      colors.forEach((color) => {
        const component = mount(UProgress, {
          props: {
            value,
            color: color as Props["color"],
            variant: "progress",
          },
        });

        const progressElement = component.find("progress");

        expect(progressElement.classes()).toContain(`text-${color}`);
      });
    });

    // Variant prop
    it("renders progress bar when variant is progress", () => {
      const value = 50;
      const variant = "progress";

      const component = mount(UProgress, {
        props: {
          value,
          variant: variant as Props["variant"],
        },
      });

      const progressElement = component.find("progress");
      const stepperElement = component.findComponent(UStepperProgress);

      expect(progressElement.exists()).toBe(true);
      expect(stepperElement.exists()).toBe(false);
    });

    it("renders stepper when variant is stepper", () => {
      const value = 1;
      const max = ["Step 1", "Step 2", "Step 3"];
      const variant = "stepper";

      const component = mount(UProgress, {
        props: {
          value,
          max,
          variant: variant as Props["variant"],
        },
      });

      const progressElement = component.find("progress");
      const stepperElement = component.findComponent(UStepperProgress);

      expect(progressElement.exists()).toBe(false);
      expect(stepperElement.exists()).toBe(true);
    });

    // Indicator prop
    it("shows indicator when indicator prop is true", () => {
      const value = 50;
      const indicator = true;

      const component = mount(UProgress, {
        props: {
          value,
          indicator,
          variant: "progress",
        },
      });

      const indicatorElement = component.find("div[style]");

      expect(indicatorElement.exists()).toBe(true);
      expect(indicatorElement.text()).toBe("50%");
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const value = 1;
      const dataTest = "test-progress";

      const component = mount(UProgress, {
        props: {
          value,
          dataTest,
          variant: "stepper",
        },
      });

      const stepperElement = component.findComponent(UStepperProgress);

      expect(stepperElement.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Indicator slot
    it("renders content from indicator slot", () => {
      const value = 50;
      const slotContent = "Custom Indicator";
      const slotClass = "indicator-content";

      const component = mount(UProgress, {
        props: {
          value,
          indicator: true,
          variant: "progress",
        },
        slots: {
          indicator: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Step slot
    it("renders content from step slot", () => {
      const value = 1;
      const max = ["Step 1", "Step 2", "Step 3"];
      const slotContent = "Custom Step";
      const slotClass = "step-content";

      const component = mount(UProgress, {
        props: {
          value,
          max,
          variant: "stepper",
        },
        slots: {
          "step-1": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const value = 50;

      const component = mount(UProgress, {
        props: {
          value,
        },
      });

      expect((component.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement }).wrapperRef).toBeDefined();
    });
  });

  // Calculation tests
  describe("Calculations", () => {
    // Progress percentage calculation
    it("calculates the correct progress percentage", () => {
      const value = 25;
      const max = 100;

      const component = mount(UProgress, {
        props: {
          value,
          max,
          indicator: true,
          variant: "progress",
        },
      });

      const indicatorElement = component.find("div[style]");

      expect(indicatorElement.text()).toBe("25%");
      expect(indicatorElement.attributes("style")).toContain("width: 25%");
    });

    // Step calculation with array max
    it("correctly identifies the active step", () => {
      const value = 1;
      const max = ["Step 1", "Step 2", "Step 3"];

      const component = mount(UProgress, {
        props: {
          value,
          max,
          variant: "stepper",
        },
      });

      // Should render the active step (Step 2)
      const headerElement = component.findComponent(UHeader);

      expect(headerElement.props("label")).toBe("Step 2");
    });
  });
});
