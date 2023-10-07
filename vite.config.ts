import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

const isMockOn = process.env.MOCK === "on";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
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
