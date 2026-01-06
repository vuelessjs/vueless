import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UGrid from "../UGrid.vue";

import type { Props } from "../types";

describe("UGrid.vue", () => {
  describe("Props", () => {
    it("Cols – applies the correct cols class", () => {
      const colsClasses = {
        "1": "grid-cols-1",
        "2": "grid-cols-2",
        "3": "grid-cols-3",
        "4": "grid-cols-4",
        "5": "grid-cols-5",
        "6": "grid-cols-6",
        "7": "grid-cols-7",
        "8": "grid-cols-8",
        "9": "grid-cols-9",
        "10": "grid-cols-10",
        "11": "grid-cols-11",
        "12": "grid-cols-12",
      };

      Object.entries(colsClasses).forEach(([cols, classes]) => {
        const component = mount(UGrid, {
          props: {
            cols: cols as Props["cols"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Rows – applies the correct rows class", () => {
      const rowsClasses = {
        "1": "grid-rows-1",
        "2": "grid-rows-2",
        "3": "grid-rows-3",
        "4": "grid-rows-4",
        "5": "grid-rows-5",
        "6": "grid-rows-6",
        "7": "grid-rows-7",
        "8": "grid-rows-8",
        "9": "grid-rows-9",
        "10": "grid-rows-10",
        "11": "grid-rows-11",
        "12": "grid-rows-12",
      };

      Object.entries(rowsClasses).forEach(([rows, classes]) => {
        const component = mount(UGrid, {
          props: {
            rows: rows as Props["rows"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Gap – applies the correct gap class", () => {
      const gapClasses = {
        none: "gap-0",
        "2xs": "gap-1",
        xs: "gap-2",
        sm: "gap-3",
        md: "gap-4",
        lg: "gap-5",
        xl: "gap-6",
        "2xl": "gap-8",
      };

      Object.entries(gapClasses).forEach(([gap, classes]) => {
        const component = mount(UGrid, {
          props: {
            gap: gap as Props["gap"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Row Gap – applies the correct row gap class", () => {
      const rowGapClasses = {
        none: "gap-y-0",
        "2xs": "gap-y-1",
        xs: "gap-y-2",
        sm: "gap-y-3",
        md: "gap-y-4",
        lg: "gap-y-5",
        xl: "gap-y-6",
        "2xl": "gap-y-8",
      };

      Object.entries(rowGapClasses).forEach(([rowGap, classes]) => {
        const component = mount(UGrid, {
          props: {
            rowGap: rowGap as Props["rowGap"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Col Gap – applies the correct col gap class", () => {
      const colGapClasses = {
        none: "gap-x-0",
        "2xs": "gap-x-1",
        xs: "gap-x-2",
        sm: "gap-x-3",
        md: "gap-x-4",
        lg: "gap-x-5",
        xl: "gap-x-6",
        "2xl": "gap-x-8",
      };

      Object.entries(colGapClasses).forEach(([colGap, classes]) => {
        const component = mount(UGrid, {
          props: {
            colGap: colGap as Props["colGap"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Align – applies the correct align class", () => {
      const alignClasses = {
        start: "items-start",
        end: "items-end",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline",
        normal: "items-normal",
      };

      Object.entries(alignClasses).forEach(([align, classes]) => {
        const component = mount(UGrid, {
          props: {
            align: align as Props["align"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Content – applies the correct content class", () => {
      const contentClasses = {
        start: "content-start",
        end: "content-end",
        center: "content-center",
        around: "content-around",
        evenly: "content-evenly",
        between: "content-between",
        normal: "content-normal",
        stretch: "content-stretch",
        baseline: "content-baseline",
      };

      Object.entries(contentClasses).forEach(([content, classes]) => {
        const component = mount(UGrid, {
          props: {
            content: content as Props["content"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Justify – applies the correct justify class", () => {
      const justifyClasses = {
        start: "justify-items-start",
        end: "justify-items-end",
        "end-safe": "justify-items-end-safe",
        center: "justify-items-center",
        "center-safe": "justify-items-center-safe",
        stretch: "justify-items-stretch",
        normal: "justify-items-normal",
      };

      Object.entries(justifyClasses).forEach(([justify, classes]) => {
        const component = mount(UGrid, {
          props: {
            justify: justify as Props["justify"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Place Content – applies the correct place content class", () => {
      const placeContentClasses = {
        start: "place-content-start",
        end: "place-content-end",
        "end-safe": "place-content-end-safe",
        center: "place-content-center",
        "center-safe": "place-content-center-safe",
        around: "place-content-around",
        evenly: "place-content-evenly",
        between: "place-content-between",
        stretch: "place-content-stretch",
        baseline: "place-content-baseline",
      };

      Object.entries(placeContentClasses).forEach(([placeContent, classes]) => {
        const component = mount(UGrid, {
          props: {
            placeContent: placeContent as Props["placeContent"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Place Items – applies the correct place items class", () => {
      const placeItemsClasses = {
        start: "place-items-start",
        end: "place-items-end",
        "end-safe": "place-items-end-safe",
        center: "place-items-center",
        "center-safe": "place-items-center-safe",
        stretch: "place-items-stretch",
        baseline: "place-items-baseline",
      };

      Object.entries(placeItemsClasses).forEach(([placeItems, classes]) => {
        const component = mount(UGrid, {
          props: {
            placeItems: placeItems as Props["placeItems"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Tag – renders the correct HTML tag", () => {
      const tags = ["div", "section", "article", "main", "aside", "nav", "span"];

      tags.forEach((tag) => {
        const component = mount(UGrid, {
          props: {
            tag,
          },
        });

        expect(component.element.tagName.toLowerCase()).toBe(tag);
      });
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "grid-test";

      const component = mount(UGrid, {
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

      const component = mount(UGrid, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });
  });

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UGrid);

      expect(component.vm.wrapperRef).toBeDefined();
      // wrapperRef is a reference to the wrapper div element, not a boolean
      expect(component.vm.wrapperRef instanceof HTMLElement).toBe(true);
    });
  });
});
