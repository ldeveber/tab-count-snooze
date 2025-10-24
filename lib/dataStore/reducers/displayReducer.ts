import {
  type FilterOptions,
  SORT_BY,
  SORT_OPTION,
  type SortOptions,
} from "@/lib/options";

export type State = {
  filters: FilterOptions;
  sort: SortOptions;
};

const createInitialFilterOptions = (): FilterOptions => ({
  dupesOnly: false,
  stale: false,
  search: "",
});

const createInitialSortOptions = (): SortOptions => ({
  key: SORT_OPTION.Default,
  direction: SORT_BY.Ascending,
});

export const createInitialState = (): State => ({
  filters: createInitialFilterOptions(),
  sort: createInitialSortOptions(),
});

export const initialState: State = createInitialState();

export const ACTION_TYPES = [
  "search",
  "resetFilter",
  "filter",
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
      dupesOnly: boolean;
      stale: boolean;
      type: "filter";
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
    case "filter": {
      return {
        ...state,
        filters: {
          ...state.filters,
          dupesOnly: action.dupesOnly,
          stale: action.stale,
        },
      };
    }
    case "resetFilter": {
      return {
        ...state,
        filters: createInitialFilterOptions(),
      };
    }
    case "resetSort": {
      return {
        ...state,
        sort: createInitialSortOptions(),
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
