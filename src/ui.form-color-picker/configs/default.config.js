export default /*tw*/ {
  wrapper: "",
  listAttrs: "mt-4 gap-4 flex flex-wrap",
  label: "",
  radio: {
    base: "size-6 cursor-pointer",
    radio: {
      base: "bg-{color}-500 border-{color}-500",
    },
  },
  icon: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  iconName: "close",
  uncolored: "relative flex",
  uncoloredRadio: {
    base: "size-6",
    radio: {
      compoundVariants: [
        {
          color: "grayscale",
          class: "text-white checked:border-gray-300",
        },
      ],
    },
  },
  defaultVariants: {
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
    disabled: false,
    size: "md",
  },
  safelist: (colors) => [{ pattern: `bg-(${colors})-500` }],
};
