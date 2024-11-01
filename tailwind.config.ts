/** @type {import('tailwindcss').Config} */
import { vuelessPreset } from "./src/preset.tailwind.js";

export default {
  presets: [vuelessPreset],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
};
