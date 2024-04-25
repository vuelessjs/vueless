export default /*tw*/ {
  wrapper: {
    base: "flex",
    variants: {
      size: {
        sm: "gap-2",
        md: "gap-2.5",
        lg: "gap-3",
      },
      align: {
        top: "flex-col",
        topInside: "flex-col",
        topWithDesc: "flex-col-reverse w-fit",
        left: "flex-row w-fit",
        right: "flex-row-reverse w-fit",
        bottom: "flex-col-reverse w-fit",
      },
    },
    compoundVariants: [
      { align: "topInside", size: "sm", class: "gap-0" },
      { align: "topInside", size: "md", class: "gap-0" },
      { align: "topInside", size: "lg", class: "gap-0" },
    ],
  },
  labelWrapper: "",
  label: {
    base: "text-gray-500 z-10 font-normal block !leading-none",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      align: {
        topInside: "absolute left-4",
        left: "text-gray-900",
        right: "text-gray-900",
      },
      error: {
        true: "text-red-500",
      },
      disabled: {
        true: "text-gray-900 opacity-50",
      },
    },
    compoundVariants: [
      { align: "topInside", size: "sm", class: "top-2" },
      { align: "topInside", size: "md", class: "top-2.5" },
      { align: "topInside", size: "lg", class: "top-3" },
      { align: "topWithDesc", size: "sm", class: "pt-1 pb-1.5" },
      { align: "topWithDesc", size: "md", class: "pt-1 pb-1.5 mt-px" },
      { align: "topWithDesc", size: "lg", class: "pt-1 pb-1.5 mt-0.5" },
      { align: "left", size: "sm", class: "pt-1 pb-1.5 text-sm" },
      { align: "left", size: "md", class: "pt-1 pb-1.5 mt-px text-base" },
      { align: "left", size: "lg", class: "pt-1 pb-1.5 mt-0.5 text-lg" },
      { align: "right", size: "sm", class: "pt-1 pb-1.5 text-sm" },
      { align: "right", size: "md", class: "pt-1 pb-1.5 mt-px text-base" },
      { align: "right", size: "lg", class: "pt-1 pb-1.5 mt-0.5 text-lg" },
    ],
  },
  description: {
    base: "font-normal text-gray-500/[85] !leading-none",
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
      align: {
        topInside: "pl-4",
        top: "pl-0",
        left: "pl-0",
        right: "pl-0",
        bottom: "-order-1",
      },
      error: {
        true: "text-red-500",
      },
    },
    compoundVariants: [
      { align: "bottom", size: "sm", class: "-mt-2" },
      { align: "bottom", size: "md", class: "-mt-2" },
      { align: "bottom", size: "lg", class: "-mt-2" },
      { align: "top", size: "sm", class: "-mt-0.5" },
      { align: "top", size: "md", class: "-mt-0.5" },
      { align: "top", size: "lg", class: "-mt-0.5" },
      { align: "topInside", size: "sm", class: "mt-1.5" },
      { align: "topInside", size: "md", class: "mt-2" },
      { align: "topInside", size: "lg", class: "mt-2.5" },
    ],
  },
  defaultVariants: {
    align: "top",
    size: "md",
    error: false,
    disabled: false,
  },
};
