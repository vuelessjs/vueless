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
      { align: ["left", "right"], size: "sm", class: "gap-2" },
      { align: ["left", "right"], size: "md", class: "gap-2.5" },
      { align: ["left", "right"], size: "lg", class: "gap-3" },
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
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
      align: {
        top: "font-medium",
        topInside: "font-normal absolute left-3 text-lifted group-focus-within:text-primary",
        topWithDesc: "font-medium",
        left: "font-normal",
        right: "font-normal",
      },
      error: {
        true: "text-error group-focus-within:text-error",
      },
      disabled: {
        true: "text-lifted cursor-not-allowed",
      },
    },
    compoundVariants: [
      { interactive: true, disabled: false, class: "hover:cursor-pointer" },
      { align: "topInside", size: "sm", class: "top-2 text-xsmall" },
      { align: "topInside", size: "md", class: "top-2.5 text-small" },
      { align: "topInside", size: "lg", class: "top-2.5 text-medium" },
      { align: "topWithDesc", size: "sm", class: "-mt-px" },
      { align: "topWithDesc", size: "md", class: "" },
      { align: "topWithDesc", size: "lg", class: "mt-px" },
      { align: ["left", "right"], size: "sm", class: "-mt-0.5 text-medium" },
      { align: ["left", "right"], size: "md", class: "text-medium" },
      { align: ["left", "right"], size: "lg", class: "mt-px text-large" },
      { align: ["left", "right"], centred: false, class: "pt-1" },
    ],
  },
  description: {
    base: "font-normal text-lifted text-left !leading-tight",
    variants: {
      size: {
        sm: "text-xsmall",
        md: "text-small",
        lg: "text-medium",
      },
      align: {
        top: "",
        topInside: "pl-3 mt-1.5",
        topWithDesc: "pt-0.5",
        left: "pt-0.5",
        right: "pt-0.5",
      },
      error: {
        true: "text-error",
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
