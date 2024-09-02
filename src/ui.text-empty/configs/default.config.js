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
    base: "rounded-full bg-gray-700/5",
    variants: {
      size: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
  },
  emptyIcon: "{UIcon}",
  title: "{UHeader}",
  footer: "mt-4 flex justify-center",
  description: {
    base: "text-center",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  defaults: {
    size: "md",
    /* icons */
    emptyIcon: "emoji_food_beverage",
  },
};
