import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCalendarMonthView from "../UCalendarMonthView.vue";
import defaultConfig from "../config.ts";

import type { UCalendarViewProps } from "../types.ts";
import UButton from "../../ui.button/UButton.vue";

describe("UCalendarMonthView.vue", () => {
  const defaultProps: UCalendarViewProps = {
    selectedDate: new Date("2023-12-15"),
    selectedDateTo: null,
    activeDate: new Date("2023-12-16"),
    locale: {
      weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        userFormat: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      },
      months: {
        shorthand: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        longhand: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        userFormat: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      today: "Today",
      tomorrow: "Tomorrow",
      yesterday: "Yesterday",
    },
    range: false,
    isArrowKeyDirty: false,
    config: defaultConfig,
  };

  describe("Single Month Selection Classes", () => {
    it("applies selected month classes when month is selected and not in range mode", () => {
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          selectedDate: new Date("2023-12-15"),
          range: false,
        },
      });

      const selectedMonth = component.findComponent('[vl-key="selectedMonth"]');

      expect(selectedMonth.exists()).toBe(true);
      expect(selectedMonth.getComponent(UButton).props("variant")).toBe("solid");
      expect(selectedMonth.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies current month classes for present month", () => {
      const today = new Date();
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          activeDate: today,
          selectedDate: null,
        },
      });

      const currentMonth = component.findComponent('[vl-key="currentMonth"]');

      expect(currentMonth.exists()).toBe(true);
      expect(currentMonth.getComponent(UButton).props("variant")).toBe("ghost");
      expect(currentMonth.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies active month classes when arrow key navigation is dirty", () => {
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          isArrowKeyDirty: true,
          range: false,
          selectedDate: null,
        },
      });

      const activeMonth = component.findComponent('[vl-key="activeMonth"]');

      expect(activeMonth.exists()).toBe(true);
      expect(activeMonth.getComponent(UButton).props("variant")).toBe("ghost");
      expect(activeMonth.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies regular month classes", () => {
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          selectedDate: null,
        },
      });

      const regularMonth = component.findComponent('[vl-key="month"]');

      expect(regularMonth.exists()).toBe(true);
      expect(regularMonth.getComponent(UButton).props("variant")).toBe("ghost");
      expect(regularMonth.getComponent(UButton).props("color")).toBe("grayscale");
    });
  });

  describe("Range Selection Classes", () => {
    it("does not apply selected month styles when range mode is enabled", () => {
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-15"),
          selectedDateTo: new Date("2023-12-25"),
        },
      });

      const selectedMonth = component.findComponent('[vl-key="selectedMonth"]');

      expect(selectedMonth.exists()).toBe(false);
    });

    it("applies current month classes even in range mode", () => {
      const today = new Date();
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          range: true,
          activeDate: today,
          selectedDate: new Date("2023-01-15"),
          selectedDateTo: new Date("2023-02-15"),
        },
      });

      const currentMonth = component.findComponent('[vl-key="currentMonth"]');

      expect(currentMonth.exists()).toBe(true);
      expect(currentMonth.getComponent(UButton).props("variant")).toBe("ghost");
      expect(currentMonth.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies regular month classes for all months when in range mode", () => {
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-01-15"),
          selectedDateTo: new Date("2023-02-15"),
          activeDate: new Date("2023-06-15"),
        },
      });

      const regularMonths = component.findAllComponents('[vl-key="month"]');

      expect(regularMonths.length).toBeGreaterThan(0);
      regularMonths.forEach((month) => {
        expect(month.getComponent(UButton).props("variant")).toBe("ghost");
        expect(month.getComponent(UButton).props("color")).toBe("grayscale");
      });
    });

    it("applies disabled state to months outside min/max date range", () => {
      const component = mount(UCalendarMonthView, {
        props: {
          ...defaultProps,
          minDate: new Date("2023-06-01"),
          maxDate: new Date("2023-08-31"),
          activeDate: new Date("2023-12-15"),
        },
      });

      const allButtons = component.findAllComponents(UButton);
      const mayButton = allButtons.find((button) => button.props("label") === "May");
      const decemberButton = allButtons.find((button) => button.props("label") === "December");

      expect(mayButton?.props("disabled")).toBe(true);
      expect(decemberButton?.props("disabled")).toBe(true);
    });
  });
});
