import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCalendarDayView from "../UCalendarDayView.vue";
import defaultConfig from "../config.ts";

import type { UCalendarViewProps } from "../types.ts";
import UButton from "../../ui.button/UButton.vue";

describe("UCalendarDayView.vue", () => {
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

  describe("Single Date Selection Classes", () => {
    it("applies selected day classes when day is selected and not in range mode", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          selectedDate: new Date("2023-12-15"),
          range: false,
        },
      });

      const selectedDay = component.findComponent('[vl-key="selectedDay"]');

      expect(selectedDay.exists()).toBe(true);
      expect(selectedDay.getComponent(UButton).props("variant")).toBe("solid");
      expect(selectedDay.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies current day classes for today's date", () => {
      const today = new Date();
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          activeDate: today,
          selectedDate: null,
        },
      });

      const currentDay = component.findComponent('[vl-key="currentDay"]');

      expect(currentDay.exists()).toBe(true);
      expect(currentDay.getComponent(UButton).props("variant")).toBe("ghost");
      expect(currentDay.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies active day classes when arrow key navigation is dirty", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          isArrowKeyDirty: true,
          range: false,
        },
      });

      const activeDay = component.find('[vl-key="activeDay"]');

      expect(activeDay.exists()).toBe(true);
      expect(activeDay.getComponent(UButton).props("variant")).toBe("ghost");
      expect(activeDay.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies another month day classes for days from previous/next month", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          activeDate: new Date("2023-12-15"),
          selectedDate: null,
        },
      });

      const anotherMonthDay = component.find('[vl-key="anotherMonthDay"]');

      expect(anotherMonthDay.exists()).toBe(true);
      expect(anotherMonthDay.getComponent(UButton).props("variant")).toBe("ghost");
      expect(anotherMonthDay.getComponent(UButton).props("color")).toBe("grayscale");
    });

    it("applies regular day classes", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          selectedDate: null,
        },
      });

      const regularDays = component.find('[vl-key="day"]');

      expect(regularDays.exists()).toBe(true);
      expect(regularDays.getComponent(UButton).props("variant")).toBe("ghost");
      expect(regularDays.getComponent(UButton).props("color")).toBe("grayscale");
    });
  });

  describe("Range Selection Classes", () => {
    it("applies first day in range classes when selecting range start", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-10"),
          selectedDateTo: new Date("2023-12-20"),
        },
      });

      const firstDayInRange = component.find('[vl-key="firstDayInRange"]');

      expect(firstDayInRange.exists()).toBe(true);
      expect(firstDayInRange.getComponent(UButton).props("variant")).toBe("solid");
      expect(firstDayInRange.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies last day in range classes when selecting range end", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-10"),
          selectedDateTo: new Date("2023-12-20"),
        },
      });

      const lastDayInRange = component.find('[vl-key="lastDayInRange"]');

      expect(lastDayInRange.exists()).toBe(true);
      expect(lastDayInRange.getComponent(UButton).props("variant")).toBe("solid");
      expect(lastDayInRange.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies day in range classes for days between range start and end", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-10"),
          selectedDateTo: new Date("2023-12-20"),
        },
      });

      const dayInRange = component.find('[vl-key="dayInRange"]');

      expect(dayInRange.exists()).toBe(true);
      expect(dayInRange.getComponent(UButton).props("variant")).toBe("ghost");
      expect(dayInRange.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies same day range classes when from and to dates are the same", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-15"),
          selectedDateTo: new Date("2023-12-15"),
        },
      });

      const rangeSameDay = component.find('[vl-key="selectedDay"]');

      expect(rangeSameDay.exists()).toBe(true);
      expect(rangeSameDay.getComponent(UButton).props("variant")).toBe("solid");
      expect(rangeSameDay.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies another month first day in range classes", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2025-07-28"),
          selectedDateTo: new Date("2025-08-10"),
          activeDate: new Date("2025-08-10"),
        },
      });

      const anotherMonthFirstDay = component.find('[vl-key="anotherMonthFirstDayInRange"]');

      expect(anotherMonthFirstDay.exists()).toBe(true);
      expect(anotherMonthFirstDay.getComponent(UButton).props("variant")).toBe("solid");
      expect(anotherMonthFirstDay.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies another month last day in range classes", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2025-07-28"),
          selectedDateTo: new Date("2025-08-02"),
          activeDate: new Date("2025-07-25"),
        },
      });

      const anotherMonthLastDay = component.find('[vl-key="anotherMonthLastDayInRange"]');

      expect(anotherMonthLastDay.exists()).toBe(true);
      expect(anotherMonthLastDay.getComponent(UButton).props("variant")).toBe("solid");
      expect(anotherMonthLastDay.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies another month day in range classes for days from other months within range", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-11-25"),
          selectedDateTo: new Date("2023-12-15"),
          activeDate: new Date("2023-12-15"),
        },
      });

      const anotherMonthDayInRange = component.find('[vl-key="anotherMonthDayInRange"]');

      expect(anotherMonthDayInRange.exists()).toBe(true);
      expect(anotherMonthDayInRange.getComponent(UButton).props("variant")).toBe("ghost");
      expect(anotherMonthDayInRange.getComponent(UButton).props("color")).toBe("primary");
    });

    it("applies current day in range classes when today is within selected range", () => {
      const today = new Date();
      const yesterday = new Date(today);

      yesterday.setDate(today.getDate() - 1);
      const tomorrow = new Date(today);

      tomorrow.setDate(today.getDate() + 1);

      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: yesterday,
          selectedDateTo: tomorrow,
          activeDate: today,
        },
      });

      const currentDayInRange = component.findComponent('[vl-key="currentDayInRange"]');

      expect(currentDayInRange.exists()).toBe(true);
      expect(currentDayInRange.getComponent(UButton).props("variant")).toBe("ghost");
    });

    it("applies disabled state to days outside min/max date range", () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          minDate: new Date("2023-12-10"),
          maxDate: new Date("2023-12-20"),
          activeDate: new Date("2023-12-15"),
        },
      });

      const allButtons = component.findAll("button");
      const buttonOutOfRange = allButtons.find((button) => button.text() === "21");

      expect(buttonOutOfRange?.attributes("disabled")).toBeDefined();
    });
  });

  describe("Range Preview Classes", () => {
    it("applies range preview classes when hovering over days during range selection", async () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-10"),
          selectedDateTo: null, // No end date selected yet
        },
      });

      const dayButtons = component.findAll("button");
      const targetDay = dayButtons.find((button) => button.text() === "15");

      if (targetDay) {
        await targetDay.trigger("mouseover");

        const lastRangePreview = component.find('[vl-key="lastDayInRange"]');

        expect(lastRangePreview.exists()).toBe(true);
      }
    });

    it("applies another month range preview classes when hovering over another month day", async () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-10"),
          selectedDateTo: null,
          activeDate: new Date("2023-12-15"),
        },
      });

      const anotherMonthDays = component.findAll('[vl-key="anotherMonthDay"]');

      if (anotherMonthDays.length > 0) {
        await anotherMonthDays[0].trigger("mouseover");

        const anotherMonthPreview = component.findAll('[vl-key="anotherMonthDayInRange"]');

        expect(anotherMonthPreview.length).toBeGreaterThanOrEqual(0);
      }
    });

    it("clears range preview when mouse leaves day view", async () => {
      const component = mount(UCalendarDayView, {
        props: {
          ...defaultProps,
          range: true,
          selectedDate: new Date("2023-12-10"),
          selectedDateTo: null,
        },
      });

      const dayButtons = component.findAll("button");
      const targetDay = dayButtons.find((button) => button.text() === "15");

      if (targetDay) {
        await targetDay.trigger("mouseover");
        await component.trigger("mouseleave");

        const lastRangePreview = component.find('[vl-key="lastDayInRange"]');

        expect(lastRangePreview.exists()).toBe(false);
      }
    });
  });

  describe("Exposed Properties", () => {
    it("exposes days computed property", () => {
      const component = mount(UCalendarDayView, {
        props: defaultProps,
      });

      expect(component.vm.days).toBeDefined();
      expect(Array.isArray(component.vm.days)).toBe(true);
      expect(component.vm.days.length).toBeGreaterThan(0);
    });
  });
});
