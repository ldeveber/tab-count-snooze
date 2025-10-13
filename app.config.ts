import { browser, defineAppConfig } from "#imports";

// @see https://wxt.dev/guide/essentials/config/environment-variables.html#built-in-environment-variables
declare module "wxt/utils/define-app-config" {
  export interface WxtAppConfig {
    isDev: boolean;
    isChrome: boolean;
    version: string;
  }
}

export default defineAppConfig({
  isDev: import.meta.env.DEV,
  isChrome: import.meta.env.CHROME,
  version: browser.runtime.getManifest().version ?? "unknown",
});
