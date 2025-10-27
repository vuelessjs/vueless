import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

import UPage from "../UPage.vue";

import type { Props } from "../types";
import type { UnknownObject } from "../../types";

// Create a mock router for testing router-link functionality
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: { template: "<div>Home</div>" } },
    { path: "/back", name: "back", component: { template: "<div>Back</div>" } },
  ],
});

// Helper function to mount component with router
const mountWithRouter = (component: unknown, options: UnknownObject) => {
  return mount(component, {
    ...options,
    global: {
      plugins: [router],
      ...(options.global || {}),
    },
  });
};

describe("UPage.vue", () => {
  // Props tests
  describe("Props", () => {
    // Variant prop
    it("applies correct variant classes", () => {
      const variants = {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
        inverted: "bg-inverted border-transparent",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UPage, {
          props: {
            variant: variant as Props["variant"],
          },
        });

        // Check that the page element has the expected classes
        expect(component.find("[vl-key='page']").attributes("class")).toContain(classes);
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
      const variants = {
        true: "border-r-0",
        false: "rounded-large",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UPage, {
          props: {
            rounding: variant === "true",
          },
        });

        // Get the page element by vl-key
        const pageElement = component.find("[vl-key='page']");

        // Check that the page element has the expected classes
        expect(pageElement.attributes("class")).toContain(classes);
      });
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

      const descriptionElement = component.find("[vl-key='description']");

      expect(descriptionElement.exists()).toBe(true);
      expect(descriptionElement.text()).toBe(description);
    });

    // BackTo and BackLabel props
    it("renders back link correctly", () => {
      // Need to provide a valid RouteLocationRaw object
      const backTo = { path: "/back" };
      const backLabel = "Back";

      const component = mountWithRouter(UPage, {
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
      const component = mountWithRouter(UPage, {
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

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
