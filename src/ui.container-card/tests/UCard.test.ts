import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCard from "../UCard.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { Props } from "../types.ts";

describe("UCard", () => {
  // Props
  describe("Props", () => {
    // Title prop
    it("renders with title prop", () => {
      const title = "Card Title";

      const component = mount(UCard, {
        props: {
          title,
        },
      });

      const header = component.findComponent(UHeader);

      expect(header.exists()).toBe(true);
      expect(header.props("label")).toBe(title);
    });

    // Title prop - Header visibility without props or slots
    it("does not show header when no title or slots are provided", () => {
      const component = mount(UCard);

      expect(component.findComponent(UHeader).exists()).toBe(false);
    });

    // Description prop
    it("renders with description prop", () => {
      const title = "Card Title";
      const description = "Card Description";

      const component = mount(UCard, {
        props: {
          title,
          description,
        },
      });

      expect(component.find("[vl-key='description']").text()).toContain(description);
    });

    // Variant prop
    it("applies correct variant classes", () => {
      const variants = {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default",
        soft: "bg-muted border-transparent",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UCard, {
          props: {
            variant: variant as Props["variant"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "card-test";

      const component = mount(UCard, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";

      const component = mount(UCard, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Title slot
    it("renders custom content in title slot", () => {
      const title = "Original Title";
      const slotClass = "custom-title";
      const slotContent = "Custom Title";

      const component = mount(UCard, {
        props: {
          title,
        },
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.findComponent(UHeader).exists()).toBe(false);
    });

    // Before-title slot
    it("renders content in before-title slot", () => {
      const title = "Card Title";
      const slotClass = "before-title";
      const slotContent = "Before Title";

      const component = mount(UCard, {
        props: {
          title,
        },
        slots: {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // After-title slot
    it("renders content in after-title slot", () => {
      const title = "Card Title";
      const slotClass = "after-title";
      const slotContent = "After Title";

      const component = mount(UCard, {
        props: {
          title,
        },
        slots: {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Actions slot
    it("renders content in actions slot", () => {
      const title = "Card Title";
      const slotClass = "actions";
      const slotContent = "Actions";

      const component = mount(UCard, {
        props: {
          title,
        },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Footer-left slot
    it("renders content in footer-left slot", () => {
      const slotClass = "footer-left";
      const slotContent = "Footer Left";

      const component = mount(UCard, {
        slots: {
          "footer-left": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.text()).toContain(slotContent);
    });

    // Footer-right slot
    it("renders content in footer-right slot", () => {
      const slotClass = "footer-right";
      const slotContent = "Footer Right";

      const component = mount(UCard, {
        slots: {
          "footer-right": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.text()).toContain(slotContent);
    });

    // Footer visibility without slots
    it("does not show footer when no footer slots are provided", () => {
      const component = mount(UCard);

      expect(component.find("[vl-key='footerLeft']").exists()).toBe(false);
      expect(component.find("[vl-key='footerRight']").exists()).toBe(false);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UCard);

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
