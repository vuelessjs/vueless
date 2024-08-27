export default /*tw*/ {
  label: "{ULabel}",
  wrapper: {
    base: `
      flex items-center p-0.5 relative rounded-3xl cursor-pointer transition
      focus-within:ring-dynamic focus-within:ring-offset-dynamic
    `,
    variants: {
      checked: {
        true: "bg-{color}-600 ring-{color}-700/15 hover:bg-{color}-700 active:bg-{color}-800",
        false: "bg-gray-300 ring-gray-700/15 hover:bg-gray-400 active:bg-gray-500",
      },
      size: {
        sm: "w-6",
        md: "w-8",
        lg: "w-10",
      },
    },
    compoundVariants: [
      { toggleLabel: true, size: "sm", class: "w-10" },
      { toggleLabel: true, size: "md", class: "w-12" },
      { toggleLabel: true, size: "lg", class: "w-14" },
      { disabled: true, checked: false, class: "bg-gray-300" },
      { disabled: true, checked: true, class: "bg-gray-400" },
      { color: "grayscale", disabled: false, checked: true, class: "bg-gray-900 ring-gray-700/15" },
    ],
  },
  input: "absolute size-0 opacity-0",
  circle: {
    base: "transition-all duration-300 rounded-full bg-white flex items-center justify-center",
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
  toggleIcon: "{UIcon}",
  toggleLabel: {
    base: "absolute text-center text-2xs font-medium uppercase text-white",
    compoundVariants: [
      { toggleLabel: true, checked: true, class: "w-1/2 left-1" },
      { toggleLabel: true, checked: false, class: "w-1/2 right-1" },
      { toggleLabel: false, checked: true, class: "bg-{color}-600 hover:bg-{color}-700 active:bg-{color}-800" },
      { toggleLabel: false, checked: false, class: "bg-gray-300 hover:bg-gray-400 active:bg-gray-500" },
      { toggleLabel: false, color: "grayscale", class: "bg-gray-700 hover:bg-gray-800 active:bg-gray-900" },
    ],
  },
  i18n: {
    inactive: "Off",
    active: "On",
  },
  defaults: {
    toggleSelectIcon: "check",
    toggleUnselectIcon: "close",
    color: "brand",
    size: "md",
    labelAlign: "right",
    disabled: false,
    toggleIcon: false,
    toggleLabel: false,
  },
  safelist: (colors) => [
    { pattern: `ring-(${colors})-700` },
    { pattern: `bg-(${colors})-600` },
    { pattern: `bg-(${colors})-700`, variants: ["hover"] },
    { pattern: `bg-(${colors})-800`, variants: ["active"] },
  ],
};
