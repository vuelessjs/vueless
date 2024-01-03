import { h } from "vue";
import {
  addMonths,
  addYears,
  dateIsOutOfRange,
  addDays,
  lastDayOfMonth,
} from "../../services/date.service";

var CalendarView;

(function (CalendarView) {
  CalendarView["Day"] = "day";
  CalendarView["Month"] = "month";
  CalendarView["Year"] = "year";
})(CalendarView || (CalendarView = {}));

export const getYearsRange = (date, yearsPerView) => {
  const currentYear = date.getFullYear();
  const from = currentYear - Math.floor(currentYear % yearsPerView);
  const to = from + yearsPerView - 1;

  return [from, to];
};

const TDatepickerNavigator = {
  name: "TDatepickerNavigator",

  emits: ["input", "update-view"],

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    value: {
      type: Date,
      default: null,
    },
    showSelector: {
      type: Boolean,
      default: true,
    },
    currentView: {
      type: String,
      default: CalendarView.Day,
      validator(value) {
        return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
      },
    },
    parse: {
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
    yearsPerView: {
      type: Number,
      required: true,
    },
    maxDate: {
      type: [Date, String],
      default: undefined,
    },
    minDate: {
      type: [Date, String],
      default: undefined,
    },
    locale: {
      type: Object,
      required: true,
    },
    dataCy: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      localValue: new Date(this.value.valueOf()),
    };
  },

  computed: {
    isDayView() {
      return this.currentView === CalendarView.Day;
    },
    isYearView() {
      return this.currentView === CalendarView.Year;
    },
    isMonthView() {
      return this.currentView === CalendarView.Month;
    },
    nextDate() {
      return this.getNextDate();
    },
    prevDate() {
      return this.getPrevDate();
    },
    prevButtonIsDisabled() {
      return !this.prevDate;
    },
    nextButtonIsDisabled() {
      return !this.nextDate;
    },
    nextButtonAriaLabel() {
      if (this.isDayView) {
        return `Next ${this.locale.MonthAriaLabel}`;
      }

      return `Next ${this.locale.yearAriaLabel}`;
    },
    prevButtonAriaLabel() {
      if (this.isDayView) {
        return `Prev ${this.locale.MonthAriaLabel}`;
      }

      return `Prev ${this.locale.yearAriaLabel}`;
    },
  },

  watch: {
    value(value) {
      this.localValue = new Date(value.valueOf());
    },
  },

  methods: {
    getNextDate() {
      let nextDate;

      if (this.currentView === CalendarView.Day) {
        nextDate = this.getNextMonth();
      } else if (this.currentView === CalendarView.Month) {
        nextDate = this.getNextYear();
      } else if (this.currentView === CalendarView.Year) {
        nextDate = this.getNextYearGroup();
      }

      return nextDate;
    },
    getPrevDate() {
      let prevDate;

      if (this.currentView === CalendarView.Day) {
        prevDate = this.getPrevMonth();
      } else if (this.currentView === CalendarView.Month) {
        prevDate = this.getPrevYear();
      } else if (this.currentView === CalendarView.Year) {
        prevDate = this.getPrevYearGroup();
      }

      return prevDate;
    },
    inputHandler(newDate) {
      this.$emit("input", newDate);
    },
    clickHandler() {
      if (this.currentView === CalendarView.Day) {
        this.$emit("update-view", CalendarView.Month);
      } else if (this.currentView === CalendarView.Month) {
        this.$emit("update-view", CalendarView.Year);
      } else if (this.currentView === CalendarView.Year) {
        this.$emit("update-view", CalendarView.Day);
      }
    },
    next() {
      if (this.nextDate) {
        this.inputHandler(this.nextDate);
      }
    },
    prev() {
      if (this.prevDate) {
        this.inputHandler(this.prevDate);
      }
    },
    getPrevMonth() {
      const prevMonth = addMonths(this.localValue, -1);
      const dateParser = this.parse;

      if (!dateIsOutOfRange(prevMonth, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return prevMonth;
      }

      let day = prevMonth.getDate();
      let dateToTry = prevMonth;
      let validDate;

      day = prevMonth.getDate();
      const lastDay = lastDayOfMonth(prevMonth).getDate();

      do {
        dateToTry = addDays(dateToTry, 1);
        day += 1;

        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (day <= lastDay && !validDate);

      if (!validDate) {
        day = prevMonth.getDate();

        do {
          dateToTry = addDays(dateToTry, -1);
          day -= 1;

          if (
            !dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)
          ) {
            validDate = dateToTry;
          }
        } while (day >= 1 && !validDate);
      }

      return validDate;
    },
    getNextMonth() {
      const nextMonth = addMonths(this.localValue, 1);
      const dateParser = this.parse;

      if (!dateIsOutOfRange(nextMonth, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return nextMonth;
      }

      let day = nextMonth.getDate();
      let dateToTry = nextMonth;
      let validDate;

      do {
        dateToTry = addDays(dateToTry, -1);
        day -= 1;

        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (day >= 1 && !validDate);

      if (!validDate) {
        day = nextMonth.getDate();
        const lastDay = lastDayOfMonth(nextMonth).getDate();

        do {
          dateToTry = addDays(dateToTry, 1);
          day += 1;

          if (
            !dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)
          ) {
            validDate = dateToTry;
          }
        } while (day <= lastDay && !validDate);
      }

      return validDate;
    },
    getPrevYear() {
      const prevYear = addYears(this.localValue, -1);
      const dateParser = this.parse;

      if (!dateIsOutOfRange(prevYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return prevYear;
      }

      let validDate;
      let dateToTry = prevYear;
      const year = prevYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, 1);

        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);

      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, -1);

          if (
            !dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)
          ) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
    getNextYear() {
      const nextYear = addYears(this.localValue, 1);
      const dateParser = this.parse;

      if (!dateIsOutOfRange(nextYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return nextYear;
      }

      let validDate;
      let dateToTry = nextYear;
      const year = nextYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, -1);

        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);

      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, 1);

          if (
            !dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)
          ) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
    getPrevYearGroup() {
      const prevYear = addYears(this.localValue, -this.yearsPerView);
      const dateParser = this.parse;

      if (!dateIsOutOfRange(prevYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return prevYear;
      }

      let validDate;
      let dateToTry = prevYear;
      const year = prevYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, this.yearsPerView);

        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);

      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, -this.yearsPerView);

          if (
            !dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)
          ) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
    getNextYearGroup() {
      const nextYear = addYears(this.localValue, this.yearsPerView);
      const dateParser = this.parse;

      if (!dateIsOutOfRange(nextYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return nextYear;
      }

      let validDate;
      let dateToTry = nextYear;
      const year = nextYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, -this.yearsPerView);

        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);

      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, this.yearsPerView);

          if (
            !dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)
          ) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
  },

  render() {
    const subElements = [];

    if (this.showSelector) {
      const buttonElements = [];

      if (this.currentView === CalendarView.Day) {
        buttonElements.push(
          h(
            "span",
            {
              class: this.getElementCssClass("navigatorViewButtonMonthName"),
            },
            this.formatNative(this.localValue, "F"),
          ),
        );
      }

      if (this.currentView === CalendarView.Month || this.currentView === CalendarView.Day) {
        buttonElements.push(
          h(
            "span",
            {
              class: this.getElementCssClass("navigatorViewButtonYear"),
            },
            this.formatNative(this.localValue, "Y"),
          ),
        );
      }

      if (this.currentView !== CalendarView.Year) {
        buttonElements.push(
          h(
            "svg",
            {
              fill: "currentColor",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              class: this.getElementCssClass("navigatorViewButtonIcon"),
            },
            [
              h("polygon", {
                points: `12.9497475 10.7071068 13.6568542 10 8 4.34314575 6.58578644 5.75735931 10.8284271 
                  10 6.58578644 14.2426407 8 15.6568542 12.9497475 10.7071068`,
              }),
            ],
          ),
        );
      } else {
        buttonElements.push(
          h(
            "svg",
            {
              fill: "currentColor",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              class: this.getElementCssClass("navigatorViewButtonBackIcon"),
            },
            [
              h("polygon", {
                points: `7.05025253 9.29289322 6.34314575 10 12 15.6568542 13.4142136 
                  14.2426407 9.17157288 10 13.4142136 5.75735931 12 4.34314575`,
              }),
            ],
          ),
        );
        buttonElements.push(
          h(
            "span",
            {
              class: this.getElementCssClass("navigatorViewButtonYearRange"),
            },
            getYearsRange(this.localValue, this.yearsPerView).join(" - "),
          ),
        );
      }

      subElements.push(
        h(
          "button",
          {
            type: "button",
            class: this.getElementCssClass("navigatorViewButton"),
            tabindex: -1,
            onClick: this.clickHandler,
          },
          buttonElements,
        ),
      );
    } else {
      subElements.push(
        h(
          "span",
          {
            class: this.getElementCssClass("navigatorLabel"),
          },
          [
            h(
              "span",
              {
                class: this.getElementCssClass("navigatorLabelMonth"),
              },
              this.formatNative(this.localValue, "F"),
            ),
            h(
              "span",
              {
                class: this.getElementCssClass("navigatorLabelYear"),
              },
              this.formatNative(this.localValue, "Y"),
            ),
          ],
        ),
      );
    }

    if (this.showSelector) {
      subElements.push(
        h(
          "button",
          {
            ref: "prev",
            "aria-label": this.prevButtonAriaLabel,
            type: "button",
            "data-cy": `${this.dataCy}-datepicker-prev-navigation-button`,
            class: this.getElementCssClass("navigatorPrevButton"),
            tabindex: -1,
            disabled: this.prevButtonIsDisabled ? true : undefined,
            onClick: this.prev,
          },
          [
            h(
              "svg",
              {
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                class: this.getElementCssClass("navigatorPrevButtonIcon"),
              },
              [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": 2,
                  d: "M15 19l-7-7 7-7",
                }),
              ],
            ),
          ],
        ),
      );

      subElements.push(
        h(
          "button",
          {
            ref: "next",
            "aria-label": this.nextButtonAriaLabel,
            type: "button",
            "data-cy": `${this.dataCy}-datepicker-next-navigation-button`,
            class: this.getElementCssClass("navigatorNextButton"),
            tabindex: -1,
            disabled: this.nextButtonIsDisabled ? true : undefined,
            onClick: this.next,
          },
          [
            h(
              "svg",
              {
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                class: this.getElementCssClass("navigatorNextButtonIcon"),
              },
              [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": 2,
                  d: "M9 5l7 7-7 7",
                }),
              ],
            ),
          ],
        ),
      );
    }

    return h(
      "div",
      {
        class: this.getElementCssClass("navigator"),
      },
      subElements,
    );
  },
};

export default TDatepickerNavigator;
