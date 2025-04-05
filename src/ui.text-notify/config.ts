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
    mb-3 p-4 flex gap-3 w-full items-center justify-center rounded-large bg-inverted/90
     shadow-[0_0px_12px_rgba(0,0,0,0.25)] shadow-grayscale/25 backdrop-blur-md
  `,
  bodySuccess: "{>body} bg-radial-[circle_at_0%_50%] from-success/25 from-2.17% to-transparent",
  bodyWarning: "{>body} bg-radial-[circle_at_0%_50%] from-warning/25 from-2.17% to-transparent",
  bodyError: "{>body} bg-radial-[circle_at_0%_50%] from-error/25 from-2.17% to-transparent",
  content: "w-full flex flex-col max-w-full text-medium text-inverted",
  label: "mb-0.5 font-medium",
  description: "break-words font-normal",
  statusIcon: "{UIcon} brightness-125 dark:brightness-75",
  successIcon: "{UIcon} {>statusIcon} text-success",
  warningIcon: "{UIcon} {>statusIcon} text-warning",
  errorIcon: "{UIcon} {>statusIcon} text-error",
  closeIcon: "{UIcon} !text-inverted opacity-75",
  positionClasses: {
    page: "UNotifyPage",
    aside: "UNotifyAside",
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
    xPosition: "center",
    yPosition: "top",
    /* icons */
    successIcon: "check_circle",
    warningIcon: "warning",
    errorIcon: "error",
    closeIcon: "close",
  },
};
