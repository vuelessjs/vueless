import { withThemeByDataAttribute } from "@storybook/addon-themes";

export const storyDarkModeDecorator = (darkClass, lightClass) =>
  withThemeByDataAttribute({
    attributeName: "class",
    defaultTheme: "light",
    themes: {
      light: lightClass,
      dark: darkClass,
    },
  });
