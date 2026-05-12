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
    base: `
      flex items-center justify-center shrink-0 select-none rounded-medium
      focus-visible:outline-2 focus-visible:outline-grayscale-accented
    `,
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
  defaults: {
    orientation: "horizontal",
    gutterSize: 8,
    disabled: false,
    stateKey: null,
    stateStorage: "session",
    step: 5,
  },
};
