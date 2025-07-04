import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

// @ts-expect-error - SVG component imports with ?component suffix are handled by Vite plugin.
import AddIcon from "./icons/add.svg?component";

import UIcon from "../UIcon.vue";
import type { Props } from "../types";

describe("UIcon.vue", () => {
  describe("Props", () => {
    it("Name – renders icon based on provided name", async () => {
      const name = "check";

      const component = mount(UIcon, {
        props: {
          name,
        },
      });

      await flushPromises();

      component.get("[vl-key='icon']");
    });

    it("Src – renders icon based on provided src", async () => {
      const component = mount(UIcon, {
        props: {
          src: AddIcon,
        },
      });

      await flushPromises();

      component.get("[vl-key='icon']");
    });

    it("Color – applies correct color classes", () => {
      const name = "check";
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
        "inherit",
      ];

      colors.forEach(async (color) => {
        const component = mount(UIcon, {
          props: {
            name,
            color: color as Props["color"],
          },
        });

        await flushPromises();

        expect(component.get("svg").attributes("class")).toContain(color);
      });
    });

    it("Size – applies correct size classes", () => {
      const name = "check";
      const sizes = {
        "4xs": "size-2.5",
        "3xs": "size-3",
        "2xs": "size-3.5",
        xs: "size-4",
        sm: "size-5",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
        "2xl": "size-12",
        "3xl": "size-14",
        "4xl": "size-16",
        "5xl": "size-20",
      };

      Object.entries(sizes).forEach(async ([size, classes]) => {
        const component = mount(UIcon, {
          props: {
            name,
            size: size as Props["size"],
          },
        });

        await flushPromises();

        expect(component.get("svg").attributes("class")).toContain(classes);
      });
    });

    it("Variant – applies the correct variant class", () => {
      const name = "check";
      const variants = {
        light: "brightness-125",
        default: "brightness-100",
        dark: "brightness-75",
      };

      Object.entries(variants).forEach(async ([variant, classes]) => {
        const component = mount(UIcon, {
          props: {
            name,
            variant: variant as Props["variant"],
          },
        });

        await flushPromises();

        expect(component.get("svg").attributes("class")).toContain(classes);
      });
    });

    it("Interactive – applies interactivity classes", async () => {
      const name = "check";
      const interactive = true;
      const interactiveClass = "cursor-pointer";

      const component = mount(UIcon, {
        props: {
          name,
          interactive,
        },
      });

      await flushPromises();

      expect(component.get("svg").attributes("class")).toContain(interactiveClass);
    });

    it("Disabled – applies disabled classes", async () => {
      const name = "check";
      const disabled = true;
      const disabledClass = "--vl-disabled-opacity";

      const component = mount(UIcon, {
        props: {
          name,
          disabled,
        },
      });

      await flushPromises();

      expect(component.get("svg").attributes("class")).toContain(disabledClass);
    });

    it("Data Test – accepts dataTest prop", async () => {
      const name = "check";
      const dataTest = "test";

      const component = mount(UIcon, {
        props: {
          name,
          dataTest,
        },
      });

      await flushPromises();

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Events", () => {
    it("Click – emits click event when clicked", async () => {
      const component = mount(UIcon, {
        props: {
          name: "check",
          interactive: true,
        },
      });

      await flushPromises();

      await component.trigger("click");

      expect(component.emitted("click")).toBeDefined();
    });

    it("Click – does not emit click event when disabled", async () => {
      const component = mount(UIcon, {
        props: {
          name: "check",
          disabled: true,
        },
      });

      await flushPromises();

      await component.trigger("click");

      expect(component.emitted("click")).toBeUndefined();
    });
  });

  describe("Exposed refs", () => {
    it("Icon – exposes iconRef and it references the correct SVG element", async () => {
      const component = mount(UIcon, {
        props: {
          name: "check",
        },
      });

      await flushPromises();

      const iconRef = component.vm.iconRef;

      expect(iconRef).toBeDefined();
      expect(iconRef).not.toBeNull();

      // Get the actual DOM element (handle both HTMLElement and ComponentPublicInstance)
      const iconElement = iconRef && "$el" in iconRef ? iconRef.$el : iconRef;

      expect(iconElement.tagName.toLowerCase()).toBe("svg");
    });
  });
});
