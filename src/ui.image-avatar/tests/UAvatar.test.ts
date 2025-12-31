import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UAvatar from "../UAvatar.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("UAvatar.vue", () => {
  // Props tests
  describe("Props", () => {
    // Label prop
    it("displays first letters of label when label prop is provided", () => {
      const label = "John Doe";
      const expectedText = "JD";

      const component = mount(UAvatar, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(expectedText);
    });

    // Label prop with a single word
    it("displays only first letter when label has only one word", () => {
      const label = "John";
      const expectedText = "J";

      const component = mount(UAvatar, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(expectedText);
    });

    // Src prop
    it("applies background image when src prop is provided", () => {
      const src = "https://example.com/avatar.jpg";
      const expectedStyle = `background-image: url("${src}")`;
      const expectedText = "";

      const component = mount(UAvatar, {
        props: {
          src,
        },
      });

      // Use the exposed ref to access the avatar div
      const avatarRef = component.vm.avatarRef;

      expect(avatarRef).toBeDefined();
      expect(avatarRef?.getAttribute("style")).toContain(expectedStyle);
      // When src is provided, the component should not render any text content
      expect(component.text()).toBe(expectedText);
    });

    // PlaceholderIcon prop
    it("uses custom placeholder icon when placeholderIcon prop is provided", () => {
      const placeholderIcon = "user";
      const expectedExists = true;

      const component = mount(UAvatar, {
        props: {
          placeholderIcon,
        },
        global: {
          stubs: {
            UIcon: true,
          },
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(expectedExists);
      expect(iconComponent.attributes("name")).toBe(placeholderIcon);
    });

    // Variant prop
    it("applies the correct variant to the avatar", () => {
      const color = "primary";
      const variants = {
        solid: "border-transparent text-inverted bg-primary",
        outlined: "border-primary text-primary",
        subtle: "border-primary/15 text-primary bg-primary/10",
        soft: "border-transparent text-primary bg-primary/10",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UAvatar, {
          props: {
            variant: variant as Props["variant"],
            color,
          },
        });

        // Use the exposed ref to access the avatar div
        const avatarRef = component.vm.avatarRef;

        expect(avatarRef).toBeDefined();
        expect(avatarRef?.className).toContain(classes);
      });
    });

    // Size prop
    it("applies the correct size to the avatar", () => {
      const sizes = {
        "3xs": "size-4",
        "2xs": "size-5",
        xs: "size-6",
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-14",
        "2xl": "size-16",
        "3xl": "size-20",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UAvatar, {
          props: {
            size: size as Props["size"],
          },
        });

        // Use the exposed ref to access the avatar div
        const avatarRef = component.vm.avatarRef;

        expect(avatarRef).toBeDefined();
        expect(avatarRef?.className).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color to the avatar", () => {
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
        const component = mount(UAvatar, {
          props: {
            color: color as Props["color"],
          },
        });

        // Use the exposed ref to access the avatar div
        const avatarRef = component.vm.avatarRef;

        expect(avatarRef).toBeDefined();
        expect(avatarRef?.className).toContain(color);
      });
    });

    // Rounded prop
    it("applies the correct rounded corners to the avatar", () => {
      const roundedValues = {
        none: "rounded-none",
        sm: "rounded-small",
        md: "rounded-medium",
        lg: "rounded-large",
        full: "rounded-full",
      };

      Object.entries(roundedValues).forEach(([rounded, classes]) => {
        const component = mount(UAvatar, {
          props: {
            rounded: rounded as Props["rounded"],
          },
        });

        // Use the exposed ref to access the avatar div
        const avatarRef = component.vm.avatarRef;

        expect(avatarRef).toBeDefined();
        expect(avatarRef?.className).toContain(classes);
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-avatar";

      const component = mount(UAvatar, {
        props: {
          dataTest,
        },
      });

      // Use the exposed ref to access the avatar div
      const avatarRef = component.vm.avatarRef;

      expect(avatarRef).toBeDefined();
      expect(avatarRef?.getAttribute("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Placeholder slot
    it("renders content from placeholder slot", () => {
      const slotContent = "Custom Placeholder";
      const slotClass = "custom-placeholder";
      const expectedExists = true;

      const component = mount(UAvatar, {
        slots: {
          placeholder: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(expectedExists);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("emits click event when clicked", async () => {
      const label = "John Doe";
      const expectedLength = 1;

      const component = mount(UAvatar, {
        props: {
          label,
        },
      });

      // Use the exposed ref to access the avatar div and trigger click
      const avatarRef = component.vm.avatarRef;

      expect(avatarRef).toBeDefined();
      avatarRef?.dispatchEvent(new Event("click"));

      expect(component.emitted("click")).toBeTruthy();
      expect(component.emitted("click")?.length).toBe(expectedLength);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // avatarRef
    it("exposes avatarRef", () => {
      const label = "John Doe";

      const component = mount(UAvatar, {
        props: {
          label,
        },
      });

      expect(component.vm.avatarRef).toBeDefined();
    });
  });
});
