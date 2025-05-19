export default /*tw*/ {
  wrapper: {
    base: "",
    variants: {
      labelAlign: {
        left: "flex items-center",
        right: "flex flex-row-reverse items-center",
      },
      size: {
        sm: "gap-2",
        md: "gap-2.5",
        lg: "gap-3",
      },
    },
  },
  input: {
    base: "{USkeleton}",
    variants: {
      type: {
        radio: "rounded-full",
        checkbox: "rounded-small",
      },
    },
    compoundVariants: [
      { labelAlign: "left", size: "sm", class: "size-4" },
      { labelAlign: "left", size: "md", class: "size-5" },
      { labelAlign: "left", size: "lg", class: "size-6" },
      { labelAlign: "right", size: "sm", class: "size-4" },
      { labelAlign: "right", size: "md", class: "size-5" },
      { labelAlign: "right", size: "lg", class: "size-6" },
    ],
  },
  label: {
    base: "{USkeleton} w-25 rounded-small",
    compoundVariants: [
      { labelAlign: "left", size: "sm", class: "h-3.5" },
      { labelAlign: "left", size: "md", class: "h-4" },
      { labelAlign: "left", size: "lg", class: "h-4.5" },
      { labelAlign: "right", size: "sm", class: "h-3.5" },
      { labelAlign: "right", size: "md", class: "h-4" },
      { labelAlign: "right", size: "lg", class: "h-4.5" },
    ],
  },
  defaults: {
    type: "radio",
    variant: "default",
    labelAlign: "left",
    size: "lg",
    label: true,
  },
};
