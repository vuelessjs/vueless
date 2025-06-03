export default /*tw*/ {
  header: {
    base: "text-{color} font-medium",
    variants: {
      size: {
        xs: "text-lg",
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
        "2xl": "text-5xl",
      },
      line: {
        true: "!leading-none",
      },
    },
  },
  defaults: {
    color: "grayscale",
    size: "md",
    tag: "div",
    line: true,
  },
};
