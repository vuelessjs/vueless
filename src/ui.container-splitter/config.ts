export default /*tw*/ {
  wrapper: {
    base: "flex w-full h-full",
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
  },
  panel: {
    base: "",
  },
  gutter: {
    base: "flex items-center justify-center shrink-0 select-none focus:outline-hidden",
    variants: {
      orientation: {
        horizontal: "cursor-col-resize w-[var(--gutter-size)] h-full",
        vertical: "cursor-row-resize h-[var(--gutter-size)] w-full",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
    },
  },
  divider: "{UDivider}",
  defaults: {
    orientation: "horizontal",
    gutterSize: 8,
    gutterColor: "neutral",
    disabled: false,
    stateKey: null,
    stateStorage: "session",
    step: 5,
  },
};
