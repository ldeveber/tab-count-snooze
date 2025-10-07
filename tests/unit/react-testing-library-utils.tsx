import { type RenderOptions, render } from "@testing-library/react";
import type React from "react";
import type { PropsWithChildren } from "react";
import DataProviderProvider from "@/utils/dataStore/DataProvider";
import { initialState, type State } from "@/utils/dataStore/state";
import type { SORT_OPTION } from "@/utils/options";

interface TestState extends State {
  windows: {
    readonly map: ReadonlyMap<number, Browser.windows.Window>;
  };
  tabGroups: {
    readonly map: ReadonlyMap<number, Browser.tabGroups.TabGroup>;
  };
  tabs: {
    readonly selectedTabIds: readonly number[];
    readonly map: ReadonlyMap<number, Browser.tabs.Tab>;
  };
  display: {
    readonly filters: {
      dupes: boolean;
      search: string;
    };
    readonly sort: {
      key: SORT_OPTION;
      direction: "asc" | "desc";
    };
  };
}

function DataProvider({
  children,
  state = {},
}: PropsWithChildren<{ state?: Partial<TestState> }>) {
  return (
    <DataProviderProvider testState={{ ...initialState, ...state }}>
      {children}
    </DataProviderProvider>
  );
}

const renderWithContext = (
  ui: React.ReactElement,
  state?: Partial<TestState>,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(ui, {
    wrapper: ({ ...props }) => <DataProvider state={state} {...props} />,
    ...options,
  });

export * from "@testing-library/react";
export { render as origRender, renderWithContext };
