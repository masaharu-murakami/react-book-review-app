import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://railway.bookreview.techtrain.dev",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    postcss: "./postcss.config.cjs", // PostCSSの設定を指定
  },
});
