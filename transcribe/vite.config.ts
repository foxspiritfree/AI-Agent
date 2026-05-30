import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/popup.html"),
        offscreen: resolve(__dirname, "src/offscreen/offscreen.html"),
        serviceWorker: resolve(__dirname, "src/background/serviceWorker.ts"),
        youtubePageExtractor: resolve(__dirname, "src/content/youtubePageExtractor.ts")
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (id.includes("src/content/") || id.includes("src/core/") || id.includes("src/types/")) {
            return undefined;
          }
        }
      }
    }
  }
});
