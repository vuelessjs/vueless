/**
 * This file is needs only to suppress Tailwind CSS warns:
 * warn - The `content` option in your Tailwind CSS configuration is missing or empty.
 * warn - Configure your content sources or your generated CSS will be missing styles.
 * warn - https://tailwindcss.com/docs/content-configuration
 *
 * For Tailwind CSS configuration use ./.storybook/tailwind.config.js
 */
export default {
  content: ["./src/**/*.{vue,js,ts}"],
};
