export default /*tw*/ {
  wrapper: "w-fit overflow-hidden rounded-lg border focus:outline-none border-gray-300 bg-white px-1 pb-4 shadow",
  navigation: "flex items-center justify-between px-3 pt-2",
  navigationSwitchViewButton: "",
  dayViewSwitchLabel: "flex gap-1",
  dayViewSwitchLabelMonth: "text-gray-900",
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
  weekDay: "flex size-8 items-center justify-center text-xs uppercase text-gray-500",
  daysWrapper: "grid grid-cols-7",
  day: "mx-auto w-full h-8 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
  activeDay: "bg-gray-100 hover:bg-gray-100",
  inRangeFirstDay: "rounded-none rounded-l-lg bg-gray-200 text-gray-900",
  inRangeLastDay: "rounded-none rounded-r-lg bg-gray-200 text-gray-900",
  inRangeDay: "bg-gray-100 text-gray-900 hover:bg-gray-100 rounded-none",
  selectedDay: "bg-gray-900 text-white hover:bg-gray-900",
  currentDay: "hover:bg-gray-100 border-2 border-gray-900",
  anotherMonthDay: "hover:bg-gray-100 text-gray-400",
  monthViewWrapper: "grid w-64 grid-cols-4 items-center justify-center px-3 pt-2",
  month: `
    mx-auto flex h-12 w-full items-center justify-center rounded-lg text-sm hover:cursor-pointer hover:bg-gray-100
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  selectedMonth: "bg-gray-900 hover:bg-gray-900 text-white",
  activeMonth: "bg-gray-100",
  yearViewWrapper: "grid w-64 grid-cols-4 items-center justify-center px-3 pt-2",
  year: `
    mx-auto flex h-12 w-full items-center justify-center rounded-lg text-sm hover:cursor-pointer hover:bg-gray-100
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  selectedYear: "bg-gray-900 hover:bg-gray-900 text-white",
  activeYear: "bg-gray-100",
  timepickerWrapper: `
  mx-2 -mb-1 mt-2 flex items-center justify-between gap-2 border-t border-gray-200 pl-2 pr-1 pt-3 text-sm
  `,
  timepickerLabel: "w-full",
  timepickerInputWrapper: "flex items-center gap-px rounded-lg border border-gray-300",
  timepickerLeftInput: `
    w-11 rounded-l-lg border-none px-2.5 py-1.5 text-center text-sm focus:border-none focus:outline-none
  `,
  timepickerRightInput: `
    w-11 rounded-r-lg border-none px-2.5 py-1.5 text-center text-sm focus:border-none focus:outline-none
  `,
  submitButton: `
    rounded-lg border-none bg-gray-900/10 px-2.5 py-1.5 text-sm font-normal text-gray-900 outline-none
    focus:ring-0 hover:bg-gray-900/10
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
