import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { SORT_OPTION } from "src/utils/options";

export type State = { key: SORT_OPTION; direction: "asc" | "desc" };

export const initialState: State = {
  key: SORT_OPTION.Default,
  direction: "asc",
};

const SortContext = createContext<State>(initialState);
const SortDispatchContext = createContext<Dispatch<ActionType>>(() => {});

type ActionType =
  | {
      sort: SORT_OPTION;
      direction?: "asc" | "desc";
      type: "update";
    }
  | {
      type: "reset";
    };
function sortReducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "update": {
      return {
        ...state,
        key: action.sort,
      };
    }
    case "reset": {
      return initialState;
    }
  }
}

export default function SortProvider({
  children,
  testState,
}: PropsWithChildren<{
  testState?: State;
}>) {
  const [sort, dispatch] = useReducer(sortReducer, testState || initialState);

  return (
    <SortContext.Provider value={sort}>
      <SortDispatchContext.Provider value={dispatch}>{children}</SortDispatchContext.Provider>
    </SortContext.Provider>
  );
}

export function useSort() {
  return useContext(SortContext).key;
}

export function useSortDispatch() {
  return useContext(SortDispatchContext);
}
