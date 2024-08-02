export default /*tw*/ {
  label: "",
  list: {
    base: "flex flex-wrap",
    variants: {
      size: {
        sm: "gap-2 mt-px",
        md: "gap-3 mt-0.5",
        lg: "gap-3 mt-1",
      },
    },
  },
  unselected: "relative flex",
  unselectedIcon: "{UIcon} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  unselectedIconName: "close",
  unselectedRadio: {
    component: "{URadio}",
    radio: "!text-white !border-gray-300 hover:!border-gray-400 focus:!border-gray-400 active:!border-gray-500",
  },
  radio: {
    component: "{URadio}",
    radio: "bg-{color}-500 border-{color}-500 hover:border-{color}-500",
  },
  defaultVariants: {
    size: "md",
    name: "colorPicker",
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
