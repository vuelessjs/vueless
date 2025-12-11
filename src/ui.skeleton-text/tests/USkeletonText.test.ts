import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USkeletonText from "../USkeletonText.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";

import type { Props } from "../types";

describe("USkeletonText.vue", () => {
  describe("Props", () => {
    it("HeaderLines – renders the correct number of header lines", () => {
      const headerLines = 3;

      const component = mount(USkeletonText, {
        props: {
          headerLines,
        },
      });

      const headerSkeletons = component
        .find("[vl-key='headerWrapper']")
        .findAllComponents(USkeleton);

      expect(headerSkeletons.length).toBe(headerLines);
    });

    it("TextLines – renders the correct number of text lines", () => {
      const textLines = 5;

      const component = mount(USkeletonText, {
        props: {
          textLines,
        },
      });

      const textSkeletons = component.find("[vl-key='textWrapper']").findAllComponents(USkeleton);

      expect(textSkeletons.length).toBe(textLines);
    });

    it("Size – applies the correct size class to header skeletons", () => {
      const size = {
        xs: "h-4.5",
        sm: "h-5",
        md: "h-6",
        lg: "h-7.5",
        xl: "h-9",
        "2xl": "h-11.5",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonText, {
          props: {
            size: size as Props["size"],
            headerLines: 1,
            textLines: 0,
          },
        });

        const headerSkeleton = component.find("[vl-key='headerWrapper']").findComponent(USkeleton);

        expect(headerSkeleton.attributes("class")).toContain(classes);
      });
    });

    it("Size – applies the correct size class to text skeletons", () => {
      const size = {
        xs: "h-3.5",
        sm: "h-4.5",
        md: "h-5",
        lg: "h-6",
        xl: "h-6",
        "2xl": "h-6",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USkeletonText, {
          props: {
            size: size as Props["size"],
            headerLines: 0,
            textLines: 1,
          },
        });

        const textSkeleton = component.find("[vl-key='textWrapper']").findComponent(USkeleton);

        expect(textSkeleton.attributes("class")).toContain(classes);
      });
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-skeleton-text";

      const component = mount(USkeletonText, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });
});
