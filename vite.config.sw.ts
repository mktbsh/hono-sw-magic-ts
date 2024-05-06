import { defineConfig } from "vite";

import baseConfig from "./vite.config";

// https://vitejs.dev/config/
export default defineConfig({
  ...baseConfig,
  build: {
    outDir: "public",
    emptyOutDir: false,
    target: "esnext",
    lib: {
      name: "sw",
      entry: "src/server/sw.ts",
      formats: ["es"],
      fileName: () => `sw.js`,
    },
  },
});
