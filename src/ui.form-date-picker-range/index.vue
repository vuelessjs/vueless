<template>
  <div class="mono-datepicker-range">
    <VariantButton
      v-if="datePickerVariant.button"
      :id="id"
      :title="title"
      :data-cy="`${dataCy}-variant-button`"
      @clickShiftRange="onClickShiftRange"
      @clickRangeSet="onClickRangeSet"
      @blur="onBlur"
    />

    <VariantInput
      v-if="datePickerVariant.input"
      :id="id"
      :model-value="title"
      :placeholder="placeholder"
      :label="label"
      :data-cy="`${dataCy}-variant-input`"
      @clickRangeSet="onClickRangeSet"
      @blur="onBlur"
    >
      <template #right>
        <!-- @slot Use it to add something right. -->
        <slot name="right" />
      </template>
    </VariantInput>

    <div
      v-if="isOpenedMenu"
      class="mono-datepicker-range-menu"
      @mousedown.prevent="onMouseDownDateMenu"
    >
      <div class="mono-datepicker-range-menu-wrapper">
        <div
          v-for="(datePeriod, index) in datePeriods"
          :key="index"
          class="mono-datepicker-range-menu-button"
          :data-cy="`${dataCy}-button-${datePeriod.name}`"
          :class="setActiveButton(datePeriod.name)"
          @mousedown="onClickChangePeriodType(datePeriod.name)"
        >
          {{ datePeriod.title }}
        </div>
      </div>

      <div class="mono-datepicker-range-menu-wrapper">
        <div
          class="mono-datepicker-range-menu-button"
          :class="setActiveButton('lastThirtyDays')"
          :data-cy="`${dataCy}-button-last-thirty-days`"
          @mousedown="onClickSelectLastThirtyDays"
          v-html="i18n.lastThirtyDays"
        />

        <div
          class="mono-datepicker-range-menu-button"
          :class="setActiveButton('ownPeriod')"
          :data-cy="`${dataCy}-button-own-period`"
          @mousedown.prevent="onClickChangePeriodType('ownPeriod')"
        >
          <UIcon name="apps" size="xs" />

          {{ i18n.ownRange }}
        </div>
      </div>

      <div v-if="isShownDateMenu">
        <div v-if="isShownOwnRange">
          <div class="mono-datepicker-range-menu-datepicker-wrapper">
            <UInput
              v-model="ownRangeStart"
              :error="ownRangeStartError"
              class="mono-datepicker-range-menu-input"
              :class="getInputFocusClass('ownRangeStart')"
              :data-cy="`${dataCy}-input-own-range-start`"
              @change="onChangeOwnRangeInput"
              @mousedown="onMouseDownInput"
              @blur="onBlurInput"
              @click="onClickInput('ownRangeStart')"
              @keydown.enter="onChangeOwnRangeInput"
            />

            <UInput
              v-model="ownRangeEnd"
              :error="ownRangeEndError"
              class="mono-datepicker-range-menu-input"
              :class="getInputFocusClass('ownRangeEnd')"
              :data-cy="`${dataCy}-input-own-range-end`"
              @change="onChangeOwnRangeInput"
              @mousedown="onMouseDownInput"
              @blur="onBlurInput"
              @click="onClickInput('ownRangeEnd')"
              @keydown.enter="onChangeOwnRangeInput"
            />
          </div>

          <t-datepicker
            ref="datepicker"
            :value="ownRange"
            date-format="d.m.Y"
            :week-start="1"
            :clearable="false"
            :close-on-select="false"
            show
            range
            class="own-range"
            :classes="ownRangeClasses"
            :locale="activeDatepickerLanguage"
            :min-date="minDate"
            :max-date="maxDate"
            :data-cy="`${dataCy}-own-range`"
            @input="handleDate"
          >
            <template
              #day="{ dayFormatted, isInRange, isFirstDayOfRange, isLastDayOfRange, isToday }"
            >
              <span @mouseover="onMouseover" @mouseleave="onMouseleave">
                <span v-if="isToday" class="own-today"> {{ dayFormatted }}</span>

                <span v-else-if="isInRange" class="own-range-day">{{ dayFormatted }}</span>

                <div v-else-if="isFirstDayOfRange" class="first-own-range-day-block">
                  <span class="first-own-range-day">{{ dayFormatted }}</span>
                </div>

                <div v-else-if="isLastDayOfRange" class="last-own-range-day-block">
                  <span class="last-own-range-day">{{ dayFormatted }}</span>
                </div>

                <span v-else class="own-range-days">{{ dayFormatted }}</span>
              </span>
            </template>
          </t-datepicker>
        </div>

        <div v-else>
          <div class="mono-datepicker-range-menu-range">
            <UIcon
              class="icon"
              size="sm"
              name="arrow_back_ios_new"
              :data-cy="`${dataCy}-prev`"
              @mousedown.prevent="onClickShiftDatesList('prev')"
            />

            <div class="mono-datepicker-range-menu-range-value">
              <span v-if="shownMenuRangeMonth">{{ selectedDate.monthName }} </span>

              <span v-if="yearPeriodTitle">{{ yearPeriodTitle }}</span>

              <span v-else class="mono-datepicker-range-menu-range-value-year">{{
                selectedDate.year
              }}</span>
            </div>
            <UIcon
              class="icon"
              size="sm"
              name="arrow_forward_ios"
              :data-cy="`${dataCy}-next`"
              @mousedown.prevent="onClickShiftDatesList('next')"
            />
          </div>

          <div class="mono-datepicker-range-menu-list" :class="menuTypeClass">
            <div
              v-for="(date, index) in datesList"
              :key="index"
              class="mono-datepicker-range-menu-list-item"
              :class="setActiveSelectedDate(date)"
              :data-cy="`${dataCy}-list-item-${index}`"
              @mousedown="onClickSelectValue(index)"
            >
              {{ date.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fromUnixTime,
  startOfWeek,
  endOfWeek,
  getMonth,
  getYear,
  getUnixTime,
  addMonths,
  addYears,
  subDays,
  addDays,
  startOfDay,
  endOfDay,
  parse,
  differenceInDays,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  getDate,
  format,
} from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import English from "vueless/library.vue-tailwind-3/l10n/default";
import Russian from "vueless/library.vue-tailwind-3/l10n/ru";
import Ukrainian from "vueless/library.vue-tailwind-3/l10n/uk";
import I18nServiceDefault from "vueless/service.i18n";
import DateServiceDefault from "vueless/service.date";
import ValidationServiceDefault from "vueless/service.validation";
import {
  createYears,
  createQuarters,
  createMonthsList,
  createWeeksList,
  prepareOwnRangeDate,
  prepareRangeFormat,
} from "./services/dateRange.service";
import { getRandomId } from "vueless/service.ui";
import { mapGetters } from "vuex";

import UIcon from "vueless/ui.image-icon";
import UInput from "vueless/ui.form-input";
import TDatepicker from "vueless/library.vue-tailwind-3/TDatepicker";
import VariantButton from "./components/VariantButton.vue";
import VariantInput from "./components/VariantInput.vue";

import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";

const { dateFormat, wrongDayNumber, wrongMonthNumber } = new ValidationServiceDefault();

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const DATE_PICKER_BUTTON_TYPE = "button";
const DATE_PICKER_INPUT_TYPE = "input";
const GRID_MENU_CLASS = "grid-menu";
const BLOCK_MENU_CLASS = "block-menu";

const WEEK_PERIOD = "week";
const MONTH_PERIOD = "month";
const QUARTER_PERIOD = "quarter";
const YEAR_PERIOD = "year";
const LAST_THIRTY_DAYS_PERIOD = "lastThirtyDays";
const OWN_PERIOD = "ownPeriod";
const OWN_RANGE_START = "ownRangeStart";
const OWN_RANGE_END = "ownRangeEnd";

export default {
  name: "UDatePickerRange",

  components: {
    VariantInput,
    VariantButton,
    UInput,
    UIcon,
    TDatepicker,
  },

  props: {
    /**
     * The variant of the date picker.
     * @values button, input
     */
    variant: {
      type: String,
      default: "button",
    },

    /**
     * Set date picker value (timestamp).
     */
    modelValue: {
      type: Object,
      default: () => {},
    },

    /**
     * Set picker min date in format d.m.Y.
     */
    minDate: {
      type: String,
      default: "",
    },

    /**
     * Set picker max date in format d.m.Y.
     */
    maxDate: {
      type: String,
      default: "",
    },

    /**
     * Set label text.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set input placeholder.
     */
    placeholder: {
      type: String,
      default: "",
    },

    /**
     * Generates unique element id.
     * @ignore
     */
    id: {
      type: String,
      default: () => getRandomId(),
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  setup() {
    const { rt } = useI18n();
    const { getTranslation } = new I18nServiceDefault();
    const v$ = useVuelidate();

    return { rt, getTranslation, v$ };
  },

  data() {
    return {
      emitValue: false,
      menuTypeClass: BLOCK_MENU_CLASS,
      period: WEEK_PERIOD,
      currentTimestamp: 0,
      datesList: [],
      dateRange: {
        from: 0,
        to: 0,
      },
      ownRange: [],
      ownRangeStart: "",
      ownRangeEnd: "",
      selectedRange: "",
      selectedInputFocus: "",
      isOpenedMenu: false,
      isShownDateMenu: true,
      isShownOwnRange: false,
      isClickedInDateMenu: false,
      isFocusedInput: false,
      isCheckDateFormat: false,
    };
  },

  validations: () => ({
    ownRangeStart: { dateFormat, wrongMonthNumber, wrongDayNumber },
    ownRangeEnd: { dateFormat, wrongMonthNumber, wrongDayNumber },
  }),

  computed: {
    ...mapGetters("breakpoint", ["isMobileDevice"]),

    datePickerVariant() {
      return {
        button: this.variant === DATE_PICKER_BUTTON_TYPE,
        input: this.variant === DATE_PICKER_INPUT_TYPE,
      };
    },

    datePeriods() {
      return [
        {
          name: WEEK_PERIOD,
          title: this.i18n.week,
        },
        {
          name: MONTH_PERIOD,
          title: this.i18n.month,
        },
        {
          name: QUARTER_PERIOD,
          title: this.i18n.quarter,
        },
        {
          name: YEAR_PERIOD,
          title: this.i18n.year,
        },
      ];
    },

    ownRangeStartError() {
      const isDirty = this.v$.ownRangeStart.$dirty;
      const isInvalidDateFormat = this.v$.ownRangeStart.dateFormat.$invalid;
      const isInvalidMonthNumber = this.v$.ownRangeStart.wrongMonthNumber.$invalid;
      const isInvalidDayNumber = this.v$.ownRangeStart.wrongDayNumber.$invalid;

      let error = "";

      if (isDirty && this.isCheckDateFormat && isInvalidDateFormat && this.ownRangeStart) {
        error = this.i18n.dateFormatWithDot;
      } else if (isDirty && isInvalidMonthNumber && this.ownRangeStart) {
        error = this.i18n.notCorrectMonthNumber;
      } else if (isDirty && isInvalidDayNumber && this.ownRangeStart) {
        error = this.i18n.notCorrectDayNumber;
      }

      return error;
    },

    ownRangeEndError() {
      const isDirty = this.v$.ownRangeEnd.$dirty;
      const isInvalidDateFormat = this.v$.ownRangeEnd.dateFormat.$invalid;
      const isInvalidMonthNumber = this.v$.ownRangeEnd.wrongMonthNumber.$invalid;
      const isInvalidDayNumber = this.v$.ownRangeEnd.wrongDayNumber.$invalid;

      let error = "";

      if (isDirty && this.isCheckDateFormat && isInvalidDateFormat && this.ownRangeEnd) {
        error = this.i18n.dateFormatWithDot;
      } else if (isDirty && isInvalidMonthNumber && this.ownRangeEnd) {
        error = this.i18n.notCorrectMonthNumber;
      } else if (isDirty && isInvalidDayNumber && this.ownRangeEnd) {
        error = this.i18n.notCorrectDayNumber;
      }

      return error;
    },

    ownRangeClasses() {
      return {
        wrapper: "flex flex-col",
        dropdownWrapper: "relative z-40",
        dropdown: "overflow-hidden bg-white",
        enterClass: "opacity-0 scale-95",
        enterActiveClass: "transition transform ease-out duration-100",
        enterToClass: "opacity-100 scale-100",
        leaveClass: "opacity-100 scale-100",
        leaveActiveClass: "transition transform ease-in duration-75",
        leaveToClass: "opacity-0 scale-95",
        inlineWrapper: "",
        inlineViews: "rounded bg-white border mt-1 inline-flex",
        inputWrapper: "hidden",
        viewGroup: "inline-flex flex-wrap w-full",
        view: "!w-full",
        input: `input w-full`,
        navigator: "px-2.5 items-center justify-between",
        navigatorViewButton: `navigator-button order-1 w-full justify-center cursor-pointer text-sm
          font-medium text-gray-900`,
        navigatorViewButtonIcon: "hidden",
        navigatorViewButtonBackIcon: "hidden",
        navigatorViewButtonMonth: "text-gray-700 font-semibold",
        navigatorViewButtonYear: "ml-1",
        navigatorViewButtonYearRange: "ml-1",
        navigatorLabel: "py-1",
        navigatorLabelMonth: "text-gray-700 font-semibold",
        navigatorLabelYear: "text-gray-500 ml-1",
        navigatorPrevButton: `order-0 transition ease-in-out duration-100 inline-flex cursor-pointer
          rounded-full disabled:opacity-50 disabled:cursor-not-allowed`,
        navigatorNextButton: `order-2 transition ease-in-out duration-100 inline-flex
          cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed`,
        navigatorPrevButtonIcon: "text-gray-900 !w-4 !h-4 navigation-btn-icon",
        navigatorNextButtonIcon: "text-gray-900 !w-4 !h-4 navigation-btn-icon",
        calendarWrapper: "mt-2.5",
        calendarHeaderWrapper: "",
        calendarHeaderWeekDay:
          "uppercase text-sm text-gray-500 h-10 flex items-center justify-center",
        calendarDaysWrapper: "",
        calendarDaysDayWrapper:
          "w-full mb-0.5 h-10 flex flex-shrink-0 items-center calendar-day-button",
        otherMonthDay: `text-sm font-medium w-full h-10 mx-auto hover:bg-gray-100 text-gray-400
          disabled:opacity-50 disabled:cursor-not-allowed`,
        emptyDay: "",
        inRangeFirstDay: "text-sm font-medium text-gray-900 w-full h-10",
        inRangeLastDay:
          "text-sm font-medium bg-gray-900 bg-opacity-10 text-gray-900 w-full h-10 rounded-r-lg hover:bg-gray-100",
        inRangeDay: `text-sm font-medium text-gray-900 w-full h-10 hover:bg-gray-100
          disabled:opacity-50 disabled:cursor-not-allowed`,
        selectedDay: `text-sm rounded-lg w-full h-10 mx-auto bg-gray-900 text-white disabled:opacity-50
           disabled:cursor-not-allowed`,
        activeDay:
          "text-sm rounded-lg bg-gray-100 w-full h-10 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        highlightedDay:
          "text-sm rounded-lg bg-gray-200 w-full h-10 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        day: `text-sm font-medium text-gray-900 w-full h-10 mx-auto hover:bg-gray-100 disabled:opacity-50
          disabled:cursor-not-allowed`,
        today: `text-sm font-medium text-gray-900 rounded-lg w-full h-10 mx-auto hover:bg-gray-100 disabled:opacity-50
          disabled:cursor-not-allowed border-gray-900`,
        monthWrapper: "px-3 pt-2",
        selectedMonth:
          "text-sm font-medium rounded-lg w-full h-12 mx-auto bg-gray-900 bg-opacity-10 text-gray-900",
        activeMonth: "text-sm font-medium rounded-lg w-full h-12 mx-auto bg-gray-200",
        month: "text-sm font-medium rounded-lg w-full h-12 mx-auto hover:bg-gray-100",
        yearWrapper: "px-3 pt-2",
        year: "text-sm font-medium rounded-lg w-full h-12 mx-auto hover:bg-gray-100",
        selectedYear: "text-sm font-medium rounded-lg w-full h-12 mx-auto bg-gray-900 text-white",
        activeYear: "text-sm font-medium rounded-lg w-full h-12 mx-auto bg-gray-200",
      };
    },

    i18n() {
      return {
        lastThirtyDays: this.getTranslation("lastThirtyDays"),
        ownRange: this.getTranslation("ownRange"),
        week: this.getTranslation("week"),
        month: this.getTranslation("month"),
        quarter: this.getTranslation("quarter"),
        year: this.getTranslation("year"),
        dateFormatWithDot: this.getTranslation("dateFormatWithDot"),
        notCorrectMonthNumber: this.getTranslation("notCorrectMonthNumber"),
        notCorrectDayNumber: this.getTranslation("notCorrectDayNumber"),
        monthShort: this.getTranslation("monthShort", { isNested: true }),
        declinedMonth: this.getTranslation("declinedMonth", { isNested: true }),
        monthList: this.getTranslation("monthList", { isNested: true }),
      };
    },

    activeDatepickerLanguage() {
      const language = {
        en: English,
        ru: Russian,
        ua: Ukrainian,
      };

      const activeLanguage = new I18nServiceDefault().getActiveLanguage();

      return language[activeLanguage];
    },

    isValue() {
      return this.modelValue ? Object.values(this?.modelValue).length : this?.modelValue;
    },

    shownMenuRangeMonth() {
      return this.period === WEEK_PERIOD;
    },

    monthShortLocales() {
      return MONTHS.map((month) => this.rt(this.i18n.monthShort[month]));
    },

    declinedMonthFullLocales() {
      return MONTHS.map((month) => this.rt(this.i18n.declinedMonth[month]));
    },

    monthFullLocales() {
      return MONTHS.map((month) => this.rt(this.i18n.monthList[month]));
    },

    yearPeriodTitle() {
      let title = "";

      if (this.period === YEAR_PERIOD) {
        const startRange = this.datesList[0].startRange;
        const endRange = this.datesList[this.datesList.length - 1].endRange;

        const startYear = getYear(fromUnixTime(startRange));
        const endYear = getYear(fromUnixTime(endRange));

        title = `${startYear} – ${endYear}`;
      }

      return title;
    },

    selectedDate() {
      return this.getDateFromTimeStamp(this.currentTimestamp, this.monthFullLocales);
    },

    title() {
      let startRange = this.dateRange.from
        ? this.getDateFromTimeStamp(this.dateRange.from, this.declinedMonthFullLocales)
        : "";
      let endRange = this.dateRange.to
        ? this.getDateFromTimeStamp(this.dateRange.to, this.declinedMonthFullLocales)
        : "";

      let title = "";

      if (!startRange && !endRange) return title;

      const isDefaultTitle =
        this.period === WEEK_PERIOD ||
        this.period === LAST_THIRTY_DAYS_PERIOD ||
        this.period === OWN_PERIOD;

      if (isDefaultTitle) {
        let startMonthName = startRange.monthName;
        let startYear = startRange.year;

        if (startRange.month === endRange.month && startRange.year === endRange.year) {
          startMonthName = "";
        }

        if (startRange.year === endRange.year) {
          startYear = "";
        }

        title = startRange
          ? `${startRange.day} ${startMonthName} ${startYear} –
                 ${endRange.day || ""} ${endRange.monthName || ""} ${endRange.year || ""}
        `
          : "";
      }

      if (this.period === MONTH_PERIOD) {
        const startRange = this.getDateFromTimeStamp(this.dateRange.from, this.monthFullLocales);

        title = `${startRange.monthName} ${startRange.year}`;
      }

      if (this.period === QUARTER_PERIOD || this.period === YEAR_PERIOD) {
        title = `${startRange.day} ${startRange.monthName} – ${endRange.day} ${endRange.monthName} ${endRange.year}`;
      }

      if (this.isMobileDevice && this.period !== MONTH_PERIOD && this.datePickerVariant.button) {
        startRange = Object.fromEntries(Object.entries(startRange).map(this.padDate));
        endRange = Object.fromEntries(Object.entries(endRange).map(this.padDate));

        title = `${startRange.day}.${startRange.month} – ${endRange.day}.${endRange.month} / ${endRange.year}`;
      }

      return this.isValue ? title : "";
    },
  },

  watch: {
    isOpenedMenu: {
      handler: "onChangeOpenedMenu",
    },

    ownRange: "onChangeOwnRange",

    dateRange: {
      handler: "onChangeDateRange",
      immediate: true,
    },

    modelValue: {
      handler: "onChangeValue",
      immediate: true,
      deep: true,
    },

    emitValue: "onChangeEmitValue",

    period: {
      handler: "changePeriodType",
    },
  },

  created() {
    this.currentTimestamp = getUnixTime(new Date());

    if (!this.modelValue) {
      this.datesList = createWeeksList(this.selectedDate, this.monthShortLocales);
    } else {
      this.setDefaultPeriodForButton();
    }
  },

  updated() {
    const navigatorButton = document.querySelector(".navigator-button");

    if (this.period === OWN_PERIOD && navigatorButton) {
      navigatorButton.onclick = () => {
        document.querySelector(`#${this.id}`).focus();
      };
    }
  },

  methods: {
    onMouseover() {
      if (!this.selectedInputFocus) this.handleDate(this.$refs.datepicker.formatedDate);
    },

    onMouseleave() {
      if (!this.selectedRange) this.selectedInputFocus = "";
    },

    padDate(dateRangeEntry) {
      let [dateRangeEntryKey, dateRangeEntryValue] = dateRangeEntry;

      if (dateRangeEntryValue.length > 1 && Number(dateRangeEntryValue) > 0) return dateRangeEntry;

      dateRangeEntryValue =
        dateRangeEntryKey === "month" ? Number(dateRangeEntryValue) + 1 : dateRangeEntryValue;

      dateRangeEntryValue = String(dateRangeEntryValue).padStart(2, 0);

      return [dateRangeEntryKey, dateRangeEntryValue];
    },

    onBlur() {
      this.emitValue = true;

      if (this.period === OWN_PERIOD) {
        this.isOpenedMenu = false;
        this.isClickedInDateMenu = false;

        if (this.isOpenedMenu && !this.isFocusedInput) {
          document.querySelector(`#${this.id}`).focus();
        }
      } else if (this.period === LAST_THIRTY_DAYS_PERIOD) {
        this.isOpenedMenu = false;
      } else {
        this.isOpenedMenu = false;

        if (this.isOpenedMenu && !this.isFocusedInput) {
          document.querySelector(`#${this.id}`).focus();
        }
      }
    },

    onMouseDownDateMenu() {
      this.isClickedInDateMenu = true;
    },

    onMouseDownInput() {
      this.isFocusedInput = true;
    },

    onClickInput(range) {
      this.selectedRange = range;
      this.selectedInputFocus = range;
      this.isClickedInDateMenu = true;
      this.isFocusedInput = true;
      this.isClickedInDateMenu = false;
    },

    onBlurInput() {
      this.isFocusedInput = false;
      this.isOpenedMenu = this.isClickedInDateMenu;
      this.isClickedInDateMenu = false;

      document.querySelector(`#${this.id}`).focus();
    },

    setActiveButton(buttonPeriod) {
      return buttonPeriod === this.period ? "mono-datepicker-range-menu-button-active" : "";
    },

    setActiveSelectedDate(date) {
      return this.dateRange.from === date.startRange && this.dateRange.to === date.endRange
        ? "mono-datepicker-range-menu-list-item-active"
        : "";
    },

    getParseDate(date) {
      return parse(date, "dd.MM.yyyy", new Date());
    },

    getInputFocusClass(range) {
      return this.selectedInputFocus === range ? "focus-input" : "";
    },

    handleDate(selectedDate) {
      const [startDate, endDate] = selectedDate;
      const [ownRangeStart, ownRangeEnd] = this.ownRange;
      const rangeEnd = endDate ? endDate : startDate;

      if (this.selectedRange === OWN_RANGE_START) {
        if (this.getParseDate(startDate) < this.getParseDate(ownRangeEnd)) {
          this.ownRange = [startDate, ownRangeEnd];
          this.selectedRange = OWN_RANGE_END;
          this.selectedInputFocus = OWN_RANGE_END;
        } else {
          this.ownRange = [startDate];
          this.cleanSelectedValues();
        }
      } else if (this.selectedRange === OWN_RANGE_END) {
        if (this.getParseDate(rangeEnd) > this.getParseDate(ownRangeStart)) {
          this.ownRange = [ownRangeStart, rangeEnd];

          if (!endDate || endDate !== ownRangeEnd) {
            this.cleanSelectedValues();
          }
        } else {
          this.ownRange = [rangeEnd];
          this.cleanSelectedValues();
        }
      } else {
        this.ownRange = selectedDate;

        if (!this.ownRangeEnd) this.selectedInputFocus = OWN_RANGE_END;

        if ((startDate && endDate) || !this.ownRangeStart) {
          this.selectedInputFocus = OWN_RANGE_START;
        }
      }
    },

    onChangeOpenedMenu() {
      this.cleanSelectedValues();
    },

    cleanSelectedValues() {
      this.selectedInputFocus = "";
      this.selectedRange = "";
    },

    onChangeDateRange() {
      this.getDateFromTimeStamp(this.dateRange.from, this.declinedMonthFullLocales);

      const dateRangeInUtc = {
        from: Number(this.dateRange.from),
        to: Number(this.dateRange.to),
      };

      if (this.checkValue(dateRangeInUtc) && this.emitValue) {
        this.$emit("update:modelValue", dateRangeInUtc);
      }
    },

    checkValue(dateRangeInUtc) {
      return (
        (this.dateRange.from && dateRangeInUtc.from !== this.modelValue.from) ||
        (this.dateRange.to && dateRangeInUtc.to !== this.modelValue.to)
      );
    },

    onChangeValue() {
      if (this.isValue) {
        this.emitValue = true;
      }

      if (!this.modelValue.from && !this.modelValue.to) {
        this.dateRange = {
          from: null,
          to: null,
        };
      } else {
        this.dateRange = {
          from: Number(this.modelValue?.from),
          to: Number(this.modelValue?.to),
        };
      }
    },

    onChangeEmitValue() {
      if (this.emitValue) {
        this.onChangeDateRange();
      }
    },

    onChangeOwnRange() {
      let [ownRangeStart, ownRangeEnd] = this.ownRange;

      if (ownRangeStart) {
        const startRangeDate = this.getParseDate(ownRangeStart);

        this.ownRangeStart = ownRangeStart;
        this.ownRangeEnd = "";

        const startDayInUtc = zonedTimeToUtc(startOfDay(startRangeDate), "UTC");

        this.dateRange.from = parseInt(format(startDayInUtc, "t", { timeZone: "UTC" }));
      }

      if (ownRangeEnd) {
        const startRangeDate = this.getParseDate(ownRangeStart);
        const endRangeDate = this.getParseDate(ownRangeEnd);

        if (endRangeDate < startRangeDate) {
          this.ownRangeEnd = ownRangeStart;
          this.dateRange.to = getUnixTime(endOfDay(startRangeDate));
        } else {
          this.ownRangeEnd = ownRangeEnd;

          const endOfDayInUtc = zonedTimeToUtc(endOfDay(endRangeDate), "UTC");

          this.dateRange.to = parseInt(format(endOfDayInUtc, "t", { timeZone: "UTC" }));
        }
      }

      this.dateRange = {
        ...this.dateRange,
      };
    },

    getDateFromTimeStamp(timestamp, monthList) {
      const date = fromUnixTime(timestamp);
      const timeZone = "GMT";

      const zonedDate = utcToZonedTime(date, timeZone);

      const day = getDate(zonedDate);
      const startOfWeekDate = startOfWeek(zonedDate, { weekStartsOn: 1 });
      const endOfWeekDate = endOfWeek(zonedDate, { weekStartsOn: 1 });
      const month = getMonth(zonedDate);
      const monthName = monthList?.[month];
      const year = getYear(zonedDate);

      return {
        date: zonedDate,
        day,
        startOfWeekDate,
        endOfWeekDate,
        month,
        monthName,
        year,
      };
    },

    onClickShiftDatesList(action) {
      const defaultRange = action === "prev" ? -1 : 1;
      const yearRange = action === "prev" ? -12 : 12;

      if (this.period === WEEK_PERIOD) {
        this.currentTimestamp = getUnixTime(addMonths(this.selectedDate.date, defaultRange));

        this.datesList = createWeeksList(this.selectedDate, this.monthShortLocales);
      }

      if (this.period === MONTH_PERIOD) {
        this.currentTimestamp = getUnixTime(addYears(this.selectedDate.date, defaultRange));

        this.datesList = createMonthsList(this.selectedDate, this.monthFullLocales);
      }

      if (this.period === QUARTER_PERIOD) {
        this.currentTimestamp = getUnixTime(addYears(this.selectedDate.date, defaultRange));

        this.datesList = createQuarters(this.selectedDate, { i18n: this.i18n });
      }

      if (this.period === YEAR_PERIOD) {
        this.currentTimestamp = getUnixTime(addYears(this.selectedDate.date, yearRange));

        this.datesList = createYears(this.selectedDate);
      }
    },

    changePeriodType(period) {
      this.currentTimestamp = this.modelValue.from || getUnixTime(new Date());

      if (period === WEEK_PERIOD) {
        this.datesList = createWeeksList(this.selectedDate, this.monthShortLocales);

        this.menuTypeClass = BLOCK_MENU_CLASS;
      }

      if (period === MONTH_PERIOD) {
        this.datesList = createMonthsList(this.selectedDate, this.monthFullLocales);

        this.menuTypeClass = GRID_MENU_CLASS;
      }

      if (period === QUARTER_PERIOD) {
        this.datesList = createQuarters(this.selectedDate, { i18n: this.i18n });

        this.menuTypeClass = BLOCK_MENU_CLASS;
      }

      if (period === YEAR_PERIOD) {
        this.datesList = createYears(this.selectedDate);

        this.menuTypeClass = GRID_MENU_CLASS;
      }

      if (period === OWN_PERIOD) {
        const startRange = this.getDateFromTimeStamp(
          this.dateRange.from,
          this.declinedMonthFullLocales,
        );
        const endRange = this.getDateFromTimeStamp(
          this.dateRange.to,
          this.declinedMonthFullLocales,
        );
        const defaultStartRange = this.getDateFromTimeStamp(
          getUnixTime(startOfMonth(new Date())),
          this.declinedMonthFullLocales,
        );
        const defaultEndRange = this.getDateFromTimeStamp(
          getUnixTime(endOfMonth(new Date())),
          this.declinedMonthFullLocales,
        );

        this.ownRangeStart = this.dateRange.from
          ? prepareOwnRangeDate(startRange)
          : prepareOwnRangeDate(defaultStartRange);
        this.ownRangeEnd = this.dateRange.to
          ? prepareOwnRangeDate(endRange)
          : prepareOwnRangeDate(defaultEndRange);

        if (this.dateRange.from && this.dateRange.to) {
          this.ownRange = [this.ownRangeStart, this.ownRangeEnd];
        }
      } else {
        const currentDate = this.datesList.find(
          (item) =>
            item.startRange <= this.currentTimestamp && item.endRange >= this.currentTimestamp,
        );

        if (period !== LAST_THIRTY_DAYS_PERIOD) {
          this.selectValue(currentDate.index);
        }
      }

      this.period = period;
      this.isShownOwnRange = period === OWN_PERIOD;

      if (this.period !== LAST_THIRTY_DAYS_PERIOD) {
        this.isShownDateMenu = true;
      }
    },

    onClickChangePeriodType(period) {
      this.changePeriodType(period);
      this.isOpenedMenu = true;
    },

    selectValue(index) {
      const selectedItem = this.datesList[index];

      this.dateRange = {
        from: selectedItem.startRange,
        to: selectedItem.endRange,
      };

      if (this.period !== WEEK_PERIOD) {
        this.currentTimestamp = this.dateRange.from;
      }
    },

    onClickSelectValue(index) {
      this.selectValue(index);
      this.isOpenedMenu = false;
    },

    selectLastThirtyDays() {
      this.currentTimestamp = getUnixTime(new Date());

      const DateService = new DateServiceDefault();

      this.dateRange = {
        from: DateService.thirtyDaysAgo(),
        to: DateService.nextTwoWeek(),
      };

      this.period = LAST_THIRTY_DAYS_PERIOD;
      this.isShownDateMenu = false;
    },

    onClickSelectLastThirtyDays() {
      this.selectLastThirtyDays();

      this.isOpenedMenu = false;
    },

    onChangeOwnRangeInput() {
      this.setCorrectDateFormat();
      this.isCheckDateFormat = true;

      if (this.v$.$invalid) {
        this.v$.$touch();
        this.isCheckDateFormat = false;

        return;
      }

      this.ownRange = [this.ownRangeStart, this.ownRangeEnd];
      this.isCheckDateFormat = false;
    },

    setCorrectDateFormat() {
      this.ownRangeStart = prepareRangeFormat(this.ownRangeStart);
      this.ownRangeEnd = prepareRangeFormat(this.ownRangeEnd);
    },

    onClickRangeSet() {
      this.isOpenedMenu = !this.isOpenedMenu;
    },

    onClickShiftRange(action) {
      if (this.period === LAST_THIRTY_DAYS_PERIOD) {
        this.changePeriodType(OWN_PERIOD);
      }

      const numberForIncludeNextDay = 1;
      const numberForIncludeBeforeDay = 2;
      const startRangeDate = this.getParseDate(this.ownRangeStart);
      const endRangeDate = this.getParseDate(this.ownRangeEnd);
      const daysDifference = differenceInDays(endRangeDate, startRangeDate);

      if (action === "next") {
        if (this.period === OWN_PERIOD) {
          this.ownRangeStart = format(addDays(endRangeDate, numberForIncludeNextDay), "dd.MM.yyyy");

          this.ownRangeEnd = format(addDays(endRangeDate, daysDifference), "dd.MM.yyyy");

          this.setCorrectDateFormat();

          this.ownRange = [this.ownRangeStart, this.ownRangeEnd];
        } else {
          let nextDate = this.datesList.find((item) => item.endRange > this.dateRange.to);

          if (!nextDate) {
            this.onClickShiftDatesList(action);

            nextDate = this.datesList.find((item) => item.endRange > this.dateRange.to);
          }

          this.dateRange = {
            from: nextDate.startRange,
            to: nextDate.endRange,
          };
        }
      } else {
        if (this.period === OWN_PERIOD) {
          this.ownRangeStart = format(
            subDays(startRangeDate, daysDifference + numberForIncludeBeforeDay),
            "dd.MM.yyyy",
          );
          this.ownRangeEnd = format(
            subDays(endRangeDate, daysDifference + numberForIncludeNextDay),
            "dd.MM.yyyy",
          );

          this.setCorrectDateFormat();

          this.ownRange = [this.ownRangeStart, this.ownRangeEnd];
        } else {
          const reverseDatesList = [...this.datesList].reverse();

          let previousDate = reverseDatesList.find((item) => item.endRange < this.dateRange.to);

          if (!previousDate) {
            this.onClickShiftDatesList(action);

            const reverseDatesList = [...this.datesList].reverse();

            previousDate = reverseDatesList.find((item) => item.endRange < this.dateRange.to);
          }

          this.dateRange = {
            from: previousDate.startRange,
            to: previousDate.endRange,
          };
        }
      }
    },

    setDefaultPeriodForButton() {
      const DateService = new DateServiceDefault();
      const timeZone = "GMT";
      const from = utcToZonedTime(fromUnixTime(this.dateRange.from), timeZone);
      const to = utcToZonedTime(fromUnixTime(this.dateRange.to), timeZone);

      const isWeekPeriod =
        String(from) === String(startOfWeek(from, { weekStartsOn: 1 })) &&
        String(to) === String(endOfWeek(to, { weekStartsOn: 1 }));
      const isMonthPeriod =
        String(from) === String(startOfMonth(from)) &&
        String(to) === String(endOfMonth(to)) &&
        getMonth(from) === getMonth(to);
      const isQuarterPeriod =
        String(from) === String(startOfQuarter(from)) && String(to) === String(endOfQuarter(to));
      const isYearPeriod =
        String(from) === String(startOfYear(from)) && String(to) === String(endOfYear(to));
      const isLastThirtyDaysPeriod =
        String(to) === String(utcToZonedTime(fromUnixTime(DateService.nextTwoWeek(), timeZone))) &&
        String(from) ===
          String(utcToZonedTime(fromUnixTime(DateService.thirtyDaysAgo(), timeZone)));

      if (!this.modelValue.from && !this.modelValue.to) {
        this.period = OWN_PERIOD;
      } else if (isLastThirtyDaysPeriod) {
        this.period = LAST_THIRTY_DAYS_PERIOD;
        this.isShownDateMenu = false;
      } else if (isYearPeriod) {
        this.period = YEAR_PERIOD;
      } else if (isMonthPeriod) {
        this.period = MONTH_PERIOD;
      } else if (isQuarterPeriod) {
        this.period = QUARTER_PERIOD;
      } else if (isWeekPeriod) {
        this.period = WEEK_PERIOD;
      } else {
        this.period = OWN_PERIOD;

        if (this.dateRange.from && this.dateRange.to) {
          this.ownRange = [this.dateRange.from, this.dateRange.to];

          this.changePeriodType(this.period);
        }
      }
    },
  },
};
</script>

<i18n>
en:
  lastThirtyDays: "Last 30 days <span> and 2 next two weeks </span>"
  ownRange: "Own range"
  week: "Week"
  month: "Month"
  quarter: "Quarter"
  year: "Year"
  dateFormatWithDot: Date should be in format 'dd.mm.yyyy'.
  notCorrectMonthNumber: Wrong month number.
  notCorrectDayNumber: Wrong day in month.
  monthShort:
    january: Jan
    february: Feb
    march: Mar
    april: Apr
    may: May
    june: Jun
    july: Jul
    august: Aug
    september: Sep
    october: Oct
    november: Nov
    december: Dec
  declinedMonth:
    january: January
    february: February
    march: March
    april: April
    may: May
    june: June
    july: July
    august: August
    september: September
    october: October
    november: November
    december: December
  monthList:
    january: January
    february: February
    march: March
    april: April
    may: May
    june: June
    july: July
    august: August
    september: September
    october: October
    november: November
    december: December
ru:
  lastThirtyDays: "Последние 30 дней <span> и 2 неделе вперед </span>"
  ownRange: "Свой диапазон"
  week: "Неделя"
  month: "Месяц"
  quarter: "Квартал"
  year: "Год"
  dateFormatWithDot: Дата должна быть в формате 'dd.mm.yyyy'.
  notCorrectMonthNumber: Неверный номер месяца.
  notCorrectDayNumber: Неверный день месяца.
  monthShort:
    january: Янв
    february: Фев
    march: Мар
    april: Апр
    may: Май
    june: Июнь
    july: Июль
    august: Авг
    september: Сен
    october: Окт
    november: Ноя
    december: Дек
  declinedMonth:
    january: Января
    february: Февраля
    march: Марта
    april: Апреля
    may: Мая
    june: Июня
    july: Июля
    august: Августа
    september: Сентября
    october: Октября
    november: Ноября
    december: Декабря
  monthList:
    january: Январь
    february: Февраль
    march: Март
    april: Апрель
    may: Май
    june: Июн
    july: Июл
    august: Август
    september: Сентябрь
    october: Октябрь
    november: Ноябрь
    december: Декабрь
ua:
  lastThirtyDays: "Останніх 30 днів <span> і 2 тижні вперед </span>"
  ownRange: "Свій діапазон"
  week: "Тиждень"
  month: "Місяць"
  quarter: "Квартал"
  year: "Рік"
  dateFormatWithDot: Дата повинна бути в форматі 'dd.mm.yyyy'.
  notCorrectMonthNumber: Невірний номер місяця.
  notCorrectDayNumber: Невірний день місяця.
  monthShort:
    january: Січ
    february: Лют
    march: Бер
    april: Кві
    may: Тра
    june: Чер
    july: Лип
    august: Сер
    september: Вер
    october: Жов
    november: Лис
    december: Гру
  declinedMonth:
    january: Січня
    february: Лютого
    march: Березня
    april: Квітня
    may: Травня
    june: Червня
    july: Липня
    august: Серпня
    september: Вересня
    october: Жовтня
    november: Листопада
    december: Грудня
  monthList:
    january: Січень
    february: Лютий
    march: Березень
    april: Квітень
    may: Травень
    june: Червень
    july: Липень
    august: Серпень
    september: Вересень
    october: Жовтень
    november: Листопад
    december: Грудень
</i18n>

<style lang="postcss" scoped>
.mono-datepicker-range {
  @apply shrink-0;

  &-menu {
    @apply absolute mt-2;
    @apply rounded-xl border border-gray-300 bg-white shadow;
    @apply z-20 w-80 p-2;

    &-wrapper {
      @apply flex;
      @apply space-x-1;
      @apply mb-1;

      &:last-child {
        @apply mb-0;
      }
    }

    &-datepicker-wrapper {
      @apply flex space-x-1;
      @apply mt-4;
    }

    .focus-input {
      :deep(.mono-input-block) {
        @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
        @apply z-10;
      }
    }

    &-input {
      &:first-child {
        :deep(.mono-input-block) {
          @apply rounded-r-none;

          &:focus-within {
            @apply z-10;
          }
        }
      }

      &:last-child {
        @apply ml-0 !important;

        :deep(.mono-input-block) {
          @apply rounded-l-none;
        }
      }

      :deep(.mono-input) {
        @apply text-sm;
        @apply border-gray-100;
        @apply px-4 py-2.5;
      }
    }

    &-button {
      @apply flex flex-col items-center justify-center;
      @apply text-center text-xs font-medium text-gray-900;
      @apply rounded-lg bg-gray-900 bg-opacity-5;
      @apply px-1.5 py-2.5;
      @apply h-[3.125rem] w-full cursor-pointer;

      &:hover {
        @apply bg-opacity-10;
      }

      &:deep(span) {
        @apply block font-normal text-gray-500;
      }

      &-active {
        @apply bg-opacity-15;
      }
    }

    &-range {
      @apply flex items-center justify-between;
      @apply mb-2.5 mt-4 px-2.5 py-2;

      &-value {
        @apply text-sm font-medium text-gray-900;

        &-year {
          @apply ml-1;
        }
      }
    }

    &-list {
      &-item {
        @apply text-center text-sm font-medium text-gray-900;
        @apply py-3;
        @apply cursor-pointer;

        &:hover {
          @apply rounded-lg bg-gray-50;
        }

        &-active {
          @apply rounded-lg bg-gray-900 bg-opacity-5;
          @apply py-3;
        }
      }
    }
  }
}

.icon {
  @apply cursor-pointer;

  &:deep(g [fill]) {
    @apply fill-current text-gray-900;
  }
}

.grid-menu {
  @apply grid grid-cols-3 grid-rows-1 gap-0.5;

  .mono-datepicker-range-menu-list-item {
    @apply py-3;
  }
}

.own-today {
  @apply flex items-center justify-center;
  @apply h-full rounded-lg bg-gray-900;
  @apply text-white;
}

.own-range {
  @apply mt-6 pt-0.5;

  &-day {
    @apply flex items-center justify-center;
    @apply h-full bg-gray-900 bg-opacity-5;
  }

  &-days {
    @apply flex items-center justify-center;
    @apply h-full;
  }
}

.first-own-range-day {
  @apply flex items-center justify-center;
  @apply h-full rounded-l-lg bg-gray-900 bg-opacity-10 font-medium;

  &:hover {
    @apply bg-gray-100;
  }

  &-block {
    @apply h-full bg-white;
  }
}

.last-own-range-day {
  @apply flex items-center justify-center;
  @apply h-full rounded-r-lg bg-gray-900 bg-opacity-10 font-medium;

  &:hover {
    @apply bg-gray-100;
  }

  &-block {
    @apply h-full bg-white;
  }
}
</style>
