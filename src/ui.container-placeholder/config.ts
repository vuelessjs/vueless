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
  label: "text-small text-{color} select-none",
  defaults: {
    color: "neutral",
    rounded: "md",
    dashed: false,
    dotted: false,
  },
};
