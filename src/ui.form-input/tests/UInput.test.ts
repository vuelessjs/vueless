import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInput from "../UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("UInput.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("sets the input value correctly", () => {
      const modelValue = "Test Input";

      const component = mount(UInput, {
        props: {
          modelValue,
        },
      });

      const input = component.find("input");

      expect(input.element.value).toBe(modelValue);
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Input Label";

      const component = mount(UInput, {
        props: {
          label,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("label")).toBe(label);
    });

    // LabelAlign prop
    it("applies the correct labelAlign prop to ULabel", () => {
      const labelAligns = {
        topInside: "topInside",
        top: "top",
        topWithDesc: "topWithDesc",
        left: "left",
        right: "right",
      };

      Object.entries(labelAligns).forEach(([labelAlign, value]) => {
        const component = mount(UInput, {
          props: {
            labelAlign: labelAlign as Props["labelAlign"],
          },
        });

        const labelComponent = component.findComponent(ULabel);

        expect(labelComponent.props("align")).toBe(value);
      });
    });

    // Placeholder prop
    it("sets the placeholder attribute correctly", () => {
      const placeholder = "Enter text here";

      const component = mount(UInput, {
        props: {
          placeholder,
        },
      });

      const input = component.find("input");

      expect(input.attributes("placeholder")).toBe(placeholder);
    });

    // Description prop
    it("passes the description prop to ULabel", () => {
      const description = "This is a description";

      const component = mount(UInput, {
        props: {
          description,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("description")).toBe(description);
    });

    // Error prop
    it("passes the error prop to ULabel", () => {
      const error = "This field is required";

      const component = mount(UInput, {
        props: {
          error,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("error")).toBe(error);
    });

    // Size prop
    it("applies the correct size class", () => {
      const sizes = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UInput, {
          props: {
            size: size as Props["size"],
          },
        });

        const input = component.find("input");

        expect(input.attributes("class")).toContain(classes);
      });
    });

    // LeftIcon prop
    it("renders left icon when leftIcon prop is provided", () => {
      const leftIcon = "search";

      const component = mount(UInput, {
        props: {
          leftIcon,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(leftIcon);
    });

    // RightIcon prop
    it("renders right icon when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(UInput, {
        props: {
          rightIcon,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(rightIcon);
    });

    // MaxLength prop
    it("sets the maxlength attribute correctly", () => {
      const maxLength = "10";

      const component = mount(UInput, {
        props: {
          maxLength,
        },
      });

      const input = component.find("input");

      expect(input.attributes("maxlength")).toBe(maxLength);
    });

    // Type prop
    it("sets the input type attribute correctly", () => {
      const types = ["text", "number", "tel", "email", "url", "search", "password"];

      types.forEach((type) => {
        const component = mount(UInput, {
          props: {
            type: type as Props["type"],
          },
        });

        const input = component.find("input");

        expect(input.attributes("type")).toBe(type);
      });
    });

    // Inputmode prop
    it("sets the inputmode attribute correctly", () => {
      const inputmodes = ["text", "decimal", "numeric", "tel", "email", "url", "search", "none"];

      inputmodes.forEach((inputmode) => {
        const component = mount(UInput, {
          props: {
            inputmode: inputmode as Props["inputmode"],
          },
        });

        const input = component.find("input");

        expect(input.attributes("inputmode")).toBe(inputmode);
      });
    });

    // Readonly prop
    it("sets the readonly attribute when readonly prop is true", () => {
      const readonly = true;

      const component = mount(UInput, {
        props: {
          readonly,
        },
      });

      const input = component.find("input");

      expect(input.attributes("readonly")).toBeDefined();
    });

    // Disabled prop
    it("sets the disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UInput, {
        props: {
          disabled,
        },
      });

      const input = component.find("input");

      expect(input.attributes("disabled")).toBeDefined();
    });

    // NoAutocomplete prop
    it("sets autocomplete attribute to off when noAutocomplete prop is true", () => {
      const noAutocomplete = true;

      const component = mount(UInput, {
        props: {
          noAutocomplete,
        },
      });

      const input = component.find("input");

      expect(input.attributes("autocomplete")).toBe("off");
    });

    // ID prop
    it("sets the id attribute correctly", () => {
      const id = "test-input-id";

      const component = mount(UInput, {
        props: {
          id,
        },
      });

      const input = component.find("input");

      expect(input.attributes("id")).toBe(id);
    });

    // DataTest prop
    it("sets the data-test attribute correctly", () => {
      const dataTest = "test-input";

      const component = mount(UInput, {
        props: {
          dataTest,
        },
      });

      const input = component.find("input");

      expect(input.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label";
      const slotClass = "custom-label";

      const component = mount(UInput, {
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

      const component = mount(UInput, {
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

      const component = mount(UInput, {
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
    it("emits update:modelValue event when input value changes", async () => {
      const component = mount(UInput);
      const input = component.find("input");
      const newValue = "New Value";

      await input.setValue(newValue);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([newValue]);
    });

    // Input event
    it("emits input event when input value changes", async () => {
      const component = mount(UInput);
      const input = component.find("input");
      const newValue = "New Value";

      await input.setValue(newValue);
      await input.trigger("input");

      expect(component.emitted("input")).toBeTruthy();
    });

    // Change event
    it("emits change event when input value changes and blur", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("change");

      expect(component.emitted("change")).toBeTruthy();
    });

    // Click event
    it("emits click event when input is clicked", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("click");

      expect(component.emitted("click")).toBeTruthy();
    });

    // Focus event
    it("emits focus event when input gains focus", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("focus");

      expect(component.emitted("focus")).toBeTruthy();
    });

    // Blur event
    it("emits blur event when input loses focus", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("blur");

      expect(component.emitted("blur")).toBeTruthy();
    });

    // Mousedown event
    it("emits mousedown event when mouse is pressed down on input", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("mousedown");

      expect(component.emitted("mousedown")).toBeTruthy();
    });

    // Copy event
    it("emits copy event when content is copied from input", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("copy");

      expect(component.emitted("copy")).toBeTruthy();
    });

    // Paste event
    it("emits paste event when content is pasted to input", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("paste");

      expect(component.emitted("paste")).toBeTruthy();
    });

    // Keydown event
    it("emits keydown event when a key is pressed while input is focused", async () => {
      const component = mount(UInput);
      const input = component.find("input");

      await input.trigger("keydown");

      expect(component.emitted("keydown")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // inputRef
    it("exposes inputRef", () => {
      const component = mount(UInput, {});

      expect(component.vm.inputRef).toBeDefined();
    });
  });
});
