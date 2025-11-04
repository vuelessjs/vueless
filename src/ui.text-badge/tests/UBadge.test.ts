import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeAll } from "vitest";

import UBadge from "../UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("UBadge.vue", () => {
  let label: string;

  beforeAll(() => {
    label = "Badge";
  });

  describe("Props", () => {
    it("Variant – applies the correct variant class", async () => {
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

    it("Size – applies the correct size class", async () => {
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
        const component = mount(UBadge, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    it("Label – renders the correct label text", () => {
      const component = mount(UBadge, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(label);
    });

    it("Icon – renders icon when icon prop is provided", () => {
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

    it("Left – renders left icon when leftIcon prop is provided", () => {
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

    it("Right – renders right icon when rightIcon prop is provided", () => {
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

    it("Round – applies round class when round prop is true", () => {
      const round = true;
      const roundClasses = "rounded-full";

      const component = mount(UBadge, {
        props: {
          round,
        },
      });

      expect(component.attributes("class")).toContain(roundClasses);
    });

    it("Tabindex – applies the correct tabindex attribute", () => {
      const tabindex = "2";

      const component = mount(UBadge, {
        props: {
          tabindex,
        },
      });

      expect(component.attributes("tabindex")).toBe(tabindex);
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-badge";

      const component = mount(UBadge, {
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

    it("Left – renders content from left slot", () => {
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

    it("Right – renders content from right slot", () => {
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

    it("Slot – provides correct bindings to slots", () => {
      const icon = "star";
      const labelClass = "badge-label";
      const iconClass = "badge-icon";

      const component = mount(UBadge, {
        props: {
          label,
          icon,
        },
        slots: {
          default: `
            <template #default="{ label, iconName }">
              <span class="${labelClass}">{{ label }}</span>
              <span class="${iconClass}">{{ iconName }}</span>
            </template>
          `,
        },
      });

      expect(component.find(`.${labelClass}`).text()).toBe(label);
      expect(component.find(`.${iconClass}`).text()).toBe(icon);
    });
  });

  describe("Events", () => {
    it("Click – emits click event when clicked", async () => {
      const component = mount(UBadge, {});

      await component.trigger("click");

      expect(component.emitted("click")).toBeTruthy();
    });

    it("Focus – emits focus event when focused", async () => {
      const component = mount(UBadge, {});

      await component.trigger("focus");

      expect(component.emitted("focus")).toBeTruthy();
    });

    it("Blur – emits blur event when blurred", async () => {
      const component = mount(UBadge, {});

      await component.trigger("blur");

      expect(component.emitted("blur")).toBeTruthy();
    });

    it("Keydown – emits keydown event when key is pressed", async () => {
      const component = mount(UBadge, {});

      await component.trigger("keydown");

      expect(component.emitted("keydown")).toBeTruthy();
    });
  });

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UBadge, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
