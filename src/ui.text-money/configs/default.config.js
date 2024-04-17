export default /*tw*/ {
  money: {
    base: "whitespace-nowrap flex items-center text-{color}-600",
    variants: {
      align: {
        left: "justify-start",
        right: "justify-end",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      },
      color: {
        brand: "text-brand",
        white: "text-white",
        grayscale: "text-gray-900",
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
  symbol: "",
  defaultVariants: {
    color: "grayscale",
    size: "md",
    sign: "default",
    align: "right",
    symbolAlign: "right",
    weight: "regular",
    decimalPlaces: 2,
    delimiter: ",",
    planned: false,
    integer: false,
    divided: true,
  },
  safelist: (colors) => [{ pattern: `text-(${colors})-600` }],
};
