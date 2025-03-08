export default /*tw*/ {
  wrapper: {
    base: "whitespace-nowrap flex items-center text-{color}",
    variants: {
      size: {
        xs: "text-xsmall",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
        xl: "text-lg",
      },
      color: {
        white: "text-white",
        grayscale: "text-gray-900",
      },
      align: {
        left: "justify-start",
        right: "justify-end",
      },
    },
  },
  number: "",
  mathSign: "",
  integer: "",
  fraction: "",
  defaults: {
    color: "grayscale",
    size: "md",
    sign: "auto",
    align: "left",
    minFractionDigits: 0,
    maxFractionDigits: 2,
    decimalSeparator: ",",
    thousandsSeparator: " ",
  },
};
