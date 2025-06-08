import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UEmpty from "../UEmpty.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { Props } from "../types.ts";

describe("UEmpty.vue", () => {
  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", async () => {
      const size = {
        sm: "2xl",
        md: "3xl",
        lg: "4xl",
      };

      Object.entries(size).forEach(([size, value]) => {
        const component = mount(UEmpty, {
          props: {
            size: size as Props["size"],
            description: "Test description", // Add description to render the element
          },
        });

        const headerComponent = component.findComponent(UIcon);

        expect(headerComponent.props("size")).toBe(value);
      });
    });

    // Title prop
    it("renders the correct title text", () => {
      const title = "Empty State Title";

      const component = mount(UEmpty, {
        props: {
          title,
        },
      });

      const headerComponent = component.findComponent(UHeader);

      expect(headerComponent.exists()).toBe(true);
      expect(headerComponent.props("label")).toBe(title);
    });

    // Description prop
    it("renders the correct description text", () => {
      const description = "Empty State Description";

      const component = mount(UEmpty, {
        props: {
          description,
        },
      });

      expect(component.text()).toContain(description);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-empty";

      const component = mount(UEmpty, {
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
    it("renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UEmpty, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    // Default slot overrides title and description
    it("default slot overrides title and description", () => {
      const title = "Empty State Title";
      const description = "Empty State Description";
      const slotContent = "Custom Content";

      const component = mount(UEmpty, {
        props: {
          title,
          description,
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
      expect(component.findComponent(UHeader).exists()).toBe(false);
      expect(component.text()).not.toContain(title);
      expect(component.text()).not.toContain(description);
    });

    // Header slot
    it("renders content from header slot", () => {
      const slotText = "Custom Header";
      const slotClass = "header-content";

      const component = mount(UEmpty, {
        slots: {
          header: `<div class='${slotClass}'>${slotText}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Header slot overrides default icon
    it("header slot overrides default icon", () => {
      const slotContent = "Custom Header";

      const component = mount(UEmpty, {
        slots: {
          header: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });

    // Footer slot
    it("renders content from footer slot", () => {
      const slotText = "Custom Footer";
      const slotClass = "footer-content";

      const component = mount(UEmpty, {
        slots: {
          footer: `<div class='${slotClass}'>${slotText}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UEmpty, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
