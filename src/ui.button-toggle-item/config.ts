export default /*tw*/ {
  toggleButton: {
    base: "{UButton} font-normal",
    defaults: {
      variant: "thirdary",
    },
  },
  toggleButtonActive: {
    base: "{UButton} {>toggleButton}",
    defaults: {
      variant: "primary",
    },
  },
  toggleInput: "p-0 m-0 size-0 invisible absolute",
  defaults: {
    disabled: false,
  },
};
