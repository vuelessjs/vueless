export default /*tw*/ {
  wrapper: "relative",
  input: "",
  inputActive: {
    block: {
      base: "ring-4 ring-brand-600/[.15] border-brand-500 hover:border-brand-500",
    },
  },
  buttonWrapper: "flex h-full rounded-lg focus-within:ring-4 focus-within:ring-brand-600/[.15] max-md:justify-between",
  button: `
    shrink-0 grow rounded-none border-0 bg-zinc-100 py-2 text-base font-medium text-gray-900 shadow-none
    hover:bg-zinc-200 hover:ring-brand-600/[.15] focus:border-0 focus:bg-zinc-200 focus:ring-0 focus:ring-brand-600/[.15]
    active:bg-zinc-200 disabled:cursor-not-allowed
  `,
  buttonActive: "border-0 hover:bg-zinc-200 ring-0 ring-brand-600/[.15] bg-zinc-200",
  buttonWrapperActive: "ring-4 ring-brand-600/[.15]",
  shiftRangeButton: `
    focus:bg-bg-zinc-200 flex items-center border-0 bg-zinc-100 py-[0.71875rem] shadow-none
    hover:bg-zinc-200 hover:ring-brand-600/[.15] focus:border-0 focus:ring-0 focus:ring-brand-600/[.15] active:bg-zinc-200
    disabled:cursor-not-allowed last:rounded-l-none last:rounded-r-lg first:rounded-l-lg first:rounded-r-none
  `,
  menu: {
    base: "absolute z-40 my-2 w-80 overflow-hidden rounded-lg border border-brand-300 bg-white p-2 shadow focus:outline-none",
    variants: {
      openDirectionX: {
        left: "left-0",
        right: "right-0",
      },
      openDirectionY: {
        top: "bottom-full mt-0",
      },
    },
  },
  menuTransition: {
    enterFromClass: "opacity-0 scale-95",
    enterActiveClass: "transition transform ease-out duration-100",
    enterToClass: "opacity-100 scale-100",
    leaveFromClass: "opacity-100 scale-100",
    leaveActiveClass: "transition transform ease-in duration-75",
    leaveToClass: "opacity-0 scale-95",
  },
  periodsRow: "mb-1 flex min-w-64 gap-1",
  periodButton: `
    flex h-[3.125rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-zinc-100
    px-1.5 py-2.5 text-center text-xs font-medium text-brand-900 hover:bg-brand-200
    [&_span]:block [&_span]:font-normal [&_span]:text-brand-500
  `,
  periodButtonIcon: "",
  periodButtonIconName: "apps",
  periodButtonActive: "bg-zinc-200",
  rangeSwitchWrapper: "mb-2.5 mt-4 flex items-center justify-between py-2",
  rangeSwitchTitle: "font-medium text-sm",
  nextIcon: "",
  nextIconName: "keyboard_arrow_right",
  prevIcon: "",
  prevIconName: "keyboard_arrow_left",
  periodDateList: "",
  periodDateMonthList: "grid grid-cols-3 grid-rows-1 gap-0.5",
  periodDateWeekList: "",
  periodDateYearList: "grid grid-cols-3 grid-rows-1 gap-0.5",
  periodDateQuarterList: "",
  periodDate: `
    cursor-pointer block w-full rounded-lg py-3 text-center text-sm font-medium text-gray-900 hover:rounded-lg hover:bg-brand-50
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  periodDateActive: "bg-zinc-100",
  rangeInputWrapper: "flex mt-4",
  rangeInput: {
    block: `focus-within:z-10 group-first/range-input-wrapper:rounded-r-none group-last/range-input-wrapper:rounded-l-none`,
    label: {
      wrapper: "group/range-input-wrapper",
      description: "hidden",
    },
    input: {
      base: "text-sm border-brand-100 px-4 py-2.5",
      variants: {
        size: {
          md: "pt-2.5 pb-2.5",
        },
      },
    },
  },
  inputRangeError: "text-xs font-normal !leading-none mt-2 text-center text-red-500",
  calendar: {
    wrapper: "p-0 mt-2 w-full border-none shadow-none",
    dayViewWrapper: "p-0 w-full",
    monthViewWrapper: "p-0 w-full",
    yearViewWrapper: "p-0 w-full",
    dayViewSwitchLabel: "font-medium text-brand-900",
    nextPrevButton: "p-0 py-2 hover:bg-transparent",
    navigation: "px-0 w-full",
    nextIcon: {
      defaultVariants: {
        variant: "grayscale",
        size: "sm",
      },
    },
    prevIcon: {
      defaultVariants: {
        variant: "grayscale",
        size: "sm",
      },
    },
    day: "font-medium w-full h-10 text-sm mb-0.5",
    currentDay: "text-white bg-brand-900 hover:bg-brand-900 hover:text-white",
    weekDay: "text-sm size-10",
    month: "font-medium",
    selectedMonth: "bg-zinc-100 text-brand-900 hover:text-white",
    year: "font-medium",
    selectedYear: "bg-zinc-100 text-brand-900 hover:text-white",
  },
  i18n: {
    lastThirtyDays: "Last 30 days <span> and 2 next two weeks </span>",
    ownRange: "Own range",
    week: "Week",
    month: "Month",
    quarter: "Quarter",
    year: "Year",
    dateFormatWithDot: "Date should be in format 'dd.mm.yyyy'.",
    notCorrectMonthNumber: "Wrong month number.",
    notCorrectDayNumber: "Wrong day in month.",
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
  defaultVariants: {
    size: "md",
    variant: "button",
    openDirectionX: "auto",
    openDirectionY: "auto",
    timepicker: false,
    disabled: false,
    dateFormat: "d.m.Y",
    maxDate: undefined,
    minDate: undefined,
  },
};
