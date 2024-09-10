export default /*tw*/ {
  wrapper: {
    variants: {
      vertical: {
        true: "h-full flex",
        false: "w-full",
      },
      label: {
        true: "flex items-center",
      },
    },
    compoundVariants: [
      { vertical: false, size: "xs", class: "py-2" },
      { vertical: false, size: "sm", class: "py-3" },
      { vertical: false, size: "md", class: "py-4" },
      { vertical: false, size: "lg", class: "py-5" },
      { vertical: false, size: "xl", class: "py-6" },
      { vertical: true, size: "xs", class: "px-2" },
      { vertical: true, size: "sm", class: "px-3" },
      { vertical: true, size: "md", class: "px-4" },
      { vertical: true, size: "lg", class: "px-5" },
      { vertical: true, size: "xl", class: "px-6" },
      { noPadding: true, class: "p-0" },
      { noTopPadding: true, class: "pt-0" },
      { noLeftPadding: true, class: "pl-0" },
      { noRightPadding: true, class: "pr-0" },
      { noBottomPadding: true, class: "pb-0" },
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
      label: {
        true: "w-full",
      },
      vertical: {
        true: "border-l",
        false: "border-t",
      },
      dashed: {
        true: "border-dashed",
      },
      dotted: {
        true: "border-dotted",
      },
      noBorder: {
        true: "border-0",
      },
    },
  },
  label: {
    base: "px-2 shrink-0 text-sm",
    variants: {
      variant: {
        light: "text-gray-400",
        default: "text-gray-500",
        dark: "text-gray-600",
      },
    },
  },
  defaults: {
    variant: "default",
    size: "md",
    dashed: false,
    dotted: false,
    vertical: false,
    noBorder: false,
    noPadding: false,
    noTopPadding: false,
    noBottomPadding: false,
    noLeftPadding: false,
    noRightPadding: false,
  },
};
