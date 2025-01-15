export default /*tw*/ {
  wrapper: "",
  money: {
    base: "{UNumber}",
    variants: {
      planned: {
        true: "opacity-75 before:content-['('] after:content-[')']",
      },
    },
  },
  symbol: {
    base: "text-{color}-600",
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
  penny: {
    variants: {
      size: {
        xs: "text-2xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
        "3xl": "text-2xl",
        "4xl": "text-3xl",
      },
    },
  },
  defaults: {
    color: "grayscale",
    size: "md",
    sign: "auto",
    symbolAlign: "right",
    minFractionDigits: 0,
    maxFractionDigits: 2,
    decimalSeparator: ",",
    thousandsSeparator: " ",
    planned: false,
    symbolDivided: true,
  },
};
