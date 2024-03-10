import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Weather App",
        short_name: "Weather App",
        description: "A Fully Responsive and Modern Weather App.",
        theme_color: "#4557C7",
        icons: [
          {
            src: "/weather512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: 'any'
          },
          {
            src: "/weather256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/weather128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/weather64.png",
            sizes: "64x64",
            type: "image/png",
          },
        ],
      },
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        runtimeCaching: [{
          urlPattern: new RegExp('https://api.openweathermap.org/v1'),
          method: 'GET',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'weather-api',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
