import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import UThemeColorToggle from "../UThemeColorToggle.vue";
import UColorPicker from "../../ui.form-color-picker/UColorPicker.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

import type { Props } from "../types";
import type { ComponentPublicInstance } from "vue";

// Mock the setTheme function
vi.mock("../../utils/theme.ts", () => ({
  setTheme: vi.fn(),
}));

describe("UThemeColorToggle.vue", () => {
  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size to color pickers", async () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const component = mount(UThemeColorToggle, {
          props: {
            size: size as Props["size"],
            primaryColors: { blue: "#0000FF" },
            neutralColors: { gray: "#808080" },
          },
        });

        const colorPickers = component.findAllComponents(UColorPicker);

        expect(colorPickers.length).toBe(2);

        colorPickers.forEach((picker) => {
          expect(picker.props("size")).toBe(size);
        });
      });
    });

    // Primary prop
    it("sets the primary color correctly", async () => {
      const primary = "blue";

      const component = mount(UThemeColorToggle, {
        props: {
          primary,
          primaryColors: { blue: "#0000FF" },
        },
      });

      const primaryColorPicker = component.findAllComponents(UColorPicker)[0];

      expect(primaryColorPicker.props("modelValue")).toBe(primary);
    });

    // Neutral prop
    it("sets the neutral color correctly", async () => {
      const neutral = "gray";

      const component = mount(UThemeColorToggle, {
        props: {
          neutral,
          neutralColors: { gray: "#808080" },
        },
      });

      const neutralColorPicker = component.findAllComponents(UColorPicker)[1];

      expect(neutralColorPicker.props("modelValue")).toBe(neutral);
    });

    // PrimaryColors prop
    it("passes primaryColors to the primary color picker", async () => {
      const primaryColors = { blue: "#0000FF", red: "#FF0000" };

      const component = mount(UThemeColorToggle, {
        props: {
          primaryColors,
        },
      });

      const primaryColorPicker = component.findAllComponents(UColorPicker)[0];

      expect(primaryColorPicker.props("colors")).toEqual(primaryColors);
    });

    // NeutralColors prop
    it("passes neutralColors to the neutral color picker", async () => {
      const neutralColors = { gray: "#808080", black: "#000000" };

      const component = mount(UThemeColorToggle, {
        props: {
          neutralColors,
        },
      });

      const neutralColorPicker = component.findAllComponents(UColorPicker)[1];

      expect(neutralColorPicker.props("colors")).toEqual(neutralColors);
    });

    // PrimaryLabels prop
    it("passes primaryLabels to the primary color picker", async () => {
      const primaryLabels = { blue: "Blue", red: "Red" };

      const component = mount(UThemeColorToggle, {
        props: {
          primaryColors: { blue: "#0000FF", red: "#FF0000" },
          primaryLabels,
        },
      });

      const primaryColorPicker = component.findAllComponents(UColorPicker)[0];

      expect(primaryColorPicker.props("labels")).toEqual(primaryLabels);
    });

    // NeutralLabels prop
    it("passes neutralLabels to the neutral color picker", async () => {
      const neutralLabels = { gray: "Gray", black: "Black" };

      const component = mount(UThemeColorToggle, {
        props: {
          neutralColors: { gray: "#808080", black: "#000000" },
          neutralLabels,
        },
      });

      const neutralColorPicker = component.findAllComponents(UColorPicker)[1];

      expect(neutralColorPicker.props("labels")).toEqual(neutralLabels);
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-theme-toggle-id";

      const component = mount(UThemeColorToggle, {
        props: {
          id,
        },
      });

      expect(component.attributes("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-theme-toggle";

      const component = mount(UThemeColorToggle, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });

    // Divider visibility
    it("shows divider when both primaryColors and neutralColors are provided", () => {
      const component = mount(UThemeColorToggle, {
        props: {
          primaryColors: { blue: "#0000FF" },
          neutralColors: { gray: "#808080" },
        },
      });

      expect(component.findComponent(UDivider).exists()).toBe(true);
    });

    it("hides divider when primaryColors is empty", () => {
      const component = mount(UThemeColorToggle, {
        props: {
          primaryColors: {},
          neutralColors: { gray: "#808080" },
        },
      });

      expect(component.findComponent(UDivider).exists()).toBe(false);
    });

    it("hides divider when neutralColors is empty", () => {
      const component = mount(UThemeColorToggle, {
        props: {
          primaryColors: { blue: "#0000FF" },
          neutralColors: {},
        },
      });

      expect(component.findComponent(UDivider).exists()).toBe(false);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:primary event
    it("emits update:primary event when primary color changes", async () => {
      const primaryColors = { blue: "#0000FF", red: "#FF0000" };
      const newColor = "red";

      const component = mount(UThemeColorToggle, {
        props: {
          primaryColors,
        },
      });

      const primaryColorPicker = component.findAllComponents(UColorPicker)[0];

      primaryColorPicker.vm.$emit("update:modelValue", newColor);

      expect(component.emitted("update:primary")).toBeTruthy();
      expect(component.emitted("update:primary")![0]).toEqual([newColor]);
    });

    // update:neutral event
    it("emits update:neutral event when neutral color changes", async () => {
      const neutralColors = { gray: "#808080", black: "#000000" };
      const newColor = "black";

      const component = mount(UThemeColorToggle, {
        props: {
          neutralColors,
        },
      });

      const neutralColorPicker = component.findAllComponents(UColorPicker)[1];

      neutralColorPicker.vm.$emit("update:modelValue", newColor);

      expect(component.emitted("update:neutral")).toBeTruthy();
      expect(component.emitted("update:neutral")![0]).toEqual([newColor]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // listRef
    it("exposes listRef", () => {
      const component = mount(UThemeColorToggle, {});

      expect(
        (component.vm as ComponentPublicInstance & { listRef: HTMLDivElement }).listRef,
      ).toBeDefined();
    });
  });
});
