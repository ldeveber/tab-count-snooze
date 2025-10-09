import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// @see https://wxt.dev/api/reference/wxt/interfaces/InlineConfig.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  // @see https://wxt.dev/guide/essentials/config/auto-imports.html#disabling-auto-imports
  imports: false,
  manifest: {
    name: "Tab Count Snooze",
    description:
      "Count your open tabs/windows, and then snooze them for later.",
    // @see https://wxt.dev/guide/essentials/config/manifest.html#permissions
    permissions: ["tabs", "tabGroups", "sidePanel", "favicon", "contextMenus"],
    // optional_permissions: [],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
