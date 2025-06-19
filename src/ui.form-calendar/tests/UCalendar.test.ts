import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCalendar from "../UCalendar.vue";
import UButton from "../../ui.button/UButton.vue";
import ULoader from "../../ui.loader/ULoader.vue";

import { View } from "../constants.ts";

import type { Props } from "../types.ts";

describe("UCalendar.vue", () => {
  // Props tests
  describe("Props", () => {
    // View prop
    it("applies the correct view", async () => {
      const views = {
        day: "day",
        month: "month",
        year: "year",
      };

      Object.entries(views).forEach(([view, expectedView]) => {
        const component = mount(UCalendar, {
          props: {
            view: view as Props["view"],
            modelValue: new Date(),
          },
        });

        expect(component.vm.currentView).toBe(expectedView);
      });
    });

    // Range prop
    it("applies range mode when range prop is true", () => {
      const range = true;

      const component = mount(UCalendar, {
        props: {
          range,
          modelValue: new Date(),
        },
      });

      expect(component.vm.isTimepickerEnabled).toBe(false);
    });

    // Tabindex prop
    it("applies the correct tabindex attribute", () => {
      const tabindex = "2";

      const component = mount(UCalendar, {
        props: {
          tabindex,
          modelValue: new Date(),
        },
      });

      expect(component.attributes("tabindex")).toBe(tabindex);
    });

    // Timepicker prop
    it("shows timepicker when timepicker prop is true and range is false", () => {
      const timepicker = true;
      const range = false;

      const component = mount(UCalendar, {
        props: {
          timepicker,
          range,
          modelValue: new Date(),
        },
      });

      expect(component.vm.isTimepickerEnabled).toBe(true);
      expect(component.find("[vl-key='timepicker']").exists()).toBe(true);
    });

    // DateFormat prop
    it("uses the correct date format", () => {
      const dateFormat = "Y-m-d";
      const modelValue = new Date(2023, 0, 1); // January 1, 2023

      const component = mount(UCalendar, {
        props: {
          dateFormat,
          modelValue,
        },
      });

      expect(component.vm.actualDateFormat).toBe(dateFormat);
    });

    // DateTimeFormat prop
    it("uses the correct date time format when timepicker is enabled", () => {
      const dateTimeFormat = "Y-m-d H:i:S";
      const timepicker = true;

      const component = mount(UCalendar, {
        props: {
          dateTimeFormat,
          timepicker,
          modelValue: new Date(),
        },
      });

      expect(component.vm.actualDateFormat).toBe(dateTimeFormat);
    });

    // UserDateFormat prop
    it("uses the correct user date format", () => {
      const userDateFormat = "j F, Y";
      const modelValue = new Date(2023, 0, 1); // January 1, 2023

      const component = mount(UCalendar, {
        props: {
          userDateFormat,
          modelValue,
        },
      });

      expect(component.vm.actualUserFormat).toBe(userDateFormat);
    });

    // UserDateTimeFormat prop
    it("uses the correct user date time format when timepicker is enabled", () => {
      const userDateTimeFormat = "j F, Y - H:i:S";
      const timepicker = true;

      const component = mount(UCalendar, {
        props: {
          userDateTimeFormat,
          timepicker,
          modelValue: new Date(),
        },
      });

      expect(component.vm.actualUserFormat).toBe(userDateTimeFormat);
    });

    // MinDate prop
    it("respects the min date constraint", async () => {
      const minDate = new Date(2023, 0, 15); // January 15, 2023
      const modelValue = new Date(2023, 0, 1); // January 1, 2023

      const component = mount(UCalendar, {
        props: {
          minDate,
          modelValue,
        },
      });

      // Try to set a date before minDate
      await component.vm.onInputDate(new Date(2023, 0, 10)); // January 10, 2023

      // The value should not change because it's before minDate
      expect(component.emitted("update:modelValue")).toBeFalsy();
    });

    // MaxDate prop
    it("respects the max date constraint", async () => {
      const maxDate = new Date(2023, 0, 15); // January 15, 2023
      const modelValue = new Date(2023, 0, 20); // January 20, 2023

      const component = mount(UCalendar, {
        props: {
          maxDate,
          modelValue,
        },
      });

      // Try to set a date after maxDate
      await component.vm.onInputDate(new Date(2023, 0, 25)); // January 25, 2023

      // The value should not change because it's after maxDate
      expect(component.emitted("update:modelValue")).toBeFalsy();
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-calendar";

      const component = mount(UCalendar, {
        props: {
          dataTest,
          modelValue: new Date(),
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:modelValue event
    it("emits update:modelValue event when date is selected", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date(),
        },
      });
      const date = new Date(2023, 0, 1); // January 1, 2023

      await component.vm.onInputDate(date);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0][0]).toEqual(date);
    });

    // update:view event
    it("emits update:view event when view changes", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date(),
        },
      });

      await component.vm.onClickViewSwitch();

      expect(component.emitted("update:view")).toBeTruthy();
    });

    // input event
    it("emits input event when date is selected", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date(),
        },
      });
      const date = new Date(2023, 0, 1); // January 1, 2023

      await component.vm.onInputDate(date);

      expect(component.emitted("input")).toBeTruthy();
      expect(component.emitted("input")[0][0]).toEqual(date);
    });

    // submit event
    it("emits submit event when enter key is pressed on a selected date", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date(),
        },
      });

      // Set an active date
      component.vm.activeDate = new Date(2023, 0, 1); // January 1, 2023

      // Simulate enter key press
      await component.vm.enterKeyHandler();

      expect(component.emitted("submit")).toBeTruthy();
    });

    // keydown event
    it("emits keydown event when arrow keys are pressed", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date(),
        },
      });
      const event = new KeyboardEvent("keydown", { code: "ArrowDown" });

      await component.vm.onKeydown(event);

      expect(component.emitted("keydown")).toBeTruthy();
      expect(component.emitted("keydown")[0][0]).toEqual(event);
    });

    // userDateChange event
    it("emits userDateChange event when user date format changes", async () => {
      const component = mount(UCalendar);
      const date = new Date(2023, 0, 1); // January 1, 2023

      await component.vm.onInputDate(date);

      expect(component.emitted("userDateChange")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UCalendar);

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
