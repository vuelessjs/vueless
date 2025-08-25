import { create } from "storybook/theming/create";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "monospace",

  // Main colors
  colorPrimary: "#111827", // gray-900
  colorSecondary: "#6b7280", // gray-500

  // UI
  appBg: "#f3f4f6", // gray-100
  appPreviewBg: "#f9fafb", // gray-50
  appBorderColor: "#e5e7eb", // gray-200
  appContentBg: "#f9fafb", // gray-50
  appBorderRadius: 8,

  // Text colors
  textColor: "#111827", // gray-900
  textInverseColor: "#f9fafb", // gray-50

  // Toolbar default and active colors
  barTextColor: "#6b7280", // gray-500
  barHoverColor: "#4b5563", // gray-600
  barSelectedColor: "#374151", // gray-700
  barBg: "#ffffff", // white

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
