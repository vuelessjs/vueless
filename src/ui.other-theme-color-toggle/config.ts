export default /*tw*/ {
  list: "flex flex-wrap gap-0.5",
  colorButton: {
    base: "{UButton}",
    button: {
      compoundVariants: [
        {
          filled: true,
          variant: "thirdary",
          class: "!bg-gray-800/10 dark:!bg-gray-200/10",
        },
      ],
    },
  },
  circle: {
    base: "rounded-full",
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
  },
  colorDivider: "{UDivider}",
  defaults: {
    size: "md",
  },
};
