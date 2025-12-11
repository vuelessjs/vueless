import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

import UBreadcrumbs from "../UBreadcrumbs.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { UnknownObject } from "../../types";
import type { Props, UBreadcrumb } from "../types";

// Create a mock router for testing router-link functionality
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: { template: "<div>Home</div>" } },
    { path: "/products", name: "products", component: { template: "<div>Products</div>" } },
    { path: "/products/1", name: "product", component: { template: "<div>Product 1</div>" } },
  ],
});

// Helper function to mount component with router
const mountWithRouter = (component: unknown, options: UnknownObject) => {
  return mount(component, {
    ...options,
    global: {
      plugins: [router],
      ...(options.global || {}),
    },
  });
};

describe("UBreadcrumbs.vue", () => {
  describe("Props", () => {
    it("Links – renders the correct number of links", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: "Product 1", to: "/products/1" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
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

    it("Empty – renders nothing when links array is empty", () => {
      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links: [],
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      expect(linkComponents.length).toBe(0);
    });

    it("Disabled – disables link when disabled key is true", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/", disabled: true },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      expect(linkComponents[0].props("disabled")).toBe(true);
      expect(linkComponents[1].props("disabled")).toBe(false);
    });

    it("Link – disables link when it has no to or href", () => {
      const links: UBreadcrumb[] = [{ label: "Home" }, { label: "Products", to: "/products" }];

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      expect(linkComponents[0].props("disabled")).toBe(true);
      expect(linkComponents[1].props("disabled")).toBe(false);
    });

    it("Size – applies the correct size to links", () => {
      const sizes = ["sm", "md", "lg"];
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      sizes.forEach((size) => {
        const component = mountWithRouter(UBreadcrumbs, {
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

    it("Color – applies the correct color to links", () => {
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
        const component = mountWithRouter(UBreadcrumbs, {
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

    it("Target – applies the correct target to links", () => {
      const target = "_blank";
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
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

    it("Underlined – applies underlined style to links when underlined prop is true", () => {
      const underlined = true;
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
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

    it("Dashed – applies dashed style to links when dashed prop is true", () => {
      const dashed = true;
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
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

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-breadcrumbs";
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
          dataTest,
        },
      });

      const linkComponents = component.findAllComponents(ULink);

      // Check that all links have the correct data-test attribute
      linkComponents.forEach((link, index) => {
        expect(link.attributes("data-test")).toBe(`${dataTest}-item-${index}`);
      });
    });

    it("Link – renders icon when link has icon prop", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/", icon: "home" },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const iconComponents = component.findAllComponents(UIcon);

      // There should be 2 icons: 1 for the link icon and 1 for the divider
      expect(iconComponents.length).toBe(2);
      expect(iconComponents[0].props("name")).toBe("home");
    });

    it("Divider – renders divider icons between links", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: "Product 1", to: "/products/1" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
        },
      });

      const dividerIcons = component
        .findAllComponents(UIcon)
        .filter((icon) => icon.props("name") === "arrow_right");

      // There should be 2 divider icons (between 3 links)
      expect(dividerIcons.length).toBe(2);
    });
  });

  describe("Slots", () => {
    it("Before – renders content from before-link slot", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/", icon: "home" },
        { label: "Products", to: "/products" },
      ];
      const slotContent = "Custom Before Link";
      const slotClass = "before-link-content";

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
        },
        slots: {
          "before-link": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    it("After – renders content from after-link slot", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/", icon: "home" },
        { label: "Products", to: "/products" },
      ];
      const slotContent = "Custom After Link";
      const slotClass = "after-link-content";

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
        },
        slots: {
          "after-link": `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    it("Label – renders content from label slot", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];
      const slotContent = "Custom Label";
      const slotClass = "label-content";

      const component = mountWithRouter(UBreadcrumbs, {
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

    it("Divider – renders content from divider slot", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];
      const slotContent = ">";
      const slotClass = "divider-content";

      const component = mountWithRouter(UBreadcrumbs, {
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

  describe("Events", () => {
    it("clickLink – emits clickLink event when link is clicked", async () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
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

  describe("Exposed refs", () => {
    it("breadcrumbsRef – exposes breadcrumbsRef", () => {
      const links: UBreadcrumb[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const component = mountWithRouter(UBreadcrumbs, {
        props: {
          links,
        },
      });

      expect(component.vm.breadcrumbsRef).toBeDefined();
    });
  });
});
