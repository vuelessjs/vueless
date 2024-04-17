export default /*tw*/ {
  input: "",
  inputActive: {
    block: {
      base: "ring-4 ring-gray-600/[.15] border-gray-500 hover:border-gray-500",
    },
  },
  calendar: "absolute z-40 mt-2",
  calendarTransition: {
    enterFromClass: "opacity-0 scale-95",
    enterActiveClass: "transition transform ease-out duration-100",
    enterToClass: "opacity-100 scale-100",
    leaveFromClass: "opacity-100 scale-100",
    leaveActiveClass: "transition transform ease-in duration-75",
    leaveToClass: "opacity-0 scale-95",
  },
  defaultVariants: {
    dateFormat: "Y-m-d",
    userFormat: "F j, Y",
    size: "md",
    timepicker: false,
    disabled: false,
    maxDate: undefined,
    minDate: undefined,
  },
};
