import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UAvatarGroup from "../UAvatarGroup.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Props } from "../types.ts";

describe("UAvatarGroup.vue", () => {
  describe("Props", () => {
    // Size prop
    it("applies the correct size to child avatars", async () => {
      const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

      sizes.forEach((size) => {
        const component = mount(UAvatarGroup, {
          props: {
            size: size as Props["size"],
          },
          slots: {
            default: ['<UAvatar label="John Doe" />', '<UAvatar label="Jane Smith" />'],
          },
          global: {
            components: {
              UAvatar,
            },
          },
        });

        // Check if the remaining avatar has the correct size
        const remainingAvatar = component.findComponent(UAvatar);

        expect(remainingAvatar.props("size")).toBe(size);
      });
    });

    // Max prop
    it("limits the number of avatars displayed based on max prop", async () => {
      const component = mount(UAvatarGroup, {
        props: {
          max: 2,
        },
        slots: {
          default: [
            '<UAvatar label="John Doe" />',
            '<UAvatar label="Jane Smith" />',
            '<UAvatar label="Bob Johnson" />',
          ],
        },
        global: {
          components: {
            UAvatar,
          },
        },
      });

      // Should have 2 visible avatars + 1 remaining avatar
      const avatars = component.findAllComponents(UAvatar);

      expect(avatars.length).toBe(3);

      // The last avatar should be the remaining count avatar
      const lastAvatar = avatars[avatars.length - 1];

      expect(lastAvatar.props("label")).toBe("+1");
    });

    // Overlap prop
    it("applies the correct overlap style", async () => {
      const component = mount(UAvatarGroup, {
        props: {
          overlap: "0.5",
        },
        slots: {
          default: ['<UAvatar label="John Doe" />', '<UAvatar label="Jane Smith" />'],
        },
        global: {
          components: {
            UAvatar,
          },
        },
      });

      // The second avatar container should have a negative margin
      const avatarContainers = component.findAll("div > div");

      expect(avatarContainers[1].attributes("style")).toContain("margin-left: calc(-0.5 * 1em)");
    });

    // Zero overlap
    it("applies no overlap style when overlap is 0", async () => {
      const component = mount(UAvatarGroup, {
        props: {
          overlap: "0",
        },
        slots: {
          default: ['<UAvatar label="John Doe" />', '<UAvatar label="Jane Smith" />'],
        },
        global: {
          components: {
            UAvatar,
          },
        },
      });

      // The second avatar container should not have a margin style
      const avatarContainers = component.findAll("div > div");

      expect(avatarContainers[1].attributes("style")).not.toContain("margin-left");
    });
  });

  describe("Slots", () => {
    // Default slot
    it("renders avatars from default slot", async () => {
      const component = mount(UAvatarGroup, {
        slots: {
          default: ['<UAvatar label="John Doe" />', '<UAvatar label="Jane Smith" />'],
        },
        global: {
          components: {
            UAvatar,
          },
        },
      });

      const avatars = component.findAllComponents(UAvatar);

      expect(avatars.length).toBe(2);
    });

    // Remaining slot
    it("renders custom remaining slot", async () => {
      const component = mount(UAvatarGroup, {
        props: {
          max: 1,
        },
        slots: {
          default: ['<UAvatar label="John Doe" />', '<UAvatar label="Jane Smith" />'],
          remaining: '<UAvatar color="primary" label="Custom" />',
        },
        global: {
          components: {
            UAvatar,
          },
        },
      });

      const avatars = component.findAllComponents(UAvatar);

      expect(avatars.length).toBe(2);

      // The last avatar should be the custom remaining avatar
      const lastAvatar = avatars[avatars.length - 1];

      expect(lastAvatar.props("label")).toBe("Custom");

      expect(lastAvatar.props("color")).toBe("primary");
    });
  });
});
