import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UButton from "../UButton.vue";
import ULoader from "../../ui.loader/ULoader.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UButton.vue", () => {
  describe("Props", () => {
    it("Variant – applies the correct variant class", async () => {
      const color = "primary";
      const variants = {
        solid: "text-inverted bg-primary",
        outlined: "text-primary border-primary",
        subtle: "text-primary bg-primary/5 border-primary/15",
        soft: "text-primary bg-primary/5",
        ghost: "text-primary bg-transparent",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UButton, {
          props: {
            variant: variant as Props["variant"],
            color,
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Color – applies the correct color class", async () => {
      const colors = [
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "info",
        "notice",
        "neutral",
        "grayscale",
      ];

      colors.forEach((color) => {
        const component = mount(UButton, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    it("Size – applies the correct size class", async () => {
      const size = {
        "2xs": "text-small",
        xs: "text-small",
        sm: "text-medium",
        md: "text-medium",
        lg: "text-large",
        xl: "text-large",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UButton, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Label – renders the correct label text", () => {
      const label = "Button";

      const component = mount(UButton, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(label);
    });

    it("Tag – renders the correct HTML tag", () => {
      const tags = ["button", "a", "div"];

      tags.forEach((tag) => {
        const component = mount(UButton, {
          props: {
            tag,
          },
        });

        expect(component.element.tagName.toLowerCase()).toBe(tag);
      });
    });

    it("Icon – renders icon when prop is provided", () => {
      const icon = "close";
      const label = "Button";

      const component = mount(UButton, {
        props: {
          icon,
          label,
        },
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toBe("");
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(icon);
    });

    it("Left Icon – renders icon when prop is provided", () => {
      const leftIcon = "close";
      const label = "Button";

      const component = mount(UButton, {
        props: {
          leftIcon,
          label,
        },
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toBe(label);
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(leftIcon);
    });

    it("Right Icon – renders icon when prop is provided", () => {
      const rightIcon = "close";
      const label = "Button";

      const component = mount(UButton, {
        props: {
          rightIcon,
          label,
        },
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toBe(label);
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(rightIcon);
    });

    it("Tabindex – applies the correct attribute", () => {
      const tabindex = "2";

      const component = mount(UButton, {
        props: {
          tabindex,
        },
      });

      expect(component.attributes("tabindex")).toBe(tabindex);
    });

    it("Disabled – applies attribute when prop is true", () => {
      const disabled = true;

      const component = mount(UButton, {
        props: {
          disabled,
        },
      });

      expect(component.attributes("disabled")).toBeDefined();
    });

    it("Block – applies class when prop is true", () => {
      const block = true;
      const expectedClass = "w-full";

      const component = mount(UButton, {
        props: {
          block,
        },
      });

      expect(component.attributes("class")).toContain(expectedClass);
    });

    it("Round – applies class when prop is true", () => {
      const round = true;
      const expectedClass = "rounded-full";

      const component = mount(UButton, {
        props: {
          round,
        },
      });

      expect(component.attributes("class")).toContain(expectedClass);
    });

    it("Square – applies classes when prop is true", () => {
      const square = true;
      const size = {
        "2xs": "p-1",
        xs: "p-1.5",
        sm: "p-2",
        md: "p-2.5",
        lg: "p-3",
        xl: "p-3.5",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UButton, {
          props: {
            square,
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Loading – shows loader when prop is true", async () => {
      const loading = true;
      const label = "Button with some long text";
      const expectedClass = "pointer-events-none";

      const component = mount(UButton, {
        props: {
          loading,
          label,
        },
      });

      expect(component.text()).not.toBe(label);
      expect(component.findComponent(ULoader).exists()).toBe(true);
      expect(component.find("[vl-key='invisible']").exists()).toBe(true);
      expect(component.attributes("class")).toContain(expectedClass); // Unclickable
    });

    it("Id – applies the correct attribute", () => {
      const id = "test-button-id";

      const component = mount(UButton, {
        props: {
          id,
        },
      });

      expect(component.attributes("id")).toBe(id);
    });

    it("Data Test – applies the correct attribute", () => {
      const dataTest = "test-button";

      const component = mount(UButton, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Default – renders content", () => {
      const slotContent = "Custom Content";
      const label = "Button";

      const component = mount(UButton, {
        props: {
          label,
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).not.toContain(label);
      expect(component.text()).toContain(slotContent);
    });

    it("Left – renders content", () => {
      const label = "Button";
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UButton, {
        props: {
          label,
        },
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.text()).toContain(label);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Right – renders content", () => {
      const label = "Button";
      const slotText = "Right";
      const slotClass = "right-content";

      const component = mount(UButton, {
        props: {
          label,
        },
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.text()).toContain(label);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });
  });

  describe("Events", () => {
    it("Click – emits when clicked", async () => {
      const component = mount(UButton, {});

      await component.trigger("click");
      expect(component.emitted("click")).toBeTruthy();
    });

    it("Click – does not emit when disabled", async () => {
      const disabled = true;

      const component = mount(UButton, {
        props: {
          disabled,
        },
      });

      await component.trigger("click");
      expect(component.emitted("click")).toBeFalsy();
    });
  });

  describe("Exposed refs", () => {
    it("Button – exposes ref", () => {
      const component = mount(UButton, {});

      expect(component.vm.buttonRef).toBeDefined();
    });
  });
});
