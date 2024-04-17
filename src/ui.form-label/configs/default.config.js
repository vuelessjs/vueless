export default /*tw*/ {
  wrapper: {
    base: "flex",
    variants: {
      size: {
        sm: "gap-2",
        md: "gap-3",
        lg: "gap-4",
      },
      align: {
        top: "flex-col",
        topInside: "flex-col",
        topWithDesc: "flex-col-reverse w-fit",
        left: "flex-row w-fit",
        right: "flex-row-reverse w-fit",
      },
    },
    compoundVariants: [
      { align: "top", size: "sm", class: "gap-0 space-y-2" },
      { align: "top", size: "md", class: "gap-0 space-y-2" },
      { align: "top", size: "lg", class: "gap-0 space-y-2" },
      { align: "topInside", size: "sm", class: "gap-0" },
      { align: "topInside", size: "md", class: "gap-0" },
      { align: "topInside", size: "lg", class: "gap-0" },
    ],
  },
  labelWrapper: "",
  label: {
    base: "pt-1 pb-1.5 z-10 font-normal block !leading-none",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base mt-px",
        lg: "text-lg mt-0.5",
      },
      align: {
        topInside: "absolute left-4 text-gray-500",
        topWithDesc: "text-gray-500",
        top: "text-gray-500",
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
      { align: "top", size: "sm", class: "m-0 p-0 text-xs" },
      { align: "top", size: "md", class: "m-0 p-0 text-sm" },
      { align: "top", size: "lg", class: "m-0 p-0 text-base" },
      { align: "topInside", size: "sm", class: "m-0 p-0 top-2 text-xs" },
      { align: "topInside", size: "md", class: "m-0 p-0 top-2.5 text-sm" },
      { align: "topInside", size: "lg", class: "m-0 p-0 top-3 text-base" },
      { align: "topWithDesc", size: "sm", class: "m-0 p-0 text-xs" },
      { align: "topWithDesc", size: "md", class: "m-0 p-0 text-sm" },
      { align: "topWithDesc", size: "lg", class: "m-0 p-0 text-base" },
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
      },
      error: {
        true: "text-red-500",
      },
    },
    compoundVariants: [
      { align: "top", size: "sm", class: "mt-1.5" },
      { align: "top", size: "md", class: "mt-2" },
      { align: "top", size: "lg", class: "mt-2.5" },
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
