import { create } from "@storybook/theming/create";
import colors from "tailwindcss/colors.js";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  brandTitle: "Vueless UI",
  brandUrl: "https://vueless.com",
  brandImage: "/images/logo.png",
  brandTarget: "_blank",

  // Main colors
  colorPrimary: colors.gray["900"],
  colorSecondary: colors.gray["500"],

  // UI
  appBg: colors.white,
  appPreviewBg: colors.gray["50"],
  appBorderColor: colors.gray["300"],
  appBorderRadius: 0,

  // Text colors
  textColor: colors.gray["900"],
  textInverseColor: colors.gray["50"],

  // Toolbar default and active colors
  barTextColor: colors.gray["500"],
  barHoverColor: colors.gray["600"],
  barSelectedColor: colors.gray["700"],
  barBg: colors.gray["50"],

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.gray["300"],
  inputTextColor: colors.gray["900"],
  inputBorderRadius: 4,

  buttonBg: colors.gray["100"],
  buttonBorder: colors.gray["100"],
  booleanBg: colors.white,
  booleanSelectedBg: colors.gray["100"],
});
