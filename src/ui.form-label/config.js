export default /*tw*/ {
  wrapper: {
    base: "flex gap-2 w-full",
    variants: {
      align: {
        top: "flex-col",
        topInside: "flex-col gap-0 relative",
        topWithDesc: "flex-col-reverse w-fit",
        right: "flex-row w-fit",
        left: "flex-row-reverse w-fit",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
    },
    compoundVariants: [
      { align: "left", size: "sm", class: "gap-2" },
      { align: "left", size: "md", class: "gap-3" },
      { align: "left", size: "lg", class: "gap-4" },
      { align: "right", size: "sm", class: "gap-2.5" },
      { align: "right", size: "md", class: "gap-3" },
      { align: "right", size: "lg", class: "gap-3.5" },
      { align: "left", centred: true, class: "items-center w-auto" },
      { align: "right", centred: true, class: "items-center w-auto" },
    ],
  },
  content: {
    base: "flex",
    variants: {
      disabled: {
        true: "pointer-events-none",
      },
    },
  },
  label: {
    base: "text-gray-900 z-10 block !leading-none w-max",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      align: {
        top: "font-medium",
        topInside: "font-normal absolute left-3 text-gray-500",
        topWithDesc: "font-medium",
        left: "font-normal",
        right: "font-normal",
      },
      error: {
        true: "text-red-500",
      },
      disabled: {
        true: "text-gray-500 pointer-events-none",
      },
    },
    compoundVariants: [
      { align: "topInside", size: "sm", class: "top-2 text-2xs" },
      { align: "topInside", size: "md", class: "top-2.5 text-xs" },
      { align: "topInside", size: "lg", class: "top-2.5 text-sm" },
      { align: "topWithDesc", size: "sm", class: "-mt-px" },
      { align: "topWithDesc", size: "md", class: "" },
      { align: "topWithDesc", size: "lg", class: "mt-px" },
      { align: "left", size: "sm", class: "-mt-px text-sm" },
      { align: "left", size: "md", class: "text-sm" },
      { align: "left", size: "lg", class: "mt-px text-base" },
      { align: "right", size: "sm", class: "-mt-px text-xs" },
      { align: "right", size: "md", class: "text-sm" },
      { align: "right", size: "lg", class: "mt-px text-base" },
      { align: "left", centred: false, class: "pt-1" },
      { align: "right", centred: false, class: "pt-1" },
    ],
  },
  description: {
    base: "font-normal text-gray-500 !leading-none",
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
      align: {
        top: "pl-0 -mt-0.5",
        topInside: "pl-3",
        topWithDesc: "pt-1",
        left: "pt-1 pl-0",
        right: "pt-1 pl-0",
      },
      error: {
        true: "text-red-500",
      },
    },
    compoundVariants: [
      { align: "topInside", size: "sm", class: "mt-1.5" },
      { align: "topInside", size: "md", class: "mt-2" },
      { align: "topInside", size: "lg", class: "mt-2.5" },
    ],
  },
  defaults: {
    align: "top",
    size: "md",
    error: false,
    centred: false,
    disabled: false,
  },
};
