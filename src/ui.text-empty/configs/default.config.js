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
  icon: "{UIcon}",
  iconName: "emoji_food_beverage",
  footer: "mt-4 flex justify-center",
  title: "{UHeader}",
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
  defaultVariants: {
    size: "md",
  },
};
