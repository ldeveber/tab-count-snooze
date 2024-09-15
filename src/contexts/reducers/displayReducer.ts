import { FILTER_TAB_PROPERTIES } from "src/utils/filterTabs";
import { SORT_OPTION } from "src/utils/options";
import { FreezedObject, produce, unfreeze } from "structurajs";

export type FilterState = FreezedObject<{
  properties: Array<FILTER_TAB_PROPERTIES>;
  dupes: boolean;
  search: string;
}>;

export type SortState = FreezedObject<{
  key: SORT_OPTION;
  direction: "asc" | "desc";
}>;

export type State = FreezedObject<{
  filters: FilterState;
  sort: SortState;
}>;

const initialFilterState: FilterState = {
  properties: [],
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
      properties: FILTER_TAB_PROPERTIES[];
      dupes?: boolean;
      type: "filter";
    }
  | {
      properties?: FILTER_TAB_PROPERTIES[];
      dupes: boolean;
      type: "filter";
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
    case "filter": {
      return produce(state, (draft) => {
        if (Array.isArray(action.properties)) {
          draft.filters.properties = action.properties;
        }
        if (typeof action.dupes === "boolean") {
          draft.filters.dupes = action.dupes;
        }
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
