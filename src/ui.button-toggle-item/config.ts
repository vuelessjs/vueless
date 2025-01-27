export default /*tw*/ {
  toggleButton: {
    base: "{UButton} font-normal focus-visible:ring-offset-0",
    defaults: {
      variant: "thirdary",
    },
  },
  toggleButtonInactive: "{>toggleButton}",
  toggleButtonActive: {
    base: "{>toggleButton}",
    defaults: {
      color: "brand",
      filled: true,
    },
  },
  toggleInput: "p-0 m-0 size-0 invisible absolute",
  defaults: {
    disabled: false,
  },
};
