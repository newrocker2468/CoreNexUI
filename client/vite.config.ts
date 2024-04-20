import path from "path";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import prism from "vite-plugin-prismjs";
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    prism({
      languages: ["javascript", "css", "html", "typescript"],
      plugins: ["line-numbers"],
      theme: "tomorrow",
      css: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
