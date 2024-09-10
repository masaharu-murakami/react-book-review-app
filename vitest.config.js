/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/__test__/**/*.test.jsx"],
    environment: "jsdom",
    globals: true, // expectが使えるようになります
  },
});
