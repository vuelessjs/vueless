export default {
  fallbackLocale: "ua",
  backgroundsPath: "static/backgrounds/",
  strategyOverwrite: false,
  component: /*ui*/ {
    // USelect: {
    //   i18n: {
    //     add: i18n.t("label.add"),
    //   },
    // },
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
