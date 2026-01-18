export default /*tw*/ {
  wrapper: "fixed inset-0 z-50 outline-hidden",
  wrapperTransitionTop: {
    enterActiveClass: "ease-out duration-300",
    leaveActiveClass: "ease-in duration-200",
    enterFromClass: "opacity-0 -translate-y-full",
    enterToClass: "opacity-100 translate-y-0",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 -translate-y-full",
  },
  wrapperTransitionBottom: {
    enterActiveClass: "ease-out duration-300",
    leaveActiveClass: "ease-in duration-200",
    enterFromClass: "opacity-0 translate-y-full",
    enterToClass: "opacity-100 translate-y-0",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 translate-y-full",
  },
  wrapperTransitionLeft: {
    enterActiveClass: "ease-out duration-300",
    leaveActiveClass: "ease-in duration-200",
    enterFromClass: "opacity-0 -translate-x-full",
    enterToClass: "opacity-100 translate-x-0",
    leaveFromClass: "opacity-100 translate-x-0",
    leaveToClass: "opacity-0 -translate-x-full",
  },
  wrapperTransitionRight: {
    enterActiveClass: "ease-out duration-300",
    leaveActiveClass: "ease-in duration-200",
    enterFromClass: "opacity-0 translate-x-full",
    enterToClass: "opacity-100 translate-x-0",
    leaveFromClass: "opacity-100 translate-x-0",
    leaveToClass: "opacity-0 translate-x-full",
  },
  overlay: "fixed inset-0 z-40 bg-inverted/15 dark:bg-lifted/75",
  overlayTransition: {
    enterActiveClass: "ease-out duration-300",
    enterFromClass: "opacity-0",
    enterToClass: "opacity-100",
    leaveActiveClass: "ease-in duration-200",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0",
  },
  innerWrapper: {
    base: "h-full relative",
    variants: {
      inset: {
        true: "m-4 h-[calc(100%-2rem)]",
      },
    },
  },
  header: {
    base: "flex justify-between p-6",
    compoundVariants: [
      { handle: true, position: "left", class: "pr-0" },
      { handle: true, position: "right", class: "pl-0" },
      { handle: true, position: "bottom", class: "pt-0" },
    ],
  },
  beforeTitle: "flex items-center gap-3",
  titleFallback: "flex flex-col",
  title: "{UHeader}",
  closeIcon: "{UIcon}",
  closeButton: "{UButton} h-fit",
  description: "mt-1.5 text-medium font-normal text-lifted",
  body: {
    base: "px-6 pb-6 text-medium",
    compoundVariants: [
      { handle: true, position: "left", class: "pr-0" },
      { handle: true, position: "right", class: "pl-0" },
      { handle: true, position: "top", class: "pb-0" },
    ],
  },
  footer: {
    base: "flex justify-between p-6 max-md:flex-col max-md:gap-4 border-t border-muted",
    compoundVariants: [
      { handle: true, position: "left", class: "pr-0" },
      { handle: true, position: "right", class: "pl-0" },
    ],
  },
  footerLeft: "flex flex-col md:flex-row gap-4 w-full",
  footerRight: "flex flex-col md:flex-row gap-4 w-full justify-end",
  drawerWrapper: {
    base: "flex border absolute overflow-x-hidden",
    variants: {
      variant: {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
        inverted: "bg-inverted border-transparent",
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
  drawer: "overflow-y-auto",
  handleWrapper: {
    base: "flex items-center justify-center bg-inherit cursor-grab active:cursor-grabbing select-none",
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
    base: "rounded-large cursor-grab active:cursor-grabbing bg-lifted hover:bg-accented transition",
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
    closeOnEsc: true,
    closeOnCross: true,
    closeOnOverlay: true,
    /* icons */
    closeIcon: "close",
  },
};
