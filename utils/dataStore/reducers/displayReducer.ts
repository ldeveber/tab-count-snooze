import { type FreezedObject, produce, unfreeze } from "structurajs";
import { SORT_OPTION } from "@/utils/options";

type FilterState = FreezedObject<{
  dupes: boolean;
  search: string;
}>;

type SortState = FreezedObject<{
  key: SORT_OPTION;
  direction: "asc" | "desc";
}>;

export type State = FreezedObject<{
  filters: FilterState;
  sort: SortState;
}>;

const initialFilterState: FilterState = {
  dupes: false,
  search: "",
};
export const initialState: State = {
  filters: initialFilterState,
  sort: {
    key: SORT_OPTION.Default,
    direction: "asc",
  },
};

export type Action =
  | {
      search: string;
      type: "search";
    }
  | {
      type: "resetFilter";
    }
  | {
      sort: SORT_OPTION;
      direction?: "asc" | "desc";
      type: "sort";
    }
  | {
      type: "resetSort";
    }
  | {
      type: "clear";
    };
export default function displayReducer(state: State, action: Action): State {
  switch (action.type) {
    case "search": {
      return produce(state, (draft) => {
        draft.filters.search = action.search;
      });
    }
    case "resetFilter": {
      return produce(state, (draft) => {
        draft.filters = unfreeze(initialFilterState);
      });
    }

    case "resetSort": {
      return produce(state, (draft) => {
        draft.sort = initialState.sort;
      });
    }
    case "sort": {
      return produce(state, (draft) => {
        draft.sort.key = action.sort;
        draft.sort.direction = action.direction ? action.direction : "asc";
      });
    }

    case "clear": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
