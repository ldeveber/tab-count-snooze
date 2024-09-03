import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import failOnConsole from "vitest-fail-on-console";
import chromeMock from "./chromeMock";

failOnConsole();

beforeEach(() => {
  vi.stubGlobal("chrome", chromeMock);
});

afterEach(() => {
  cleanup();
});
