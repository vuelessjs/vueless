import { create } from "storybook/theming/create";
import type { ThemeVars } from "storybook/theming";

export const themeLight: ThemeVars = create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  brandTitle: "Vueless UI",
  brandUrl: "https://vueless.com",
  brandImage: "./images/logo-light.svg",
  brandTarget: "_blank",

  // Main colors
  colorPrimary: "#111827", // gray-900
  colorSecondary: "#6b7280", // gray-500

  // UI
  appBg: "#ffffff", // white
  appPreviewBg: "#f9fafb", // gray-50
  appBorderColor: "#d1d5db", // gray-300
  appBorderRadius: 0,

  // Text colors
  textColor: "#111827", // gray-900
  textInverseColor: "#111827", // gray-900

  // Toolbar default and active colors
  barTextColor: "#6b7280", // gray-500
  barHoverColor: "#4b5563", // gray-600
  barSelectedColor: "#374151", // gray-700
  barBg: "#f9fafb", // gray-50

  // Form colors
  inputBg: "#ffffff", // white
  inputBorder: "#d1d5db", // gray-300
  inputTextColor: "#111827", // gray-900
  inputBorderRadius: 4,

  buttonBg: "#f3f4f6", // gray-100
  buttonBorder: "#e5e7eb", // gray-200
  booleanBg: "#f9fafb", // gray-50
  booleanSelectedBg: "#e5e7eb", // gray-200
});
