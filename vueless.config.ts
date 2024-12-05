export default {
  strategy: "merge",
  brand: "grayscale",
  gray: "cool",
  ring: 4,
  ringOffset: 0,
  ringOffsetColorLight: "#ffffff", // white
  ringOffsetColorDark: "#111827", // gray-900
  rounding: 8,
  darkMode: "auto",
  directive: {
    // directive configs
  },
  component: /*tw*/ {
    // component configs
    UButton: {
      props: [
        {
          name: "featured",
          type: "boolean",
          required: true,
          description: "Some featured prop.",
        },
        {
          name: "size",
          values: ["sm", "md", "lg"],
        },
        {
          name: "color",
          ignore: true,
        },
      ],
    },
  },
  tailwindMerge: {},
};
