import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
    setupFiles: "./test-utils/vitest.setup.ts",
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html"],
      reportsDirectory: "./tests/unit/coverage",
      reportOnFailure: true,
      include: [
        "components/**/*.ts",
        "components/**/*.tsx",
        "entrypoints/**/*.ts",
        "entrypoints/**/*.tsx",
        "utils/**/*.ts",
        "utils/**/*.tsx",
      ],
      exclude: [
        "**/__tests__/*.*",
        "src/**/*.d.ts",
        "components/AppWrap.tsx",
        "utils/dayjs.ts",
      ],
      // TODO FIXME: enablewhen other tests are migrated
      // thresholds: {
      //   lines: 70,
      //   statements: 70,
      //   functions: 70,
      //   branches: 80,
      // },
    },
  },
  plugins: [WxtVitest()],
});
