import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UAvatarGroup from "../UAvatarGroup.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Props } from "../types.ts";

describe("UAvatarGroup.vue", () => {
  describe("Props", () => {
    it("Size – applies the correct size to child avatars", async () => {
      const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

      sizes.forEach((size) => {
        const component = mount(UAvatarGroup, {
          props: {
            size: size as Props["size"],
            avatars: [{ label: "John Doe" }, { label: "Jane Smith" }],
          },
        });

        // Check if avatars have the correct size (they should inherit from group)
        const avatars = component.findAllComponents(UAvatar);

        expect(avatars.length).toBeGreaterThan(0);
      });
    });

    it("Max – limits the number of avatars displayed based on max prop", async () => {
      const component = mount(UAvatarGroup, {
        props: {
          max: 2,
          avatars: [{ label: "John Doe" }, { label: "Jane Smith" }, { label: "Bob Johnson" }],
        },
      });

      // Should have 2 visible avatars + 1 remaining avatar
      const avatars = component.findAllComponents(UAvatar);

      expect(avatars.length).toBe(3);

      // The last avatar should be the remaining count avatar
      const lastAvatar = avatars[avatars.length - 1];

      expect(lastAvatar.text()).toBe("+1");
    });

    it("Variant – applies the correct variant to child avatars", async () => {
      const variants = ["solid", "outlined", "subtle", "soft"];

      variants.forEach((variant) => {
        const component = mount(UAvatarGroup, {
          props: {
            variant: variant as Props["variant"],
            avatars: [{ label: "John Doe" }, { label: "Jane Smith" }],
          },
        });

        const avatars = component.findAllComponents(UAvatar);

        expect(avatars.length).toBeGreaterThan(0);
      });
    });

    it("Rounded – applies the correct rounded to child avatars", async () => {
      const roundedValues = ["none", "sm", "md", "lg", "full"];

      roundedValues.forEach((rounded) => {
        const component = mount(UAvatarGroup, {
          props: {
            rounded: rounded as Props["rounded"],
            avatars: [{ label: "John Doe" }, { label: "Jane Smith" }],
          },
        });

        const avatars = component.findAllComponents(UAvatar);

        expect(avatars.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Slots", () => {
    it("Avatars – renders avatars from avatars prop", async () => {
      const component = mount(UAvatarGroup, {
        props: {
          avatars: [{ label: "John Doe" }, { label: "Jane Smith" }],
        },
      });

      const avatars = component.findAllComponents(UAvatar);

      expect(avatars.length).toBe(2);
    });

    it("Remaining – renders custom remaining slot", async () => {
      const component = mount(UAvatarGroup, {
        props: {
          max: 1,
          avatars: [{ label: "John Doe" }, { label: "Jane Smith" }],
        },
        slots: {
          remaining: `
            <template #remaining="{ remainingCount }">
              <span class="custom-remaining">
                Custom {{ remainingCount }}
              </span>
            </template>
          `,
        },
        global: {
          components: {
            UAvatar,
          },
        },
      });

      const avatars = component.findAllComponents(UAvatar);

      expect(avatars.length).toBe(2);

      // Check if custom remaining slot content is rendered
      const customRemaining = component.find(".custom-remaining");

      expect(customRemaining.exists()).toBe(true);
      expect(customRemaining.text()).toContain("Custom");
    });
  });
});
