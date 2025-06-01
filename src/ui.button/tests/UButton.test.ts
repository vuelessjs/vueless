import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UButton from "../UButton.vue";
import ULoader from "../../ui.loader/ULoader.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UButton.vue", () => {
  describe("Props", () => {
    // Variant prop
    it("applies the correct variant class", async () => {
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
            color: "primary",
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color class", async () => {
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

    // Size prop
    it("applies the correct size class", async () => {
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

    // Label prop
    it("renders the correct label text", () => {
      const label = "Button";

      const component = mount(UButton, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(label);
    });

    // Tag prop
    it("renders the correct HTML tag", () => {
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

    // Icon prop
    it("renders icon when icon prop is provided", () => {
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

    // Left Icon prop
    it("renders left icon when leftIcon prop is provided", () => {
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

    // Right Icon prop
    it("renders right icon when rightIcon prop is provided", () => {
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

    // Tabindex prop
    it("applies the correct tabindex attribute", () => {
      const tabindex = "2";

      const component = mount(UButton, {
        props: {
          tabindex,
        },
      });

      expect(component.attributes("tabindex")).toBe(tabindex);
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UButton, {
        props: {
          disabled,
        },
      });

      expect(component.attributes("disabled")).toBeDefined();
    });

    // Block prop
    it("applies block class when block prop is true", () => {
      const block = true;

      const component = mount(UButton, {
        props: {
          block,
        },
      });

      expect(component.attributes("class")).toContain("w-full");
    });

    // Round prop
    it("applies round class when round prop is true", () => {
      const round = true;

      const component = mount(UButton, {
        props: {
          round,
        },
      });

      expect(component.attributes("class")).toContain("rounded-full");
    });

    // Square prop
    it("applies square classes when square prop is true", () => {
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

    // Loading prop
    it("shows loader when loading prop is true", async () => {
      const loading = true;
      const label = "Button with some long text";

      const component = mount(UButton, {
        props: {
          loading,
          label,
        },
      });

      expect(component.text()).not.toBe(label);
      expect(component.findComponent(ULoader).exists()).toBe(true);
      expect(component.find("div.invisible").exists()).toBe(true);
      expect(component.attributes("class")).toContain("pointer-events-none"); // Unclickable
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-button-id";

      const component = mount(UButton, {
        props: {
          id,
        },
      });

      expect(component.attributes("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-button";

      const component = mount(UButton, {
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

    // Left slot
    it("renders content from left slot", () => {
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

    // Right slot
    it("renders content from right slot", () => {
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

  // Events tests
  describe("Events", () => {
    // Click event
    it("emits click event when clicked", async () => {
      const component = mount(UButton, {});

      await component.trigger("click");
      expect(component.emitted("click")).toBeTruthy();
    });

    // No click event when disabled
    it("does not emit click event when disabled", async () => {
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

  // Exposed refs tests
  describe("Exposed refs", () => {
    // buttonRef
    it("exposes buttonRef", () => {
      const component = mount(UButton, {});

      expect(component.vm.buttonRef).toBeDefined();
    });
  });
});
