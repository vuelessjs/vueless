import { getVuelessConfig } from "./vuelessConfig.js";

export async function buildWebTypes({ vuelessSrcDir, basePath } = {}) {
  try {
    const vuelessConfig = await getVuelessConfig(basePath);
    const { buildWebTypes: build } = await import("@vueless/storybook");

    await build(vuelessConfig, vuelessSrcDir);
  } catch (error) {
    if (error.code !== "ERR_MODULE_NOT_FOUND") {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
}
