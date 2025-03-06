export default /*tw*/ {
  header: {
    base: "text-{color}-600 font-medium",
    variants: {
      size: {
        xs: "text-lg",
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
        "2xl": "text-5xl",
      },
      color: {
        primary: "text-primary",
        white: "text-white",
        grayscale: "text-gray-900",
      },
      line: {
        true: "!leading-none",
      },
      underlined: {
        true: "border-b border-{color}-600",
      },
    },
    compoundVariants: [
      { underlined: true, size: "xs", class: "pb-1.5" },
      { underlined: true, size: "sm", class: "pb-2" },
      { underlined: true, size: "md", class: "pb-2" },
      { underlined: true, size: "lg", class: "pb-2.5" },
      { underlined: true, size: "xl", class: "pb-2.5" },
      { underlined: true, size: "2xl", class: "pb-3" },
      { underlined: true, color: "white", class: "border-white" },
      { underlined: true, color: "grayscale", class: "border-gray-600" },
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
