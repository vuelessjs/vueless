import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCheckboxMultiState from "../UCheckboxMultiState.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("UCheckboxMultiState.vue", () => {
  describe("Props", () => {
    it("Name – sets the correct name attribute", async () => {
      const name = "checkbox-name";

      const component = mount(UCheckboxMultiState, {
        props: {
          name,
        },
      });

      await flushPromises();

      expect(component.find("input").attributes("name")).toBe(name);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(UCheckboxMultiState, {
        props: {
          label: labelText,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Label Align – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "right";

      const component = mount(UCheckboxMultiState, {
        props: {
          label: "Test Label",
          labelAlign,
        },
      });

      expect(component.getComponent(ULabel).props("align")).toBe(labelAlign);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(UCheckboxMultiState, {
        props: {
          description: descriptionText,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(descriptionText);
    });

    it("Size – passes correct size props to UCheckbox", () => {
      const size = "lg";

      const component = mount(UCheckboxMultiState, {
        props: {
          size: size as Props["size"],
        },
      });

      expect(component.getComponent(UCheckbox).props("size")).toBe(size);
    });

    it("Color – passes correct color prop to UCheckbox", () => {
      const color = "error";

      const component = mount(UCheckboxMultiState, {
        props: {
          color: color as Props["color"],
          modelValue: true,
        },
      });

      expect(component.getComponent(UCheckbox).props("color")).toBe(color);
    });

    it("Disabled – applies disabled attribute when disabled prop is true", () => {
      const component = mount(UCheckboxMultiState, {
        props: {
          disabled: true,
        },
      });

      const checkboxInput = component.getComponent(UCheckbox).get("input");

      expect(component.find("input").attributes("disabled")).toBeDefined();
      expect(component.findComponent(ULabel).props("disabled")).toBe(true);
      expect(checkboxInput.attributes("class")).toContain("disabled:");
    });

    it("Id – applies the correct id attribute", () => {
      const id = "test-switch-id";

      const component = mount(UCheckboxMultiState, {
        props: {
          id,
        },
      });

      expect(component.find("input").attributes("id")).toBe(id);
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-checkbox";
      const labelDataTest = "test-checkbox-label";

      const component = mount(UCheckboxMultiState, {
        props: {
          label: "Test",
          dataTest,
        },
      });

      expect(component.getComponent(ULabel).attributes("data-test")).toBe(labelDataTest);
      expect(component.get("input").attributes("data-test")).toBe(dataTest);
    });

    it("Options – applies correct icons from options", async () => {
      const options = [
        { value: "option1", icon: "check" },
        { value: "option2", icon: "close" },
        { value: "option3", icon: "cross" },
      ];

      const component = mount(UCheckboxMultiState, {
        props: {
          options,
          modelValue: "option1",
        },
      });

      await flushPromises();

      const checkboxIcon = component.getComponent(UCheckbox).getComponent(UIcon);
      const checkboxInput = component.get("input");

      expect(checkboxIcon.props("name")).toBe("check");

      await checkboxInput.trigger("change");

      expect(checkboxIcon.props("name")).toBe("close");

      await checkboxInput.trigger("change");

      expect(checkboxIcon.props("name")).toBe("cross");
    });

    it("Options – applies correct labels and descriptions from options", async () => {
      const options = [
        { value: "option1", label: "First Label", description: "First Description" },
        { value: "option2", label: "Second Label", description: "Second Description" },
        { value: "option3", label: "Third Label", description: "Third Description" },
      ];

      const component = mount(UCheckboxMultiState, {
        props: {
          options,
          modelValue: "option1",
        },
      });

      await flushPromises();

      const label = component.getComponent(ULabel);
      const checkboxInput = component.get("input");

      expect(label.props("label")).toBe("First Label");
      expect(label.props("description")).toBe("First Description");

      await checkboxInput.trigger("change");

      expect(label.props("label")).toBe("Second Label");
      expect(label.props("description")).toBe("Second Description");

      await checkboxInput.trigger("change");

      expect(label.props("label")).toBe("Third Label");
      expect(label.props("description")).toBe("Third Description");
    });

    it("Options – cycles through correct values from options", async () => {
      const options = [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ];

      const component = mount(UCheckboxMultiState, {
        props: {
          options,
          modelValue: "pending",
        },
      });

      await flushPromises();

      const checkboxInput = component.get("input");

      await checkboxInput.trigger("change");

      expect(component.emitted("update:modelValue")![0]).toEqual(["approved"]);

      await checkboxInput.trigger("change");

      expect(component.emitted("update:modelValue")![1]).toEqual(["rejected"]);

      await checkboxInput.trigger("change");

      expect(component.emitted("update:modelValue")![2]).toEqual(["pending"]);
    });
  });
});
