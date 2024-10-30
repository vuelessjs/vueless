import fs from "node:fs";
import { compileTemplate } from "vue/compiler-sfc";
import { optimize as optimizeSvg } from "svgo";

const DEFAULT_SVGO_CONFIG = {
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
};

export async function loadSvg(id, options) {
  const {
    defaultImport = "url",
    svgo = true,
    svgoConfig = DEFAULT_SVGO_CONFIG,
    debug = false,
  } = options;
  const svgRegex = /\.svg(\?(raw|url|component|skipsvgo))?$/;

  if (!id.match(svgRegex)) {
    return;
  }

  let svg;
  let [svgPath, query] = id.split("?", 2);
  const importType = query || defaultImport;

  // clear svg path from prefix if exist
  svgPath = svgPath.replace("/__skip_vite/", "");

  // use default svg loader
  if (importType === "url" && !svgPath.includes(".generated")) {
    return;
  }

  if (debug) {
    // eslint-disable-next-line no-console
    console.log("iconPath:", svgPath);
  }

  try {
    svg = await fs.promises.readFile(svgPath, "utf-8");
  } catch {
    // define an empty svg to prevent a UI crash.
    svg = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`;
    // eslint-disable-next-line no-console
    console.warn("\n", `${id} couldn't be loaded by vueless vite plugin.`);
  }

  if (importType === "raw") {
    return `export default ${JSON.stringify(svg)}`;
  }

  if (svgo !== false && query !== "skipsvgo") {
    svg = optimizeSvg(svg, {
      ...svgoConfig,
      svgPath,
    }).data;
  }

  // prevent compileTemplate from removing the style tag
  svg = svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, "</component");

  const { code } = compileTemplate({
    id: JSON.stringify(id),
    source: svg,
    filename: svgPath,
    transformAssetUrls: false,
  });

  return `
    ${code}
    export default { render: render }
  `;
}
