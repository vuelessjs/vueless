export default /*tw*/ {
  inputLabel: "{ULabel} w-full",
  dropzone: {
    base: `
      p-3 size-auto w-full bg-white transition
      rounded-dynamic border border-solid border-gray-300
      hover:border-gray-400 hover:focus-within:border-brand-600 focus-within:border-brand-600
      focus-within:outline focus-within:outline-dynamic-sm focus-within:outline-brand-600
    `,
    variants: {
      error: {
        true: "!border-red-600 focus-within:outline-red-600",
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
  dropzoneHover: "border-gray-400 border-dashed",
  descriptionTop: "{UText} text-gray-700 mb-2",
  descriptionBottom: "{UText} text-gray-700 mt-2",
  content: {
    base: "p-3 gap-3 flex justify-between items-start relative w-full rounded-dynamic bg-brand-600/5",
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
  fileList: "{UFiles} w-full",
  buttons: "flex gap-3 items-center",
  chooseFileButton: {
    base: "{UButton}",
    variants: {
      disabled: {
        true: "opacity-75",
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
  chooseFileButtonError: {
    base: "{>chooseFileButton}",
    defaults: {
      color: "red",
    },
  },
  clearButton: {
    base: "{UButton}",
    defaults: {
      size: {
        sm: "xs",
        md: "sm",
        lg: "md",
      },
    },
  },
  clearButtonError: {
    base: "{>clearButton}",
    defaults: {
      color: "red",
    },
  },
  input: "sr-only",
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
  },
};
