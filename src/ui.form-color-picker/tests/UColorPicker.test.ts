import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UColorPicker from "../UColorPicker.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props } from "../types.ts";

// Mock the vTooltip directive
const vTooltip = {
  mounted: () => {},
  updated: () => {},
  unmounted: () => {},
};

describe("UColorPicker.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("selects the correct color based on modelValue", async () => {
      const modelValue = "primary";
      const colors = {
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
      };

      const component = mount(UColorPicker, {
        props: {
          modelValue,
          colors,
        },
        global: {
          directives: {
            tooltip: vTooltip,
          },
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons.length).toBe(2);

      // The button with the selected color should have the 'soft' variant
      // Find the button for the primary color (which should be selected)
      const selectedButton = buttons[0];

      expect(selectedButton.props("variant")).toBe("soft");

      // Verify that the correct color is selected
      await selectedButton?.trigger("click");
      expect(component.emitted("update:modelValue")?.[0]).toEqual([modelValue]);
    });

    // Size prop
    it("applies the correct size class", async () => {
      const sizes = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UColorPicker, {
          props: {
            modelValue: "",
            size: size as Props["size"],
            colors: {
              primary: "bg-primary-500",
            },
          },
          global: {
            directives: {
              tooltip: vTooltip,
            },
          },
        });

        const colorCircle = component.find("[vl-key='circle']");

        expect(colorCircle.attributes("class")).toContain(classes);
      });
    });

    // Colors prop
    it("renders the correct color buttons", () => {
      const colors = {
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
        error: "bg-error-500",
      };

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          colors,
        },
        global: {
          directives: {
            tooltip: vTooltip,
          },
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons.length).toBe(Object.keys(colors).length);

      // Check that each color has a button
      Object.entries(colors).forEach(([, colorClass]) => {
        const colorCircle = component.find(`.${colorClass.replace(/\//g, "\\/")}`); // Escape slashes in class names

        expect(colorCircle.exists()).toBe(true);
      });
    });

    // Labels prop
    it("applies the correct tooltips with labels", () => {
      const colors = {
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
      };

      const labels = {
        primary: "Primary Color",
        secondary: "Secondary Color",
      };

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          colors,
          labels,
        },
        global: {
          directives: {
            tooltip: vTooltip,
          },
        },
      });

      // Since we can't directly test directive values in Vue Test Utils,
      // we'll verify that the component was mounted with the correct props
      expect(component.props("labels")).toEqual(labels);

      // And check that we have the correct number of buttons
      const buttons = component.findAllComponents(UButton);

      expect(buttons.length).toBe(Object.keys(colors).length);
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-color-picker-id";

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          id,
          colors: {
            primary: "bg-primary-500",
          },
        },
        global: {
          directives: {
            tooltip: vTooltip,
          },
        },
      });

      expect(component.attributes("id")).toBe(id);
    });

    // DataTest prop
    it("passes the dataTest prop to the component", () => {
      const dataTest = "test-color-picker";

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          dataTest,
          colors: {
            primary: "bg-primary-500",
          },
        },
        global: {
          directives: {
            tooltip: vTooltip,
          },
        },
      });

      // Check that the dataTest prop is correctly passed to the component
      expect(component.props("dataTest")).toBe(dataTest);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:modelValue event
    it("emits update:modelValue event when a color is selected", async () => {
      const colors = {
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
      };

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          colors,
        },
        global: {
          directives: {
            tooltip: vTooltip,
          },
        },
      });

      const buttons = component.findAllComponents(UButton);

      // Click the first color button
      await buttons[0].trigger("click");
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")?.[0]).toEqual(["primary"]);

      // Click the second color button
      await buttons[1].trigger("click");
      expect(component.emitted("update:modelValue")?.[1]).toEqual(["secondary"]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // listRef
    it("exposes listRef", () => {
      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          colors: {
            primary: "bg-primary-500",
          },
        },
        global: {
          directives: {
            tooltip: vTooltip,
          },
        },
      });

      expect(component.vm.listRef).toBeDefined();
    });
  });
});
