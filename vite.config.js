import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  plugins: [
    solid(),
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
