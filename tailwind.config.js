const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./vueless.config.{js,ts}", "./src/**/*.{js,ts,vue}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      spacing: {
        100: "25rem", //      400px
        125: "31.25rem", //   500px
        150: "37.5rem", //    600px
        175: "43.75rem", //   700px
        200: "50rem", //      800px
        225: "56.25rem", //   900px
        250: "62.5rem", //    1000px
        275: "68.75rem", //   1100px
        300: "75rem", //      1200px
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
        "mobile-menu-height": "3.5rem",
      },
      fontSize: {
        "2xs": ["0.625rem", "0.75rem"], //  10px
        xs: ["0.75rem", "0.875rem"], //     12px
        sm: ["0.875rem", "1rem"], //        14px
        base: ["1rem", "1.1875rem"], //     16px
        lg: ["1.125rem", "1.3125rem"], //   18px
        xl: ["1.375rem", "1.6rem"], //      22px
        "2xl": ["1.5rem", "1.75rem"], //    24px
        "3xl": ["1.75rem", "2.0625rem"], // 28px
        "4xl": ["2rem", "2.3125rem"], //    32px
        "5xl": ["3rem", "3.5rem"], //       48px
      },
      opacity: {
        15: ".15",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      brand: withOpacity("--brand-color"),
      gray: colors.gray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue,
      violet: colors.violet,
      black: colors.black,
      white: colors.white,
      orange: colors.orange,
      fuchsia: colors.fuchsia,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }

    return `rgb(var(${variableName}))`;
  };
}
