import { CircularProgress } from "@mui/material";
import { useTabCount, useWindowCount } from "@/utils/dataStore";
import Charts from "@/components/tabs/tab/charts/Charts";

export default function ChartsTab() {
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

  if (windowCount === 0 || tabCount === 0) {
    return <CircularProgress />;
  }

  return <Charts />;
}
