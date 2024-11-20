import { DecoratorHelpers } from "@storybook/addon-themes";
import { setTheme } from "../../src/index.ts";
import { COLOR_MODE_KEY } from "../../src/constants.js";

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export const storyDarkModeDecorator = () => {
  const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");
  const preferScheme = prefersColorSchemeDark.matches ? "dark" : "light";
  const cachedColorMode = localStorage.getItem(COLOR_MODE_KEY) || preferScheme;

  initializeThemeState(["light", "dark"], cachedColorMode);

  return (story, context) => {
    const theme = pluckThemeFromContext(context);

    setTheme({
      // TODO: Remove this condition when all component will have dark classes
      colorMode: process.env.NODE_ENV !== "development" ? theme : "light",
    });

    return {
      components: { story },
      setup() {
        return {
          theme,
        };
      },
      template: `<story />`,
    };
  };
};
