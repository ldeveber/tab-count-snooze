import { coverageConfigDefaults, defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

/**
 * @see https://wxt.dev/guide/essentials/unit-testing.html
 */
export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ["github-actions", "verbose"]
      : ["default", "hanging-process"],
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
        "components/App.tsx",
        "components/AppOptions.tsx",
        "components/AppWrap.tsx",
        "entrypoints/**/main.tsx",
        "utils/dayjs.ts",
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        lines: 40,
        statements: 40,
        functions: 40,
        branches: 40,
        "lib/dataStore/**.ts": {
          statements: 80,
          functions: 80,
          branches: 80,
          lines: 80,
        },
      },
    },
  },
  plugins: [WxtVitest()],
});
