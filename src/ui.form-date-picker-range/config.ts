export default /*tw*/ {
  wrapper: "relative",
  datepickerInput: "{UInput}",
  datepickerInputActive: {
    base: "{UInput} {>datepickerInput}",
    wrapper: {
      base: "ring-dynamic rounded-dynamic ring-offset-dynamic ring-brand-700/15 border-brand-500 hover:border-brand-500",
      variants: {
        error: {
          true: "ring-red-700/15",
        },
      },
    },
  },
  buttonWrapper: {
    base: `
      flex rounded-dynamic max-md:justify-between
      focus-within:ring-dynamic focus-within:ring-offset-dynamic focus-within:ring-brand-700/15
    `,
    variants: {
      opened: {
        true: "ring-dynamic ring-offset-dynamic ring-brand-700/15",
      },
    },
  },
  button: "{UButton} shrink-0 grow rounded-none",
  shiftRangeButton: `
    first:rounded-dynamic first:rounded-r-none
    last:rounded-dynamic last:rounded-l-none
  `,
  menu: {
    base: `
      absolute z-40 mb-3 w-80 overflow-hidden rounded-dynamic
      border border-gray-300 bg-white p-2 shadow focus:outline-none
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
      { error: true, variant: "input", class: "-mt-3" },
      { description: true, variant: "input", class: "-mt-3" },
      { description: false, error: false, variant: "input", class: "mt-2" },
      { error: true, variant: "button", class: "-mt-2" },
      { description: true, variant: "button", class: "-mt-2" },
      { description: false, error: false, variant: "button", class: "mt-3" },
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
  periodButtonActive: "{>periodButton} !bg-gray-800/20",
  rangeSwitchWrapper: "flex items-center justify-between py-2",
  rangeSwitchButton: "{UButton}",
  rangeSwitchTitle: "font-medium text-sm",
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
  periodDateCurrent: "{>periodDate} border-2 border-brand-600",
  periodDateCurrentSelected: "{>periodDate} {>periodDateSelected} {>periodDateCurrent}",
  customRangeDescription: "",
  rangeInputWrapper: "flex mt-4 -space-x-px group/range-input-wrapper",
  rangeInputFirst: {
    base: "{UInput}",
    inputLabel: {
      base: "{ULabel}",
      wrapper: "w-full hover:z-10 focus:z-10 !rounded-none",
      description: "hidden",
    },
    input: "rounded-r-none",
    wrapper: `
      rounded-r-none
      focus-within:z-10 focus-within:ring-0 focus-within:border-gray-500 hover:focus-within:border-gray-500
    `,
  },
  rangeInputLast: {
    base: "{UInput}",
    inputLabel: {
      base: "{ULabel}",
      wrapper: "w-full hover:z-10 focus:z-10",
      description: "hidden",
    },
    input: "rounded-l-none",
    wrapper: `
      rounded-l-none
      focus-within:z-10 focus-within:ring-0 focus-within:border-gray-500 hover:focus-within:border-gray-500
    `,
  },
  rangeInputError: "text-xs font-normal leading-none mt-2 text-center text-red-500",
  calendar: {
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
    variant: "button",
    labelAlign: "topInside",
    openDirectionX: "auto",
    openDirectionY: "auto",
    timepicker: false,
    disabled: false,
    dateFormat: undefined,
    maxDate: undefined,
    minDate: undefined,
    /* icons */
    rightIcon: "calendar_month-fill",
    nextIcon: "keyboard_arrow_right",
    prevIcon: "keyboard_arrow_left",
    ownRangeIcon: "apps",
  },
};
