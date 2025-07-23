import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDatePickerRange from "../UDatePickerRange.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";
import UDatePickerRangePeriodMenu from "../UDatePickerRangePeriodMenu.vue";

import type { RangeDate } from "../../ui.form-calendar/types.ts";

describe("UDatePickerRange.vue", () => {
  describe("Props", () => {
    it("Model Value – sets initial range value correctly", () => {
      const modelValue: RangeDate = {
        from: "2023-12-01",
        to: "2023-12-31",
      };

      const component = mount(UDatePickerRange, {
        props: {
          modelValue,
          dateFormat: "Y-m-d",
        },
      });

      expect(component.props("modelValue")).toEqual(modelValue);
    });

    it("Model Value – emits update:modelValue when range changes", async () => {
      const modelValue: RangeDate = {
        from: null,
        to: null,
      };

      const component = mount(UDatePickerRange, {
        props: {
          modelValue,
          variant: "input",
        },
      });

      const input = component.findComponent(UInput).get("input");

      await input.trigger("focus");
      await component.get("[vl-key='day']").trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    it("Variant – renders input variant correctly", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).exists()).toBe(true);
    });

    it("Variant – renders button variant correctly", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findAllComponents(UButton).length).toBeGreaterThan(0);
    });

    it("Label – passes label to UInput component when variant is input", () => {
      const label = "Date Range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          label,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("label")).toBe(label);
    });

    it("Placeholder – passes placeholder to UInput component", () => {
      const placeholder = "Select date range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          placeholder,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("placeholder")).toBe(placeholder);
    });

    it("Description – passes description to UInput component", () => {
      const description = "Select your preferred date range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          description,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("description")).toBe(description);
    });

    it("Error – passes error to UInput component", () => {
      const error = "Invalid date range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          error,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("error")).toBe(error);
    });

    it("Disabled – passes disabled state to UInput component", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          disabled: true,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("disabled")).toBe(true);
    });

    it("Disabled – applies disabled state to buttons when variant is button", () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          disabled: true,
          modelValue: { from: null, to: null },
        },
      });

      const buttons = component.findAllComponents(UButton);

      buttons.forEach((button) => {
        expect(button.props("disabled")).toBe(true);
      });
    });

    it("Size – applies correct size to components", () => {
      const size = "lg";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          size,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("size")).toBe(size);
    });

    it("Size – applies correct size to buttons when variant is button", () => {
      const size = "sm";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          size,
          modelValue: { from: null, to: null },
        },
      });

      const buttons = component.findAllComponents(UButton);

      buttons.forEach((button) => {
        expect(button.props("size")).toBe(size);
      });
    });

    it("Label Align – passes labelAlign to UInput component", () => {
      const labelAlign = "left";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          labelAlign,
          label: "Date Range",
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("labelAlign")).toBe(labelAlign);
    });

    it("Left Icon – passes leftIcon to UInput component", () => {
      const leftIcon = "calendar";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          leftIcon,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("leftIcon")).toBe(leftIcon);
    });

    it("Right Icon – passes rightIcon to UInput component", () => {
      const rightIcon = "search";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          rightIcon,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("rightIcon")).toBe(rightIcon);
    });

    it("Date Format – uses correct date format", () => {
      const dateFormat = "d/m/Y";

      const component = mount(UDatePickerRange, {
        props: {
          dateFormat,
          modelValue: {
            from: "01/12/2023",
            to: "31/12/2023",
          },
        },
      });

      expect(component.props("dateFormat")).toBe(dateFormat);
    });

    it("User Date Format – applies user-friendly date format", () => {
      const userDateFormat = "F j, Y";

      const component = mount(UDatePickerRange, {
        props: {
          userDateFormat,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.props("userDateFormat")).toBe(userDateFormat);
    });

    it("Min Date – passes minDate to calendar and period menu", async () => {
      const minDate = "2023-01-01";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          minDate,
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      await input.trigger("focus");

      expect(component.props("minDate")).toBe(minDate);
    });

    it("Max Date – passes maxDate to calendar and period menu", async () => {
      const maxDate = "2024-12-31";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          maxDate,
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      await input.trigger("focus");

      expect(component.props("maxDate")).toBe(maxDate);
    });

    it("Custom Range Button – applies custom range button configuration", async () => {
      const customRangeButton = {
        range: { from: new Date("2023-01-01"), to: new Date("2023-01-31") },
        label: "January 2023",
        description: "All of January",
      };

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          customRangeButton,
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      const periodMenu = component.findComponent(UDatePickerRangePeriodMenu);

      expect(periodMenu.exists()).toBe(true);
      expect(periodMenu.props("customRangeButton")).toEqual(customRangeButton);
    });

    it("Id – sets id attribute", () => {
      const id = "date-picker-range-id";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          id,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.findComponent(UInput).props("id")).toBe(id);
    });

    it("Data Test – applies correct data-test attributes", () => {
      const dataTest = "date-picker-range";

      const component = mount(UDatePickerRange, {
        props: {
          dataTest,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.find(`[data-test="${dataTest}"]`).exists()).toBe(true);
    });

    it("Data Test – applies data-test to input variant", () => {
      const dataTest = "date-picker-range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          dataTest,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.find(`[data-test="${dataTest}-input"]`).exists()).toBe(true);
    });

    it("Data Test – applies data-test to button variant", () => {
      const dataTest = "date-picker-range";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          dataTest,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.find(`[data-test="${dataTest}-button"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-button-prev"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-button-next"]`).exists()).toBe(true);
    });
  });

  describe("Menu", () => {
    it("Menu – opens when input is focused", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      expect(component.findComponent(UDatePickerRangePeriodMenu).exists()).toBe(true);
    });

    it("Menu – opens when button is clicked", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: { from: null, to: null },
        },
      });

      const button = component.find("[vl-key='rangeButtonSelect']");

      await button.trigger("click");

      expect(component.findComponent(UDatePickerRangePeriodMenu).exists()).toBe(true);
    });

    it("Menu – contains range inputs when period is ownRange", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      expect(component.find("[vl-key='rangeInputWrapper']").exists()).toBe(true);
    });

    it("Menu – contains calendar when period is ownRange", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput).find("input");

      await input.trigger("focus");

      expect(component.find("[vl-key='datepickerCalendar']").exists()).toBe(true);
    });
  });

  describe("Range Navigation", () => {
    it("Range Navigation – prev button shifts range backward", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: {
            from: "2023-12-01",
            to: "2023-12-31",
          },
          dateFormat: "Y-m-d",
        },
      });

      const prevButton = component.findAll('[vl-key="rangeButtonShift"]');

      await prevButton[0].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    it("Range Navigation – next button shifts range forward", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          variant: "button",
          modelValue: {
            from: "2023-12-01",
            to: "2023-12-31",
          },
          dateFormat: "Y-m-d",
        },
      });

      const nextButton = component.findAll('[vl-key="rangeButtonShift"]');

      await nextButton[1].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });
  });

  describe("Slots", () => {
    it("Left – renders custom content from left slot", () => {
      const slotContent = "Custom Left Content";
      const slotClass = "custom-left";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
        slots: {
          left: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    it("Left – exposes icon-name to slot when leftIcon prop is provided", () => {
      const leftIcon = "calendar";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          leftIcon,
          modelValue: { from: null, to: null },
        },
        slots: {
          left: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.text()).toContain(`Icon: ${leftIcon}`);
    });

    it("Right – renders custom content from right slot", () => {
      const slotContent = "Custom Right Content";
      const slotClass = "custom-right";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          modelValue: { from: null, to: null },
        },
        slots: {
          right: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    it("Right – exposes icon-name to slot when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(UDatePickerRange, {
        props: {
          variant: "input",
          rightIcon,
          modelValue: { from: null, to: null },
        },
        slots: {
          right: "Icon: {{ params.iconName }}",
        },
      });

      expect(component.text()).toContain(`Icon: ${rightIcon}`);
    });
  });

  describe("Exposed Properties", () => {
    it("Exposes wrapper element ref", () => {
      const component = mount(UDatePickerRange, {
        props: {
          modelValue: { from: null, to: null },
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });

    it("Exposes calendar element ref", () => {
      const component = mount(UDatePickerRange, {
        props: {
          modelValue: { from: null, to: null },
        },
      });

      expect(component.vm.calendarRef).toBeDefined();
    });
  });
});
