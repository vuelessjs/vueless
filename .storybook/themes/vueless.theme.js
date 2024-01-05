import { create } from "@storybook/theming/create";
import twConfig from "../../tailwind.config";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  brandTitle: "Vueless UI",
  brandUrl: "https://vueless.com",
  // brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
  brandTarget: "_self",

  // Main colors
  colorPrimary: twConfig.theme.colors.gray["900"],
  colorSecondary: twConfig.theme.colors.gray["500"],

  // UI
  appBg: twConfig.theme.colors.white,
  appPreviewBg: twConfig.theme.colors.gray["50"],
  appBorderColor: twConfig.theme.colors.gray["300"],
  appBorderRadius: 0,

  // Text colors
  textColor: twConfig.theme.colors.gray["900"],
  textInverseColor: twConfig.theme.colors.gray["50"],

  // Toolbar default and active colors
  barTextColor: twConfig.theme.colors.gray["500"],
  barHoverColor: twConfig.theme.colors.gray["600"],
  barSelectedColor: twConfig.theme.colors.gray["700"],
  barBg: twConfig.theme.colors.gray["50"],

  // Form colors
  inputBg: twConfig.theme.colors.white,
  inputBorder: twConfig.theme.colors.gray["300"],
  inputTextColor: twConfig.theme.colors.gray["900"],
  inputBorderRadius: 4,

  buttonBg: twConfig.theme.colors.gray["100"],
  buttonBorder: twConfig.theme.colors.gray["100"],
  booleanBg: twConfig.theme.colors.white,
  booleanSelectedBg: twConfig.theme.colors.gray["100"],
});
