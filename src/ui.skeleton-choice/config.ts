export default /*tw*/ {
  wrapper: {
    base: "w-fit items-center",
    variants: {
      labelAlign: {
        left: "flex flex-row",
        right: "flex flex-row-reverse",
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
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
  },
  label: {
    base: "{USkeleton} w-25 rounded-small",
    variants: {
      size: {
        sm: "h-3",
        md: "h-3.5",
        lg: "h-4",
      },
    },
  },
  defaults: {
    type: "radio",
    variant: "default",
    labelAlign: "left",
    size: "md",
    label: true,
  },
};
