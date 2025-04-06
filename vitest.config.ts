import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
    setupFiles: "./test-utils/vitest.setup.ts",
  },
  plugins: [WxtVitest()],
});
