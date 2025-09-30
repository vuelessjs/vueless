export default /*tw*/ {
  wrapper: "fixed inset-0 z-50 outline-hidden",
  wrapperTransition: {
    base: {
      enterActiveClass: "ease-out duration-300",
      leaveActiveClass: "ease-in duration-200",
    },
    variants: {
      position: {
        top: {
          enterFromClass: "opacity-0 -translate-y-full",
          enterToClass: "opacity-100 translate-y-0",
          leaveFromClass: "opacity-100 translate-y-0",
          leaveToClass: "opacity-0 -translate-y-full",
        },
        bottom: {
          enterFromClass: "opacity-0 translate-y-full",
          enterToClass: "opacity-100 translate-y-0",
          leaveFromClass: "opacity-100 translate-y-0",
          leaveToClass: "opacity-0 translate-y-full",
        },
        left: {
          enterFromClass: "opacity-0 -translate-x-full",
          enterToClass: "opacity-100 translate-x-0",
          leaveFromClass: "opacity-100 translate-x-0",
          leaveToClass: "opacity-0 -translate-x-full",
        },
        right: {
          enterFromClass: "opacity-0 translate-x-full",
          enterToClass: "opacity-100 translate-x-0",
          leaveFromClass: "opacity-100 translate-x-0",
          leaveToClass: "opacity-0 translate-x-full",
        },
      },
    },
  },
  overlay: "fixed inset-0 z-40 bg-inverted/15 dark:bg-lifted/75 backdrop-blur-md",
  overlayTransition: {
    enterActiveClass: "ease-out duration-300",
    enterFromClass: "opacity-0",
    enterToClass: "opacity-100",
    leaveActiveClass: "ease-in duration-200",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0",
  },
  innerWrapper: {
    base: "h-full relative", // add overflow-y
    variants: {
      inset: {
        true: "m-4 h-[calc(100%-2rem)]",
      },
    },
  },
  header: {
    base: "flex justify-between px-4 md:px-6 py-6",
    compoundVariants: [
      { handle: true, position: "left", class: "!pr-0" },
      { handle: true, position: "right", class: "!pl-0" },
      { handle: true, position: "bottom", class: "!pt-0" },
    ],
  },
  beforeTitle: "flex items-center gap-3",
  titleFallback: "flex flex-col",
  title: "{UHeader}",
  description: "mt-1.5 text-medium font-normal text-lifted",
  body: {
    base: "px-4 md:px-6 pb-6 text-medium",
    compoundVariants: [
      { handle: true, position: "left", class: "!pr-0" },
      { handle: true, position: "right", class: "!pl-0" },
      { handle: true, position: "top", class: "!pb-0" },
    ],
  },
  footer: {
    base: "flex justify-between px-4 md:px-6 py-6 max-md:flex-col max-md:gap-4",
    variants: {
      divided: {
        true: "border-t border-muted",
        false: "pt-0",
      },
    },
    compoundVariants: [
      { handle: true, position: "left", class: "!pr-0" },
      { handle: true, position: "right", class: "!pl-0" },
    ],
  },
  footerLeft: "flex flex-col md:flex-row gap-4 w-full",
  footerRight: "flex flex-col md:flex-row gap-4 w-full justify-end",
  drawerWrapper: {
    base: "flex border absolute select-none cursor-grab active:cursor-grabbing overflow-x-hidden overflow-y-auto",
    variants: {
      variant: {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
      },
      position: {
        top: "top-0 flex-col rounded-b-large w-full h-auto",
        bottom: "bottom-0 flex-col-reverse rounded-t-large w-full h-auto",
        left: "left-0 flex-row rounded-r-large w-max h-full",
        right: "right-0 flex-row-reverse rounded-l-large w-max h-full",
      },
      inset: {
        true: "rounded-large",
      },
    },
  },
  drawer: "",
  handleWrapper: {
    base: "flex items-center justify-center bg-inherit",
    variants: {
      position: {
        top: "w-full h-11",
        bottom: "w-full h-11",
        left: "w-11 h-auto",
        right: "w-11 h-auto",
      },
    },
  },
  handle: {
    base: "rounded-large cursor-pointer bg-lifted hover:bg-accented transition",
    compoundVariants: [
      { position: ["top", "bottom"], class: "w-11 h-1.5" },
      { position: ["left", "right"], class: "w-1.5 h-11" },
    ],
  },
  defaults: {
    variant: "solid",
    position: "left",
    inset: false,
    handle: true,
    divided: true,
    closeOnEsc: true,
    closeOnOverlay: true,
  },
};
