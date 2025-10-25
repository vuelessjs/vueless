export default /*tw*/ {
  wrapper: "fixed inset-0 z-50 outline-hidden",
  wrapperTransition: {
    enterActiveClass: "ease-out duration-300",
    enterFromClass: "opacity-0 translate-y-4 sm:translate-y-0 transform sm:scale-95",
    enterToClass: "opacity-100 translate-y-0 transform sm:scale-100",
    leaveActiveClass: "ease-in duration-200",
    leaveFromClass: "opacity-100 translate-y-0 transform sm:scale-100",
    leaveToClass: "opacity-0 translate-y-4 sm:translate-y-0 transform sm:scale-95",
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
    base: "py-12 w-full h-screen scroll-container [scrollbar-gutter:stable]",
    variants: {
      wrapperTransitionCompleted: {
        true: "overflow-y-auto",
        false: "overflow-y-hidden",
      },
    },
  },
  header: "flex justify-between px-4 md:px-6 py-6",
  beforeTitle: "flex items-center gap-3",
  titleFallback: "flex flex-col",
  backLinkWrapper: "flex items-center gap-0.5 mb-0.5",
  backLink: "{ULink} flex items-center gap-0.5",
  backLinkIcon: "{UIcon}",
  title: "{UHeader}",
  description: "mt-1.5 text-medium font-normal text-lifted",
  closeIcon: "{UIcon}",
  closeButton: "{UButton} h-fit",
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
      { divided: true, variant: ["subtle", "soft", "inverted"], class: "border-default/50" },
      { divided: true, variant: ["solid", "outlined"], class: "border-muted" },
    ],
  },
  footerLeft: "flex flex-col md:flex-row gap-4 w-full",
  footerRight: "flex flex-col md:flex-row gap-4 w-full justify-end",
  modal: {
    base: "mx-auto rounded-large border",
    variants: {
      variant: {
        solid: "bg-default border-transparent",
        outlined: "bg-default border-muted",
        subtle: "bg-muted border-default/50",
        soft: "bg-muted border-transparent",
        inverted: "bg-inverted border-transparent",
      },
      size: {
        xs: "md:w-[25rem]",
        sm: "md:w-[31.25rem]",
        md: "md:w-[37.5rem]",
        lg: "md:w-[43.75rem]",
        xl: "md:w-[50rem]",
        "2xl": "md:w-[56.25rem]",
        "3xl": "md:w-[62.5rem]",
        "4xl": "md:w-[68.75rem]",
        "5xl": "md:w-[75rem]",
      },
      inner: {
        true: "mt-4",
      },
    },
  },
  defaults: {
    variant: "solid",
    size: "sm",
    inner: false,
    divided: true,
    closeOnEsc: true,
    closeOnCross: true,
    closeOnOverlay: true,
    /* icons */
    backIcon: "arrow_back",
    closeIcon: "close",
  },
};
