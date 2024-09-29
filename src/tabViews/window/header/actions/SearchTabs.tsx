import Input from "@mui/material/Input";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import Search from "src/components/layout/Search";
import { useDataDispatch } from "src/contexts/DataProvider";

export function Loading() {
  return (
    <Skeleton>
      <Input />
    </Skeleton>
  );
}

export default function WindowsHeader() {
  const [search, setSearch] = useState("");
  const dispatch = useDataDispatch();

  const onSearchClear = () => {
    dispatch({ type: "resetFilter" });
  };
  const onSearchChange = (value: string) => {
    setSearch(value);
    dispatch({ type: "search", search: value });
  };

  return <Search value={search} onChange={onSearchChange} onClear={onSearchClear} />;
}
