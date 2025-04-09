export default /*tw*/ {
  passwordInput: "{UInput}",
  passwordIconWrapper: "flex items-center justify-end whitespace-nowrap gap-1 rounded-inherit rounded-l-none",
  passwordIcon: {
    base: "{UIcon}",
    variants: {
      disabled: {
        true: "text-muted pointer-events-none",
      },
    },
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  defaults: {
    size: "md",
    labelAlign: "topInside",
    readonly: false,
    disabled: false,
    /* icons */
    passwordVisibleIcon: "visibility-fill",
    passwordHiddenIcon: "visibility_off-fill",
  },
};
