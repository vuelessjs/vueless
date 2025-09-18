import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInput from "../UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types";

describe("UInput.vue", () => {
  describe("Props", () => {
    it("Model Value – set initial value correctly", () => {
      const initialValue = "Test input";

      const component = mount(UInput, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.get("input").element.value).toBe(initialValue);
    });

    it("Model Value – updates value on input", async () => {
      const updatedValue = "Test input 2";

      const component = mount(UInput, {
        props: {
          modelValue: "Test input",
        },
      });

      await component.get("input").setValue(updatedValue);

      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(UInput, {
        props: {
          label: labelText,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Label Align – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "left";

      const component = mount(UInput, {
        props: {
          label: "Test Label",
          labelAlign,
        },
      });

      expect(component.getComponent(ULabel).props("align")).toBe(labelAlign);
    });

    it("Labe lAlign – applies correct class based on labelAlign prop", async () => {
      const labelAlignCases = ["left", "right"];
      const labelAlignClass = "w-full";

      labelAlignCases.forEach(async (align) => {
        const component = mount(UInput, {
          props: {
            label: "Test Label",
            labelAlign: align as Props["labelAlign"],
          },
        });

        const labelComponent = component.getComponent(ULabel);

        expect(labelComponent.attributes("class")).toContain(labelAlignClass);
      });
    });

    it("Placeholder – sets placeholder text", () => {
      const placeholderText = "Enter text here";

      const component = mount(UInput, {
        props: {
          placeholder: placeholderText,
        },
      });

      expect(component.get("input").attributes("placeholder")).toBe(placeholderText);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(UInput, {
        props: {
          description: descriptionText,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(descriptionText);
    });

    it("Error – passes error message to ULabel component", () => {
      const errorText = "This is an error";

      const component = mount(UInput, {
        props: {
          error: errorText,
        },
      });

      expect(component.getComponent(ULabel).props("error")).toBe(errorText);
    });

    it("Error – applies error class when error prop is set", () => {
      const wrapperClasses = "border-error";

      const component = mount(UInput, {
        props: {
          error: "This is an error",
        },
      });

      expect(component.get('[vl-key="wrapper"]').attributes("class")).toContain(wrapperClasses);
    });

    it("Size – applies correct class based on size prop", () => {
      const sizeClasses = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UInput, {
          props: {
            size: size as Props["size"],
          },
        });

        const input = component.get("input");

        expect(input.attributes("class")).toContain(classes);
      });
    });

    it("Left Icon – renders left icon when leftIcon prop is provided", () => {
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

    it("Right Icon – renders right icon when rightIcon prop is provided", () => {
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

    it("MaxLength – sets maxLength attribute on input", () => {
      const maxLengthValue = 10;

      const component = mount(UInput, {
        props: {
          maxLength: maxLengthValue,
        },
      });

      expect(component.get("input").attributes("maxlength")).toBe(String(maxLengthValue));
    });

    it("Type – sets correct type attribute on input", () => {
      const initialType = "email";

      const component = mount(UInput, {
        props: {
          type: initialType,
        },
      });

      expect(component.get("input").attributes("type")).toBe(initialType);
    });

    it("Type – applies typePassword classes when type is password and has value", () => {
      const passwordClasses = "tracking-widest [-webkit-text-security:disc]";

      const component = mount(UInput, {
        props: {
          type: "password",
          modelValue: "test123",
        },
      });

      expect(component.get("input").attributes("class")).toContain(passwordClasses);
    });

    it("Inputmode – sets inputmode attribute on input", () => {
      const inputmode = "decimal";

      const component = mount(UInput, {
        props: {
          inputmode,
        },
      });

      expect(component.get("input").attributes("inputmode")).toBe(inputmode);
    });

    it("Readonly – sets readonly attribute on input", () => {
      const component = mount(UInput, {
        props: {
          readonly: true,
        },
      });

      expect(component.get("input").attributes("readonly")).toBeDefined();
    });

    it("Disabled – sets disabled attribute on input", () => {
      const component = mount(UInput, {
        props: {
          disabled: true,
        },
      });

      expect(component.get("input").attributes("disabled")).toBeDefined();
    });

    it("No Autocomplete – sets autocomplete to off and type to text", () => {
      const disabledAutocomplete = "off";
      const disabledAutocompleteType = "text";

      const component = mount(UInput, {
        props: {
          autocomplete: false,
          type: "email",
        },
      });

      const input = component.get("input");

      expect(input.attributes("autocomplete")).toBe(disabledAutocomplete);
      expect(input.attributes("type")).toBe(disabledAutocompleteType);
    });

    it("No Autocomplete – sets autocomplete to on when false", () => {
      const enabledAutocomplete = "on";
      const enabledAutocompleteType = "email";

      const component = mount(UInput, {
        props: {
          autocomplete: true,
          type: "email",
        },
      });

      const input = component.get("input");

      expect(input.attributes("autocomplete")).toBe(enabledAutocomplete);
      expect(input.attributes("type")).toBe(enabledAutocompleteType);
    });

    it("Id – sets id attribute on input", () => {
      const idValue = "test-input-id";

      const component = mount(UInput, {
        props: {
          id: idValue,
        },
      });

      expect(component.get("input").attributes("id")).toBe(idValue);
    });

    it("Data Test – sets data-test attribute on input", () => {
      const dataTestValue = "test-input";

      const component = mount(UInput, {
        props: {
          dataTest: dataTestValue,
        },
      });

      expect(component.get("input").attributes("data-test")).toBe(dataTestValue);
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom Label Content";

      const component = mount(UInput, {
        props: {
          label: "Default Label",
        },
        slots: {
          label: customLabelContent,
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("[vl-child-key='label']");

      expect(labelElement.text()).toBe(customLabelContent);
    });

    it("Label – exposes label prop to slot", () => {
      const defaultLabel = "Test Label";

      const component = mount(UInput, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("[vl-child-key='label']");

      expect(labelElement.text()).toBe(`Modified ${defaultLabel}`);
    });

    it("Left – renders custom content from left slot", () => {
      const slotText = "Custom Left Content";
      const slotClass = "custom-left";

      const component = mount(UInput, {
        slots: {
          left: `<span class="${slotClass}">${slotText}</span>`,
        },
      });

      const leftSlotElement = component.find(`.${slotClass}`);

      expect(leftSlotElement.exists()).toBe(true);
      expect(leftSlotElement.text()).toBe(slotText);
    });

    it("Left – exposes icon-name to slot when leftIcon prop is provided", () => {
      const leftIcon = "search";

      const component = mount(UInput, {
        props: {
          leftIcon,
        },
        slots: {
          left: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.find('[vl-key="leftSlot"]').text()).toBe(`Icon: ${leftIcon}`);
    });

    it("Left – renders leftIcon when no slot content is provided", () => {
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

    it("Left – slot content overrides leftIcon prop", () => {
      const leftIcon = "search";
      const slotClass = "custom-icon";

      const component = mount(UInput, {
        props: {
          leftIcon,
        },
        slots: {
          left: `<span class="${slotClass}">Custom Content</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });

    it("Right – renders custom content from right slot", () => {
      const slotText = "Custom Right Content";
      const slotContentClass = "custom-right";

      const component = mount(UInput, {
        slots: {
          right: `<span class="${slotContentClass}">${slotText}</span>`,
        },
      });

      const rightSlotElement = component.find(".custom-right");

      expect(rightSlotElement.exists()).toBe(true);
      expect(rightSlotElement.text()).toBe(slotText);
    });

    it("Right – exposes icon-name to slot when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(UInput, {
        props: {
          rightIcon,
        },
        slots: {
          right: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.find('[vl-key="rightSlot"]').text()).toBe(`Icon: ${rightIcon}`);
    });

    it("Right – renders rightIcon when no slot content is provided", () => {
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

    it("Right – slot content overrides rightIcon prop", () => {
      const rightIcon = "close";
      const slotClass = "custom-icon";

      const component = mount(UInput, {
        props: {
          rightIcon,
        },
        slots: {
          right: `<span class="${slotClass}">Custom Content</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });
  });

  describe("Events", () => {
    it("Input – emits when input event occurs", async () => {
      const inputValue = "test input";

      const component = mount(UInput, {
        props: {
          modelValue: "",
        },
      });

      const input = component.get("input");

      await input.setValue(inputValue);
      await input.trigger("input");

      expect(component.emitted("input")).toBeTruthy();
      expect(component.emitted("input")![0]).toEqual([inputValue]);
    });

    it("Change – emits when change event occurs", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "initial",
        },
      });

      await component.get("input").trigger("change");

      expect(component.emitted("change")).toBeTruthy();
      expect(component.emitted("change")![0][0]).toBeInstanceOf(Event);
    });

    it("Focus – emits when input gains focus", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "",
        },
      });

      await component.get("input").trigger("focus");

      expect(component.emitted("focus")).toBeTruthy();
      expect(component.emitted("focus")![0][0]).toBeInstanceOf(FocusEvent);
    });

    it("Blur – emits when input loses focus", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "",
        },
      });

      await component.get("input").trigger("blur");

      expect(component.emitted("blur")).toBeTruthy();
      expect(component.emitted("blur")![0][0]).toBeInstanceOf(FocusEvent);
    });

    it("Click – emits when input is clicked", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "",
        },
      });

      await component.get("input").trigger("click");

      expect(component.emitted("click")).toBeTruthy();
      expect(component.emitted("click")![0][0]).toBeInstanceOf(MouseEvent);
    });

    it("Mousedown – emits when mouse is pressed down on input", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "",
        },
      });

      await component.get("input").trigger("mousedown");

      expect(component.emitted("mousedown")).toBeTruthy();
      expect(component.emitted("mousedown")![0][0]).toBeInstanceOf(MouseEvent);
    });

    it("Keydown – emits when key is pressed down", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "",
        },
      });

      await component.get("input").trigger("keydown", { key: "Enter" });

      expect(component.emitted("keydown")).toBeTruthy();
      expect(component.emitted("keydown")![0][0]).toBeInstanceOf(KeyboardEvent);
    });

    it("Paste – emits when content is pasted", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "",
        },
      });

      await component.get("input").trigger("paste");

      expect(component.emitted("paste")).toBeTruthy();
    });

    it("Copy – emits when content is copied", async () => {
      const component = mount(UInput, {
        props: {
          modelValue: "content to copy",
        },
      });

      await component.get("input").trigger("copy");

      expect(component.emitted("copy")).toBeTruthy();
    });
  });

  describe("Exposed Properties", () => {
    it("InputRef – exposes input element ref", () => {
      const component = mount(UInput, {
        props: {
          modelValue: "test",
        },
      });

      expect(component.vm.inputRef).toBeDefined();
      expect(component.vm.inputRef!.tagName).toBe("INPUT");
      expect(component.vm.inputRef!.value).toBe("test");
    });
  });
});
