export default /*tw*/ {
  wrapper: {
    base: "flex",
    variants: {
      vertical: {
        true: "h-full w-fit",
        false: "w-full h-fit",
      },
      label: {
        true: "items-center justify-center",
      },
    },
    compoundVariants: [
      { vertical: false, size: "xs", class: "py-2" },
      { vertical: false, size: "sm", class: "py-3" },
      { vertical: false, size: "md", class: "py-4" },
      { vertical: false, size: "lg", class: "py-5" },
      { vertical: false, size: "xl", class: "py-6" },
      { vertical: false, padding: "after", class: "pt-0" },
      { vertical: false, padding: "before", class: "pb-0" },
      { vertical: true, size: "xs", class: "px-2" },
      { vertical: true, size: "sm", class: "px-3" },
      { vertical: true, size: "md", class: "px-4" },
      { vertical: true, size: "lg", class: "px-5" },
      { vertical: true, size: "xl", class: "px-6" },
      { vertical: true, padding: "after", class: "pl-0" },
      { vertical: true, padding: "before", class: "pr-0" },
      { padding: "none", class: "p-0" },
    ],
  },
  divider: {
    base: "border-transparent",
    variants: {
      variant: {
        light: "border-gray-100",
        default: "border-gray-200",
        dark: "border-gray-300",
      },
      vertical: {
        true: "border-l h-full",
        false: "border-t w-full",
      },
      dashed: {
        true: "border-dashed",
      },
      dotted: {
        true: "border-dotted",
      },
      noBorder: {
        true: "border-transparent",
      },
    },
  },
  label: {
    base: "absolute p-2 rounded-dynamic bg-white shrink-0 text-sm w-fit",
    variants: {
      variant: {
        light: "text-gray-400",
        default: "text-gray-500",
        dark: "text-gray-600",
      },
      vertical: {
        true: "transform origin-center rotate-90",
      },
    },
  },
  defaults: {
    variant: "default",
    padding: "all",
    size: "md",
    dashed: false,
    dotted: false,
    vertical: false,
    noBorder: false,
  },
};
