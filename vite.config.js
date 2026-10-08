import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        ankieta: resolve(__dirname, "Ankieta/index.html"),
        event: resolve(__dirname, "Event/index.html"),
        kontakt: resolve(__dirname, "Kontakt/index.html"),
      },
    },
  },
});
