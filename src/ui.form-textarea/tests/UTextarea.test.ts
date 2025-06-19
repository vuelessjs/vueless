import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UTextarea from "../UTextarea.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("UTextarea.vue", () => {
  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", async () => {
      const sizes = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UTextarea, {
          props: {
            size: size as Props["size"],
          },
        });

        const textarea = component.find("textarea");

        expect(textarea.attributes("class")).toContain(classes);
      });
    });

    // ModelValue prop
    it("sets the correct value", () => {
      const modelValue = "Test value";

      const component = mount(UTextarea, {
        props: {
          modelValue,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.element.value).toBe(modelValue);
    });

    // Placeholder prop
    it("sets the correct placeholder", () => {
      const placeholder = "Enter text here";

      const component = mount(UTextarea, {
        props: {
          placeholder,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("placeholder")).toBe(placeholder);
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Textarea Label";

      const component = mount(UTextarea, {
        props: {
          label,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("label")).toBe(label);
    });

    // LabelAlign prop
    it("applies the correct label alignment", () => {
      const labelAligns = ["topInside", "top", "topWithDesc", "left", "right"];

      labelAligns.forEach((align) => {
        const component = mount(UTextarea, {
          props: {
            labelAlign: align as Props["labelAlign"],
            label: "Test Label",
          },
        });

        const labelComponent = component.findComponent(ULabel);

        expect(labelComponent.props("align")).toBe(align);
      });
    });

    // Description prop
    it("passes the description to the label component", () => {
      const description = "This is a description";

      const component = mount(UTextarea, {
        props: {
          description,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("description")).toBe(description);
    });

    // Resizable prop
    it("applies resizable class when resizable prop is true", () => {
      const resizable = true;

      const component = mount(UTextarea, {
        props: {
          resizable,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("class")).not.toContain("resize-none");
    });

    // Readonly prop
    it("applies readonly attribute when readonly prop is true", () => {
      const readonly = true;

      const component = mount(UTextarea, {
        props: {
          readonly,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("readonly")).toBeDefined();
    });

    // MaxLength prop
    it("applies maxlength attribute when maxLength prop is provided", () => {
      const maxLength = "100";

      const component = mount(UTextarea, {
        props: {
          maxLength,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("maxlength")).toBe(maxLength);
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UTextarea, {
        props: {
          disabled,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("disabled")).toBeDefined();
    });

    // Inputmode prop
    it("applies the correct inputmode attribute", () => {
      const inputmodes = ["text", "decimal", "numeric", "tel", "email", "url", "search", "none"];

      inputmodes.forEach((inputmode) => {
        const component = mount(UTextarea, {
          props: {
            inputmode: inputmode as Props["inputmode"],
          },
        });

        const textarea = component.find("textarea");

        expect(textarea.attributes("inputmode")).toBe(inputmode);
      });
    });

    // Error prop
    it("passes error to the label component", () => {
      const error = "This field is required";

      const component = mount(UTextarea, {
        props: {
          error,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("error")).toBe(error);
    });

    // Rows prop
    it("applies the correct rows attribute", () => {
      const rows = "5";

      const component = mount(UTextarea, {
        props: {
          rows,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("rows")).toBe(rows);
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-textarea-id";

      const component = mount(UTextarea, {
        props: {
          id,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-textarea";

      const component = mount(UTextarea, {
        props: {
          dataTest,
        },
      });

      const textarea = component.find("textarea");

      expect(textarea.attributes("data-test")).toContain(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label";
      const label = "Default Label";
      const slotClass = "custom-label";

      const component = mount(UTextarea, {
        props: {
          label,
        },
        slots: {
          label: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Left slot
    it("renders content from left slot", () => {
      const slotContent = "Left Content";
      const slotClass = "left-content";

      const component = mount(UTextarea, {
        slots: {
          left: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Right slot
    it("renders content from right slot", () => {
      const slotContent = "Right Content";
      const slotClass = "right-content";

      const component = mount(UTextarea, {
        slots: {
          right: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when value changes", async () => {
      const component = mount(UTextarea);
      const textarea = component.find("textarea");
      const newValue = "New value";

      await textarea.setValue(newValue);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0]).toEqual([newValue]);
    });

    // Change event
    it("emits change event when value changes", async () => {
      const component = mount(UTextarea);
      const textarea = component.find("textarea");

      await textarea.trigger("change");

      expect(component.emitted("change")).toBeTruthy();
    });

    // Click event
    it("emits click event when clicked", async () => {
      const component = mount(UTextarea);
      const textarea = component.find("textarea");

      await textarea.trigger("click");

      expect(component.emitted("click")).toBeTruthy();
    });

    // Focus event
    it("emits focus event when focused", async () => {
      const component = mount(UTextarea);
      const textarea = component.find("textarea");

      await textarea.trigger("focus");

      expect(component.emitted("focus")).toBeTruthy();
    });

    // Blur event
    it("emits blur event when blurred", async () => {
      const component = mount(UTextarea);
      const textarea = component.find("textarea");

      await textarea.trigger("blur");

      expect(component.emitted("blur")).toBeTruthy();
    });

    // Mousedown event
    it("emits mousedown event when mouse button is pressed", async () => {
      const component = mount(UTextarea);
      const textarea = component.find("textarea");

      await textarea.trigger("mousedown");

      expect(component.emitted("mousedown")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UTextarea, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });

    // textareaRef
    it("exposes textareaRef", () => {
      const component = mount(UTextarea, {});

      expect(component.vm.textareaRef).toBeDefined();
    });
  });
});
