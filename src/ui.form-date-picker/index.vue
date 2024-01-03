<template>
  <div class="mono-datepicker-wrapper" :class="datepickerWrapperClasses">
    <div class="mono-datepicker-block">
      <t-datepicker
        :id="id"
        ref="datepicker"
        v-model="selectedDate"
        :user-format="customUserFormat || defaultUserFormat"
        :week-start="1"
        :locale="locale"
        :placeholder="placeholder"
        :disabled="disabled"
        :min-date="minDate"
        :max-date="maxDate"
        class="mono-datepicker"
        :clearable="false"
        :classes="datepickerClasses"
        :data-cy="dataCy"
        :timepicker="timepicker"
        :date-format="customDateFormat || defaultDateFormat"
        @shown="onShowCalendar"
        @hidden="onHideCalendar"
      >
        <template #day="{ isSelected, dayFormatted, day }">
          <span
            v-if="isSelected"
            class="mono-datepicker-day"
            :data-cy="`${dataCy}-clear`"
            @click.prevent.stop="onClickDay({ day, isSelected })"
          >
            {{ dayFormatted }}
          </span>

          <span v-else class="mono-datepicker-day" @click="onClickDay({ day })">
            {{ dayFormatted }}
          </span>
        </template>
      </t-datepicker>
      <label :for="id">
        <!-- @slot Use it to add icon. -->
        <slot name="icon" />
      </label>

      <label v-if="isShownRightSlot" :for="id" class="right-slot-label">
        <!-- @slot Use it to add something right. -->
        <slot name="right" />
      </label>
    </div>

    <label class="label" :class="labelClass" :for="id">
      {{ label }}
    </label>

    <p v-if="error" class="error-message" :data-cy="`${dataCy}-error-message`">
      {{ error }}
    </p>

    <p v-if="description && !error" class="description">
      {{ description }}
    </p>
  </div>
</template>

<script>
import I18nServiceDefault from "vueless/service.i18n";
import { fromUnixTime, getUnixTime, setHours, setMinutes, parse } from "date-fns";
import DateService from "vueless/service.date";
import { getRandomId } from "vueless/service.ui";

import TDatepicker from "vueless/library.vue-tailwind-3/TDatepicker";

const HOURS_INPUT_SELECTOR = ".timepicker-input:first-child";
const MINUTES_INPUT_SELECTOR = ".timepicker-input:last-child";
const TIME_SELECTOR = ".timepicker-time-fields-wrapper";

