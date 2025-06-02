import { create } from "storybook/theming/create";
import { TAILWIND_COLORS } from "./tailwindColors.js";

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
  colorPrimary: TAILWIND_COLORS.gray["200"],
  colorSecondary: TAILWIND_COLORS.gray["700"],

  // UI
  appBg: TAILWIND_COLORS.gray["900"],
  appPreviewBg: TAILWIND_COLORS.gray["900"],
  appBorderColor: TAILWIND_COLORS.gray["900"],
  appBorderRadius: 0,

  // Text colors
  textColor: TAILWIND_COLORS.gray["300"],
  textInverseColor: TAILWIND_COLORS.gray["800"],

  // Toolbar default and active colors
  barTextColor: TAILWIND_COLORS.gray["500"],
  barHoverColor: TAILWIND_COLORS.gray["400"],
  barSelectedColor: TAILWIND_COLORS.gray["300"],
  barBg: TAILWIND_COLORS.gray["950"],

  // Form colors
  inputBg: TAILWIND_COLORS.gray["950"],
  inputBorder: TAILWIND_COLORS.gray["600"],
  inputTextColor: TAILWIND_COLORS.gray["100"],
  inputBorderRadius: 4,

  buttonBg: TAILWIND_COLORS.gray["800"],
  buttonBorder: TAILWIND_COLORS.gray["800"],
  booleanBg: TAILWIND_COLORS.gray["900"],
  booleanSelectedBg: TAILWIND_COLORS.gray["800"],
});
