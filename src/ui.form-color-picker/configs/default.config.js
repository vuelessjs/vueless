export default /*tw*/ {
  label: "",
  list: {
    base: "flex flex-wrap",
    variants: {
      size: {
        xs: "gap-2",
        sm: "gap-2",
        md: "gap-3",
        lg: "gap-3",
        xl: "gap-4",
      },
    },
  },
  radio: {
    radio: {
      base: "cursor-pointer bg-{color}-500 border-{color}-500 hover:border-{color}-500",
    },
  },
  unselected: "relative flex",
  unselectedRadio: {
    radio: {
      compoundVariants: [
        {
          color: "grayscale",
          class: "text-white !border-gray-300 hover:!border-gray-400 focus:!border-gray-400 active:!border-gray-500",
        },
      ],
    },
  },
  unselectedIcon: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  unselectedIconName: "close",
  defaultVariants: {
    name: "UColorPicker",
    size: "md",
    disabled: false,
    colorOptions: [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ],
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-500` }],
};
