import { faker } from "@faker-js/faker";
import { vi } from "vitest";

const chromeMock = {
  runtime: {
    getURL: vi.fn().mockReturnValue("chrome-extension://meow/_favicon/purr.svg"),
  },
  storage: {
    sync: {
      onChanged: {
        addListener: vi.fn(), //.mockResolvedValue(),
        removeListener: vi.fn(), //.mockResolvedValue(),
      },
      clear: vi.fn(),
      get: vi.fn().mockImplementation((defaultValue) => Promise.resolve(defaultValue)),
      remove: vi.fn(),
      set: vi.fn(),
    },
  },
  tabs: {
    onCreated: {
      addListener: vi.fn(), //.mockResolvedValue(),
      removeListener: vi.fn(), //.mockResolvedValue(),
    },
    onUpdated: {
      addListener: vi.fn(), //.mockResolvedValue(),
      removeListener: vi.fn(), //.mockResolvedValue(),
    },
    onRemoved: {
      addListener: vi.fn(), //.mockResolvedValue(),
      removeListener: vi.fn(), //.mockResolvedValue(),
    },
    group: vi.fn().mockReturnValue(Promise.resolve(faker.number.int())),
    update: vi.fn(),
    remove: vi.fn(),
    query: vi.fn<typeof chrome.tabs.query>().mockResolvedValue([]),
  },
  tabGroups: {
    query: vi.fn<typeof chrome.tabGroups.query>().mockResolvedValue([]),
    update: vi.fn(),
  },
  windows: {
    getLastFocused: vi.fn().mockResolvedValue({
      id: "focused-window-id",
    }),
    onCreated: {
      addListener: vi.fn(), //.mockResolvedValue(),
      removeListener: vi.fn(), //.mockResolvedValue(),
    },
    onRemoved: {
      addListener: vi.fn(), //.mockResolvedValue(),
      removeListener: vi.fn(), //.mockResolvedValue(),
    },
    getAll: vi.fn<typeof chrome.windows.getAll>().mockResolvedValue([]),
    update: vi.fn<typeof chrome.windows.update>(),
  },
};

export default chromeMock;