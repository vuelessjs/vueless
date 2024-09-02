export default /*tw*/ {
  inputLabel: "{ULabel} w-full",
  dropzoneWrapper: {
    base: `
      p-3 size-auto w-full bg-white transition
      rounded-dynamic border border-solid border-gray-300
      hover:border-gray-400 hover:focus-within:border-brand-500 focus-within:border-brand-500
      focus-within:ring-brand-700/15 focus-within:ring-dynamic focus-within:ring-offset-dynamic
    `,
    variants: {
      error: {
        true: "border-red-300 hover:border-red-400",
      },
      disabled: {
        true: "pointer-events-none bg-gray-100",
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
    base: "p-3 gap-6 flex justify-between items-start relative w-full rounded-dynamic bg-brand-50",
    variants: {
      multiple: {
        false: "items-center",
      },
      error: {
        true: "bg-red-50",
      },
      disabled: {
        true: "bg-gray-200",
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
  chooseFileButton: {
    component: "{UButton}",
    variants: {
      disabled: {
        true: "opacity-75",
      },
    },
  },
  clearButton: "{UButton}",
  removeItemButton: "{UButton} ml-2",
  dropzoneWrapperHover: "border-gray-400 border-dashed",
  dropzoneWrapperError: "hover:border-red-400 border-dashed border-red-300",
  input: "sr-only",
  buttonWrapper: "flex gap-3 items-center",
  fileList: "{UFiles} w-full",
  i18n: {
    sizeError: "File size is too big.",
    formatError: "Format is not supported.",
    noFile: "No file selected",
    uploadFile: "Choose file",
  },
  defaults: {
    size: "md",
    labelAlign: "topInside",
    allowedFileTypes: [],
    maxFileSize: 0,
    multiple: false,
    disabled: false,
    /* icons */
    chooseFileIcon: "attach_file",
    clearIcon: "close",
    removeItemIcon: "close",
  },
};
