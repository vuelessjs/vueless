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
  slotLeft: "mr-2",
  slotRight: "ml-2",
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
      planned: {
        true: "opacity-75 before:content-['('] after:content-[')']",
      },
    },
  },
  symbol: "",
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
    sign: "default",
    align: "left",
    symbolAlign: "right",
    minFractionDigits: 0,
    maxFractionDigits: 2,
    decimalSeparator: ",",
    thousandsSeparator: " ",
    planned: false,
    symbolDivided: true,
  },
};
