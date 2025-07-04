import { create } from "storybook/theming/create";
import { TAILWIND_COLORS } from "./tailwindColors.js";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  brandTitle: "Vueless UI",
  brandUrl: "https://vueless.com",
  brandImage:
    "https://raw.githubusercontent.com/vuelessjs/vueless-storybook/main/public/images/vueless-logo-light.svg",
  brandTarget: "_blank",

  // Main colors
  colorPrimary: TAILWIND_COLORS.gray["900"],
  colorSecondary: TAILWIND_COLORS.gray["500"],

  // UI
  appBg: TAILWIND_COLORS.white,
  appPreviewBg: TAILWIND_COLORS.gray["50"],
  appBorderColor: TAILWIND_COLORS.gray["300"],
  appBorderRadius: 0,

  // Text colors
  textColor: TAILWIND_COLORS.gray["900"],
  textInverseColor: TAILWIND_COLORS.gray["900"],

  // Toolbar default and active colors
  barTextColor: TAILWIND_COLORS.gray["500"],
  barHoverColor: TAILWIND_COLORS.gray["600"],
  barSelectedColor: TAILWIND_COLORS.gray["700"],
  barBg: TAILWIND_COLORS.gray["50"],

  // Form colors
  inputBg: TAILWIND_COLORS.white,
  inputBorder: TAILWIND_COLORS.gray["300"],
  inputTextColor: TAILWIND_COLORS.gray["900"],
  inputBorderRadius: 4,

  buttonBg: TAILWIND_COLORS.gray["100"],
  buttonBorder: TAILWIND_COLORS.gray["200"],
  booleanBg: TAILWIND_COLORS.gray["50"],
  booleanSelectedBg: TAILWIND_COLORS.gray["200"],
});
