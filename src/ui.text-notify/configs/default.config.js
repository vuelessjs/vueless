export default /*tw*/ {
  wrapper: "absolute overflow-visible md:w-[22rem]",
  transitionGroup: {
    moveClass: "transition duration-500",
    enterActiveClass: "transition duration-500",
    leaveActiveClass: "transition duration-500 absolute",
    enterFromClass: "opacity-0",
    leaveToClass: "opacity-0",
  },
  body: `
    mb-3 flex w-full items-center justify-center gap-3 rounded-2xl bg-gray-900/90
    p-4 shadow-[0_4px_16px_rgba(17,24,39,0.5)] backdrop-blur-md md:shadow-[0_0px_12px_rgba(0,0,0,0.25)]
  `,
  bodySuccess: "bg-[radial-gradient(100.16%_500.78%_at_0%_50%,rgba(74,222,128,0.1)_2.17%,transparent)]",
  bodyWarning: "bg-[radial-gradient(100.16%_500.78%_at_0%_50%,rgba(251,146,60,0.2)_2.17%,transparent)]",
  bodyError: "bg-[radial-gradient(100.16%_500.78%_at_0%_50%,rgba(251,113,133,0.2)_2.17%,transparent)]",
  content: "w-full flex flex-col max-w-full text-sm text-gray-200",
  label: "mb-0.5 font-medium",
  description: "break-words font-normal",
  successIcon: "",
  warningIcon: "",
  errorIcon: "",
  closeIcon: "",
  positionClasses: {
    page: "UNotifyPage",
    aside: "UNotifyAside",
  },
  duration: {
    short: 4000,
    medium: 8000,
    long: 12000,
  },
  i18n: {
    success: {
      default: "Operation successful.",
    },
    warning: {
      default: "Operation warning.",
    },
    error: {
      default: "Operation error.",
    },
  },
  defaults: {
    successIcon: "check_circle",
    warningIcon: "warning",
    errorIcon: "error",
    closeIcon: "close",
    xPosition: "center",
    yPosition: "top",
  },
};
