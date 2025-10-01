import { defineAppConfig } from "#imports";

// @see https://wxt.dev/guide/essentials/config/environment-variables.html#built-in-environment-variables
declare module "wxt/utils/define-app-config" {
  export interface WxtAppConfig {
    isDev: boolean;
    isChrome: boolean;
  }
}

export default defineAppConfig({
  isDev: import.meta.env.DEV,
  isChrome: import.meta.env.CHROME,
});
