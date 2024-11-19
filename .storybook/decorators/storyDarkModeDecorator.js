import { DecoratorHelpers } from "@storybook/addon-themes";
import { vuelessConfig } from "../../src/utils/ui.ts";
import { setTheme } from "../../src/index.ts";

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export const storyDarkModeDecorator = () => {
  const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");
  const preferScheme = prefersColorSchemeDark.matches ? "dark" : "light";
  const cachedColorMode = localStorage.getItem("vl-color-mode") || preferScheme;

  initializeThemeState(["light", "dark"], cachedColorMode);

  return (story, context) => {
    const theme = pluckThemeFromContext(context);

    setTheme({
      ...vuelessConfig,
      colorMode: theme,
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
