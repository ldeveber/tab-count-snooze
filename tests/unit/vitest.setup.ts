import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { browser } from "#imports";
import { connectMock, resetConnectMock } from "./message-utils";

Object.defineProperty(browser.runtime, "connect", {
  configurable: true,
  value: connectMock,
});

Object.defineProperty(browser.runtime, "lastError", {
  configurable: true,
  get: () => undefined,
});

afterEach(() => {
  cleanup();
  resetConnectMock();
});
