export default /*tw*/ {
  wrapper: {
    base: "flex items-center justify-center w-full h-full border-2 border-{color} transition-all",
    variants: {
      color: {
        neutral: "border-muted",
      },
      rounded: {
        true: "rounded-large",
        false: "",
      },
      dashed: {
        true: "border-dashed",
        false: "border-solid",
      },
      inset: {
        true: "m-4",
        false: "",
      },
    },
  },
  content: {
    base: "flex items-center justify-center",
  },
  label: {
    base: "text-small text-{color} select-none",
    variants: {
      color: {
        neutral: "text-lifted",
      },
    },
  },
  defaults: {
    color: "neutral",
    rounded: true,
    dashed: true,
    inset: false,
  },
};
