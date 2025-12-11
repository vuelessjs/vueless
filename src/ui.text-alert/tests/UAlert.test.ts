import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import UAlert from "../UAlert.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import UText from "../../ui.text-block/UText.vue";

import type { Props } from "../types";

describe("UAlert.vue", () => {
  describe("Props", () => {
    it("Variant – applies the correct variant class", async () => {
      const variants = {
        solid: "text-inverted bg-primary",
        outlined: "text-primary border-primary",
        subtle: "text-primary bg-primary/10 border-primary/15",
        soft: "text-primary bg-primary/10",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UAlert, {
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
        xs: "text-tiny",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UAlert, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
        expect(component.findComponent(UText).props("size")).toBe(size);
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
        const component = mount(UAlert, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    it("Title – renders the correct title text", () => {
      const title = "Alert Title";

      const component = mount(UAlert, {
        props: {
          title,
        },
      });

      expect(component.text()).toContain(title);
    });

    it("Description – renders the correct description text", () => {
      const description = "Alert Description";

      const component = mount(UAlert, {
        props: {
          description,
        },
      });

      expect(component.text()).toContain(description);
    });

    it("Icon – renders icon when icon prop is provided", () => {
      const icon = "info";

      const component = mount(UAlert, {
        props: {
          icon,
        },
      });

      const nestedUIconComponents = component.findAllComponents(UIcon);

      // At least one icon should be the alert icon
      const alertIcon = nestedUIconComponents.find((icon) => icon.props("name") === "info");

      expect(alertIcon).toBeDefined();
    });

    it("Closable – renders close button when closable prop is true", () => {
      const closable = true;

      const component = mount(UAlert, {
        props: {
          closable,
        },
      });

      const closeButton = component.findComponent(UButton);

      expect(closeButton.exists()).toBe(true);
    });

    it("Timeout – auto-closes after timeout", async () => {
      vi.useFakeTimers();

      const timeout = 1000;
      const component = mount(UAlert, {
        props: {
          timeout,
        },
      });

      expect(component.isVisible()).toBe(true);

      vi.advanceTimersByTime(timeout);
      await component.vm.$nextTick();

      expect(component.emitted("hide")).toBeTruthy();
      expect(component.isVisible()).toBe(false);

      vi.useRealTimers();
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-alert";

      const component = mount(UAlert, {
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

      const component = mount(UAlert, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Title – renders content from title slot", () => {
      const title = "Alert Title";
      const slotText = "Custom Title";
      const slotClass = "title-content";

      const component = mount(UAlert, {
        props: {
          title,
        },
        slots: {
          title: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.text()).not.toContain(title);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Description – renders content from description slot", () => {
      const description = "Alert Description";
      const slotText = "Custom Description";
      const slotClass = "description-content";

      const component = mount(UAlert, {
        props: {
          description,
        },
        slots: {
          description: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.text()).not.toContain(description);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Left – renders content from left slot", () => {
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UAlert, {
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Close – renders content from close slot", () => {
      const slotText = "Close";
      const slotClass = "close-content";

      const component = mount(UAlert, {
        props: {
          closable: true,
        },
        slots: {
          close: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    it("Slot – provides correct bindings to slots", () => {
      const title = "Alert Title";
      const description = "Alert Description";
      const icon = "info";

      // classes
      const titleClass = "alert-title";
      const descriptionClass = "alert-description";
      const iconClass = "alert-icon";

      const component = mount(UAlert, {
        props: {
          title,
          description,
          icon,
        },
        slots: {
          title: `
            <template #title="{ title }">
              <span class="${titleClass}">{{ title }}</span>
            </template>
          `,
          description: `
            <template #description="{ description }">
              <span class="${descriptionClass}">{{ description }}</span>
            </template>
          `,
          left: `
            <template #left="{ iconName }">
              <span class="${iconClass}">{{ iconName }}</span>
            </template>
          `,
        },
      });

      expect(component.find(`.${titleClass}`).text()).toBe(title);
      expect(component.find(`.${descriptionClass}`).text()).toBe(description);
      expect(component.find(`.${iconClass}`).text()).toBe(icon);
    });
  });

  describe("Events", () => {
    it("Hide – emits hidden event when close button is clicked", async () => {
      const component = mount(UAlert, {
        props: {
          closable: true,
        },
      });

      await component.findComponent(UButton).trigger("click");

      expect(component.emitted("hide")).toBeTruthy();
    });
  });

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UAlert, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
