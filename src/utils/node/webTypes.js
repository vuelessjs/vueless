import { vuelessConfig } from "./vuelessConfig.js";

export async function buildWebTypes(srcDir) {
  try {
    const { default: build } = await import("@vueless/storybook/webTypes/index.js");

    await build(vuelessConfig, srcDir);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}
