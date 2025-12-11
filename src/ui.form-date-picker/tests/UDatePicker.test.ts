import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { nextTick } from "vue";

import UDatePicker from "../UDatePicker.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("UDatePicker.vue", () => {
  describe("Props", () => {
    it("Model Value – set initial value correctly with Date object", () => {
      const initialValue = new Date("2024-01-15");

      const component = mount(UDatePicker, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("modelValue")).toBe(initialValue);
    });

    it("Model Value – set initial value correctly with string", () => {
      const initialValue = "2024-01-15";

      const component = mount(UDatePicker, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("modelValue")).toBe(initialValue);
    });

    it("Model Value – emits update when value changes", async () => {
      const initialValue = new Date("2024-01-15");
      const newValue = new Date("2024-01-01");

      const component = mount(UDatePicker, {
        props: {
          modelValue: initialValue,
          "onUpdate:modelValue": (value: Date) => {
            component.setProps({ modelValue: value });
          },
        },
      });

      const input = component.getComponent(UInput).find("input");

      await input.trigger("focus");
      await nextTick();

      const calendar = component.findComponent({ name: "UCalendar" });
      const day = calendar.get("[vl-key='day']");

      await day.trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toEqual(newValue);
    });

    it("Label – passes label to UInput component", () => {
      const labelText = "Select Date";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          label: labelText,
        },
      });

      expect(component.getComponent(UInput).props("label")).toBe(labelText);
    });

    it("Label Align – passes labelAlign prop to UInput component", () => {
      const labelAlign = "left";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          label: "Date",
          labelAlign,
        },
      });

      expect(component.getComponent(UInput).props("labelAlign")).toBe(labelAlign);
    });

    it("Placeholder – sets placeholder text", () => {
      const placeholderText = "Select a date";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          placeholder: placeholderText,
        },
      });

      expect(component.getComponent(UInput).props("placeholder")).toBe(placeholderText);
    });

    it("Description – passes description to UInput component", () => {
      const descriptionText = "Choose your preferred date";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          description: descriptionText,
        },
      });

      expect(component.getComponent(UInput).props("description")).toBe(descriptionText);
    });

    it("Error – passes error message to UInput component", () => {
      const errorText = "Date is required";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          error: errorText,
        },
      });

      expect(component.getComponent(UInput).props("error")).toBe(errorText);
    });

    it("Disabled – sets disabled state on UInput", () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          disabled: true,
        },
      });

      expect(component.getComponent(UInput).props("disabled")).toBe(true);
    });

    it("Size – applies correct size to UInput component", () => {
      const size = "lg";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          size: size as Props<string>["size"],
        },
      });

      expect(component.getComponent(UInput).props("size")).toBe(size);
    });

    it("Left Icon – passes leftIcon to UInput component", () => {
      const leftIcon = "calendar";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          leftIcon,
        },
      });

      expect(component.getComponent(UInput).props("leftIcon")).toBe(leftIcon);
    });

    it("Right Icon – passes rightIcon to UInput component", () => {
      const rightIcon = "close";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          rightIcon,
        },
      });

      expect(component.getComponent(UInput).props("rightIcon")).toBe(rightIcon);
    });

    it("Right Icon – shows default calendar icon when no rightIcon provided", () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
      });

      const input = component.getComponent(UInput);

      expect(input.props("rightIcon")).toBeTruthy();
    });

    it("Timepicker – passes timepicker prop to UCalendar", () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          timepicker: true,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("timepicker")).toBe(true);
    });

    it("Date Format – passes dateFormat to UCalendar", () => {
      const dateFormat = "YYYY-MM-DD";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          dateFormat,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("dateFormat")).toBe(dateFormat);
    });

    it("Date Time Format – passes dateTimeFormat to UCalendar", () => {
      const dateTimeFormat = "YYYY-MM-DD HH:mm";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          dateTimeFormat,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("dateTimeFormat")).toBe(
        dateTimeFormat,
      );
    });

    it("User Date Format – passes userDateFormat to UCalendar", () => {
      const userDateFormat = "DD/MM/YYYY";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          userDateFormat,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("userDateFormat")).toBe(
        userDateFormat,
      );
    });

    it("User Date Time Format – passes userDateTimeFormat to UCalendar", () => {
      const userDateTimeFormat = "DD/MM/YYYY HH:mm";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          userDateTimeFormat,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("userDateTimeFormat")).toBe(
        userDateTimeFormat,
      );
    });

    it("Min Date – passes minDate to UCalendar", () => {
      const minDate = new Date("2024-01-01");

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          minDate,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("minDate")).toBe(minDate);
    });

    it("Max Date – passes maxDate to UCalendar", () => {
      const maxDate = new Date("2024-12-31");

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          maxDate,
        },
      });

      expect(component.findComponent({ name: "UCalendar" }).props("maxDate")).toBe(maxDate);
    });

    it("Id – sets id attribute on input", () => {
      const idValue = "date-picker-id";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          id: idValue,
        },
      });

      expect(component.getComponent(UInput).props("id")).toBe(idValue);
    });

    it("Data Test – sets data-test attribute", () => {
      const dataTestValue = "date-picker";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          dataTest: dataTestValue,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTestValue);
    });

    it("Data Test – applies correct data-test attributes to sub-components", () => {
      const dataTest = "date-picker";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          dataTest,
        },
      });

      expect(component.getComponent(UInput).props("dataTest")).toBe(`${dataTest}-input`);
      expect(component.findComponent({ name: "UCalendar" }).props("dataTest")).toBe(
        `${dataTest}-calendar`,
      );
    });
  });

  describe("Calendar Visibility", () => {
    it("Calendar – is hidden by default", () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
      });

      const calendar = component.findComponent({ name: "UCalendar" });

      expect(calendar.isVisible()).toBe(false);
    });

    it("Calendar – shows when input is focused", async () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
      });

      const input = component.getComponent(UInput).find("input");

      await input.trigger("focus");

      const calendar = component.findComponent({ name: "UCalendar" });

      expect(calendar.isVisible()).toBe(true);
    });

    it("Calendar – hides when escape key is pressed on calendar", async () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
      });

      const input = component.getComponent(UInput).find("input");
      const calendar = component.findComponent({ name: "UCalendar" });

      await input.trigger("focus");

      await calendar.trigger("keydown.esc");

      expect(calendar.isVisible()).toBe(false);
    });
  });

  describe("Slots", () => {
    it("Left – renders custom content from left slot", () => {
      const slotText = "Custom Left Content";
      const slotClass = "custom-left";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
        slots: {
          left: `<span class="${slotClass}">${slotText}</span>`,
        },
      });

      const leftSlotElement = component.find(`.${slotClass}`);

      expect(leftSlotElement.exists()).toBe(true);
      expect(leftSlotElement.text()).toBe(slotText);
    });

    it("Left – exposes icon-name to slot when leftIcon prop is provided", () => {
      const leftIcon = "calendar";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          leftIcon,
        },
        slots: {
          left: "Icon: {{ params.iconName }}",
        },
      });

      const input = component.getComponent(UInput);
      const leftSlot = input.vm.$slots.left;

      expect(leftSlot).toBeDefined();
    });

    it("Right – renders custom content from right slot", () => {
      const slotText = "Custom Right Content";
      const slotClass = "custom-right";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
        slots: {
          right: `<span class="${slotClass}">${slotText}</span>`,
        },
      });

      const rightSlotElement = component.find(`.${slotClass}`);

      expect(rightSlotElement.exists()).toBe(true);
      expect(rightSlotElement.text()).toBe(slotText);
    });

    it("Right – exposes icon-name to slot when rightIcon prop is provided", () => {
      const rightIcon = "close";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
          rightIcon,
        },
        slots: {
          right: "Icon: {{ params.iconName }}",
        },
      });

      const input = component.getComponent(UInput);
      const rightSlot = input.vm.$slots.right;

      expect(rightSlot).toBeDefined();
    });

    it("Right – renders default calendar icon when no slot content provided", () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
    });

    it("Right – slot content overrides default calendar icon", () => {
      const slotClass = "custom-icon";

      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
        slots: {
          right: `<span class="${slotClass}">Custom Icon</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
    });
  });

  describe("Exposed Properties", () => {
    it("Calendar Ref – exposes calendar component ref", () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date(),
        },
      });

      expect(component.vm.calendarRef).toBeDefined();
    });

    it("User Format Date – exposes user-friendly formatted date", async () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date("2024-01-15"),
        },
      });

      await nextTick();

      expect(component.vm.userFormatDate).toBeDefined();
      expect(typeof component.vm.userFormatDate).toBe("string");
    });

    it("Formatted Date – exposes internal formatted date", async () => {
      const component = mount(UDatePicker, {
        props: {
          modelValue: new Date("2024-01-15"),
        },
      });

      await nextTick();

      expect(component.vm.formattedDate).toBeDefined();
      expect(typeof component.vm.formattedDate).toBe("string");
    });
  });
});
