export default /*tw*/ {
  colorPickerLabel: "{ULabel}",
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
  unselectedIcon: {
    base: "{UIcon} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
    defaults: {
      size: {
        xs: "3xs",
        sm: "2xs",
        md: "xs",
        lg: "sm",
        xl: "md",
      },
    },
  },
  unselectedColorPickerRadio: {
    base: "{URadio}",
    radio: "checked:text-white !border-gray-300",
  },
  colorPickerRadio: {
    base: "{URadio}",
    radio: `
      bg-{color}-600 border-{color}-600 hover:border-{color}-600 active:bg-{color}-800
      disabled:border-{color}-400 disabled:bg-{color}-400
    `,
  },
  // TODO: Add dynamic colors parsing from the config
  safelistColors: [
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
  defaults: {
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
    /* icons */
    unselectedIcon: "close",
  },
};
