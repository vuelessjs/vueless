import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ULabel from "../ULabel.vue";

import type { Props } from "../types.ts";

describe("ULabel.vue", () => {
  describe("Props", () => {
    it("Label – rendered inside label element", () => {
      const label = "Label Text";

      const component = mount(ULabel, {
        props: {
          label,
        },
      });

      expect(component.get("label").text()).toContain(label);
    });

    it("For – applied to label element", () => {
      const forId = "input-id";

      const component = mount(ULabel, {
        props: {
          for: forId,
          label: "Label",
        },
      });

      expect(component.get("label").attributes("for")).toBe(forId);
    });

    it("For – applies interactive classes when true", () => {
      const interactiveClasses = "hover:cursor-pointer";

      const component = mount(ULabel, {
        props: {
          for: "some-id",
          label: "Label",
        },
      });

      expect(component.get("label").attributes("class")).toContain(interactiveClasses);
    });

    it("Description – description is rendered with provided text", () => {
      const description = "This is a description";
      const errorClasses = "text-error";

      const component = mount(ULabel, {
        props: {
          description,
        },
      });

      const descriptionElement = component.find("[vl-key='description']");

      expect(descriptionElement.attributes("class")).not.toContain(errorClasses);
      expect(descriptionElement.text()).toBe(description);
    });

    it("Error – error is rendered with provided text", () => {
      const error = "This field is required";
      const errorClasses = "text-error";

      const component = mount(ULabel, {
        props: {
          error,
          description: "This is a description",
        },
      });

      const errorElement = component.find("[vl-key='error']");

      expect(errorElement.attributes("class")).toContain(errorClasses);
      expect(errorElement.text()).toBe(error);
    });

    it("Error – error overrides description when both are provided", () => {
      const description = "This is a description";
      const error = "This field is required";
      const errorClasses = "text-error";

      const component = mount(ULabel, {
        props: {
          description,
          error,
        },
      });

      const errorElement = component.find("[vl-key='error']");

      expect(component.find("[vl-key='description']").exists()).toBe(false);
      expect(errorElement.attributes("class")).toContain(errorClasses);
      expect(errorElement.text()).toBe(error);
    });

    it("Align – applies correct classes for align prop", () => {
      const alignCases = {
        top: "flex-col",
        topInside: "flex-col gap-0 relative",
        topWithDesc: "flex-col-reverse",
        left: "flex-row-reverse",
        right: "flex-row",
      };

      Object.entries(alignCases).forEach(([align, expectedClass]) => {
        const component = mount(ULabel, {
          props: {
            label: "Label",
            align: align as Props["align"],
          },
        });

        expect(component.attributes("class")).toContain(expectedClass);
      });
    });

    it("Size – applies correct class for size prop", () => {
      const sizeCases = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizeCases).forEach(([size, expectedClass]) => {
        const component = mount(ULabel, {
          props: {
            label: "Label",
            size: size as Props["size"],
          },
        });

        expect(component.get("label").attributes("class")).toContain(expectedClass);
      });
    });

    it("Disabled – applies disabled classes when true", () => {
      const disabledClasses = "cursor-not-allowed";

      const component = mount(ULabel, {
        props: {
          disabled: true,
          label: "Label",
        },
      });

      expect(component.attributes("class")).toContain(disabledClasses);
      expect(component.get("label").attributes("class")).toContain(disabledClasses);
    });

    it("Disabled – does not apply disabled class when false", () => {
      const disabledClasses = "cursor-not-allowed";

      const component = mount(ULabel, {
        props: {
          disabled: false,
          label: "Label",
        },
      });

      expect(component.attributes("class")).not.toContain(disabledClasses);
      expect(component.get("label").attributes("class")).not.toContain(disabledClasses);
    });

    it("Disabled – interactive class is not applied when disabled true", () => {
      const interactiveClasses = "hover:cursor-pointer";

      const component = mount(ULabel, {
        props: {
          disabled: true,
          for: "some-id",
          label: "Label",
        },
      });

      expect(component.get("label").attributes("class")).not.toContain(interactiveClasses);
    });

    it("Disabled – topInside label doesn't have focus styles disabled", () => {
      const focusClasses = "group-focus-within:text-primary";

      const component = mount(ULabel, {
        props: {
          disabled: true,
          label: "Label",
          align: "topInside",
        },
      });

      expect(component.get("label").attributes("class")).not.toContain(focusClasses);
    });

    it("Disabled – error is not rendered when disabled is true", () => {
      const component = mount(ULabel, {
        props: {
          error: "This field is required",
          disabled: true,
        },
      });

      expect(component.find("[vl-key='description']").exists()).toBe(false);
    });

    it("Disabled – description text is preserved when disabled is true", () => {
      const description = "This is a description";

      const component = mount(ULabel, {
        props: {
          description,
          disabled: true,
        },
      });

      expect(component.find("[vl-key='description']").text()).toBe(description);
    });

    it("Centred – applies centred class when true", () => {
      const centredClasses = "items-center";

      const component = mount(ULabel, {
        props: {
          centred: true,
          label: "Label",
          align: "left",
        },
      });

      expect(component.attributes("class")).toContain(centredClasses);
    });

    it("Centred – does not apply centred class when false", () => {
      const centredClasses = "items-center";

      const component = mount(ULabel, {
        props: {
          centred: false,
          label: "Label",
          align: "left",
        },
      });

      expect(component.attributes("class")).not.toContain(centredClasses);
    });

    it("Data Test – applies the correct data-test attributes", async () => {
      const dataTestCases: string[] = ["label", "content", "error", "description"];

      dataTestCases.forEach(async (testCase) => {
        const dataTest = "test";
        const resolvedDataTest = `test-${testCase}`;

        const component = mount(ULabel, {
          props: {
            dataTest,
            label: "Label",
            description: "Description",
            error: testCase === "error" ? "Error message" : "",
          },
        });

        const testElement = component.get(`[vl-key='${testCase}']`);

        expect(testElement.attributes("data-test")).toBe(resolvedDataTest);
      });
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
      const slotContent = "Default Slot Content";

      const component = mount(ULabel, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.find("[vl-key='content']").text()).toBe(slotContent);
    });

    it("Label – renders content from label slot", () => {
      const slotContent = "Custom Label";
      const defaultLabel = "Default Label";

      const component = mount(ULabel, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: slotContent,
        },
      });

      const labelElement = component.get("label");

      expect(labelElement.text()).toBe(slotContent);
      expect(labelElement.text()).not.toContain(defaultLabel);
    });

    it("Label – exposes label content", () => {
      const defaultLabel = "Label Content";
      const slotContent = "Modified Label Content";

      const component = mount(ULabel, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      expect(component.get("label").text()).toBe(slotContent);
    });

    it("Bottom – renders content from bottom slot", () => {
      const testClass = "custom-bottom";

      const component = mount(ULabel, {
        slots: {
          bottom: `<div class="${testClass}">Bottom Slot Content</div>`,
        },
      });

      expect(component.find(`.${testClass}`).exists()).toBe(true);
    });
  });

  describe("Events", () => {
    it("Click – emits click event when label is clicked", async () => {
      const component = mount(ULabel, {
        props: {
          label: "Label",
        },
      });

      const labelElement = component.get("label");

      await labelElement.trigger("click");

      expect(component.emitted("click")).toBeTruthy();
    });
  });

  describe("Exposed properties", () => {
    it("Exposes label element ref", () => {
      const defaultLabel = "Label";

      const component = mount(ULabel, {
        props: {
          label: defaultLabel,
        },
      });

      expect(component.vm.labelElement).toBeDefined();
      expect(component.vm.labelElement!.tagName).toBe("LABEL");
      expect(component.vm.labelElement!.textContent).toBe(defaultLabel);
    });

    it("Exposes wrapper element ref", () => {
      const component = mount(ULabel, {
        props: {
          label: "Label",
        },
      });

      expect(component.vm.wrapperElement).toBeDefined();
      expect(component.vm.wrapperElement!.getAttribute("vl-key")).toBe("wrapper");
    });
  });
});
