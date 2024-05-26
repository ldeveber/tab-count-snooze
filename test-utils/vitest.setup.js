import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.stubGlobal("chrome", {
    runtime: {
      getURL: vi.fn().mockReturnValue("chrome-extension://meow/_favicon/purr.svg"),
    },
    storage: {
      sync: {
        onChanged: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
        clear: vi.fn(),
        get: vi.fn(),
        remove: vi.fn(),
        set: vi.fn(),
      },
    },
    tabs: {
      onCreated: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
      onRemoved: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
      group: vi.fn().mockReturnValue(Promise.resolve(faker.number.int())),
      update: vi.fn(),
      remove: vi.fn(),
    },
    tabGroups: { query: vi.fn(), update: vi.fn() },
    windows: {
      onCreated: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
      onRemoved: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
      getAll: vi.fn(),
      update: vi.fn(),
    },
  });
});

afterEach(() => {
  cleanup();
});
