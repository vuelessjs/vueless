export default /*tw*/ {
  wrapper: "relative",
  input: "{UInput}",
  inputFocused: {
    component: "{UInput}",
    block: "ring-dynamic ring-offset-dynamic ring-brand-600/[.15] border-brand-500 hover:border-brand-500",
  },
  calendar: {
    component: "{UCalendar}",
    base: "absolute z-40 my-2",
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
  calendarTransition: {
    enterFromClass: "opacity-0 scale-95",
    enterActiveClass: "transition transform ease-out duration-100",
    enterToClass: "opacity-100 scale-100",
    leaveFromClass: "opacity-100 scale-100",
    leaveActiveClass: "transition transform ease-in duration-75",
    leaveToClass: "opacity-0 scale-95",
  },
  i18n: {
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
    timeLabel: "Time",
    okLabel: "Ok",
  },
  defaultVariants: {
    userFormat: "F j, Y",
    size: "md",
    openDirectionX: "auto",
    openDirectionY: "auto",
    timepicker: false,
    disabled: false,
    dateFormat: undefined,
    maxDate: undefined,
    minDate: undefined,
  },
};
