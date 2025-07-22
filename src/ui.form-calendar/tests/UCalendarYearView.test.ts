import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCalendarYearView from "../UCalendarYearView.vue";
import defaultConfig from "../config.ts";

import type { UCalendarViewProps } from "../types.ts";
import UButton from "../../ui.button/UButton.vue";

describe("UCalendarYearView.vue", () => {
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

  describe("Single Year Selection Classes", () => {
    it("applies selected year classes when year is selected and not in range mode", () => {
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          selectedDate: new Date("2023-12-15"),
          range: false,
        },
      });

      const selectedYear = component.findComponent('[vl-key="selectedYear"]');

      expect(selectedYear.exists()).toBe(true);
      expect(selectedYear.getComponent(UButton).props("variant")).toBe("solid");
      expect(selectedYear.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies current year classes for present year", () => {
      const today = new Date();
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          activeDate: today,
          selectedDate: null,
        },
      });

      const currentYear = component.findComponent('[vl-key="currentYear"]');

      expect(currentYear.exists()).toBe(true);
      expect(currentYear.getComponent(UButton).props("variant")).toBe("ghost");
      expect(currentYear.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies active year classes when arrow key navigation is dirty", () => {
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          isArrowKeyDirty: true,
          range: false,
          selectedDate: null,
        },
      });

      const activeYear = component.findComponent('[vl-key="activeYear"]');

      expect(activeYear.exists()).toBe(true);
      expect(activeYear.getComponent(UButton).props("variant")).toBe("ghost");
      expect(activeYear.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies regular year classes", () => {
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          selectedDate: null,
        },
      });

      const regularYear = component.findComponent('[vl-key="year"]');

      expect(regularYear.exists()).toBe(true);
      expect(regularYear.getComponent(UButton).props("variant")).toBe("ghost");
      expect(regularYear.getComponent(UButton).props("color")).toBe("grayscale");
    });
  });

  describe("Range Selection Classes", () => {
    it("does not apply selected year styles when range mode is enabled", () => {
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-15"),
          selectedDateTo: new Date("2024-12-25"),
        },
      });

      const selectedYear = component.findComponent('[vl-key="selectedYear"]');

      expect(selectedYear.exists()).toBe(false);
    });

    it("applies current year classes even in range mode", () => {
      const today = new Date();
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          range: true,
          activeDate: today,
          selectedDate: new Date("2022-01-15"),
          selectedDateTo: new Date("2024-02-15"),
        },
      });

      const currentYear = component.findComponent('[vl-key="currentYear"]');

      expect(currentYear.exists()).toBe(true);
      expect(currentYear.getComponent(UButton).props("variant")).toBe("ghost");
      expect(currentYear.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies regular year classes for all years when in range mode", () => {
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2020-01-15"),
          selectedDateTo: new Date("2021-02-15"),
          activeDate: new Date("2023-06-15"),
        },
      });

      const regularYears = component.findAllComponents('[vl-key="year"]');

      expect(regularYears.length).toBeGreaterThan(0);
      regularYears.forEach((year) => {
        expect(year.getComponent(UButton).props("variant")).toBe("ghost");
        expect(year.getComponent(UButton).props("color")).toBe("grayscale");
      });
    });

    it("applies disabled state to years outside min/max date range", () => {
      const component = mount(UCalendarYearView, {
        props: {
          ...defaultProps,
          minDate: new Date("2021-01-01"),
          maxDate: new Date("2025-12-31"),
          activeDate: new Date("2023-12-15"),
        },
      });

      const allButtons = component.findAllComponents(UButton);
      const year2020Button = allButtons.find((button) => button.props("label") === "2020");
      const year2026Button = allButtons.find((button) => button.props("label") === "2026");

      expect(year2020Button?.props("disabled")).toBe(true);
      expect(year2026Button?.props("disabled")).toBe(true);
    });
  });

  describe("Exposed Properties", () => {
    it("exposes years computed property", () => {
      const component = mount(UCalendarYearView, {
        props: defaultProps,
      });

      expect(component.vm.years).toBeDefined();
      expect(Array.isArray(component.vm.years)).toBe(true);
      expect(component.vm.years.length).toBeGreaterThan(0);
    });
  });
});
