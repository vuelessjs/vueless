export default /*tw*/ {
  wrapper: "flex flex-col items-center justify-center size-full",
  header: {
    base: "flex justify-center",
    variants: {
      size: {
        sm: "mb-4",
        md: "mb-5",
        lg: "mb-6",
      },
    },
  },
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
        sm: "2xl",
        md: "3xl",
        lg: "4xl",
      },
    },
  },
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
  description: {
    base: "text-center",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      },
    },
  },
  footer: "mt-4 flex justify-center",
  defaults: {
    size: "md",
    /* icons */
    placeholderIcon: "emoji_food_beverage",
  },
};
