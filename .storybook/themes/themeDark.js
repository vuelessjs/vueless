import { create } from "@storybook/theming/create";
import colors from "tailwindcss/colors.js";

export default create({
  base: "dark",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  brandTitle: "Vueless UI",
  brandUrl: "https://vueless.com",
  brandImage:
    "https://raw.githubusercontent.com/vuelessjs/vueless-storybook/main/public/images/vueless-logo-dark.svg",
  brandTarget: "_blank",

  // Main colors
  colorPrimary: colors.gray["200"],
  colorSecondary: colors.gray["700"],

  // UI
  appBg: colors.gray["900"],
  appPreviewBg: colors.gray["900"],
  appBorderColor: colors.gray["900"],
  appBorderRadius: 0,

  // Text colors
  textColor: colors.gray["300"],
  textInverseColor: colors.gray["800"],

  // Toolbar default and active colors
  barTextColor: colors.gray["500"],
  barHoverColor: colors.gray["400"],
  barSelectedColor: colors.gray["300"],
  barBg: colors.gray["950"],

  // Form colors
  inputBg: colors.gray["950"],
  inputBorder: colors.gray["600"],
  inputTextColor: colors.gray["100"],
  inputBorderRadius: 4,

  buttonBg: colors.gray["800"],
  buttonBorder: colors.gray["800"],
  booleanBg: colors.gray["900"],
  booleanSelectedBg: colors.gray["800"],
});
