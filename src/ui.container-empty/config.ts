export default /*tw*/ {
  wrapper: "flex flex-col items-center justify-center gap-4 size-full",
  header: "flex justify-center",
  emptyIconWrapper: {
    base: "rounded-full bg-inverted/5",
    variants: {
      size: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
  },
  emptyIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "xl",
        md: "3xl",
        lg: "5xl",
      },
    },
  },
  content: "flex flex-col items-center justify-center gap-1.5",
  title: {
    base: "{UHeader}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  description: "{UText}",
  footer: "flex justify-center",
  defaults: {
    size: "md",
    /* icons */
    placeholderIcon: "emoji_food_beverage",
  },
};
