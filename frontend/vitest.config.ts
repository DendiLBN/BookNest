import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/__tests__/**/*.test.{ts,tsx}"],
    setupFiles: "./src/test/setup.ts",
  },
});
