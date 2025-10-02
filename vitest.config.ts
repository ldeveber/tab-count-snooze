import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

const reporter = process.env.CI
  ? ["text", "json", "json-summary"]
  : ["text-summary", "json", "json-summary", "html"];

/**
 * @see https://wxt.dev/guide/essentials/unit-testing.html
 */
export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
    setupFiles: "./tests/unit/vitest.setup.ts",
    include: ["./tests/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    coverage: {
      enabled: true,
      provider: "v8",
      reporter,
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
