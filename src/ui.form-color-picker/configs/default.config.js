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
  unselectedIcon: "{UIcon} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
  unselectedIconName: "close",
  unselectedRadio: {
    component: "{URadio}",
    radio: "checked:text-white !border-gray-300",
  },
  radio: {
    component: "{URadio}",
    radio: `
      bg-{color}-600 border-{color}-600 hover:border-{color}-600 active:bg-{color}-800
      disabled:border-{color}-400 disabled:bg-{color}-400
    `,
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
  safelist: (colors) => [
    { pattern: `bg-(${colors})-400`, variants: ["disabled"] },
    { pattern: `bg-(${colors})-600` },
    { pattern: `bg-(${colors})-800`, variants: ["active"] },
    { pattern: `border-(${colors})-400`, variants: ["disabled"] },
    { pattern: `border-(${colors})-600`, variants: ["hover"] },
  ],
};
