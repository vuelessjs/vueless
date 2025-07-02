export default /*tw*/ {
  wrapper: "flex relative w-fit",
  chipWrapper: {
    base: "absolute transform",
    variants: {
      yPosition: {
        top: "top-px",
        bottom: "bottom-px",
      },
      xPosition: {
        left: "left-px",
        right: "right-px",
      },
    },
    compoundVariants: [
      { inset: false, yPosition: "top", class: "-translate-y-1/2" },
      { inset: false, yPosition: "bottom", class: "translate-y-1/2" },
      { inset: false, xPosition: "left", class: "-translate-x-1/2" },
      { inset: false, xPosition: "right", class: "translate-x-1/2" },
    ],
  },
  chipDot: "{UDot} outline-small outline-(--vl-bg)",
  chipIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        xs: "4xs",
        sm: "3xs",
        md: "2xs",
        lg: "xs",
        xl: "sm",
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
