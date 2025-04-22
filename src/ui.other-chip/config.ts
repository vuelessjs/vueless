export default /*tw*/ {
  wrapper: {
    base: "relative w-fit",
    variants: {
      icon: {
        true: "flex flex-row-reverse",
      },
    },
  },
  chipDot: {
    base: "{UDot} absolute",
    variants: {
      text: {
        true: "inline-flex justify-center items-center",
      },
      size: {
        sm: "size-2",
        md: "size-2.5",
        lg: "size-3",
      },
      yPosition: {
        top: "top-0",
        bottom: "bottom-0 translate-y-1/2",
      },
      xPosition: {
        left: "left-0 -translate-x-1/2",
        right: "right-0",
      },
    },
    compoundVariants: [
      { text: true, size: "sm", class: "min-w-1.5 w-auto h-auto px-1" },
      { text: true, size: "md", class: "min-w-2 w-auto h-auto px-1.5" },
      { text: true, size: "lg", class: "min-w-3 w-auto h-auto px-1.5" },
      { inset: false, yPosition: "top", class: "-translate-y-1/2" },
      { inset: false, xPosition: "bottom", class: "translate-y-1/2" },
      { inset: false, xPosition: "left", class: "-translate-x-1/2" },
      { inset: false, xPosition: "right", class: "translate-x-1/2" },
    ],
  },
  chipIcon: {
    base: "{UIcon} -translate-y-1/2",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  chipText: {
    base: "{UText} text-inverted",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  defaults: {
    color: "primary",
    size: "md",
    yPosition: "top",
    xPosition: "right",
    inset: false,
  },
};
