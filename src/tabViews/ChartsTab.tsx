import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import ChartsTabProvider from "src/contexts/ChartsTabContext";
import Charts from "./charts/Charts";

export default function ChartsTab() {
  const [windows, setWindows] = useState<chrome.windows.Window[]>([]);

  useEffect(() => {
    void chrome.windows.getAll({ populate: true }).then((values) => {
      const wins = values.filter((w) => w.tabs?.filter(({ title, url }) => !!title && !!url));
      setWindows(wins);
    });
  }, []);

  if (windows.length === 0) {
    return <CircularProgress />;
  }

  return (
    <ChartsTabProvider>
      <Charts windows={windows} />
    </ChartsTabProvider>
  );
}
