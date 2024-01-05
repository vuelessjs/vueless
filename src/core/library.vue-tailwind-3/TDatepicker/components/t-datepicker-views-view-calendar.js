import { h } from "vue";

import TDatepickerViewsViewCalendarDays from "./t-datepicker-views-view-calendar-days";
import TDatepickerViewsViewCalendarHeaders from "./t-datepicker-views-view-calendar-headers";

const TDatepickerViewsViewCalendar = {
  name: "TDatepickerViewsViewCalendar",

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
    dateFormat: {
      type: String,
      required: true,
    },
    userFormat: {
      type: String,
      required: true,
    },
    monthsPerView: {
      type: Number,
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
    showDaysForOtherMonth: {
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

  watch: {
    activeDate(activeDate) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
    activeMonth(activeMonth) {
      this.localActiveMonth = new Date(activeMonth.valueOf());
    },
  },

  render() {
    return h(
      "div",
      {
        class: this.getElementCssClass("calendarWrapper"),
      },
      [
        h(TDatepickerViewsViewCalendarHeaders, {
          weekStart: this.weekStart,
          getElementCssClass: this.getElementCssClass,
          formatNative: this.formatNative,
        }),
        h(
          TDatepickerViewsViewCalendarDays,
          {
            ref: "days",
            value: this.value,
            activeDate: this.localActiveDate,
            activeMonth: this.localActiveMonth,
            weekStart: this.weekStart,
            getElementCssClass: this.getElementCssClass,
            parse: this.parse,
            format: this.format,
            formatNative: this.formatNative,
            userFormat: this.userFormat,
            dateFormat: this.dateFormat,
            showDaysForOtherMonth: this.monthsPerView > 1 ? false : this.showDaysForOtherMonth,
            showActiveDate: this.showActiveDate,
            disabledDates: this.disabledDates,
            highlightDates: this.highlightDates,
            minDate: this.minDate,
            maxDate: this.maxDate,
            range: this.range,
            timepicker: this.timepicker,
            dateWithoutTime: this.dateWithoutTime,
            onInput: (date) => {
              this.$emit("input", date);
            },
            "onInput-date": (date) => this.$emit("input-date", date),
          },
          {
            ...this.$slots,
          },
        ),
      ],
    );
  },
};

export default TDatepickerViewsViewCalendar;
