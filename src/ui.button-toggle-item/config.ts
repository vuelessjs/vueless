export default /*tw*/ {
  toggleButton: {
    base: "{UButton} font-normal",
    defaults: {
      variant: "thirdary",
      color: "brand",
    },
  },
  toggleButtonInactive: "{>toggleButton} text-gray-900",
  toggleButtonActive: {
    base: "{>toggleButton} !bg-{color}-600/15",
    defaults: {
      filled: true,
    },
  },
  toggleInput: "p-0 m-0 size-0 invisible absolute",
  defaults: {
    disabled: false,
  },
};
