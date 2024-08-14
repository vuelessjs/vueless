export default /*tw*/ {
  label: "{ULabel} w-full",
  dropzoneWrapper: {
    base: `
      p-3 size-auto w-full bg-white transition
      rounded-dynamic border border-solid border-gray-300 hover:border-gray-400
    `,
    variants: {
      error: {
        true: "border-red-300 hover:border-red-400",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-7" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-8" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-9" },
    ],
  },
  descriptionTop: "{UText} text-gray-700 mb-2",
  descriptionBottom: "{UText} text-gray-700 mt-2",
  contentWrapper: {
    base: "p-3 gap-6 w-full rounded-dynamic bg-brand-50 relative flex justify-between items-start",
    variants: {
      multiple: {
        false: "items-center",
      },
      error: {
        true: "bg-red-50",
      },
    },
  },
  placeholder: {
    base: "pr-4 text-gray-700 flex-grow w-full self-center",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
  button: "{UButton} hover:cursor-pointer",
  chooseFileIconName: "attach_file",
  clearButton: "{UButton}",
  clearIconName: "close",
  removeItemIcon: "{UIcon} ml-2",
  removeItemIconName: "close",
  dropzoneWrapperHover: "border-gray-400 border-dashed",
  dropzoneWrapperError: "hover:border-red-400 border-dashed border-red-300",
  input: "sr-only pointer-events-none size-0 opacity-0",
  buttonWrapper: "flex gap-3 items-center",
  fileList: "{UFiles} w-full",
  i18n: {
    sizeError: "File size is too big.",
    formatError: "Format is not supported.",
    noFile: "No file selected",
    uploadFile: "Choose file",
  },
  defaultVariants: {
    size: "md",
    labelAlign: "topInside",
    allowedFileTypes: [],
    multiple: false,
    maxFileSize: 0,
  },
};
