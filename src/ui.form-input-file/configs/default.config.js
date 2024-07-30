export default /*tw*/ {
  label: "{ULabel} w-full",
  dropzoneWrapper: {
    base: `
      size-auto w-full rounded-lg border border-solid border-gray-300 bg-white
      p-3 transition hover:border-gray-400
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
  description: "{UText} text-gray-700",
  contentWrapper: {
    base: "relative flex w-full gap-6 justify-between items-start rounded-lg bg-brand-50 p-3",
    variants: {
      multiple: {
        false: "items-center",
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
  chooseFileIcon: "{UIcon}",
  chooseFileIconName: "attach_file",
  clearIcon: "{UIcon}",
  clearIconName: "close",
  removeItemIcon: "{UIcon} ml-2",
  removeItemIconName: "close",
  dropzoneWrapperHover: "border-gray-400 border-dashed",
  dropzoneWrapperError: "hover:border-red-400 border-dashed border-red-300",
  input: "sr-only pointer-events-none size-0 opacity-0",
  buttonWrapper: "flex gap-4 items-center",
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
