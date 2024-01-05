import { h } from "vue";

import { addMonths } from "../../services/date.service";
import TDatepickerViewsView from "./t-datepicker-views-view";

const TDatepickerViews = {
  name: "TDatepickerViews",

  emits: [
    "input",
    "input-date",
    "input-time",
    "input-active-date",
    "update-view",
    "reset-view",
    "reset-focus",
  ],

  props: {
    value: {
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    weekStart: {
      type: Number,
      required: true,
    },
    monthsPerView: {
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
    initialView: {
      type: String,
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
    };
  },

  computed: {
    activeMonths() {
      return Array.from({ length: this.monthsPerView }, (_x, i) => i).map((i) =>
        addMonths(this.localActiveDate, i),
      );
    },
  },

  watch: {
    activeDate(activeDate) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },

  render() {
    const subElements = this.activeMonths.map((activeMonth, index) =>
      h(
        TDatepickerViewsView,
        {
          ref: "view",
          value: this.value,
          activeMonth,
          activeDate: this.localActiveDate,
          weekStart: this.weekStart,
          lang: this.lang,
          getElementCssClass: this.getElementCssClass,
          parse: this.parse,
          format: this.format,
          dateFormat: this.dateFormat,
          userFormat: this.userFormat,
          formatNative: this.formatNative,
          monthsPerView: this.monthsPerView,
          monthIndex: index,
          currentView: index === 0 ? this.currentView : this.initialView,
          yearsPerView: this.yearsPerView,
          showActiveDate: this.showActiveDate,
          disabledDates: this.disabledDates,
          highlightDates: this.highlightDates,
          minDate: this.minDate,
          maxDate: this.maxDate,
          range: this.range,
          showDaysForOtherMonth: this.showDaysForOtherMonth,
          locale: this.locale,
          timepicker: this.timepicker,
          dateWithoutTime: this.dateWithoutTime,
          dataCy: this.dataCy,
          onInput: (date) => {
            this.$emit("input", date);
          },
          "onInput-date": (date) => {
            this.$emit("input-date", date);
          },
          "onInput-time": (date) => {
            this.$emit("input-time", date);
          },
          "onInput-active-date": (date) => {
            this.$emit("input-active-date", date);
          },
          "onUpdate-view": (newView) => {
            this.$emit("update-view", newView);
          },
          "onReset-view": () => {
            this.$emit("reset-view");
          },
          "onReset-focus": () => {
            this.$emit("reset-focus");
          },
        },
        {
          ...this.$slots,
        },
      ),
    );

    return h(
      "div",
      {
        class: this.getElementCssClass("viewGroup"),
      },
      subElements,
    );
  },
};

export default TDatepickerViews;
