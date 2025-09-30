import { defineAppConfig } from "#imports";

declare module "wxt/utils/define-app-config" {
  export interface WxtAppConfig {
    isDev: boolean;
  }
}

export default defineAppConfig({
  isDev: import.meta.env.DEV,
});
