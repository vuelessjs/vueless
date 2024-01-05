import { h } from "vue";
import isEqual from "lodash.isequal";
import cloneDeep from "lodash.clonedeep";

import TDropdown from "../t-dropdown";
import {
  buildDateParser,
  buildDateFormatter,
  compareDates,
  addDays,
  addMonths,
  addYears,
  dayIsPartOfTheConditions,
  dateIsOutOfRange,
  isSameDay,
  extractLocaleFromProps,
} from "../services/date.service";
import HtmlInput from "../base/HtmlInput";
import { English } from "../l10n/default";
import TDatepickerTrigger from "./components/t-date-trigger";
import TDatepickerViews from "./components/t-datepicker-views";
import TDatepickerTimeSelector from "./components/t-datepicker-time-selector";
import VueTailwindService from "../services/vueTailwind.service";

const { isNumeric } = VueTailwindService;

var CalendarView;

(function (CalendarView) {
  CalendarView["Day"] = "day";
  CalendarView["Month"] = "month";
  CalendarView["Year"] = "year";
})(CalendarView || (CalendarView = {}));

var Key;

(function (Key) {
  Key[(Key["LEFT"] = 37)] = "LEFT";
  Key[(Key["UP"] = 38)] = "UP";
  Key[(Key["RIGHT"] = 39)] = "RIGHT";
  Key[(Key["DOWN"] = 40)] = "DOWN";
  Key[(Key["ENTER"] = 13)] = "ENTER";
  Key[(Key["ESC"] = 27)] = "ESC";
  Key[(Key["SPACE"] = 32)] = "SPACE";
  Key[(Key["BACKSPACE"] = 8)] = "BACKSPACE";
})(Key || (Key = {}));

const getInitialActiveDate = (localValue, initialDate, dateFormat, parse, amPm, initialTime) => {
  if (Array.isArray(localValue) && localValue.length) {
    return localValue[localValue.length - 1];
  }

  if (localValue instanceof Date) {
    return localValue;
  }

  const activeDate = parse(initialDate, dateFormat) || new Date();

  if (initialTime) {
    const parsedDateWithTime = parse(initialTime, amPm ? "G:i:S K" : "H:i:S");

    if (parsedDateWithTime) {
      activeDate.setHours(parsedDateWithTime.getHours());
      activeDate.setMinutes(parsedDateWithTime.getMinutes());
      activeDate.setSeconds(parsedDateWithTime.getSeconds());
    }
  }

  return activeDate;
};

