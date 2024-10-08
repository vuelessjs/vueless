export default /*tw*/ {
  inputLabel: "{ULabel}",
  container: {
    base: "flex items-center text-gray-500 !leading-none",
    variants: {
      size: {
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-2.5",
      },
    },
  },
  stars: "flex",
  star: "{UIcon}",
  counter: {
    variants: {
      size: {
        sm: "text-base",
        md: "text-xl",
        lg: "text-2xl",
      },
    },
  },
  total: {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl",
      },
    },
  },
  defaults: {
    labelAlign: "top",
    size: "md",
    stars: 5,
    counter: false,
    selectable: false,
    /* icons */
    selectedIcon: "star-fill",
    unselectedIcon: "star",
  },
};
