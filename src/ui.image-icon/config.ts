export default /*tw*/ {
  icon: {
    base: "text-{color} fill-current shrink-0 grow-0 focus:outline-0",
    variants: {
      variant: {
        light: "brightness-125",
        default: "brightness-100",
        dark: "brightness-75",
      },
      color: {
        inherit: "text-inherit",
      },
      interactive: {
        true: "cursor-pointer opacity-75",
      },
      size: {
        "4xs": "size-2.5",
        "3xs": "size-3",
        "2xs": "size-3.5",
        xs: "size-4",
        sm: "size-5",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
        "2xl": "size-12",
        "3xl": "size-14",
        "4xl": "size-16",
        "5xl": "size-20",
      },
    },
  },
  defaults: {
    color: "grayscale",
    size: "md",
    variant: "default",
    interactive: false,
    /* icon library */
    library: "@material-symbols",
    path: "", // set for `custom-icons` library only.
    style: "outlined",
    weight: 500,
  },
};