const TDatepicker = {
  name: "TDatepicker",
  mixins: [HtmlInput],
  emits: [
    "shown",
    "hidden",
    "keydown",
    "blur",
    "focus",
    "user-date-changed",
    "change",
    "input",
    "active-change",
    "update:show",
    "update:modelValue",
  ],
  props: {
    modelValue: {
      type: [Date, String, Number, Array],
      default: null,
    },
    value: {
      type: [Date, String, Number, Array],
      default: null,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    inputName: {
      type: String,
      default: undefined,
    },
    weekStart: {
      type: Number,
      default: 0,
    },
    monthsPerView: {
      type: Number,
      default: 1,
      validator(value) {
        return value >= 1;
      },
    },
    lang: {
      type: String,
      default: "en",
    },
    locale: {
      type: Object,
      default: () => English,
    },
    locales: {
      type: Object,
      default: () => ({}),
    },
    dateFormat: {
      type: String,
      default: "Y-m-d",
    },
    userFormat: {
      type: String,
      default: "F j, Y",
    },
    dateFormatter: {
      type: Function,
      default: undefined,
    },
    dateParser: {
      type: Function,
      default: undefined,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    initialView: {
      type: String,
      default: CalendarView.Day,
      validator(value) {
        return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
      },
    },
    yearsPerView: {
      type: Number,
      default: 12,
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
    initialDate: {
      type: [Date, String],
      default: undefined,
    },
    initialTime: {
      type: String,
      default: undefined,
    },
    conjunction: {
      type: String,
      default: ",",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    datepicker: {
      type: Boolean,
      default: true,
    },
    timepicker: {
      type: Boolean,
      default: false,
    },
    amPm: {
      type: Boolean,
      default: false,
    },
    showSeconds: {
      type: Boolean,
      default: false,
    },
    dataCy: {
      type: String,
      default: "",
    },
    classes: {
      type: Object,
      default: () => ({
        wrapper: "flex flex-col",
        dropdownWrapper: "relative z-10",

        // Dropdown related classes
        dropdown: "origin-top-left absolute rounded shadow bg-white overflow-hidden mt-1",
        enterFromClass: "opacity-0 scale-95",
        enterActiveClass: "transition transform ease-out duration-100",
        enterToClass: "opacity-100 scale-100",
        leaveFrom: "opacity-100 scale-100",
        leaveActiveClass: "transition transform ease-in duration-75",
        leaveToClass: "opacity-0 scale-95",

        // Wrapper for inline calendar
        inlineWrapper: "",
        inlineViews: "rounded bg-white border mt-1 inline-flex flex-col",

        // Text input related classes
        inputWrapper: "",
        input: `block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out
          bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 
          focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50
          disabled:cursor-not-allowed`,
        clearButton: "hover:bg-gray-100 rounded transition duration-100 ease-in-out text-gray-600",
        clearButtonIcon: "",

        // Picker views
        viewGroup: "",
        view: "",

        // Navigator
        navigator: "pt-2 px-3",
        navigatorViewButton: `transition ease-in-out duration-100 inline-flex cursor-pointer
         rounded-full px-2 py-1 -ml-1 hover:bg-gray-100`,
        navigatorViewButtonIcon: "fill-current text-gray-400",
        navigatorViewButtonBackIcon: "fill-current text-gray-400",
        navigatorViewButtonMonth: "text-gray-700 font-semibold",
        navigatorViewButtonYear: "text-gray-500 ml-1",
        navigatorViewButtonYearRange: "text-gray-500 ml-1",
        navigatorLabel: "py-1",
        navigatorLabelMonth: "text-gray-700 font-semibold",
        navigatorLabelYear: "text-gray-500 ml-1",
        navigatorPrevButton: `transition ease-in-out duration-100 inline-flex cursor-pointer 
          hover:bg-gray-100 rounded-full p-1 ml-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed`,
        navigatorNextButton: `transition ease-in-out duration-100 inline-flex cursor-pointer 
          hover:bg-gray-100 rounded-full p-1 -mr-1 disabled:opacity-50 disabled:cursor-not-allowed`,
        navigatorPrevButtonIcon: "text-gray-400",
        navigatorNextButtonIcon: "text-gray-400",

        // Calendar View
        calendarWrapper: "px-3 py-2",
        calendarHeaderWrapper: "",
        calendarHeaderWeekDay:
          "uppercase text-xs text-gray-500 w-8 h-8 flex items-center justify-center",
        calendarDaysWrapper: "",
        calendarDaysDayWrapper: "w-full h-8 flex flex-shrink-0 items-center",

        // Day item
        otherMonthDay: `text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 text-gray-400 
          disabled:opacity-50 disabled:cursor-not-allowed`,
        emptyDay: "",
        inRangeFirstDay: "text-sm bg-blue-500 text-white w-full h-8 rounded-l-full",
        inRangeLastDay: "text-sm bg-blue-500 text-white w-full h-8 rounded-r-full",
        inRangeDay:
          "text-sm bg-blue-200 w-full h-8 disabled:opacity-50 disabled:cursor-not-allowed",
        selectedDay:
          "text-sm rounded-full w-8 h-8 mx-auto bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed",
        activeDay:
          "text-sm rounded-full bg-blue-100 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        highlightedDay:
          "text-sm rounded-full bg-blue-200 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        day: "text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed",
        today: `text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed 
          border border-blue-500`,

        // Months View
        monthWrapper: "px-3 py-2",
        selectedMonth: "text-sm rounded w-full h-12 mx-auto bg-blue-500 text-white",
        activeMonth: "text-sm rounded w-full h-12 mx-auto bg-blue-100",
        month: "text-sm rounded w-full h-12 mx-auto hover:bg-blue-100",

        // Years View
        yearWrapper: "px-3 py-2",
        year: "text-sm rounded w-full h-12 mx-auto hover:bg-blue-100",
        selectedYear: "text-sm rounded w-full h-12 mx-auto bg-blue-500 text-white",
        activeYear: "text-sm rounded w-full h-12 mx-auto bg-blue-100",

        // Time selector
        timepickerWrapper: "flex items-center px-4 py-2 space-x-2",
        timepickerTimeWrapper: "flex items-center space-x-2",
        timepickerTimeFieldsWrapper: `bg-gray-100 rounded-md w-full text-right flex items-center 
          border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none
           focus:ring-opacity-50`,
        timepickerOkButton: `text-blue-600 text-sm uppercase font-semibold transition duration-100 ease-in-out 
          border border-transparentfocus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none
          focus:ring-opacity-50 rounded cursor-pointer`,
        timepickerInput: `text-center w-8 border-transparent bg-transparent p-0 h-6 text-sm transition duration-100
           ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
          focus:outline-none focus:ring-opacity-50 rounded`,
        timepickerTimeLabel: "flex-grow text-sm text-gray-500",
        timepickerAmPmWrapper: `relative inline-flex flex-shrink-0 transition duration-200 ease-in-out bg-gray-100
           border border-transparent rounded cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
           focus:outline-none focus:ring-opacity-50`,
        timepickerAmPmWrapperChecked: `relative inline-flex flex-shrink-0 transition duration-200 ease-in-out 
          bg-gray-100 border border-transparent rounded cursor-pointer focus:border-blue-500 focus:ring-2 
          focus:ring-blue-500 focus:outline-none focus:ring-opacity-50`,
        timepickerAmPmWrapperDisabled:
          "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out opacity-50 cursor-not-allowed",
        timepickerAmPmWrapperCheckedDisabled:
          "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out opacity-50 cursor-not-allowed",
        timepickerAmPmButton: `absolute flex items-center justify-center w-6 h-6 text-xs text-gray-800
          transition duration-200 ease-in-out transform translate-x-0 bg-white rounded shadow`,
        timepickerAmPmButtonChecked: `absolute flex items-center justify-center w-6 h-6 text-xs text-gray-800 
          transition duration-200 ease-in-out transform translate-x-full bg-white rounded shadow`,
        timepickerAmPmCheckedPlaceholder:
          "flex items-center justify-center w-6 h-6 text-xs text-gray-500 rounded-sm",
        timepickerAmPmUncheckedPlaceholder:
          "flex items-center justify-center w-6 h-6 text-xs text-gray-500 rounded-sm",
      }),
    },
    fixedClasses: {
      type: Object,
      default: () => ({
        navigator: "flex",
        navigatorViewButton: "flex items-center",
        navigatorViewButtonIcon: "flex-shrink-0 h-5 w-5",
        navigatorViewButtonBackIcon: "flex-shrink-0 h-5 w-5",
        navigatorLabel: "flex items-center py-1",
        navigatorPrevButtonIcon: "h-6 w-6 inline-flex",
        navigatorNextButtonIcon: "h-6 w-6 inline-flex",

        inputWrapper: "relative",
        viewGroup: "inline-flex flex-wrap",
        view: "w-64",
        calendarDaysWrapper: "grid grid-cols-7",
        calendarHeaderWrapper: "grid grid-cols-7",
        monthWrapper: "grid grid-cols-4",
        yearWrapper: "grid grid-cols-4",

        clearButton:
          "flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6",
        clearButtonIcon: "fill-current h-3 w-3",
      }),
    },
  },

  data() {
    const currentLocale = extractLocaleFromProps(this.lang, this.locales, this.locale);
    const dateFormatter = this.dateFormatter;
    const parse = buildDateParser(currentLocale, this.dateParser);
    const format = buildDateFormatter(currentLocale, dateFormatter);
    // Keep a native formatter for the different views
    const formatNative = !dateFormatter ? format : buildDateFormatter(currentLocale);

    let localValue = this.multiple || this.range ? [] : null;

    if (this.modelValue) {
      if (Array.isArray(this.modelValue)) {
        localValue = this.modelValue
          .map((value) => parse(value, this.dateFormat) || null)
          .filter((value) => !!value);
      } else {
        localValue = parse(this.modelValue, this.dateFormat) || localValue;
      }
    } else {
      if (Array.isArray(this.value)) {
        localValue = this.value
          .map((value) => parse(value, this.dateFormat) || null)
          .filter((value) => !!value);
      } else {
        localValue = parse(this.value, this.dateFormat) || localValue;
      }
    }

    const formatedDate = Array.isArray(localValue)
      ? localValue.map((d) => format(d, this.dateFormat))
      : format(localValue, this.dateFormat);

    const userFormatedDate = Array.isArray(localValue)
      ? localValue.map((d) => format(d, this.userFormat))
      : format(localValue, this.userFormat);

    const activeDate = getInitialActiveDate(
      localValue,
      this.initialDate,
      this.dateFormat,
      parse,
      this.amPm,
      this.initialTime,
    );

    // Used to show the selected month/year
    const currentView = this.initialView;

    let dateWithoutTime = null;

    if (this.timepicker) {
      dateWithoutTime = Array.isArray(localValue) ? localValue[0] : localValue;
    }

    return {
      localValue,
      formatedDate,
      userFormatedDate,
      activeDate,
      shown: this.show,
      showActiveDate: false,
      currentView,
      parse,
      format,
      formatNative,
      currentLocale,
      hasFocus: false,
      dateWithoutTime,
      timeWithoutDate: null,
    };
  },

  computed: {
    visibleRange() {
      const start = new Date(this.activeDate.valueOf());
      const end = new Date(this.activeDate.valueOf());

      start.setDate(1);
      end.setMonth(end.getMonth() + this.monthsPerView, 0);

      return [start, end];
    },
    latestDate() {
      if (Array.isArray(this.localValue)) {
        if (this.localValue.length) {
          return this.localValue[this.localValue.length - 1] || null;
        }

        return null;
      }

      return this.localValue;
    },
    currentValueIsInTheView() {
      // eslint-disable-next-line no-restricted-globals
      if (this.latestDate) {
        const [start, end] = this.visibleRange;

        return compareDates(end, this.latestDate) >= 0 && compareDates(this.latestDate, start) >= 0;
      }

      return true;
    },
  },

  watch: {
    shown(shown) {
      this.$emit("update:show", shown);
    },
    activeDate(activeDate) {
      this.$emit("active-change", activeDate);
    },
    formatedDate(formatedDate) {
      this.$emit("update:modelValue", formatedDate);
      this.$emit("input", formatedDate);
      this.$emit("change", formatedDate);
    },
    userFormatedDate(userFormatedDate) {
      this.$emit("user-date-changed", userFormatedDate);
    },
    localValue(localValue) {
      if (this.monthsPerView === 1 || !this.currentValueIsInTheView) {
        this.resetActiveDate(localValue);
      }

      this.refreshFormattedDate();
    },
    value(value) {
      if (Array.isArray(value)) {
        const localValue = value
          .map((v) => this.parse(v, this.dateFormat) || null)
          .filter((v) => !!v);

        if (!isEqual(localValue, this.localValue)) {
          this.localValue = localValue;
        }
      } else {
        this.localValue =
          this.parse(value, this.dateFormat) || (this.multiple || this.range ? [] : null);
      }
    },
    modelValue(value) {
      if (Array.isArray(value)) {
        const localValue = value
          .map((v) => this.parse(v, this.dateFormat) || null)
          .filter((v) => !!v);

        if (!isEqual(localValue, this.localValue)) {
          this.localValue = localValue;
        }
      } else {
        this.localValue =
          this.parse(value, this.dateFormat) || (this.multiple || this.range ? [] : null);
      }
    },
    dateParser() {
      this.refreshParser();
    },
    dateFormatter() {
      this.refreshFormatter();
    },
    lang() {
      this.refreshCurrentLocale();
    },
    locale() {
      this.refreshCurrentLocale();
    },
    locales: {
      handler() {
        this.refreshCurrentLocale();
      },
      deep: true,
    },
  },

  methods: {
    refreshFormattedDate() {
      const formatedDate = Array.isArray(this.localValue)
        ? this.localValue.map((d) => this.format(d, this.dateFormat))
        : this.format(this.localValue, this.dateFormat);

      const userFormatedDate = Array.isArray(this.localValue)
        ? this.localValue.map((d) => this.format(d, this.userFormat))
        : this.format(this.localValue, this.userFormat);

      this.formatedDate = formatedDate;
      this.userFormatedDate = userFormatedDate;
    },
    refreshCurrentLocale() {
      this.currentLocale = extractLocaleFromProps(this.lang, this.locales, this.locale);
      this.refreshParser();
      this.refreshFormatter();
      this.refreshFormattedDate();
    },
    refreshParser() {
      const parse = buildDateParser(this.currentLocale, this.dateParser);

      this.parse = parse;
    },
    refreshFormatter() {
      const dateFormatter = this.dateFormatter;
      const format = buildDateFormatter(this.currentLocale, dateFormatter);
      // Keep a native formatter for the different views
      const formatNative = !dateFormatter ? format : buildDateFormatter(this.currentLocale);

      this.format = format;
      this.formatNative = formatNative;
    },
    focus(options) {
      const wrapper = this.$el;
      const input = wrapper.querySelector("input[type=text]");

      if (!input) {
        throw new Error("Input not found");
      }

      input.focus(options);
    },
    doHide() {
      const dropdown = this.getDropdown();

      if (dropdown) {
        dropdown.doHide();
      }
    },
    doShow() {
      const dropdown = this.getDropdown();

      if (dropdown) {
        dropdown.doShow();
      }
    },
    toggle() {
      const dropdown = this.getDropdown();

      if (dropdown) {
        dropdown.doToggle();
      }
    },
    arrowKeyHandler(e) {
      e.preventDefault();

      this.showActiveDate = true;

      if (!this.inline && !this.shown) {
        this.doShow();

        return;
      }

      let newActiveDate;

      if (this.currentView === CalendarView.Day) {
        if (e.keyCode === Key.DOWN) {
          newActiveDate = addDays(this.activeDate, 7);
        } else if (e.keyCode === Key.LEFT) {
          newActiveDate = addDays(this.activeDate, -1);
        } else if (e.keyCode === Key.UP) {
          newActiveDate = addDays(this.activeDate, -7);
        } else if (e.keyCode === Key.RIGHT) {
          newActiveDate = addDays(this.activeDate, 1);
        }
      } else if (this.currentView === CalendarView.Month) {
        if (e.keyCode === Key.DOWN) {
          newActiveDate = addMonths(this.activeDate, 4);
        } else if (e.keyCode === Key.LEFT) {
          newActiveDate = addMonths(this.activeDate, -1);
        } else if (e.keyCode === Key.UP) {
          newActiveDate = addMonths(this.activeDate, -4);
        } else if (e.keyCode === Key.RIGHT) {
          newActiveDate = addMonths(this.activeDate, 1);
        }
      } else if (this.currentView === CalendarView.Year) {
        if (e.keyCode === Key.DOWN) {
          newActiveDate = addYears(this.activeDate, 4);
        } else if (e.keyCode === Key.LEFT) {
          newActiveDate = addYears(this.activeDate, -1);
        } else if (e.keyCode === Key.UP) {
          newActiveDate = addYears(this.activeDate, -4);
        } else if (e.keyCode === Key.RIGHT) {
          newActiveDate = addYears(this.activeDate, 1);
        }
      }

      if (
        newActiveDate &&
        !dateIsOutOfRange(newActiveDate, this.minDate, this.maxDate, this.parse, this.dateFormat)
      ) {
        this.activeDate = newActiveDate;
      }
    },
    focusTimePicker() {
      this.$refs.timePicker.focus();
    },
    inputDateHandler(date) {
      this.dateWithoutTime = date;

      this.dateTimeInputHandler();
    },
    inputTimeHandler(date) {
      this.timeWithoutDate = date;

      if (this.datepicker) {
        this.dateTimeInputHandler();
      } else {
        this.inputHandler(date);
      }
    },
    dateTimeInputHandler() {
      if (this.dateWithoutTime === null || this.timeWithoutDate === null) {
        if (this.timeWithoutDate === null) {
          this.focusTimePicker();
        } else if (this.dateWithoutTime === null) {
          this.focus();
        }

        return;
      }

      const { dateWithoutTime, timeWithoutDate } = this;

      const dateTime = new Date(
        dateWithoutTime.getFullYear(),
        dateWithoutTime.getMonth(),
        dateWithoutTime.getDate(),
        timeWithoutDate.getHours(),
        timeWithoutDate.getMinutes(),
        timeWithoutDate.getSeconds(),
      );

      this.inputHandler(dateTime);
    },
    inputHandler(newDate) {
      const date = new Date(newDate.valueOf());
      const disabledDates = this.disabledDates;

      if (
        dayIsPartOfTheConditions(date, disabledDates, this.parse, this.dateFormat) ||
        dateIsOutOfRange(date, this.minDate, this.maxDate, this.parse, this.dateFormat)
      ) {
        return;
      }

      if (this.range) {
        let range = [];

        // Reset the range when
        // 1. Is not an array
        // 2. The range already have both values
        // 3. The range has the first value and the second value is before
        if (
          !this.localValue ||
          !Array.isArray(this.localValue) ||
          (Array.isArray(this.localValue) &&
            (this.localValue.length === 0 || this.localValue.length === 2)) ||
          (Array.isArray(this.localValue) &&
            this.localValue.length === 1 &&
            this.localValue[0] &&
            this.localValue[0].getTime() > date.getTime())
        ) {
          range = [date];
        } else if (this.localValue.length === 1) {
          range = [this.localValue[0], date];
        }

        this.localValue = range;

        // Range is complete
        if (!this.inline && this.localValue.length === 2 && this.closeOnSelect) {
          this.doHide();
        }
      } else if (Array.isArray(this.localValue)) {
        const index = this.localValue.findIndex((d) => isSameDay(d, date));

        if (index >= 0) {
          this.localValue.splice(index, 1);
        } else {
          this.localValue.push(date);
        }
      } else {
        this.focus();
        this.localValue = date;
      }

      if (!this.inline && this.closeOnSelect && !Array.isArray(this.localValue)) {
        this.doHide();
      }
    },
    inputActiveDateHandler(newDate) {
      this.activeDate = new Date(newDate.valueOf());
    },
    setView(newView) {
      this.currentView = newView;
      this.focus();
    },
    resetView() {
      if (this.currentView === CalendarView.Month) {
        this.setView(CalendarView.Day);
      } else if (this.currentView === CalendarView.Year) {
        this.setView(CalendarView.Month);
      } else {
        this.setView(CalendarView.Day);
      }
    },
    enterHandler(e) {
      e.preventDefault();

      if (!this.inline && !this.shown) {
        this.doShow();
      } else if (this.showActiveDate) {
        if (this.currentView === CalendarView.Day) {
          if (this.timepicker) {
            this.inputDateHandler(new Date(this.activeDate.valueOf()));
          } else {
            this.inputHandler(new Date(this.activeDate.valueOf()));
          }
        } else {
          this.resetView();
        }
      }
    },
    escapeHandler(e) {
      e.preventDefault();

      const dropdown = this.getDropdown();

      if (dropdown) {
        dropdown.escapeHandler(e);
      }
    },
    spaceHandler(e) {
      e.preventDefault();

      this.toggle();
    },
    getDropdown() {
      return this.$refs.dropdown;
    },
    resetInitialState() {
      this.shown = false;
      this.currentView = this.initialView;
      this.showActiveDate = false;

      if (this.timepicker) {
        this.dateWithoutTime = Array.isArray(this.localValue)
          ? this.localValue[0]
          : this.localValue;
      } else {
        this.dateWithoutTime = null;
      }

      this.timeWithoutDate = null;

      this.resetActiveDate(this.localValue);
    },
    resetActiveDate(localValue) {
      this.activeDate = getInitialActiveDate(
        localValue,
        this.initialDate,
        this.dateFormat,
        this.parse,
        this.amPm,
        this.initialTime,
      );
    },
    clearHandler() {
      if (this.multiple || this.range) {
        this.localValue = [];
      } else {
        this.localValue = null;
      }

      this.resetActiveDate(this.localValue);
    },
    focusHandler(e) {
      this.hasFocus = true;
      this.$emit("focus", e);
    },
    blurHandler(e) {
      this.hasFocus = false;
      this.$emit("blur", e);
    },
    hideIfFocusOutside(e) {
      const dropdown = this.getDropdown();

      if (dropdown) {
        dropdown.hideIfFocusOutside(e);
      }
    },
  },

  render() {
    const views = [];

    if (this.datepicker) {
      views.push(
        h(
          TDatepickerViews,
          {
            ref: "views",
            value: this.localValue,
            activeDate: this.activeDate,
            weekStart: this.weekStart,
            monthsPerView: this.monthsPerView,
            lang: this.lang,
            locale: this.currentLocale,
            getElementCssClass: this.getElementCssClass,
            parse: this.parse,
            format: this.format,
            formatNative: this.formatNative,
            dateFormat: this.dateFormat,
            userFormat: this.userFormat,
            initialView: this.initialView,
            currentView: this.currentView,
            yearsPerView: this.yearsPerView,
            showActiveDate: this.showActiveDate,
            disabledDates: this.disabledDates,
            highlightDates: this.highlightDates,
            minDate: this.minDate,
            maxDate: this.maxDate,
            range: this.range,
            showDaysForOtherMonth: this.showDaysForOtherMonth,
            datepicker: this.datepicker,
            timepicker: this.timepicker,
            dateWithoutTime: this.dateWithoutTime,
            dataCy: this.dataCy,
            onInput: this.inputHandler,
            "onInput-date": this.inputDateHandler,
            "onInput-time": this.inputTimeHandler,
            "onInput-active-date": this.inputActiveDateHandler,
            "onUpdate-view": this.setView,
            "onReset-view": this.resetView,
            "onReset-focus": this.focus,
          },
          {
            ...this.$slots,
          },
        ),
      );
    }

    if (this.timepicker && this.currentView === CalendarView.Day) {
      views.push(
        h(TDatepickerTimeSelector, {
          ref: "timePicker",
          parse: this.parse,
          format: this.format,
          amPm: this.amPm,
          showSeconds: this.showSeconds,
          activeDate: this.activeDate,
          locale: this.currentLocale,
          getElementCssClass: this.getElementCssClass,
          onInput: this.inputActiveDateHandler,
          onSubmit: this.inputTimeHandler,
          onBlur: this.hideIfFocusOutside,
        }),
      );
    }

    const triggerSettings = {
      ref: "trigger",
      id: this.id,
      name: this.name,
      inputName: this.inputName,
      disabled: this.disabled,
      readonly: this.readonly,
      autofocus: this.autofocus,
      required: this.required,
      placeholder: this.placeholder,
      tabindex: this.tabindex,
      userFormatedDate: this.userFormatedDate,
      formatedDate: this.formatedDate,
      conjunction: this.conjunction,
      multiple: this.multiple,
      range: this.range,
      clearable: this.clearable,
      locale: this.currentLocale,
      value: this.localValue,
      activeDate: this.activeDate,
      hasFocus: this.hasFocus,
      getElementCssClass: this.getElementCssClass,
      onClear: this.clearHandler,
      onFocus: this.focusHandler,
      onBlur: this.blurHandler,
      onKeydown: (e) => {
        if ([Key.LEFT, Key.UP, Key.RIGHT, Key.DOWN].includes(e.keyCode) && this.datepicker) {
          this.arrowKeyHandler(e);
        } else if (e.keyCode === Key.ENTER) {
          this.enterHandler(e);
        } else if (e.keyCode === Key.ESC) {
          this.escapeHandler(e);
        } else if (e.keyCode === Key.SPACE) {
          this.spaceHandler(e);
        }

        if (isNumeric(e.key)) {
          this.focusTimePicker();
        }

        this.$emit("keydown", e);
      },
    };

    if (this.inline) {
      return h(
        "div",
        {
          class: this.getElementCssClass("inlineWrapper"),
        },
        [
          h(TDatepickerTrigger, triggerSettings),
          h(
            "div",
            {
              class: this.getElementCssClass("inlineViews"),
            },
            views,
          ),
        ],
      );
    }

    return h(
      TDropdown,
      {
        ref: "dropdown",
        fixedClasses: undefined,
        classes: {
          wrapper: this.getElementCssClass("wrapper"),
          dropdownWrapper: this.getElementCssClass("dropdownWrapper"),
          dropdown: this.getElementCssClass("dropdown"),
          enterFromClass: this.getElementCssClass("enterFromClass"),
          enterActiveClass: this.getElementCssClass("enterActiveClass"),
          enterToClass: this.getElementCssClass("enterToClass"),
          leaveFromClass: this.getElementCssClass("leaveFrom"),
          leaveActiveClass: this.getElementCssClass("leaveActiveClass"),
          leaveToClass: this.getElementCssClass("leaveToClass"),
        },
        "data-cy": this.dataCy,
        show: this.show,
        onHidden: () => {
          this.$emit("hidden");
          this.resetInitialState();
        },
        onShown: () => {
          this.$emit("shown");
          this.shown = true;

          if (this.timepicker && !this.datepicker) {
            this.$nextTick(() => {
              this.focusTimePicker();
            });
          }
        },
      },
      {
        default: () => views,
        trigger: () =>
          h(
            TDatepickerTrigger,
            {
              ...cloneDeep(triggerSettings),
              hideIfFocusOutside: this.hideIfFocusOutside,
              show: this.doShow,
            },
            { ...this.$slots },
          ),
      },
    );
  },
};

export default TDatepicker;
