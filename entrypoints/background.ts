import { browser, defineBackground } from "#imports";
import { handleRuntimeConnect, initializeStore } from "@/lib/background/store";

export default defineBackground(() => {
  console.log("Tab Count Snooze background ready", {
    id: browser.runtime.id,
  });

  void initializeStore();
  browser.runtime.onConnect.addListener(handleRuntimeConnect);
});
