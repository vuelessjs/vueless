import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

import ULink from "../ULink.vue";

import type { Props } from "../types.ts";

// Create a mock router for testing router-link functionality
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: { template: "<div>Home</div>" } },
    { path: "/about", name: "about", component: { template: "<div>About</div>" } },
  ],
});

describe("ULink.vue", () => {
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", async () => {
      const size = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(ULink, {
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
        "inherit",
      ];

      colors.forEach((color) => {
        const component = mount(ULink, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Link Text";

      const component = mount(ULink, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(label);
    });

    // Href prop
    it("renders the correct href attribute", () => {
      const href = "https://example.com";

      const component = mount(ULink, {
        props: {
          href,
        },
      });

      expect(component.attributes("href")).toBe(href);
    });

    // Type prop
    it("applies the correct href prefix based on type", () => {
      const types = {
        phone: { href: "1234567890", expected: "tel:1234567890" },
        email: { href: "test@example.com", expected: "mailto:test@example.com" },
        link: { href: "https://example.com", expected: "https://example.com" },
      };

      Object.entries(types).forEach(([type, { href, expected }]) => {
        const component = mount(ULink, {
          props: {
            type: type as Props["type"],
            href,
          },
        });

        expect(component.attributes("href")).toBe(expected);
      });
    });

    // To prop
    it("renders as router-link when to prop is provided", async () => {
      const to = "/about";

      const component = mount(ULink, {
        props: {
          to,
        },
        global: {
          plugins: [router],
        },
      });

      // Check if it's a router-link by looking for the to attribute
      expect(component.findComponent({ name: "RouterLink" }).exists()).toBe(true);
    });

    // Target prop
    it("applies the correct target attribute", () => {
      const targets = ["_blank", "_self", "_parent", "_top"];

      targets.forEach((target) => {
        const component = mount(ULink, {
          props: {
            target: target as Props["target"],
            href: "https://example.com",
          },
        });

        expect(component.attributes("target")).toBe(target);
      });
    });

    // Rel prop
    it("applies the correct rel attribute", () => {
      const rel = "noopener noreferrer";

      const component = mount(ULink, {
        props: {
          rel,
          href: "https://example.com",
        },
      });

      expect(component.attributes("rel")).toBe(rel);
    });

    // Underlined prop
    it("applies underlined class when underlined prop is true", () => {
      const underlined = {
        true: "underline",
        false: "no-underline",
        undefined: "hover:underline",
      };

      Object.entries(underlined).forEach(([value, expectedClass]) => {
        const component = mount(ULink, {
          props: {
            underlined: value === "undefined" ? undefined : value === "true",
          },
        });

        expect(component.attributes("class")).toContain(expectedClass);
      });
    });

    // Dashed prop
    it("applies dashed class when dashed prop is true", () => {
      const dashed = true;
      const dashedClass = "decoration-dashed";

      const component = mount(ULink, {
        props: {
          dashed,
        },
      });

      expect(component.attributes("class")).toContain(dashedClass);
    });

    // Dotted prop
    it("applies dotted class when dotted prop is true", () => {
      const dotted = true;
      const dottedClass = "decoration-dotted";

      const component = mount(ULink, {
        props: {
          dotted,
        },
      });

      expect(component.attributes("class")).toContain(dottedClass);
    });

    // Disabled prop
    it("applies disabled class when disabled prop is true", () => {
      const disabled = true;

      const component = mount(ULink, {
        props: {
          disabled,
        },
      });

      expect(component.attributes("class")).toContain("cursor-not-allowed");
    });

    // Block prop
    it("applies block class when block prop is true", () => {
      const block = true;
      const blockClass = "w-full";

      const component = mount(ULink, {
        props: {
          block,
        },
      });

      expect(component.attributes("class")).toContain(blockClass);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-link";

      const component = mount(ULink, {
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
      const label = "Link";

      const component = mount(ULink, {
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

    // Default slot with router-link
    it("renders content from default slot with router-link", () => {
      const slotContent = "Custom Content";
      const label = "Link";

      const component = mount(ULink, {
        props: {
          label,
          to: "/about",
        },
        slots: {
          default: slotContent,
        },
        global: {
          plugins: [router],
        },
      });

      expect(component.text()).not.toContain(label);
      expect(component.text()).toContain(slotContent);
    });

    // Default slot with bindings
    it("provides isActive and isExactActive bindings to default slot with router-link", () => {
      const component = mount(ULink, {
        props: {
          to: "/about",
        },
        slots: {
          default: `
            <template #default="{ isActive, isExactActive }">
              <span class="active-status">{{ isActive }}</span>
              <span class="exact-active-status">{{ isExactActive }}</span>
            </template>
          `,
        },
        global: {
          plugins: [router],
        },
      });

      expect(component.find(".active-status").exists()).toBe(true);
      expect(component.find(".exact-active-status").exists()).toBe(true);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("emits click event when clicked", async () => {
      const component = mount(ULink, {});

      await component.trigger("click");
      expect(component.emitted("click")).toBeTruthy();
    });

    // Mouseover event
    it("emits mouseover event when hovered", async () => {
      const component = mount(ULink, {});

      await component.trigger("mouseover");
      expect(component.emitted("mouseover")).toBeTruthy();
    });

    // Focus event
    it("emits focus event when focused", async () => {
      const component = mount(ULink, {});

      await component.trigger("focus");
      expect(component.emitted("focus")).toBeTruthy();
    });

    // Blur event
    it("emits blur event when blurred", async () => {
      const component = mount(ULink, {});

      await component.trigger("blur");
      expect(component.emitted("blur")).toBeTruthy();
    });

    // Keydown event
    it("emits keydown event when key is pressed", async () => {
      const component = mount(ULink, {});

      await component.trigger("keydown");
      expect(component.emitted("keydown")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // linkRef
    it("exposes linkRef", () => {
      const component = mount(ULink, {});

      expect(component.vm.linkRef).toBeDefined();
    });
  });
});
