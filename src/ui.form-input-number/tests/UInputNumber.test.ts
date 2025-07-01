import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputNumber from "../UInputNumber.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

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

      await component.getComponent(UInput).trigger("keyup");

      expect(component.emitted("update:modelValue")![0][0]).toBe(initialValue);
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

      await component.getComponent(UInput).trigger("keyup");

      expect(component.emitted("update:modelValue")![0][0]).toBe(initialValue);
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
});
