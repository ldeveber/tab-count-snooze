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
        onChanged: {
          addListener: vi.fn().mockResolvedValue(),
          removeListener: vi.fn().mockResolvedValue(),
        },
        clear: vi.fn(),
        get: vi.fn().mockImplementation((defaultValue) => Promise.resolve(defaultValue)),
        remove: vi.fn(),
        set: vi.fn(),
      },
    },
    tabs: {
      onCreated: {
        addListener: vi.fn().mockResolvedValue(),
        removeListener: vi.fn().mockResolvedValue(),
      },
      onRemoved: {
        addListener: vi.fn().mockResolvedValue(),
        removeListener: vi.fn().mockResolvedValue(),
      },
      group: vi.fn().mockReturnValue(Promise.resolve(faker.number.int())),
      update: vi.fn(),
      remove: vi.fn(),
    },
    tabGroups: {
      query: vi.fn().mockResolvedValue(Promise.resolve([])),
      update: vi.fn(),
    },
    windows: {
      onCreated: {
        addListener: vi.fn().mockResolvedValue(),
        removeListener: vi.fn().mockResolvedValue(),
      },
      onRemoved: {
        addListener: vi.fn().mockResolvedValue(),
        removeListener: vi.fn().mockResolvedValue(),
      },
      getAll: vi.fn().mockResolvedValue([]),
      update: vi.fn(),
    },
  });
});

afterEach(() => {
  cleanup();
});
