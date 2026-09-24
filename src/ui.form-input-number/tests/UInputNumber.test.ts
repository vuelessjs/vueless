import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputNumber from "../UInputNumber.vue";
import UInput from "../../ui.form-input/UInput.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { DOMWrapper } from "@vue/test-utils";
import type { Props } from "../types";

describe("UInputNumber.vue", () => {
  describe("Props", () => {
    it("Model Value – set correct value with number type", async () => {
      const initialValue = 12345678.23;

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          valueType: "number",
        },
      });

      await flushPromises();

      expect(component.vm.rawValue).toBe("12345678.23");
    });

    it("Model Value – set correct value with string type", async () => {
      const initialValue = "12345678.23";

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          valueType: "string",
        },
      });

      await flushPromises();

      expect(component.vm.rawValue).toBe(initialValue);
    });

    it("Min Fraction Digit – set fraction digit when it was not provided", async () => {
      const initialValue = 12345678;
      const initialValueWithFactions = "12 345 678,00";

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          minFractionDigits: 2,
        },
      });

      await flushPromises();

      expect(component.get("input").element.value).toBe(initialValueWithFactions);
    });

    it("Max Fraction Digit – truncate fraction digit to max value", async () => {
      const initialValue = 12345678.011;
      const initialValueWithFactions = "12 345 678,01";

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          maxFractionDigits: 2,
        },
      });

      await flushPromises();

      expect(component.get("input").element.value).toBe(initialValueWithFactions);
    });

    it("Decimal Separator – set correct decimal separator char", async () => {
      const initialValue = 12345678.01;
      const expectedDecimalSubString = "/01";

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          decimalSeparator: "/",
        },
      });

      await flushPromises();

      expect(component.get("input").element.value).toContain(expectedDecimalSubString);
    });

    it("Thousands Separator – set correct decimal separator char", async () => {
      const initialValue = 12_345_678.01;
      const expectedThousandsSeparator = "/";
      const expectedThousandsSeparatorAmount = 2;

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          thousandsSeparator: expectedThousandsSeparator,
        },
      });

      await flushPromises();

      const inputValue = component.get("input").element.value;
      const separatorCount = inputValue.split(expectedThousandsSeparator).length - 1;

      expect(separatorCount).toBe(expectedThousandsSeparatorAmount);
    });

    it("Positive Only – allows only positive values", async () => {
      const initialValue = -12345678;
      const expectedValue = "12 345 678";

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          positiveOnly: true,
        },
      });

      await flushPromises();

      expect(component.get("input").element.value).toBe(expectedValue);
    });

    it("Prefix – displays prefix at the beginning of the value", async () => {
      const initialValue = 12345678;
      const prefix = "pizza";

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
          prefix: prefix,
        },
      });

      await flushPromises();

      expect(component.get("input").element.value.startsWith(prefix)).toBe(true);
    });

    it("Label – passes label to UInput", () => {
      const label = "Password";

      const component = mount(UInputNumber, {
        props: {
          label,
        },
      });

      expect(component.getComponent(UInput).props("label")).toBe(label);
    });

    it("Size – passes size to UInput", () => {
      const size = "lg";

      const component = mount(UInputNumber, {
        props: {
          size: size as Props["size"],
        },
      });

      expect(component.getComponent(UInput).props("size")).toBe(size);
    });

    it("Placeholder – passes placeholder to UInput", () => {
      const placeholder = "Enter your password";

      const component = mount(UInputNumber, {
        props: {
          placeholder,
        },
      });

      expect(component.getComponent(UInput).props("placeholder")).toBe(placeholder);
    });

    it("Label Align – passes labelAlign to UInput", () => {
      const labelAlign = "top";

      const component = mount(UInputNumber, {
        props: {
          labelAlign: labelAlign as Props["labelAlign"],
        },
      });

      expect(component.getComponent(UInput).props("labelAlign")).toBe(labelAlign);
    });

    it("Description – passes description to UInput", () => {
      const description = "Password must be at least 8 characters";

      const component = mount(UInputNumber, {
        props: {
          description,
        },
      });

      expect(component.getComponent(UInput).props("description")).toBe(description);
    });

    it("Error – passes error to UInput", () => {
      const error = "Password is required";

      const component = mount(UInputNumber, {
        props: {
          error,
        },
      });

      expect(component.getComponent(UInput).props("error")).toBe(error);
    });

    it("Left Icon – passes leftIcon to UInput", () => {
      const leftIcon = "lock";

      const component = mount(UInputNumber, {
        props: {
          leftIcon,
        },
      });

      expect(component.getComponent(UInput).props("leftIcon")).toBe(leftIcon);
    });

    it("Right Icon – passes leftIcon to UInput", () => {
      const rightIcon = "lock";

      const component = mount(UInputNumber, {
        props: {
          rightIcon,
        },
      });

      expect(component.getComponent(UInput).props("rightIcon")).toBe(rightIcon);
    });

    it("Max Length – passes maxLength to UInput", () => {
      const maxLength = 20;

      const component = mount(UInputNumber, {
        props: {
          maxLength,
        },
      });

      expect(component.getComponent(UInput).props("maxLength")).toBe(maxLength);
    });

    it("Readonly – passes readonly state to UInput", () => {
      const component = mount(UInputNumber, {
        props: {
          modelValue: "password123",
          readonly: true,
        },
      });

      expect(component.get("input").attributes("readonly")).toBeDefined();
    });

    it("Disabled – passes disabled state to UInput", () => {
      const component = mount(UInputNumber, {
        props: {
          modelValue: "password123",
          disabled: true,
        },
      });

      expect(component.get("input").attributes("disabled")).toBeDefined();
    });

    it("Data Test – passes data attribute to the UInput component", () => {
      const dataTest = "password-field";

      const component = mount(UInputNumber, {
        props: {
          dataTest,
        },
      });

      expect(component.getComponent(UInput).props("dataTest")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
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

    it("Description – renders custom content from description slot", () => {
      const customDescription = "Custom description content";

      const component = mount(UInputNumber, {
        props: {
          description: "Default description",
        },
        slots: {
          description: customDescription,
        },
      });

      const labelComponent = component.getComponent(UInput).getComponent(ULabel);
      const descriptionElement = labelComponent.find("[vl-child-key='description']");

      expect(descriptionElement.text()).toBe(customDescription);
    });

    it("Error – renders custom content from error slot", () => {
      const customError = "Custom error content";

      const component = mount(UInputNumber, {
        props: {
          error: "Default error message",
        },
        slots: {
          error: customError,
        },
      });

      const labelComponent = component.getComponent(UInput).getComponent(ULabel);
      const errorElement = labelComponent.find("[vl-child-key='error']");

      expect(errorElement.text()).toBe(customError);
    });
  });

  describe("Exposed properties", () => {
    it("Raw Value – exposes raw input value", async () => {
      const initialValue = 12345678.23;

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
        },
      });

      await flushPromises();

      expect(component.vm.rawValue).toBe(String(initialValue));
    });

    it("Formatted Value – exposes formatted input value", async () => {
      const initialValue = 12345678.23;
      const formattedValue = "12 345 678,23";

      const component = mount(UInputNumber, {
        props: {
          modelValue: initialValue,
        },
      });

      await flushPromises();

      expect(component.vm.formattedValue).toBe(formattedValue);
    });

    it("Input – exposes input element ref", () => {
      const component = mount(UInputNumber);

      expect(component.vm.input).toBeDefined();
      expect(component.vm.input!.tagName).toBe("INPUT");
    });
  });

  describe("Events", () => {
    async function mountInput(props: Partial<Props> = {}, options = {}) {
      const component = mount(UInputNumber, {
        props: { modelValue: "", valueType: "string", ...props },
        ...options,
      });

      await flushPromises();

      return component;
    }

    async function typeInto(input: DOMWrapper<HTMLInputElement>, value: string, data?: string) {
      input.element.value = value;
      await input.trigger("input", data ? { data } : {});
      await flushPromises();
    }

    // Paste, drag-drop, autofill and IME commits produce no keyup, but must still reach the model.
    it("Update Model Value – emits on input without a trailing keyup", async () => {
      const component = await mountInput();

      await typeInto(component.get("input"), "13");

      expect(component.emitted("update:modelValue")!.at(-1)![0]).toBe("13");

      component.unmount();
    });

    it("Update Model Value – emits a number-typed value without a trailing keyup", async () => {
      const component = await mountInput({ valueType: "number" });

      await typeInto(component.get("input"), "13");

      expect(component.emitted("update:modelValue")!.at(-1)![0]).toBe(13);

      component.unmount();
    });

    it("Update Model Value – emits 0 as a real value", async () => {
      const component = await mountInput();

      await typeInto(component.get("input"), "0");

      expect(component.emitted("update:modelValue")!.at(-1)![0]).toBe("0");

      component.unmount();
    });

    it("Update Model Value – emits once per change, not twice on keyup", async () => {
      const component = await mountInput();
      const input = component.get("input");

      await typeInto(input, "13");
      await input.trigger("keyup");

      expect(component.emitted("update:modelValue")).toHaveLength(1);

      component.unmount();
    });

    it("Update Model Value – stays silent when the model already matches the input", async () => {
      const component = await mountInput({ modelValue: "13" });

      await component.get("input").trigger("blur");

      expect(component.emitted("update:modelValue")).toBeFalsy();

      component.unmount();
    });

    it("Update Model Value – stays silent when the model pushes a value in", async () => {
      const component = await mountInput({ modelValue: "13" });

      await component.setProps({ modelValue: "42" });
      await flushPromises();

      expect(component.emitted("update:modelValue")).toBeFalsy();

      component.unmount();
    });

    it("Formats input mounted inside a shadow root", async () => {
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const container = document.createElement("div");

      shadowRoot.appendChild(container);
      document.body.appendChild(host);

      const component = await mountInput({}, { attachTo: container });
      const input = component.get("input");

      // Behind a shadow boundary, so a document lookup would leave the input unbound.
      expect(document.getElementById(input.element.id)).toBeNull();

      await typeInto(input, "42");

      expect(component.emitted("update:modelValue")!.at(-1)![0]).toBe("42");

      component.unmount();
      host.remove();
    });

    it("Strips non-numeric characters from typed input", async () => {
      const component = await mountInput();
      const input = component.get("input");

      for (const char of "13232fffffrege") {
        await typeInto(input, input.element.value + char, char);
      }

      // Displayed with the default thousands separator; the model keeps the raw digits.
      expect(input.element.value).toBe("13 232");
      expect(component.emitted("update:modelValue")!.at(-1)![0]).toBe("13232");

      component.unmount();
    });

    it("Stops listening to the input once unmounted", async () => {
      const component = await mountInput();
      const element = component.get("input").element;

      component.unmount();

      element.value = "77";
      element.dispatchEvent(new Event("input"));
      await flushPromises();

      expect(component.emitted("update:modelValue")).toBeFalsy();
    });
  });
});
