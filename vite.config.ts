/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig, UserConfig } from "vite";
import makeManifest from "./scripts/make-manifest";

const src = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const testUtilsDir = resolve(__dirname, "test-utils");

export default defineConfig(({ command, mode }) => {
  const config: UserConfig = {
    resolve: {
      alias: { src },
    },
    plugins: [react()],
    build: {
      outDir,
      rollupOptions: {
        input: {
          service_worker: resolve(__dirname, "src", "service_worker.ts"),
          popup: resolve(__dirname, "popup.html"),
          sidepanel: resolve(__dirname, "sidepanel.html"),
          options: resolve(__dirname, "options.html"),
        },
        output: {
          entryFileNames: (chunk) => {
            if (chunk.name === "service_worker") {
              // keep this for manifest reference
              return "service_worker.js";
            }
            return "assets/[name]-[hash].js";
          },
        },
      },
    },
  };

  if (command === "build") {
    config.plugins.unshift(makeManifest());
    if (mode === "production") {
      config.build.minify = true;
      config.build.reportCompressedSize = true;
    }
    if (mode === "development") {
      config.build.watch = {
        include: ["manifest.js", "./*.html", "src/**"],
        skipWrite: false,
      };
      config.build.sourcemap = true;
      // TODO FIXME - minimal log display for watch?
      config.logLevel = "warn";
    }
  }

  if (mode === "test") {
    config.test = {
      alias: {
        "test-utils": testUtilsDir,
      },
      coverage: {
        enabled: true,
        provider: "v8",
        reporter: ["text", "json", "json-summary", "html"],
        reportOnFailure: true,
        include: ["src/**/*.ts", "src/**/*.tsx"],
        exclude: [
          "**/__tests__/*.*",
          "src/**/*.d.ts",
          "src/AppWrap.tsx",
          "src/index.tsx",
          "src/indexOptions.tsx",
          "src/utils/dayjs.ts",
          "src/utils/debug.ts",
        ],
        thresholds: {
          lines: 70,
          statements: 70,
          functions: 70,
          branches: 80,
        },
      },
      globals: true,
      environment: "jsdom",
      include: ["**/*.test.ts", "**/*.test.tsx"],
      setupFiles: "./test-utils/vitest.setup.js",
    };
  }

  return config;
});
