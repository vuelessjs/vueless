export default /*tw*/ {
  wrapper: {
    base: "flex w-full group",
    variants: {
      align: {
        topInside: "flex-col gap-0 relative",
        topWithDesc: "flex-col-reverse gap-2",
        top: "flex-col gap-2",
        right: "flex-row w-fit",
        left: "flex-row-reverse w-fit",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
    },
    compoundVariants: [
      { align: ["left", "right"], size: "sm", class: "gap-2.5" },
      { align: ["left", "right"], size: "md", class: "gap-3" },
      { align: ["left", "right"], size: "lg", class: "gap-3.5" },
      { align: ["left", "right"], centred: true, class: "items-center w-auto" },
      { align: "left", centred: true, class: "justify-end" },
      { align: "right", centred: true, class: "justify-start" },
    ],
  },
  content: "flex",
  label: {
    base: "z-10 block !leading-none w-max transition",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      align: {
        top: "font-medium",
        topInside: "font-normal absolute left-3 text-gray-500 group-focus-within:text-brand-600",
        topWithDesc: "font-medium",
        left: "font-normal",
        right: "font-normal",
      },
      error: {
        true: "text-red-600 group-focus-within:text-red-600",
      },
      disabled: {
        true: "text-gray-500 cursor-not-allowed",
      },
    },
    compoundVariants: [
      { interactive: true, disabled: false, class: "hover:cursor-pointer" },
      { align: "topInside", size: "sm", class: "top-2 text-2xs" },
      { align: "topInside", size: "md", class: "top-2.5 text-xs" },
      { align: "topInside", size: "lg", class: "top-2.5 text-sm" },
      { align: "topWithDesc", size: "sm", class: "-mt-px" },
      { align: "topWithDesc", size: "md", class: "" },
      { align: "topWithDesc", size: "lg", class: "mt-px" },
      { align: ["left", "right"], size: "sm", class: "-mt-px text-sm" },
      { align: ["left", "right"], size: "md", class: "text-sm" },
      { align: ["left", "right"], size: "lg", class: "mt-px text-base" },
      { align: ["left", "right"], centred: false, class: "pt-1" },
    ],
  },
  description: {
    base: "font-normal text-gray-500 text-left !leading-tight",
    variants: {
      size: {
        sm: "text-2xs",
        md: "text-xs",
        lg: "text-sm",
      },
      align: {
        top: "",
        topInside: "pl-3 mt-1.5",
        topWithDesc: "pt-0.5",
        left: "pt-0.5",
        right: "pt-0.5",
      },
      error: {
        true: "text-red-600",
      },
    },
  },
  defaults: {
    align: "top",
    size: "md",
    centred: false,
    disabled: false,
    interactive: false,
  },
};
