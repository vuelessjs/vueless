export default /*tw*/ {
  otpInputLabel: "{ULabel}",
  container: {
    base: "flex",
    variants: {
      size: {
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-2.5",
      },
    },
  },
  otpInput: {
    base: "{UInput}",
    input: "text-center",
    variants: {
      size: {
        sm: "w-8",
        md: "w-9",
        lg: "w-10",
      },
    },
  },
  defaults: {
    size: "md",
    length: 4,
    labelAlign: "top",
    mask: false,
    integerOnly: false,
    readonly: false,
    disabled: false,
  },
};
