import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

const isMockOn = process.env.MOCK === "on";

const base = "/";
const proxyTarget = "http://172.22.67.81:81/";

// https://vitejs.dev/config/
export default defineConfig({
  base,
  server: {
    proxy: {
      "/ca": {
        target: proxyTarget,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    isMockOn &&
      viteMockServe({
        mockPath: "mock",
        logger: true,
      }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
