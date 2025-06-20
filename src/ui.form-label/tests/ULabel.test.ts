import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ULabel from "../ULabel.vue";

import type { Props } from "../types.ts";

describe("ULabel.vue", () => {
  describe("Props", () => {
    describe("label", () => {
      it("rendered inside label element", () => {
        const label = "Label Text";

        const wrapper = mount(ULabel, {
          props: {
            label,
          },
        });

        expect(wrapper.get("label").text()).toContain(label);
      });
    });

    describe("for", () => {
      it("applied to label element", () => {
        const forId = "input-id";

        const wrapper = mount(ULabel, {
          props: {
            for: forId,
            label: "Label",
          },
        });

        expect(wrapper.get("label").attributes("for")).toBe(forId);
      });
    });

    describe("description", () => {
      it("description is rendered with provided text", () => {
        const description = "This is a description";

        const wrapper = mount(ULabel, {
          props: {
            description,
          },
        });

        const descriptionElement = wrapper.find("[vl-key='description']");

        expect(descriptionElement.attributes("class")).not.toContain("text-error");
        expect(descriptionElement.text()).toBe(description);
      });
    });

    describe("error", () => {
      it("error is rendered with provided text", () => {
        const error = "This field is required";
        const errorClasses = "text-error";

        const wrapper = mount(ULabel, {
          props: {
            error,
            description: "This is a description",
          },
        });

        const errorElement = wrapper.find("[vl-key='description']");

        expect(errorElement.attributes("class")).toContain(errorClasses);
        expect(errorElement.text()).toBe(error);
      });

      it("error overrides description when both are provided", () => {
        const description = "This is a description";
        const error = "This field is required";
        const errorClasses = "text-error";

        const wrapper = mount(ULabel, {
          props: {
            description,
            error,
          },
        });

        const descriptionElements = wrapper.findAll("[vl-key='description']");

        expect(descriptionElements.length).toBe(1);
        expect(descriptionElements[0].attributes("class")).toContain(errorClasses);
        expect(descriptionElements[0].text()).toBe(error);
      });
    });

    describe("interactive", () => {
      it("applies cursor pointer class when true", () => {
        const interactiveClasses = "hover:cursor-pointer";

        const wrapper = mount(ULabel, {
          props: {
            interactive: true,
            label: "Label",
          },
        });

        expect(wrapper.get("label").attributes("class")).toContain(interactiveClasses);
      });

      it("does not apply cursor pointer class when false", () => {
        const interactiveClasses = "hover:cursor-pointer";

        const wrapper = mount(ULabel, {
          props: {
            interactive: false,
            label: "Label",
          },
        });

        expect(wrapper.get("label").attributes("class")).not.toContain(interactiveClasses);
      });
    });

    describe("align", () => {
      const alignClassCases: [Props["align"], string][] = [
        ["top", "flex-col"],
        ["topInside", "flex-col gap-0 relative"],
        ["topWithDesc", "flex-col-reverse"],
        ["left", "flex-row-reverse"],
        ["right", "flex-row"],
      ];

      it.each(alignClassCases)(
        "applies correct classes for align prop: %s",
        (align, expectedClass) => {
          const wrapper = mount(ULabel, {
            props: {
              label: "Label",
              align,
            },
          });

          expect(wrapper.attributes("class")).toContain(expectedClass);
        },
      );
    });

    describe("size", () => {
      const sizeClassCases: [Props["size"], string][] = [
        ["sm", "text-small"],
        ["md", "text-medium"],
        ["lg", "text-large"],
      ];

      it.each(sizeClassCases)("applies correct class for size prop: %s", (size, expectedClass) => {
        const wrapper = mount(ULabel, {
          props: {
            label: "Label",
            size,
          },
        });

        expect(wrapper.get("label").attributes("class")).toContain(expectedClass);
      });
    });

    describe("disabled", () => {
      it("applies disabled classes when true", () => {
        const disabledClasses = "cursor-not-allowed";

        const wrapper = mount(ULabel, {
          props: {
            disabled: true,
            label: "Label",
          },
        });

        expect(wrapper.attributes("class")).toContain(disabledClasses);
        expect(wrapper.get("label").attributes("class")).toContain(disabledClasses);
      });

      it("does not apply disabled class when false", () => {
        const disabledClasses = "cursor-not-allowed";

        const wrapper = mount(ULabel, {
          props: {
            disabled: false,
            label: "Label",
          },
        });

        expect(wrapper.attributes("class")).not.toContain(disabledClasses);
        expect(wrapper.get("label").attributes("class")).not.toContain(disabledClasses);
      });

      it("interactive class is not applied when disabled true", () => {
        const interactiveClasses = "hover:cursor-pointer";

        const wrapper = mount(ULabel, {
          props: {
            disabled: true,
            interactive: true,
            label: "Label",
          },
        });

        expect(wrapper.get("label").attributes("class")).not.toContain(interactiveClasses);
      });

      it("topInside label doesn't have focus styles disabled", () => {
        const focusClasses = "group-focus-within:text-primary";

        const wrapper = mount(ULabel, {
          props: {
            disabled: true,
            label: "Label",
            align: "topInside",
          },
        });

        expect(wrapper.get("label").attributes("class")).not.toContain(focusClasses);
      });

      it("error is not rendered when disabled is true", () => {
        const wrapper = mount(ULabel, {
          props: {
            error: "This field is required",
            disabled: true,
          },
        });

        const errorElement = wrapper.find("[vl-key='description']");

        expect(errorElement.exists()).toBe(false);
      });

      it("description text is preserved when disabled is true", () => {
        const description = "This is a description";

        const wrapper = mount(ULabel, {
          props: {
            description,
            disabled: true,
          },
        });

        const descriptionElement = wrapper.find("[vl-key='description']");

        expect(descriptionElement.text()).toBe(description);
      });
    });

    describe("centred", () => {
      it("applies centred class when true", () => {
        const centredClasses = "items-center";

        const wrapper = mount(ULabel, {
          props: {
            centred: true,
            label: "Label",
            align: "left",
          },
        });

        expect(wrapper.attributes("class")).toContain(centredClasses);
      });

      it("does not apply centred class when false", () => {
        const centredClasses = "items-center";

        const wrapper = mount(ULabel, {
          props: {
            centred: false,
            label: "Label",
            align: "left",
          },
        });

        expect(wrapper.attributes("class")).not.toContain(centredClasses);
      });
    });

    describe("dataTest", () => {
      const dataTestCases: string[] = ["label", "content", "error", "description"];

      it.each(dataTestCases)("applies the correct data-test attributes", async (testCase) => {
        const dataTest = "test";
        const resolvedDataTest = `test-${testCase}`;

        const testElementKey = testCase === "error" ? "description" : testCase;

        const wrapper = mount(ULabel, {
          props: {
            dataTest,
            label: "Label",
            description: "Description",
          },
        });

        if (testCase === "error") {
          await wrapper.setProps({ error: "Error message" });
        }

        const testElement = wrapper.get(`[vl-key='${testElementKey}']`);

        expect(testElement.attributes("data-test")).toBe(resolvedDataTest);
      });
    });
  });

  describe("Slots", () => {
    describe("default", () => {
      it("renders content from default slot", () => {
        const slotContent = "Default Slot Content";

        const wrapper = mount(ULabel, {
          slots: {
            default: slotContent,
          },
        });

        expect(wrapper.find("[vl-key='content']").text()).toBe(slotContent);
      });
    });

    describe("label", () => {
      it("renders content from label slot", () => {
        const slotContent = "Custom Label";
        const defaultLabel = "Default Label";

        const wrapper = mount(ULabel, {
          props: {
            label: defaultLabel,
          },
          slots: {
            label: slotContent,
          },
        });

        const labelElement = wrapper.get("label");

        expect(labelElement.text()).toBe(slotContent);
        expect(labelElement.text()).not.toContain(defaultLabel);
      });

      it("exposes label content", () => {
        const defaultLabel = "Label Content";
        const slotContent = "Modified Label Content";

        const wrapper = mount(ULabel, {
          props: {
            label: defaultLabel,
          },
          slots: {
            label: "Modified {{ params.label }}",
          },
        });

        const labelElement = wrapper.get("label");

        expect(labelElement.text()).toBe(slotContent);
      });
    });

    describe("bottom", () => {
      it("renders content from bottom slot", () => {
        const slotContent = "<div data-test='custom-bottom'>Bottom Slot Content</div>";

        const wrapper = mount(ULabel, {
          slots: {
            bottom: slotContent,
          },
        });

        expect(wrapper.find("[data-test='custom-bottom']").exists()).toBe(true);
      });
    });
  });

  describe("Events", () => {
    describe("click", () => {
      it("emits click event when label is clicked", async () => {
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
  });

  describe("Exposed properties", () => {
    it("exposes label element ref", () => {
      const defaultLabel = "Label";

      const wrapper = mount(ULabel, {
        props: {
          label: defaultLabel,
        },
      });

      expect(wrapper.vm.labelElement).toBeDefined();
      expect(wrapper.vm.labelElement!.tagName).toBe("LABEL");
      expect(wrapper.vm.labelElement!.textContent).toBe(defaultLabel);
    });

    it("exposes wrapper element ref", () => {
      const wrapper = mount(ULabel, {
        props: {
          label: "Label",
        },
      });

      expect(wrapper.vm.wrapperElement).toBeDefined();
      expect(wrapper.vm.wrapperElement!.getAttribute("vl-key")).toBe("wrapper");
    });
  });
});
