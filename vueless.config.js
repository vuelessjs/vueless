export default {
  fallbackLocale: "ua",
  backgroundsPath: "static/backgrounds/",
  strategyOverwrite: false,
  component: /*ui*/ {
    UNotify: {
      positionClasses: {
        page: ".mono-page-wrapper",
        aside: ".aside",
      },
    },
    UTopLoader: { color: "blue" },
    // UEmpty: {
    //   wrapper: "bg-red-400",
    //   defaultVariants: {
    //     size: "lg",
    //   },
    // },
  },
};
