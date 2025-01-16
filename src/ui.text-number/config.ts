export default /*tw*/ {
  money: {
    base: "whitespace-nowrap flex items-center text-{color}-600",
    variants: {
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
  sum: {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
      },
    },
  },
  mathSign: "",
  integer: "",
  decimal: "",
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
