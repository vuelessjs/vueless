export default /*tw*/ {
  inputLabel: "{ULabel} w-full",
  dropzone: {
    base: `
      p-3 size-auto w-full bg-default transition
      rounded-medium border border-solid border-default
      hover:border-lifted hover:focus-within:border-primary focus-within:border-primary
      focus-within:outline focus-within:outline-small focus-within:outline-primary
    `,
    variants: {
      error: {
        true: "!border-error focus-within:outline-error",
      },
      disabled: {
        true: "pointer-events-none bg-lifted",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-7" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-8" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-9" },
    ],
  },
  dropzoneHover: "border-lifted border-dashed",
  descriptionTop: "{UText} text-gray-700 mb-2",
  descriptionBottom: "{UText} text-gray-700 mt-2",
  content: {
    base: "p-3 gap-3 flex justify-between items-start relative w-full rounded-medium bg-primary/5",
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
    base: "pr-4 text-gray-700 grow w-full self-center",
    variants: {
      size: {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
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
