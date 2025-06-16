import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCard from "../UCard.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { ComponentPublicInstance } from "vue";
import type { Props } from "../types.ts";

describe("UCard", () => {
  // Props
  describe("Props", () => {
    // Title prop
    it("renders with title prop", () => {
      const title = "Card Title";

      const wrapper = mount(UCard, {
        props: {
          title,
        },
      });

      const header = wrapper.findComponent(UHeader);

      expect(header.exists()).toBe(true);
      expect(header.props("label")).toBe(title);
    });

    // Description prop
    it("renders with description prop", () => {
      const title = "Card Title";
      const description = "Card Description";

      const wrapper = mount(UCard, {
        props: {
          title,
          description,
        },
      });

      expect(wrapper.text()).toContain(description);
    });

    // Variant prop
    it("applies correct variant classes", () => {
      const variantClasses = {
        solid: {
          background: "bg-default",
          border: "border-transparent",
        },
        outlined: {
          background: "bg-default",
          border: "border-muted",
        },
        subtle: {
          background: "bg-muted",
          border: "border-default",
        },
        soft: {
          background: "bg-muted",
          border: "border-transparent",
        },
      };

      Object.entries(variantClasses).forEach(([variant, classes]) => {
        const wrapper = mount(UCard, {
          props: {
            variant: variant as Props["variant"],
          },
        });

        expect(wrapper.classes().some((c) => c.includes(classes.background))).toBe(true);
        expect(wrapper.classes().some((c) => c.includes(classes.border))).toBe(true);
      });
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "card-test";

      const wrapper = mount(UCard, {
        props: {
          dataTest,
        },
      });

      expect(wrapper.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "default-content";
      const slotContent = "Default Content";

      const wrapper = mount(UCard, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Title slot
    it("renders custom content in title slot", () => {
      const title = "Original Title";
      const slotClass = "custom-title";
      const slotContent = "Custom Title";

      const wrapper = mount(UCard, {
        props: {
          title,
        },
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(wrapper.findComponent(UHeader).exists()).toBe(false);
    });

    // Before-title slot
    it("renders content in before-title slot", () => {
      const title = "Card Title";
      const slotClass = "before-title";
      const slotContent = "Before Title";

      const wrapper = mount(UCard, {
        props: {
          title,
        },
        slots: {
          "before-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // After-title slot
    it("renders content in after-title slot", () => {
      const title = "Card Title";
      const slotClass = "after-title";
      const slotContent = "After Title";

      const wrapper = mount(UCard, {
        props: {
          title,
        },
        slots: {
          "after-title": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Actions slot
    it("renders content in actions slot", () => {
      const title = "Card Title";
      const slotClass = "actions";
      const slotContent = "Actions";

      const wrapper = mount(UCard, {
        props: {
          title,
        },
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Footer-left slot
    it("renders content in footer-left slot", () => {
      const slotClass = "footer-left";
      const slotContent = "Footer Left";

      const wrapper = mount(UCard, {
        slots: {
          "footer-left": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Footer-right slot
    it("renders content in footer-right slot", () => {
      const slotClass = "footer-right";
      const slotContent = "Footer Right";

      const wrapper = mount(UCard, {
        slots: {
          "footer-right": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Conditional rendering
  describe("Conditional rendering", () => {
    // Header visibility
    it("shows header when title prop is provided", () => {
      const title = "Card Title";

      const wrapper = mount(UCard, {
        props: {
          title,
        },
      });

      const header = wrapper.findComponent(UHeader);

      expect(header.exists()).toBe(true);
    });

    // Header visibility with title slot
    it("shows header when title slot is provided", () => {
      const slotClass = "custom-title";
      const slotContent = "Custom Title";

      const wrapper = mount(UCard, {
        slots: {
          title: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    // Header visibility with actions slot
    it("shows header when actions slot is provided", () => {
      const slotClass = "actions";
      const slotContent = "Actions";

      const wrapper = mount(UCard, {
        slots: {
          actions: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    // Header visibility without props or slots
    it("does not show header when no title or slots are provided", () => {
      const wrapper = mount(UCard);

      expect(wrapper.findComponent(UHeader).exists()).toBe(false);
    });

    // Footer visibility with footer-left slot
    it("shows footer when footer-left slot is provided", () => {
      const slotClass = "footer-left";
      const slotContent = "Footer Left";

      const wrapper = mount(UCard, {
        slots: {
          "footer-left": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    // Footer visibility with footer-right slot
    it("shows footer when footer-right slot is provided", () => {
      const slotClass = "footer-right";
      const slotContent = "Footer Right";

      const wrapper = mount(UCard, {
        slots: {
          "footer-right": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    // Footer visibility without slots
    it("does not show footer when no footer slots are provided", () => {
      const wrapper = mount(UCard);

      expect(wrapper.find(".footer-left").exists()).toBe(false);
      expect(wrapper.find(".footer-right").exists()).toBe(false);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const wrapper = mount(UCard);
      const vm = wrapper.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
