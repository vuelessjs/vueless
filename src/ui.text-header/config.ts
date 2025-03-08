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
      underlined: {
        true: "border-b border-{color}",
      },
    },
    compoundVariants: [
      { underlined: true, size: "xs", class: "pb-1.5" },
      { underlined: true, size: ["sm", "md"], class: "pb-2" },
      { underlined: true, size: ["lg", "xl"], class: "pb-2.5" },
      { underlined: true, size: "2xl", class: "pb-3" },
    ],
  },
  defaults: {
    color: "grayscale",
    size: "md",
    tag: "div",
    line: true,
    underlined: false,
  },
};
