/* eslint-disable @typescript-eslint/no-explicit-any */

import resolveConfig from "tailwindcss/resolveConfig";
import { isSSR, isCSR } from "./utilHelper.ts";

import type { Config } from "tailwindcss";

/**
 * Load Tailwind config from the project root.
 * Both for server and client side renderings.
 * IIFE for SSR is used to prevent top level await issue.
 */
export let fullTailwindConfig: any;

if (isSSR) {
  /* Load Tailwind config from the project root in IIFE (no top-level await). */
  (async () => {
    try {
      const filePath = `${process.cwd()}/tailwind.config`;

      let tailwindConfig = (await import(/* @vite-ignore */ `${filePath}.js`)).default;

      if (!tailwindConfig) {
        tailwindConfig = (await import(/* @vite-ignore */ `${filePath}.ts`)).default;
      }

      fullTailwindConfig = resolveConfig(tailwindConfig);
    } catch {}
  })();
}

if (isCSR) {
  const tailwindConfig = Object.values(
    import.meta.glob("/tailwind.config.{js,ts}", { eager: true, import: "default" }),
  )[0] as Config;

  fullTailwindConfig = resolveConfig(tailwindConfig);
}
