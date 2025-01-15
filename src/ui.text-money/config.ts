export default /*tw*/ {
  money: {
    base: "{UNumber}",
    variants: {
      planned: {
        true: "opacity-75 before:content-['('] after:content-[')']",
      },
    },
  },
  symbol: {
    base: "text-{color}-600 mx-1",
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
    compoundVariants: [
      { symbolDivided: false, symbolAlign: "left", class: "mr-0" },
      { symbolDivided: false, symbolAlign: "right", class: "ml-0" },
      { planned: true, symbolAlign: "left", class: "ml-0" },
      { planned: true, symbolAlign: "right", class: "mr-0" },
    ],
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
