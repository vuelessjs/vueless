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
    base: "h-full relative",
    variants: {
      inset: {
        true: "m-4",
      },
    },
  },
  header: "flex justify-between px-4 md:px-6 py-6",
  beforeTitle: "flex items-center gap-3",
  titleFallback: "flex flex-col",
  title: "{UHeader}",
  description: "mt-1.5 text-medium font-normal text-lifted",
  body: "px-4 md:px-6 pb-6 text-medium",
  footer: {
    base: "flex justify-between px-4 md:px-6 py-6 max-md:flex-col max-md:gap-4",
    variants: {
      divided: {
        true: "border-t",
        false: "pt-0",
      },
    },
    compoundVariants: [
      { divided: true, variant: ["subtle", "soft"], class: "border-default/50" },
      { divided: true, variant: ["solid", "outlined"], class: "border-muted" },
    ],
  },
  footerLeft: "flex flex-col md:flex-row gap-4 w-full",
  footerRight: "flex flex-col md:flex-row gap-4 w-full justify-end",
  drawer: {
    base: "absolute select-none cursor-grab active:cursor-grabbing",
    variants: {
      position: {
        top: "top-0 rounded-b-large w-full h-auto",
        bottom: "bottom-0 rounded-t-large w-full h-auto",
        left: "left-0 rounded-r-large w-max h-full",
        right: "right-0 rounded-l-large w-max h-full",
      },
      inset: {
        true: "rounded-large mx-auto",
      },
      dragging: {
        true: "opacity-60 transition-opacity duration-300",
      },
    },
    compoundVariants: [
      { handle: true, class: "rounded-none" },
      { variant: ["subtle", "soft"], class: "bg-muted" },
      { variant: ["solid", "outlined"], class: "bg-default" },
      { inset: true, position: "top", class: "rounded-t-large" },
      { inset: true, position: "bottom", class: "rounded-b-large" },
      { inset: true, position: "left", class: "rounded-l-large" },
      { inset: true, position: "right", class: "rounded-r-large" },
    ],
  },
  handleWrapper: {
    base: "flex items-center justify-center bg-inherit absolute",
    variants: {
      variant: {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
      },
      position: {
        top: "top-full border-b rounded-b-large w-full h-11",
        bottom: "bottom-full border-t rounded-t-large w-full h-11",
        left: "left-full border-r rounded-r-large w-11 h-full",
        right: "right-full border-l rounded-l-large w-11 h-full",
      },
      inset: {
        true: "mx-auto",
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
