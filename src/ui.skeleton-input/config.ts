export default /*tw*/ {
  wrapper: {
    base: "flex gap-2 w-full",
    variants: {
      labelAlign: {
        top: "flex-col",
        left: "flex-row items-center",
        right: "flex-row-reverse items-center",
      },
    },
  },
  input: {
    base: "{USkeleton} p-2",
    variants: {
      size: {
        sm: "h-8",
        md: "h-8.5",
        lg: "h-9.25",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", size: "sm", label: true, class: "h-11" },
      { labelAlign: "topInside", size: "md", label: true, class: "h-12.5" },
      { labelAlign: "topInside", size: "lg", label: true, class: "h-14.25" },
    ],
  },
  textarea: {
    base: "{USkeleton} p-2",
    variants: {
      size: {
        sm: "h-13",
        md: "h-14.5",
        lg: "h-16",
      },
    },
    compoundVariants: [
      { size: "sm", labelAlign: "topInside", label: true, class: "h-15.75" },
      { size: "md", labelAlign: "topInside", label: true, class: "h-18" },
      { size: "lg", labelAlign: "topInside", label: true, class: "h-20.5" },
    ],
  },
  label: {
    base: "{USkeleton} w-1/5 rounded-small",
    variants: {
      size: {
        sm: "h-3",
        md: "h-3.5",
        lg: "h-4",
      },
    },
  },
  defaults: {
    variant: "default",
    labelAlign: "topInside",
    type: "input",
    size: "md",
    label: true,
  },
};
