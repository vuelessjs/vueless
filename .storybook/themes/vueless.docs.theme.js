import { create } from "@storybook/theming/create";
import colors from "tailwindcss/colors";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  // Main colors
  colorPrimary: colors.gray["900"],
  colorSecondary: colors.gray["500"],

  // UI
  appBg: colors.gray["100"],
  appPreviewBg: colors.gray["50"],
  appBorderColor: colors.gray["200"],
  appContentBg: colors.gray["50"],
  appBorderRadius: 8,

  // Text colors
  textColor: colors.gray["900"],
  textInverseColor: colors.gray["50"],

  // Toolbar default and active colors
  barTextColor: colors.gray["500"],
  barHoverColor: colors.gray["600"],
  barSelectedColor: colors.gray["700"],
  barBg: colors.white,

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.gray["300"],
  inputTextColor: colors.gray["900"],
  inputBorderRadius: 4,

  buttonBg: colors.gray["100"],
  buttonBorder: colors.gray["200"],
  booleanBg: colors.gray["50"],
  booleanSelectedBg: colors.gray["200"],
});
