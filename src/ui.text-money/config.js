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
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
        "3xl": "text-2xl",
        "4xl": "text-3xl",
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
        md: "text-xs",
        lg: "text-sm",
        xl: "text-base",
        "2xl": "text-lg",
        "3xl": "text-xl",
        "4xl": "text-2xl",
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
    integer: false,
    symbolDivided: true,
  },
  safelist: (colors) => [{ pattern: `text-(${colors})-600` }],
};
