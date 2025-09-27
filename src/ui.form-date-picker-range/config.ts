export default /*tw*/ {
  wrapper: "relative",
  datepickerInput: "{UInput}",
  datepickerInputActive: {
    base: "{>datepickerInput}",
    wrapper: {
      base: "outline outline-small outline-primary border-primary hover:border-primary",
      variants: {
        error: {
          true: "border-error hover:border-error outline-error",
        },
      },
    },
  },
  rightIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  rangeButton: "flex rounded-medium max-md:justify-between",
  rangeButtonSelect: "{UButton} shrink-0 grow rounded-none",
  rangeButtonShift: `
    first:rounded-medium first:rounded-r-none
    last:rounded-medium last:rounded-l-none
  `,
  menu: {
    base: `
      absolute z-40 mb-3 w-80 overflow-hidden rounded-medium
      border border-solid border-default bg-default p-2 shadow-sm focus:outline-hidden
    `,
    variants: {
      openDirectionX: {
        left: "left-0 right-auto",
        right: "right-0 left-auto",
      },
      openDirectionY: {
        top: "bottom-full mt-0",
        bottom: "top-full mb-0",
      },
    },
    compoundVariants: [
      { error: true, variant: ["button", "input"], class: "-mt-2" },
      { description: true, variant: ["button", "input"], class: "-mt-2" },
      { description: false, error: false, variant: ["button", "input"], class: "mt-2" },
    ],
  },
  menuTransition: {
    enterFromClass: "opacity-0 scale-95",
    enterActiveClass: "transition transform ease-out duration-100",
    enterToClass: "opacity-100 scale-100",
    leaveFromClass: "opacity-100 scale-100",
    leaveActiveClass: "transition transform ease-in duration-75",
    leaveToClass: "opacity-0 scale-95",
  },
  periodRow: "mb-1 flex min-w-64 gap-1",
  periodButton: "{UButton} h-[3.125rem] w-full",
  periodButtonActive: "{>periodButton} !bg-grayscale-accented/15",
  rangeSwitchWrapper: "flex items-center justify-between py-2",
  rangeSwitchButton: "{UButton}",
  rangeSwitchTitle: "font-medium text-medium",
  periodDateList: {
    base: "grid grid-rows-1 gap-0.5",
    variants: {
      month: {
        true: "grid-cols-3",
      },
      year: {
        true: "grid-cols-3",
      },
    },
  },
  periodDate: "w-full",
  periodDateSelected: "{>periodDate}",
  periodDateCurrent: "{>periodDate} border-2 border-primary",
  periodDateCurrentSelected: "{>periodDate} {>periodDateSelected} {>periodDateCurrent}",
  customRangeButton: {
    base: "{>periodButton}",
    variants: {
      customRangeButtonDescription: {
        true: "flex-col",
      },
    },
  },
  customRangeDescription: "",
  rangeInputWrapper: "flex mt-4 group/range-input-wrapper",
  rangeInput: {
    base: "{UInput}",
    inputLabel: {
      base: "{ULabel}",
      wrapper: "w-full transition",
      description: "hidden",
    },
    wrapper: "focus-within:z-10",
  },
  rangeInputFirst: {
    base: "{UInput} {>rangeInput}",
    wrapper: "!rounded-r-none",
  },
  rangeInputLast: {
    base: "{UInput} {>rangeInput}",
    wrapper: "!rounded-l-none",
  },
  rangeInputError: "text-small font-normal leading-none mt-2 text-center text-red-500",
  datepickerCalendar: {
    base: "{UCalendar}",
    wrapper: "p-0 pt-2 w-full border-none shadow-none rounded-none",
    navigation: "pb-0 mb-0 border-none",
    day: "w-full",
  },
  i18n: {
    ownRange: "Own range",
    week: "Week",
    month: "Month",
    quarter: "Quarter",
    year: "Year",
    dateFormatWithDot: "The date should be in format 'dd.mm.yyyy'.",
    notCorrectMonthNumber: "Wrong month number.",
    notCorrectDayNumber: "Wrong day in month.",
    fromDateGraterThanSecond: "The 'from' date should be less than the 'to' date.",
    toDateSmallerThanFirst: "The 'to' date should be greater than the 'from' date.",
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    weekdays: {
      shorthand: {
        sunday: "Sun",
        monday: "Mon",
        tuesday: "Tue",
        wednesday: "Wed",
        thursday: "Thu",
        friday: "Fri",
        saturday: "Sat",
      },
      longhand: {
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
      },
      userFormat: {
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
      },
    },
    months: {
      shorthand: {
        january: "Jan",
        february: "Feb",
        march: "Mar",
        april: "Apr",
        may: "May",
        june: "Jun",
        july: "Jul",
        august: "Aug",
        september: "Sep",
        october: "Oct",
        november: "Nov",
        december: "Dec",
      },
      longhand: {
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
      },
      userFormat: {
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
      },
    },
  },
  defaults: {
    userDateFormat: "j F Y",
    size: "md",
    variant: "input",
    labelAlign: "topInside",
    openDirectionX: "auto",
    openDirectionY: "auto",
    disabled: false,
    dateFormat: undefined,
    maxDate: undefined,
    minDate: undefined,
    /* icons */
    calendarIcon: "calendar_month-fill",
    nextIcon: "keyboard_arrow_right",
    prevIcon: "keyboard_arrow_left",
    ownRangeIcon: "apps",
  },
};
