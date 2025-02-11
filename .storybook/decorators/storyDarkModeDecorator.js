import { DecoratorHelpers } from "@storybook/addon-themes";
import { setTheme } from "../../src/index.ts";
import { COLOR_MODE_KEY } from "../../src/constants.js";

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export const storyDarkModeDecorator = () => {
  /* Set theme className to html tag before initialization (fix white blink issue). */
  const sbAddonThemesConfig = localStorage.getItem("sb-addon-themes-3") || {};
  const storybookTheme = JSON.parse(sbAddonThemesConfig).current || "light";

  document.documentElement.classList.add(storybookTheme);

  setTimeout(() => {
    document.documentElement.classList.remove(storybookTheme);
  }, 4000);

  /* Initialize theme state. */
  const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");
  const preferScheme = prefersColorSchemeDark.matches ? "dark" : "light";
  const cachedColorMode = localStorage.getItem(COLOR_MODE_KEY) || preferScheme;

  initializeThemeState(["light", "dark"], cachedColorMode);

  return (story, context) => {
    const theme = pluckThemeFromContext(context);

    setTheme({
      // TODO: Remove this condition when all component will have dark classes
      colorMode: process.env.NODE_ENV === "development" ? theme : "light",
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
