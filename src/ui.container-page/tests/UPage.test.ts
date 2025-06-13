import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UPage from "../UPage.vue";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UPage.vue", () => {
  // Props tests
  describe("Props", () => {
    // Variant prop
    it("applies correct variant classes", () => {
      const variantClasses = {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
      };

      Object.entries(variantClasses).forEach(([variant, classes]) => {
        const component = mount(UPage, {
          props: {
            variant: variant as Props["variant"],
          },
        });

        // The second div is the page element with pageAttrs
        // We need to use the wrapper element's first child
        const pageElement = component.find("div").element.children[0];

        // Check that the page element has the expected classes
        const pageClasses = pageElement.className.split(" ");
        const classArray = classes.split(" ");

        classArray.forEach((className) => {
          expect(pageClasses).toContain(className);
        });
      });
    });

    // Size prop
    it("applies correct size classes", () => {
      const sizeClasses = {
        xs: "md:w-[25rem]",
        sm: "md:w-[31.25rem]",
        md: "md:w-[37.5rem]",
        lg: "md:w-[43.75rem]",
        xl: "md:w-[50rem]",
        "2xl": "md:w-[56.25rem]",
        "3xl": "md:w-[62.5rem]",
        "4xl": "md:w-[68.75rem]",
        "5xl": "md:w-[75rem]",
        wide: "md:w-full",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UPage, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // TitleSize prop
    it("applies correct titleSize to the header", () => {
      const titleSizes = ["xs", "sm", "md", "lg", "xl", "2xl"];
      const title = "Test Title";

      titleSizes.forEach((size) => {
        const component = mount(UPage, {
          props: {
            title,
            titleSize: size as Props["titleSize"],
          },
        });

        const header = component.findComponent({ name: "UHeader" });

        expect(header.exists()).toBe(true);

        expect(header.props("size")).toBe(size);
      });
    });

    // Rounding prop
    it("applies correct rounding classes", () => {
      // Test with rounding=true
      const componentWithRounding = mount(UPage, {
        props: {
          rounding: true,
        },
      });

      // The second div is the page element with pageAttrs
      // We need to use the wrapper element's first child
      const pageElementWithRounding = componentWithRounding.find("div").element.children[0];

      // Check that the page element has the expected classes
      const pageClassesWithRounding = pageElementWithRounding.className.split(" ");

      expect(pageClassesWithRounding).toContain("md:pr-4");
      expect(pageClassesWithRounding).toContain("border-r-0");

      // Test with rounding=false
      const componentWithoutRounding = mount(UPage, {
        props: {
          rounding: false,
        },
      });

      // The second div is the page element with pageAttrs
      // We need to use the wrapper element's first child
      const pageElementWithoutRounding = componentWithoutRounding.find("div").element.children[0];

      // Check that the page element has the expected classes
      const pageClassesWithoutRounding = pageElementWithoutRounding.className.split(" ");

      expect(pageClassesWithoutRounding).toContain("rounded-large");
    });

    // Title prop
    it("renders the title correctly", () => {
      const title = "Test Title";

      const component = mount(UPage, {
        props: {
          title,
        },
      });

      const header = component.findComponent({ name: "UHeader" });

      expect(header.exists()).toBe(true);

      expect(header.props("label")).toBe(title);
    });

    // Description prop
    it("renders the description correctly", () => {
      const description = "Test Description";

      const component = mount(UPage, {
        props: {
          title: "Test Title", // Need a title to make isExistHeader true
          description,
        },
      });

      // The description is in the titleFallback div with descriptionAttrs
      // We need to check if the component's text contains the description
      // since we can't easily select the specific element with v-text

      expect(component.text()).toContain(description);
    });

    // BackTo and BackLabel props
    it("renders back link correctly", () => {
      // Need to provide a valid RouteLocationRaw object
      const backTo = { path: "/back" };
      const backLabel = "Back";

      const component = mount(UPage, {
        props: {
          title: "Test Title", // Need a title to make isExistHeader true
          backTo,
          backLabel,
        },
      });

      const backLink = component.findComponent({ name: "ULink" });

      expect(backLink.exists()).toBe(true);
      expect(backLink.props("to")).toEqual(backTo);
      expect(backLink.props("label")).toBe(backLabel);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "page-test";

      const component = mount(UPage, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotContent = "Default Content";
      const slotClass = "default-content";

      const component = mount(UPage, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Before-title slot
    it("renders content in before-title slot", () => {
      const slotContent = "Before Title Content";
      const slotClass = "before-title-content";

      const component = mount(UPage, {
        slots: {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Title slot
    it("renders content in title slot", () => {
      const slotContent = "Title Content";
      const slotClass = "title-content";

      const component = mount(UPage, {
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // After-title slot
    it("renders content in after-title slot", () => {
      const slotContent = "After Title Content";
      const slotClass = "after-title-content";

      const component = mount(UPage, {
        slots: {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Actions slot
    it("renders content in actions slot", () => {
      const slotContent = "Actions Content";
      const slotClass = "actions-content";

      const component = mount(UPage, {
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Footer-left slot
    it("renders content in footer-left slot", () => {
      const slotContent = "Footer Left Content";
      const slotClass = "footer-left-content";

      const component = mount(UPage, {
        slots: {
          "footer-left": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    // Footer-right slot
    it("renders content in footer-right slot", () => {
      const slotContent = "Footer Right Content";
      const slotClass = "footer-right-content";

      const component = mount(UPage, {
        slots: {
          "footer-right": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Back event
    it("emits back event when back link is clicked", async () => {
      const component = mount(UPage, {
        props: {
          title: "Test Title", // Need a title to make isExistHeader true
          backTo: { path: "/back" },
          backLabel: "Back",
        },
      });

      const backLink = component.findComponent({ name: "ULink" });

      expect(backLink.exists()).toBe(true);

      await backLink.trigger("click");
      expect(component.emitted()).toHaveProperty("back");
      expect(component.emitted().back).toHaveLength(1);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UPage);
      const vm = component.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
