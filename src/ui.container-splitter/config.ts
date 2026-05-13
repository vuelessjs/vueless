export default /*tw*/ {
  wrapper: {
    base: "flex w-full h-full",
    variants: {
      vertical: {
        false: "flex-row",
        true: "flex-col",
      },
    },
  },
  panel: "",
  gutter: {
    base: `
      flex items-center justify-center shrink-0 select-none rounded-medium
      focus-visible:outline-2 focus-visible:outline-grayscale-accented
    `,
    variants: {
      vertical: {
        false: "cursor-col-resize w-[var(--gutter-size)] h-full",
        true: "cursor-row-resize h-[var(--gutter-size)] w-full",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
    },
  },
  defaults: {
    vertical: false,
    gutterSize: 8,
    disabled: false,
    stateKey: null,
    stateStorage: "session",
    resizeStep: 5,
  },
};
