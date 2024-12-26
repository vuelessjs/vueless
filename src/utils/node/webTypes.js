import { vuelessConfig } from "./vuelessConfig.js";

export async function buildWebTypes() {
  try {
    const { default: build } = await import("@vueless/storybook/webTypes");

    await build(vuelessConfig);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}
