import { create } from "storybook/theming/create";

export default create({
  base: "dark",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  brandTitle: "Vueless UI",
  brandUrl: "https://vueless.com",
  brandImage: "./images/vueless-logo-dark.svg",
  brandTarget: "_blank",

  // Main colors
  colorPrimary: "#e5e7eb", // gray-200
  colorSecondary: "#374151", // gray-700

  // UI
  appBg: "#111827", // gray-900
  appPreviewBg: "#111827", // gray-900
  appBorderColor: "#111827", // gray-900
  appBorderRadius: 0,

  // Text colors
  textColor: "#d1d5db", // gray-300
  textInverseColor: "#1f2937", // gray-800

  // Toolbar default and active colors
  barTextColor: "#6b7280", // gray-500
  barHoverColor: "#9ca3af", // gray-400
  barSelectedColor: "#d1d5db", // gray-300
  barBg: "#030712", // gray-950

  // Form colors
  inputBg: "#030712", // gray-950
  inputBorder: "#4b5563", // gray-600
  inputTextColor: "#f3f4f6", // gray-100
  inputBorderRadius: 4,

  buttonBg: "#1f2937", // gray-800
  buttonBorder: "#1f2937", // gray-800
  booleanBg: "#111827", // gray-900
  booleanSelectedBg: "#1f2937", // gray-800
});
