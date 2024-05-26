import "@testing-library/jest-dom/vitest";
import { describe, expect, test } from "vitest";
import { closeTabs, groupTabs } from "../chrome";

describe("chrome utils", () => {
  describe("closeTabs", () => {
    test("should call correct apis", async () => {
      await closeTabs([1, 2, 3]);

      expect(chrome.tabs.remove).toHaveBeenCalledWith([1, 2, 3]);
    });
  });

  describe("groupTabs", () => {
    test("should call correct apis", async () => {
      await groupTabs([1, 2, 3], "meow");

      expect(chrome.tabs.group).toHaveBeenCalledWith({
        tabIds: [1, 2, 3],
      });
      expect(chrome.tabGroups.update).toHaveBeenCalledWith(expect.any(Number), { title: "meow" });
    });
  });
});
