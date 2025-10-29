export default /*tw*/ {
  wrapper: {
    base: "relative inline-block h-max cursor-pointer",
    variants: {
      disabled: {
        true: "cursor-not-allowed",
      },
    },
  },
  listbox: {
    base: "{UListbox} absolute z-10 w-fit",
    variants: {
      yPosition: {
        top: "bottom-full mb-1.5",
        bottom: "top-full mt-1.5",
      },
      xPosition: {
        left: "left-0",
        right: "right-0",
      },
    },
  },
  listboxTransition: {
    enterActiveClass: "ease-out duration-200",
    enterFromClass: "opacity-0 scale-95",
    enterToClass: "opacity-100 scale-100",
    leaveActiveClass: "ease-in duration-150",
    leaveFromClass: "opacity-100 scale-100",
    leaveToClass: "opacity-0 scale-95",
  },
  defaults: {
    color: "primary",
    size: "md",
    labelKey: "label",
    valueKey: "value",
    groupLabelKey: "label",
    yPosition: "bottom",
    xPosition: "left",
    optionsLimit: 0,
    visibleOptions: 8,
    searchable: false,
    multiple: false,
    closeOnSelect: true,
  },
};
