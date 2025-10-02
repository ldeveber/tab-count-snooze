import { SORT_BY, SORT_OPTION } from "@/utils/options";

type FilterState = {
  dupes: boolean;
  search: string;
};

type SortState = {
  key: SORT_OPTION;
  direction: SORT_BY;
};

export type State = {
  filters: FilterState;
  sort: SortState;
};

const createInitialFilterState = (): FilterState => ({
  dupes: false,
  search: "",
});

const createInitialSortState = (): SortState => ({
  key: SORT_OPTION.Default,
  direction: SORT_BY.Ascending,
});

export const createInitialState = (): State => ({
  filters: createInitialFilterState(),
  sort: createInitialSortState(),
});

export const initialState: State = createInitialState();

export const ACTION_TYPES = [
  "search",
  "resetFilter",
  "sort",
  "resetSort",
  "clear",
];
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
      direction?: SORT_BY;
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
      return {
        ...state,
        filters: { ...state.filters, search: action.search },
      };
    }
    case "resetFilter": {
      return {
        ...state,
        filters: createInitialFilterState(),
      };
    }
    case "resetSort": {
      return {
        ...state,
        sort: createInitialSortState(),
      };
    }
    case "sort": {
      return {
        ...state,
        sort: {
          key: action.sort,
          direction: action.direction ?? SORT_BY.Ascending,
        },
      };
    }
    case "clear": {
      return createInitialState();
    }
    default: {
      return state;
    }
  }
}
