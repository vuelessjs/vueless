import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDatePicker from "../UDatePicker.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UCalendar from "../../ui.form-calendar/UCalendar.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UDatePicker.vue", () => {
  // Props tests
  describe("Props", () => {
    // Label prop
    it("passes label prop to UInput", () => {
      const label = "Date";

      const component = mount(UDatePicker, {
        props: {
          label,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("label")).toBe(label);
    });

    // LabelAlign prop
    it("passes labelAlign prop to UInput", () => {
      const labelAlign = "left";

      const component = mount(UDatePicker, {
        props: {
          labelAlign: labelAlign as Props["labelAlign"],
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("labelAlign")).toBe(labelAlign);
    });

    // Placeholder prop
    it("passes placeholder prop to UInput", () => {
      const placeholder = "Select date";

      const component = mount(UDatePicker, {
        props: {
          placeholder,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("placeholder")).toBe(placeholder);
    });

    // Description prop
    it("passes description prop to UInput", () => {
      const description = "Select a date";

      const component = mount(UDatePicker, {
        props: {
          description,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("description")).toBe(description);
    });

    // Error prop
    it("passes error prop to UInput", () => {
      const error = "Invalid date";

      const component = mount(UDatePicker, {
        props: {
          error,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("error")).toBe(error);
    });

    // Disabled prop
    it("passes disabled prop to UInput", () => {
      const disabled = true;

      const component = mount(UDatePicker, {
        props: {
          disabled,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("disabled")).toBe(disabled);
    });

    // Size prop
    it("passes size prop to UInput", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      Object.entries(sizes).forEach(([size, expectedSize]) => {
        const component = mount(UDatePicker, {
          props: {
            size: size as Props["size"],
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("size")).toBe(expectedSize);
      });
    });

    // OpenDirectionX prop
    it("applies the correct openDirectionX class", async () => {
      const openDirectionX = {
        left: "left-0 right-auto",
        right: "right-0 left-auto",
      };

      Object.entries(openDirectionX).forEach(([direction, classes]) => {
        const component = mount(UDatePicker, {
          props: {
            openDirectionX: direction as Props["openDirectionX"],
          },
        });

        // Show calendar to check classes
        component.vm.activate();

        const calendar = component.findComponent(UCalendar);

        expect(calendar.attributes("class")).toContain(classes);
      });
    });

    // OpenDirectionY prop
    it("applies the correct openDirectionY class", async () => {
      const openDirectionY = {
        top: "bottom-full mt-0",
        bottom: "top-full mb-0",
      };

      Object.entries(openDirectionY).forEach(([direction, classes]) => {
        const component = mount(UDatePicker, {
          props: {
            openDirectionY: direction as Props["openDirectionY"],
          },
        });

        // Show calendar to check classes
        component.vm.activate();

        const calendar = component.findComponent(UCalendar);

        expect(calendar.attributes("class")).toContain(classes);
      });
    });

    // Timepicker prop
    it("passes timepicker prop to UCalendar", async () => {
      const timepicker = true;

      const component = mount(UDatePicker, {
        props: {
          timepicker,
        },
      });

      // Show calendar to check props
      component.vm.activate();

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("timepicker")).toBe(timepicker);
    });

    // DateFormat prop
    it("passes dateFormat prop to UCalendar", async () => {
      const dateFormat = "Y-m-d";

      const component = mount(UDatePicker, {
        props: {
          dateFormat,
        },
      });

      // Show calendar to check props
      component.vm.activate();

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("dateFormat")).toBe(dateFormat);
    });

    // DateTimeFormat prop
    it("passes dateTimeFormat prop to UCalendar", async () => {
      const dateTimeFormat = "Y-m-d H:i:S";

      const component = mount(UDatePicker, {
        props: {
          dateTimeFormat,
        },
      });

      // Show calendar to check props
      component.vm.activate();

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("dateTimeFormat")).toBe(dateTimeFormat);
    });

    // UserDateFormat prop
    it("passes userDateFormat prop to UCalendar", async () => {
      const userDateFormat = "j F, Y";

      const component = mount(UDatePicker, {
        props: {
          userDateFormat,
        },
      });

      // Show calendar to check props
      component.vm.activate();

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("userDateFormat")).toBe(userDateFormat);
    });

    // UserDateTimeFormat prop
    it("passes userDateTimeFormat prop to UCalendar", async () => {
      const userDateTimeFormat = "j F, Y - H:i:S";

      const component = mount(UDatePicker, {
        props: {
          userDateTimeFormat,
        },
      });

      // Show calendar to check props
      component.vm.activate();

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("userDateTimeFormat")).toBe(userDateTimeFormat);
    });

    // MinDate prop
    it("passes minDate prop to UCalendar", async () => {
      const minDate = new Date(2023, 0, 1); // January 1, 2023

      const component = mount(UDatePicker, {
        props: {
          minDate,
        },
      });

      // Show calendar to check props
      component.vm.activate();

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("minDate")).toBe(minDate);
    });

    // MaxDate prop
    it("passes maxDate prop to UCalendar", async () => {
      const maxDate = new Date(2023, 11, 31); // December 31, 2023

      const component = mount(UDatePicker, {
        props: {
          maxDate,
        },
      });

      // Show calendar to check props
      component.vm.activate();

      const calendar = component.findComponent(UCalendar);

      expect(calendar.props("maxDate")).toBe(maxDate);
    });

    // LeftIcon prop
    it("passes leftIcon prop to UInput", () => {
      const leftIcon = "calendar";

      const component = mount(UDatePicker, {
        props: {
          leftIcon,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("leftIcon")).toBe(leftIcon);
    });

    // RightIcon prop
    it("passes rightIcon prop to UInput", () => {
      const rightIcon = "calendar";

      const component = mount(UDatePicker, {
        props: {
          rightIcon,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("rightIcon")).toBe(rightIcon);
    });

    // ID prop
    it("applies the correct id attribute to UInput", () => {
      const id = "date-picker-id";

      const component = mount(UDatePicker, {
        props: {
          id,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-date-picker";

      const component = mount(UDatePicker, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:modelValue event
    it("emits update:modelValue event when date is selected", async () => {
      const component = mount(UDatePicker);

      // Show calendar
      component.vm.activate();

      // Simulate date selection
      const date = new Date(2023, 0, 1); // January 1, 2023

      component.vm.localValue = date;

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toEqual(date);
    });

    // input event
    it("emits input event when date is selected", async () => {
      const component = mount(UDatePicker);

      // Show calendar
      component.vm.activate();

      // Simulate date selection
      const date = new Date(2023, 0, 1); // January 1, 2023

      await component.vm.onInput();

      expect(component.emitted("input")).toBeTruthy();
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content from left slot", () => {
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UDatePicker, {
        slots: {
          left: `<span class="${slotClass}">${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Right slot
    it("renders content from right slot", () => {
      const slotText = "Right";
      const slotClass = "right-content";

      const component = mount(UDatePicker, {
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
    // calendarRef
    it("exposes calendarRef", () => {
      const component = mount(UDatePicker);

      expect(component.vm.calendarRef).toBeDefined();
    });

    // userFormatDate
    it("exposes userFormatDate", () => {
      const component = mount(UDatePicker);

      expect(component.vm.userFormatDate).toBeDefined();
    });

    // formattedDate
    it("exposes formattedDate", () => {
      const component = mount(UDatePicker);

      expect(component.vm.formattedDate).toBeDefined();
    });
  });
});
