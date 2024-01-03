/**
  Docs (the list of all rules):
  https://svgo.dev/docs/preset-default/#plugins-list
*/
export default {
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            convertColors: {
              currentColor: true,
            },
          },
        },
      },
    ],
  },
};
