import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UTextarea from "../UTextarea.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types";

describe("UTextarea.vue", () => {
  describe("Props", () => {
    it("Model Value – sets initial value correctly", () => {
      const initialValue = "Test textarea";

      const component = mount(UTextarea, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.get("textarea").element.value).toBe(initialValue);
    });

    it("Model Value – updates value on input", async () => {
      const updatedValue = "Updated textarea value";

      const component = mount(UTextarea, {
        props: {
          modelValue: "Initial value",
        },
      });

      await component.get("textarea").setValue(updatedValue);

      expect(component.emitted("update:modelValue")).toBeDefined();
      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Label – passes label to ULabel", () => {
      const label = "Test Label";

      const component = mount(UTextarea, {
        props: {
          label,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(label);
    });

    it("Size – applies correct classes based on size prop", () => {
      const sizeCases = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizeCases).forEach(([size, expectedClass]) => {
        const component = mount(UTextarea, {
          props: {
            label: "Label",
            size: size as Props["size"],
          },
        });

        expect(component.get("textarea").attributes("class")).toContain(expectedClass);
      });
    });

    it("Placeholder – sets placeholder correctly", () => {
      const placeholder = "Enter text here";

      const component = mount(UTextarea, {
        props: {
          placeholder,
        },
      });

      expect(component.get("textarea").attributes("placeholder")).toBe(placeholder);
    });

    it("Label Align – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "left";

      const component = mount(UTextarea, {
        props: {
          label: "Test Label",
          labelAlign,
        },
      });

      expect(component.getComponent(ULabel).props("align")).toBe(labelAlign);
    });

    it("Label Align – applies correct class based on labelAlign prop", () => {
      const labelAlignCases = ["left", "right"];
      const labelAlignClass = "w-full";

      labelAlignCases.forEach((align) => {
        const component = mount(UTextarea, {
          props: {
            label: "Test Label",
            labelAlign: align as Props["labelAlign"],
          },
        });

        expect(component.getComponent(ULabel).attributes("class")).toContain(labelAlignClass);
      });
    });

    it("Description – passes description to ULabel", () => {
      const description = "This is a description";

      const component = mount(UTextarea, {
        props: {
          description,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(description);
    });

    it("Error – passes error to ULabel", () => {
      const error = "This is an error message";

      const component = mount(UTextarea, {
        props: {
          error,
        },
      });

      expect(component.getComponent(ULabel).props("error")).toBe(error);
    });

    it("Error – applies error class to textarea", () => {
      const wrapperErrorClass = "border-error";
      const textareaErrorClass = "placeholder:text-error/50";

      const component = mount(UTextarea, {
        props: {
          error: "This is an error message",
        },
      });

      const wrapperElement = component.get("[vl-key='wrapper']");

      expect(wrapperElement.attributes("class")).toContain(wrapperErrorClass);
      expect(component.get("textarea").attributes("class")).toContain(textareaErrorClass);
    });

    it("Resizable – applies correct class based on resizable prop", () => {
      const component = mount(UTextarea, {
        props: {
          resizable: true,
        },
      });

      expect(component.get("textarea").attributes("class")).not.toContain("resize-none");

      const componentResizable = mount(UTextarea, {
        props: {
          resizable: false,
        },
      });

      expect(componentResizable.get("textarea").attributes("class")).toContain("resize-none");
    });

    it("Auto Resize – applies correct classes when autoResize is enabled", () => {
      const autoResize = true;
      const expectedClasses = "resize-none overflow-hidden";

      const component = mount(UTextarea, {
        props: {
          autoResize,
        },
      });

      expect(component.props("autoResize")).toBe(autoResize);
      expect(component.get("textarea").attributes("class")).toContain(expectedClasses);
    });

    it("Auto Resize – does not adjust height when disabled", async () => {
      const component = mount(UTextarea, {
        props: {
          autoResize: false,
          rows: 2,
          modelValue: "",
        },
      });

      const textarea = component.get("textarea");
      const textareaElement = textarea.element;
      const initialHeight = textareaElement.style.height;

      await textarea.setValue("line1\nline2\nline3\nline4\nline5");
      await textarea.trigger("input");

      expect(textareaElement.style.height).toBe(initialHeight);
    });

    it("Auto Resize – does not adjust height when readonly", async () => {
      const component = mount(UTextarea, {
        props: {
          autoResize: true,
          readonly: true,
          rows: 2,
          modelValue: "",
        },
      });

      const textarea = component.get("textarea");
      const textareaElement = textarea.element;

      const initialHeight = textareaElement.style.height;

      await textarea.setValue("line1\nline2\nline3\nline4\nline5");
      await textarea.trigger("input");

      expect(textareaElement.style.height).toBe(initialHeight);
    });

    it("Auto Resize – respects minimum rows", async () => {
      const component = mount(UTextarea, {
        props: {
          autoResize: true,
          rows: 3,
          modelValue: "short",
        },
      });

      const textarea = component.get("textarea");

      await textarea.trigger("input");

      expect(textarea.attributes("rows")).toBe("3");
    });

    it("Readonly – sets textarea to readonly", () => {
      const component = mount(UTextarea, {
        props: {
          readonly: true,
        },
      });

      expect(component.get("textarea").attributes("readonly")).toBeDefined();
    });

    it("Max Length – sets maxLength attribute", () => {
      const maxLength = 100;

      const component = mount(UTextarea, {
        props: {
          maxLength,
        },
      });

      expect(component.get("textarea").attributes("maxlength")).toBe(String(maxLength));
    });

    it("Disabled – sets textarea to disabled", () => {
      const component = mount(UTextarea, {
        props: {
          disabled: true,
        },
      });

      expect(component.get("textarea").attributes("disabled")).toBeDefined();
    });

    it("Disabled – applies correct class when disabled", () => {
      const wrapperDisabledClass = "bg-lifted";
      const textareaDisabledClass = "disabled:cursor-not-allowed";

      const component = mount(UTextarea, {
        props: {
          disabled: true,
        },
      });

      const wrapperElement = component.get("[vl-key='wrapper']");

      expect(wrapperElement.attributes("class")).toContain(wrapperDisabledClass);
      expect(component.get("textarea").attributes("class")).toContain(textareaDisabledClass);
    });

    it("Inputmode – sets inputmode attribute", () => {
      const inputmode = "text";

      const component = mount(UTextarea, {
        props: {
          inputmode,
        },
      });

      expect(component.get("textarea").attributes("inputmode")).toBe(inputmode);
    });

    it("No Autocomplete – toggles readonly attribute to prevent autocomplete", async () => {
      const component = mount(UTextarea, {
        props: {
          noAutocomplete: true,
        },
        attachTo: document.body, // attachTo: document.body is required for the noAutocomplete DOM manipulation to work
      });

      const textarea = component.get("textarea");

      expect(textarea.attributes("readonly")).toBeDefined();

      await textarea.trigger("focus");
      expect(textarea.attributes("readonly")).toBeUndefined();

      await textarea.trigger("blur");
      expect(textarea.attributes("readonly")).toBeDefined();

      await textarea.trigger("click");
      expect(textarea.attributes("readonly")).toBeUndefined();

      await textarea.trigger("mouseleave");
      expect(textarea.attributes("readonly")).toBeDefined();

      component.unmount();
    });

    it("No Autocomplete – does not affect textarea when prop is false", async () => {
      const component = mount(UTextarea, {
        props: {
          noAutocomplete: false,
        },
      });

      const textarea = component.get("textarea");

      expect(textarea.attributes("readonly")).toBeUndefined();

      await textarea.trigger("focus");
      expect(textarea.attributes("readonly")).toBeUndefined();

      await textarea.trigger("blur");
      expect(textarea.attributes("readonly")).toBeUndefined();
    });

    it("No Autocomplete – does not toggle readonly when textarea is already readonly", async () => {
      const component = mount(UTextarea, {
        props: {
          noAutocomplete: true,
          readonly: true,
        },
        attachTo: document.body,
      });

      const textarea = component.get("textarea");

      expect(textarea.attributes("readonly")).toBeDefined();

      await textarea.trigger("focus");
      expect(textarea.attributes("readonly")).toBeDefined();

      component.unmount();
    });

    it("Rows – sets rows attribute", () => {
      const rows = 5;

      const component = mount(UTextarea, {
        props: {
          rows,
        },
      });

      expect(component.get("textarea").attributes("rows")).toBe(String(rows));
    });

    it("Id – sets id attribute", () => {
      const id = "test-textarea";

      const component = mount(UTextarea, {
        props: {
          id,
        },
      });

      expect(component.get("textarea").attributes("id")).toBe(id);
    });

    it("Data Test – sets data-test attribute to textarea", () => {
      const dataTest = "test-textarea";
      const component = mount(UTextarea, {
        props: {
          dataTest,
        },
      });

      expect(component.get("textarea").attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom Label Content";

      const component = mount(UTextarea, {
        props: {
          label: "Default Label",
        },
        slots: {
          label: customLabelContent,
        },
      });

      const labelElement = component.getComponent(ULabel).find("label");

      expect(labelElement.text()).toBe(customLabelContent);
    });

    it("Label – exposes label prop to slot", () => {
      const defaultLabel = "Test Label";

      const component = mount(UTextarea, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      const labelElement = component.getComponent(ULabel).find("label");

      expect(labelElement.text()).toBe(`Modified ${defaultLabel}`);
    });

    it("Left – renders custom content from left slot", () => {
      const slotText = "Custom Left Content";
      const testClass = "custom-left";

      const component = mount(UTextarea, {
        slots: {
          left: `<span class="${testClass}">${slotText}</span>`,
        },
      });

      expect(component.get(`.${testClass}`).text()).toBe(slotText);
    });

    it("Right – renders custom content from right slot", () => {
      const slotText = "Custom Right Content";
      const testClass = "custom-right";
      const component = mount(UTextarea, {
        slots: {
          right: `<span class="${testClass}">${slotText}</span>`,
        },
      });

      expect(component.get(`.${testClass}`).text()).toBe(slotText);
    });
  });

  describe("Events", () => {
    it("Change – emits when textarea value changes", async () => {
      const component = mount(UTextarea, {
        props: {
          modelValue: "initial",
        },
      });

      await component.get("textarea").trigger("change");

      expect(component.emitted("change")).toBeTruthy();
    });

    it("Focus – emits when textarea gains focus", async () => {
      const component = mount(UTextarea, {
        props: {
          modelValue: "",
        },
      });

      await component.get("textarea").trigger("focus");

      expect(component.emitted("focus")).toBeTruthy();
    });

    it("Blur – emits when textarea loses focus", async () => {
      const component = mount(UTextarea, {
        props: {
          modelValue: "",
        },
      });

      await component.get("textarea").trigger("blur");

      expect(component.emitted("blur")).toBeTruthy();
    });

    it("Click – emits when textarea is clicked", async () => {
      const component = mount(UTextarea, {
        props: {
          modelValue: "",
        },
      });

      await component.get("textarea").trigger("click");

      expect(component.emitted("click")).toBeTruthy();
      expect(component.emitted("click")![0][0]).toBeInstanceOf(MouseEvent);
    });

    it("Mousedown – emits when mouse is pressed down on textarea", async () => {
      const component = mount(UTextarea, {
        props: {
          modelValue: "",
        },
      });

      await component.get("textarea").trigger("mousedown");

      expect(component.emitted("mousedown")).toBeTruthy();
    });
  });

  describe("Exposed Properties", () => {
    it("Wrapper Element – exposes wrapper element ref", () => {
      const component = mount(UTextarea, {
        props: {
          modelValue: "test",
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef!.tagName).toBe("LABEL");
    });

    it("Textarea Element – exposes textarea element ref", () => {
      const component = mount(UTextarea, {
        props: {
          modelValue: "test",
        },
      });

      expect(component.vm.textareaRef).toBeDefined();
      expect(component.vm.textareaRef!.tagName).toBe("TEXTAREA");
      expect(component.vm.textareaRef!.value).toBe("test");
    });
  });
});
