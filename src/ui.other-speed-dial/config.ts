export default /*tw*/ {
  wrapper: {
    base: "relative inline-flex",
    variants: {
      direction: {
        up: "flex-col-reverse",
        down: "flex-col",
        left: "flex-row-reverse",
        right: "flex-row",
        circle: "flex-col-reverse",
      },
    },
  },
  mask: "fixed inset-0 z-40 bg-inverted/15 dark:bg-lifted/75 backdrop-blur-sm",
  maskTransition: {
    enterActiveClass: "ease-out duration-200",
    enterFromClass: "opacity-0",
    enterToClass: "opacity-100",
    leaveActiveClass: "ease-in duration-150",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0",
  },
  actionsWrapper: {
    base: "flex gap-2 z-50",
    variants: {
      direction: {
        up: "flex-col-reverse mb-2",
        down: "flex-col mt-2",
        left: "flex-row-reverse mr-2",
        right: "flex-row ml-2",
        circle: "flex-col-reverse mb-2",
      },
      opened: {
        true: "pointer-events-auto",
        false: "pointer-events-none",
      },
    },
  },
  actionButton: {
    base: `
      flex items-center justify-center rounded-full border border-solid
      transition-all cursor-pointer shadow-lg bg-default border-muted text-default
      hover:bg-muted hover:border-default active:bg-default/90
      focus-visible:outline-medium focus-visible:outline-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
    `,
    variants: {
      size: {
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-14 h-14",
      },
    },
  },
  actionIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  actionLabel: {
    base: `
      absolute whitespace-nowrap px-3 py-1.5 rounded-medium
      bg-inverted text-inverted text-small font-medium shadow-md
      pointer-events-none opacity-0 transition-opacity
    `,
    variants: {
      direction: {
        up: "top-1/2 -translate-y-1/2 right-full mr-2",
        down: "top-1/2 -translate-y-1/2 right-full mr-2",
        left: "top-full mt-2 left-1/2 -translate-x-1/2",
        right: "top-full mt-2 left-1/2 -translate-x-1/2",
        circle: "top-1/2 -translate-y-1/2 right-full mr-2",
      },
      visible: {
        true: "opacity-100",
      },
    },
  },
  mainButton: {
    base: `
      flex items-center justify-center rounded-full border border-solid
      transition-all cursor-pointer shadow-xl z-50
      bg-{color} border-transparent text-inverted
      hover:bg-{color}-lifted active:bg-{color}-accented
      focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:outline-{color}
      disabled:cursor-not-allowed disabled:opacity-50
    `,
    variants: {
      size: {
        sm: "w-12 h-12",
        md: "w-14 h-14",
        lg: "w-16 h-16",
      },
      opened: {
        true: "rotate-45",
        false: "rotate-0",
      },
    },
  },
  mainIcon: {
    base: "{UIcon} transition-transform",
    defaults: {
      size: {
        sm: "sm",
        md: "md",
        lg: "lg",
      },
    },
  },
  itemTransition: {
    enterActiveClass: "transition-all ease-out",
    enterFromClass: "opacity-0 scale-0",
    enterToClass: "opacity-100 scale-100",
    leaveActiveClass: "transition-all ease-in",
    leaveFromClass: "opacity-100 scale-100",
    leaveToClass: "opacity-0 scale-0",
  },
  defaults: {
    direction: "up",
    trigger: "click",
    transitionDuration: 150,
    icon: "add",
    size: "md",
    color: "primary",
    mask: false,
    disabled: false,
  },
};

