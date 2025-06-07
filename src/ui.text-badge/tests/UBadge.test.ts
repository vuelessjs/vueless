import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UBadge from "../UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UBadge.vue", () => {
  // Props tests
  describe("Props", () => {
    // Variant prop
    it("applies the correct variant class", async () => {
      const variants = {
        solid: "text-inverted bg-primary",
        outlined: "border-primary text-primary",
        subtle: "border-primary/15 text-primary bg-primary/10",
        soft: "text-primary bg-primary/10",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UBadge, {
          props: {
            variant: variant as Props["variant"],
            color: "primary",
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Size prop
    it("applies the correct size class", async () => {
      const size = {
        sm: "text-tiny",
        md: "text-small",
        lg: "text-medium",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UBadge, {
          props: {
            size: size as Props["size"],
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
        const component = mount(UBadge, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Badge";

      const component = mount(UBadge, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(label);
    });

    // Icon prop
    it("renders icon when icon prop is provided", () => {
      const icon = "close";

      const component = mount(UBadge, {
        props: {
          icon,
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
      const label = "Badge";

      const component = mount(UBadge, {
        props: {
          leftIcon,
          label,
        },
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toContain(label);
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(leftIcon);
    });

    // Right Icon prop
    it("renders right icon when rightIcon prop is provided", () => {
      const rightIcon = "close";
      const label = "Badge";

      const component = mount(UBadge, {
        props: {
          rightIcon,
          label,
        },
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      expect(component.text()).toContain(label);
      expect(nestedUIconComponents.length).toBe(1);
      expect(nestedUIconComponents[0].props("name")).toBe(rightIcon);
    });

    // Round prop
    it("applies round class when round prop is true", () => {
      const round = true;
      const roundClasses = "rounded-full";

      const component = mount(UBadge, {
        props: {
          round,
        },
      });

      expect(component.attributes("class")).toContain(roundClasses);
    });

    // Tabindex prop
    it("applies the correct tabindex attribute", () => {
      const tabindex = "2";

      const component = mount(UBadge, {
        props: {
          tabindex,
        },
      });

      expect(component.attributes("tabindex")).toBe(tabindex);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-badge";

      const component = mount(UBadge, {
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
      const label = "Badge";

      const component = mount(UBadge, {
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
      const label = "Badge";
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UBadge, {
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
      const label = "Badge";
      const slotText = "Right";
      const slotClass = "right-content";

      const component = mount(UBadge, {
        props: {
          label,
        },
        slots: {
          right: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.text()).toContain(label);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Slot bindings
    it("provides correct bindings to slots", () => {
      const label = "Badge";
      const icon = "star";

      const component = mount(UBadge, {
        props: {
          label,
          icon,
        },
        slots: {
          default: `
            <template #default="{ label, iconName }">
              <span class="badge-label">{{ label }}</span>
              <span class="badge-icon">{{ iconName }}</span>
            </template>
          `,
        },
      });

      expect(component.find(".badge-label").text()).toBe(label);
      expect(component.find(".badge-icon").text()).toBe(icon);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("emits click event when clicked", async () => {
      const component = mount(UBadge, {});

      await component.trigger("click");
      expect(component.emitted("click")).toBeTruthy();
    });

    // Focus event
    it("emits focus event when focused", async () => {
      const component = mount(UBadge, {});

      await component.trigger("focus");
      expect(component.emitted("focus")).toBeTruthy();
    });

    // Blur event
    it("emits blur event when blurred", async () => {
      const component = mount(UBadge, {});

      await component.trigger("blur");
      expect(component.emitted("blur")).toBeTruthy();
    });

    // Keydown event
    it("emits keydown event when key is pressed", async () => {
      const component = mount(UBadge, {});

      await component.trigger("keydown");
      expect(component.emitted("keydown")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UBadge, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
