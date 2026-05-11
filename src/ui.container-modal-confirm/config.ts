export default /*tw*/ {
  confirmModal: {
    base: "{UModal}",
    header: "pb-4",
  },
  footerLeftFallback: "flex gap-3",
  confirmButton: "{UButton} w-full",
  cancelButton: "{UButton} w-full",
  i18n: {
    confirm: "Confirm",
    cancel: "Cancel",
  },
  defaults: {
    size: "sm",
    variant: "solid",
    confirmColor: "primary",
    inner: false,
    divided: false,
    loading: false,
    closeOnEsc: true,
    closeOnCross: true,
    closeOnOverlay: true,
    confirmDisabled: false,
    cancelHidden: false,
  },
};
