/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import removeAttr from "react-remove-attr";
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
    removeAttr({
      extensions: ["jsx", "tsx"],
      attributes: ["data-testid"],
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
        background: resolve(pagesDir, "background", "index.ts"),
        popup: resolve(pagesDir, "popup", "index.html"),
        options: resolve(pagesDir, "options", "index.html"),
        sidepanel: resolve(pagesDir, "sidepanel", "index.html"),
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
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
      thresholds: {
        lines: 25,
        functions: 25,
        branches: 65,
        statements: 25,
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
