import { create } from "@storybook/theming/create";
import twConfig from "/tailwind.config";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  // Main colors
  colorPrimary: twConfig.theme.colors.gray["900"],
  colorSecondary: twConfig.theme.colors.gray["500"],

  // UI
  appBg: twConfig.theme.colors.gray["100"],
  appPreviewBg: twConfig.theme.colors.gray["50"],
  appBorderColor: twConfig.theme.colors.gray["200"],
  appContentBg: twConfig.theme.colors.gray["50"],
  appBorderRadius: 8,

  // Text colors
  textColor: twConfig.theme.colors.gray["900"],
  textInverseColor: twConfig.theme.colors.gray["50"],

  // Toolbar default and active colors
  barTextColor: twConfig.theme.colors.gray["500"],
  barHoverColor: twConfig.theme.colors.gray["600"],
  barSelectedColor: twConfig.theme.colors.gray["700"],
  barBg: twConfig.theme.colors.white,

  // Form colors
  inputBg: twConfig.theme.colors.white,
  inputBorder: twConfig.theme.colors.gray["300"],
  inputTextColor: twConfig.theme.colors.gray["900"],
  inputBorderRadius: 4,

  buttonBg: twConfig.theme.colors.gray["100"],
  buttonBorder: twConfig.theme.colors.gray["200"],
  booleanBg: twConfig.theme.colors.gray["50"],
  booleanSelectedBg: twConfig.theme.colors.gray["200"],
});
