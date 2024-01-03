/**
  Docs:
  https://vite-pwa-org.netlify.app/guide/
*/
export default {
  manifest: {
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: "static/favicons/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-348x348.png",
        sizes: "348x348",
        type: "image/png",
      },
      {
        src: "static/favicons/icon-512x512-desktop.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "static/favicons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
  includeAssets: ["favicon.ico", "assets/*", "static/*"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,gif,woff2,webmanifest}"],
    globIgnores: [".htaccess", "**/*.{map}"],
    runtimeCaching: [
      {
        urlPattern: ({ url }) => url.href.includes("/api/v1"),
        handler: "NetworkFirst",
        options: getCacheOptions("api-cache"),
      },
      {
        urlPattern: ({ url }) => url.href.includes("fonts.googleapis.com"),
        handler: "CacheFirst",
        options: getCacheOptions("google-fonts-cache"),
      },
      {
        urlPattern: ({ url }) => url.href.includes("fonts.gstatic.com"),
        handler: "CacheFirst",
        options: getCacheOptions("gstatic-fonts-cache"),
      },
    ],
  },
  devOptions: {
    enabled: false, // enables pwa in the dev env
  },
};

function getCacheOptions(cacheName) {
  return {
    cacheName,
    expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
    cacheableResponse: { statuses: [0, 200] },
  };
}
