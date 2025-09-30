import { SearchIcon } from "lucide-react";
import { type ChangeEventHandler, useState } from "react";
import { useDataDispatch } from "@/utils/dataStore";

export default function SearchTabs() {
  const dispatch = useDataDispatch();
  const [search, setSearch] = useState("");

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearch(value);
    dispatch({ type: "search", search: value });
    if (value === "") {
      dispatch({ type: "clearSelection" });
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
      <input
        id="search"
        type="search"
        value={search}
        onChange={onSearchChange}
        placeholder="Search..."
        className="w-full rounded-full border border-secondary bg-muted px-9 py-2 text-foreground text-sm transition-[box-shadow] focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <label htmlFor="search" className="sr-only">
        Search Tabs
      </label>
    </div>
  );
}
