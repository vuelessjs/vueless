export default /*tw*/ {
  toggleButton: {
    base: "{UButton} font-normal",
    defaults: {
      variant: "thirdary",
    },
  },
  toggleButtonActive: {
    base: "{UButton} {>toggleButton}",
    button: {
      variants: {
        variant: {
          thirdary: "!bg-{color}-800/15",
        },
      },
    },
    defaults: {
      variant: "thirdary",
      filled: true,
    },
  },
  toggleInput: "p-0 m-0 size-0 invisible absolute",
  defaults: {
    disabled: false,
  },
};
