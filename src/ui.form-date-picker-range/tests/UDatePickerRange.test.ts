import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDatePickerRange from "../UDatePickerRange.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UCalendar from "../../ui.form-calendar/UCalendar.vue";
import UButton from "../../ui.button/UButton.vue";
import UDatePickerRangePeriodMenu from "../UDatePickerRangePeriodMenu.vue";
import UDatePickerRangeInputs from "../UDatePickerRangeInputs.vue";

import { DATE_PICKER_BUTTON_TYPE, DATE_PICKER_INPUT_TYPE, Period } from "../constants.ts";

import type { Props, RangeDate } from "../types.ts";

describe("UDatePickerRange.vue", () => {
  // Props tests
  describe("Props", () => {
    // Variant prop
    it("renders input variant when variant is input", () => {
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.exists()).toBe(true);
    });

    it("renders button variant when variant is button", () => {
      const variant = DATE_PICKER_BUTTON_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const buttons = component.findAllComponents(UButton);

      expect(buttons.length).toBeGreaterThan(0);
    });

    // Label prop
    it("passes label prop to UInput when variant is input", () => {
      const label = "Date Range";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          label,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("label")).toBe(label);
    });

    // LabelAlign prop
    it("passes labelAlign prop to UInput when variant is input", () => {
      const labelAlign = "left";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          labelAlign: labelAlign as Props["labelAlign"],
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("labelAlign")).toBe(labelAlign);
    });

    // Placeholder prop
    it("passes placeholder prop to UInput when variant is input", () => {
      const placeholder = "Select date range";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          placeholder,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("placeholder")).toBe(placeholder);
    });

    // Description prop
    it("passes description prop to UInput when variant is input", () => {
      const description = "Select a date range";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          description,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("description")).toBe(description);
    });

    // Error prop
    it("passes error prop to UInput when variant is input", () => {
      const error = "Invalid date range";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          error,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("error")).toBe(error);
    });

    // Disabled prop
    it("passes disabled prop to UInput when variant is input", () => {
      const disabled = true;
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          disabled,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("disabled")).toBe(disabled);
    });

    it("passes disabled prop to UButton when variant is button", () => {
      const disabled = true;
      const variant = DATE_PICKER_BUTTON_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          disabled,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const buttons = component.findAllComponents(UButton);

      buttons.forEach((button) => {
        expect(button.props("disabled")).toBe(disabled);
      });
    });

    // Size prop
    it("passes size prop to UInput when variant is input", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };
      const variant = DATE_PICKER_INPUT_TYPE;

      Object.entries(sizes).forEach(([size, expectedSize]) => {
        const component = mount(UDatePickerRange, {
          props: {
            size: size as Props["size"],
            variant: variant as Props["variant"],
            modelValue: { from: null, to: null },
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("size")).toBe(expectedSize);
      });
    });

    it("passes size prop to UButton when variant is button", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };
      const variant = DATE_PICKER_BUTTON_TYPE;

      Object.entries(sizes).forEach(([size, expectedSize]) => {
        const component = mount(UDatePickerRange, {
          props: {
            size: size as Props["size"],
            variant: variant as Props["variant"],
            modelValue: { from: null, to: null },
          },
        });

        const buttons = component.findAllComponents(UButton);

        buttons.forEach((button) => {
          expect(button.props("size")).toBe(expectedSize);
        });
      });
    });

    // OpenDirectionX prop
    it("applies the correct openDirectionX class", async () => {
      const openDirectionX = {
        left: "left-0 right-auto",
        right: "right-0 left-auto",
      };
      const variant = DATE_PICKER_INPUT_TYPE;

      Object.entries(openDirectionX).forEach(([direction, classes]) => {
        const component = mount(UDatePickerRange, {
          props: {
            openDirectionX: direction as Props["openDirectionX"],
            variant: variant as Props["variant"],
            modelValue: { from: null, to: null },
          },
        });

        // Show menu to check classes
        component.vm.activate();

        const menu = component.find("[vl-key='menu']");

        expect(menu.attributes("class")).toContain(classes);
      });
    });

    // OpenDirectionY prop
    it("applies the correct openDirectionY class", async () => {
      const openDirectionY = {
        top: "bottom-full mt-0",
        bottom: "top-full mb-0",
      };
      const variant = DATE_PICKER_INPUT_TYPE;

      Object.entries(openDirectionY).forEach(([direction, classes]) => {
        const component = mount(UDatePickerRange, {
          props: {
            openDirectionY: direction as Props["openDirectionY"],
            variant: variant as Props["variant"],
            modelValue: { from: null, to: null },
          },
        });

        // Show menu to check classes
        component.vm.activate();

        const menu = component.find("[vl-key='menu']");

        expect(menu.attributes("class")).toContain(classes);
      });
    });

    // DateFormat prop
    it("passes dateFormat prop to UCalendar", async () => {
      const dateFormat = "Y-m-d";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          dateFormat,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      // Show menu to check props
      component.vm.activate();
      component.vm.period = Period.OwnRange;

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("dateFormat")).toBe(dateFormat);
    });

    // MinDate prop
    it("passes minDate prop to UCalendar", async () => {
      const minDate = new Date(2023, 0, 1); // January 1, 2023
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          minDate,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      // Show menu to check props
      component.vm.activate();
      component.vm.period = Period.OwnRange;

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("minDate")).toBe(minDate);
    });

    // MaxDate prop
    it("passes maxDate prop to UCalendar", async () => {
      const maxDate = new Date(2023, 11, 31); // December 31, 2023
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          maxDate,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      // Show menu to check props
      component.vm.activate();
      component.vm.period = Period.OwnRange;

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("maxDate")).toBe(maxDate);
    });

    // LeftIcon prop
    it("passes leftIcon prop to UInput when variant is input", () => {
      const leftIcon = "calendar";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          leftIcon,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("leftIcon")).toBe(leftIcon);
    });

    // RightIcon prop
    it("passes rightIcon prop to UInput when variant is input", () => {
      const rightIcon = "calendar";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          rightIcon,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("rightIcon")).toBe(rightIcon);
    });

    // ID prop
    it("applies the correct id attribute to UInput when variant is input", () => {
      const id = "date-picker-range-id";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          id,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("id")).toBe(id);
    });

    it("applies the correct id attribute to UButton when variant is button", () => {
      const id = "date-picker-range-id";
      const variant = DATE_PICKER_BUTTON_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          id,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      const button = component.find(`#${id}`);

      expect(button.exists()).toBe(true);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-date-picker-range";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          dataTest,
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:modelValue event
    it("emits update:modelValue event when date range is selected", async () => {
      const component = mount(UDatePickerRange, {
        props: {
          modelValue: { from: null, to: null },
        },
      });

      // Show menu
      component.vm.activate();

      // Simulate date range selection
      const range = { from: new Date(2023, 0, 1), to: new Date(2023, 0, 7) };

      component.vm.localValue = range;

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toEqual(range);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content from left slot when variant is input", () => {
      const slotText = "Left";
      const slotClass = "left-content";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
        slots: {
          left: `<span class="${slotClass}">${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Right slot
    it("renders content from right slot when variant is input", () => {
      const slotText = "Right";
      const slotClass = "right-content";
      const variant = DATE_PICKER_INPUT_TYPE;

      const component = mount(UDatePickerRange, {
        props: {
          variant: variant as Props["variant"],
          modelValue: { from: null, to: null },
        },
        slots: {
          right: `<span class="${slotClass}">${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UDatePickerRange, {
        props: {
          modelValue: { from: null, to: null },
        },
      });

      expect(component.vm.wrapperRef).toBeDefined();
    });

    // calendarRef
    it("exposes calendarRef", () => {
      const component = mount(UDatePickerRange, {
        props: {
          modelValue: { from: null, to: null },
        },
      });

      expect(component.vm.calendarRef).toBeDefined();
    });
  });
});
