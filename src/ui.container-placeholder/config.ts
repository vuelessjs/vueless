export default /*tw*/ {
  wrapper: {
    base: `
      flex items-center justify-center w-full h-full
      border-solid border-2 border-{color}/15
    `,
    variants: {
      rounded: {
        sm: "rounded-small",
        md: "rounded-medium",
        lg: "rounded-large",
        none: "rounded-none",
      },
      dashed: {
        true: "border-dashed",
      },
      dotted: {
        true: "border-dotted",
      },
    },
  },
  content: "flex items-center justify-center",
  label: {
    base: "text-{color} select-none",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  defaults: {
    color: "neutral",
    size: "md",
    rounded: "md",
    dashed: false,
    dotted: false,
  },
};
