import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UEmpty from "../UEmpty.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { Props } from "../types";

describe("UEmpty.vue", () => {
  describe("Props", () => {
    it("Size – applies the correct size class", async () => {
      const size = {
        sm: "xl",
        md: "3xl",
        lg: "5xl",
      };

      Object.entries(size).forEach(([size, value]) => {
        const component = mount(UEmpty, {
          props: {
            size: size as Props["size"],
            description: "Test description", // Add description to render the element
          },
        });

        const iconComponent = component.findComponent(UIcon);

        expect(iconComponent.props("size")).toBe(value);
      });
    });

    it("Icon – renders default icon when icon prop is not provided", () => {
      const defaultIcon = "emoji_food_beverage";

      const component = mount(UEmpty, {});
      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(defaultIcon);
    });

    it("Icon – renders default icon when icon prop is true", () => {
      const placeholderIcon = true;
      const defaultIcon = "emoji_food_beverage";

      const component = mount(UEmpty, {
        props: {
          placeholderIcon,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(defaultIcon);
    });

    it("Icon – renders custom icon when icon prop is a string", () => {
      const customIcon = "close";

      const component = mount(UEmpty, {
        props: {
          placeholderIcon: customIcon,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(customIcon);
    });

    it("Icon – does not render icon when icon prop is false", () => {
      const placeholderIcon = false;

      const component = mount(UEmpty, {
        props: {
          placeholderIcon,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(placeholderIcon);
    });

    it("Title – renders the correct title text", () => {
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

    it("Description – renders the correct description text", () => {
      const description = "Empty State Description";

      const component = mount(UEmpty, {
        props: {
          description,
        },
      });

      expect(component.text()).toContain(description);
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-empty";

      const component = mount(UEmpty, {
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

      const component = mount(UEmpty, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Default – default slot overrides title and description", () => {
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

    it("Header – renders content from header slot", () => {
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

    it("Header – header slot overrides default icon", () => {
      const slotContent = "Custom Header";

      const component = mount(UEmpty, {
        slots: {
          header: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });

    it("Footer – renders content from footer slot", () => {
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

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UEmpty, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
