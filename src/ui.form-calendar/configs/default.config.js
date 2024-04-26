export default /*tw*/ {
  wrapper: "w-fit overflow-hidden rounded-lg border focus:outline-none border-brand-300 bg-white px-1 pb-4 shadow",
  navigation: "flex items-center justify-between px-3 pt-2",
  navigationSwitchViewButton: "",
  dayViewSwitchLabel: "flex gap-1",
  dayViewSwitchLabelMonth: "text-brand-900",
  dayViewSwitchLabelIcon: "",
  dayViewSwitchLabelIconName: "keyboard_arrow_right",
  nextPrevWrapper: {
    base: "flex",
    variants: {
      range: {
        true: "justify-between items-center w-full",
      },
    },
  },
  nextPrevButton: "",
  nextIcon: "",
  nextIconName: "keyboard_arrow_right",
  prevIcon: "",
  prevIconName: "keyboard_arrow_left",
  dayViewWrapper: "w-64 px-3 pt-2",
  weekDaysWrapper: "grid grid-cols-7",
  weekDay: "flex size-8 items-center justify-center text-xs uppercase text-brand-500",
  daysWrapper: "grid grid-cols-7",
  day: "mx-auto size-8 rounded-lg text-sm hover:bg-brand-100 disabled:opacity-50 disabled:cursor-not-allowed",
  activeDay: "bg-brand-100 hover:bg-brand-100",
  inRangeFirstDay: "rounded-none rounded-l-lg bg-brand-200 text-brand-900 hover:bg-brand-200",
  inRangeLastDay: "rounded-none rounded-r-lg bg-brand-200 text-brand-900 hover:bg-brand-200",
  inRangeDay: "bg-brand-100 text-brand-900 hover:!bg-brand-200 rounded-none",
  selectedDay: "bg-brand-900 text-white hover:bg-brand-900",
  currentDay: "hover:bg-brand-100 border-2 border-brand-900",
  anotherMonthDay: "hover:bg-brand-100 text-brand-400",
  monthViewWrapper: "grid w-64 grid-cols-4 items-center justify-center px-3 pt-2",
  month: `
    mx-auto flex h-12 w-full items-center justify-center rounded-lg text-sm hover:cursor-pointer hover:bg-brand-100
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  selectedMonth: "bg-brand-900 hover:bg-brand-900 text-white",
  activeMonth: "bg-brand-100",
  yearViewWrapper: "grid w-64 grid-cols-4 items-center justify-center px-3 pt-2",
  year: `
    mx-auto flex h-12 w-full items-center justify-center rounded-lg text-sm hover:cursor-pointer hover:bg-brand-100
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  selectedYear: "bg-brand-900 hover:bg-brand-900 text-white",
  activeYear: "bg-brand-100",
  timepickerWrapper: `
  mx-2 -mb-1 mt-2 flex items-center justify-between gap-2 border-t border-brand-200 pl-2 pr-1 pt-3 text-sm
  `,
  timepickerLabel: "w-full",
  timepickerInputWrapper: "flex items-center gap-px rounded-lg border border-brand-300",
  timepickerLeftInput: `
    w-11 rounded-l-lg border-none px-2.5 py-1.5 text-center text-sm focus:border-none focus:outline-none
  `,
  timepickerRightInput: `
    w-11 rounded-r-lg border-none px-2.5 py-1.5 text-center text-sm focus:border-none focus:outline-none
  `,
  submitButton: `
    rounded-lg border-none bg-brand-900/10 px-2.5 py-1.5 text-sm font-normal text-brand-900 outline-none
    focus:ring-0 hover:bg-brand-900/10
  `,
  i18n: {
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
    timeLabel: "Time",
    okLabel: "Ok",
  },
  defaultVariants: {
    dateFormat: "Y-m-d",
    userFormat: "F j, Y",
    range: false,
    timepicker: false,
    maxDate: undefined,
    minDate: undefined,
  },
};
