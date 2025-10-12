import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { type Browser, browser } from "#imports";
import { connectMock, resetConnectMock } from "./message-utils";

Object.defineProperty(browser.runtime, "connect", {
  configurable: true,
  value: connectMock,
});

Object.defineProperty(browser.runtime, "lastError", {
  configurable: true,
  get: () => undefined,
});

Object.defineProperty(browser.runtime, "getManifest", {
  configurable: true,
  value: vi.fn<typeof browser.runtime.getManifest>(
    () =>
      ({
        manifest_version: 3,
        name: "Tab Count Snooze (test)",
        version: "999.999.999",
      }) satisfies Browser.runtime.Manifest,
  ),
});

afterEach(() => {
  cleanup();
  resetConnectMock();
});
