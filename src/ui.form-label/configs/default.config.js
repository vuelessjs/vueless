export default /*tw*/ {
  wrapper: {
    base: "flex",
    variants: {
      size: {
        xs: "gap-2",
        sm: "gap-2",
        md: "gap-2.5",
        lg: "gap-3",
        xl: "gap-3.5",
      },
      align: {
        top: "flex-col",
        topInside: "flex-col gap-0",
        topWithDesc: "flex-col-reverse w-fit",
        left: "flex-row w-fit",
        right: "flex-row-reverse w-fit",
        bottom: "flex-col-reverse w-fit",
      },
    },
  },
  labelWrapper: "",
  label: {
    base: "text-gray-500 z-10 font-normal block !leading-none",
    variants: {
      size: {
        xs: "text-2xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      align: {
        topInside: "absolute left-4",
        topWithDesc: "pt-1 pb-1.5",
        left: "pt-1 pb-1 text-gray-900",
        right: "pt-1 pb-1 text-gray-900",
      },
      error: {
        true: "text-red-500",
      },
      disabled: {
        true: "text-gray-900 opacity-50",
      },
    },
    compoundVariants: [
      { align: "topInside", size: "xs", class: "top-1.5" },
      { align: "topInside", size: "sm", class: "top-2" },
      { align: "topInside", size: "md", class: "top-2.5" },
      { align: "topInside", size: "lg", class: "top-3" },
      { align: "topInside", size: "xl", class: "top-3.5" },
      { align: "topWithDesc", size: "xs", class: "-mt-px" },
      { align: "topWithDesc", size: "sm", class: "" },
      { align: "topWithDesc", size: "md", class: "mt-px" },
      { align: "topWithDesc", size: "lg", class: "mt-0.5" },
      { align: "topWithDesc", size: "xl", class: "mt-1" },
      { align: "left", size: "xs", class: "-mt-0.5 text-sm" },
      { align: "left", size: "sm", class: "text-sm" },
      { align: "left", size: "md", class: "mt-px text-base" },
      { align: "left", size: "lg", class: "mt-0.5 text-lg" },
      { align: "left", size: "xl", class: "mt-1 text-xl" },
      { align: "right", size: "sm", class: "-mt-0.5 text-xs" },
      { align: "right", size: "sm", class: "text-sm" },
      { align: "right", size: "md", class: "mt-px text-base" },
      { align: "right", size: "lg", class: "mt-0.5 text-lg" },
      { align: "right", size: "xl", class: "mt-1 text-xl" },
    ],
  },
  description: {
    base: "font-normal text-gray-500/[85] !leading-none",
    variants: {
      size: {
        xs: "text-2xs",
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
        xl: "text-base",
      },
      align: {
        topInside: "pl-4",
        top: "pl-0 -mt-0.5",
        left: "pl-0",
        right: "pl-0",
        bottom: "-order-1 -mt-2",
      },
      error: {
        true: "text-red-500",
      },
    },
    compoundVariants: [
      { align: "topInside", size: "xs", class: "mt-1" },
      { align: "topInside", size: "sm", class: "mt-1.5" },
      { align: "topInside", size: "md", class: "mt-2" },
      { align: "topInside", size: "lg", class: "mt-2.5" },
      { align: "topInside", size: "xl", class: "mt-3" },
    ],
  },
  defaultVariants: {
    align: "top",
    size: "md",
    error: false,
    disabled: false,
  },
};
