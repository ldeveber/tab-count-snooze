import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useReducer,
} from "react";
import { type Action, dataReducer } from "./reducer";
import { createInitialState, type State } from "./state";

export const DataContext = createContext<State>(createInitialState());
export const DataDispatchContext = createContext<Dispatch<Action>>(() => {});

function init(provided?: State) {
  return provided ?? createInitialState();
}

export default function DataProvider({
  children,
  testState,
}: PropsWithChildren<{
  testState?: State;
}>) {
  const [state, dispatch] = useReducer(dataReducer, testState, init);

  return (
    <DataContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}
