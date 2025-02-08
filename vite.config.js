import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: false,
      manifestFilename: "manifest.json",
      devOptions: { enabled: true },
    }),
  ],
});
