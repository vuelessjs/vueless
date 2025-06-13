import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UBreadcrumbs from "../UBreadcrumbs.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props, UBreadcrumb } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UBreadcrumbs.vue", () => {
  // Props tests
  describe("Props", () => {
    // Links prop
    it("renders the correct number of links", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: "Product 1", to: "/products/1" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      expect(linkComponents.length).toBe(links.length);

      // Check that the links have the correct labels
      links.forEach((link, index) => {
        expect(linkComponents[index].text()).toBe(link.label);
      });
    });

    // Size prop
    it("applies the correct size to links", () => {
      const sizes = ["sm", "md", "lg"];
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      sizes.forEach((size) => {
        const component = mount(UBreadcrumbs, {
          props: {
            links,
            size: size as Props["size"],
          },
        });

        const linkComponents = component.findAllComponents(ULink);

        // Check that all links have the correct size
        linkComponents.forEach((link) => {
          expect(link.props("size")).toBe(size);
        });
      });
    });

    // Color prop
    it("applies the correct color to links", () => {
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
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      colors.forEach((color) => {
        const component = mount(UBreadcrumbs, {
          props: {
            links,
            color: color as Props["color"],
          },
        });

        const linkComponents = component.findAllComponents(ULink);

        // Check that all links have the correct color
        linkComponents.forEach((link) => {
          expect(link.props("color")).toBe(color);
        });
      });
    });

    // Target prop
    it("applies the correct target to links", () => {
      const target = "_blank";
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
          target,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      // Check that all links have the correct target
      linkComponents.forEach((link) => {
        expect(link.props("target")).toBe(target);
      });
    });

    // Underlined prop
    it("applies underlined style to links when underlined prop is true", () => {
      const underlined = true;
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
          underlined,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      // Check that all links have the underlined prop
      linkComponents.forEach((link) => {
        expect(link.props("underlined")).toBe(underlined);
      });
    });

    // Dashed prop
    it("applies dashed style to links when dashed prop is true", () => {
      const dashed = true;
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
          dashed,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      // Check that all links have the dashed prop
      linkComponents.forEach((link) => {
        expect(link.props("dashed")).toBe(dashed);
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-breadcrumbs";
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
          dataTest,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      // Check that all links have the correct data-test attribute
      linkComponents.forEach((link) => {
        expect(link.attributes("data-test")).toBe(dataTest);
      });
    });

    // Link with icon
    it("renders icon when link has icon prop", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/", icon: "home" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const iconComponents = component.findAllComponents(UIcon);

      // There should be 2 icons: 1 for the link icon and 1 for the divider
      expect(iconComponents.length).toBe(2);
      expect(iconComponents[0].props("name")).toBe("home");
    });

    // Divider icon
    it("renders divider icons between links", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: "Product 1", to: "/products/1" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const dividerIcons = component.findAllComponents(UIcon).filter(
        (icon) => icon.props("name") === "arrow_right"
      );

      // There should be 2 divider icons (between 3 links)
      expect(dividerIcons.length).toBe(2);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Icon slot
    it("renders content from icon slot", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/", icon: "home" },
        { label: "Products", to: "/products" },
      ];
      const slotContent = "Custom Icon";
      const slotClass = "icon-content";

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
        slots: {
          icon: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Label slot
    it("renders content from label slot", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];
      const slotContent = "Custom Label";
      const slotClass = "label-content";

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
        slots: {
          label: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Divider slot
    it("renders content from divider slot", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];
      const slotContent = ">";
      const slotClass = "divider-content";

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
        slots: {
          divider: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // clickLink event
    it("emits clickLink event when link is clicked", async () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      // Click the first link
      await linkComponents[0].trigger("click");

      // Check that the clickLink event was emitted with the correct link
      expect(component.emitted("clickLink")).toBeTruthy();
      expect(component.emitted("clickLink")?.[0]).toEqual([links[0]]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // breadcrumbsRef
    it("exposes breadcrumbsRef", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
      });

      expect(
        (component.vm as ComponentPublicInstance & { breadcrumbsRef: HTMLDivElement }).breadcrumbsRef
      ).toBeDefined();
    });
  });

  // Edge cases
  describe("Edge cases", () => {
    // Empty links array
    it("renders nothing when links array is empty", () => {
      const component = mount(UBreadcrumbs, {
        props: {
          links: [],
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      expect(linkComponents.length).toBe(0);
    });

    // Disabled link
    it("disables link when disabled prop is true", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/", disabled: true },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      expect(linkComponents[0].props("disabled")).toBe(true);
      expect(linkComponents[1].props("disabled")).toBe(false);
    });

    // Link without to or href
    it("disables link when it has no to or href", () => {
      const links: UBreadcrumb[] = [
        { label: "Home" },
        { label: "Products", to: "/products" },
      ];

      const component = mount(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      expect(linkComponents[0].props("disabled")).toBe(true);
      expect(linkComponents[1].props("disabled")).toBe(false);
    });
  });
});