export default {
  name: "UDatePicker",

  components: {
    TDatepicker,
  },

  props: {
    /**
     * Set date picker label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set date picker placeholder.
     */
    placeholder: {
      type: String,
      default: "",
    },

    /**
     * Set date picker value (timestamp).
     */
    modelValue: {
      type: Number,
      default: 0,
    },

    /**
     * Set picker min date in format yyyy-MM-dd.
     */
    minDate: {
      type: String,
      default: "",
    },

    /**
     * Set picker max date in format yyyy-MM-dd.
     */
    maxDate: {
      type: String,
      default: "",
    },

    /**
     * Make component inactive.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Make timepicker input active.
     */
    timepicker: {
      type: Boolean,
      default: false,
    },

    /**
     * Set error text.
     */
    error: {
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
     * Set description text.
     */
    description: {
      type: String,
      default: "",
    },

    /**
     * The size of the component.
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: "md",
    },

    /**
     * Set custom date format.
     * [See all formats here.](https://www.vue-tailwind.com/docs/datepicker/)
     */
    customDateFormat: {
      type: String,
      default: "",
    },

    /**
     * Set custom user date format.
     * [See all formats here.](https://www.vue-tailwind.com/docs/datepicker/)
     */
    customUserFormat: {
      type: String,
      default: "",
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
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  computed: {
    selectedDate: {
      get() {
        if (!this.modelValue) return;

        return fromUnixTime(this.modelValue);
      },
      set(value) {
        const timestamp = value ? getUnixTime(new Date(value)) : null;

        this.$emit("update:modelValue", timestamp);
      },
    },

    datepickerWrapperClasses() {
      return {
        "right-slot": this.isShownRightSlot,
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
      };
    },

    isShownRightSlot() {
      return !!this.$slots["right"];
    },

    i18n() {
      return {
        yesterday: this.getTranslation("yesterday"),
        today: this.getTranslation("today"),
        tomorrow: this.getTranslation("tomorrow"),
        timeLabel: this.getTranslation("timeLabel"),
        weekdays: {
          shorthand: {
            sunday: this.getTranslation("weekdays.shorthand.sunday"),
            monday: this.getTranslation("weekdays.shorthand.monday"),
            tuesday: this.getTranslation("weekdays.shorthand.tuesday"),
            wednesday: this.getTranslation("weekdays.shorthand.wednesday"),
            thursday: this.getTranslation("weekdays.shorthand.thursday"),
            friday: this.getTranslation("weekdays.shorthand.friday"),
            saturday: this.getTranslation("weekdays.shorthand.saturday"),
          },
          longhand: {
            sunday: this.getTranslation("weekdays.longhand.sunday"),
            monday: this.getTranslation("weekdays.longhand.monday"),
            tuesday: this.getTranslation("weekdays.longhand.tuesday"),
            wednesday: this.getTranslation("weekdays.longhand.wednesday"),
            thursday: this.getTranslation("weekdays.longhand.thursday"),
            friday: this.getTranslation("weekdays.longhand.friday"),
            saturday: this.getTranslation("weekdays.longhand.saturday"),
          },
        },
        months: {
          shorthand: {
            january: this.getTranslation("months.shorthand.january"),
            february: this.getTranslation("months.shorthand.february"),
            march: this.getTranslation("months.shorthand.march"),
            april: this.getTranslation("months.shorthand.april"),
            may: this.getTranslation("months.shorthand.may"),
            june: this.getTranslation("months.shorthand.june"),
            july: this.getTranslation("months.shorthand.july"),
            august: this.getTranslation("months.shorthand.august"),
            september: this.getTranslation("months.shorthand.september"),
            october: this.getTranslation("months.shorthand.october"),
            november: this.getTranslation("months.shorthand.november"),
            december: this.getTranslation("months.shorthand.december"),
          },
          longhand: {
            january: this.getTranslation("months.longhand.january"),
            february: this.getTranslation("months.longhand.february"),
            march: this.getTranslation("months.longhand.march"),
            april: this.getTranslation("months.longhand.april"),
            may: this.getTranslation("months.longhand.may"),
            june: this.getTranslation("months.longhand.june"),
            july: this.getTranslation("months.longhand.july"),
            august: this.getTranslation("months.longhand.august"),
            september: this.getTranslation("months.longhand.september"),
            october: this.getTranslation("months.longhand.october"),
            november: this.getTranslation("months.longhand.november"),
            december: this.getTranslation("months.longhand.december"),
          },
        },
        okLabel: this.getTranslation("okLabel"),
      };
    },

    locale() {
      return {
        weekdays: {
          shorthand: Object.values(this.i18n.weekdays.shorthand),
          longhand: Object.values(this.i18n.weekdays.longhand),
        },
        months: {
          shorthand: Object.values(this.i18n.months.shorthand),
          longhand: Object.values(this.i18n.months.longhand),
        },
        timeLabel: this.i18n.timeLabel,
        okLabel: this.i18n.okLabel,
      };
    },

    inputClass() {
      const classes = {
        disabled: this.disabled ? "disabled" : "",
        error: this.error ? "error-input" : "",
      };

      return `${classes.error} ${classes.disabled}}`;
    },

    labelClass() {
      return {
        "error-label": this.error,
        "label-sm": this.size === "sm",
        "label-md": this.size === "md",
        "label-lg": this.size === "lg",
      };
    },

    datepickerClasses() {
      return {
        wrapper: "flex flex-col",
        dropdownWrapper: "relative z-40",
        dropdown: `origin-top-left absolute rounded-lg shadow bg-white overflow-hidden mt-2 pl-1 pr-1 pb-4
          shadow border border-gray-300`,
        enterFromClass: "opacity-0 scale-95",
        enterActiveClass: "transition transform ease-out duration-100",
        enterToClass: "opacity-100 scale-100",
        leaveFromClass: "opacity-100 scale-100",
        leaveActiveClass: "transition transform ease-in duration-75",
        leaveToClass: "opacity-0 scale-95",
        inlineWrapper: "",
        inlineViews: "rounded bg-white border mt-1 inline-flex",
        inputWrapper: "",
        input: `input w-full ${this.inputClass}`,
        navigator: "pt-2 px-3 items-center",
        navigatorViewButton: `transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full pr-1 pl-3
          py-1 -ml-1 hover:bg-gray-100`,
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
        navigatorNextButton: `transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100
          rounded-full p-1 -mr-1 disabled:opacity-50 disabled:cursor-not-allowed`,
        navigatorPrevButtonIcon: "text-gray-400 navigation-btn-icon",
        navigatorNextButtonIcon: "text-gray-400 navigation-btn-icon",
        calendarWrapper: "px-3 pt-2",
        calendarHeaderWrapper: "",
        calendarHeaderWeekDay:
          "uppercase text-xs text-gray-500 w-8 h-8 flex items-center justify-center",
        calendarDaysWrapper: "",
        calendarDaysDayWrapper: "w-full h-8 flex shrink-0 items-center calendar-day-button",
        otherMonthDay: `text-sm rounded-lg w-8 h-8 mx-auto hover:bg-gray-100 text-gray-400 disabled:opacity-50
          disabled:cursor-not-allowed`,
        emptyDay: "",
        inRangeFirstDay: "text-sm bg-gray-900 text-white w-full h-8 rounded-l-full",
        inRangeLastDay: "text-sm bg-gray-900 text-white w-full h-8 rounded-r-full",
        inRangeDay:
          "text-sm bg-gray-200 w-full h-8 disabled:opacity-50 disabled:cursor-not-allowed",
        selectedDay:
          "text-sm rounded-lg w-8 h-8 mx-auto bg-gray-900 text-white disabled:opacity-50 disabled:cursor-not-allowed",
        activeDay:
          "text-sm rounded-lg bg-gray-100 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        highlightedDay:
          "text-sm rounded-lg bg-gray-200 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        day: "text-sm rounded-lg w-8 h-8 mx-auto hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
        today: `text-sm rounded-lg w-8 h-8 mx-auto hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
          border-2 border-gray-900`,
        monthWrapper: "px-3 pt-2",
        selectedMonth: "text-sm rounded-lg w-full h-12 mx-auto bg-gray-900 text-white",
        activeMonth: "text-sm rounded-lg w-full h-12 mx-auto bg-gray-200",
        month: "text-sm rounded-lg w-full h-12 mx-auto hover:bg-gray-100",
        yearWrapper: "px-3 pt-2",
        year: "text-sm rounded-lg w-full h-12 mx-auto hover:bg-gray-100",
        selectedYear: "text-sm rounded-lg w-full h-12 mx-auto bg-gray-900 text-white",
        activeYear: "text-sm rounded-lg w-full h-12 mx-auto bg-gray-200",
        timepickerInput: `timepicker-input w-11 border-none text-sm text-center first:rounded-l-lg last:rounded-r-lg`,
        timepickerWrapper:
          "border-t border-gray-200 mx-2 pl-2 pr-1 mt-2 pt-3 -mb-1 flex items-center text-sm",
        timepickerTimeLabel: "flex mr-auto",
        timepickerOkButton: `block rounded-lg outline-none flex items-center justify-center px-2.5 py-1
          text-sm  bg-gray-900/10 text-gray-900 ml-2`,
        timepickerTimeWrapper: "flex z-[100]",
        timepickerTimeFieldsWrapper:
          "timepicker-time-fields-wrapper rounded-lg border border-gray-300 flex items-center",
      };
    },

    defaultUserFormat() {
      if (!this.modelValue) return;

      const SPACE_BETWEEN_LETTER_REG_EXP = /./g;

      let date = new DateService()
        .formatDate(this.selectedDate, { withTime: this.timepicker, i18n: this.i18n })
        .toLowerCase();

      const separatedDate = date.match(SPACE_BETWEEN_LETTER_REG_EXP).join("\\");

      return "\\" + separatedDate.charAt(0).toUpperCase() + separatedDate.slice(1);
    },

    defaultDateFormat() {
      if (!this.modelValue) return;

      return "Y-m-d H:i\\";
    },
  },

  methods: {
    onClickClearDate() {
      this.selectedDate = null;

      this.$refs.datepicker.$refs.dropdown.localShow = false;
    },

    onShowCalendar() {
      if (!this.timepicker) return;

      this.$nextTick(() => {
        const hoursInput = document.querySelector(HOURS_INPUT_SELECTOR);
        const minutesInput = document.querySelector(MINUTES_INPUT_SELECTOR);
        const timeBlock = document.querySelector(TIME_SELECTOR);

        hoursInput.addEventListener("input", this.setHours);
        hoursInput.addEventListener("blur", this.setHours);

        minutesInput.addEventListener("input", this.setMinutes);
        minutesInput.addEventListener("blur", this.setMinutes);

        timeBlock.addEventListener("blur", () => {
          this.setHoursAndMinutes();
        });
      });
    },

    setTime(type) {
      let selectedDate = this.selectedDate;

      if (type === "hours" || !type) {
        const hoursInput = document.querySelector(HOURS_INPUT_SELECTOR);

        selectedDate = setHours(selectedDate, Number(hoursInput.value));
      }

      if (type === "minutes" || !type) {
        const minutesInput = document.querySelector(MINUTES_INPUT_SELECTOR);

        selectedDate = setMinutes(selectedDate, Number(minutesInput.value));
      }

      this.selectedDate = selectedDate;
    },

    setHoursAndMinutes() {
      this.setTime();
    },

    setHours() {
      this.setTime("hours");
    },

    setMinutes() {
      this.setTime("minutes");
    },

    onHideCalendar() {
      if (!this.timepicker) return;

      const hoursInput = document.querySelector(HOURS_INPUT_SELECTOR);
      const minutesInput = document.querySelector(MINUTES_INPUT_SELECTOR);
      const timeBlock = document.querySelector(TIME_SELECTOR);

      hoursInput.removeEventListener("input", this.setHours);
      hoursInput.removeEventListener("blur", this.setHours);

      minutesInput.removeEventListener("input", this.setMinutes);
      minutesInput.removeEventListener("blur", this.setMinutes);

      timeBlock.removeEventListener("blur", () => {
        this.setHoursAndMinutes();
      });
    },

    onClickDay({ day, isSelected }) {
      const selectedDateParse = new Date(day);

      const selectedDate = getUnixTime(selectedDateParse);

      const maxDayParse = parse(this.maxDate, "yyyy-MM-dd", new Date());
      const minDayParse = parse(this.minDate, "yyyy-MM-dd", new Date());
      const maxDay = getUnixTime(maxDayParse);
      const minDay = getUnixTime(minDayParse);

      if (selectedDate < minDay || selectedDate > maxDay) return;

      this.selectedDate = day;

      this.$refs.datepicker.$refs.dropdown.localShow = false;

      if (isSelected) {
        this.selectedDate = null;
      }
    },
  },
};
</script>

<i18n>
en:
  yesterday: Yesterday
  today: Today
  tomorrow: Tomorrow
  timeLabel: Time
  weekdays:
    shorthand:
      sunday: Sun
      monday: Mon
      tuesday: Tue
      wednesday: Wed
      thursday: Thu
      friday: Fri
      saturday: Sat
    longhand:
      sunday: Sunday
      monday: Monday
      tuesday: Tuesday
      wednesday: Wednesday
      thursday: Thursday
      friday: Friday
      saturday: Sat
  months:
    shorthand:
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
    longhand:
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
  okLabel: Ok
ru:
  yesterday: Вчера
  today: Сегодня
  tomorrow: Завтра
  timeLabel: Время
  weekdays:
    shorthand:
      sunday: Вс
      monday: Пн
      tuesday: Вт
      wednesday: Ср
      thursday: Чт
      friday: Пт
      saturday: Сб
    longhand:
      sunday: Воскресенье
      monday: Понедельник
      tuesday: Вторник
      wednesday: Среда
      thursday: Четверг
      friday: Пятница
      saturday: Суббота
  months:
    shorthand:
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
    longhand:
      january: Январь
      february: Февраль
      march: Март
      april: Апрель
      may: Май
      june: Июнь
      july: Июль
      august: Август
      september: Сентябрь
      october: Октябрь
      november: Ноябрь
      december: Декабрь
  okLabel: Oк
ua:
  yesterday: Вчора
  today: Сьогодні
  tomorrow: Завтра
  timeLabel: Час
  weekdays:
    shorthand:
      sunday: Нд
      monday: Пн
      tuesday: Вт
      wednesday: Ср
      thursday: Чт
      friday: Пт
      saturday: Сб
    longhand:
      sunday: Неділя
      monday: Понеділок
      tuesday: Вівторок
      wednesday: Середа
      thursday: Четвер
      friday: П'ятниця
      saturday: Субота
  months:
    shorthand:
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
    longhand:
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
  okLabel: Oк
</i18n>

<style lang="postcss" scoped>
.mono-datepicker {
  &-day {
    @apply flex items-center justify-center;
    @apply h-full w-full;
  }
}

.mono-datepicker-wrapper {
  @apply relative;
  @apply max-w-full;

  .description {
    @apply text-xs font-normal text-gray-500/[85];
    @apply pl-4 pt-2;
  }
}

.mono-datepicker-block {
  @apply relative;

  &:focus-within {
    :deep(.input) {
      @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
    }

    :deep(.error-input) {
      @apply border-red-500 ring-red-100 !important;
    }
  }

  :deep(.error-input) {
    @apply border-red-300 !important;
  }

  :deep(.navigation-btn-icon) {
    @apply h-4 !important;
  }

  .right-slot-label {
    @apply absolute left-4 md:left-auto md:right-4 md:top-4 !important;
    @apply pt-0.5;
  }

  :deep(.input) {
    @apply font-normal text-gray-900;
    @apply rounded-lg border border-solid border-gray-300 bg-white shadow-none;
    @apply pl-4 pr-4 md:pr-11;

    &:hover {
      @apply border-gray-400;
    }

    &:focus {
      @apply border-gray-500 ring-4 ring-gray-600 ring-opacity-15;
    }

    &::placeholder {
      @apply font-normal text-gray-400;
    }

    &:disabled {
      @apply text-gray-500;
      @apply border-gray-100 bg-gray-100;
    }
  }

  .error-input {
    @apply border-red-300 !important;

    &:hover {
      @apply border-red-400 !important;
    }

    &:focus {
      @apply border-red-500 ring-red-100 !important;
    }
  }
}

.label {
  @apply absolute font-normal text-gray-500;

  &-sm {
    @apply text-xs;
    @apply left-4 top-2;
  }

  &-md {
    @apply text-sm;
    @apply left-4 top-2.5;
  }

  &-lg {
    @apply text-base;
    @apply left-4 top-3;
  }
}

.error {
  &-message {
    @apply text-xs font-normal text-red-500;
    @apply mt-2 pl-4;
  }

  &-label {
    @apply text-red-500;
  }
}

.size {
  &-sm {
    .right-slot-label {
      @apply top-[3.125rem];
    }

    &.right-slot:deep(.input) {
      @apply md:pb-2 !important;
    }

    &:deep(.input) {
      @apply text-xs;
      @apply pb-2 pt-8;

      &::placeholder {
        @apply text-xs font-normal;
      }
    }
  }

  &-md {
    .right-slot-label {
      @apply top-14;
    }

    &.right-slot:deep(.input) {
      @apply md:pb-2 !important;
    }

    &:deep(.input) {
      @apply text-base;
      @apply pb-2.5 pt-7;

      &::placeholder {
        @apply text-base font-normal;
      }
    }
  }

  &-lg {
    .right-slot-label {
      @apply top-[3.875rem];
    }

    &.right-slot:deep(.input) {
      @apply md:pb-3 !important;
    }

    &:deep(.input) {
      @apply text-lg;
      @apply pb-3 pt-8;

      &::placeholder {
        @apply text-lg font-normal;
      }
    }
  }
}

.right-slot {
  &:deep(.input) {
    @apply pb-11;
  }
}
</style>
