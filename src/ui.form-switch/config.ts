export default /*tw*/ {
  switchLabel: {
    base: "{ULabel}",
    wrapper: "items-center",
    content: "h-fit",
  },
  wrapper: {
    base: `
      flex items-center p-0.5 relative rounded-full cursor-pointer transition
      focus-visible:outline focus-visible:outline-dynamic focus-visible:outline-offset-2 focus-visible:outline-{color}-600
    `,
    variants: {
      size: {
        sm: "w-6",
        md: "w-8",
        lg: "w-10",
      },
      color: {
        grayscale: "outline-gray-900",
      },
      checked: {
        true: "bg-{color}-600 hover:bg-{color}-700 active:bg-{color}-800",
        false: "bg-gray-300 hover:bg-gray-400 active:bg-gray-600",
      },
    },
    compoundVariants: [
      { toggleLabel: true, size: "sm", class: "w-10" },
      { toggleLabel: true, size: "md", class: "w-12" },
      { toggleLabel: true, size: "lg", class: "w-14" },
      { color: "grayscale", checked: true, class: "bg-gray-900 hover:bg-gray-800 active:bg-gray-700" },
      { disabled: true, checked: false, class: "bg-gray-300" },
      { disabled: true, checked: true, class: "bg-gray-400" },
    ],
  },
  input: "absolute size-0 opacity-0",
  circle: {
    base: "rounded-full bg-white flex items-center justify-center transition-all",
    variants: {
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-5",
      },
    },
    compoundVariants: [
      { checked: true, size: "sm", class: "ml-[calc(100%-0.75rem)]" },
      { checked: true, size: "md", class: "ml-[calc(100%-1rem)]" },
      { checked: true, size: "lg", class: "ml-[calc(100%-1.25rem)]" },
    ],
  },
  toggleIcon: {
    base: "{UIcon}",
    defaults: {
      size: {
        sm: "2xs",
        md: "xs",
        lg: "sm",
      },
    },
  },
  toggleLabel: {
    base: "absolute text-center text-2xs font-medium uppercase text-white",
    compoundVariants: [
      { toggleLabel: true, checked: true, class: "w-1/2 left-1" },
      { toggleLabel: true, checked: false, class: "w-1/2 right-1" },
      {
        toggleLabel: false,
        checked: true,
        class: "bg-{color}-600 hover:bg-{color}-700 active:bg-{color}-800",
      },
      {
        toggleLabel: false,
        checked: false,
        class: "bg-gray-300 hover:bg-gray-400 active:bg-gray-500",
      },
      {
        toggleLabel: false,
        color: "grayscale",
        class: "bg-gray-700 hover:bg-gray-800 active:bg-gray-900",
      },
    ],
  },
  i18n: {
    inactive: "Off",
    active: "On",
  },
  defaults: {
    color: "brand",
    size: "md",
    labelAlign: "right",
    disabled: false,
    toggleIcon: false,
    toggleLabel: false,
    /* icons */
    onIcon: "check",
    offIcon: "close",
  },
};
