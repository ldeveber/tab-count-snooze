import CircularProgress from "@mui/material/CircularProgress";
import { useTabCount, useWindowCount } from "src/contexts/DataProvider";
import FilterProvider from "src/contexts/FilterProvider";
import Charts from "./charts/Charts";

export default function ChartsTab() {
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

  if (windowCount === 0 || tabCount === 0) {
    return <CircularProgress />;
  }

  return (
    <FilterProvider>
      <Charts />
    </FilterProvider>
  );
}
