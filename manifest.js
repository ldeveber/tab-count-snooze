import fs from "node:fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  minimum_chrome_version: "121",
  default_locale: "en",
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: "__MSG_extensionName__",
  version: packageJson.version,
  description: "__MSG_extensionDescription__",
  permissions: ["tabs", "tabGroups", "activeTab", "sidePanel", "storage", "favicon"],
  web_accessible_resources: [
    {
      resources: ["_favicon/*"],
      matches: ["<all_urls>"],
      extension_ids: ["*"],
    },
  ],
  side_panel: {
    default_path: "src/pages/sidepanel/index.html",
  },
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
  },
  icons: {
    32: "icon_32.png",
    64: "icon_64.png",
    128: "icon_128.png",
    256: "icon_256.png",
  },
};

export default manifest;
