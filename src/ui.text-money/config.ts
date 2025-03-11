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
    base: "text-{color} mx-1",
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
