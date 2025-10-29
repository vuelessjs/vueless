import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USkeletonInput from "../USkeletonInput.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";

import type { Props } from "../types";

describe("USkeletonInput.vue", () => {
  describe("Props", () => {
    it("Label – renders label skeleton when label prop is true and labelAlign is not topInside", () => {
      const label = true;
      const labelAlign = "top";

      // Input and label skeletons
      const expectedComponentAmount = 2;

      const component = mount(USkeletonInput, {
        props: {
          label,
          labelAlign,
        },
      });

      const skeletons = component.findAllComponents(USkeleton);

      expect(skeletons.length).toBe(expectedComponentAmount);
    });

    it("Label – does not render label skeleton when label prop is false", () => {
      const label = false;
      const labelAlign = "top";

      // Only input skeleton
      const expectedComponentAmount = 1;

      const component = mount(USkeletonInput, {
        props: {
          label,
          labelAlign,
        },
      });

      const skeletons = component.findAllComponents(USkeleton);

      expect(skeletons.length).toBe(expectedComponentAmount);
    });

    it("Label – does not render label skeleton when labelAlign is topInside", () => {
      const label = true;
      const labelAlign = "topInside";

      // Only input skeleton
      const expectedComponentAmount = 1;

      const component = mount(USkeletonInput, {
        props: {
          label,
          labelAlign: labelAlign as Props["labelAlign"],
        },
      });

      const skeletons = component.findAllComponents(USkeleton);

      expect(skeletons.length).toBe(expectedComponentAmount);
    });

    it("Size – applies the correct size class to input for input type", () => {
      const size = {
        sm: "h-11",
        md: "h-12.5",
        lg: "h-14.25",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonInput, {
          props: {
            size: size as Props["size"],
            type: "input",
            labelAlign: "topInside",
          },
        });

        const inputSkeleton = component.findComponent(USkeleton);

        expect(inputSkeleton.attributes("class")).toContain(classes);
      });
    });

    it("Size – applies the correct size class to input for textarea type", () => {
      const size = {
        sm: "h-15.75",
        md: "h-18",
        lg: "h-20.5",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonInput, {
          props: {
            size: size as Props["size"],
            type: "textarea",
            labelAlign: "topInside",
          },
        });

        const inputSkeleton = component.findComponent(USkeleton);

        expect(inputSkeleton.attributes("class")).toContain(classes);
      });
    });

    it("Size – applies the correct size class to label", () => {
      const size = {
        sm: "h-3",
        md: "h-3.5",
        lg: "h-4",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonInput, {
          props: {
            size: size as Props["size"],
            labelAlign: "top",
          },
        });

        const [labelSkeleton] = component.findAllComponents(USkeleton);

        expect(labelSkeleton.attributes("class")).toContain(classes);
      });
    });

    it("LabelAlign – applies the correct labelAlign class to wrapper", () => {
      const labelAlign = {
        top: "flex-col",
        left: "flex-row",
        right: "flex-row-reverse",
      };

      Object.entries(labelAlign).forEach(([labelAlign, classes]) => {
        const component = mount(USkeletonInput, {
          props: {
            labelAlign: labelAlign as Props["labelAlign"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Type – applies the correct type class to input", () => {
      const type = {
        input: "h-8.5", // Using md size and top labelAlign as default
        textarea: "h-14.5", // Using md size and top labelAlign as default
      };

      Object.entries(type).forEach(([type, classes]) => {
        const component = mount(USkeletonInput, {
          props: {
            type: type as Props["type"],
            size: "md",
            labelAlign: "top",
          },
        });

        const inputSkeleton = component.findAllComponents(USkeleton)[1]; // Label is at index 0

        expect(inputSkeleton.attributes("class")).toContain(classes);
      });
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-skeleton-input";

      const component = mount(USkeletonInput, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Label – renders content from label slot", () => {
      const slotContent = "Custom Label";
      const slotClass = "custom-label";

      const component = mount(USkeletonInput, {
        props: {
          label: true,
          labelAlign: "top", // To ensure label slot is rendered
        },
        slots: {
          label: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.findAllComponents(USkeleton).length).toBe(1); // Only input skeleton, not label skeleton
    });

    it("Default – renders content from default slot", () => {
      const slotContent = "Custom Content";
      const slotClass = "custom-content";

      const component = mount(USkeletonInput, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });
});
