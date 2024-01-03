import { h } from "vue";
import {
  dayIsPartOfTheConditions,
  dateIsOutOfRange,
  isSameDay,
  addDays,
} from "../../services/date.service";

const TDatepickerViewsViewCalendarDaysDay = {
  name: "TDatepickerViewsViewCalendarDaysDay",

  emits: ["click"],

  props: {
    day: {
      type: Date,
      required: true,
    },
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
    isSelected() {
      const d1 = this.getDay();
      const d2 = this.getSelectedDay();

      if (d2 instanceof Date) {
        return isSameDay(d1, d2);
      }

      if (Array.isArray(d2)) {
        return d2.some((d) => isSameDay(d, d1));
      }

      return false;
    },
    isActive() {
      const d1 = this.getDay();
      const d2 = this.localActiveDate;

      return isSameDay(d1, d2);
    },
    isToday() {
      const d1 = this.getDay();
      const d2 = new Date();

      return isSameDay(d1, d2);
    },
    isDisabled() {
      const day = this.getDay();
      const disabledDates = this.disabledDates;
      const dateParser = this.parse;

      return (
        dateIsOutOfRange(day, this.minDate, this.maxDate, dateParser, this.dateFormat) ||
        dayIsPartOfTheConditions(day, disabledDates, dateParser, this.dateFormat)
      );
    },
    isHighlighted() {
      const day = this.getDay();
      const highlightDates = this.highlightDates;
      const dateParser = this.parse;

      return dayIsPartOfTheConditions(day, highlightDates, dateParser, this.dateFormat);
    },
    isForAnotherMonth() {
      const d1 = this.localActiveMonth;
      const d2 = this.getDay();

      return d1.getFullYear() !== d2.getFullYear() || d1.getMonth() !== d2.getMonth();
    },
    isInRange() {
      if (!this.range || !Array.isArray(this.value)) {
        return false;
      }

      const [from, to] = this.value;

      if (from && to) {
        return !dateIsOutOfRange(this.getDay(), addDays(from, 1), addDays(to, -1));
      }

      return false;
    },
    isFirstDayOfRange() {
      if (!this.range || !Array.isArray(this.value)) {
        return false;
      }

      const [from] = this.value;

      return from && isSameDay(from, this.getDay());
    },
    isLastDayOfRange() {
      if (!this.range || !Array.isArray(this.value)) {
        return false;
      }

      const [, to] = this.value;

      return to && isSameDay(to, this.getDay());
    },
    dayFormatted() {
      return this.formatNative(this.getDay(), "j");
    },
    ariaLabel() {
      return this.format(this.getDay(), this.userFormat);
    },
    dateFormatted() {
      return this.format(this.getDay(), "Y-m-d");
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
    getClass() {
      if (this.isForAnotherMonth) {
        return this.getElementCssClass("otherMonthDay");
      }

      if (this.isFirstDayOfRange) {
        return this.getElementCssClass("inRangeFirstDay");
      }

      if (this.isLastDayOfRange) {
        return this.getElementCssClass("inRangeLastDay");
      }

      if (this.isInRange) {
        return this.getElementCssClass("inRangeDay");
      }

      if (this.isSelected) {
        return this.getElementCssClass("selectedDay");
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass("activeDay");
      }

      if (this.isHighlighted) {
        return this.getElementCssClass("highlightedDay");
      }

      if (this.isToday) {
        return this.getElementCssClass("today");
      }

      return this.getElementCssClass("day");
    },
    getDay() {
      return this.day;
    },
    getSelectedDay() {
      if (this.dateWithoutTime !== null) {
        return this.dateWithoutTime;
      }

      return this.value;
    },
  },
  render() {
    if (this.isForAnotherMonth && !this.showDaysForOtherMonth) {
      return h(
        "span",
        {
          class: this.getElementCssClass("emptyDay"),
        },
        "",
      );
    }

    const daySlot = this.$slots.day
      ? this.$slots.day({
          dayFormatted: this.dayFormatted,
          isForAnotherMonth: this.isForAnotherMonth,
          isFirstDayOfRange: this.isFirstDayOfRange,
          isLastDayOfRange: this.isLastDayOfRange,
          isInRange: this.isInRange,
          isSelected: this.isSelected,
          isActive: this.isActive,
          isHighlighted: this.isHighlighted,
          isToday: this.isToday,
          day: this.getDay(),
          activeDate: this.activeDate,
          value: this.value,
        })
      : this.dayFormatted;

    return h(
      "button",
      {
        class: this.getClass(),
        "aria-label": this.ariaLabel,
        "aria-current": this.isToday ? "date" : undefined,
        "data-date": this.dateFormatted,
        type: "button",
        tabindex: -1,
        disabled: this.isDisabled ? true : undefined,
        onClick: (e) => this.$emit("click", e),
      },
      daySlot,
    );
  },
};

export default TDatepickerViewsViewCalendarDaysDay;
