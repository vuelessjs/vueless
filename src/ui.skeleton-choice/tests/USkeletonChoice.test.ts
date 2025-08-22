import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USkeletonChoice from "../USkeletonChoice.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";

import type { Props } from "../types";

describe("USkeletonChoice.vue", () => {
  // Props tests
  describe("Props", () => {
    // Label prop - true
    it("renders label skeleton when label prop is true", () => {
      const label = true;

      const component = mount(USkeletonChoice, {
        props: {
          label,
        },
      });

      const skeletons = component.findAllComponents(USkeleton);

      expect(skeletons.length).toBe(2); // Input and label skeletons
    });

    // Label prop - false: Only input skeleton
    it("does not render label skeleton when label prop is false", () => {
      const label = false;

      const component = mount(USkeletonChoice, {
        props: {
          label,
        },
      });

      const skeletons = component.findAllComponents(USkeleton);

      expect(skeletons.length).toBe(1); // Only input skeleton
    });

    // Size prop
    it("applies the correct size class to wrapper", () => {
      const size = {
        sm: "gap-2",
        md: "gap-2.5",
        lg: "gap-3",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonChoice, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("applies the correct size class to input", () => {
      const size = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonChoice, {
          props: {
            size: size as Props["size"],
            label: false,
          },
        });

        const inputSkeleton = component.findComponent(USkeleton);

        expect(inputSkeleton.attributes("class")).toContain(classes);
      });
    });

    it("applies the correct size class to label", () => {
      const size = {
        sm: "h-3",
        md: "h-3.5",
        lg: "h-4",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonChoice, {
          props: {
            size: size as Props["size"],
          },
        });

        const labelSkeleton = component.findAllComponents(USkeleton)[1];

        expect(labelSkeleton.attributes("class")).toContain(classes);
      });
    });

    // LabelAlign prop
    it("applies the correct labelAlign class to wrapper", () => {
      const labelAlign = {
        left: "flex-row",
        right: "flex-row-reverse",
      };

      Object.entries(labelAlign).forEach(([labelAlign, classes]) => {
        const component = mount(USkeletonChoice, {
          props: {
            labelAlign: labelAlign as Props["labelAlign"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Type prop
    it("applies the correct type class to input", () => {
      const type = {
        checkbox: "rounded-small",
        radio: "rounded-full",
      };

      Object.entries(type).forEach(([type, classes]) => {
        const component = mount(USkeletonChoice, {
          props: {
            type: type as Props["type"],
          },
        });

        const inputSkeleton = component.findAllComponents(USkeleton)[0];

        expect(inputSkeleton.attributes("class")).toContain(classes);
      });
    });

    // Variant prop
    it("passes the correct variant to skeleton components", () => {
      const variants = ["light", "default", "dark"];

      variants.forEach((variant) => {
        const component = mount(USkeletonChoice, {
          props: {
            variant: variant as Props["variant"],
          },
        });

        const inputSkeleton = component.findAllComponents(USkeleton)[0];
        const labelSkeleton = component.findAllComponents(USkeleton)[1];

        expect(inputSkeleton.props("variant")).toBe(variant);
        expect(labelSkeleton.props("variant")).toBe(variant);
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-skeleton-choice";

      const component = mount(USkeletonChoice, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label";
      const slotClass = "custom-label";

      const component = mount(USkeletonChoice, {
        props: {
          label: true,
        },
        slots: {
          label: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.findAllComponents(USkeleton).length).toBe(1); // Only input skeleton, not label skeleton
    });
  });
});
