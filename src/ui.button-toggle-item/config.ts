export default /*tw*/ {
  toggleButton: {
    base: "{UButton} font-normal text-gray-900",
    defaults: {
      variant: "thirdary",
    },
  },
  toggleButtonActive: {
    base: "{UButton} font-normal !bg-{color}-600/15",
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
