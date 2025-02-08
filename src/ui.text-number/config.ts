export default /*tw*/ {
  wrapper: {
    base: "whitespace-nowrap flex items-center text-{color}-600",
    variants: {
      size: {
        xs: "text-2xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
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
