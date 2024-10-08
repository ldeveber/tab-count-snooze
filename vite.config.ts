/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineConfig } from "vite";
import addHmr from "./utils/plugins/add-hmr";
import customDynamicImport from "./utils/plugins/custom-dynamic-import";
import inlineVitePreloadScript from "./utils/plugins/inline-vite-preload-script";
import makeManifest from "./utils/plugins/make-manifest";
import watchRebuild from "./utils/plugins/watch-rebuild";

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, "src");
const pagesDir = resolve(srcDir, "pages");
const assetsDir = resolve(srcDir, "assets");
const outDir = resolve(rootDir, "dist");
const publicDir = resolve(rootDir, "public");
const testUtilsDir = resolve(rootDir, "test-utils");

const isDev = process.env.__DEV__ === "true";
const isProduction = !isDev;

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = true;
const cacheInvalidationKeyRef = { current: generateKey() };

export default defineConfig({
  logLevel: "warn",
  resolve: {
    alias: {
      src: srcDir,
      assets: assetsDir,
      pages: pagesDir,
    },
  },
  plugins: [
    makeManifest({
      getCacheInvalidationKey,
    }),
    react(),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true }),
    isDev && watchRebuild({ afterWriteBundle: regenerateCacheInvalidationKey }),
    inlineVitePreloadScript(),
  ],
  publicDir,
  build: {
    outDir,
    minify: isProduction,
    modulePreload: false,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        "service-worker": resolve(pagesDir, "service-worker.ts"),
        popup: resolve(pagesDir, "popup.html"),
        options: resolve(pagesDir, "options.html"),
        sidepanel: resolve(pagesDir, "sidepanel.html"),
        page: resolve(pagesDir, "page.html"),
      },
      output: {
        entryFileNames: "src/pages/[name].js",
        chunkFileNames: isDev ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { name } = path.parse(assetInfo.name);
          const assetFileName =
            name === "contentStyle" ? `${name}${getCacheInvalidationKey()}` : name;
          return `assets/[ext]/${assetFileName}.chunk.[ext]`;
        },
      },
    },
  },
  test: {
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
        "src/pages/*",
        "!src/pages/service-worker.ts",
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
  },
});

function getCacheInvalidationKey() {
  return cacheInvalidationKeyRef.current;
}
function regenerateCacheInvalidationKey() {
  cacheInvalidationKeyRef.current = generateKey();
  return cacheInvalidationKeyRef;
}

function generateKey(): string {
  return `${Date.now().toFixed()}`;
}
