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
  circle: "size-5 rounded-full",
  colorDivider: "{UDivider}",
  defaults: {
    size: "md",
  },
};
