import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { nextTick } from "vue";

import UCalendar from "../UCalendar.vue";
import DayView from "../UCalendarDayView.vue";
import MonthView from "../UCalendarMonthView.vue";
import YearView from "../UCalendarYearView.vue";

import { View } from "../constants.ts";

import type { Props, RangeDate } from "../types.ts";

describe("UCalendar.vue", () => {
  describe("Props", () => {
    it("Model Value – sets initial date value correctly", () => {
      const modelValue = "2023-12-25";

      const component = mount(UCalendar, {
        props: {
          modelValue,
          dateFormat: "Y-m-d",
        },
      });

      expect(component.props("modelValue")).toBe(modelValue);
    });

    it("Model Value – sets range date value correctly", () => {
      const rangeValue = {
        from: "2023-12-01",
        to: "2023-12-31",
      };

      const component = mount(UCalendar, {
        props: {
          modelValue: rangeValue,
          range: true,
          dateFormat: "Y-m-d",
        },
      });

      expect(component.props("modelValue")).toEqual(rangeValue);
    });

    it("Model Value – emits update:modelValue when date changes", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: null,
          dateFormat: "Y-m-d",
        },
      });

      const dayView = component.findComponent(DayView);
      const dateButton = dayView.find('[vl-key="day"]');

      await dateButton.trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    it("View – sets the correct view variant", () => {
      const viewCases = [View.Day, View.Month, View.Year];

      viewCases.forEach((view) => {
        const component = mount(UCalendar, {
          props: {
            view: view as Props<string>["view"],
            modelValue: null,
          },
        });

        if (view === View.Day) {
          expect(component.findComponent(DayView).exists()).toBe(true);
          expect(component.findComponent(MonthView).exists()).toBe(false);
          expect(component.findComponent(YearView).exists()).toBe(false);
        } else if (view === View.Month) {
          expect(component.findComponent(DayView).exists()).toBe(false);
          expect(component.findComponent(MonthView).exists()).toBe(true);
          expect(component.findComponent(YearView).exists()).toBe(false);
        } else if (view === View.Year) {
          expect(component.findComponent(DayView).exists()).toBe(false);
          expect(component.findComponent(MonthView).exists()).toBe(false);
          expect(component.findComponent(YearView).exists()).toBe(true);
        }
      });
    });

    it("View – emits update:view when view changes", async () => {
      const component = mount(UCalendar, {
        props: {
          view: View.Day,
          modelValue: null,
        },
      });

      const viewSwitchButton = component.find('[vl-key="viewSwitchButton"]');

      await viewSwitchButton.trigger("click");

      expect(component.emitted("update:view")).toBeTruthy();
    });

    it("Range – enables range selection", async () => {
      const component = mount(UCalendar, {
        props: {
          range: true,
          modelValue: { from: null, to: null },
          "onUpdate:modelValue": (value: RangeDate) => {
            component.setProps({ modelValue: value });
          },
        },
      });

      const dayView = component.findComponent(DayView);

      const days = dayView.findAll('[vl-key="day"]');

      await days[0].trigger("click");
      await days[3].trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();

      const firstUpdate = component.emitted("update:modelValue")![0][0] as RangeDate;
      const secondUpdate = component.emitted("update:modelValue")![1][0] as RangeDate;

      expect(firstUpdate.from).not.toBeNull();
      expect(firstUpdate.to).toBeNull();

      expect(secondUpdate.from).not.toBeNull();
      expect(secondUpdate.to).not.toBeNull();
    });

    it("Timepicker – shows timepicker when enabled", () => {
      const component = mount(UCalendar, {
        props: {
          timepicker: true,
          modelValue: null,
        },
      });

      expect(component.find('[vl-key="timepicker"]').exists()).toBe(true);
      expect(component.find('[vl-key="timepickerInputHours"]').exists()).toBe(true);
      expect(component.find('[vl-key="timepickerInputMinutes"]').exists()).toBe(true);
      expect(component.find('[vl-key="timepickerInputSeconds"]').exists()).toBe(true);
      expect(component.find('[vl-key="timepickerSubmitButton"]').exists()).toBe(true);
    });

    it("Timepicker – does not show when range is enabled", () => {
      const component = mount(UCalendar, {
        props: {
          timepicker: true,
          range: true,
          modelValue: { from: null, to: null },
        },
      });

      expect(component.find('[vl-key="timepicker"]').exists()).toBe(false);
    });

    it("Timepicker – sets correct time values", async () => {
      const expectedHours = "10";
      const expectedMinutes = "30";
      const expectedSeconds = "45";

      const component = mount(UCalendar, {
        props: {
          timepicker: true,
          modelValue: new Date("2023-12-25T10:30:45"),
        },
      });

      await flushPromises();

      const hoursInput = component.find('[vl-key="timepickerInputHours"]')
        .element as HTMLInputElement;
      const minutesInput = component.find('[vl-key="timepickerInputMinutes"]')
        .element as HTMLInputElement;
      const secondsInput = component.find('[vl-key="timepickerInputSeconds"]')
        .element as HTMLInputElement;

      expect(hoursInput.value).toBe(expectedHours);
      expect(minutesInput.value).toBe(expectedMinutes);
      expect(secondsInput.value).toBe(expectedSeconds);
    });

    it("Date Format – uses correct date format", async () => {
      const dateFormat = "d/m/Y";
      const dateFormatRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

      const component = mount(UCalendar, {
        props: {
          dateFormat,
          modelValue: null,
        },
      });

      const dayView = component.findComponent(DayView);
      const day = dayView.find('[vl-key="day"]');

      await day.trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0][0]).toMatch(dateFormatRegex);
    });

    it("Date Time Format – uses correct datetime format when timepicker enabled", async () => {
      const dateTimeFormat = "Y-m-d H:i:s";
      const dateTimeFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{1,2}$/;

      const component = mount(UCalendar, {
        props: {
          timepicker: true,
          dateTimeFormat,
          modelValue: null,
        },
      });

      const dayView = component.findComponent(DayView);

      const day = dayView.find('[vl-key="day"]');

      await day.trigger("click");

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0][0]).toMatch(dateTimeFormatRegex);
    });

    it("User Date Format – displays correct user-friendly format", async () => {
      const expectedFromattedDate = "December 25, 2023";
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date("2023-12-25"),
          userDateFormat: "F j, Y",
        },
      });

      await nextTick();

      expect(component.emitted("userDateChange")).toBeTruthy();
      expect(component.emitted("userDateChange")![0][0]).toBe(expectedFromattedDate);
    });

    it("Range – handles range date formatting", async () => {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

      const component = mount(UCalendar, {
        props: {
          range: true,
          modelValue: {
            from: "2023-12-02",
            to: "2023-12-31",
          },
          dateFormat: "Y-m-d",
        },
      });

      await component.setProps({
        "onUpdate:modelValue": (value: RangeDate) => {
          component.setProps({ modelValue: value });
        },
      });

      const dayView = component.findComponent(DayView);
      const days = dayView.findAll("button");

      await days[0].trigger("click");
      await days[3].trigger("click");

      expect(component.emitted("update:modelValue")).toHaveLength(3);

      const updatedValue = component.emitted("update:modelValue")![2][0] as RangeDate;

      expect(updatedValue.from).toMatch(dateFormatRegex);
      expect(updatedValue.to).toMatch(dateFormatRegex);
    });

    it("Tabindex – sets tabindex attribute on wrapper", () => {
      const tabindex = 5;

      const component = mount(UCalendar, {
        props: {
          tabindex,
          modelValue: null,
        },
      });

      const wrapper = component.find('[vl-key="wrapper"]');

      expect(wrapper.attributes("tabindex")).toBe("5");
    });

    it("Data Test – applies correct data-test attribute", () => {
      const dataTest = "calendar-test";

      const component = mount(UCalendar, {
        props: {
          dataTest,
          modelValue: null,
        },
      });

      // Main wrapper should have the base data-test attribute
      expect(component.find(`[data-test="${dataTest}"]`).exists()).toBe(true);

      // Navigation elements should have data-test attributes
      expect(component.find(`[data-test="${dataTest}-navigation"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-prev"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-next"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-view-switch"]`).exists()).toBe(true);

      // Year navigation buttons should be present in day view (default)
      expect(component.find(`[data-test="${dataTest}-prev-year"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-next-year"]`).exists()).toBe(true);

      // Day view should be present by default
      expect(component.find(`[data-test="${dataTest}-day-view"]`).exists()).toBe(true);
    });

    it("Data Test – applies correct data-test attribute with timepicker", () => {
      const dataTest = "calendar-test";

      const component = mount(UCalendar, {
        props: {
          dataTest,
          timepicker: true,
          modelValue: null,
        },
      });

      // Main wrapper should have the base data-test attribute
      expect(component.find(`[data-test="${dataTest}"]`).exists()).toBe(true);

      // Timepicker elements should have data-test attributes
      expect(component.find(`[data-test="${dataTest}-timepicker"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-timepicker-hours"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-timepicker-minutes"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-timepicker-seconds"]`).exists()).toBe(true);
      expect(component.find(`[data-test="${dataTest}-timepicker-submit"]`).exists()).toBe(true);
    });

    it("Data Test – applies correct data-test attribute in different views", async () => {
      const dataTest = "calendar-test";

      const component = mount(UCalendar, {
        props: {
          dataTest,
          view: View.Month,
          modelValue: null,
        },
      });

      // Test month view
      expect(component.find(`[data-test="${dataTest}-month-view"]`).exists()).toBe(true);
      // Year navigation buttons should not be present in month view
      expect(component.find(`[data-test="${dataTest}-prev-year"]`).exists()).toBe(false);
      expect(component.find(`[data-test="${dataTest}-next-year"]`).exists()).toBe(false);

      // Change to year view
      await component.setProps({ view: View.Year });

      expect(component.find(`[data-test="${dataTest}-year-view"]`).exists()).toBe(true);
      // Year navigation buttons should not be present in year view
      expect(component.find(`[data-test="${dataTest}-prev-year"]`).exists()).toBe(false);
      expect(component.find(`[data-test="${dataTest}-next-year"]`).exists()).toBe(false);
    });
  });

  describe("Navigation", () => {
    it("Navigation – renders year navigation buttons in day view", () => {
      const component = mount(UCalendar, {
        props: {
          view: View.Day,
          modelValue: null,
        },
      });

      const nextPrevButtons = component.findAll('[vl-key="nextPrevButton"]');

      expect(nextPrevButtons.length).toBe(4);
    });

    it("Navigation – does not render year navigation in month/year views", () => {
      const viewCases = [View.Month, View.Year];

      viewCases.forEach((view) => {
        const component = mount(UCalendar, {
          props: {
            view: view as Props<string>["view"],
            modelValue: null,
          },
        });

        const nextPrevButtons = component.findAll('[vl-key="nextPrevButton"]');

        expect(nextPrevButtons.length).toBe(2);
      });
    });

    it("Navigation – view switch button triggers view change", async () => {
      const component = mount(UCalendar, {
        props: {
          view: View.Day,
          modelValue: null,
        },
      });

      const viewSwitchButton = component.find('[vl-key="viewSwitchButton"]');

      await viewSwitchButton.trigger("click");

      expect(component.emitted("update:view")).toBeTruthy();
    });

    it("Navigation – prev button navigates correctly", async () => {
      const component = mount(UCalendar, {
        props: {
          view: View.Day,
          modelValue: new Date("2023-12-15"),
        },
      });

      const dayView = component.findComponent(DayView);
      const initialDays = dayView.findAll('[vl-key="day"]').map((day) => day.text());
      const navButtons = component.findAll('[vl-key="nextPrevButton"]');

      expect(navButtons.length).toBe(4);

      const prevButton = navButtons[1];

      await prevButton.trigger("click");

      const updatedDays = dayView.findAll('[vl-key="day"]').map((day) => day.text());

      expect(updatedDays).not.toEqual(initialDays);
      expect(prevButton.exists()).toBe(true);
    });

    it("Navigation – next button navigates correctly", async () => {
      const component = mount(UCalendar, {
        props: {
          view: View.Day,
          modelValue: new Date("2023-12-15"),
        },
      });

      const dayView = component.findComponent(DayView);
      const initialDays = dayView.findAll('[vl-key="day"]').map((day) => day.text());
      const navButtons = component.findAll('[vl-key="nextPrevButton"]');
      const nextButton = navButtons[2];

      await nextButton.trigger("click");

      const updatedDays = dayView.findAll('[vl-key="day"]').map((day) => day.text());

      expect(updatedDays).not.toEqual(initialDays);
      expect(nextButton.exists()).toBe(true);
    });
  });

  describe("Events", () => {
    it("Input – emits input event when date is selected", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: null,
        },
      });

      const dayView = component.findComponent(DayView);
      const day = dayView.find('[vl-key="day"]');

      await day.trigger("click");

      expect(component.emitted("input")).toBeTruthy();
      expect(component.emitted("input")![0][0]).toBeInstanceOf(Date);
    });

    it("Keydown – emits keydown event", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: null,
        },
      });

      await component.trigger("keydown", { key: "ArrowLeft" });

      expect(component.emitted("keydown")).toBeTruthy();
    });

    it("Submit – emits submit event when Enter is pressed", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date("2023-12-25"),
        },
      });

      await component.trigger("keydown", { code: "Enter" });

      expect(component.emitted("submit")).toBeTruthy();
    });

    it("Timepicker – submit button triggers submit event", async () => {
      const component = mount(UCalendar, {
        props: {
          timepicker: true,
          modelValue: null,
        },
      });

      const submitButton = component.find('[vl-key="timepickerSubmitButton"]');

      await submitButton.trigger("click");

      expect(component.emitted("submit")).toBeTruthy();
    });

    it("UserDateChange – emits when user date format changes", async () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: new Date("2023-12-25"),
          userDateFormat: "F j, Y",
        },
      });

      expect(component.emitted("userDateChange")).toBeTruthy();
    });
  });

  describe("Exposed Properties", () => {
    it("Exposes wrapper element ref", () => {
      const component = mount(UCalendar, {
        props: {
          modelValue: null,
        },
      });

      expect(component.vm.$refs.wrapper).toBeDefined();
    });
  });

  describe("Arrow Key Navigation", () => {
    it("Arrow Key Navigation – applies active styles when navigating with arrow keys in day view", async () => {
      const component = mount(UCalendar, {
        props: {
          view: View.Day,
          modelValue: new Date("2023-12-15"),
        },
      });

      const dayView = component.findComponent(DayView);

      expect(dayView.findAll('[vl-key="activeDay"]')).toHaveLength(0);

      await component.trigger("keydown", { code: "ArrowRight" });

      expect(dayView.findAll('[vl-key="activeDay"]')).toHaveLength(1);
    });

    it("Arrow Key Navigation – moves focus correctly with different arrow keys in day view", async () => {
      const expectedDayAfterRight = "10";
      const expectedDayAfterLeft = "9";
      const expectedDayAfterDown = "16";
      const expectedDayAfterUp = "9";

      const component = mount(UCalendar, {
        props: {
          view: View.Day,
          modelValue: new Date("2025-07-08"),
        },
      });

      await component.trigger("keydown", { code: "ArrowRight" });

      await component.trigger("keydown", { code: "ArrowRight" });
      expect(component.find('[vl-key="activeDay"]').text()).toBe(expectedDayAfterRight);

      await component.trigger("keydown", { code: "ArrowLeft" });
      expect(component.find('[vl-key="activeDay"]').text()).toBe(expectedDayAfterLeft);

      await component.trigger("keydown", { code: "ArrowDown" });
      expect(component.find('[vl-key="activeDay"]').text()).toBe(expectedDayAfterDown);

      await component.trigger("keydown", { code: "ArrowUp" });
      expect(component.find('[vl-key="activeDay"]').text()).toBe(expectedDayAfterUp);
    });

    it("Arrow Key Navigation – moves focus correctly in month view", async () => {
      const expectedMonthAfterRight = "February";
      const expectedMonthAfterLeft = "January";
      const expectedMonthAfterDown = "April";
      const expectedMonthAfterUp = "January";

      const component = mount(UCalendar, {
        props: {
          view: View.Month,
          modelValue: new Date("2023-12-15"),
        },
      });

      await component.trigger("keydown", { code: "ArrowRight" });

      await component.trigger("keydown", { code: "ArrowRight" });
      expect(component.find('[vl-key="activeMonth"]').text()).toBe(expectedMonthAfterRight);

      await component.trigger("keydown", { code: "ArrowLeft" });
      expect(component.find('[vl-key="activeMonth"]').text()).toBe(expectedMonthAfterLeft);

      await component.trigger("keydown", { code: "ArrowDown" });
      expect(component.find('[vl-key="activeMonth"]').text()).toBe(expectedMonthAfterDown);

      await component.trigger("keydown", { code: "ArrowUp" });
      expect(component.find('[vl-key="activeMonth"]').text()).toBe(expectedMonthAfterUp);
    });

    it("Arrow Key Navigation – does not navigate when range mode is enabled", async () => {
      const component = mount(UCalendar, {
        props: {
          range: true,
          modelValue: { from: null, to: null },
        },
      });

      const dayView = component.findComponent(DayView);

      await component.trigger("keydown", { code: "ArrowRight" });

      expect(dayView.findAll('[vl-key="activeDay"]')).toHaveLength(0);
    });

    it("Arrow Key Navigation – respects min and max date boundaries", async () => {
      const expectedFirstActiveDate = "1";
      const expectedSecondsActiveDate = "4";

      const component = mount(UCalendar, {
        props: {
          modelValue: "2023-12-02",
          minDate: "2023-12-01",
          maxDate: "2023-12-04",
          dateFormat: "Y-m-d",
        },
      });

      await component.trigger("keydown", { code: "ArrowLeft" });
      await component.trigger("keydown", { code: "ArrowLeft" });

      expect(component.get("[vl-key='activeDay']").text()).toBe(expectedFirstActiveDate);

      await component.trigger("keydown", { code: "ArrowRight" });
      await component.trigger("keydown", { code: "ArrowRight" });
      await component.trigger("keydown", { code: "ArrowRight" });
      await component.trigger("keydown", { code: "ArrowRight" });

      expect(component.get("[vl-key='activeDay']").text()).toBe(expectedSecondsActiveDate);
    });
  });
});
