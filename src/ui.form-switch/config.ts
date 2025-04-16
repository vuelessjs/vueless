export default /*tw*/ {
  switchLabel: {
    base: "{ULabel}",
    wrapper: "items-center",
    content: "h-fit",
  },
  wrapper: {
    base: `
      flex items-center p-0.5 relative rounded-full outline-transparent cursor-pointer transition focus-within:transition
      focus-visible:outline focus-visible:outline-medium focus-visible:outline-offset-2 focus-visible:outline-{color}
    `,
    variants: {
      size: {
        sm: "w-6",
        md: "w-8",
        lg: "w-10",
      },
      checked: {
        true: "bg-{color} hover:bg-{color}-lifted active:bg-{color}-accented",
        false: "bg-neutral/25 hover:bg-neutral/50 active:bg-neutral/75",
      },
      disabled: {
        true: "pointer-events-none",
      },
    },
    compoundVariants: [
      { toggleLabel: true, size: "sm", class: "w-10" },
      { toggleLabel: true, size: "md", class: "w-12" },
      { toggleLabel: true, size: "lg", class: "w-14" },
      { disabled: true, checked: false, class: "bg-neutral/50" },
      { disabled: true, checked: true, class: "bg-{color}/50" },
    ],
  },
  input: "sr-only",
  circle: {
    base: "rounded-full bg-default flex items-center justify-center transition-all",
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
    base: "absolute text-center text-tiny font-medium uppercase text-inverted",
    compoundVariants: [
      { toggleLabel: true, checked: true, class: "w-1/2 left-1" },
      { toggleLabel: true, checked: false, class: "w-1/2 right-1" },
      {
        toggleLabel: false,
        checked: true,
        class: "bg-{color} hover:bg-{color}-lifted active:bg-{color}-accented",
      },
      {
        toggleLabel: false,
        checked: false,
        class: "bg-neutral/25 hover:bg-neutral/50 active:bg-neutral/75",
      },
    ],
  },
  i18n: {
    inactive: "Off",
    active: "On",
  },
  defaults: {
    color: "primary",
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
