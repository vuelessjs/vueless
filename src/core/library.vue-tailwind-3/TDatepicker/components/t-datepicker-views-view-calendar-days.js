import { h } from "vue";
import { lastDayOfMonth } from "../../services/date.service";
import TDatepickerViewsViewCalendarDaysDay from "./t-datepicker-views-view-calendar-days-day";

const TDatepickerViewsViewCalendarDays = {
  name: "TDatepickerViewsViewCalendarDays",

  emits: ["input-date", "input"],

  props: {
    value: {
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    activeMonth: {
      type: Date,
      required: true,
    },
    weekStart: {
      type: Number,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    parse: {
      type: Function,
      required: true,
    },
    format: {
      type: Function,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
    userFormat: {
      type: String,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
    disabledDates: {
      type: [Date, Array, Function, String],
      default: undefined,
    },
    highlightDates: {
      type: [Date, Array, Function, String],
      default: undefined,
    },
    maxDate: {
      type: [Date, String],
      default: undefined,
    },
    minDate: {
      type: [Date, String],
      default: undefined,
    },
    range: {
      type: Boolean,
      required: true,
    },
    timepicker: {
      type: Boolean,
      required: true,
    },
    dateWithoutTime: {
      type: Date,
      default: null,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      localActiveMonth: new Date(this.activeMonth.valueOf()),
    };
  },

  computed: {
    firstDayOfMonth() {
      const localActiveDate = new Date(this.localActiveMonth.valueOf());

      localActiveDate.setDate(1);

      return localActiveDate;
    },
    lastDayOfMonth() {
      return lastDayOfMonth(this.localActiveMonth);
    },
    firstDayOfPrevMonth() {
      return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth() - 1, 1);
    },
    lastDayOfPrevMonth() {
      const localActiveDate = new Date(this.localActiveMonth.valueOf());

      localActiveDate.setDate(0);

      return localActiveDate;
    },
    firstDayOfNextMonth() {
      const localActiveDate = new Date(this.localActiveMonth.valueOf());

      localActiveDate.setDate(1);
      localActiveDate.setMonth(this.localActiveMonth.getMonth() + 1);

      return localActiveDate;
    },
    monthDays() {
      return Array.from({ length: this.lastDayOfMonth.getDate() }, (_x, i) => i + 1).map((day) =>
        this.getDay(this.localActiveMonth, day),
      );
    },
    prevMonthDays() {
      let prevMonthTotalDays = this.firstDayOfMonth.getDay() - this.weekStart;

      if (prevMonthTotalDays < 0) {
        prevMonthTotalDays = 7 + prevMonthTotalDays;
      }

      return Array.from(
        { length: prevMonthTotalDays },
        (_x, i) => this.lastDayOfPrevMonth.getDate() - i,
      )
        .reverse()
        .map((day) => this.getDay(this.firstDayOfPrevMonth, day));
    },
    nextMonthDays() {
      const nextMonthTotalDays = 7 - (this.monthDays.concat(this.prevMonthDays).length % 7);

      if (nextMonthTotalDays === 7) {
        return [];
      }

      return Array.from({ length: nextMonthTotalDays }, (_x, i) => i + 1).map((day) =>
        this.getDay(this.firstDayOfNextMonth, day),
      );
    },
    days() {
      const { prevMonthDays } = this;
      const { monthDays } = this;
      const { nextMonthDays } = this;

      return prevMonthDays.concat(monthDays, nextMonthDays);
    },
  },

  watch: {
    activeDate(activeDate) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
    activeMonth(activeMonth) {
      this.localActiveMonth = new Date(activeMonth.valueOf());
    },
  },

  methods: {
    getDay(date, dayNumber) {
      const day = new Date(date.valueOf());

      day.setDate(dayNumber);

      return day;
    },
  },

  render() {
    return h(
      "div",
      {
        class: this.getElementCssClass("calendarDaysWrapper"),
      },
      this.days.map((day) =>
        h(
          "span",
          {
            class: this.getElementCssClass("calendarDaysDayWrapper"),
          },
          [
            h(
              TDatepickerViewsViewCalendarDaysDay,
              {
                day,
                value: this.value,
                activeDate: this.localActiveDate,
                activeMonth: this.localActiveMonth,
                getElementCssClass: this.getElementCssClass,
                parse: this.parse,
                format: this.format,
                formatNative: this.formatNative,
                dateFormat: this.dateFormat,
                userFormat: this.userFormat,
                showDaysForOtherMonth: this.showDaysForOtherMonth,
                showActiveDate: this.showActiveDate,
                disabledDates: this.disabledDates,
                highlightDates: this.highlightDates,
                minDate: this.minDate,
                maxDate: this.maxDate,
                range: this.range,
                dateWithoutTime: this.dateWithoutTime,
                onClick: () => {
                  if (this.timepicker) {
                    this.$emit("input-date", day);
                  } else {
                    this.$emit("input", day);
                  }
                },
              },
              {
                ...this.$slots,
              },
            ),
          ],
        ),
      ),
    );
  },
};

export default TDatepickerViewsViewCalendarDays;
