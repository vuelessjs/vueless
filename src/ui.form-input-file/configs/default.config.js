export default /*tw*/ {
  label: {
    wrapper: "relative w-full",
    label: {
      compoundVariants: [
        { align: "topInside", size: "sm", class: "left-5 top-4" },
        { align: "topInside", size: "md", class: "left-5 top-5" },
        { align: "topInside", size: "lg", class: "left-5 top-6" },
      ],
    },
  },
  dropzoneWrapper: {
    base: `
      size-auto w-full rounded-lg border border-solid border-gray-300 bg-white
      p-4 px-5 py-6 transition-all hover:border-gray-400
    `,
    variants: {
      error: {
        true: "border-red-300 hover:border-red-400",
      },
    },
    compoundVariants: [
      { labelAlign: "topInside", label: true, size: "sm", class: "pt-8" },
      { labelAlign: "topInside", label: true, size: "md", class: "pt-10" },
      { labelAlign: "topInside", label: true, size: "lg", class: "pt-12" },
    ],
  },
  description: "text-gray-700",
  contentWrapper: {
    base: "relative mt-3 flex w-full gap-6 justify-between items-start rounded bg-brand-50 p-3",
    variants: {
      multiple: {
        false: "items-center",
      },
    },
  },
  placeholder: {
    base: "pr-4 text-gray-700 flex-grow w-full",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  button: "hover:cursor-pointer",
  chooseFileIcon: "",
  chooseFileIconName: "attach_file",
  clearIcon: "",
  clearIconName: "close",
  removeItemIcon: "ml-2",
  removeItemIconName: "close",
  dropzoneWrapperHover: "border-gray-400 border-dashed",
  dropzoneWrapperError: "hover:border-red-400 border-dashed border-red-300",
  input: "sr-only pointer-events-none size-0 opacity-0",
  buttonWrapper: "flex gap-4 items-center",
  fileList: "w-full",
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
