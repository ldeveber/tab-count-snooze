import { vi } from "vitest";
import { type Browser, browser } from "#imports";
import type { DataMessage } from "@/lib/dataStore/messages";

type Listener<T extends (...args: unknown[]) => void> = T;

interface MockListener<T extends (...args: unknown[]) => void>
  extends Browser.events.Event<T> {
  _emit: (...args: Parameters<T>) => void;
}

function createEvent<
  T extends (...args: unknown[]) => void,
>(): MockListener<T> {
  const listeners = new Set<Listener<T>>();

  const getRules: Browser.events.Event<T>["getRules"] = ((
    ruleIdentifiersOrCallback:
      | string[]
      | ((rules: Browser.events.Rule[]) => void),
    maybeCallback?: (rules: Browser.events.Rule[]) => void,
  ) => {
    const callback =
      typeof ruleIdentifiersOrCallback === "function"
        ? ruleIdentifiersOrCallback
        : maybeCallback;
    callback?.([]);
  }) as Browser.events.Event<T>["getRules"];

  const removeRules: Browser.events.Event<T>["removeRules"] = () => {};

  const addRules: Browser.events.Event<T>["addRules"] = (
    _rules: Browser.events.Rule[],
    callback?: (rules: Browser.events.Rule[]) => void,
  ) => {
    callback?.([]);
  };

  return {
    addListener: vi.fn((cb: Listener<T>) => {
      listeners.add(cb);
    }),
    removeListener: vi.fn((cb: Listener<T>) => {
      listeners.delete(cb);
    }),
    hasListener: vi.fn((cb: Listener<T>) => listeners.has(cb)),
    _emit: (...args: Parameters<T>) => {
      listeners.forEach((listener) => {
        listener(...args);
      });
    },
    hasListeners: () => listeners.size > 0,
    getRules,
    removeRules,
    addRules,
  } as MockListener<T>;
}

const mockPorts: Array<{
  port: Browser.runtime.Port;
  onMessage: ReturnType<typeof createEvent<(message: unknown) => void>>;
  onDisconnect: ReturnType<typeof createEvent<() => void>>;
}> = [];

export const connectMock = vi.fn<typeof browser.runtime.connect>(() => {
  const onMessage = createEvent<(message: unknown) => void>();
  const onDisconnect = createEvent<() => void>();

  const port = {
    name: "data",
    disconnect: vi.fn(() => {
      onDisconnect._emit();
    }),
    postMessage: vi.fn(),
    onMessage,
    onDisconnect,
  };

  mockPorts.push({ port, onMessage, onDisconnect });

  return port;
});

Object.defineProperty(browser.runtime, "connect", {
  configurable: true,
  value: connectMock,
});

Object.defineProperty(browser.runtime, "lastError", {
  configurable: true,
  get: () => undefined,
});

export function resetConnectMock() {
  connectMock.mockClear();
  mockPorts.length = 0;
}

export function emitRuntimeMessage(message: DataMessage) {
  mockPorts.forEach(({ onMessage }) => {
    onMessage._emit(message);
  });
}

export function emitRuntimeDisconnect() {
  mockPorts.forEach(({ onDisconnect }) => {
    onDisconnect._emit();
  });
}
