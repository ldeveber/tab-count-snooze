// export interface SnoozedTabOptions {}
// export const defaultSnoozedOptions: SnoozedTabOptions = {};

export enum SORT_OPTION {
  Default = "default",
  LastAccessed = "lastAccessed",
}

export enum SORT_BY {
  Ascending = "asc",
  Descending = "dsc",
}

export type SortOptions = {
  key: SORT_OPTION;
  direction: SORT_BY;
};

export type FilterOptions = {
  search: string;
  dupesOnly: boolean;
};
