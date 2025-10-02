import { type RenderOptions, render } from "@testing-library/react";
import type React from "react";
import type { PropsWithChildren } from "react";
import DataProviderProvider from "@/lib/dataStore/DataProvider";
import { createInitialState, type State } from "@/lib/dataStore/state";

function createInitialTestState(testState?: Partial<State>) {
  const state = createInitialState();
  return { ...state, ...testState };
}

function DataProvider({
  children,
  state = {},
}: PropsWithChildren<{ state?: Partial<State> }>) {
  const testState = createInitialTestState(state);
  return (
    <DataProviderProvider testState={testState}>
      {children}
    </DataProviderProvider>
  );
}

const renderWithContext = (
  ui: React.ReactElement,
  state?: Partial<State>,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(ui, {
    wrapper: ({ ...props }) => <DataProvider state={state} {...props} />,
    ...options,
  });

export * from "@testing-library/react";
export { render as origRender, renderWithContext };
