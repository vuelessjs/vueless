import { h } from "vue";

import TDatepickerViewsViewCalendar from "./t-datepicker-views-view-calendar";
import TDatepickerNavigator from "./t-datepicker-navigator";
import TDatepickerViewsViewMonths from "./t-datepicker-views-view-months";
import TDatepickerViewsViewYears from "./t-datepicker-views-view-years";

var CalendarView;

(function (CalendarView) {
  CalendarView["Day"] = "day";
  CalendarView["Month"] = "month";
  CalendarView["Year"] = "year";
})(CalendarView || (CalendarView = {}));

const TDatepickerViewsView = {
  name: "TDatepickerViewsView",

  emits: ["input", "input-date", "input-active-date", "update-view", "reset-view", "reset-focus"],

  props: {
    value: {
      type: [Date, Array],
      default: null,
    },
    activeMonth: {
      type: Date,
      required: true,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    weekStart: {
      type: Number,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    formatNative: {
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
    userFormat: {
      type: String,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    monthsPerView: {
      type: Number,
      required: true,
    },
    monthIndex: {
      type: Number,
      required: true,
    },
    currentView: {
      type: String,
      required: true,
    },
    yearsPerView: {
      type: Number,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
    showDaysForOtherMonth: {
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
    locale: {
      type: Object,
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
    dataCy: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      localActiveMonth: new Date(this.activeMonth.valueOf()),
    };
  },

  computed: {
    isFirstMonth() {
      return this.monthIndex === 0;
    },
    isLastMonth() {
      return this.monthIndex === this.monthsPerView - 1;
    },
    showMonthName() {
      return this.monthsPerView > 1;
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
    inputHandler(date) {
      this.resetView();

      this.$emit("input", date);
    },
    inputDateHandler(date) {
      this.$emit("input-date", date);
    },
    viewInputActiveDateHandler(date) {
      this.resetView();

      this.inputActiveDateHandler(date);
    },

    inputActiveDateHandler(date) {
      this.$emit("input-active-date", date);

      this.resetFocus();
    },

    resetFocus() {
      this.$emit("reset-focus");
    },

    resetView() {
      this.$emit("reset-view");
    },
  },

  render() {
    const subElements = [];

    subElements.push(
      h(TDatepickerNavigator, {
        ref: "navigator",
        value: this.localActiveMonth,
        getElementCssClass: this.getElementCssClass,
        showSelector: this.isFirstMonth,
        currentView: this.currentView,
        parse: this.parse,
        formatNative: this.formatNative,
        dateFormat: this.dateFormat,
        yearsPerView: this.yearsPerView,
        minDate: this.minDate,
        maxDate: this.maxDate,
        locale: this.locale,
        onInput: this.inputActiveDateHandler,
        dataCy: this.dataCy,
        "onUpdate-view": (newView) => {
          this.$emit("update-view", newView);
        },
      }),
    );

    if (this.currentView === CalendarView.Day) {
      subElements.push(
        h(
          TDatepickerViewsViewCalendar,
          {
            ref: "calendar",
            value: this.value,
            activeMonth: this.localActiveMonth,
            activeDate: this.localActiveDate,
            weekStart: this.weekStart,
            getElementCssClass: this.getElementCssClass,
            showDaysForOtherMonth: this.showDaysForOtherMonth,
            parse: this.parse,
            format: this.format,
            formatNative: this.formatNative,
            dateFormat: this.dateFormat,
            userFormat: this.userFormat,
            monthsPerView: this.monthsPerView,
            showActiveDate: this.showActiveDate,
            disabledDates: this.disabledDates,
            highlightDates: this.highlightDates,
            minDate: this.minDate,
            maxDate: this.maxDate,
            range: this.range,
            timepicker: this.timepicker,
            dateWithoutTime: this.dateWithoutTime,
            onInput: this.inputHandler,
            "onInput-date": this.inputDateHandler,
          },
          {
            ...this.$slots,
          },
        ),
      );
    } else if (this.currentView === CalendarView.Month) {
      subElements.push(
        h(
          TDatepickerViewsViewMonths,
          {
            ref: "months",
            value: this.value,
            activeDate: this.localActiveDate,
            getElementCssClass: this.getElementCssClass,
            showActiveDate: this.showActiveDate,
            formatNative: this.formatNative,
            onInput: this.viewInputActiveDateHandler,
          },
          {
            ...this.$slots,
          },
        ),
      );
    } else if (this.currentView === CalendarView.Year) {
      subElements.push(
        h(
          TDatepickerViewsViewYears,
          {
            ref: "years",
            value: this.value,
            activeDate: this.localActiveDate,
            getElementCssClass: this.getElementCssClass,
            yearsPerView: this.yearsPerView,
            showActiveDate: this.showActiveDate,
            formatNative: this.formatNative,
            onInput: this.viewInputActiveDateHandler,
          },
          {
            ...this.$slots,
          },
        ),
      );
    }

    return h(
      "div",
      {
        class: this.getElementCssClass("view"),
      },
      subElements,
    );
  },
};

export default TDatepickerViewsView;
