import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// @see https://wxt.dev/api/reference/wxt/interfaces/InlineConfig.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  autoIcons: {},
  analysis: { enabled: true },
  manifest: ({ mode, command }) => {
    const manifest = {
      name: "Tab Count Snooze",
      description:
        "Count your open tabs/windows, and then snooze them for later.",
      // @see https://wxt.dev/guide/essentials/config/manifest.html#permissions
      permissions: [
        "tabs",
        "tabGroups",
        "activeTab",
        "sidePanel",
        "storage",
        "favicon",
      ],
    };
    if (mode === "development" && command === "serve") {
      return {
        ...manifest,
        name: "Tab Count Snooze (Dev)",
      };
    }
    return manifest;
  },
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["@emotion/react"],
    },
  }),
});
