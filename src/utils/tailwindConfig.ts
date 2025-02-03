import { isSSR, isCSR } from "./helper.ts";

import type { Config } from "tailwindcss";

/**
 * Load Tailwind config from the project root.
 * Both for server and client side renderings.
 * IIFE for SSR is used to prevent top level await issue.
 */
export let tailwindConfig: Config;

if (isSSR) {
  /* Load Tailwind config from the project root in IIFE (no top-level await). */
  (async () => {
    try {
      const filePath = `${process.cwd()}/tailwind.config`;

      tailwindConfig = (await import(/* @vite-ignore */ `${filePath}.js`)).default;

      if (!tailwindConfig) {
        tailwindConfig = (await import(/* @vite-ignore */ `${filePath}.ts`)).default;
      }
    } catch {
      tailwindConfig = {} as Config;
    }
  })();
}

if (isCSR) {
  tailwindConfig = Object.values(
    import.meta.glob("./tailwind.config.{js,ts}", { eager: true, import: "default" }),
  )[0] as Config;
}
