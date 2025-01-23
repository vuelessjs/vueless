import { create } from "@storybook/theming/create";
import { TAILWIND_COLORS } from "../../src/constants.js";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  // Main colors
  colorPrimary: TAILWIND_COLORS.cool["900"],
  colorSecondary: TAILWIND_COLORS.cool["500"],

  // UI
  appBg: TAILWIND_COLORS.cool["100"],
  appPreviewBg: TAILWIND_COLORS.cool["50"],
  appBorderColor: TAILWIND_COLORS.cool["200"],
  appContentBg: TAILWIND_COLORS.cool["50"],
  appBorderRadius: 8,

  // Text colors
  textColor: TAILWIND_COLORS.cool["900"],
  textInverseColor: TAILWIND_COLORS.cool["50"],

  // Toolbar default and active colors
  barTextColor: TAILWIND_COLORS.cool["500"],
  barHoverColor: TAILWIND_COLORS.cool["600"],
  barSelectedColor: TAILWIND_COLORS.cool["700"],
  barBg: TAILWIND_COLORS.white,

  // Form colors
  inputBg: TAILWIND_COLORS.white,
  inputBorder: TAILWIND_COLORS.cool["300"],
  inputTextColor: TAILWIND_COLORS.cool["900"],
  inputBorderRadius: 4,

  buttonBg: TAILWIND_COLORS.cool["100"],
  buttonBorder: TAILWIND_COLORS.cool["200"],
  booleanBg: TAILWIND_COLORS.cool["50"],
  booleanSelectedBg: TAILWIND_COLORS.cool["200"],
});
