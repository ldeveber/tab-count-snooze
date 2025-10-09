import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

/**
 * @see https://wxt.dev/guide/essentials/unit-testing.html
 */
export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ["github-actions", "verbose", "json"]
      : ["default", "html", "hanging-process"],
    mockReset: true,
    restoreMocks: true,
    setupFiles: "./tests/unit/vitest.setup.ts",
    include: ["./tests/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: process.env.GITHUB_ACTIONS
        ? ["text", "json", "json-summary"]
        : ["text-summary", "json", "json-summary", "html"],
      reportsDirectory: "./tests/unit/coverage",
      reportOnFailure: true,
      include: [
        "components/**/*.ts",
        "components/**/*.tsx",
        "entrypoints/**/*.ts",
        "entrypoints/**/*.tsx",
        "lib/**/*.ts",
        "lib/**/*.tsx",
        "utils/**/*.ts",
        "utils/**/*.tsx",
      ],
      exclude: [
        "**/__tests__/*.*",
        "src/**/*.d.ts",
        "components/App.tsx",
        "components/AppWrap.tsx",
        "entrypoints/**/main.tsx",
        "utils/dayjs.ts",
      ],
      thresholds: {
        lines: 40,
        statements: 40,
        functions: 65,
        branches: 70,
      },
    },
  },
  plugins: [WxtVitest()],
});
