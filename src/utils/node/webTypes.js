import { vuelessConfig } from "./vuelessConfig";

export async function buildWebTypes(srcDir) {
  try {
    const { default: build } = await import("@vueless/storybook/webTypes/index.js");

    await build(vuelessConfig, srcDir);
  } catch (error) {
    if (error.code !== "ERR_MODULE_NOT_FOUND") {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
}
