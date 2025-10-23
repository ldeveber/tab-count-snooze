import { type RenderOptions, render } from "@testing-library/react";
import type React from "react";
import type { PropsWithChildren } from "react";
import DataProviderProvider from "@/lib/dataStore/DataProvider";
import { createInitialState, type State } from "@/lib/dataStore/state";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function deepMerge<T>(target: T, source?: DeepPartial<T>): T {
  if (source === undefined || source === null) {
    return target;
  }
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return source as T;
  }
  const result: Record<PropertyKey, unknown> = { ...target };

  for (const key of Object.keys(source) as Array<keyof T>) {
    const sourceValue = source[key];
    if (sourceValue === undefined) {
      continue;
    }

    const targetValue = (target as Record<keyof T, unknown>)[key];
    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = deepMerge(
        targetValue,
        sourceValue as DeepPartial<Record<PropertyKey, unknown>>,
      );
    } else {
      result[key] = sourceValue;
    }
  }
  return result as T;
}

function createInitialTestState(testState?: DeepPartial<State>): State {
  const state = createInitialState();
  return deepMerge(state, testState);
}

function DataProvider({
  children,
  state = {},
}: PropsWithChildren<{ state?: DeepPartial<State> }>) {
  const testState = createInitialTestState(state);
  return (
    <DataProviderProvider testState={testState}>
      {children}
    </DataProviderProvider>
  );
}

const renderWithContext = (
  ui: React.ReactElement,
  state?: DeepPartial<State>,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(ui, {
    wrapper: ({ ...props }) => <DataProvider state={state} {...props} />,
    ...options,
  });

export * from "@testing-library/react";
export { render as origRender, renderWithContext };
