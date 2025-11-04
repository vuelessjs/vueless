export default /*tw*/ {
  knobLabel: {
    base: "{ULabel}",
    content: "w-full h-full",
  },
  wrapper: {
    base: "relative inline-flex items-center justify-center select-none touch-none",
    variants: {
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
  },
  svg: {
    base: "transform -rotate-90 transition-transform duration-200",
    variants: {
      disabled: {
        true: "pointer-events-none",
      },
    },
  },
  trackCircle: {
    base: "stroke-accented transition-all duration-200",
  },
  progressCircle: {
    base: "stroke-{color} transition-all duration-200",
    variants: {
      disabled: {
        true: "opacity-50",
      },
    },
  },
  handle: {
    base: "fill-{color} transition-all duration-200",
    variants: {
      disabled: {
        true: "opacity-50",
      },
    },
  },
  valueText: {
    base: "absolute inset-0 flex items-center justify-center font-medium text-default pointer-events-none",
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
    },
  },
  defaults: {
    min: 0,
    max: 100,
    step: 1,
    size: 100,
    arcRange: 270,
    color: "primary",
    trackColor: "stroke-accented",
    showValue: true,
    disabled: false,
    labelAlign: "top",
  },
};
